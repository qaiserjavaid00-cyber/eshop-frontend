// components/CopyCoupon.jsx
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCouponsAPI } from "../Api/couponApi";
// import { getCouponsAPI } from "../Api/couponApi";

export const CopyCoupon = () => {
    const [copiedCoupon, setCopiedCoupon] = useState("");

    const { data: coupons = [], isLoading, isError } = useQuery({
        queryKey: ["availableCoupons"],
        queryFn: getCouponsAPI,
    });

    const validCoupons = coupons.filter(
        (c) => new Date(c.expiry) > new Date()
    );

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCoupon(code);
        setTimeout(() => setCopiedCoupon(""), 2000);
    };

    if (isLoading) return <p>Loading coupons...</p>;
    if (isError) return <p className="text-red-500">Failed to load coupons</p>;

    return (
        <div className="my-16 ">
            <h3 className="text-xl font-semibold mb-4">Available Coupons</h3>
            {validCoupons.length === 0 ? (
                <p>No valid coupons available.</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {validCoupons.map((coupon) => (
                        <div
                            key={coupon._id}
                            onClick={() => handleCopy(coupon.code)}
                            className="cursor-pointer border border-blue-400 bg-blue-50 hover:bg-blue-100 transition rounded p-4 shadow-sm"
                        >
                            <p className="text-blue-700 font-semibold text-lg">{coupon.code}</p>
                            <p className="text-sm text-gray-600">
                                {coupon.discount}% off • Expires:{" "}
                                {new Date(coupon.expiry).toLocaleDateString()}
                            </p>
                            {copiedCoupon === coupon.code && (
                                <p className="text-green-600 font-medium mt-2">Copied!</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
