import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Login from '../Components/Login/Login'

function PublicLayout() {
   
    const isloggedIn = localStorage.getItem("isloggedIn")
    console.log(isloggedIn)
    if (isloggedIn) {
        return <Navigate to="/home" />
    }
    
    return <Outlet />
}

export default PublicLayout