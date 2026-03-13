import { loginOutAPI } from "@/Api/userApi";
import { resetUser, updateProfile } from "@/redux/userSlice";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:8000";
// const BASE_URL = "https://eshop-backend-production-edc1.up.railway.app";

export const useCheckAuth = () => {
    // const dispatch = useDispatch();

    return useQuery({
        queryKey: ["checkAuth"],
        queryFn: async () => {
            const { data } = await axios.get(`${BASE_URL}/user/checkAuth`, {
                withCredentials: true,
            });
            return data;
        },
        // retry: false,
        // onSuccess: (data) => {
        //     dispatch(updateProfile(data.user));
        // },
        // onError: async () => {
        //     await loginOutAPI();
        //     dispatch(resetUser());
        //     toast.error("You need to login again")
        // },
    });
};