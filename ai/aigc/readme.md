# AI 综述
- AIGC
    生成式的人工智能
    - 生成文本 gpt-3.5-turbo-instruct
    - 生成图片 dall-e-2

- 安装了dotenv，openai
    优化一下？
    已经安装过了，不需要重复安装。
    共享？更快，节省空间
    pnpm 代替 npm
    pnpm（Performant npm）是一个快速、节省磁盘空间的Node.js包管理器，它通过使用硬链接和符号链接来避免重复安装相同的包，从而显著提升安装速度并减少磁盘占用。
    - npm init -y
    初始化一个后端环境 package.json 项目描述文件
    - pnpm i dotenv openai
    - node main.mjs
        node 以命令行的方式运行 main.mjs
        main.mjs 单点入口 方便管理
        mjs 是模块化的js import from 导入模块
        程序运行后，将是一个独立的进程(process)
        进程（家长）是分配资源的最小单位
        前端有document，后端就有了process
        process.env 环境变量 配置或参数
- dotenv
    读取.env 文件里的内容添加到process.env 环境变量

## Prompt 提示词
- 提示LLM，词一段话，用聊天的方式 给LLM 下达指令
- 如果你要让大模型帮我们执行复杂的任务，精心设计Prompt

## Prompt Engineering 提示词工程
- 设计出合理的Prompt，才能让大模型按照我们的意图执行任务
- 提示工程是一个迭代的过程，不断优化Prompt，才能得到我们期望的结果
- 有时候，LLM 性能不太牛X 的时候，提示词也许可以独当一面
- 提示词的编写上升到工程的角度，有些AI项目的核心就是几段提示词


## 数据分析