import { Skeleton } from "@/components/ui/skeleton";

export const ProductDetailsSkeleton = () => {
    return (
        <>
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 animate-pulse p-4 border border-gray-100">

                {/* LEFT: Image slider skeleton */}
                <div className="w-full lg:w-1/2 flex flex-col gap-2">
                    <Skeleton className="w-full h-[420px] md:h-[520px] rounded-xl bg-gray-200" />
                    <div className="flex gap-2 mt-2">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <Skeleton key={idx} className="w-16 h-16 rounded-md border bg-gray-200" />
                        ))}
                    </div>
                </div>

                {/* RIGHT: Product info skeleton */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                    {/* Title */}
                    <Skeleton className="h-8 w-3/4 rounded-md" />
                    {/* Rating */}
                    <Skeleton className="h-4 w-1/3 rounded-md" />

                    {/* Price */}
                    <Skeleton className="h-8 w-1/2 rounded-md mt-2" />

                    {/* Size selector */}
                    <Skeleton className="h-6 w-1/4 rounded-md mt-4" />
                    <div className="flex gap-2 flex-wrap">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <Skeleton key={idx} className="h-6 w-12 rounded-md" />
                        ))}
                    </div>

                    {/* Color selector */}
                    <Skeleton className="h-6 w-1/4 rounded-md mt-2" />
                    <div className="flex gap-2 flex-wrap">
                        {Array.from({ length: 4 }).map((_, idx) => (
                            <Skeleton key={idx} className="h-6 w-6 rounded-full" />
                        ))}
                    </div>

                    {/* Stock info */}
                    <Skeleton className="h-4 w-1/3 rounded-md mt-2" />

                    {/* Buttons */}
                    <div className="flex gap-2 mt-4">
                        <Skeleton className="h-10 w-24 rounded-md" />
                        <Skeleton className="h-10 w-24 rounded-md" />
                        <Skeleton className="h-10 w-10 rounded-full" />
                    </div>

                    {/* Reviews stars */}
                    <div className="flex gap-1 mt-2">
                        {Array.from({ length: 5 }).map((_, idx) => (
                            <Skeleton key={idx} className="h-5 w-5 rounded-md" />
                        ))}
                        <Skeleton className="h-4 w-16 ml-2 rounded-md" />
                    </div>
                </div>


            </div>
            {/* Tabs skeleton */}
            <div className="w-full mt-6 lg:mt-8">
                <Skeleton className="h-10 w-1/4 rounded-md mb-2" />
                <Skeleton className="h-48 w-full rounded-md" />
            </div>
        </>
    );
};