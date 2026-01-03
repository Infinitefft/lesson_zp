// 封装响应式 todos 业务
import {
  useState,
  useEffect,
} from 'react';

const STORAGE_KEY = 'todos';  // 好维护

const DEFAULT_TODOS = [
  { id: 1, text: '学习 React Hooks', completed: true },
  { id: 2, text: '准备大厂前端面试', completed: false },
  { id: 3, text: '使用小G提供的默认数据', completed: false }
];

function loadFromStorage() {
  const storedTodos = localStorage.getItem(STORAGE_KEY);
  if (!storedTodos) {
    return DEFAULT_TODOS;
  }
  return storedTodos ? JSON.parse(storedTodos) : [];
}

function saveToStorage(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export const useTodos = () => {
  // useState 接受函数 计算，这是同步的
  const [todos, setTodos] = useState(loadFromStorage);
  useEffect(() => {
    saveToStorage(todos);
  }, [todos]);

  const addTodo = (todo) => {
    setTodos(
      [
        ...todos,
        {
          id: Date.now(),
          text: todo,
          completed: false,
        }
      ]
    );
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo;
      })
    );
  }

  const deleteTodo = (id) => {
    setTodos(
      todos.filter(todo => todo.id !== id)
    );
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
  }
}