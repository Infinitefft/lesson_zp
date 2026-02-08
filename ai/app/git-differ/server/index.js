import express from 'express';   // 引入后端框架
// langchain 支持ollama
import { ChatOllama } from '@langhchain/ollama';
// 提示词模板
import { ChatPromptTemplate } from '@langchain/core/prompts'
// 输出格式化模块
import { StringOutputParse } from '@langchain/core/output_parsers'


const model = new ChatOllama({
  baseURL: "http://localhost:11434",
  model: "deepseek-r1:8b",
  temperature: 0.1  // 严格
})

// web server http 协议  3000 端口伺服  路由
const app = express();   // server app

// 使用 json 解析中间件服务
app.use(express.json());


// 路由 get method  path: /hello
// req：请求对象 res：响应对象
app.get('/hello', (req, res) => {
  res.send('hello world');
})

app.post('/chat', async (req, res) => {
  // 处理函数
  console.log(req.body, "//////");
  const { message } = req.body;    // 请求体解构用户的提问
  // 后端稳定第一
  if (!message || typeof message !== 'string') {
    // 响应头  statusCode 400 用户请求错误
    // 响应体是json 的
    // 完整的响应
    // send 返回文本  后端api 服务器接口数据格式是json
    return res.status(400).json({
      error: "message 必填，必须是字符串"
    })
    
  }
  res.send(message);
})

app.listen(3000, () => {
  console.log('server is running on port 3000');
})