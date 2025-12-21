import {
  useEffect,  // 副作用
  useState,  // 响应式状态
} from 'react';

import Demo from './components/Demo';

async function queryData() {
  const data = await new Promise(resolve => {
    setTimeout(() => {
      resolve(666);
    }, 2000)
  })
  return data;
}

export default function App() {
  const [num, setNum] = useState(0);
  // useEffect(() => {
  //   // 挂载后执行，类似 vue 生命周期 onMounted
  //   console.log('---');
  //   queryData().then(data => {
  //   setNum(data);
  //   })
  // }, [1, 2, 3, new Date()])
  // useEffect(() => {
  //   // 挂载后会执行 onMounted
  //   // 更新时也会执行 onUpdated
  //   console.log(num, 'zzz');
  // }, [num])
  // 如果不传依赖项，渲染后和状态更新时都会更新
  // useEffect(() => {
  //   console.log('ddd');
  // })
  // console.log('yyy');
  useEffect(() => {
    console.log('effect');
    // 每次都在新建定时器
    // 如何取消定时器？
    // 定时器副作用
    const timer = setInterval(() => {
      console.log(num);
    }, 1000)
    return () => {
      // 重新执行effect 时，会先清除上一次的定时器
      // 不清除会导致内存泄漏
      // useEffect return 函数
      console.log('remove');
      clearInterval(timer);
    }
  }, [num]);
  return (
    <div onClick={() => setNum(prenum => prenum + 1)}>
      {(num & 1) === 0 && <Demo />}
    </div>
  )
}