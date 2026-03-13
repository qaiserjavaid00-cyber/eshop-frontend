import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { RxCross2 } from 'react-icons/rx';
import { AiOutlineCheck } from 'react-icons/ai';

import { clearBuyNowItem, removeFromCart, updateCartQty } from "../../redux/cartSlice"; // adjust path if needed
import { Link, useNavigate } from 'react-router-dom';
import Banner from '@/components/shop/Banner';
import { Button } from '@/components/ui/button';
import { useSaveCart } from '@/hooks/cart/useCart';
import { toast } from 'react-toastify';

export const CartScreen = () => {

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { cartItems } = cart
    const totalQty = cartItems.reduce((a, c) => a + c.qty, 0)
    const { shippingPrice } = cart
    const { taxPrice } = cart;
    const { totalPrice } = cart
    const { mutate: saveCart, isPending: isSavingCart } = useSaveCart();
    console.log("cart items from cartscreen", cartItems)

    useEffect(() => {
        dispatch(clearBuyNowItem())
    }, [])

    function handleRemove(id) {
        dispatch(removeFromCart(id))
    }


    return (
        <>
            <Banner title="Cart" imageUrl="https://res.cloudinary.com/dfgeq4iix/image/upload/v1772447486/mern-ecommerce/nygat7mhpccrtbih6o5i.jpg"
            />
            {cartItems.length > 0 ? <div className='flex flex-col md:flex-row max-w-6xl mx-auto'>
                <div className="w-full md:w-3/4">
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr className=" text-left text-sm uppercase">
                                <th className="p-3 border">Image</th>
                                <th className="p-3 border">Title</th>
                                <th className="p-3 border">Brand</th>
                                <th className="p-3 border">Count</th>
                                <th className="p-3 border">Price</th>
                                <th className="p-3 border">Shipping</th>
                                <th className="p-3 border">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Example row, map over cart items here */}
                            {cartItems?.map((item, index) => (
                                <tr key={index} className="border-t text-sm">
                                    <td className="p-3 border">
                                        <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                                    </td>
                                    <td className="p-3 border font-medium">{item.title}</td>
                                    <td className="p-3 border">{item.color}-{item.size}</td>
                                    {/* <td className="p-3 border">{item.qty}</td> */}

                                    <td className="p-3 border">
                                        <input
                                            type="number"
                                            min="1"
                                            max={item.countInStock}   // <-- Limit to available stock
                                            value={item.qty}
                                            onChange={(e) => {
                                                const newQty = Number(e.target.value);
                                                // optional: prevent exceeding stock
                                                if (newQty > item.countInStock) return;
                                                dispatch(updateCartQty({
                                                    _id: item._id,
                                                    size: item.size,
                                                    color: item.color,
                                                    qty: newQty
                                                }))
                                            }}
                                            className="w-16 border rounded px-2 py-1"
                                        />
                                        <p className='text-xs pt-1'>only {item.countInStock} left</p>
                                    </td>


                                    <td className="p-3 border">${item.price}</td>
                                    <td className="p-3 border">{item.shipping ? <AiOutlineCheck /> : "No"}</td>
                                    <td className="p-3 border text-red-500 cursor-pointer" onClick={() => handleRemove({ _id: item._id, size: item.size, color: item.color })}>
                                        <RxCross2 />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='w-full md:w-1/4 px-6 py-4 rounded-lg shadow-md md:ml-6'>
                    <h2 className='text-xl font-semibold mb-4 border-b pb-2'>Order Summary</h2>

                    <div className='space-y-3'>
                        {cartItems?.map((item, idx) => (
                            <div key={idx} className='text-sm'>
                                <p className='font-medium truncate'>{item.title}</p>
                                <p >
                                    {item.qty} × ${item.price} = <span className='font-semibold'>${item.qty * item.price}</span>
                                </p>


                            </div>
                        ))}
                    </div>

                    <div className='mt-6 border-t pt-4 space-y-2 text-sm'>
                        <p className='flex justify-between'>
                            <span>Total Items:</span>
                            <span className='font-semibold'>{totalQty}</span>
                        </p>
                        <p className='flex justify-between'>
                            <span>Shipping Price:</span>
                            <span className='font-semibold'>{shippingPrice}</span>
                        </p>
                        <p className='flex justify-between'>
                            <span>Tax Price:</span>
                            <span className='font-semibold'>${taxPrice}  </span>
                        </p>
                        <p className='flex justify-between'>
                            <span>Total Price:</span>
                            <span className='font-bold'>${totalPrice}</span>
                        </p>
                    </div>
                    <Button onClick={() => {
                        const cartData = {

                            products: cartItems.map(item => ({
                                product: item.productId,
                                variant: item._id,
                                count: item.qty,
                                color: item.color || "N/A",
                                price: item.price,
                                size: item.size,
                            })),
                            cartTotal: totalPrice,
                            totalAfterDiscount: totalPrice,

                        };
                        saveCart(cartData, {
                            onSuccess: () => {
                                navigate("/checkout");
                            },
                            onError: (err) => {
                                toast.error("Failed to save cart. Please try again.");
                            },
                        });

                    }}
                        disabled={isSavingCart}
                        className='w-full my-2'
                    >
                        {isSavingCart ? "Saving..." : "Proceed to Checkout"}
                    </Button>


                </div>

            </div >
                :
                <div className='max-w-6xl mx-auto text-center'>
                    <h2>Your Cart is Empty</h2>
                    <Button
                        asChild
                        size="sm"
                        className="mt-3"
                    >
                        <Link to="/shop">Shop Now</Link>
                    </Button>
                </div>
            }
        </>
    )
}
