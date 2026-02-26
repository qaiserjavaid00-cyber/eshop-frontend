import { useQuery } from "@tanstack/react-query";
import { fetchInventoryStats } from "../../Api/statsApi";

export const useInventoryStats = () => {
    return useQuery({
        queryKey: ["inventory-stats"],
        queryFn: fetchInventoryStats,
        // staleTime: 1000 * 60 * 5,
    });
};
