import React from 'react'
import { useSelector } from 'react-redux'


export const Profile = () => {

    const profile = useSelector((state) => state.user.profile)
    const status = useSelector((state) => state.user.status)
    const admin = profile?.isAdmin === true
    return (
        <>
            <div className='flex flex-col justify-center items-center mt-10 gap-3'>

                <p>{profile?.name}</p>
                <p>{profile?.email}</p>
                <p>{profile?.address}</p>
                {admin && <h2>This is Admin</h2>}
                <p>{status}</p>
            </div>
        </>
    )
}
