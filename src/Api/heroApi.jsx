import axios from "axios";

// const BASE_URL = "http://localhost:8000";
const BASE_URL = "https://eshop-backend-production-edc1.up.railway.app";


// GET all heroes (admin) or active heroes (frontend)
export const getHeroesAPI = async (activeOnly = false) => {
    const url = activeOnly ? `${BASE_URL}/hero/active` : `${BASE_URL}/hero`;
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
};

// CREATE new hero
export const createHeroAPI = async (formData) => {
    const response = await axios.post(`${BASE_URL}/hero`, formData, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// UPDATE specific hero by ID
export const updateHeroAPI = async ({ id, formData }) => {
    const response = await axios.put(`${BASE_URL}/hero/edit/${id}`, formData, {
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// DELETE specific hero by ID
export const deleteHeroAPI = async (id) => {
    const response = await axios.delete(`${BASE_URL}/hero/${id}`, {
        withCredentials: true,
    });
    return response.data;
};