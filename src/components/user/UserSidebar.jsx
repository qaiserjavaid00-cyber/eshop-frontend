import React from 'react'

import { Link } from 'react-router-dom'

export const UserSidebar = () => {

    return (
        <>
            <div className=' w-60 mt-3 min-h-screen rounded-lg p-4 shadow-lg flex'>
                <ul className='flex flex-col gap-6 font-bold text-brown-500 fixed'>
                    <li className='font-bold'>
                        <Link to="dashboard" className='text-2xl visited:text-red-400 border-b-2 hover:scale-105 hover:border-orange-700 hover:text-orange-700 py-2'>Dashboard</Link>
                    </li>
                    <li>
                        <Link to="wishlist" className='visited:text-red-400 border-b-2 hover:scale-105 hover:border-orange-700 hover:text-orange-700 py-2'>Wishlist</Link>
                    </li>
                    <li>
                        <Link to="history" className='visited:text-red-400 border-b-2 hover:scale-105 hover:border-orange-700 hover:text-orange-700 py-2'>History</Link>
                    </li>
                    <li>
                        <Link to="profile" className='visited:text-red-400 border-b-2 hover:scale-105 hover:border-orange-700 hover:text-orange-700 py-2'>Profile</Link>
                    </li>

                </ul>
            </div>

        </>
    )
}

export default UserSidebar