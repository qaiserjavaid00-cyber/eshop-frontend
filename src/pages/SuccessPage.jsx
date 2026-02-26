import { useParams } from "react-router-dom";

export const SuccessPage = () => {
    const { orderId } = useParams();

    return (
        <div className="p-10 text-center">
            <h2 className="text-2xl font-bold text-green-600">
                Payment Successful!
            </h2>
            <p className="mt-4">
                Thank you for your order.
            </p>
            <p className="mt-2 text-gray-600">
                Order ID: {orderId}
            </p>
        </div>
    );
};