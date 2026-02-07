# LLM 记忆

- llm api 调用和http 请求一样，都是无状态的
- 怎么让llm 有记忆？
  维护一个对话历史记录，每次调用llm 时，都把历史记录带上
  
## 多轮会话
- llm 调用是无状态的
- 多轮会话 维护一个对话历史记录messages，每次调用llm时，都把历史记录带上
  - 维护对话
  - 滚雪球一样，token 开销太大

### memory AI 应用的模块 langchain