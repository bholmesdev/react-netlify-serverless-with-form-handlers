import { useState } from 'react'
import logo from './logo.svg'
import Form from './components/Form'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <h1>Serverless TS + React + Netlify!</h1>
      </header>
      <main>
        <Form />
      </main>
    </>
  )
}

export default App
