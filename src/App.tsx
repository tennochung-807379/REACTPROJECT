import { useState } from 'react'
import './App.css'
import TodoApp from './components/ToDo'; 

function App() {
  return (
    <>     
      <div className="card">
        <TodoApp />
      </div>    
    </>
  )
}

export default App
