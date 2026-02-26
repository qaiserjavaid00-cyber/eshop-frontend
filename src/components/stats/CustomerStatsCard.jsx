import { Users } from "lucide-react";
import { useCustomerStats } from "@/hooks/stats/useCustomerStats";

const CustomerStatCard = () => {
    const { data, isLoading } = useCustomerStats();

    if (isLoading) return null;

    const customers = data?.customers;

    return (
        <div className="bg-white rounded-xl shadow-md p-6 w-full">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Customers</p>
                <Users className="text-gray-400" size={20} />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {customers?.total}
            </h2>

            <div className="flex justify-between items-center mt-4">
                <div>
                    <p className="text-xs text-gray-400">New this month</p>
                    <p className="text-lg font-semibold text-green-600">
                        +{customers?.newThisMonth}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-xs text-gray-400">Active</p>
                    <p className="text-lg font-semibold text-gray-800">
                        {customers?.active}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CustomerStatCard;
