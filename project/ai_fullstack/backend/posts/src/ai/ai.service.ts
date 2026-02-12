import {
  Injectable,
} from '@nestjs/common';
import { Message } from './dto/chat.dto';
import { ChatDeepSeek } from '@langchain/deepseek'
import { SystemMessage, HumanMessage, AIMessage } from '@langchain/core/messages';
import { OpenAIEmbeddings, DallEAPIWrapper } from '@langchain/openai'
import * as fs from 'fs/promises';  // promisify
import path from 'path';
// 向量数据库,ai应用 功能的一个核心之一
import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import { Document } from '@langchain/core/documents';



interface Post {
  title: string;
  category: string;
  embedding: number[];
}



export function convertToLangChainMessages(messages: Message[])
: (HumanMessage | AIMessage | SystemMessage)[] {
  return messages.map(msg => {
    switch(msg.role) {
      case 'user':
        return new HumanMessage(msg.content);
      case 'assistant':
        return new AIMessage(msg.content);
      case 'system':
        return new SystemMessage(msg.content);
      default:
        throw new Error(`Unsupported role: ${msg.role}`);
    }
  })
}


export function cosineSimilarity(v1: number[], v2: number[]): number {
    const dotProduct = v1.reduce((sum, val, i) => sum + val * v2[i], 0);
    const normV1 = Math.sqrt(v1.reduce((sum, val) => sum + val * val, 0));
    const normV2 = Math.sqrt(v2.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (normV1 * normV2);
}



@Injectable()
export class AIService {
  private posts: Post[] = [];
  private embeddings: OpenAIEmbeddings;
  private imageGenerator: DallEAPIWrapper;
  private chatModel: ChatDeepSeek;  // llm 成为service 一个私有属性
  constructor() {
    this.chatModel = new ChatDeepSeek({
      configuration: {
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseURL: process.env.DEEPSEEK_API_BASE_URL,
      },
      model: "deepseek-chat",
      temperature: 0.7,
      streaming: true,
    })

    this.embeddings = new OpenAIEmbeddings({
      configuration: {
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENAI_API_BASE_URL,
      },
      model: 'text-embedding-ada-002'
    })

    this.loadPosts();

    this.imageGenerator = new DallEAPIWrapper({
      openAIApiKey: process.env.OPENAI_API_KEY,
      n: 1,
      size: '1024x1024',
      quality: 'standard'
    })
  }

  // 封装类的实现细节，复杂性
  private async loadPosts() {
    try {
      // console.log(__dirname, "&&&^^^^&^&&&&^&&");
      // D:\lesson_zp\project\ai_fullstack\backend\posts\dist\src\ai
      // nestjs compile ts -> js dist
      // nest-cli assets data/**/*  dist/
      const filePath = path.join(__dirname, '../../', 'data', 'posts-embedding.json');
      const data = await fs.readFile(filePath, 'utf-8');
      // console.log(data, "()(**&*&*&@()(*%)@Q*%)@(");
      this.posts = JSON.parse(data);
    } catch (err) {
      console.error("Failed to load posts", err);
      this.posts = [];
    }
  }


  
  async chat(messages: Message[], onToken: (token: string) => void) {
    const langChainMessages = convertToLangChainMessages(messages);
    // console.log(langChainMessages, '///[][][][]-----///');
    const stream = await this.chatModel.stream(langChainMessages);
    for await (const chunk of stream) {
      const content = chunk.content as string;  // 断言
      // console.log(content, "\\\////[][]---[][]");
      // 用模块化，回调传递
      if (content) {
        onToken(content);
      }
    }
  }


  async search(keyword: string, topK: number = 3) {
    const vector = await this.embeddings.embedQuery(keyword);
    // console.log(vector, "[][]////()()###$%@%@%*****")
    const result = this.posts.map(post => ({
      ...post,
      similarity: cosineSimilarity(vector, post.embedding)
    })).sort((a, b) => (b.similarity - a.similarity))
    .slice(0, topK).map(item => item.title);
    
    return {
      code: 0,   // 没有任何错误
      data: result,
    }
  }


  async avatar(name: string) {
    const imgUrl = await this.imageGenerator.invoke(`
      你是一位头像设计师，
      请你根据用户的姓名${name}，
      设计一个专业的头像，
      风格卡通、时尚且好看。
    `)
    console.log(imgUrl);
    return imgUrl;
  }


  async rag(question: string) {
    // google
    // 知识库 embedding
    // 内存向量数据库数据库
    // 向量 -> 向量存储 源文件(Document) this.embeddings(llm) 结果存储下来
    const vectorStore = await MemoryVectorStore.fromDocuments(
      [
        new Document({
          pageContent: "React 是一个用于构建用户界面的 JavaScript 库",
        }),
        new Document({
          pageContent: "NestJs 是一个用于构建服务器应用的渐进式 Node.js 框架,擅长企业级开发",
        }),
        new Document({
          pageContent: "RAG 通过检索外部知识增强大模型的回答能力"
        })
      ],
      this.embeddings
    )

    // 相似度
    const docs = await vectorStore.similaritySearch(question, 1);
    console.log(docs);
    // llm chat 的上下文 增强(Augmented)
    // 检索 retrieve
    const context = docs.map(d => d.pageContent).join('\n');
    // 增强 Augmented
    const prompt = `
      你是一个专业的JS工程师,请基于下面资料回答问题:
      资料:
      ${context}
      
      问题:
      ${question}
    `
    // 生成 Generation
    const res = await this.chatModel.invoke(prompt);
    // console.log("prompt生成的res:", res);
    return res.content;
  }
}