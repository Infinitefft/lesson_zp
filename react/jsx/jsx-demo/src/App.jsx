// 根组件
// jsx 
// 组件树
// ？ 函数 将JSX + 逻辑 封装成了一个组件
// 组件是由JS/CSS/HTML 组合起来 完成一个相对独立的功能
// JSX 负责 UI
// use 使用
// state 数据状态  ref
import { useState, createElement } from 'react';
import './App.css'

function App() {
    // const name = "React";
    // useState 会返回一个数组
    // 数组的第一个元素是状态值，第二个元素是更行状态值的函数
    const [name, setName] = useState("vue")
    const [todos, setTodos] = useState([{
        id: 1,
        titel: "学习react",
        done: false,
    },{
        id: 2,
        titel: "学习vue",
        done: false,
    }
    ]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const toggleLogin = () => {
        setIsLoggedIn(!isLoggedIn);
    }
    // 语法糖，主要是简化模板开发，提升代码的可读性
    const element = <h2>JSX 是 React 中用于描述用户界面的语法扩展</h2>;
    const element2 = createElement('h2', null, 'JSX 是 React 中用于描述用户界面的语法扩展');
    setTimeout(() => {
        setName("React");
    }, 2000)
    // 组件的数据业务、交互等
    // JSX js 里面，class 是js关键字 不能用，用className
    return (
        // 文档碎片标签
        <>
            {element}
            {element2}
            <h1>Hello  <span className="title">{name}</span></h1>
            {
                todos.length > 0 ? (
                    <ul>
                        {
                            // 原生JS react 能不用新语法，就不用
                            // xml in js
                            todos.map((todo) => (
                                <li key={todo.id}>
                                    {todo.titel}
                                </li>
                            ))
                        }
                    </ul>
                ): (<div>暂无代办事项</div>)
            }
            { isLoggedIn ? (<div>已登录</div>) : (<div>未登录</div>)}
            <button onClick={toggleLogin}>
                {isLoggedIn ? "退出登录" : "登录"}
            </button>
        </>
    )
}

export default App;