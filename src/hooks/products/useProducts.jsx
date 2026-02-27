
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHomeProductsAPI } from "@/Api/productApi";
import { useLocation } from "react-router-dom";

export const useProducts = ({ search, color = [], size = [], category = [], subCategory = [], brands=[] tags = [], specifications = {}, minPrice, maxPrice, sort, initialPage = 1, limit = 15, }) => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const urlPage = parseInt(params.get('page')) || initialPage;
    const [page, setPage] = useState(urlPage);

    // Reset page when filters change
    useEffect(() => {
        setPage(urlPage); // update page when URL changes
    }, [urlPage]);

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: [
            "products",
            { page, search, color, size, category, subCategory, brands, tags, specifications, minPrice, maxPrice, sort, limit },
        ],
        queryFn: () => {
            const payload = {
                page,
                search,
                color,
                size,
                category,
                subCategory,
                brands,
                tags,
                minPrice,
                maxPrice,
                sort,
                limit,
            };

            if (specifications && Object.keys(specifications).length > 0) {
                payload.specifications = JSON.stringify(specifications);
            }
            return getHomeProductsAPI(payload);
        },
        keepPreviousData: true,
    });

    const products = data?.products || [];
    const pageCount = data?.numOfPages || 1;
    const currentPage = data?.currentPage || page;
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

    return {
        products,
        isLoading,
        isError,
        error,
        refetch,
        page,
        setPage,
        pageCount,
        currentPage,
        pages,

    };
};
