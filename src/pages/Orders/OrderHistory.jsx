
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getUserOrdersAPI } from "../../Api/userApi";
import { OrderHistorySkeleton } from "@/components/product/skeletons/OrderHistorySkeleton";

export const OrderHistory = () => {
    const navigate = useNavigate();

    const {
        data: orders,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["userOrders"],
        queryFn: getUserOrdersAPI,
    });

    if (isLoading) return <OrderHistorySkeleton orders={6} />;

    if (isError)
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <p className="text-red-500 font-medium">
                    {error?.message || "Failed to load orders"}
                </p>
            </div>
        );

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold tracking-tight">My Orders</h1>
                <p className="text-gray-500 mt-2">
                    View your order history and track shipments.
                </p>
            </div>

            {/* Empty State */}
            {orders?.length === 0 ? (
                <div className="bg-gray-50 border rounded-2xl p-10 text-center">
                    <h2 className="text-xl font-semibold mb-2">
                        You haven’t placed any orders yet.
                    </h2>
                    <p className="text-gray-500">
                        Once you make a purchase, your orders will appear here.
                    </p>
                </div>
            ) : (
                <div className="space-y-8">
                    {orders?.map((order) => (
                        <div
                            key={order?._id}
                            className="border rounded-2xl shadow-sm hover:shadow-md transition duration-300"
                        >
                            {/* Top Section */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Order placed on{" "}
                                        {moment(order?.createdAt).format(
                                            "MMMM Do YYYY, h:mm a"
                                        )}
                                    </p>
                                    <h3 className="text-lg font-semibold mt-1 break-all">
                                        Order ID: {order?._id}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-4 mt-4 md:mt-0">
                                    {/* Status Badge */}
                                    <span
                                        className={`px-4 py-1 text-sm rounded-full font-medium ${order?.orderStatus === "Processing"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : order?.orderStatus === "Shipped"
                                                ? "bg-blue-100 text-blue-800"
                                                : order?.orderStatus === "Delivered"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {order?.orderStatus}
                                    </span>

                                    {/* Track Button */}
                                    <button
                                        onClick={() =>
                                            navigate(`/order/${order?._id}/track`)
                                        }
                                        className="px-5 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition"
                                    >
                                        Track Order
                                    </button>
                                </div>
                            </div>

                            {/* Order Details */}
                            <div className="p-6 space-y-4">
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <p>
                                        <span className="font-medium">Shipping Address:</span>{" "}
                                        {order?.address}
                                    </p>
                                    <p>
                                        <span className="font-medium">Payment Status:</span>{" "}
                                        {order?.isPaid ? "Paid" : "unPaid"}
                                    </p>
                                    <p>
                                        <span className="font-medium">Total Paid:</span> ${" "}
                                        {order?.amountPaid}
                                    </p>
                                </div>

                                {/* Products */}
                                <div className="mt-6 space-y-4">
                                    {order?.products?.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex justify-between items-center  p-4 rounded-xl"
                                        >
                                            <div>
                                                <h4 className="font-semibold">
                                                    {item?.product?.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Color: {item?.color} | Qty: {item?.count}
                                                </p>
                                            </div>

                                            <div className="text-sm font-semibold">
                                                Rs. {item?.price * item?.count}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};