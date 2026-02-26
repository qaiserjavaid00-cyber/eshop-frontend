// src/components/home/FeaturedProductsSlider.jsx
import { useFeaturedProducts } from "@/hooks/products/useFeatured";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import FeaturedProductSkeleton from "./skeletons/FeaturedProductSkeleton";
import { Link } from "react-router-dom";



const FeaturedProductsSlider = () => {
    const { data, isLoading, isError } = useFeaturedProducts();

    if (isLoading) {
        return (
            <section className="my-8">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Featured Products
                </h2>

                <Swiper
                    spaceBetween={20}
                    slidesPerView={4}
                    navigation
                    modules={[Navigation]}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                        1280: { slidesPerView: 5 },
                    }}
                >
                    {Array.from({ length: 5 }).map((_, index) => (
                        <SwiperSlide key={index}>
                            <FeaturedProductSkeleton />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        );
    }
    if (isError) return <p>Failed to load featured products</p>;

    return (
        <section className="my-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Featured Products</h2>
            <Swiper
                spaceBetween={20}
                slidesPerView={4}
                navigation
                modules={[Navigation]}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                }}
            >
                {data.map((product) => (
                    <SwiperSlide key={product._id}>
                        <div className="card p-4 border rounded shadow-sm">
                            <Link to={`/${product.slug}`}>
                                <img
                                    src={product.images?.[0]}
                                    alt={product.title}
                                    className="w-full h-48 object-cover rounded"
                                />
                            </Link>
                            <h3 className="mt-2 font-semibold">{product?.title}</h3>
                            <p className="text-orange-600 mt-1">From ${product?.minPrice || product?.basePrice}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default FeaturedProductsSlider;
