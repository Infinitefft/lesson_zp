# Git 提交AI神器

- 需求
  - 规范的git 提交信息是很重要的
    - 项目的日志
    - 工作业绩的审核，leader 要看
    - 新手可以像高手一样高质量提交代码  (git 高级规范)

- 技术构成
  - 全栈项目
  - 前端 react + tailwindcss + axios
  - 后端 node + express

- 前后端分离
  - server
    - 运行在服务器上
    - 提供api 接口，3000 端口 伺服
    http://localhost:3000
  - frontend
    在用户的浏览器上运行（v8 引擎，js运行的宿主）
    http://localhost:5173  Web
  - AI
    - ollama 部署开源大模型 deepseek-r1:8b GPU    r：reasoning(推理)
    - 像 openai 一样的api 接口
    :11434 


## express
- node 老牌的敏捷开发框架
- app 后端应用
- listen 3000 端口伺服
- 后端路由 path
  网站本质是提供资源和服务的
  app.get('/hello', (req, res) => {
    
  })
  http 是基于请求响应的简单协议
  http://localhost:3000
  ip 找到服务器
  3000 端口对应的是应用  express
  path /hello GET
  GET 对资源的操作 CRUD
  req 请求对象
  res 对象 响应对象

- apifox 测试api 接口
- nodemon 一边调试，一边开发
- express 默认不支持req.body 解析
  - 加一个 json 解析中间件
  请求    中间件1，中间件2 ...    响应
- GET 和 POST 区别
  - GET　没有请求体，POST 有
- 中间件
  app.use(express.json());  // 解析请求体的json 数据
- 响应头、响应体
  - 1xx 请求中...
  - 200 OK 成功
  - 201 Created 成功创建资源
  - 3xx 重定向 redirect
  - 400 Bad Request  合适的状态码
  - 404 Not Found 资源不存在
  - 401 Unauthorized 未授权
  - 500 Internal Server Error 服务器错误
  