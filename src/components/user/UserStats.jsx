// // src/components/user/UserStats.jsx
// import React from "react";
// import { useUserStats } from "@/hooks/users/useUserStats";
// import StatCard from "./StatsCard";

// export default function UserStats() {
//     const { data, isLoading, isError, error } = useUserStats();

//     if (isLoading) return <p className="text-center py-10">Loading...</p>;
//     if (isError) {
//         console.log(error)
//         return <p className="text-center py-10">Failed to load stats</p>;
//     }

//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
//             <StatCard title="Total Orders" value={data.totalOrders} />
//             <StatCard title="Delivered Orders" value={data.deliveredOrders} />
//             <StatCard title="Total Spent" value={`$${data.totalSpent}`} />
//             <StatCard title="Wishlist Items" value={data.wishlistCount} />
//             <StatCard
//                 title="Last Order"
//                 value={data.lastOrderDate ? new Date(data.lastOrderDate).toLocaleDateString() : "N/A"}
//             />
//         </div>
//     );
// }

import React from "react";
import { useUserStats } from "@/hooks/users/useUserStats";
import StatCard from "./StatsCard";
import {
    ShoppingCart,
    CheckCircle,
    DollarSign,
    Heart,
    CalendarDays,
} from "lucide-react";

export default function UserStats() {
    const { data, isLoading, isError, error } = useUserStats();

    if (isLoading)
        return (
            <p className="text-center py-10 text-gray-500 animate-pulse">
                Loading stats...
            </p>
        );

    if (isError) {
        console.log(error);
        return (
            <p className="text-center py-10 text-red-500">
                Failed to load stats
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <StatCard
                title="Total Orders"
                value={data.totalOrders}
                icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
                bg="bg-blue-50 dark:bg-blue-200"
            />

            <StatCard
                title="Delivered Orders"
                value={data.deliveredOrders}
                icon={<CheckCircle className="w-6 h-6 text-green-600" />}
                bg="bg-green-50 dark:bg-green-200"
            />

            <StatCard
                title="Total Spent"
                value={`$${Number(data.totalSpent || 0).toFixed(2)}`}
                icon={<DollarSign className="w-6 h-6 text-yellow-600" />}
                bg="bg-yellow-50 dark:bg-yellow-200"
            />

            <StatCard
                title="Wishlist Items"
                value={data.wishlistCount}
                icon={<Heart className="w-6 h-6 text-pink-600" />}
                bg="bg-pink-50 dark:bg-pink-200"
            />

            <StatCard
                title="Last Order"
                value={
                    data.lastOrderDate
                        ? new Date(data.lastOrderDate).toLocaleDateString()
                        : "N/A"
                }
                icon={<CalendarDays className="w-6 h-6 text-purple-600" />}
                bg="bg-purple-50 dark:bg-purple-300"
            />
        </div>
    );
}