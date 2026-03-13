import React from "react";

export const HeroSkeleton = () => {
    return (
        <section className="relative h-[400px] mb-8 rounded-lg overflow-hidden">
            {/* Background shimmer */}
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />

            {/* Content Skeleton */}
            <div className="absolute inset-0 flex flex-col justify-start items-start px-6 md:px-16 py-12 lg:py-24 space-y-4 max-w-6xl mx-auto">

                {/* Title */}
                <div className="h-8 w-2/3 bg-gray-300 rounded-md mt-16 ml-6 animate-pulse" />

                {/* Subtitle */}
                <div className="h-4 w-1/2 bg-gray-300 rounded-md ml-6 animate-pulse" />

                {/* Button */}
                <div className="h-9 w-28 bg-gray-300 rounded-full ml-6 animate-pulse" />
            </div>
        </section>
    );
};