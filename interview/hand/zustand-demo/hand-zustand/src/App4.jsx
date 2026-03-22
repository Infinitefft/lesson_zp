import {
  createStore,
} from './zustand3';

export default function App() {
  const store = createStore();

  // 添加一个订阅者
  // setState 状态改变的时候，执行这些函数
  store.subscribe(() => {
    // A
    console.log(`通知状态发生改变！最新数据 ${store.getState().count}`);
  })
  
  console.log(`1.开始的状态 ${store.getState().count}`);

  // 再添加一个订阅者
  store.subscribe(() => {
    // B
    console.log(`来了第二个通知状态发生改变！最新数据 ${store.getState().count}`);
  })

  store.setState({ count: 10 });

  return (
    <>
      
    </>
  )
}