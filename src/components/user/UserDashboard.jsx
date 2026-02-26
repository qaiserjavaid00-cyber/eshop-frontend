import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSidebar from './UserSidebar'

// import { Dashboard } from '../components/Dashboard'

// const UserDashboard = () => {
//     return (
//         <>
//             <div className='flex'>
//                 {/* <Dashboard /> */}
//                 <UserSidebar />
//                 <div className='w-full'>
//                     <Outlet />
//                 </div>
//             </div>

//         </>

//     )
// }
// export default UserDashboard



const UserDashboard = () => {
    return (
        <div>
            <div className='flex'>
                <UserSidebar />
                <div className='w-full'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default UserDashboard