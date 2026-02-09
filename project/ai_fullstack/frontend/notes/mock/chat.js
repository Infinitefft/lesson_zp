// 流式输出本质是变算（llm token 生成）边给，而不是等全部结果生成再一次性返回
// AI场景中，模型生成文本是逐个token 产生的（模型每次基于已生成的token 序列）
// 通过自回归方式预测下一个最可能的方式预测下一个最可能的token
// streaming：true
// http chunked 数据块来传  不用res.end()
// res.write(chunk) 
// SSE 服务器发送事件（Server-Sent Events）
// text/event-stream 模式去发送token

import { config } from 'dotenv';
config();


export default [
  {
    url: "/api/ai/chat",
    method: "post",
    // rawResponse 用于自定义原始的 HTTP 响应（如流式输出）
    // 而 response 通常指封装后的结构化响应
    rawResponse: async (req, res) => {
      // node 原生地去拿到请求体
      // console.log("/////[][][]/////");
      // chunk 数据块（buffer）
      // tcp/ip tcp：可靠的传输协议
      // 按顺序组装，失败重传  html
      // on data
      let body = '';
      // chunk 二进制流 buffer
      // 最后把 buffer 转成字符串
      req.on('data', (chunk) => { body += chunk })
      // 数据接收完成
      req.on('end', async () => {
        // 都到位了
        console.log(body);
        try {
          const { messages } = JSON.parse(body);
          // console.log(messages);
          res.setHeader('Content-Type', 'text/plain;charset=utf-8');
          // 响应头先告诉浏览器 这是流式的 数据会分块传输
          res.setHeader('Transfer-Encoding', 'chunked');
          // vercel ai sdk 特制头
          res.setHeader('x-vercel-ai-data-stream', 'v1');
          const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${process.env.VITE_DEEPSEEK_API_KEY}`
            },
            body:JSON.stringify({
              model: "deepseek-chat",
              messages: messages,
              stream: true  // 流式输出
            })
          })
          // console.log(process.env.VITE_DEEPSEEK_API_KEY, "[][][]{}{}{}{[][][]")
          if (!response.body) throw new Error("No response body");
          // SSE：二进制流  有个reader 对象 接根管子一样
          const reader = response.body.getReader();
          // 用于将ArrayBuffer 或 TypedArray（如 Uint8Array） 转换为字符串
          const decoder = new TextDecoder();
          while(true) {
            const { done, value } = await reader.read(0);
            // console.log(done, value, '--------------');
            if (done) break;
            const chunk = decoder.decode(value);
            // console.log(chunk, "------")
            const lines = chunk.split('\n');
            for (let line of lines) {
              if (line.startsWith('data:') && line !== 'data: [DONE]') {
                try {
                  const data = JSON.parse(line.slice(6));
                  const content = data.choices[0]?.delta?.content || '';
                  if (content) {
                    res.write(`0:${JSON.stringify(content)}\n`);
                  }
                } catch (err) {

                }
              }
            }
          }
          res.end();
        } catch (err) {

        }
      })
    }
  }
]