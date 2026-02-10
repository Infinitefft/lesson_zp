import {
  Injectable,
} from '@nestjs/common';
import { Message } from './dto/chat.dto';
import { ChatDeepSeek } from '@langchain/deepseek'

@Injectable()
export class AIService {
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
  }

  
  async chat(messages: Message[], onToen: (token: string) => void) {
    const langChainMessages = convertToLangChainMessages(messages);
  }
}