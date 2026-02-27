
// import React, { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { getUserCartAPI, emptyCartAPI } from "../Api/cartApi";
// import { saveUserAddressAPI } from "../Api/userApi";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import { applyBuyNowCouponAPI, applyCouponAPI } from "../Api/couponApi";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { clearCartItems, saveShippingAddress } from "../redux/cartSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useAddress } from "@/hooks/users/userAddress";
// import Banner from "@/components/shop/Banner";
// import { Button } from "@/components/ui/button";

// export const Checkout = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();

//     const [showConfirmModal, setShowConfirmModal] = useState(false);
//     const [saveSuccess, setSaveSuccess] = useState("");
//     const [couponCode, setCouponCode] = useState("");
//     const [couponMessage, setCouponMessage] = useState("");
//     const [useSavedAddress, setUseSavedAddress] = useState(true);
//     const [buyNowDiscountedTotal, setBuyNowDiscountedTotal] = useState(null);

//     const buyNowItem = useSelector((state) => state.cart.buyNowItem);

//     const editor = useEditor({
//         extensions: [StarterKit],
//         content: "<p></p>",
//         editorProps: {
//             attributes: { class: "tiptap prose prose-sm p-3 min-h-[150px] outline-2" },
//         },
//     });

//     // Fetch Cart
//     const { data: cart, isLoading, isError, error } = useQuery({
//         queryKey: ["userCart"],
//         queryFn: getUserCartAPI,
//         enabled: !buyNowItem,
//     });

//     // Empty Cart Mutation
//     const { mutate: emptyCart, isPending: emptyingCart } = useMutation({
//         mutationFn: emptyCartAPI,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["userCart"] });
//             dispatch(clearCartItems())
//             setShowConfirmModal(false);
//         },
//     });

//     // Save Address Mutation
//     const { mutate: saveAddress, isPending: savingAddress } = useMutation({
//         mutationFn: saveUserAddressAPI,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["userAddress"] });
//             setSaveSuccess("Address saved successfully!");
//             setTimeout(() => setSaveSuccess(""), 3000);
//         },
//         onError: (err) => console.error("Address save failed:", err.message),
//     });

//     const { data: address } = useAddress();

//     // Apply Coupon Mutation
//     const { mutate: applyCoupon, isPending: applyingCoupon } = useMutation({
//         mutationFn: (code) => {
//             if (buyNowItem) {
//                 return applyBuyNowCouponAPI({
//                     couponCode: code,
//                     productId: buyNowItem.productId,
//                     variantId: buyNowItem.variantId,
//                     quantity: buyNowItem.quantity,
//                 });
//             } else {
//                 return applyCouponAPI(code);
//             }
//         },
//         onSuccess: (data) => {
//             if (buyNowItem) {
//                 setBuyNowDiscountedTotal(data.finalAmount);
//                 setCouponMessage(`Discount applied: ${data.discount}% off!`);
//             } else {
//                 queryClient.invalidateQueries({ queryKey: ["userCart"] });
//                 setCouponMessage(`Discount applied: ${data.discount}% off!`);
//             }
//             setTimeout(() => setCouponMessage(""), 3000);
//         },
//         onError: (err) => {
//             setCouponMessage(err?.response?.data?.message || "Invalid coupon.");
//             setTimeout(() => setCouponMessage(""), 3000);
//         },
//     });

//     // Handle saved address checkbox
//     const handleUseSavedAddress = (e) => {
//         const checked = e.target.checked;
//         setUseSavedAddress(checked);
//         if (checked && address?.address) {
//             dispatch(saveShippingAddress(address.address));
//             toast.success("Shipping address selected");
//         }
//     };

//     // Save new address
//     const handleSaveAddress = () => {
//         const html = editor?.getHTML();
//         if (!html || html === "<p></p>") {
//             toast.error("Address cannot be empty!");
//             return;
//         }
//         saveAddress(html);
//         dispatch(saveShippingAddress(html));
//         setUseSavedAddress(true);
//     };

//     // Place Order
//     const handlePlaceOrder = () => {
//         if (!useSavedAddress) {
//             toast.error("Please select saved address or update address below");
//             return;
//         }

//         if (buyNowItem) {
//             navigate("/payment", {
//                 state: {
//                     cartTotal: buyNowItem.price * buyNowItem.quantity,
//                     totalAfterDiscount: buyNowDiscountedTotal ?? (buyNowItem.price * buyNowItem.quantity),
//                     buyNowItem,
//                     couponCode,
//                 },
//             });
//         } else {
//             navigate("/payment", {
//                 state: {
//                     cartTotal: cart.cartTotal,
//                     totalAfterDiscount: cart.totalAfterDiscount ?? cart.cartTotal,
//                 },
//             });
//         }
//     };

