// components/StarRatingModal.jsx
import { useState } from 'react';
import { useRateProduct } from '../hooks/useRateProduct';
import { Dialog } from '@headlessui/react';

export const StarRatingModal = ({ isOpen, onClose, productId }) => {
    const [star, setStar] = useState(0);
    const { mutate: rateProduct, isPending } = useRateProduct();

    const handleSubmit = () => {
        if (!star) return;
        rateProduct({ productId, star });
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-lg space-y-4">
                    <Dialog.Title className="text-xl font-semibold text-center">Rate This Product</Dialog.Title>
                    <div className="flex justify-center gap-2 text-yellow-500 text-2xl">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <button
                                key={num}
                                onClick={() => setStar(num)}
                                className={num <= star ? 'text-yellow-500' : 'text-gray-300'}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-end gap-2">
                        <button onClick={onClose} className="text-sm px-4 py-2 bg-gray-100 rounded">
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!star || isPending}
                            className="text-sm px-4 py-2 bg-yellow-500 text-white rounded"
                        >
                            {isPending ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};
