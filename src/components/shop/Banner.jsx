// import React from 'react'

// const Banner = ({ title }) => {
//     return (
//         <div>
//             <h1 className=' text-white uppercase my-2 h-24 flex justify-center items-center bg-gradient-to-bl from-black to-stone-600 '>{title}</h1>
//         </div>
//     )

// }

// export default Banner

import React from "react";

const Banner = ({ title, imageUrl }) => {
    return (
        <div
            className="relative h-24 flex justify-center items-center my-2 rounded-lg overflow-hidden"
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Title text */}
            <h1 className="relative text-white uppercase font-bold text-lg md:text-xl">
                {title}
            </h1>
        </div>
    );
};

export default Banner;