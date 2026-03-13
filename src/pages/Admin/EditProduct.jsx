import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom'

import { ProductForm } from '@/components/product/ProductForm';
import { getProductAPI } from '@/Api/productApi';

export const EditProduct = () => {
    const params = useParams();
    const id = params.id
    const { data: product } = useQuery({
        queryKey: ["products", id],
        queryFn: () => getProductAPI(id)
    })

    return (
        <>

            <ProductForm mode="edit" initialData={product} />
        </>
    )
}
