// src/components/TodoItem.jsx
import useTodoStore from '../store/todoStore'

function TodoItem({ todo }) {
  const toggleTodo = useTodoStore(state => state.toggleTodo)
  const removeTodo = useTodoStore(state => state.removeTodo)

  return (
    <li style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px',
      padding: '8px 0',
      borderBottom: '1px solid #eee'
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      <span style={{
        flex: 1,
        textDecoration: todo.completed ? 'line-through' : 'none',
        color: todo.completed ? '#999' : 'inherit'
      }}>
        {todo.text}
      </span>
      <button 
        onClick={() => removeTodo(todo.id)}
        style={{ color: 'red', cursor: 'pointer' }}
      >
        Delete
      </button>
    </li>
  )
}

export default TodoItem