// src/components/TodoList.jsx
import useTodoStore from '../store/todoStore'
import TodoItem from './TodoItem'

function TodoList() {
  const todos = useTodoStore(state => state.todos)
  const clearCompleted = useTodoStore(state => state.clearCompleted)

  const hasCompleted = todos.some(todo => todo.completed)

  return (
    <div>
      {todos.length === 0 && (
        <p style={{ color: '#999', fontStyle: 'italic' }}>No todos yet. Add one above!</p>
      )}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      {hasCompleted && (
        <button 
          onClick={clearCompleted}
          style={{ marginTop: '12px', color: '#666' }}
        >
          Clear Completed
        </button>
      )}
    </div>
  )
}

export default TodoList