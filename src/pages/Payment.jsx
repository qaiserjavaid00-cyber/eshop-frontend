// import React, { useEffect, useState } from "react";
// import {
//     Elements,
//     CardElement,
//     useStripe,
//     useElements,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// // Replace this with your actual Stripe publishable key
// const stripePromise = loadStripe("pk_test_51QhVLWGM6m708kpuOFtzAf95V75yJebYhrAX3zd70lGjdZbMmcvwBZtRmoYpVN4TtF172Hezyf4VBxtO5ndcYkFh00Ttso3DXz");

// const CheckoutForm = ({ totalAmount }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const navigate = useNavigate();

//     const [clientSecret, setClientSecret] = useState("");
//     const [processing, setProcessing] = useState(false);
//     const [error, setError] = useState("");

//     // Create payment intent on mount
//     useEffect(() => {
//         if (!totalAmount) return;

//         axios
//             .post(
//                 "http://localhost:8000/api/stripe/create-payment-intent",
//                 { totalAmount },
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//             )
//             .then((res) => {
//                 setClientSecret(res.data.clientSecret);
//             })
//             .catch((err) => {
//                 console.error("❌ Stripe PaymentIntent error:", err.response?.data || err.message);
//                 setError("Failed to initialize payment. Please try again.");
//             });
//     }, [totalAmount]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!clientSecret || !stripe || !elements) {
//             setError("Stripe is not ready or client secret is missing.");
//             return;
//         }

//         setProcessing(true);

//         const payload = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card: elements.getElement(CardElement),
//             },
//         });

//         if (payload.error) {
//             setError(`❌ Payment failed: ${payload.error.message}`);
//             setProcessing(false);
//         } else {
//             try {
//                 // Save order in the DB
//                 await axios.post(
//                     "http://localhost:8000/order/create",
//                     {
//                         paymentIntent: payload.paymentIntent,
//                     },
//                     { withCredentials: true }
//                 );

//                 // Navigate to success page
//                 navigate("/order-success");
//             } catch (err) {
//                 console.error("❌ Order creation failed:", err.response?.data || err.message);
//                 setError("Payment succeeded but failed to save the order.");
//                 setProcessing(false);
//             }
//         }
//     };

//     return clientSecret ? (
//         <form
//             onSubmit={handleSubmit}
//             className="max-w-md mx-auto p-4 shadow-md rounded border mt-10"
//         >
//             <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
//             <CardElement className="p-2 border rounded mb-4" />
//             <button
//                 type="submit"
//                 disabled={processing || !stripe || !elements}
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
//             >
//                 {processing ? "Processing..." : "Pay Now"}
//             </button>
//             {error && <p className="text-red-500 mt-2">{error}</p>}
//         </form>
//     ) : (
//         <p className="text-center text-gray-600 mt-10">🔄 Preparing payment...</p>
//     );
// };

// export const Payment = () => {
//     const [total, setTotal] = useState(0);

//     useEffect(() => {
//         axios
//             .get("http://localhost:8000/cart/mycart", {
//                 withCredentials: true,
//             })
//             .then((res) => {
//                 const totalAmount = res.data.totalAfterDiscount || res.data.cartTotal;
//                 setTotal(totalAmount);
//             })
//             .catch((err) => {
//                 console.error("❌ Failed to load cart total:", err.message);
//             });
//     }, []);

//     return (
//         <Elements stripe={stripePromise}>
//             <CheckoutForm totalAmount={total} />
//         </Elements>
//     );
// };


import React, { useEffect, useState } from "react";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe("pk_test_51QhVLWGM6m708kpuOFtzAf95V75yJebYhrAX3zd70lGjdZbMmcvwBZtRmoYpVN4TtF172Hezyf4VBxtO5ndcYkFh00Ttso3DXz");

const CheckoutForm = ({ totalAmount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!totalAmount) return;

        axios
            .post(
                "http://localhost:8000/api/stripe/create-payment-intent",
                { totalAmount },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                setClientSecret(res.data.clientSecret);
            })
            .catch((err) => {
                console.error("❌ Stripe PaymentIntent error:", err.response?.data || err.message);
                setError("Failed to initialize payment. Please try again.");
            });
    }, [totalAmount]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!clientSecret || !stripe || !elements) {
            setError("Stripe is not ready or client secret is missing.");
            return;
        }

        setProcessing(true);

        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (stripeError) {
            setError(`❌ Payment failed: ${stripeError.message}`);
            setProcessing(false);
        } else if (paymentIntent.status === "succeeded") {
            try {
                await axios.post(
                    "http://localhost:8000/order/create",
                    {
                        paymentIntent,
                        address: "Customer Address Here", // You can pass actual user address if needed
                    },
                    { withCredentials: true }
                );

                navigate("/order-success");
            } catch (err) {
                console.error("❌ Order creation failed:", err.response?.data || err.message);
                setError("Payment succeeded but failed to save the order.");
                setProcessing(false);
            }
        }
    };

    return clientSecret ? (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-4 shadow-md rounded border mt-10"
        >
            <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
            <CardElement className="p-2 border rounded mb-4" />
            <button
                type="submit"
                disabled={processing || !stripe || !elements}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            >
                {processing ? "Processing..." : "Pay Now"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    ) : (
        <p className="text-center text-gray-600 mt-10">🔄 Preparing payment...</p>
    );
};

export const Payment = () => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        axios
            .get("http://localhost:8000/cart/mycart", {
                withCredentials: true,
            })
            .then((res) => {
                const totalAmount = res.data.totalAfterDiscount || res.data.cartTotal;
                setTotal(totalAmount);
            })
            .catch((err) => {
                console.error("❌ Failed to load cart total:", err.message);
            });
    }, []);

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm totalAmount={total} />
        </Elements>
    );
};
