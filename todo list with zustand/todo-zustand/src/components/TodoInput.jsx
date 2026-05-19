// src/components/TodoInput.jsx
import { useState } from 'react'
import useTodoStore from '../store/todoStore'

function TodoInput() {
  const [text, setText] = useState('')         // local state for the input field
  const addTodo = useTodoStore(state => state.addTodo)  // grab just the action we need

  const handleSubmit = () => {
    if (text.trim()) {       // don't add empty todos
      addTodo(text.trim())
      setText('')            // clear input after adding
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()   // allow pressing Enter to add
  }

  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a new todo..."
        style={{ flex: 1, padding: '8px' }}
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  )
}

export default TodoInput