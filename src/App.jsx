import './css/App.css'
import Navbar from './Navbar'
import Login from './Login'
import { useState } from 'react'

function App() {

  const [accesstoken, setAccesstoken] = useState(localStorage.getItem("accesstoken"))
  const [refreshtoken, setRefreshtoken] = useState(localStorage.getItem("refreshtoken"))

  if (accesstoken && accesstoken != "undefined") {
    return (
      <Navbar/>
    )
  }

  return (
    <div className='container h-100 d-flex justify-content-center align-items-center'>
      <Login setAccesstoken={setAccesstoken}/>
    </div>
  )
}

export default App
