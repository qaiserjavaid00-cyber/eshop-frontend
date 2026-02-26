
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const status = useSelector((state) => state.user.status)
    const auth = status === "authenticated"

    if (auth) { return children }

    return <Navigate to="/login" />;


}

export default ProtectedRoute