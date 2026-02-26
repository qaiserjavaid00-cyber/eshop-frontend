import { Ban } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
// import { Navigate } from 'react-router-dom'

const AuthRoute = ({ children }) => {
    const profile = useSelector((state) => state.user.profile)
    const admin = profile?.isAdmin === true

    if (admin) { return children }

    // return <Navigate to="/login" />;
    return <div>
        <div className='flex h-screen items-center justify-center font-bold text-orange-600 text-5xl'><Ban size={70} /> Unauthorized: Admin Only</div>
    </div>

}

export default AuthRoute