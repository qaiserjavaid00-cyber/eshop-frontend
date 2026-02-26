import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserWishlistAPI } from "../Api/userApi";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { removeFromWishlistAPI } from "../Api/userApi";
import { toast } from "react-toastify";


export const Wishlist = () => {
    const queryClient = useQueryClient();
    const {
        data: wishlist,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["userWishlist"],
        queryFn: getUserWishlistAPI,
    });


    const { mutate: removeFromWishlist } = useMutation({
        mutationFn: removeFromWishlistAPI,
        onSuccess: () => {
            toast.success("Removed from wishlist");
            queryClient.invalidateQueries(["userWishlist"]);
        },
        onError: () => toast.error("Failed to remove"),
    });




    if (isLoading) return <div className="text-center py-10">Loading wishlist...</div>;
    if (isError) return <div className="text-red-500 text-center py-10">{error.message}</div>;

    if (!wishlist || wishlist.length === 0) {
        return <div className="text-center py-20 text-gray-600">Your wishlist is empty.</div>;
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-6">My Wishlist</h2>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {wishlist.map((product) => (
                    <div
                        key={product._id}
                        className="border rounded-lg p-4 shadow hover:shadow-lg transition"
                    >
                        <Link to={`/${product?.slug}`}>
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="w-full h-48 object-cover rounded"
                            />
                            <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
                            <p className="text-sm text-gray-500">{product.brand}</p>
                            <p className="text-blue-600 font-bold mt-1">Rs. {product.price}</p>
                        </Link>
                        <button
                            onClick={() => removeFromWishlist(product._id)}
                            className="mt-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded"
                        >
                            Remove
                        </button>

                    </div>
                ))}
            </div>
        </div>
    );
};
