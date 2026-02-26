import React from 'react'
import { useSalesProducts } from '@/hooks/products/useSales';
import { toast } from 'react-toastify';

const SaleDeals = () => {

    const { data, isError, error, isLoading } = useSalesProducts();
    console.log("sales data ", data?.products?.map((item) => (item.salePrice)))
    console.log("count= ", data?.count)
    console.log("error ", error)
    if (isLoading) return null;
    if (!data?.products?.length) return null;

    if (isError) {
        console.error("F  products query error:", error?.response?.data?.message || error.message);
        toast.error("Failed to load flash deals");
        return null; // stop rendering
    }
    return (
        <>

            {
                data?.products?.map((item) => (<div>
                    <img src={item.images[1]}
                        alt="tile"
                    />
                    <p>
                        {item.salePrice}
                    </p>
                </div>))
            }

        </>
    )
}

export default SaleDeals