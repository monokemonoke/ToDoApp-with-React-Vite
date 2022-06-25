import { useState } from 'react'
import './App.css'
import TodoList from './components/ToDoList';

function App() {
  return (
    <div className="App">
      <div style={{ margin: "2em" }}>
        <TodoList />
      </div>

    </div>
  )
}

export default App
