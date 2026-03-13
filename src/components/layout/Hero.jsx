import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useGetHeroes } from "@/hooks/hero/useHero";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { HeroSkeleton } from "../product/skeletons/HeroSkeleton";

export const HeroSection = () => {
    const { data: heroes, isLoading, error } = useGetHeroes(true);

    if (isLoading) return <HeroSkeleton />
    if (error) return <p className="p-4 text-red-500 font-semibold">{error}</p>
    if (!heroes?.length) return null;

    return (
        <section className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="h-full"
            >
                {heroes.map((hero) => (
                    <SwiperSlide key={hero._id}>
                        <div className="relative w-full h-full">
                            <img
                                src={hero.image?.url}
                                alt={hero.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex flex-col justify-start items-start px-6 md:px-16 py-12 lg:py-24 space-y-4 max-w-6xl mx-auto">
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug mt-20 ml-3">
                                    {hero.title}
                                </h1>
                                <p className="text-base md:text-md text-white max-w-lg ml-6">
                                    {hero.subtitle}
                                </p>
                                <Button
                                    asChild
                                    size="sm"
                                    className="bg-secondary text-primary rounded-full ml-6 hover:text-white hover:bg-stone-700"
                                >
                                    <Link to="/shop">Shop Now</Link>
                                </Button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};