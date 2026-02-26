import { Package } from "lucide-react";
import { useOrderStats } from "@/hooks/stats/useOrderStats";

const OrdersStatCard = () => {
    const { data, isLoading } = useOrderStats();

    if (isLoading) return null;

    const orders = data.orders;

    return (
        <div className="bg-white rounded-xl shadow-md p-6 w-full">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Orders</p>
                <Package className="text-gray-400" size={20} />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {orders.total}
            </h2>

            <div className="flex justify-between items-center mt-4">
                <div>
                    <p className="text-xs text-gray-400">This Month</p>
                    <p className="text-lg font-semibold text-gray-800">
                        {orders.thisMonth}
                    </p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-700">
                    {orders.pending} Pending
                </span>
            </div>
        </div>
    );
};

export default OrdersStatCard;
