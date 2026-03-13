import axios from "axios";

// const BASE_URL = "http://localhost:8000";
const BASE_URL = "https://eshop-backend-production-edc1.up.railway.app";

const axiosInstance = axios.create({
    baseURL: `${BASE_URL}/notification`,
    withCredentials: true, // send cookies if needed
});

// ------------------ API Calls ------------------

// Admin
export const getAllNotificationsAPI = async () => {
    const { data } = await axiosInstance.get("/");
    return data;
};

export const createNotificationAPI = async (notification) => {
    const { data } = await axiosInstance.post("/", notification);
    return data;
};

export const updateNotificationAPI = async ({ id, notification }) => {
    const { data } = await axiosInstance.put(`/edit/${id}`, notification);
    return data;
};

export const deleteNotificationAPI = async (id) => {
    const { data } = await axiosInstance.delete(`/del/${id}`);
    return data;
};

// Public
export const getActiveNotificationsAPI = async () => {
    const { data } = await axiosInstance.get("/active");
    return data;
};