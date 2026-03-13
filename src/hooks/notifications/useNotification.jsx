import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAllNotificationsAPI,
    createNotificationAPI,
    updateNotificationAPI,
    deleteNotificationAPI,
    getActiveNotificationsAPI,
} from "@/Api/notificationApi";

// ------------------- Admin Hooks -------------------

export const useGetNotifications = () => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: getAllNotificationsAPI,
    });
};

export const useCreateNotification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createNotificationAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
    });
};

export const useUpdateNotification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateNotificationAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
    });
};

export const useDeleteNotification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNotificationAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
    });
};

// ------------------- Public Hook -------------------

export const useActiveNotifications = () => {
    return useQuery({
        queryKey: ["activeNotifications"],
        queryFn: getActiveNotificationsAPI,
        refetchInterval: 60000, // refresh every minute
    });
};