import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAboutAPI, updateAboutAPI } from "@/Api/aboutApi";

export const useGetAbout = () => {
    return useQuery({
        queryKey: ["about"],
        queryFn: getAboutAPI,
    });
};

export const useUpdateAbout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateAboutAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["about"] });
        },
    });
};