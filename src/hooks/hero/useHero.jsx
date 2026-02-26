import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getHeroAPI, updateHeroAPI } from "@/Api/heroApi";
import { toast } from "react-toastify";

// GET HERO
export const useGetHero = () => {
    return useQuery({
        queryKey: ["hero"],
        queryFn: getHeroAPI,
    });
};

// UPDATE HERO
export const useUpdateHero = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateHeroAPI,
        onSuccess: () => {
            toast.success("success")
            queryClient.invalidateQueries({ queryKey: ["hero"] });
        },
        onError: (error) => {
            toast.error("error")
            console.log(error)
        },
    });
};