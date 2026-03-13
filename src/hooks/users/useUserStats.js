// src/hooks/users/useUserStats.js
import { useQuery } from "@tanstack/react-query";
import { getUserStatsAPI } from "@/Api/userApi";

export const useUserStats = () => {
    return useQuery({
        queryKey: ["userStats"],
        queryFn: getUserStatsAPI,
        retry: false,
    });
};