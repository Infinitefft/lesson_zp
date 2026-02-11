import { client } from './app.service.mjs';


// 不用字符匹配，keyword 转成向量表达 数学
// cosine 1 相同 越小 0 越不同  -1 相反
// completions.create() AIGC 生成接口
// completions.chat.create() 聊天接口
// embeddings.create() 向量生成  是一个数组 []
// 文本嵌入  embedding  
const response = await client.embeddings.create({
  // embedding 专有 model
  model: 'text-embedding-ada-002',
  input: '你好',
});



console.log(response.data[0].embedding, "维度：", response.data[0].embedding.length, '////====///[][]====()()()');