import { useQuery } from "@tanstack/react-query";
import { getUsersOrdersAPI } from "../../Api/orderApi";


export const useUserOrders = () => {
    return useQuery({
        queryKey: ["user-orders"],
        queryFn: getUsersOrdersAPI,
        staleTime: 1000 * 30,
        retry: 1,
    });
};
