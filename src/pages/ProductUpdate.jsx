import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { getProductAPI, getVariantsByProductIdAPI } from '../Api/productApi'
import { ProductForm } from '@/components/product/ProductForm'
import { toast } from 'react-toastify'

export const ProductUpdate = () => {

    const params = useParams()
    const id = params.id;

    const { data, isLoading: productLoading } = useQuery({
        queryKey: ["products", id],
        queryFn: () => getProductAPI(id),
        onError: (error) => {
            toast.error(`${error?.response?.data?.message}`)
        }
    })
    const product = data?.product

    const { data: variants = [], isLoading: variantLoading } = useQuery({
        queryKey: ['variants', product?._id],
        queryFn: () => product ? getVariantsByProductIdAPI(product._id) : [],
        enabled: !!product?._id
    });

    console.log("product to update =", product)
    console.log("variantst to update =", variants)

    if (productLoading || variantLoading) {
        return <div>Loading product data...</div>
    }

    if (!product) {
        return <div>Product not found</div>
    }

    return (
        <>
            <div>
                <h2>You can update the product # <span className="font-fold bg-pink-200 p-2">{id}</span></h2>
            </div>
            <ProductForm mode="edit" initialData={product} initialVariants={variants} />
            {/* {product?.product?.images?.map((image, index) => { return <div><img src={image[index]} alt="ok" /></div> })} */}

        </>
    )
}
