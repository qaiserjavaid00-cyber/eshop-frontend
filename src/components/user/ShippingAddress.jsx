import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { saveUserAddressAPI } from "../../Api/userApi";
import { useAddress } from "@/hooks/users/userAddress";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { saveShippingAddress } from "../../redux/cartSlice";
import { toast } from "react-toastify";

export const ShippingAddress = ({ onAddressSelected }) => {
    const dispatch = useDispatch();
    const { data: address } = useAddress();
    const [useSavedAddress, setUseSavedAddress] = useState(false);
    const [addressContent, setAddressContent] = useState("");
    const [saveSuccess, setSaveSuccess] = useState("");

    // Save Address Mutation
    const { mutate: saveAddress, isPending: savingAddress } = useMutation({
        mutationFn: saveUserAddressAPI,
        onSuccess: () => {
            setSaveSuccess("Address saved successfully!");
            setTimeout(() => setSaveSuccess(""), 3000);
            dispatch(saveShippingAddress(addressContent));
            onAddressSelected(addressContent);
            setUseSavedAddress(true);
            toast.success("Shipping address selected");
        },
        onError: (err) => toast.error(err?.message || "Failed to save address"),
    });

    // Handle checkbox toggle
    const handleUseSavedAddress = (e) => {
        const checked = e.target.checked;
        setUseSavedAddress(checked);
        if (address?.address) {
            setAddressContent(address.address);
            dispatch(saveShippingAddress(address.address));
            onAddressSelected(address.address);
            toast.success("Shipping address selected");
        }
    };

    // Save new address
    const handleSaveAddress = () => {
        if (!addressContent.trim()) {
            toast.error("Address cannot be empty!");
            return;
        }
        saveAddress(addressContent);
    };

    // Initialize with saved address
    useEffect(() => {
        if (address?.address) {
            setAddressContent(address?.address);
            dispatch(saveShippingAddress(address?.address));
        }
    }, [address, dispatch]);

    return (
        <div className="w-full border p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>

            {/* Saved Address Checkbox */}
            {address?.address && (
                <label className="flex gap-2 items-start mb-4 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={useSavedAddress}
                        onChange={handleUseSavedAddress}
                        className="mt-1 w-4 h-4"
                    />
                    <div className="border p-3 rounded-md w-full">
                        <p className="font-medium mb-1">Use saved address</p>
                        <p className="text-sm">{address?.address}</p>
                    </div>
                </label>
            )}

            {/* Textarea for new address */}
            <textarea
                className="w-full border rounded-md p-2 min-h-[150px]"
                placeholder="Enter your shipping address..."
                value={addressContent}
                onChange={(e) => setAddressContent(e.target.value)}
                disabled={useSavedAddress && address?.address}
            />

            <Button
                onClick={handleSaveAddress}
                className="w-full mt-3"
                disabled={savingAddress || (useSavedAddress && address?.address)}
            >
                {savingAddress ? "Saving..." : "Save Address"}
            </Button>

            {saveSuccess && <p className="text-green-600 mt-2 font-medium">{saveSuccess}</p>}
        </div>
    );
};