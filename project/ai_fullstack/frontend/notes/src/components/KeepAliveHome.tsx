import { KeepAlive } from 'react-activation'
import Home from '@/pages/Home'


const KeepAliveHome = () => {
  return (
    // 将每个被 <KeepAlive> 包裹的组件视为一个“缓存实体”。name 是这个实体的 Key。
    <KeepAlive name="home" saveScrollPosition="screen">
      <Home />
    </KeepAlive>
  )
}

export default KeepAliveHome