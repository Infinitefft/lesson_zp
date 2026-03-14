process.env.grpc_proxy = "";
process.env.http_proxy = "";
process.env.https_proxy = "";
process.env.no_proxy = "localhost,127.0.0.1";

import "dotenv/config";
import { parse } from 'path';

import {
  MilvusClient,
  DataType,
  IndexType,
  MetricType,
} from '@zilliz/milvus2-sdk-node';

import {
  OpenAIEmbeddings,
} from '@langchain/openai';


const COLLECTION_NAME = "ebook";
const VECTION_DIM = 1024;
const EPUB_FILE = './天龙八部.epub';

const ADDRESS = process.env.MILVUS_ADDRESS;
const TOKEN = process.env.MILVUS_TOKEN;
const BOOK_NAME = parse(EPUB_FILE).name;
console.log(BOOK_NAME);

const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.EMBEDDING_MODEL_KEY,
  model: process.env.EMBEDDING_MODEL_NAME,
  configuration: {
    baseURL: process.env.OPENAI_API_BASE_URL,
  },
  dimesions: VECTION_DIM,
})

const client = new MilvusClient({
  address: ADDRESS,
  token: TOKEN,
})

async function getEmbedding(text) {
  const result = await embeddings.embedQuery(text);
  return result;
}


async function main() {
  try {
    console.log('Connection to Milvus...');
    await client.connectPromise;

    try {
      await client.loadCollection({
        collection_name: COLLECTION_NAME,
      })
    } catch (err) {
      console.log('Collection already loaded');
    }

    const query = '段誉会什么武功？';
    const queryVector = await getEmbedding(query);
    const searchResult = await client.search({
      collection_name: COLLECTION_NAME,
      vector: queryVector,
      limit: 3,
      metric_type: MetricType.COSINE,
      output_fields: ['id', 'content', 'book_id', 'chapter_num', 'index', 'book_name'],
    })

    searchResult.results.forEach((item, index) => {
      console.log(`\n 第${index + 1}个结果: Score: ${item.score.toFixed(2)} \n`);
      console.log(`id: ${item.id}`);
      console.log(`content: ${item.content}`);
      console.log(`book_id: ${item.book_id}`);
      console.log(`chapter_num: ${item.chapter_num}`);
      console.log(`index: ${item.index}`);
      console.log(`book_name: ${item.book_name}`);
    })
  } catch (err) {
    console.error('Connection to Milvus failed', err.message);
  }
}

main();