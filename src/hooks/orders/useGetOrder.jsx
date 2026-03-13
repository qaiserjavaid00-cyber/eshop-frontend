import { useQuery } from "@tanstack/react-query";
import { getOrderByIdAPI } from "@/Api/orderApi";

export const useGetOrderById = (orderId) => {
    return useQuery({
        queryKey: ["order", orderId],
        queryFn: () => getOrderByIdAPI({ orderId }),
        enabled: !!orderId, // only runs if orderId exists
        staleTime: 1000 * 60 * 5, // 5 minutes (optional)
    });
};