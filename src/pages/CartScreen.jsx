import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { RxCross2 } from 'react-icons/rx';
import { AiOutlineCheck } from 'react-icons/ai';
import { useMutation } from '@tanstack/react-query';
import { saveCartAPI } from "../Api/cartApi";
import { toast } from 'react-toastify'; // Optional for feedback

import { clearBuyNowItem, removeFromCart, updateCartQty } from "../redux/cartSlice"; // adjust path if needed
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Banner from '@/components/shop/Banner';
import { Button } from '@/components/ui/button';

const BASE_URL = "http://localhost:8000";



export const CartScreen = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const { cartItems } = cart
    const totalQty = cartItems.reduce((a, c) => a + c.qty, 0)
    const { shippingPrice } = cart
    const { taxPrice } = cart;
    const { totalPrice } = cart

    console.log("cart Items=======", cartItems)
    // const totalPrice = (cartItems.reduce((a, c) => a + c.qty * c.price, 0))
    useEffect(() => {
        dispatch(clearBuyNowItem())
    }, [])

    function handleRemove(id) {
        dispatch(removeFromCart(id))
    }

    const mutation = useMutation({
        mutationFn: saveCartAPI,
        onSuccess: (data) => {
            toast.success("Cart saved successfully!");
            // Navigate or reset cart if needed
            navigate("/checkout")
        },
        onError: (err) => {
            toast.error("Failed to save cart.");
            console.error(err);
        }
    });


    const { mutate: placeCODOrder, isPending: isPlacingOrder } = useMutation({
        mutationFn: () => axios.post(`${BASE_URL}/order/cod`, {}, { withCredentials: true }),
        onSuccess: () => {
            toast.success("Order placed (Cash on Delivery)");
            navigate("/success");
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message?.message)
            console.log(error)

        },

    });



    return (
        <>
            <Banner title="Cart" />
            <div className='flex max-w-6xl mx-auto'>
                <div className="w-3/4 overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100 text-left text-gray-600 text-sm uppercase">
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

                <div className='w-1/4 px-6 py-4 bg-gray-50 rounded-lg shadow-md ml-6'>
                    <h2 className='text-xl font-semibold mb-4 border-b pb-2'>Order Summary</h2>

                    <div className='space-y-3'>
                        {cartItems?.map((item, idx) => (
                            <div key={idx} className='text-sm'>
                                <p className='font-medium text-gray-700 truncate'>{item.title}</p>
                                <p className='text-gray-600'>
                                    {item.qty} × ${item.price} = <span className='font-semibold'>${item.qty * item.price}</span>
                                </p>


                            </div>
                        ))}
                    </div>

                    <div className='mt-6 border-t pt-4 space-y-2 text-sm'>
                        <p className='flex justify-between'>
                            <span className='text-gray-700'>Total Items:</span>
                            <span className='font-semibold'>{totalQty}</span>
                        </p>
                        <p className='flex justify-between'>
                            <span className='text-gray-700'>Shipping Price:</span>
                            <span className='font-semibold'>{shippingPrice}</span>
                        </p>
                        <p className='flex justify-between'>
                            <span className='text-gray-700'>Tax Price:</span>
                            <span className='font-semibold'>${taxPrice}  </span>
                        </p>
                        <p className='flex justify-between'>
                            <span className='text-gray-700'>Total Price:</span>
                            <span className='font-bold text-gray-600'>${totalPrice}</span>
                        </p>
                    </div>
                    <Button onClick={() => {
                        const cartData = {
                            products: cartItems.map(item => ({
                                product: item.productId,
                                variant: item._id,
                                count: item.qty,
                                color: item.color || "N/A", // Adjust as needed
                                price: item.price,
                                size: item.size,
                            })),
                            cartTotal: totalPrice,
                            totalAfterDiscount: totalPrice, // adjust if discount is applied
                            // orderdBy: "USER_ID", // ideally taken from auth context / token
                        };
                        mutation.mutate(cartData);
                    }}
                        disabled={mutation.isPending}
                        className='w-full my-2'
                    >
                        {mutation.isPending ? "Saving..." : "Proceed to Checkout"}
                    </Button>

                    <Button
                        onClick={() => placeCODOrder()}
                        disabled={isPlacingOrder}
                        className="w-full"
                    >
                        {isPlacingOrder ? "Placing COD Order..." : "Cash On Delivery"}
                    </Button>

                </div>

            </div>
        </>
    )
}
