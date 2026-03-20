# Agent 记忆模块

- RAG 太重要了
  - 最低的成本（embedding）丰富了llm的上下文
  - 大模型的微调（finetue）也可以提升llm的能力，但是花费非常大，非常复杂
  成本比较高，
  大模型的微调（Fine-tuning）是一种在预训练大模型基础上进行定制化训练的技术。简单来说，就是让一个已经学会通用知识的大模型，针对特定任务或领域进行进一步学习。

- llm 的扩展
  - llm + tool（干活） + RAG（知识库Context） + Memory（记忆）

- memory 是基石
  messages 数组 最基础的memory
  tool ?
  rag ?  Prompt 增强 我们的之前的对话，能力的积累 修改Pormpt
  SSD 

- 和llm 的对话 是无状态的 Stateless
  - llm 简单，消费算力、电力，高并发基础设施
    基于请求 AIGC生成，生成内容返回
  - http 也是这样
    万物互联
    http 头 带上 Cookie，Authorization 还是无状态的
  - 带上了 memory
    message 数组
- modelWithTools
  messages 数组放入了SystemMessage，告诉大模型他的角色、功能
  放入HumanMessage 用户的问题（干什么）
  基于智能循环判断 tool_calls
  将 Tool 的返回结果用 ToolMessage 再加入 message
  利用了 Memory 把需要多轮会话的复杂任务，无状态的大模型也能搞定
- 单纯的messaegs 数组很简单，但是有问题
  - context 越来越长，token 消耗越来越多，触犯到上下文窗口大小限制

- 解决方案
  - 截断 slice（-k）最近最关心的对话还在 滑动窗口 LRU
  - 总结 将要截断的 messages 总结一下（summarize）
  当前的多轮对话中 Memory 机制够用
  - 检索（先存 数据库、文件） 提问来做 rag
  cursor 等 超越当前对话，将之前对话存储，rag 利用的场景
  AI Agent 越来越懂我们

  清空message
  新的任务，节省token

  - cursor 通过messages计算token 的开销
    40%， 0%
  - 自动触发总结
  /compact
  /clear
  又能vibe coding 又能省token的 ai工程师

## FileSystemChatMessageHistory
- cursor 的 messages history实现方案
  - session 会话 一次会话 有一个主题
    - js 八股
    - 算法
    - 手写
    - AI
  - 全新主题，新开一个session
  - 持久化存储 messageHistory
  - 恢复某个session 继续chat 
  - 实现了 cursor 的 Memory 的持久化功能理解

## 截断