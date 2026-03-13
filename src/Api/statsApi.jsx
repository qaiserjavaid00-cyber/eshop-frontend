import axios from "axios"
// const BASE_URL = "http://localhost:8000";
const BASE_URL = "https://eshop-backend-production-edc1.up.railway.app";

export const fetchRevenueStats = async () => {
    const { data } = await axios.get(`${BASE_URL}/stats/admin/revenue`);
    return data;
};

export const fetchOrderStats = async () => {
    const { data } = await axios.get(`${BASE_URL}/stats/admin/orders`);
    return data;
};

export const fetchCustomerStats = async () => {
    const { data } = await axios.get(`${BASE_URL}/stats/admin/customers`);
    return data;
};

export const fetchTopProductsAPI = async () => {
    const { data } = await axios.get(`${BASE_URL}/stats/admin/top-products`);
    return data.topProducts;
};

export const fetchInventoryStats = async () => {
    const { data } = await axios.get(`${BASE_URL}/stats/admin/inventory`);
    return data.inventory;
};


export const fetchRevenueStatsChart = async () => {
    const { data } = await axios.get(`${BASE_URL}/stats/admin/revenue/chart`);
    return data.revenue ?? [];
};



export const fetchOrderStatsChart = async () => {
    const { data } = await axios.get(`${BASE_URL}/stats/admin/orders/chart`);
    const ordersByStatus = data.ordersByStatus ?? {};

    // Convert object to array: {Cancelled: 7, Delivered: 5} → [ {status: 'Cancelled', count: 7}, ... ]
    return Object.entries(ordersByStatus).map(([status, count]) => ({
        status,
        count,
    }));
};