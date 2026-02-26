
import { getProductFiltersAPI } from '@/Api/productApi';
import { useQuery } from '@tanstack/react-query';


export const useProductFilters = () => {
    return useQuery({
        queryKey: ['product-filters'],
        queryFn: getProductFiltersAPI,
        // staleTime: 1000 * 60 * 10, // 10 minutes (filters don’t change often)
        // gcTime: 1000 * 60 * 30,    // cache for 30 minutes
    });
};
