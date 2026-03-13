import { useInventoryStats } from "@/hooks/stats/useInventoryStats";
import React from "react";
import StockTables from "./StockTable";

const InventoryStats = () => {
    const { data, isLoading, isError, error } = useInventoryStats();
    console.log("Inventory", data)
    if (isLoading) return <p>Loading inventory stats...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <section className="p-6 rounded-lg shadow-md">

            <h2 className="text-2xl font-bold mb-6">📦 Inventory Stats</h2>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-lg text-center dark:bg-gray-800 dark:text-gray-100">
                    <p className="text-gray-700 dark:text-gray-300">Total Products</p>
                    <p className="text-2xl font-bold">{data.totalProducts}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg text-center dark:bg-violet-600 dark:text-gray-100">
                    <p className="text-gray-500 dark:text-gray-300">Total Variants</p>
                    <p className="text-2xl font-bold">{data.totalVariants}</p>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg text-center dark:bg-yellow-900 dark:text-yellow-300">
                    <p className="text-gray-500 dark:text-yellow-200">Low Stock</p>
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {data.lowStockCount}
                    </p>
                </div>

                <div className="p-4 bg-red-50 rounded-lg text-center dark:bg-red-900 dark:text-red-300">
                    <p className="text-gray-500 dark:text-red-200">Out of Stock</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {data.outOfStockCount}
                    </p>
                </div>
            </div>
            <StockTables data={data} />
        </section>
    );
};

export default InventoryStats;