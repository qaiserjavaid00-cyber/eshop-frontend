import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaHome } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { BsCartFill, BsSearch } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { Logout } from './Logout';


export const Navbar = () => {
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
    const [srch, setSrch] = useState(false)
    const status = useSelector((state) => state.user.status)
    const profile = useSelector((state) => state.user.profile)
    const cart = useSelector((state) => state.cart)
    const admin = profile?.isAdmin === true;

    // console.log(cart.cartItems[0].qty)

    const quantity = cart.cartItems.reduce(
        (sum, item) => sum + Number(item.qty || 0),
        0
    );

    function handleChange(e) {
        setSrch(e.target.value)
    }
    function handleSubmit() {
        navigate(`/shop?search=${encodeURIComponent(srch)}`);
    }

    return (
        <>
            <div className='bg-gray-100 h-12 w-full flex justify-between shadow-lg items-center px-2 font-mono sticky top-0 z-10'>
                <div className='flex gap-12'>
                    <div className='flex justify-center items-center gap-2'>
                        <FaHome />
                        <Link to="/">
                            <span>Home</span>
                        </Link>
                    </div>

                    <div className='flex justify-center items-center gap-2'>
                        <FaShoppingBag />
                        <Link to="/shop">
                            <span>Shop</span>
                        </Link>
                    </div>

                    <div className='flex justify-center items-center gap-2'>
                        <BsCartFill />
                        <Link to="/cart">
                            <span>Cart:{quantity}</span>
                        </Link>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="search"
                        onChange={handleChange}

                    />
                    <button type='submit'><BsSearch /></button>
                </form>
                <div className='flex gap-12'>
                    {!admin ? <div>{profile?.name}</div> : <div><Link to="/admin">Admin</Link></div>}
                    {(status !== "authenticated") ? (
                        <div>
                            <div className='flex justify-center items-center gap-2  hover:bg-gray-400 hover:p-4'>
                                <CgProfile />
                                <Link to="/login" className='visited:text-red-600 font-bold border-b-4 visited:border-red-900'>
                                    <span className='active:bg-gray-400 active:p-4 active:rounded-lg'>Login</span>
                                </Link></div>
                            <div className='flex justify-center items-center gap-2'>
                                <SiGnuprivacyguard />
                                <Link to="/register">
                                    <span>Register</span>
                                </Link>
                            </div></div>) :

                        (
                            <div className="relative w-full">
                                <div onMouseOver={() => setShow(!show)} className='mr-10 cursor-pointer'><CgProfile size={24} /></div>
                                {show &&
                                    <div className='absolute top-8 right-4'>
                                        <Logout />
                                    </div>}
                            </div>
                        )

                    }


                </div>
            </div>
        </>
    )
}
