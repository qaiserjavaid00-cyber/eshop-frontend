// hooks/admin/useRevenueStats.js
import { fetchRevenueStats, fetchRevenueStatsChart } from "@/Api/statsApi";
import { useQuery } from "@tanstack/react-query";


export const useRevenueStats = () => {
    return useQuery({
        queryKey: ["admin-revenue"],
        queryFn: fetchRevenueStats,
        // staleTime: 1000 * 60 * 5,
    });
};



export const useRevenueChart = () => {
    return useQuery({
        queryKey: ["revenueChart"],
        queryFn: fetchRevenueStatsChart,
        staleTime: 1000 * 60 * 5, // 5 minutes caching
        refetchOnWindowFocus: false, // optional: avoids auto refetch
    });
};