
import { fetchSalesProductsAPI } from "@/Api/productApi";
import { useQuery } from "@tanstack/react-query";


export const useSalesProducts = () => {
    return useQuery({
        queryKey: ["sales-products"],
        queryFn: fetchSalesProductsAPI,
        // staleTime: 1000 * 60 * 5, // 5 minutes
        // gcTime: 1000 * 60 * 30,   // 30 minutes
    });
};
