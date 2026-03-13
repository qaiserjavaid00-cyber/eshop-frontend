
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import { HeroSection } from "@/components/layout/Hero";
import FeaturedProductsSlider from "@/components/product/FeaturedProducts";
import { BestSeller } from "@/components/BestSeller";
import FlashDeals from "@/components/product/FlashDeals";
import Sales from "@/components/product/Sales";
import SubscribeSection from "@/components/Subscribe";
import HomeRatingsCarousel from "@/components/HomeRatings";

export const Home = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Hero Section */}
            <div className="animate-fade-up duration-700">
                <HeroSection />
            </div>

            {/* Best Sellers */}
            <section className="space-y-6 animate-fade-up duration-700 delay-100">
                <BestSeller />

                <div className="flex justify-center">
                    <Button
                        asChild
                        className="w-36 rounded-full transition-transform duration-300 hover:scale-105 hover:bg-orange-600"
                        size="sm"
                    >
                        <Link to="/shop">Go to Shop</Link>
                    </Button>
                </div>
            </section>

            {/* Featured Products */}
            <section className="animate-fade-up duration-700 delay-200">
                <FeaturedProductsSlider />
            </section>

            {/* Flash Deals & Sales */}
            <section className="flex flex-col md:flex-row gap-6 animate-fade-up duration-700 delay-300">
                <div className="w-full md:w-1/2">
                    <FlashDeals />
                </div>
                <div className="w-full md:w-1/2">
                    <Sales />
                </div>
            </section>
            <HomeRatingsCarousel />
            {/* Subscribe Section */}
            <section className="animate-fade-up duration-700 delay-400">
                <SubscribeSection />
            </section>
        </div>
    );
};