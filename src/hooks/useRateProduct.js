// hooks/useRateProduct.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rateProductAPI } from '../Api/productApi'
import { toast } from 'react-toastify';

export const useRateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: rateProductAPI,
        onSuccess: (data) => {
            toast.success(data.message || "Rating submitted!");
            queryClient.invalidateQueries(['product', data.product._id]);
        },
        onError: (err) => {
            toast.error(err.response?.data?.message || "Rating failed");
        },
    });
};
