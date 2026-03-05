import React, { useState, useEffect } from 'react';
import './App.css';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  editing?: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const newTodoItem: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, editing: true } : todo
      )
    );
  };

  const saveEdit = (id: string, newText: string) => {
    if (newText.trim() === '') return;
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim(), editing: false } : todo
      )
    );
  };

  const cancelEdit = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, editing: false } : todo
      )
    );
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <div className="app">
      <div className="header">
        <h1>✨ TodoList</h1>
        <p>高效管理你的任务</p>
      </div>

      <div className="input-section">
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && addTodo()}
          placeholder="添加新任务..."
          className="todo-input"
        />
        <button onClick={addTodo} className="add-btn">
          ➕ 添加
        </button>
      </div>

      <div className="filter-section">
        <button 
          onClick={() => setFilter('all')} 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        >
          全部 ({todos.length})
        </button>
        <button 
          onClick={() => setFilter('active')} 
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
        >
          进行中 ({activeCount})
        </button>
        <button 
          onClick={() => setFilter('completed')} 
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
        >
          已完成 ({completedCount})
        </button>
      </div>

      <div className="stats-section">
        <span>总计：{todos.length} 项</span>
        <span>进行中：{activeCount} 项</span>
        <span>已完成：{completedCount} 项</span>
      </div>

      <div className="todos-list">
        {filteredTodos.length === 0 ? (
          <div className="empty-state">
            <p>暂无任务，快添加一个吧！</p>
          </div>
        ) : (
          filteredTodos.map(todo => (
            <div 
              key={todo.id} 
              className={`todo-item ${todo.completed ? 'completed' : ''} ${todo.editing ? 'editing' : ''}`}
            >
              {todo.editing ? (
                <div className="edit-form">
                  <input
                    type="text"
                    defaultValue={todo.text}
                    autoFocus
                    onBlur={e => saveEdit(todo.id, e.target.value)}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        saveEdit(todo.id, e.currentTarget.value);
                      }
                    }}
                    className="edit-input"
                  />
                  <div className="edit-actions">
                    <button 
                      onClick={() => saveEdit(todo.id, (e.target as HTMLInputElement).value)}
                      className="save-btn"
                    >
                      ✅ 保存
                    </button>
                    <button 
                      onClick={() => cancelEdit(todo.id)}
                      className="cancel-btn"
                    >
                      ❌ 取消
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="todo-content">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="todo-checkbox"
                    />
                    <span className="todo-text">{todo.text}</span>
                  </div>
                  <div className="todo-actions">
                    <button 
                      onClick={() => startEditing(todo.id)}
                      className="edit-btn"
                    >
                      ✏️ 编辑
                    </button>
                    <button 
                      onClick={() => deleteTodo(todo.id)}
                      className="delete-btn"
                    >
                      🗑️ 删除
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {todos.length > 0 && (
        <div className="clear-section">
          <button 
            onClick={() => setTodos(todos.filter(todo => !todo.completed))}
            className="clear-btn"
          >
            清除已完成任务
          </button>
        </div>
      )}
    </div>
  );
}

export default App;