import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import CssBaseline from '@mui/material/CssBaseline'
import Button from '@mui/material/Button'
import ThumbUp from '@mui/icons-material/ThumbUp'
import TodoList from './components/ToDoList';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div style={{ margin: "2em" }}>
        <TodoList />
      </div>

      <Button variant="outlined" startIcon={<ThumbUp />}>
        OK
      </Button>


    </div>
  )
}

export default App
