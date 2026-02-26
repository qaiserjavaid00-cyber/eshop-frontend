import { Skeleton } from "@/components/ui/skeleton";

const FeaturedProductSkeleton = () => {
    return (
        <div className="p-4 border rounded shadow-sm space-y-3">
            {/* Image */}
            <Skeleton className="w-full h-48 rounded-md" />

            {/* Title */}
            <Skeleton className="h-4 w-3/4" />

            {/* Price */}
            <Skeleton className="h-4 w-1/2" />
        </div>
    );
};

export default FeaturedProductSkeleton;