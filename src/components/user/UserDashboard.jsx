import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSidebar from './UserSidebar'


const UserDashboard = () => {
    return (
        <div>
            <div className='flex max-w-6xl mx-auto'>
                <UserSidebar />
                <div className='w-full'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default UserDashboard