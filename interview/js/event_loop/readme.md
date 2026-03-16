# Even Loop

- 渲染进程的主线程有太多工作要做
消息队列 + Event Loop（JS 执行机制）

- 一次工作中
  - script 是一个宏任务
  - V8 引擎JS 单线程 同步代码 快速执行完，调用栈
    执行时间不能太长  优先级比较高的任务
  - 耗时性任务等 异步的，不能被阻塞
  - 微任务队列（promise，mutation 有时机的，promise resolve或reject 时会加入微任务队列）
  - 非队列 页面的渲染（重绘重排 页面的卡顿） 动画（掉帧）垃圾回收（GC）
  - 宏任务队列（）


- 同步代码
  同步代码 1
  console.log('Promise 构造函数');
  console.log('Promise 构造函数内 resolve 后');

  console.log('同步代码 2');

- 微任务队列
  promise1.then
  console.log('Promise.then 1');
  console.log('await 后微任务');
  console.log('queueMicrotask 微任务');
  () => {
    console.log('MutationObserver 微任务');
  }

- 宏任务队列
  定时器


- 结果
  同步代码1