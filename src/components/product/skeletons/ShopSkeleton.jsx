import { Skeleton } from "@/components/ui/skeleton";

export const ShopSkeleton = () => {
    return (
        <div className=" w-full animate-pulse">
            <div className="p-10 w-full">
                <Skeleton className='mt-20 h-48  ' />
            </div>

            <div className="flex gap-4">
                {/* FILTERS SKELETON */}
                <div className="w-1/4 p-6 flex flex-col gap-4 border shadow-lg rounded-lg">
                    <Skeleton className="h-8 w-1/2" /> {/* Filters title */}

                    {/* Categories */}
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <div className="flex flex-col gap-1">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </div>

                    {/* Sub Categories */}
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-14 rounded-full" />
                        </div>
                    </div>

                    {/* Price Slider */}
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-2/5" />
                        <Skeleton className="h-6 w-full rounded" />
                        <div className="flex justify-between mt-1">
                            <Skeleton className="h-4 w-10" />
                            <Skeleton className="h-4 w-10" />
                        </div>
                    </div>

                    {/* Colors */}
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-2/5" />
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="w-8 h-8 rounded-lg" />
                            <Skeleton className="w-8 h-8 rounded-lg" />
                            <Skeleton className="w-8 h-8 rounded-lg" />
                        </div>
                    </div>

                    {/* Sizes */}
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-2/5" />
                        <div className="flex flex-col gap-1">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-14" />
                        </div>
                    </div>

                    {/* CopyCoupon */}
                    <Skeleton className="h-10 w-full mt-4" />
                </div>

                {/* PRODUCTS SKELETON */}
                <div className="w-3/4 space-y-4">
                    {/* Sort bar */}
                    <div className="flex justify-between items-center mb-4">
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-8 w-32" />
                    </div>

                    {/* Product grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {Array.from({ length: 9 }).map((_, idx) => (
                            <div key={idx} className="border rounded-lg p-4 flex flex-col gap-2">
                                <Skeleton className="h-40 w-full rounded-lg" /> {/* Product image */}
                                <Skeleton className="h-4 w-3/4" /> {/* Title */}
                                <Skeleton className="h-4 w-1/2" /> {/* Price */}
                                <Skeleton className="h-8 w-full mt-2" /> {/* Add to cart button */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};