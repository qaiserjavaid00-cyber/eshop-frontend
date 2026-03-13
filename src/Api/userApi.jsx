import axios from "axios"
// const BASE_URL = "http://localhost:8000";
const BASE_URL = "https://eshop-backend-production-edc1.up.railway.app";

export const registerAPI = async (userData) => {

    const response = await axios.post(
        `${BASE_URL}/user/register`,
        userData,
        {
            withCredentials: true,
        }
    );

    return response.data;

}

export const loginAPI = async (userData) => {

    const response = await axios.post(
        `${BASE_URL}/user/login`, userData,
        {
            withCredentials: true,
        }
    );

    return response.data;

}
export const loginOutAPI = async () => {

    const response = await axios.post(`${BASE_URL}/user/logout`, {},
        {
            withCredentials: true,
        }
    );

    return response.data;

}

export const saveUserAddressAPI = async (address) => {
    const response = await axios.put(
        `${BASE_URL}/user/address`,
        { address },
        { withCredentials: true }
    );
    return response.data;
};

export const getUserAddressAPI = async () => {
    const response = await axios.get(
        `${BASE_URL}/user/addresses`,
        { withCredentials: true }
    );
    return response.data;
};


export const getUserOrdersAPI = async () => {
    const { data } = await axios.get(`${BASE_URL}/order/user-orders`, {
        withCredentials: true,
    });
    return data;
};


export const addToWishlistAPI = async (productId) => {
    const { data } = await axios.put(
        `${BASE_URL}/user/wishlist`,
        { productId },
        { withCredentials: true }
    );
    return data;
};

export const getUserWishlistAPI = async () => {
    const { data } = await axios.get(`${BASE_URL}/user/wishlist`, { withCredentials: true });
    return data;
};

export const removeFromWishlistAPI = async (productId) => {
    const { data } = await axios.delete(`${BASE_URL}/user/wishlist/${productId}`, {
        withCredentials: true,
    });
    return data;
};


export const subscribeUser = async (email) => {
    const { data } = await axios.post(`${BASE_URL}/subscribe`, { email });
    return data;
};

export const getUserStatsAPI = async () => {
    const { data } = await axios.get(`${BASE_URL}/user/stats`, {
        withCredentials: true,
    });
    return data;
};

export const getProfile = async () => {
    const { data } = await axios.get(`${BASE_URL}/user/profile`, {
        withCredentials: true,
    });
    return data.user;
};

export const updateProfile = async (payload) => {
    const { data } = await axios.put(`${BASE_URL}/user/profile`, payload, {
        withCredentials: true,
    });
    return data.user;
};

export const updateProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("profilePic", file);

    const { data } = await axios.put(`${BASE_URL}/user/profile/picture`, formData, {
        withCredentials: true,
    });
    return data;
};