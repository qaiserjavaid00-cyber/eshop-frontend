import React, { useState } from "react";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    createCouponAPI,
    getCouponsAPI,
    deleteCouponAPI,
} from "../Api/couponApi";

export const Coupons = () => {
    const [code, setCode] = useState("");
    const [discount, setDiscount] = useState("");
    const [expiry, setExpiry] = useState("");

    const queryClient = useQueryClient();

    // Create coupon
    const {
        mutate: createCoupon,
        isLoading: isCreating,
        isError: isCreateError,
        isSuccess: isCreateSuccess,
        error: createError,
    } = useMutation({
        mutationFn: createCouponAPI,
        onSuccess: () => {
            queryClient.invalidateQueries(["coupons"]);
            setCode("");
            setDiscount("");
            setExpiry("");
        },
    });

    // Delete coupon
    const {
        mutate: deleteCoupon,
        isLoading: isDeleting,
    } = useMutation({
        mutationFn: deleteCouponAPI,
        onSuccess: () => {
            queryClient.invalidateQueries(["coupons"]);
        },

        onError: (error) => {
            console.error("❌ Delete error:", error?.response?.data || error.message);
            alert(error?.response?.data?.message || "Delete failed");
        },
    });

    // Get all coupons
    const {
        data: coupons = [],
        isLoading: isFetching,
        isError: isFetchError,
        error: fetchError,
    } = useQuery({
        queryKey: ["coupons"],
        queryFn: getCouponsAPI,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!code || !discount || !expiry) return;
        createCoupon({ code, discount, expiry });
    };

    const handleDelete = (couponId) => {
        console.log("🗑 Deleting coupon with ID:", couponId);
        if (window.confirm("Are you sure you want to delete this coupon?")) {
            deleteCoupon(couponId);
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-6 shadow rounded">
            <h2 className="text-xl font-bold mb-4">Create Coupon</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Name</label>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full border p-2 rounded"
                        placeholder="e.g. SUMMER20"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Discount (%)</label>
                    <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Expiry Date</label>
                    <input
                        type="date"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
                    disabled={isCreating}
                >
                    {isCreating ? "Creating..." : "Create Coupon"}
                </button>
            </form>

            {isCreateError && (
                <p className="mt-3 text-red-500">
                    {createError?.response?.data?.message || "Creation failed."}
                </p>
            )}
            {isCreateSuccess && (
                <p className="mt-3 text-green-600">Coupon created successfully!</p>
            )}

            <hr className="my-6" />

            <h3 className="text-lg font-semibold mb-2">Existing Coupons</h3>

            {isFetching ? (
                <p>Loading coupons...</p>
            ) : isFetchError ? (
                <p className="text-red-500">
                    {fetchError?.response?.data?.message || "Failed to load coupons."}
                </p>
            ) : coupons?.length === 0 ? (
                <p>No coupons found.</p>
            ) : (
                <ul className="space-y-3">
                    {coupons?.map((coupon) => (
                        <li
                            key={coupon?._id}
                            className="p-3 border rounded flex justify-between items-center"
                        >
                            <div>
                                <p className="font-medium">{coupon?.code}</p>
                                <p className="text-sm text-gray-600">
                                    Discount: {coupon?.discount}% | Expiry:{" "}
                                    {new Date(coupon?.expiry).toLocaleDateString()}
                                </p>
                            </div>
                            <button
                                onClick={() => handleDelete(coupon?._id)}
                                className="text-red-600 hover:underline text-sm"
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
