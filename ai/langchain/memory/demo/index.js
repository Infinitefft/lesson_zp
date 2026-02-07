import {
  ChatDeepSeek
} from '@langchain/deepseek';
import 'dotenv/config';

const model = new ChatDeepSeek({
  model: 'deepseek-chat',
  temperature: 0.5
});

// http api 请求
const res = await model.invoke("我是熊二，我喜欢吃蜂蜜");
console.log(res);
const res2 = await model.invoke("我叫啥");
console.log(res2);