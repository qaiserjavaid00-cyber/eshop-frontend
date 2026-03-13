import { useMutation } from "@tanstack/react-query";
import { subscribeUser } from "@/Api/userApi";

export const useSubscribe = () => {
    return useMutation({
        mutationFn: subscribeUser,
    });
};