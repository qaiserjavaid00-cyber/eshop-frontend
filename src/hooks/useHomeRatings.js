
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://localhost:8000";
// const BASE_URL = "https://eshop-backend-production-edc1.up.railway.app";

const getHomeRatingsAPI = async () => {
    const { data } = await axios.get(`${BASE_URL}/product/products/ratings`);
    return data;
};

export const useHomeRatings = () => {
    return useQuery({
        queryKey: ["homeRatings"],
        queryFn: getHomeRatingsAPI,
    });
};