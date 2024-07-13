import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {appwriteAuthService} from "./appwrite/auth"
import {login, logout} from "./features/authSlice"
import { Footer, Header,Loader } from './components'
import { Outlet } from 'react-router-dom'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    appwriteAuthService.checkCurrentUserStatus()
    .then((userData) => {
      if (userData) {
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
    
  ) : <Loader/>
}

export default App