import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {appwriteAuthService} from '../../appwrite/auth'
import {logout as storeLogout } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    function logout(){
        appwriteAuthService.logout().then(()=>{
            dispatch(storeLogout())
            navigate('/')
        })
    }

    return (
        <button 
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logout}> Logout</button>
    )
}

export default LogoutBtn
