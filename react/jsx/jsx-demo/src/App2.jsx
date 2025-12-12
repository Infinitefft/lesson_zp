// jsx react 文件的后缀
// UI　用户界面工程师　前后端分离
// vue 三部分 功能分离
// 一上来就是组件
// js 没有class，react 函数就是组件
// 根组件
// 子组件们
function JuejinHeader() {
  return (
    <div>
      <header>
        <h1>JueJin首页</h1>
      </header>
    </div>
  )
}

const Articles = () => {
  return (
    <div>
      Articles
    </div>
  )
}

const Checkin = () => {
  return (
    <div>
      Check in
    </div>
  )
}

const TopArticles = () => {
  return (
    <div>
      TopArticles
    </div>
  )
}



function App() {
  // xml in js -> jsx
  // 返回JSX的函数就是组件
  // 组件是react开发的基本单位
  // html 标签 css rules 建筑里的砖头和沙子 传统前端的开发单位
  // react 一下让我们成为包工头 先分工 组件化， 组件组合起来组成网页
  // Facebook 
  return (
    <div>
      {/* <h1>Hello <b>React!</b> </h1> */}
      {/* 头部组件 */}
      <JuejinHeader/>
      <main>
        {/* 组件也和html 一样声明，自定义组件 */}
        {/* 组件化让我们像搭积木一样组合成页面 */}
        <Articles/>
        <aside>
          <Checkin/>
          <TopArticles/>
        </aside>
      </main>
    </div>
  )
}

export default App