# AI 全栈项目

## 技能点
### react 开发全家桶
- react + typescript(JS超级)
- react-router-dom(前端路由)
- zustand (中央状态管理)
- axios (http请求库) 

### 后端
- node + ts 
- nestjs 企业级别后端开发框架 
- psql 数据库
- redis 缓存数据库
### AI 
- langchain 
- coze/n8n 
- llm 
- trae/cursor 
## 项目安排
- frontend
- backend
- ai_server
- admin 后台管理系统

## git 操作 
- 全新的实战项目 
  git init 
- 提交的时机
  每次完成一个相对独立的模块后，提交一下
  提交信息要准确完整

## react 全家桶
### react-router-dom 
- 前端路由 
早期前端没有路由，路由由后端，前端是切图崽
前后端分离， 前端有独立的（html5）路由，实现页面切换。
- 两种形式
  - HashRouter  #/ 丑一点 很温柔 兼容性很好 瞄点  
  - BrowserRouter / 和后端路由一样，需要使用到html5 history API 
  兼容不好，ie11 之前不兼容， 现在的浏览器几乎都支持 
- as Router 可读性 
- 性能， 快 页面组件的懒加载
  /   Home  延迟一下About  阻止加载
  /About About 

### 路由有多少种？
- 普通路由 
- 动态路由 /product/:id
- 通配路由 * 
- 嵌套路由 Outlet 
  <Outlet> 是 React Router DOM 中的组件，用于在父路由元素中渲染其子路由匹配到的内容。
- 鉴权路由（路由守卫） ProtectRoute
- redirect 重定向路由 Navigate
### 路由生成访问历史
  history 栈 先进后出
  replace redirect 跳转，会替换当前的历史记录
### 单页应用
- 传统的开发是多页的，基于http 请求，每次url 发生改变后，去服务器重新请求整个页面。
  体验不好，页面会白一下
- 单页应用 react-router-dom html5 history 
  前端路由
  路由改变后，前端会收到一个事件， 讲匹配的新路由显示在页面上

## typescript 
JavaScript 超级 ， 强类型静态语言
- 安装 ts 
  npm install -g typescript
- ts 的优点
  - 静态类型
  - 边写边检查bug
  - 编译时检查类型错误
  - 代码建议、文档查看都非常方便
  - 没有使用变量等垃圾代码提示未使用(console.log)
    重构、修改别人的代码
    干净的代码

### TypeScript 实战 todos

### zustand 状态管理
如果说国家需要有中央银行，那么前端项目就需要中央状态管理系统。zustand \ redux
- 组件 = UI + State
- store 将状态存到store仓库中
  全局共享
- 基于hooks思想实现的

## 数据库设计
- 关系型数据库 mysql/postgresql
是一种以二维表格（行/列） 组织存储数据，通过主键（Primary key）
外键建立表格间逻辑关联，遵循ACID 事务特性保证数据一致性和可靠性的数据库。
表 Table users 类
row 实例
column 属性
### 主键
- 词典
  索引目录
- 唯一的，自增的
- 高效 利用索引
### 唯一索引 uniq
  - username  唯一性、正确性
### 外键 约束 foreign key
  - posts 文章id， userId
  - id 引用 users 表的主键
  posts.userId == user.id 关联
### 普通外键 key
  - 不能乱建
  - 查询的频繁度

### 文章系统
- 文章表 posts
- 用户表 users
- 评论表 comments
- 点赞表 likes
- 标签表 tags
- 收藏表 favorites

### 连接
- 左连接 left join
  - 左表所有数据，右表匹配的数据
- 右连接 right join
  - 右表所有数据，左表匹配的数据
- 内连接 inner join
  - 左右表都匹配的数据
- 全连接 full join
  - 左右表所有数据

### ACID
- 事务
A Atomicity 原子性
要么都成功过，要么全部失败回滚