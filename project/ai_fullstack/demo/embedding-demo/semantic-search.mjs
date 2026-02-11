import fs from 'fs/promises';
import { client } from './app.service.mjs';
import readline from 'readline';  // 命令行输入

const data = await fs.readFile('./data/posts-embedding.json', 'utf-8');
const posts = JSON.parse(data);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})


const cosineSimilarity = (v1, v2) => {
  // 计算向量的点积
  const dotProduct = v1.reduce((acc, curr, i) => acc + curr * v2[i], 0);

  // 计算向量的长度
  const lengthV1 = Math.sqrt(v1.reduce((acc, curr) => acc + curr * curr, 0));
  const lengthV2 = Math.sqrt(v2.reduce((acc, curr) => acc + curr * curr, 0));

  // 计算余弦相似度
  const similarity = dotProduct / (lengthV1 * lengthV2);

  return similarity;
};
// 1：相同  0：不同  -1：相反


const handleInput = async (input) => {
  // console.log(input);
  const response = await client.embeddings.create({
    model: "text-embedding-ada-002",
    input,
  })
  // console.log(response.data[0]);
  const { embedding } = response.data[0];
  // 新增了相似度计算
  const results = posts.map((item) => ({
    ...item,
    similairty: cosineSimilarity(embedding, item.embedding),
  })).sort((a, b) => a.similairty - b.similairty).reverse().slice(0, 3)
  .map((item, i) => 
    `${i+1}.${item.title}, ${item.category}`
  ).join('\n');
  console.log(`\n${results}\n`);
  rl.question('\n 请输入要搜索的内容：', handleInput);
}

rl.question('\n 请输入要搜索的内容：', handleInput);