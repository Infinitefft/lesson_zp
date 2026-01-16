# qoder-cli
命令行 AI coding Agent
基于阿里qwen 编程大模型，构建AI Agent的命令行框架。

- 安装
npm i -g @qoder-ai/qodercli

- /init 初始化项目 AGENTS.md
  AI 开发项目 给llm 项目规矩的上下文

## Trae/Cursor 还需要qoder-cli, claude-cli
未来的**开发界面**不会只有IDE，还会有cli（命令行工具），最好的是两者融合
IDE 适合深度上下文与复杂任务处理，
CLI 具备深度、灵活性与自动化能力
双引擎的新AI编程模式
端到端的AI 自主开发模式

## mcp Model Context Protocol
MCP 让AI应用以统一的方式行向大模型提供结构化上下文（如工具、文档、数据库）

## context7
当llm 生成的代码是老版本，或不太行的时候 context7 来了
langchain
context7 mcp 服务，再生成代码指令发出前，带上指定的版本的库的文档作为上下文