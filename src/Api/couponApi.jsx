// src/Api/couponApi.js
import axios from "axios";
// const BASE_URL = "http://localhost:8000";
const BASE_URL = "https://eshop-backend-production-edc1.up.railway.app";

export const createCouponAPI = async (couponData) => {
    const { data } = await axios.post(
        `${BASE_URL}/coupon/create`,
        couponData,
        {
            withCredentials: true,
        }
    );
    console.log(data)
    return data;
};



// Get all coupons
export const getCouponsAPI = async () => {
    const { data } = await axios.get(`${BASE_URL}/coupon`, {
        withCredentials: true,
    });
    return data;
};

// Delete a coupon
export const deleteCouponAPI = async (couponId) => {
    const { data } = await axios.delete(`${BASE_URL}/coupon/${couponId}`, {
        withCredentials: true,
    });
    return data;
};



export const applyCouponAPI = async (couponCode) => {
    console.log("code=", couponCode)
    const { data } = await axios.post(
        `${BASE_URL}/coupon/apply`,
        { coupon: couponCode },
        {
            withCredentials: true,
        }
    );
    console.log("coupon response", data)
    return data;
};

// Apply coupon to a Buy Now item
export const applyBuyNowCouponAPI = async ({ couponCode, productId, variantId, quantity }) => {
    console.log("Buy Now coupon payload:", { couponCode, productId, variantId, quantity });

    const { data } = await axios.post(
        `${BASE_URL}/coupon/apply-buy-now`,
        {
            couponCode,
            productId,
            variantId,
            quantity,
        },
        {
            withCredentials: true,
        }
    );

    console.log("Buy Now coupon response:", data);
    return data; // should include { discount, finalAmount, total }
};