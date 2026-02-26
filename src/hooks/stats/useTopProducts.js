import { fetchTopProductsAPI } from "@/Api/statsApi";
import { useQuery } from "@tanstack/react-query";


export const useTopProducts = () => {
    return useQuery({
        queryKey: ["top-products"],
        queryFn: fetchTopProductsAPI,
        // staleTime: 1000 * 60 * 5,
    });
};
