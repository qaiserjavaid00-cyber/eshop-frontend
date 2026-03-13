import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getProfile,
    updateProfile,
    updateProfilePicture,
} from "@/api/userApi";
import { toast } from "react-toastify";

export const useUser = () => {
    const queryClient = useQueryClient();

    const profileQuery = useQuery({
        queryKey: ["user"],
        queryFn: getProfile,
    });

    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    const updateProfilePicMutation = useMutation({
        mutationFn: updateProfilePicture,
        onSuccess: (data) => {
            console.log("Mutation success:", data);
            toast.success("Picture Uloaded")
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
        onError: (error) => {
            console.error("Mutation error:", error);
        },
    });
    return {
        ...profileQuery,
        updateProfile: updateProfileMutation.mutate,
        updateProfilePic: updateProfilePicMutation.mutate,
    };
};