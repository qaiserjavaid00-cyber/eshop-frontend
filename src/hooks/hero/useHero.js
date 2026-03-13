import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getHeroesAPI,
    createHeroAPI,
    updateHeroAPI,
    deleteHeroAPI,
} from "@/Api/heroApi";
import { toast } from "react-toastify";

// FETCH all heroes (admin)
export const useGetHeroes = (activeOnly = false) => {
    return useQuery({
        queryKey: ["heroes", { activeOnly }],
        queryFn: () => getHeroesAPI(activeOnly),
    });
};

// CREATE hero
export const useCreateHero = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createHeroAPI,
        onSuccess: () => {
            toast.success("Hero created successfully!");
            queryClient.invalidateQueries({ queryKey: ["heroes"] });
        },
        onError: (error) => {
            toast.error("Failed to create hero");
            console.error(error);
        },
    });
};

// UPDATE hero
export const useUpdateHero = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateHeroAPI,
        onSuccess: () => {
            toast.success("Hero updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["heroes"] });
        },
        onError: (error) => {
            toast.error("Failed to update hero");
            console.error(error);
        },
    });
};

// DELETE hero
export const useDeleteHero = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteHeroAPI,
        onSuccess: () => {
            toast.success("Hero deleted successfully!");
            queryClient.invalidateQueries({ queryKey: ["heroes"] });
        },
        onError: (error) => {
            toast.error("Failed to delete hero");
            console.error(error);
        },
    });
};