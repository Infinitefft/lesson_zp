import {
  createContext,
  // useContext   // hooks
} from 'react'
import Page from './views/Page'
// 跨层级通信的数据状态的容器
// 直接export 可以多次
export const UserContext = createContext(null);
// 1 次

export default function App() {
  const user = {
    name: "Andrew"
  }
  return (
    // context 提供给 Page 组件树共享 数据容器
    // Provider 组件 数据提供者
    // value 就是 context 里面的值
    <UserContext.Provider value={user} >
      <Page />
    </UserContext.Provider>
  )
}