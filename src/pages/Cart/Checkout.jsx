import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserCartAPI, emptyCartAPI } from "../../Api/cartApi";
import { applyBuyNowCouponAPI, applyCouponAPI } from "../../Api/couponApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCartItems } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Banner from "@/components/shop/Banner";
import { Button } from "@/components/ui/button";
import { ShippingAddress } from "@/components/user/ShippingAddress";
import { useCODOrder } from "@/hooks/orders/useCODOrder";

export const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [couponMessage, setCouponMessage] = useState("");
    const [buyNowDiscountedTotal, setBuyNowDiscountedTotal] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState("");

    const buyNowItem = useSelector((state) => state.cart.buyNowItem);

    // Fetch Cart
    const { data: cart, isLoading, isError, error } = useQuery({
        queryKey: ["userCart"],
        queryFn: getUserCartAPI,
        enabled: !buyNowItem,
    });

    // Empty Cart Mutation
    const { mutate: emptyCart, isPending: emptyingCart } = useMutation({
        mutationFn: emptyCartAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userCart"] });
            dispatch(clearCartItems());
            setShowConfirmModal(false);
        },
    });

    // Apply Coupon Mutation
    const { mutate: applyCoupon, isPending: applyingCoupon } = useMutation({
        mutationFn: (code) => {
            if (buyNowItem) {
                return applyBuyNowCouponAPI({
                    couponCode: code,
                    productId: buyNowItem.productId,
                    variantId: buyNowItem.variantId,
                    quantity: buyNowItem.quantity,
                });
            } else {
                return applyCouponAPI(code);
            }
        },
        onSuccess: (data) => {
            if (buyNowItem) {
                setBuyNowDiscountedTotal(data.finalAmount);
                setCouponMessage(`Discount applied: ${data.discount}% off!`);
            } else {
                queryClient.invalidateQueries({ queryKey: ["userCart"] });
                setCouponMessage(`Discount applied: ${data.discount}% off!`);
            }
            setTimeout(() => setCouponMessage(""), 3000);
        },
        onError: (err) => {
            setCouponMessage(err?.response?.data?.message || "Invalid coupon.");
            setTimeout(() => setCouponMessage(""), 3000);
        },
    });

    ///Cash on Delivery 

    const { mutate: placeCODOrder, isPending: isPlacingOrder } = useCODOrder();

    const handleCODOrder = () => {
        if (!selectedAddress) {
            alert("Please select a shipping address");
            return;
        }

        placeCODOrder({
            address: selectedAddress,
            couponCode,
        },
            {
                onSuccess: (data) => {
                    // backend should return the created order
                    toast.success("Order placed successfully!");
                    dispatch(clearCartItems())
                    const orderId = data.order._id;
                    navigate(`/order/success/${orderId}`);
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Failed to place order");
                },
            }

        );
    };

    // Place Order
    const handlePlaceOrder = () => {
        if (!selectedAddress) {
            toast.error("Please select or enter a shipping address");
            return;
        }

        if (buyNowItem) {
            navigate("/payment", {
                state: {
                    cartTotal: buyNowItem.price * buyNowItem.quantity,
                    totalAfterDiscount: buyNowDiscountedTotal ?? buyNowItem.price * buyNowItem.quantity,
                    buyNowItem,
                    couponCode,
                    shippingAddress: selectedAddress,
                },
            });
        } else {
            navigate("/payment", {
                state: {
                    cartTotal: cart.cartTotal,
                    totalAfterDiscount: cart.totalAfterDiscount ?? cart.cartTotal,
                    shippingAddress: selectedAddress,
                },
            });
        }
    };


    if (!buyNowItem && isLoading) {
        return (
            <div className="flex justify-center items-center h-60">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }


    if (!buyNowItem && isError) {
        return <div className="text-red-500">Error: {error.message}</div>;
    }



    return (
        <>
            <Banner
                title="checkout"
                imageUrl="https://res.cloudinary.com/dfgeq4iix/image/upload/v1772447486/mern-ecommerce/nygat7mhpccrtbih6o5i.jpg"
            />
            <div className="py-4 max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
                {/* Order Section */}
                <div className="w-full md:w-1/2 border p-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Order</h3>

                    {/* Items */}
                    <div>
                        {buyNowItem ? (
                            <div className="flex justify-between mb-1 border-b pb-1">
                                <div>
                                    {buyNowItem.quantity} x {buyNowItem.price}
                                </div>
                                <div>{(buyNowItem.quantity * buyNowItem.price).toFixed(2)}</div>
                            </div>
                        ) : cart.products.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            cart.products.map((item, index) => (
                                <div key={index} className="flex justify-between mb-1 border-b pb-1">
                                    <div>
                                        {item.count} x {item.price}
                                    </div>
                                    <div>{(item.count * item.price).toFixed(2)}</div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Totals */}
                    <div className="mt-4 font-semibold">
                        {buyNowItem ? (
                            <>
                                <p>Total: Rs. {(buyNowItem.price * buyNowItem.quantity).toFixed(2)}</p>
                                {buyNowDiscountedTotal !== null && (
                                    <p className="font-bold text-green-600">
                                        After Discount: Rs. {buyNowDiscountedTotal.toFixed(2)}
                                    </p>
                                )}
                            </>
                        ) : (
                            <>
                                <p>Total: Rs. {cart.cartTotal}</p>
                                {cart.totalAfterDiscount && (
                                    <p className="font-bold text-green-600">
                                        After Discount: Rs. {cart.totalAfterDiscount}
                                    </p>
                                )}
                            </>
                        )}
                    </div>

                    {/* Coupon */}
                    <div className="mt-6">
                        <label className="block font-medium mb-1">Apply Coupon</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Enter coupon code"
                                className="flex-1 border p-2 rounded"
                            />
                            <Button
                                onClick={() => applyCoupon(couponCode)}
                                disabled={!couponCode || applyingCoupon}
                            >
                                {applyingCoupon ? "Applying..." : "Apply"}
                            </Button>
                        </div>
                        {couponMessage && (
                            <p className="mt-2 text-sm text-blue-600 font-medium">{couponMessage}</p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-6">
                        <Button onClick={handlePlaceOrder}>Place Order</Button>
                        <Button disabled={isPlacingOrder} onClick={handleCODOrder}>Cash Order</Button>
                        {!buyNowItem && (
                            <Button onClick={() => setShowConfirmModal(true)}>Empty Cart</Button>
                        )}
                    </div>
                </div>

                {/* Shipping Address Section */}
                <div className="w-full md:w-1/2">
                    <ShippingAddress onAddressSelected={(addr) => setSelectedAddress(addr)} />
                </div>
            </div>

            {/* Confirm Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-sm">
                        <h3 className="text-lg font-semibold mb-4 text-center">
                            Are you sure you want to empty your cart?
                        </h3>
                        <div className="flex justify-end gap-3">
                            <Button
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                                onClick={() => setShowConfirmModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={emptyingCart}
                                onClick={() => emptyCart()}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md disabled:opacity-50"
                            >
                                {emptyingCart ? "Clearing..." : "Yes, Empty"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};