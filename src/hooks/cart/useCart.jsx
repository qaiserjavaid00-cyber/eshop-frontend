import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { saveCartAPI } from "@/Api/cartApi";

export const useSaveCart = () => {
    return useMutation({
        mutationFn: saveCartAPI,
        onSuccess: () => {
            toast.success("Cart saved successfully!");
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "Failed to save cart");
        },
    });
};