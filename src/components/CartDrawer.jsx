import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const CartDrawer = ({ isOpen, onClose }) => {
    const cartItems = useSelector(state => state.cart.cartItems);

    if (!isOpen) return null;

    return (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-50 border-l border-gray-300 p-4">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h2 className="text-lg font-semibold">Cart</h2>
                <button onClick={onClose} className="text-red-500 text-xl font-bold">×</button>
            </div>
            <div className="overflow-y-auto h-[75vh]">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cartItems.map((item, idx) => (
                        <div key={idx} className="border-b py-2">
                            <p className="font-medium">{item.title}</p>

                            <img src={item.images[0]} alt={item.title} className='h-24 w-56' />
                        </div>
                    ))
                )}
            </div>
            <Link
                to="/cart"
                className="block mt-4 bg-green-600 hover:bg-green-700 text-white text-center py-2 rounded"
            >
                Go to Cart
            </Link>
        </div>
    );
};
