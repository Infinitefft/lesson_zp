import 'dotenv/config';
// console.log(process.env.OPENAI_API_KEY);

import { ChatOpenAI } from '@langchain/openai';
import { tool } from '@langchain/core/tools';
import {
  HumanMessage,
  SystemMessage,
  ToolMessage,  // 告知工具使用
} from '@langchain/core/messages';

// node 内置文件模块 异步ID
import fs from 'node:fs/promises';
// 数据校验 zod tool parameter 校验
import { z } from 'zod';

const model = new ChatOpenAI({
  modelName: 'qwen-coder-turbo',
  apiKey: process.env.OPENAI_API_KEY,
  configuration: {
    baseURL: process.env.OPENAI_API_BASE_URL,
  },
  temperature: 0,
})

// 原生写法 麻烦
// 新建一个 tool
const readFileTool = tool(
  // tool 处理函数的函数体
  // 分析 xxx 代码文件有没有bug
  // 先 tool 读取文件内容，path 作为参数 等待它读取完成
  // 再分析 bug
  async ({path}) => {
    const content = await fs.readFile(path, 'utf-8');
    console.log(`[工具调用] read_file("${path}") 成功读取 ${content.length} 个字符`);
    return content;
  },
  {
    name: "rad_file",
    description: `用此工具来读取文件内容，当用户需要读取文件、查看代码时、分析文件内容时，
    调用此工具，输入文件路径（可以是相对路径或者绝对路径）`,
    schema: z.object({path: z.string().describe("要读取的文件路径")})
  }
);

const tools = [
  readFileTool,
]

// langchain 提供了一个方法，绑定工具
// model 不再孤单，有了工具的陪伴
// llm 就可以干活了
const modelWithTools = model.bindTools(tools);

const messages = [
  new SystemMessage(`
    你是一个代码助手，可以使用工具读取文件并解释代码。

    工作流程：
    1. 用户要求读取文件时，立即调用 read_file 工具
    2. 等待工具返回文件内容
    3. 基于文件内容进行分析和解释

    可用工具：
    - read_file: 读取文件内容（使用此工具来获取文件内容）
  `),
  new HumanMessage("请读取tool-file-read.mjs文件内容并解释代码"),
];


// llm 返回的决策，要调用工具
// tool_calls 的 api 部分
// name 执行函数 result
// message llm
// 最后的结果

let response = await modelWithTools.invoke(messages);
messages.push(response);  // 把 llm 要调用工具的message也加入messages数组，形成多轮对话

while (response.tool_calls && response.tool_calls.length > 0) {
  console.log(`\n [检测到] ${response.tool_calls.length} 个工具`);
  const toolResults = await Promise.all(
    response.tool_calls.map(async (toolCall) => {
      const tool = tools.find(t => t.name === toolCall.name);
      if (!tool) {
        return `错误：找不到工具 ${toolCall.name}`;
      }
      console.log(`[执行工具] ${toolCall.name}(${JSON.stringify(toolCall.args)})`);

      try {
        const result = await tool.invoke(toolCall.args);  // 调用
        return result;
      } catch (err) {
        return `错误：${err.message}`;
      }
    })
  )
  response.tool_calls.forEach((toolCall, index) => {
    messages.push(
      new ToolMessage({
        content: toolResults[index],
        tool_call_id: toolCall.id,
      })
    )
  })

  console.log(messages);

  response = await modelWithTools.invoke(messages);
  // 不再有 tool_calls 了，说明对话结束了
  console.log(response);
}


console.log(response);