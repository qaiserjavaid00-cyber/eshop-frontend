import React from "react";
import { useParams } from "react-router-dom";
import { ProductDetailsSkeleton } from "@/components/product/skeletons/ProductDetailsSkeleton";
import { useGetOrderById } from "@/hooks/orders/useGetOrder";

export const TrackOrderPage = () => {
    const { orderId } = useParams();
    const { data: order, isLoading } = useGetOrderById(orderId);

    if (isLoading) return <ProductDetailsSkeleton />;

    if (!order) return <div className="p-6 text-center">Order not found.</div>;

    // Order statuses for timeline
    const statuses = [
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Refund Initiated",
        "Refunded",
        "Partially Refunded",
    ];

    const currentIndex = statuses.indexOf(order.orderStatus);

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <h2 className="text-3xl font-bold text-center text-green-600">
                Track Your Order
            </h2>

            <p className="text-center text-gray-600">Order ID: <span className="font-mono">{order._id}</span></p>

            {/* Status Timeline */}
            <div className="flex justify-between items-center mt-8 mb-6 relative">
                {statuses.map((status, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center">
                        <div
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2
                ${idx <= currentIndex ? "bg-green-500 border-green-500 text-white" : "border-gray-300 text-gray-400"}`}
                        >
                            {idx <= currentIndex ? "✔" : idx + 1}
                        </div>
                        <span className="text-xs text-center">{status}</span>
                    </div>
                ))}

                {/* Horizontal line */}
                <div className="absolute top-3.5 left-4 right-4 h-0.5 bg-gray-200 z-0"></div>
            </div>

            {/* Products */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Products</h3>
                {order.products.map((p) => (
                    <div key={p.product._id} className="flex items-center gap-4 p-4 border rounded">
                        <img
                            src={p.product.images[0]}
                            alt={p.product.title}
                            className="w-20 h-20 object-cover rounded"
                        />
                        <div className="flex-1">
                            <p className="font-semibold">{p.product.title}</p>
                            {p.variant && (
                                <p className="text-sm text-gray-500">
                                    Variant: Size {p.size}, Color {p.color}
                                </p>
                            )}
                            <p className="text-sm text-gray-600">Qty: {p.count}</p>
                            <p className="text-sm font-bold">${p.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Payment Info */}
            <div className="p-4 border rounded space-y-2">
                <h3 className="text-xl font-semibold">Payment Details</h3>
                <p>Status: {order.isPaid ? "Paid" : "Pending"}</p>
                <p>Amount Paid: ${order.amountPaid}</p>
                <p>Payment ID: {order.paymentIntent?.id || "N/A"}</p>
                <p>Payment Status: {order.paymentIntent?.status || "N/A"}</p>
                <p>Shipping Address: {order.address}</p>
            </div>
        </div>
    );
};