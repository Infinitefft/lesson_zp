import 'dotenv/config'
// console.log(process.env.DEEPSEEK_API_KEY, '/////');
import { ChatDeepSeek } from '@langchain/deepseek';

const model = new ChatDeepSeek({
  model: 'deepseek-reasoner',
  temperature: 0,
  // langchain 帮我们适配了市面上大多数的 LLM
  // baseURL ？不需要  适配器模式  Provider
  // apiKey 自动从环境变量中获取
})

// invoke 执行  invoke:调用
const res = await model.invoke('用一句话解释什么是RAG？');
console.log(res.content);