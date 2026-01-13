import {
  lazy,  // 懒加载
  Suspense,  // Suspennse 组件，用于包裹懒加载的组件
} from 'react';

import {
  BrowserRouter as Router,  // html5 history
  // HashRouter,
  Link,
  Routes, // 一组路由
  Route // 单个路由
} from 'react-router-dom'

// import Home from './pages/Home'
const Home = lazy(() => import('./pages/Home'));  // 有可能是分享链接进来的，也需要懒加载
// import About from './pages/About'
const About = lazy(() => import('./pages/About'));  // 懒加载
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Product = lazy(() => import('./pages/product'));
const ProductDetail = lazy(() => import('./pages/product/ProductDetail'));
const NewProduct = lazy(() => import('./pages/product/NewProduct'));
const Login = lazy(() => import('./pages/Login'));
const ProductRoute = lazy(() => import('./components/ProductRoute'));
const Pay = lazy(() => import('./pages/Pay'));



export default function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/products">Product</Link>
          </li>
          <li>
            <Link to="/products/new">New Product</Link>
          </li>
          <li>
            <Link to="/products/123">Product Detail</Link>
          </li>
          <li>
            <Link to="/pay">Pay</Link>
          </li>
        </ul>
      </nav>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* 动态路由 http(s)://www.juejin.cn/user/123456?keyword=23#/about
              协议://domain/path/:params?queryString
          */}
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/products" element={<Product />}>
            <Route path=":productId" element={<ProductDetail />} />
            <Route path="new" element={<NewProduct />} />
          </Route>
          <Route path="/login" element={<Login /> } />
          {/* 鉴权的路由 */}
          <Route path="/pay" element={
            <ProductRoute>
              <Pay />
            </ProductRoute>
          }/>
        </Routes>
      </Suspense>
    </Router>
  )
}