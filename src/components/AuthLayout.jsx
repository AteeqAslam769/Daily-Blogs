import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function AuthLayout({children,authentication}) {
    const authstatus = useSelector((state)=>state.status)
    const [loader,setLoader] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        if(authentication&&authstatus!==authentication)
            navigate('/login')
        else if(!authentication&&authstatus!==authentication)
            navigate('/')
        setLoader(false)
    },[navigate,])
    return (
        loader?<h1>Loading...</h1>:<>{children}</>
    )
}

export default AuthLayout
