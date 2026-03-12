# React
MVVM 现代前端框架 Model View ViewModel
组件化、响应式、JSX、虚拟DOM、Fiber架构...

- React 底层原理
  最好的方式是手写 Mini React
  React 就是个框架名字，Didact，统一的命名空间

- 搭建源码开发项目
  - react-scripts 类似 vite
- JSX
  JSX 是在JavaScript 里面直接写HTML 标签的语法糖
  - 优势
    1. 直观且声明式
    2. vue 三段式
    函数 JSX和数据逻辑在一起
    通过 JSX 直接看到最终输出的DOM 结构
    ``` jsx
      let user = (<div>
        <h2>用户列表</h2>
        {user.map(user => <p key={user.id}>{user.name}</p>)}
      </div>)
    ```
- 源码分析第一阶段 The CreateElement Function
  - jsx 由babel 转译成 React.createElement
    pnpm i @babel/core @babel/preset-react @babel/cli -D
  - React.createElement 会接收到 type props children
    三个参数
  - createElement 函数 返回构成 VDOM 的 element
  - 递归 叶子节点就是文本节点 为了统一处理（render）
    也返回 VDOM
  得到VDOM
  {
    type: 'TEXT_ELEMENT | NodeName | FunctionComponent',
    props: {
      ...props,
      children: []
    }
  }
  开发者只需关注数据业务，dom 打理由react 帮我们做了（重绘重排）

- 源码分析第二阶段 render 
  - 接收 element，container
  - 创建节点  Node | TextNode
  - isProperty 判断 children 之外的都是
  - 添加属性
  - 挂载