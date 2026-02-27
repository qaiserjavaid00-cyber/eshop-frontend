import { saveUserAddressAPI } from "@/Api/userApi";
import AddressEditor from "../components/AddressEditor";
import { useState } from "react";
import { saveShippingAddress } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";

export default function CheckoutAddress() {
    const [address, setAddress] = useState("");
    const dispatch = useDispatch();

    const handleSave = () => {
        if (!address.trim() || address === "<p></p>") {
            alert("Address cannot be empty");
            return;
        }
        saveUserAddressAPI(address); // your API call
        dispatch(saveShippingAddress(address)); // redux + localStorage
    };

    return (
        <div className="space-y-3">
            <AddressEditor value={address} onChange={setAddress} />
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={handleSave}
            >
                Save Address
            </button>
        </div>
    );
}