//     if (!buyNowItem && isLoading) {
//         return (
//             <div className="flex justify-center items-center h-60">
//                 <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//         );
//     }

//     if (!buyNowItem && isError) {
//         return <div className="text-red-500">Error: {error.message}</div>;
//     }

//     return (
//         <>
//             <Banner title="checkout" />
//             <div className="py-4 max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
//                 {/* Order Section */}
//                 <div className="w-full md:w-1/2 border p-4 rounded-lg shadow-sm">
//                     <h3 className="text-xl font-semibold mb-4">Order</h3>

//                     {/* Items */}
//                     <div>
//                         {buyNowItem ? (
//                             <div className="flex justify-between mb-1 border-b pb-1">
//                                 <div>{buyNowItem.quantity} x {buyNowItem.price}</div>
//                                 <div>{(buyNowItem.quantity * buyNowItem.price).toFixed(2)}</div>
//                             </div>
//                         ) : cart.products.length === 0 ? (
//                             <p>Your cart is empty.</p>
//                         ) : (
//                             cart.products.map((item, index) => (
//                                 <div key={index} className="flex justify-between mb-1 border-b pb-1">
//                                     <div>{item.count} x {item.price}</div>
//                                     <div>{(item.count * item.price).toFixed(2)}</div>
//                                 </div>
//                             ))
//                         )}
//                     </div>

//                     {/* Totals */}
//                     <div className="mt-4 font-semibold">
//                         {buyNowItem ? (
//                             <>
//                                 <p>Total: Rs. {(buyNowItem.price * buyNowItem.quantity).toFixed(2)}</p>
//                                 {buyNowDiscountedTotal !== null && (
//                                     <p className="font-bold text-green-600">
//                                         After Discount: Rs. {buyNowDiscountedTotal.toFixed(2)}
//                                     </p>
//                                 )}
//                             </>
//                         ) : (
//                             <>
//                                 <p>Total: Rs. {cart.cartTotal}</p>
//                                 {cart.totalAfterDiscount && (
//                                     <p className="font-bold text-green-600">
//                                         After Discount: Rs. {cart.totalAfterDiscount}
//                                     </p>
//                                 )}
//                             </>
//                         )}
//                     </div>

//                     {/* Coupon */}
//                     <div className="mt-6">
//                         <label className="block font-medium mb-1">Apply Coupon</label>
//                         <div className="flex gap-2">
//                             <input
//                                 type="text"
//                                 value={couponCode}
//                                 onChange={(e) => setCouponCode(e.target.value)}
//                                 placeholder="Enter coupon code"
//                                 className="flex-1 border p-2 rounded"
//                             />
//                             <Button
//                                 onClick={() => applyCoupon(couponCode)}
//                                 disabled={!couponCode || applyingCoupon}
//                             >
//                                 {applyingCoupon ? "Applying..." : "Apply"}
//                             </Button>
//                         </div>
//                         {couponMessage && (
//                             <p className="mt-2 text-sm text-blue-600 font-medium">{couponMessage}</p>
//                         )}
//                     </div>

//                     {/* Actions */}
//                     <div className="flex gap-3 mt-6">
//                         <Button onClick={handlePlaceOrder}>Place Order</Button>
//                         {!buyNowItem && (
//                             <Button onClick={() => setShowConfirmModal(true)}>Empty Cart</Button>
//                         )}
//                     </div>
//                 </div>

//                 {/* Shipping Address Section */}
//                 <div className="w-full md:w-1/2 border p-4 rounded-lg shadow-sm">
//                     <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>

//                     {address?.address && (
//                         <label className="flex gap-2 items-start mb-4">
//                             <input
//                                 type="checkbox"
//                                 checked={useSavedAddress}
//                                 onChange={handleUseSavedAddress}
//                                 className="mt-1 bg-black"
//                             />
//                             <div className="border p-3 rounded-md bg-gray-50 w-full">
//                                 <p className="font-medium mb-1">Use saved address</p>
//                                 <div
//                                     className="text-sm prose"
//                                     dangerouslySetInnerHTML={{ __html: address.address }}
//                                 />
//                             </div>
//                         </label>
//                     )}

