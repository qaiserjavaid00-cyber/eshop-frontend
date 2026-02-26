import React from "react";
import { useUserOrders } from "../../hooks/orders/useUserOrders";

const History = () => {
    const { data: orders, isLoading, isError, error } = useUserOrders();

    if (isLoading) {
        return (
            <div className="p-6 text-center">
                <p className="text-gray-500">Loading your orders...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 text-center text-red-500">
                {error?.message || "Failed to load orders"}
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="p-6 text-center text-gray-500">
                You have not placed any orders yet.
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Order History</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium">
                                Order ID
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium">
                                Date
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium">
                                Amount
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium">
                                Status
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium">
                                Items
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order._id}
                                className="border-t hover:bg-gray-50"
                            >
                                {/* Order ID */}
                                <td className="px-4 py-3 text-sm font-mono">
                                    {order._id.slice(-8)}
                                </td>

                                {/* Date */}
                                <td className="px-4 py-3 text-sm">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>

                                {/* Amount */}
                                <td className="px-4 py-3 text-sm font-medium">
                                    $
                                    {(
                                        order.paymentIntent?.amount / 100 ||
                                        0
                                    ).toFixed(2)}
                                </td>

                                {/* Status */}
                                <td className="px-4 py-3 text-sm">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-semibold
                                        ${order.orderStatus === "Delivered"
                                                ? "bg-green-100 text-green-700"
                                                : order.orderStatus === "Processing"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {order.orderStatus || "Processing"}
                                    </span>
                                </td>

                                {/* Items */}
                                <td className="px-4 py-3 text-sm">
                                    <details>
                                        <summary className="cursor-pointer text-blue-600">
                                            View Items
                                        </summary>
                                        <ul className="mt-2 space-y-1">
                                            {order.products.map((item) => (
                                                <li
                                                    key={item._id}
                                                    className="text-gray-600 text-xs"
                                                >
                                                    {item.product?.title} × {item.count}
                                                </li>
                                            ))}
                                        </ul>
                                    </details>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default History;
