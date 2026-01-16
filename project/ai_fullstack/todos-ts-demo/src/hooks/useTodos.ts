import {
  useState,
} from 'react';

export function useTodos() {
  const [todos, setTotos] = useState([]);
  const addTodo = (title:string) => {
    const newTodo = {
      id: '111',
      title: 22,
      completed: false,
    }
  }
  return {
    todos,
  }
}