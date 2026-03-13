import React from "react";

// Skeleton for a single product inside an order
const SkeletonProduct = () => (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-xl animate-pulse">
        <div>
            <div className="h-4 w-48 bg-gray-300 rounded mb-1"></div>
            <div className="h-3 w-32 bg-gray-300 rounded"></div>
        </div>
        <div className="h-4 w-16 bg-gray-300 rounded"></div>
    </div>
);

// Skeleton for a single order card
const SkeletonOrder = ({ products = 2 }) => (
    <div className="bg-white border rounded-2xl shadow-sm animate-pulse space-y-4">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b">
            <div className="space-y-2">
                <div className="h-4 w-48 bg-gray-300 rounded"></div>
                <div className="h-5 w-64 bg-gray-300 rounded"></div>
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
                <div className="h-6 w-24 bg-gray-300 rounded-full"></div>
                <div className="h-8 w-32 bg-gray-300 rounded-lg"></div>
            </div>
        </div>

        {/* Order details */}
        <div className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-full bg-gray-300 rounded"></div>
            </div>

            {/* Products */}
            <div className="mt-6 space-y-4">
                {Array.from({ length: products }).map((_, idx) => (
                    <SkeletonProduct key={idx} />
                ))}
            </div>
        </div>
    </div>
);

// Full skeleton page for OrderHistory
export const OrderHistorySkeleton = ({ orders = 3 }) => (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* Header */}
        <div className="mb-10 text-center">
            <div className="h-10 w-64 bg-gray-300 mx-auto rounded animate-pulse mb-2"></div>
            <div className="h-4 w-96 bg-gray-200 mx-auto rounded animate-pulse"></div>
        </div>

        {/* Orders */}
        {Array.from({ length: orders }).map((_, idx) => (
            <SkeletonOrder key={idx} products={2 + (idx % 3)} />
        ))}
    </div>
);