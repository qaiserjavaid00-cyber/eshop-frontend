import axios from "axios"
const BASE_URL = "http://localhost:8000";

export const registerAPI = async (userData) => {
    // console.log(userData)
    const response = await axios.post(
        `${BASE_URL}/user/register`,

        userData
        // fullname: userData?.fullname,
        // email: userData?.email,
        // password: userData?.password,
        ,
        {
            withCredentials: true,
        }
    );
    console.log(response.data)
    return response.data;

}

export const loginAPI = async (userData) => {
    // console.log(userData)
    const response = await axios.post(
        `${BASE_URL}/user/login`, userData,
        {
            withCredentials: true,
        }
    );
    console.log(response.data)
    return response.data;

}
export const loginOutAPI = async () => {
    // console.log(userData)
    const response = await axios.post(`${BASE_URL}/user/logout`, {},
        {
            withCredentials: true,
        }
    );
    console.log(response.data)
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

