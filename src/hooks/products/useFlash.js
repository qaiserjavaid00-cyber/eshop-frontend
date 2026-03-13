
import { fetchFlashProductsAPI } from "@/Api/productApi";
import { useQuery } from "@tanstack/react-query";


// export const useFlashProducts = () => {
//     return useQuery({
//         queryKey: ["flash-products"],
//         queryFn: fetchFlashProductsAPI,
//         staleTime: 1000 * 60 * 5, // 5 minutes
//         gcTime: 1000 * 60 * 30,   // 30 minutes
//     });
// };

export const useFlashProducts = () => {
    return useQuery({
        queryKey: ["flash-products"],
        queryFn: async () => {
            const data = await fetchFlashProductsAPI();
            return data.products; // ✅ RETURN ARRAY
        },
        // staleTime: 1000 * 60 * 5,
        // gcTime: 1000 * 60 * 30,
    });
};
