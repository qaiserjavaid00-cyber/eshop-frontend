import axios from "axios"
const BASE_URL = "http://localhost:8000";

export const createCatAPI = async (catData) => {
    // console.log(userData)
    const response = await axios.post(
        `${BASE_URL}/category/create`, catData,
        {
            withCredentials: true,
        }
    );
    console.log(response.data)
    return response.data;

}

export const getAllCatsAPI = async () => {
    // console.log(userData)
    const response = await axios.get(`${BASE_URL}/category/list`,
        {
            withCredentials: true,
        }
    );
    console.log(response.data)
    return response.data;

}

export const deleteCatAPI = async (catID) => {
    // console.log(userData)
    const response = await axios.delete(
        `${BASE_URL}/category/${catID}`,
        {
            withCredentials: true,
        }
    );
    console.log(response.data)
    return response.data;

}