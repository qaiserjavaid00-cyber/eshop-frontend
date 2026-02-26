
import { fetchFeaturedProductsAPI } from "@/Api/productApi";
import { useQuery } from "@tanstack/react-query";


export const useFeaturedProducts = () => {
    return useQuery({
        queryKey: ["featured-products"],
        queryFn: fetchFeaturedProductsAPI,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30,   // 30 minutes
    });
};
