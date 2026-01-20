import { useState } from 'react'
import './App.css'
import Login from './Login'
import LegoList from './LegoList'

function App() {
  const [token, setToken] = useState(null)

  const handleLogout = () => {
    setToken(null)
  }

  return (
<>
      <h1>Lego Manager</h1>
      { token ? 
        <LegoList token={token} onLogout={handleLogout}/> 
        : 
        <Login onLogin={setToken}/>
      }
    </>
  )
}

export default App
