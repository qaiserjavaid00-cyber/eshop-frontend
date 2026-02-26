import { useMutation, useQueryClient } from "@tanstack/react-query";
import { partialRefundOrderAPI } from "@/Api/orderApi";

export const usePartialRefundOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: partialRefundOrderAPI,
        onSuccess: () => {
            // refresh orders list
            queryClient.invalidateQueries({
                queryKey: ["all-orders"],
            });
        },
    });
};
