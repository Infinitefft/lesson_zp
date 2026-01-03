import {
  useState,
  useEffect,
} from 'react';

// App.jsx
import { useMouse } from './hooks/useMouse.js';
import { useTodos } from './hooks/useTodos.js';
import TodoList from './components/TodoList.jsx';
import TodoInput from './components/TodoInput.jsx';


function MouseMove() {
  const { x, y } = useMouse(); 
  return (
    <div>
      鼠标位置: {x}, {y}
    </div>
  );
}


export default function App() {
  // const [count, setCount] = useState(0);
  // const { todo } = useTodos();
  const {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
  } = useTodos();

  return (
    <>
      <TodoInput onAddTodo = {addTodo} />
      {
        todos.length > 0 ? 
        (
          <TodoList
            onDelete={deleteTodo}
            onToggle={toggleTodo}
            todos={todos} />
        ) :  (<div>暂无待办事项</div>)
      }
      {/* {count}
      <button onClick={() => setCount(count + 1)}>
        增加
      </button>
      {(count & 1) === 0 && <MouseMove /> } */}
    </>
  )
}