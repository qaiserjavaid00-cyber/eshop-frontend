import React from "react";
import { useQuery } from "@tanstack/react-query";

import moment from "moment";
import { getUserOrdersAPI } from "../Api/userApi";

export const OrderHistory = () => {
    const {
        data: orders,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["userOrders"],
        queryFn: getUserOrdersAPI,
        onSuccess: (data) => {
            console.log("User orders fetched successfully", data);
        },
        onError: (err) => {
            console.error("Failed to fetch user orders", err.message || err);
        },
    });

    if (isLoading) return <div className="text-center py-10">Loading...</div>;
    if (isError) return <div className="text-center text-red-500 py-10">{error?.message}</div>;

    return (
        <div className="max-w-5xl mx-auto p-4 space-y-6">
            <h2 className="text-3xl font-bold text-center mb-6">My Orders</h2>

            {orders?.length === 0 ? (
                <p className="text-center">You have no orders yet.</p>
            ) : (
                orders.map((order) => (
                    <div key={order._id} className="bg-white shadow-md rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="text-xl font-semibold">Order ID: {order._id}</h3>
                                <p className="text-gray-500 text-sm">
                                    {moment(order.createdAt).format("MMMM Do YYYY, h:mm a")}
                                </p>
                            </div>
                            <span
                                className={`px-3 py-1 text-sm rounded-full font-medium ${order.orderStatus === "Processing"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : order.orderStatus === "Shipped"
                                            ? "bg-blue-100 text-blue-800"
                                            : order.orderStatus === "Delivered"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                    }`}
                            >
                                {order.orderStatus}
                            </span>
                        </div>

                        <p className="mb-2">
                            <span className="font-medium">Address:</span> {order.address}
                        </p>
                        <p className="mb-2">
                            <span className="font-medium">Payment Status:</span> {order.paymentIntent?.status} |{" "}
                            <span className="font-medium">Amount:</span> Rs. {order.paymentIntent?.amount / 100}
                        </p>

                        <div className="mt-4 space-y-3">
                            {order.products.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="border p-3 rounded-md flex justify-between items-center"
                                >
                                    <div>
                                        <p className="font-medium">{item.product.title}</p>
                                        <p className="text-sm text-gray-600">
                                            Color: {item.color} | Quantity: {item.count}
                                        </p>
                                    </div>
                                    <div className="font-semibold text-right">
                                        Rs. {item.price * item.count}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};
