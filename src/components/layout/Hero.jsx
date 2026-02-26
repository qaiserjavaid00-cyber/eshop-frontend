// src/components/layout/HeroSection.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useGetHero } from "@/hooks/hero/useHero";

export const HeroSection = () => {
    const { data } = useGetHero();

    return (
        <section className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
            {/* Background image covering full section */}
            <img
                src={data?.image?.url}
                alt="Hero Banner"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-1 flex flex-col justify-start items-start px-6 md:px-16 py-12 lg:py-24 space-y-4 max-w-6xl mx-auto">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-snug mt-16 ml-6">
                    {data?.title}
                </h1>
                <p className="text-base md:text-md text-white max-w-lg ml-6">
                    {/* Discover premium tech products with great deals, dependable delivery,
                    and easy returns. */}
                    {data?.subtitle}
                </p>
                <Button asChild size="sm" className="bg-secondary text-primary rounded-full ml-6 hover:text-white hover:bg-stone-700">
                    <Link to="/shop">Shop Now</Link>
                </Button>
            </div>
        </section>
    );
};
