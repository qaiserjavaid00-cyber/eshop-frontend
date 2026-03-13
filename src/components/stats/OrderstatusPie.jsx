// src/components/charts/OrdersStatusPie.jsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#4F46E5", "#F59E0B", "#EF4444", "#10B981", "#8B5CF6", "#F43F5E"];

export const OrdersStatusPie = ({ data }) => {

    if (!Array.isArray(data) || data.length === 0) return <p>No order data available</p>;

    return (
        <div className="p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">📊 Orders by Status</h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="count"
                        nameKey="status"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={({ status, percent }) => `${status} (${(percent * 100).toFixed(0)}%)`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} orders`} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default OrdersStatusPie;