//                     {!useSavedAddress && (
//                         <>
//                             <div className="flex flex-wrap gap-2 mb-3">
//                                 <button onClick={() => editor.chain().focus().toggleBold().run()} className={`px-2 py-1 border rounded ${editor.isActive("bold") ? "bg-black text-white" : "bg-white"}`}>Bold</button>
//                                 <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`px-2 py-1 border rounded ${editor.isActive("italic") ? "bg-black text-white" : "bg-white"}`}>Italic</button>
//                                 <button onClick={() => editor.chain().focus().setParagraph().run()} className={`px-2 py-1 border rounded ${editor.isActive("paragraph") ? "bg-black text-white" : "bg-white"}`}>Paragraph</button>
//                                 <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`px-2 py-1 border rounded ${editor.isActive("heading", { level: 1 }) ? "bg-black text-white" : "bg-white"}`}>H1</button>
//                                 <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`px-2 py-1 border rounded ${editor.isActive("heading", { level: 2 }) ? "bg-black text-white" : "bg-white"}`}>H2</button>
//                                 <button onClick={() => editor.chain().focus().undo().run()} className="px-2 py-1 border rounded bg-white">Undo</button>
//                                 <button onClick={() => editor.chain().focus().redo().run()} className="px-2 py-1 border rounded bg-white">Redo</button>
//                             </div>

//                             <div className="border border-gray-300 rounded-md p-2">
//                                 <EditorContent editor={editor} />
//                             </div>

//                             <Button onClick={handleSaveAddress} className="mt-3" disabled={savingAddress}>
//                                 {savingAddress ? "Saving..." : "Save Address"}
//                             </Button>

//                             {saveSuccess && (
//                                 <p className="text-green-600 mt-2 font-medium">{saveSuccess}</p>
//                             )}
//                         </>
//                     )}
//                 </div>
//             </div>

//             {/* Confirm Modal */}
//             {showConfirmModal && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//                     <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-sm">
//                         <h3 className="text-lg font-semibold mb-4 text-center">
//                             Are you sure you want to empty your cart?
//                         </h3>
//                         <div className="flex justify-end gap-3">
//                             <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md" onClick={() => setShowConfirmModal(false)}>Cancel</button>
//                             <button
//                                 disabled={emptyingCart}
//                                 onClick={() => emptyCart()}
//                                 className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md disabled:opacity-50"
//                             >
//                                 {emptyingCart ? "Clearing..." : "Yes, Empty"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };
//v2 text area
// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserCartAPI, emptyCartAPI } from "../Api/cartApi";
import { saveUserAddressAPI } from "../Api/userApi";
import { applyBuyNowCouponAPI, applyCouponAPI } from "../Api/couponApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCartItems, saveShippingAddress } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAddress } from "@/hooks/users/userAddress";
import Banner from "@/components/shop/Banner";
import { Button } from "@/components/ui/button";

