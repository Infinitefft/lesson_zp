import TodoItem from './TodoItem.jsx'
import { useTodos } from '../hooks/useTodos';

export default function TodoList({
  todos = [],
  onDelete,
  onToggle,
}) {
  return (
    <ul className="todo-list" >
      {
        todos.map(todo => {
          return (
            <TodoItem 
              key = {todo.id}
              todo = {todo}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          )
        })
      }
    </ul>
  )
}