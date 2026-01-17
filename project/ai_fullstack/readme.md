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

#### TypeScript 实战 todos 项目