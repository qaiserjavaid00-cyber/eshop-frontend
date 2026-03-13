import React, { useMemo } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { deleteProductAPI, getAllproductsAPI } from "@/Api/productApi";
import { DataTable } from "@/components/data-table";
import { getProductColumns } from "./column";
import { SkeletonTable } from "@/components/product/skeletons/SkeletonTable";

const AdminProductsTable = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["products"],
        queryFn: getAllproductsAPI,
    });

    const { mutate: remove } = useMutation({
        mutationFn: deleteProductAPI,
        onSuccess: () => {
            toast.success("Product deleted successfully");
            queryClient.invalidateQueries(["products"]);
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message);
        },
    });

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        remove(id);
    };

    const columns = useMemo(
        () => getProductColumns(navigate, handleDelete),
        []
    );

    if (isLoading) return <SkeletonTable columns={columns} rows={10} />;
    if (isError) return <p className="p-6 text-red-500">{error?.message}</p>;

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-semibold">All Products</h1>

            <DataTable columns={columns} data={data?.products || []} placeholder="Serach Products..." />
        </div>
    );
};

export default AdminProductsTable;