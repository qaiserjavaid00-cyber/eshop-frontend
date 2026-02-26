import React from 'react'

const Banner = ({ title }) => {
    return (
        <div>
            <h1 className=' text-white uppercase my-2 h-24 flex justify-center items-center bg-gradient-to-bl from-black to-stone-600 '>{title}</h1>
        </div>
    )

}

export default Banner