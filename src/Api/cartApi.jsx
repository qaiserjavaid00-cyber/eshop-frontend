// src/Api/cartApi.js
import axios from "axios";
const BASE_URL = "http://localhost:8000";

export const saveCartAPI = async (cartData) => {
    const { data } = await axios.post(`${BASE_URL}/cart/create`, cartData,
        {
            withCredentials: true,
        }
    );
    return data;
};


// src/Api/cartApi.js


export const getUserCartAPI = async () => {
    const { data } = await axios.get(`${BASE_URL}/cart/mycart`, {
        withCredentials: true, // include cookies if using JWT with httpOnly cookies
    });
    return data;
};

// src/Api/cartApi.js


export const emptyCartAPI = async () => {
    const response = await axios.put(`${BASE_URL}/cart/empty`, {}, {
        withCredentials: true,
    });
    return response.data;
};
