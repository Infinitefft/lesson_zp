import {
  useEffect
} from 'react';

export default function Demo() {
  useEffect(() => {
    console.log('123456');   // onMounted
    const timer = setInterval(() => {
      console.log('timer');
    })
    // 生命周期函数  onMounted onUpdated onUnmounted
    // 卸载
    return () => {  // 卸载前执行回收
      console.log('remove');
      clearInterval(timer);
    }
  }, [])
  return (
    <div>
      偶数Demo
    </div>
  )
}