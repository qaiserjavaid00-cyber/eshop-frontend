// hooks/admin/useOrderStats.js
import { useQuery } from "@tanstack/react-query";
import { fetchOrderStats, fetchOrderStatsChart } from "../../Api/statsApi";


export const useOrderStats = () => {
    return useQuery({
        queryKey: ["admin-order-stats"],
        queryFn: fetchOrderStats,
        // staleTime: 1000 * 60 * 5,
    });
};


export const useOrderStatsChart = () => {
    return useQuery({
        queryKey: ["admin-order-stats-charts"],
        queryFn: fetchOrderStatsChart,
        // staleTime: 1000 * 60 * 5,
    });
};
