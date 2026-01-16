export default function TodoList(props) {
  const {
    todos,
    onDelete,
    onToggle,
  } = props;

  return (
    <>
      <ul>
        {
          todos.length === 0 ? (
            <li className="empty">No todos yet!</li>
            ) : (
              todos.map(todo => (
                <li
                  key={todo.id}
                  className={todo.completed ? 'completed' : ''}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)} 
                  />
                    <span>{todo.text}</span>
                  <button onClick={() => onDelete(todo.id)}>X</button>
                </li>
              ))
          )
        }
      </ul>
    </>
  )
}