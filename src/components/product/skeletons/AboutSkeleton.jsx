import { Skeleton } from "@/components/ui/skeleton";

const AboutSkeleton = () => {
    return (
        <div className="max-w-6xl mx-auto p-6 space-y-10 animate-pulse">

            {/* Title */}
            <div className="flex justify-center">
                <Skeleton className="h-10 w-64 rounded-xl" />
            </div>

            {/* Description */}
            <div className="flex flex-col items-center space-y-3">
                <Skeleton className="h-4 w-full max-w-3xl rounded-lg" />
                <Skeleton className="h-4 w-full max-w-2xl rounded-lg" />
                <Skeleton className="h-4 w-full max-w-xl rounded-lg" />
            </div>

            {/* Video Section */}
            <Skeleton className="w-full h-[400px] rounded-2xl" />

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-10 mt-10">
                <div className="space-y-4">
                    <Skeleton className="h-6 w-40 rounded-lg" />
                    <Skeleton className="h-4 w-full rounded-lg" />
                    <Skeleton className="h-4 w-5/6 rounded-lg" />
                    <Skeleton className="h-4 w-4/6 rounded-lg" />
                </div>

                <div className="space-y-4">
                    <Skeleton className="h-6 w-40 rounded-lg" />
                    <Skeleton className="h-4 w-full rounded-lg" />
                    <Skeleton className="h-4 w-5/6 rounded-lg" />
                    <Skeleton className="h-4 w-4/6 rounded-lg" />
                </div>
            </div>

        </div>
    );
};

export default AboutSkeleton;