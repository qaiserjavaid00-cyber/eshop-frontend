// hooks/admin/useCustomerStats.js
import { fetchCustomerStats } from "@/Api/statsApi";
import { useQuery } from "@tanstack/react-query";

export const useCustomerStats = () => {
    return useQuery({
        queryKey: ["admin-customer-stats"],
        queryFn: fetchCustomerStats,
        // staleTime: 1000 * 60 * 5,
    });
};
