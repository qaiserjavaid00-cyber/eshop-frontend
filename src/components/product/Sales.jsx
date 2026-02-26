import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";


import { toast } from "react-toastify";
import { useSalesProducts } from "@/hooks/products/useSales";
import FlashSaleSkeleton from "./skeletons/FlashSaleSkeleton";

const Sales = () => {
    const { data, isError, error, isLoading } = useSalesProducts();
    // console.log("sales data ", data?.products)
    // console.log("count= ", data?.count)
    // console.log("error ", error)
    if (isLoading) {
        return (
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-red-600 mb-4">
                    🔥 Winter (Ending Soon)
                </h2>

                <Swiper slidesPerView={1} spaceBetween={16}>
                    {Array.from({ length: 2 }).map((_, i) => (
                        <SwiperSlide key={i}>
                            <FlashSaleSkeleton />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        );
    }
    if (!data?.products?.length) return null;

    if (isError) {
        console.error("sales  products query error:", error?.response?.data?.message || error.message);
        toast.error("Failed to load flash deals");
        return null; // stop rendering
    }

    return (
        <section className="mb-10">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
                🔥 Winter (Ending Soon)
            </h2>

            <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 3500 }}
                spaceBetween={16}
                slidesPerView={1}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 1 },
                    1024: { slidesPerView: 1 },
                }}
            >
                {data?.products?.map(item => (
                    <SwiperSlide key={item.variantId}>
                        <div className="border rounded p-3 relative">

                            <Link to={`/${item.slug}?variant=${item.variantId}`}>
                                <img
                                    src={item?.images?.[0]}
                                    alt={item?.title}
                                    className="h-40 w-full object-cover rounded"
                                />
                            </Link>

                            <h3 className="mt-2 font-semibold text-sm">
                                {item?.title}
                            </h3>

                            <p className="text-xs text-gray-500">
                                {item?.color} • {item.size}
                            </p>

                            <div className="flex gap-2 items-center mt-1">
                                <span className="text-red-600 font-bold">
                                    ${item?.salePrice}
                                </span>
                                <span className="line-through text-gray-400 text-xs">
                                    ${item?.originalPrice}
                                </span>
                            </div>

                            <p className="text-xs text-orange-600 mt-1">
                                Stock left: {item?.quantity}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Sales;
