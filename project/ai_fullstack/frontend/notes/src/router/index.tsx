import {
  Suspense,
  lazy,
} from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import Loading from '@/components/Loading'
import MainLayout from '@/layouts/MainLayout'


const Home = lazy(() => import('@/pages/Home'));
const Mine = lazy(() => import('@/pages/Mine'));
const Login = lazy(() => import('@/pages/Login'));
const Order = lazy(() => import('@/pages/Order'));
const Chat = lazy(() => import('@/pages/Chat'));

export default function RouterConfig({children} : {children: React.ReactNode}) {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* 布局功能 */}
          <Route path="/" element={<MainLayout/> }>
            <Route path="" element={<Home />}></Route>
            <Route path="chat" element={<Chat />}></Route>
            <Route path="order" element={<Order />}></Route>
            <Route path="mine" element={<Mine />}></Route>
          </Route>
        </Routes>
      </Suspense>
      {children}
    </Router>
  )
}