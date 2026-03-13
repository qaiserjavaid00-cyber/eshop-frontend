// hooks/orders/useCODOrder.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { placeCODOrderAPI, updateCODStatusAPI } from "@/Api/orderApi";


export const useCODOrder = () => {


    return useMutation({
        mutationFn: placeCODOrderAPI,
        onSuccess: (data) => {
            toast.success("COD Order placed successfully!");

        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Failed to place COD order");
            console.error(error);
        },
    });
};


export const useUpdateCODStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (orderId) => updateCODStatusAPI(orderId),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            toast.success("COD Status Updated to PAID")
        },
        onError: (error) => {
            console.error("Failed to update COD status:", error);
        },
    });
};