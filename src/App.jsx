import './css/App.css'
import Navbar from './Navbar'
import Login from './Login'
import { useState } from 'react'

function App() {

  let accesstokenx = localStorage.getItem("accesstoken")
  let refreshtokenx = localStorage.getItem("refreshtoken")

  if(!accesstokenx || accesstokenx == "undefined") {
    accesstokenx = sessionStorage.getItem("accesstoken")
    refreshtokenx = sessionStorage.getItem("refreshtoken")
  }

  const [accesstoken, setAccesstoken] = useState(accesstokenx)
  const [refreshtoken, setRefreshtoken] = useState(refreshtokenx)

  if (accesstoken && accesstoken != "undefined") {
    return (
      <Navbar setAccesstoken={setAccesstoken}/>
    )
  }

  return (
    <div className='container h-100 d-flex justify-content-center align-items-center'>
      <Login setAccesstoken={setAccesstoken}/>
    </div>
  )
}

export default App