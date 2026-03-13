import axios from "axios";

// const BASE_URL = "http://localhost:8000";
const BASE_URL = "https://eshop-backend-production-edc1.up.railway.app";

export const getAboutAPI = async () => {
    const { data } = await axios.get(`${BASE_URL}/about`);
    return data;
};

export const updateAboutAPI = async (formData) => {
    const { data } = await axios.put(
        `${BASE_URL}/about/upload`,
        formData,
        {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        }
    );
    return data;
};
