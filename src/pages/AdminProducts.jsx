// import { useMutation, useQuery } from '@tanstack/react-query'
// import { deleteProductAPI, getAllproductsAPI } from '../Api/productApi'
// import { AiFillDelete, AiFillEdit } from "react-icons/ai"
// import { useNavigate } from 'react-router-dom'
import React from 'react'
import AdminProductsTable from '@/components/admin/product/AdminProductsTable'

export const AdminProducts = () => {

    // const navigate = useNavigate();

    // const { data, refetch } = useQuery({
    //     queryKey: ["products"],
    //     queryFn: getAllproductsAPI,
    //     onSuccess: (data) => {
    //         console.log(data)
    //     },
    //     onError: (error) => {
    //         console.log(error)
    //     }
    // })

    //////delete

    // const { mutate: remove } = useMutation({
    //     mutationKey: ["products"],
    //     mutationFn: deleteProductAPI,
    //     onError: (error) => {
    //         alert(error?.response?.data?.message)
    //         console.log(error)
    //     },
    // });

    // function handleDelete(id) {
    //     remove(id, {
    //         onSuccess: () => {
    //             refetch();
    //         },
    //         onError: (error) => {
    //             alert(error?.response?.data?.message)
    //             console.log(error)
    //         },

    //     });
    // }

    return (
        <>
            <AdminProductsTable />
        </>
    )
}
