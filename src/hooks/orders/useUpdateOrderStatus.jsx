import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatusAPI } from "../../Api/orderApi";


export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateOrderStatusAPI,
        onSuccess: () => {
            // Refresh orders after update
            queryClient.invalidateQueries({ queryKey: ["all-orders"] });
            queryClient.invalidateQueries({ queryKey: ["user-orders"] });
        },
        onError: (error) => {
            console.error("Failed to update order status:", error);
        },
    });
};
