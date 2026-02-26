import { TrendingUp, TrendingDown } from "lucide-react";
import { useRevenueStats } from "@/hooks/stats/useRevenue";

const RevenueStatCard = () => {
    const { data, isLoading } = useRevenueStats();

    if (isLoading) return null;

    const revenue = data?.revenue;
    const isPositive = revenue?.changePercent >= 0;

    return (
        <div className="bg-white rounded-xl shadow-md p-6 w-full">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h2 className="text-3xl font-bold text-gray-900 mt-1">
                ${revenue?.total.toLocaleString()}
            </h2>
            <div className="flex items-center justify-between mt-4">
                <div>
                    <p className="text-xs text-gray-400">This Month</p>
                    <p className="text-lg font-semibold text-gray-800">
                        ${revenue?.thisMonth.toLocaleString()}
                    </p>
                </div>
                <div
                    className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {isPositive ? (
                        <TrendingUp size={18} />
                    ) : (
                        <TrendingDown size={18} />
                    )}
                    {Math.abs(revenue?.changePercent)}%
                </div>
            </div>
        </div>
    );
};

export default RevenueStatCard;
