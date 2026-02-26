// hooks/orders/useRefundOrder.js
import { refundOrderAPI } from "@/Api/orderApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRefundOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orderId }) => refundOrderAPI({ orderId }),

        onSuccess: () => {
            queryClient.invalidateQueries(["all-orders"]);
        },
    });
};
