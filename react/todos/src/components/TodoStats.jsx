export default function TodoStats(props) {
  const {
    total,
    active,
    completed,
    onClearCompleted
  } = props;
  return (
    <>
      <div className="todo-stats">
        <p>Total: {total} | Active: {active} | Completed: {completed}</p>
        {
          completed > 0 && (
            <button onClick={onClearCompleted}>Clear Completed</button>
          )
        }
      </div>
    </>
  )
}