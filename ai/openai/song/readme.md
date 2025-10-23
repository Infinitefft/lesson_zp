# OpendAI AIGC Models

## openai 提供了llm sdk
-  初始化一个后端项目
    node 是js 的后端实现，命令行运行
    npm node package management node 包管理
    npm init -y 
- node 以其轻量级开发，适合中小型项目，占据大量开发市场。
- openai llm事实上的标准
    - completion 接口 完成
    - chat 接口

## LLM
- 来自openai
- LLM gpt-3.5-turbo-instruct
- 文本生成
- 安装了openai sdk package
- 实例化，apiKey, baseURL
- 调用completions.create 方法
- 本质是向 api.openai/completions 发送POST 请求
- 返回json choices[0].text