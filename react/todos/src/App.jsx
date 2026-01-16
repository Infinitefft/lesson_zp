import {
  useState,
  useEffect,
} from 'react';

import './styles/app.styl';
import TodoStats from './components/TodoStats';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';



function App() {
  // 子组件共享的数据状态
  const [todos, setTodos] = useState(() => {
    // 高级用法
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  // 子组件修改数据的方法
  const addTodo = (text) => {
    setTodos([...todos, {
      id: Date.now(),  // 时间戳
      text,
      completed: false,
    }])
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todos => todos.id != id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { 
      ...todo, 
      completed: !todo.completed 
      } : todo
    ))
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])


  return (
    <div className="todo=app">
      <h1>My TodoList</h1>
      {/* 自定义事件 */}
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} onToggle={toggleTodo} />
      <TodoStats
        todos={todos}
        active={activeCount}
        completed={completedCount}
        onClearCompleted={clearCompleted}
      />
    </div>
  )
}

export default App;