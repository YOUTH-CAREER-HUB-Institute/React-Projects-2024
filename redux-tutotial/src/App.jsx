import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CounterView  from './features/counter/CounterView'

function App() {
  return (
    <div>
      <h1>Basic counter application</h1>
      <CounterView />
    </div>
  )
}

export default App
