import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const getHeroAPI = async () => {
    const response = await axios.get(
        `${BASE_URL}/hero`,
        { withCredentials: true }
    );
    return response.data;
};

export const updateHeroAPI = async (heroData) => {
    const response = await axios.put(
        `${BASE_URL}/hero`,
        heroData,
        {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
    return response.data;
};