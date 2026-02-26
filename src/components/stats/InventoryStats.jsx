import { useInventoryStats } from "@/hooks/stats/useInventoryStats";
import React from "react";





const InventoryStats = () => {
    const { data, isLoading, isError, error } = useInventoryStats();


    if (isLoading) return <p>Loading inventory stats...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <section className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">📦 Inventory Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-gray-50 rounded text-center">
                    <p className="text-gray-500">Total Products</p>
                    <p className="text-2xl font-bold">{data.totalProducts}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded text-center">
                    <p className="text-gray-500">Total Variants</p>
                    <p className="text-2xl font-bold">{data.totalVariants}</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded text-center">
                    <p className="text-gray-500">Low Stock</p>
                    <p className="text-2xl font-bold text-yellow-600">{data.lowStockVariants}</p>
                </div>
                <div className="p-4 bg-red-50 rounded text-center">
                    <p className="text-gray-500">Out of Stock</p>
                    <p className="text-2xl font-bold text-red-600">{data.outOfStockVariants}</p>
                </div>
            </div>
        </section>
    );
};

export default InventoryStats;
