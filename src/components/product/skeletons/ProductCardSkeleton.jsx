import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
    return (
        <div className="space-y-3">
            {/* Image */}
            <Skeleton className="h-48 w-full rounded-xl animate-pulse" />

            {/* Title */}
            <Skeleton className="h-4 w-3/4 animate-pulse" />

            {/* Price */}
            <Skeleton className="h-4 w-1/2 animate-pulse" />

            {/* Button */}
            <Skeleton className="h-10 w-full rounded-md animate-pulse" />
        </div>
    );
};

export default ProductCardSkeleton;