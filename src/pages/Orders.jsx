import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllOrdersAPI, updateOrderStatusAPI } from "../Api/orderApi";
import moment from "moment";
import { ChevronDown, ChevronUp } from "lucide-react"; // optional for icons

export const Orders = () => {
    const [expandedRows, setExpandedRows] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchUser, setSearchUser] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" });

    const queryClient = useQueryClient();

    const { data: orders = [], isLoading, isError, error } = useQuery({
        queryKey: ["adminOrders"],
        queryFn: getAllOrdersAPI,
    });

    const { mutate: updateStatus } = useMutation({
        mutationFn: updateOrderStatusAPI,
        onSuccess: () => {
            queryClient.invalidateQueries(["adminOrders"]);
        },
    });

    const handleStatusChange = (orderId, newStatus) => {
        updateStatus({ orderId, status: newStatus });
    };

    const toggleRow = (id) => {
        setExpandedRows((prev) =>
            prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
        );
    };

    const filteredOrders = orders.filter((order) => {
        const matchesStatus = filterStatus === "All" || order.orderStatus === filterStatus;
        const user = order.orderdBy;
        const matchesUser =
            searchUser === "" ||
            user?.name?.toLowerCase().includes(searchUser.toLowerCase()) ||
            user?.email?.toLowerCase().includes(searchUser.toLowerCase());
        return matchesStatus && matchesUser;
    });

    const sortedOrders = [...filteredOrders].sort((a, b) => {
        const amountA = a.paymentIntent?.amount || 0;
        const amountB = b.paymentIntent?.amount || 0;
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);

        if (sortConfig.key === "amount") {
            return sortConfig.direction === "asc" ? amountA - amountB : amountB - amountA;
        } else if (sortConfig.key === "date") {
            return sortConfig.direction === "asc"
                ? dateA - dateB
                : dateB - dateA;
        }

        return 0;
    });

    const toggleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    if (isLoading) return <div className="text-center py-10">Loading...</div>;
    if (isError) return <div className="text-red-500 text-center py-10">{error?.message}</div>;

    return (
        <div className="overflow-x-auto px-4 py-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">All Orders</h2>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search user name or email"
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    className="border rounded px-3 py-2 w-full sm:w-1/2"
                />
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border rounded px-3 py-2 w-full sm:w-1/3"
                >
                    {["All", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <table className="min-w-full bg-white shadow-md rounded-xl">
                <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                    <tr>
                        <th className="px-4 py-3 text-left">Order ID</th>
                        <th className="px-4 py-3 text-left">User</th>
                        <th
                            className="px-4 py-3 text-left cursor-pointer"
                            onClick={() => toggleSort("amount")}
                        >
                            Amount
                            {sortConfig.key === "amount" &&
                                (sortConfig.direction === "asc" ? (
                                    <ChevronUp className="inline w-4 h-4 ml-1" />
                                ) : (
                                    <ChevronDown className="inline w-4 h-4 ml-1" />
                                ))}
                        </th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th
                            className="px-4 py-3 text-left cursor-pointer"
                            onClick={() => toggleSort("date")}
                        >
                            Date
                            {sortConfig.key === "date" &&
                                (sortConfig.direction === "asc" ? (
                                    <ChevronUp className="inline w-4 h-4 ml-1" />
                                ) : (
                                    <ChevronDown className="inline w-4 h-4 ml-1" />
                                ))}
                        </th>
                        <th className="px-4 py-3 text-left">Products</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {sortedOrders.map((order) => (
                        <React.Fragment key={order._id}>
                            <tr className="border-b hover:bg-gray-50">
                                <td className="px-4 py-3 font-mono text-xs">{order._id}</td>
                                <td className="px-4 py-3">
                                    {order.orderdBy?.name}
                                    <br />
                                    <span className="text-xs text-gray-500">
                                        {order.orderdBy?.email}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    {(order.paymentIntent?.amount || 0) / 100}
                                </td>
                                <td className="px-4 py-3">
                                    <select
                                        value={order.orderStatus}
                                        onChange={(e) =>
                                            handleStatusChange(order._id, e.target.value)
                                        }
                                        className="border text-xs rounded px-2 py-1"
                                    >
                                        {["Processing", "Shipped", "Delivered", "Cancelled"].map(
                                            (status) => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </td>
                                <td className="px-4 py-3">
                                    {moment(order.createdAt).format("MMM D, YYYY")}
                                </td>
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() => toggleRow(order._id)}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        {expandedRows.includes(order._id)
                                            ? "Hide"
                                            : "View"} ({order.products.length})
                                    </button>
                                </td>
                            </tr>

                            {expandedRows.includes(order._id) && (
                                <tr className="bg-gray-50">
                                    <td colSpan="6" className="px-4 py-4">
                                        <div className="space-y-2">
                                            {order.products.map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex justify-between text-sm border rounded px-3 py-2 bg-white"
                                                >
                                                    <div>
                                                        <p className="font-medium">
                                                            {item.product?.title}
                                                        </p>
                                                        <p className="text-gray-500">
                                                            Color: {item.color} | Quantity: {item.count}
                                                        </p>
                                                    </div>
                                                    <p className="font-semibold">
                                                        Rs. {item.count * item.price}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
