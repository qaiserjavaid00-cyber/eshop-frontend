import { useQuery } from "@tanstack/react-query";
import { getSingleSubAPI } from "@/Api/subApi";

export const useSubcategories = (categoryId) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["subs", categoryId],
        queryFn: () => getSingleSubAPI(categoryId),
        enabled: !!categoryId, // only fetch if categoryId is truthy
    });

    return {
        subcategories: data?.sub || [],
        isLoading,
        error,
    };
};
