import {
    Router,   // 前端路由总管
    Route,  // 具体路由实例
    Routes
} from 'react-router-dom';

import Home from '../pages/Home';  // 首页
import About from '../pages/About';  // 关于页

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
        </Routes>
    )
}