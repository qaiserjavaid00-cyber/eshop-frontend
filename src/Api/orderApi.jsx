import axios from "axios";
// const BASE_URL = "http://localhost:8000";
const BASE_URL = "https://eshop-backend-production-edc1.up.railway.app";


export const getAllOrdersAPI = async ({ queryKey }) => {
    // const [page, limit] = queryKey;
    const { data } = await axios.get(`${BASE_URL}/order/all-orders`, {
        withCredentials: true,
    });
    return data;
};


export const refundOrderAPI = async ({ orderId }) => {
    const { data } = await axios.post(
        `${BASE_URL}/order/${orderId}/refund`, {},
        {
            withCredentials: true
        }
    );
    return data;
};

export const partialRefundOrderAPI = async ({ orderId, items }) => {
    const { data } = await axios.post(
        `${BASE_URL}/order/${orderId}/partialRefund`,
        {
            items
        },
        {
            withCredentials: true
        }
    );
    return data;
};

export const updateOrderStatusAPI = async ({ orderId, status }) => {
    const { data } = await axios.put(
        `${BASE_URL}/order/update-status/${orderId}`,
        { status },
        { withCredentials: true }
    );
    return data;
};



export const getUsersOrdersAPI = async ({ queryKey }) => {
    // const [page, limit] = queryKey;
    const { data } = await axios.get(`${BASE_URL}/order/user-orders`, {
        withCredentials: true,
    });
    return data;
};


