import {
  useTodos,
} from './hooks/useTodos';

export default function App() {
  const {
    todos, 
    addTodo, 
    toggleTodo, 
    removeTodo
  } = useTodos();
  return (
    <>
      <div>
        <h1>TOdoList</h1>
        <TodoInput onAdd={addTodo} />
        <TodoList 
          todos = {todos}
          onToggle={toggleTodo}
          onRemove={removeTodo}
        />
      </div>
    </>
  )
}