import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetOrderById } from "@/hooks/orders/useGetOrder";
import { Button } from "@/components/ui/button";
import { ProductDetailsSkeleton } from "@/components/product/skeletons/ProductDetailsSkeleton";

export const SuccessPage = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { data: order, isLoading, isError, error } = useGetOrderById(orderId);

    if (isLoading) return <ProductDetailsSkeleton />;

    if (isError)
        return (
            <div className="p-10 text-center">
                <h2 className="text-2xl font-bold text-red-500">Error</h2>
                <p className="mt-2 text-gray-600">{error?.message || "Failed to load order."}</p>
            </div>
        );

    const handleTrackOrder = () => {
        navigate(`/order/${order._id}/track`);
    };

    const handleDownloadReceipt = () => {
        if (order.paymentIntent?.id) {
            const receiptUrl = `https://dashboard.stripe.com/payments/${order.paymentIntent.id}`;
            window.open(receiptUrl, "_blank");
        } else {
            alert("Receipt not available.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 shadow rounded-lg mt-10">
            {/* Header */}
            <h2 className="text-3xl font-bold text-green-600 text-center">
                Payment Successful!
            </h2>
            <p className="mt-3 text-center text-gray-700">Thank you for your order.</p>

            {/* Order Summary */}
            <div className="mt-6  p-6 rounded-lg space-y-3">
                <p>
                    <strong>Order ID:</strong> {order._id}
                </p>
                <p>
                    <strong>Order Status:</strong> {order.orderStatus}
                </p>
                <p>
                    <strong>Amount Paid:</strong> ${order.amountPaid?.toFixed(2)}
                </p>
                <p>
                    <strong>Paid At:</strong> {new Date(order.paidAt).toLocaleString()}
                </p>
            </div>

            {/* Product List */}
            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3">Your Items</h3>
                <ul className="divide-y divide-gray-200">
                    {order.products.map((item) => (
                        <li key={item._id || item.product._id} className="flex flex-col md:flex-row md:items-center md:justify-between py-3">
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.variant?.images?.[0] || item.product.images?.[0]}
                                    alt={item.product.title}
                                    className="w-20 h-20 object-cover rounded-md border"
                                />
                                <div>
                                    <p className="font-medium">{item.product.title}</p>
                                    {item.variant && (
                                        <p className="text-sm text-gray-500">
                                            Variant: Size {item.size}, Color {item.color}
                                        </p>
                                    )}
                                    <p className="text-sm text-gray-500">Quantity: {item.count}</p>
                                </div>
                            </div>
                            <p className="mt-2 md:mt-0 font-semibold">${item.price}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
                <Button
                    onClick={handleDownloadReceipt}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700  rounded-full px-6 py-2"
                >
                    Download Receipt
                </Button>

                <Button
                    onClick={handleTrackOrder}
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600  rounded-full px-6 py-2"
                >
                    Track Order
                </Button>

                <Button asChild size="sm" className="bg-green-500 hover:bg-green-600  rounded-full px-6 py-2">
                    <Link to="/shop">Continue Shopping</Link>
                </Button>
            </div>
        </div>
    );
};