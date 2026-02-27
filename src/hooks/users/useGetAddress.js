import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getUserAddressAPI } from "@/Api/userApi";
import { saveShippingAddress } from "@/redux/cartSlice";

export const useGetAddress = () => {
    const dispatch = useDispatch();

    return useQuery({
        queryKey: ["userAddress"],
        queryFn: getUserAddressAPI,

        onSuccess: (data) => {
            if (data?.address) {
                dispatch(saveShippingAddress(data.address));
            }
        },
    });
};