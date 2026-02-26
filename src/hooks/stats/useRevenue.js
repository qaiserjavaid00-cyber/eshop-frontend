// hooks/admin/useRevenueStats.js
import { fetchRevenueStats } from "@/Api/statsApi";
import { useQuery } from "@tanstack/react-query";




export const useRevenueStats = () => {
    return useQuery({
        queryKey: ["admin-revenue"],
        queryFn: fetchRevenueStats,
        // staleTime: 1000 * 60 * 5,
    });
};
