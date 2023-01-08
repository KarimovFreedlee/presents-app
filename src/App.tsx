import { useState } from 'react'
import './App.css'
import Animals from './components/Animals'
import History from './components/History'
import Kids from './components/Kids'
import Present from './components/Present'

function App() {

  return (
    <div className="App">
      <Animals/>
      <Kids/>
      <Present/>
      <History/>
    </div>
  )
}

export default App
