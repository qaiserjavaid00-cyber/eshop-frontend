import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { saveUserAddressAPI } from "@/Api/userApi";
import { saveShippingAddress } from "@/redux/cartSlice";


export const useSaveAddress = () => {
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (addressData) => saveUserAddressAPI(addressData),

        onSuccess: (data, variables) => {
            // 1️⃣ Update Redux
            dispatch(saveShippingAddress(variables));

            // 2️⃣ Update React Query cache
            queryClient.setQueryData(["userAddress"], variables);
        },

        onError: (error) => {
            console.error("Save address failed:", error);
        },
    });
};