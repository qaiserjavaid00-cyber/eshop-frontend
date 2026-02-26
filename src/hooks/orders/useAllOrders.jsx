import { useQuery } from "@tanstack/react-query";
import { getAllOrdersAPI } from "../../Api/orderApi";


export const useAllOrders = () => {
    return useQuery({
        queryKey: ["all-orders"],
        queryFn: getAllOrdersAPI,
        staleTime: 1000 * 30, // 30 seconds
        retry: 1,
    });
};
