// src/App.jsx
import React from 'react'             // ← add this
import useTodoStore from './store/todoStore'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

function App() {
  const todoCount = useTodoStore(state => state.todos.length)
  const completedCount = useTodoStore(
    state => state.todos.filter(todo => todo.completed).length
  )

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '40px auto', 
      padding: '24px',
      fontFamily: 'sans-serif',
      border: '1px solid #ddd',
      borderRadius: '8px'
    }}>
      <h1>Todo List with Zustand</h1>
      <TodoInput />
      <div style={{ marginBottom: '16px', color: '#555', fontSize: '14px' }}>
        <span>Total: {todoCount}</span>
        {'  |  '}
        <span>Completed: {completedCount}</span>
        {'  |  '}
        <span>Remaining: {todoCount - completedCount}</span>
      </div>
      <TodoList />
    </div>
  )
}

export default App