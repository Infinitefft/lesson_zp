import {
  BrowserRouter as Router,   // html5 和后端路由是一样的 纯 现代化 低端浏览器不支持
  // 路由形式之一 as 别名 有点丑(带有#) 早期使用
  Link    // a 不能用了 用 Link 组件代替，在内部消化
} from 'react-router-dom'
import './App.css'
import AppRoutes from './router'

function App() {
  
  return (
    // 路由接管一切
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <AppRoutes/>
    </Router>
  )
}

export default App
