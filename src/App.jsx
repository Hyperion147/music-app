import { useState } from 'react'
import {Button } from "./components/ui/button.jsx"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className='text-center'>Music App</h1>
      <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
    </>
  )
}

export default App
