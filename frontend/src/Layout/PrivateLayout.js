import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateLayout() {
    const isloggedIn = localStorage.getItem("isloggedIn")
    console.log(isloggedIn)

    if (isloggedIn) {
        return <Outlet />
    }

    return <Navigate to="/" />
}

export default PrivateLayout