export const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState("");
    const [couponCode, setCouponCode] = useState("");
    const [couponMessage, setCouponMessage] = useState("");
    const [useSavedAddress, setUseSavedAddress] = useState(true);
    const [buyNowDiscountedTotal, setBuyNowDiscountedTotal] = useState(null);
    const [addressContent, setAddressContent] = useState("");

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

    // Save Address Mutation
    const { mutate: saveAddress, isPending: savingAddress } = useMutation({
        mutationFn: saveUserAddressAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userAddress"] });
            setSaveSuccess("Address saved successfully!");
            setTimeout(() => setSaveSuccess(""), 3000);
        },
        onError: (err) => console.error("Address save failed:", err.message),
    });

    const { data: address } = useAddress();

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

    // Handle saved address checkbox
    const handleUseSavedAddress = (e) => {
        const checked = e.target.checked;
        setUseSavedAddress(checked);
        if (checked && address?.address) {
            dispatch(saveShippingAddress(address.address));
            toast.success("Shipping address selected");
            setAddressContent(address.address);
        }
    };

    // Save new address
    const handleSaveAddress = () => {
        if (!addressContent.trim()) {
            toast.error("Address cannot be empty!");
            return;
        }
        saveAddress(addressContent);
        dispatch(saveShippingAddress(addressContent));
        setUseSavedAddress(true);
    };

    // Place Order
    const handlePlaceOrder = () => {
        if (!useSavedAddress) {
            toast.error("Please select saved address or update address below");
            return;
        }

        if (buyNowItem) {
            navigate("/payment", {
                state: {
                    cartTotal: buyNowItem.price * buyNowItem.quantity,
                    totalAfterDiscount:
                        buyNowDiscountedTotal ?? buyNowItem.price * buyNowItem.quantity,
                    buyNowItem,
                    couponCode,
                },
            });
        } else {
            navigate("/payment", {
                state: {
                    cartTotal: cart.cartTotal,
                    totalAfterDiscount: cart.totalAfterDiscount ?? cart.cartTotal,
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
            <Banner title="checkout" />
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
                        {!buyNowItem && (
                            <Button onClick={() => setShowConfirmModal(true)}>Empty Cart</Button>
                        )}
                    </div>
                </div>

                {/* Shipping Address Section */}
                {/* <div className="w-full md:w-1/2 border p-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>

                    {address?.address && (
                        <label className="flex gap-2 items-start mb-4">
                            <input
                                type="checkbox"
                                checked={useSavedAddress}
                                onChange={handleUseSavedAddress}
                                className="mt-1 bg-black"
                            />
                            <div className="border p-3 rounded-md bg-gray-50 w-full">
                                <p className="font-medium mb-1">Use saved address</p>
                                <div
                                    className="text-sm prose"
                                    dangerouslySetInnerHTML={{ __html: address.address }}
                                />
                            </div>
                        </label>
                    )}

                    {!useSavedAddress && (
                        <>
                            <textarea
                                className="w-full border rounded-md p-2 min-h-[150px]"
                                placeholder="Enter your shipping address..."
                                value={addressContent}
                                onChange={(e) => setAddressContent(e.target.value)}
                            />
                            <Button
                                onClick={handleSaveAddress}
                                className="w-full mt-3"
                                disabled={savingAddress}
                            >
                                {savingAddress ? "Saving..." : "Save Address"}
                            </Button>
                            {saveSuccess && (
                                <p className="text-green-600 mt-2 font-medium">{saveSuccess}</p>
                            )}
                        </>
                    )}
                </div> */}
                <div className="w-full md:w-1/2 border p-4 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>

                    {address?.address && (
                        <label className="flex gap-2 items-start mb-4">
                            <input
                                type="checkbox"
                                checked={useSavedAddress}
                                onChange={handleUseSavedAddress}
                                className="mt-1 bg-black"
                            />
                            <div className="border p-3 rounded-md bg-gray-50 w-full">
                                <p className="font-medium mb-1">Use saved address</p>
                                <div
                                    className="text-sm prose"
                                    dangerouslySetInnerHTML={{ __html: address.address }}
                                />
                            </div>
                        </label>
                    )}

                    {/* ALWAYS show textarea, enable only if not using saved address */}
                    <textarea
                        className="w-full border rounded-md p-2 min-h-[150px]"
                        placeholder="Enter your shipping address..."
                        value={addressContent}
                        onChange={(e) => setAddressContent(e.target.value)}
                        disabled={useSavedAddress} // gray out if using saved
                    />
                    <Button
                        onClick={handleSaveAddress}
                        className="w-full mt-3"
                        disabled={savingAddress || useSavedAddress} // prevent saving if using saved
                    >
                        {savingAddress ? "Saving..." : "Save Address"}
                    </Button>
                    {saveSuccess && <p className="text-green-600 mt-2 font-medium">{saveSuccess}</p>}
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
                            <button
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
                                onClick={() => setShowConfirmModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                disabled={emptyingCart}
                                onClick={() => emptyCart()}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md disabled:opacity-50"
                            >
                                {emptyingCart ? "Clearing..." : "Yes, Empty"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

///v3 react-quill
// src/pages/Checkout.jsx
// import React, { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { getUserCartAPI, emptyCartAPI } from "../Api/cartApi";
// import { saveUserAddressAPI } from "../Api/userApi";
// import { applyBuyNowCouponAPI, applyCouponAPI } from "../Api/couponApi";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { clearCartItems, saveShippingAddress } from "../redux/cartSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useAddress } from "@/hooks/users/userAddress";
// import Banner from "@/components/shop/Banner";
// import { Button } from "@/components/ui/button";

// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// export const Checkout = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();

//     const [showConfirmModal, setShowConfirmModal] = useState(false);
//     const [saveSuccess, setSaveSuccess] = useState("");
//     const [couponCode, setCouponCode] = useState("");
//     const [couponMessage, setCouponMessage] = useState("");
//     const [useSavedAddress, setUseSavedAddress] = useState(true);
//     const [buyNowDiscountedTotal, setBuyNowDiscountedTotal] = useState(null);
//     const [addressContent, setAddressContent] = useState("");

//     const buyNowItem = useSelector((state) => state.cart.buyNowItem);

//     // Fetch Cart
//     const { data: cart, isLoading, isError, error } = useQuery({
//         queryKey: ["userCart"],
//         queryFn: getUserCartAPI,
//         enabled: !buyNowItem,
//     });

//     // Empty Cart Mutation
//     const { mutate: emptyCart, isPending: emptyingCart } = useMutation({
//         mutationFn: emptyCartAPI,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["userCart"] });
//             dispatch(clearCartItems());
//             setShowConfirmModal(false);
//         },
//     });

//     // Save Address Mutation
//     const { mutate: saveAddress, isPending: savingAddress } = useMutation({
//         mutationFn: saveUserAddressAPI,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["userAddress"] });
//             setSaveSuccess("Address saved successfully!");
//             setTimeout(() => setSaveSuccess(""), 3000);
//         },
//         onError: (err) => console.error("Address save failed:", err.message),
//     });

//     const { data: address } = useAddress();

//     // Apply Coupon Mutation
//     const { mutate: applyCoupon, isPending: applyingCoupon } = useMutation({
//         mutationFn: (code) => {
//             if (buyNowItem) {
//                 return applyBuyNowCouponAPI({
//                     couponCode: code,
//                     productId: buyNowItem.productId,
//                     variantId: buyNowItem.variantId,
//                     quantity: buyNowItem.quantity,
//                 });
//             } else {
//                 return applyCouponAPI(code);
//             }
//         },
//         onSuccess: (data) => {
//             if (buyNowItem) {
//                 setBuyNowDiscountedTotal(data.finalAmount);
//                 setCouponMessage(`Discount applied: ${data.discount}% off!`);
//             } else {
//                 queryClient.invalidateQueries({ queryKey: ["userCart"] });
//                 setCouponMessage(`Discount applied: ${data.discount}% off!`);
//             }
//             setTimeout(() => setCouponMessage(""), 3000);
//         },
//         onError: (err) => {
//             setCouponMessage(err?.response?.data?.message || "Invalid coupon.");
//             setTimeout(() => setCouponMessage(""), 3000);
//         },
//     });

//     // Handle saved address checkbox
//     const handleUseSavedAddress = (e) => {
//         const checked = e.target.checked;
//         setUseSavedAddress(checked);
//         if (checked && address?.address) {
//             dispatch(saveShippingAddress(address.address));
//             toast.success("Shipping address selected");
//             setAddressContent(address.address);
//         }
//     };

//     // Save new address
//     const handleSaveAddress = () => {
//         if (!addressContent || addressContent === "<p><br></p>") {
//             toast.error("Address cannot be empty!");
//             return;
//         }
//         saveAddress(addressContent);
//         dispatch(saveShippingAddress(addressContent));
//         setUseSavedAddress(true);
//     };

//     // Place Order
//     const handlePlaceOrder = () => {
//         if (!useSavedAddress) {
//             toast.error("Please select saved address or update address below");
//             return;
//         }

//         if (buyNowItem) {
//             navigate("/payment", {
//                 state: {
//                     cartTotal: buyNowItem.price * buyNowItem.quantity,
//                     totalAfterDiscount:
//                         buyNowDiscountedTotal ?? buyNowItem.price * buyNowItem.quantity,
//                     buyNowItem,
//                     couponCode,
//                 },
//             });
//         } else {
//             navigate("/payment", {
//                 state: {
//                     cartTotal: cart.cartTotal,
//                     totalAfterDiscount: cart.totalAfterDiscount ?? cart.cartTotal,
//                 },
//             });
//         }
//     };

//     if (!buyNowItem && isLoading) {
//         return (
//             <div className="flex justify-center items-center h-60">
//                 <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//             </div>
//         );
//     }

//     if (!buyNowItem && isError) {
//         return <div className="text-red-500">Error: {error.message}</div>;
//     }

//     return (
//         <>
//             <Banner title="checkout" />
//             <div className="py-4 max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
//                 {/* Order Section */}
//                 <div className="w-full md:w-1/2 border p-4 rounded-lg shadow-sm">
//                     <h3 className="text-xl font-semibold mb-4">Order</h3>

//                     {/* Items */}
//                     <div>
//                         {buyNowItem ? (
//                             <div className="flex justify-between mb-1 border-b pb-1">
//                                 <div>{buyNowItem.quantity} x {buyNowItem.price}</div>
//                                 <div>{(buyNowItem.quantity * buyNowItem.price).toFixed(2)}</div>
//                             </div>
//                         ) : cart.products.length === 0 ? (
//                             <p>Your cart is empty.</p>
//                         ) : (
//                             cart.products.map((item, index) => (
//                                 <div key={index} className="flex justify-between mb-1 border-b pb-1">
//                                     <div>{item.count} x {item.price}</div>
//                                     <div>{(item.count * item.price).toFixed(2)}</div>
//                                 </div>
//                             ))
//                         )}
//                     </div>

//                     {/* Totals */}
//                     <div className="mt-4 font-semibold">
//                         {buyNowItem ? (
//                             <>
//                                 <p>Total: Rs. {(buyNowItem.price * buyNowItem.quantity).toFixed(2)}</p>
//                                 {buyNowDiscountedTotal !== null && (
//                                     <p className="font-bold text-green-600">
//                                         After Discount: Rs. {buyNowDiscountedTotal.toFixed(2)}
//                                     </p>
//                                 )}
//                             </>
//                         ) : (
//                             <>
//                                 <p>Total: Rs. {cart.cartTotal}</p>
//                                 {cart.totalAfterDiscount && (
//                                     <p className="font-bold text-green-600">
//                                         After Discount: Rs. {cart.totalAfterDiscount}
//                                     </p>
//                                 )}
//                             </>
//                         )}
//                     </div>

//                     {/* Coupon */}
//                     <div className="mt-6">
//                         <label className="block font-medium mb-1">Apply Coupon</label>
//                         <div className="flex gap-2">
//                             <input
//                                 type="text"
//                                 value={couponCode}
//                                 onChange={(e) => setCouponCode(e.target.value)}
//                                 placeholder="Enter coupon code"
//                                 className="flex-1 border p-2 rounded"
//                             />
//                             <Button
//                                 onClick={() => applyCoupon(couponCode)}
//                                 disabled={!couponCode || applyingCoupon}
//                             >
//                                 {applyingCoupon ? "Applying..." : "Apply"}
//                             </Button>
//                         </div>
//                         {couponMessage && (
//                             <p className="mt-2 text-sm text-blue-600 font-medium">{couponMessage}</p>
//                         )}
//                     </div>

//                     {/* Actions */}
//                     <div className="flex gap-3 mt-6">
//                         <Button onClick={handlePlaceOrder}>Place Order</Button>
//                         {!buyNowItem && (
//                             <Button onClick={() => setShowConfirmModal(true)}>Empty Cart</Button>
//                         )}
//                     </div>
//                 </div>

//                 {/* Shipping Address Section */}
//                 <div className="w-full md:w-1/2 border p-4 rounded-lg shadow-sm">
//                     <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>

//                     {address?.address && (
//                         <label className="flex gap-2 items-start mb-4">
//                             <input
//                                 type="checkbox"
//                                 checked={useSavedAddress}
//                                 onChange={handleUseSavedAddress}
//                                 className="mt-1 bg-black"
//                             />
//                             <div className="border p-3 rounded-md bg-gray-50 w-full">
//                                 <p className="font-medium mb-1">Use saved address</p>
//                                 <div
//                                     className="text-sm prose"
//                                     dangerouslySetInnerHTML={{ __html: address.address }}
//                                 />
//                             </div>
//                         </label>
//                     )}

//                     {!useSavedAddress && (
//                         <>
//                             <ReactQuill
//                                 theme="snow"
//                                 value={addressContent}
//                                 onChange={setAddressContent}
//                                 placeholder="Enter your shipping address..."
//                                 className="min-h-[150px] mb-3"
//                             />

//                             <Button
//                                 onClick={handleSaveAddress}
//                                 className="w-full"
//                                 disabled={savingAddress}
//                             >
//                                 {savingAddress ? "Saving..." : "Save Address"}
//                             </Button>

//                             {saveSuccess && (
//                                 <p className="text-green-600 mt-2 font-medium">{saveSuccess}</p>
//                             )}
//                         </>
//                     )}
//                 </div>
//             </div>

//             {/* Confirm Modal */}
//             {showConfirmModal && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//                     <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-sm">
//                         <h3 className="text-lg font-semibold mb-4 text-center">
//                             Are you sure you want to empty your cart?
//                         </h3>
//                         <div className="flex justify-end gap-3">
//                             <button
//                                 className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
//                                 onClick={() => setShowConfirmModal(false)}
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 disabled={emptyingCart}
//                                 onClick={() => emptyCart()}
//                                 className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md disabled:opacity-50"
//                             >
//                                 {emptyingCart ? "Clearing..." : "Yes, Empty"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };