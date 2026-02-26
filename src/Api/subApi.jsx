import axios from "axios"
const BASE_URL = "http://localhost:8000";

export const createSubAPI = async (subData) => {
    // console.log(userData)
    const response = await axios.post(
        `${BASE_URL}/sub/create`, subData,
        {
            withCredentials: true,
        }
    );
    console.log(response.data)
    return response.data;

}

export const getAllsubsAPI = async () => {
    // console.log(userData)
    const response = await axios.get(`${BASE_URL}/sub/list`,
        {
            withCredentials: true,
        }
    );
    console.log(response.data)
    return response.data;

}

export const deleteSubAPI = async (subID) => {
    // console.log(userData)
    const response = await axios.delete(
        `${BASE_URL}/sub/${subID}`,
        {
            withCredentials: true,
        }
    );
    console.log(response.data)
    return response.data;

}


export const getSingleSubAPI = async (parentID) => {
    // console.log(userData)
    const response = await axios.get(
        `${BASE_URL}/sub/${parentID}`,
        {
            withCredentials: true,
        }
    );
    console.log(response.data)
    return response.data;

}


