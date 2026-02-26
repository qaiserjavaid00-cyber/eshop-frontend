import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { useFlashProducts } from "@/hooks/products/useFlash";
import Countdown from "./Countdown";
import { toast } from "react-toastify";
import FlashSaleSkeleton from "./skeletons/FlashSaleSkeleton";

const FlashDeals = () => {
    const { data, isError, error, isLoading } = useFlashProducts();
    // console.log("data ", data)
    // console.log("error ", error)
    if (isLoading) {
        return (
            <section className="mb-10">
                <h2 className="text-2xl font-bold text-red-600 mb-4">
                    🔥 Flash Deals (Ending Soon)
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
    if (!data?.length) return null;
    if (isError) {
        console.error("Flash products query error:", error?.response?.data?.message || error.message);
        toast.error("Failed to load flash deals");
        return null; // stop rendering
    }

    return (
        <section className="mb-10">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
                🔥 Flash Deals (Ending Soon)
            </h2>

            <Swiper
                // className="w-full"
                // style={{ width: "100%" }}
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
                {data.map(item => (
                    <SwiperSlide key={item.variantId}>
                        <div className="border rounded p-3 relative">

                            {/* Countdown */}
                            <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded shadow">
                                <Countdown endTime={item.saleEnd} />
                            </div>

                            <Link to={`/${item.slug}?variant=${item.variantId}`}>
                                <img
                                    src={item.images?.[0]}
                                    alt={item.title}
                                    className="h-40 w-full object-cover rounded"
                                />
                            </Link>

                            <h3 className="mt-2 font-semibold text-sm">
                                {item.title}
                            </h3>

                            <p className="text-xs text-gray-500">
                                {item.color} • {item.size}
                            </p>

                            <div className="flex gap-2 items-center mt-1">
                                <span className="text-red-600 font-bold">
                                    ${item.flashPrice}
                                </span>
                                <span className="line-through text-gray-400 text-xs">
                                    ${item.originalPrice}
                                </span>
                            </div>

                            <p className="text-xs text-orange-600 mt-1">
                                Stock left: {item.quantity}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </section>
    );
};

export default FlashDeals;
