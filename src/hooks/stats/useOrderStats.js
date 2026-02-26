// hooks/admin/useOrderStats.js
import { useQuery } from "@tanstack/react-query";
import { fetchOrderStats } from "../../Api/statsApi";


export const useOrderStats = () => {
    return useQuery({
        queryKey: ["admin-order-stats"],
        queryFn: fetchOrderStats,
        // staleTime: 1000 * 60 * 5,
    });
};
