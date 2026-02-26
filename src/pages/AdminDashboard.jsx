import React from 'react'
import { AdminSidebar } from '../components/admin/AdminSidebar'
import { Outlet } from 'react-router-dom'
// import { Dashboard } from '../components/Dashboard'

export const AdminDashboard = () => {
    return (
        <div className='max-w-6xl mx-auto'>
            <div className='flex'>
                {/* <Dashboard /> */}
                <AdminSidebar />
                <div className='w-full p-4'>
                    <Outlet />
                </div>
            </div>

        </div>

    )
}
