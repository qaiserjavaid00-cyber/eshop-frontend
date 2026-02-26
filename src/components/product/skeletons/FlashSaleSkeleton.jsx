// src/components/product/FlashSaleSkeleton.jsx
import { Skeleton } from "@/components/ui/skeleton";

const FlashSaleSkeleton = () => {
    return (
        <div className="border rounded p-3 relative space-y-3">
            {/* Countdown badge */}
            <Skeleton className="absolute top-2 left-2 h-6 w-20 rounded-md" />

            {/* Image */}
            <Skeleton className="h-40 w-full rounded-md" />

            {/* Title */}
            <Skeleton className="h-4 w-3/4" />

            {/* Variant */}
            <Skeleton className="h-3 w-1/2" />

            {/* Price */}
            <div className="flex gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
            </div>

            {/* Stock */}
            <Skeleton className="h-3 w-1/3" />
        </div>
    );
};

export default FlashSaleSkeleton;