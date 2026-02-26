import { getUserAddressAPI } from "@/Api/userApi";
import { useQuery } from "@tanstack/react-query";


export const useAddress = () => {
    return useQuery({
        queryKey: ["userAddress"],
        queryFn: getUserAddressAPI,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: false, // avoid retry spam on 401
    });
};
