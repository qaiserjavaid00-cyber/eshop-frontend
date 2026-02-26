
// // src/pages/PlaceOrder.jsx
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { clearCartItems } from "../redux/cartSlice";

// export default function PlaceOrder() {
//     const stripe = useStripe();
//     const elements = useElements();

//     // 🛒 Redux state
//     const user = useSelector((state) => state.user.profile);
//     const shippingAddress = useSelector((state) => state.cart.shippingAddress);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { state } = useLocation();


//     const cartTotal = state?.cartTotal;
//     const totalAfterDiscount = state?.totalAfterDiscount;

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // ✅ Utility: Get item price (sale if exists, else mrp)
//     // ✅ Form submit
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (loading) return;
//         setLoading(true);
//         setError(null);

//         if (!stripe || !elements) {
//             setError("Stripe has not loaded yet.");
//             setLoading(false);
//             return;
//         }

//         try {


//             // 🔑 Request payment intent from backend
//             const { data } = await axios.post(
//                 "http://localhost:8000/order/create-payment-intent",
//                 {
//                     shippingAddress,

//                 },
//                 { withCredentials: true }
//             );

//             if (!data.clientSecret) {
//                 throw new Error("Missing client secret from backend");
//             }

//             // 💳 Confirm payment with Stripe
//             const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
//                 payment_method: {
//                     card: elements.getElement(CardElement),
//                     billing_details: {
//                         name: user?.name || "Guest User",
//                         email: user?.email || "guest@example.com",
//                     },
//                 },
//             });

//             if (paymentResult.error) {
//                 setError(paymentResult.error.message);
//             } else if (paymentResult.paymentIntent.status === "succeeded") {
//                 dispatch(clearCartItems());
//                 navigate(`/order/success/${data.orderId}`);
//             }
//         } catch (err) {
//             console.error("❌ CHECKOUT ERROR:", err);
//             setError(err.response?.data?.message || err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // 🛒 Handle empty cart
//     if (!shippingAddress) {
//         return (
//             <div className="container mx-auto px-4 py-8 text-center">
//                 <h1 className="text-2xl font-bold">Checkout</h1>
//                 <p className="text-gray-500">Can't Ship without Shipping Address.</p>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-2xl font-bold mb-6">Checkout</h1>

//             <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
//                 {/* Stripe Card Input */}
//                 <div className="border rounded-lg p-4">
//                     <CardElement
//                         options={{
//                             style: {
//                                 base: {
//                                     fontSize: "16px",
//                                     color: "#32325d",
//                                     "::placeholder": { color: "#a0aec0" },
//                                 },
//                                 invalid: { color: "#fa755a" },
//                             },
//                         }}
//                     />
//                 </div>

//                 {/* Order Summary */}
//                 <div className="border rounded-lg p-4 space-y-2">
//                     <h2 className="font-semibold text-lg">Order Summary</h2>


//                     <div className="border-t pt-2 flex justify-between font-bold">
//                         <span>Total</span>
//                         <span>${cartTotal.toFixed(2)}</span>
//                         <span>Total After Discount</span>
//                         <span>${totalAfterDiscount.toFixed(2)}</span>
//                     </div>
//                 </div>

//                 {/* Pay Button */}
//                 <button type="submit" className="w-full" disabled={!stripe || loading}>
//                     {loading ? "Processing..." : `Pay $${totalAfterDiscount.toFixed(2)}`}
//                 </button>

//                 {/* Error Messages */}
//                 {error && <p className="text-red-500 mt-2">{error}</p>}
//             </form>
//         </div>
//     );
// }

///v2 for buy now

// src/pages/PlaceOrder.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { clearCartItems } from "../redux/cartSlice";

export default function PlaceOrder() {
    const stripe = useStripe();
    const elements = useElements();

    // 🛒 Redux state
    const user = useSelector((state) => state.user.profile);
    const shippingAddress = useSelector((state) => state.cart.shippingAddress);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();

    // ✅ Detect mode
    const buyNowItem = state?.buyNowItem;
    const isBuyNow = !!buyNowItem;

    // 🛒 Cart totals (existing logic)
    const cartTotal = state?.cartTotal;
    const totalAfterDiscount = state?.totalAfterDiscount;


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        setError(null);

        if (!stripe || !elements) {
            setError("Stripe has not loaded yet.");
            setLoading(false);
            return;
        }

        try {
            let response;

            // ✅ BUY NOW FLOW
            if (isBuyNow) {
                response = await axios.post("http://localhost:8000/order/create-payment-intent-buy-now", {
                    productId: buyNowItem.productId,
                    variantId: buyNowItem.variantId,
                    quantity: buyNowItem.quantity,
                    couponCode: state?.couponCode,
                    shippingAddress,
                },
                    { withCredentials: true }
                );
            }
            // ✅ CART FLOW (UNCHANGED)
            else {
                response = await axios.post(
                    "http://localhost:8000/order/create-payment-intent",
                    {
                        shippingAddress,
                    },
                    { withCredentials: true }
                );
            }

            const data = response.data;

            if (!data.clientSecret) {
                throw new Error("Missing client secret from backend");
            }

            // 💳 Confirm payment
            const paymentResult = await stripe.confirmCardPayment(
                data.clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: user?.name || "Guest User",
                            email: user?.email || "guest@example.com",
                        },
                    },
                }
            );

            if (paymentResult.error) {
                setError(paymentResult.error.message);
            }
            else if (paymentResult.paymentIntent.status === "succeeded") {

                // ✅ Only clear cart if NOT buy now
                if (!isBuyNow) {
                    dispatch(clearCartItems());
                }

                navigate(`/order/success/${data.orderId}`);
            }
        } catch (err) {
            console.error("❌ CHECKOUT ERROR:", err);
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!shippingAddress) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold">Checkout</h1>
                <p className="text-gray-500">
                    Can't Ship without Shipping Address.
                </p>
            </div>
        );
    }

    // ✅ Display correct total
    const displayTotal = isBuyNow
        ? totalAfterDiscount || cartTotal
        : totalAfterDiscount || cartTotal;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">
                {isBuyNow ? "Buy Now Checkout" : "Checkout"}
            </h1>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">

                {/* Stripe Card Input */}
                <div className="border rounded-lg p-4">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#32325d",
                                    "::placeholder": { color: "#a0aec0" },
                                },
                                invalid: { color: "#fa755a" },
                            },
                        }}
                    />
                </div>

                {/* Order Summary */}
                <div className="border rounded-lg p-4 space-y-2">
                    <h2 className="font-semibold text-lg">Order Summary</h2>

                    {isBuyNow ? (
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>${displayTotal?.toFixed(2)}</span>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between">
                                <span>Total</span>
                                <span>${cartTotal?.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between font-bold border-t pt-2">
                                <span>Total After Discount</span>
                                <span>${totalAfterDiscount?.toFixed(2)}</span>
                            </div>
                        </>
                    )}
                </div>

                {/* Pay Button */}
                <button
                    type="submit"
                    className="w-full"
                    disabled={!stripe || loading}
                >
                    {loading
                        ? "Processing..."
                        : `Pay $${displayTotal?.toFixed(2)}`}
                </button>

                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
}