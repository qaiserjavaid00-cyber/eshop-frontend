// // src/hooks/useCategories.jsx
// import { useQuery } from '@tanstack/react-query';
// import { getAllCatsAPI } from '@/Api/catApi'; 

// /**
//  * Custom hook to fetch all categories
//  */
// export const useCategories = () => {
//     return useQuery({
//         queryKey: ['categories'],
//         queryFn: getAllCatsAPI,
//         staleTime: 5 * 60 * 1000, // 5 minutes cache
//         retry: 1, // retry once on failure
//         onError: (error) => {
//             console.error('Error fetching categories:', error);
//         },
//     });
// };

import { useQuery } from "@tanstack/react-query";
import { getAllCatsAPI } from "@/Api/catApi";

export const useCategories = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCatsAPI,
    });

    return {
        categories: data?.categories || [],
        isLoading,
        error,
    };
};

