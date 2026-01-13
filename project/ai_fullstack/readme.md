# AI 全栈项目

## 技能点
### react 开发全家桶
- react + typescript(JS超级)
- react-router-dom(前端路由)
- zustand(中央状态管理)
- axios(http请求库)

### 后端
- node + ts
- nestjs 企业级别后端开发框架


- 全新的实战项目
  git init
- 提交的时机
  每次完成一个相对独立的模块后，提交一下
  提交信息要准确完整

## react 全家桶
早期前端没有路由，
前后端分离，前端有独立的(html5) 路由，实现页面切换。
- 两种形式
  - HashRouter #/ 丑一点 很温柔 兼容性很好 锚点
  - BrowserRouter / 和后端路由一样，需要使用到 html5 history API
    兼容不好，ie11 之前不兼容，现在的浏览器几乎都支持
- as Router 可读性
- 性能， 快  页面组件的懒加载
  / Home  延迟一下About  阻止加载
  /About  About 