import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginOutAPI } from '../Api/userApi'
import { resetUser } from '../redux/userSlice'

export const Logout = () => {
    const profile = useSelector((state) => state.user.profile)
    const dispatch = useDispatch()
    async function logoutHandler() {
        await loginOutAPI()
        dispatch(resetUser())
    }

    return (
        <>
            <div className='bg-gray-100 shadow-lg'>
                <ul className='flex flex-col gap-3 p-3 rounded-lg w-32 text-xs '>
                    <li>{profile?.name}</li>
                    <li><Link to="/profile" className='hover:animate-pulse hover:text-gray-300 rounded-xl'>Profile</Link></li>
                    <li><button onClick={logoutHandler} className='bg-orange-500 px-2 py-1 hover:bg-orange-500/50'>logout</button></li>
                </ul>
            </div>
        </>
    )
}
