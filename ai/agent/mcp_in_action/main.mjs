import 'dotenv/config';
import { MultiServerMCPClient } from '@langchain/mcp-adapters';
import { ChatOpenAI } from '@langchain/openai';
import chalk from 'chalk';
import {
  HumanMessage,
  SystemMessage,
  ToolMessage
} from '@langchain/core/messages';


const mcpClient = new MultiServerMCPClient({
  mcpServers: {
    "amap-maps-streamableHTTP": {
      "url": `https://mcp.amap.com/mcp?key=${process.env.AMAP_MAPS_API_KEY}`
    },
    // mcp 官方提供
    "filesystem": {
      "command" : "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "D:/lesson_zp/ai/agent/mcp_in_action"
      ]
    },
    "chorme-devtools": {
      "command": "npx",
      "args": [
        "-y",
        "chrome-devtools-mcp@latest"
      ]
    }
  }
})

const model = new ChatOpenAI({
  modelName: process.env.MODEL_NAME,
  openAIApiKey: process.env.OPENAI_API_KEY,
  configuration: {
    baseURL: process.env.OPENAI_API_BASE_URL,
  }
})


const tools = await mcpClient.getTools();
const modelWithTools = model.bindTools(tools);



async function runAgentWithTools(query, maxIterations = 30) {
  const messages = [
    new HumanMessage(query)
  ];
  for (let i = 0; i < maxIterations; i++) {
    console.log(chalk.bgGreen('⏳正在等待AI思考...'));
    const response = await modelWithTools.invoke(messages);
    messages.push(response);

    if (!response.tool_calls || response.tool_calls.length === 0) {
      console.log(`\n AI 最终回复：\n ${response.content}\n`);
      return response.content;
    }

    console.log(chalk.bgBlue(`🔍 检测到 ${response.tool_calls.length} 个工具调用`));
    console.log(chalk.bgBlue(`🔍 工具调用: ${response.tool_calls.map(t => t.name).join(', ')}`));

    for (const toolCall of response.tool_calls) {
      const foundTool = tools.find(t => t.name === toolCall.name);
      if (foundTool) {
        const toolResult = await foundTool.invoke(toolCall.args);
        let contentStr;
        if (typeof toolResult === 'string') {
          contentStr = toolResult;
        } else if (toolResult && toolResult.text) {
          contentStr = toolResult.text;
        }
        messages.push(new ToolMessage({
          content: contentStr,
          tool_call_id: toolCall.id
        }));
      }
    }
  }
  return messages[messages.length - 1].content;
}

// await runAgentWithTools('广州站附近的酒店，以及去的路线');
// await runAgentWithTools(`广州站附近的2个酒店，以及去的路线，路线规划生成文档保存到
// D:\lesson_zp\ai\agent\mcp_in_action 的一个md 文件`);

await runAgentWithTools(`
  广州站附近的附近的3个酒店，拿到酒店的图片，展示浏览器，展示每个酒店的图片，
  每个tab一个url展示，并且那个页面标题改为酒店名
`)

await mcpClient.close();