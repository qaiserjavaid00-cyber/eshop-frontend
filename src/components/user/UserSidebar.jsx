import React from 'react'

import { NavLink } from 'react-router-dom'

export const UserSidebar = () => {

    return (
        <>
            <div className=' w-60 mt-3 min-h-screen rounded-lg p-4 shadow-lg flex'>
                <ul className='flex flex-col gap-6 font-bold text-brown-500 fixed'>
                    <li className='font-bold'>
                        <NavLink to="dashboard" className={({ isActive }) => isActive ? "text-orange-600" : "hover:text-orange-500"}>Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="wishlist" className={({ isActive }) => isActive ? "text-orange-600" : "hover:text-orange-500"}>Wishlist</NavLink>
                    </li>
                    <li>
                        <NavLink to="history" className={({ isActive }) => isActive ? "text-orange-600" : "hover:text-orange-500"}>History</NavLink>
                    </li>
                    <li>
                        <NavLink to="profile" className={({ isActive }) => isActive ? "text-orange-600" : "hover:text-orange-500"}>Profile</NavLink>
                    </li>

                </ul>
            </div>

        </>
    )
}

export default UserSidebar