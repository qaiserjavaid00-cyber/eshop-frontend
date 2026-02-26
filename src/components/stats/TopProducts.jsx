import { useTopProducts } from "@/hooks/stats/useTopProducts";
import React from "react";

const TopProducts = () => {
    const { data, isLoading, isError, error } = useTopProducts()

    if (isLoading) return <p>Loading top products...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <section className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">🏆 Top Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.map((product) => (
                    <div
                        key={product?.productId}
                        className="border rounded p-3 flex items-center gap-3 hover:shadow-lg transition"
                    >
                        <img
                            src={product?.images?.[0]}
                            alt={product?.title}
                            className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                            <h3 className="font-semibold">{product?.title}</h3>
                            <p className="text-sm text-gray-600">
                                Sold: <span className="font-bold">{product?.totalSold}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                                Revenue: <span className="font-bold">${product?.totalRevenue}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TopProducts;
