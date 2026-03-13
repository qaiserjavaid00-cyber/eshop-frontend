// src/components/charts/RevenueChart.jsx
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const RevenueChart = ({ data }) => {
    // console.log("chart data", data)
    return (
        <div className="p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">💰 Revenue Over Time (Last 30 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(value) => `$${value}`} />
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#4F46E5" // Indigo color
                        strokeWidth={3}
                        dot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueChart;