import 'dotenv/config'
import { ChatDeepSeek } from '@langchain/deepseek';
// 适配器 Provider  省去了适配工作
// 适配大模型也是工作量
// 提示词模块 
import { PromptTemplate } from '@langchain/core/prompts';

// static 方法 类的，不是实例的
const prompt = PromptTemplate.fromTemplate(`
  你是一个{role}，
  请用不超过 {limit} 字回答一下问题：
  {question} 
`)

const promptStr = await prompt.format({
  role: '前端面试官',
  limit: '50',
  question: '什么是闭包',
})

const prompt2 = await prompt.format({
  role: '后端面试官',
  limit: '50',
  question: '什么是MVC？',
})

const prompt3 = await prompt.format({
  role: '熊二',
  limit: '50',
  question: '光头强为什么要砍树？',
})

// console.log(promptStr);
// console.log(prompt2);

const model = new ChatDeepSeek({
  model: 'deepseek-reasoner',
  temperature: 0.7,
})

const res = await model.invoke(prompt3);
console.log(res.content);