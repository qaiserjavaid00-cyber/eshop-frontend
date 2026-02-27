// src/components/AddressInput.jsx
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSaveAddress } from "@/hooks/users/useSaveAddress";
import { useGetAddress } from "@/hooks/users/useGetAddress";

export default function AddressInput() {
    const [address, setAddress] = useState("");

    // React Query hooks
    const { data } = useGetAddress(); // fetch existing address from DB
    const { mutate: saveAddress, isPending } = useSaveAddress();

    // Populate textarea with existing address
    useEffect(() => {
        if (data?.address) setAddress(data.address);
    }, [data]);

    const handleSave = () => {
        if (!address.trim()) return alert("Address cannot be empty");
        saveAddress(address);
    };

    return (
        <div className="max-w-lg mx-auto space-y-4">
            <label className="block font-semibold text-gray-700 mb-2">
                Shipping Address
            </label>
            <Textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your shipping address here..."
                className="resize-none h-32"
            />
            <Button
                onClick={handleSave}
                disabled={isPending || !address.trim()}
                className="w-full"
            >
                {isPending ? "Saving..." : "Save Address"}
            </Button>
        </div>
    );
}