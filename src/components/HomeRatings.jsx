// import { useEffect, useRef } from "react";
// import { useHomeRatings } from "@/hooks/useHomeRatings";
// import HomeRatingsSkeleton from "./product/skeletons/HomeRatingsSkeleton";
// import { Link } from "react-router-dom";

// const HomeRatingsCarousel = () => {
//     const { data: ratings = [], isLoading } = useHomeRatings();
//     const scrollRef = useRef(null);

//     // Auto scroll
//     useEffect(() => {
//         const container = scrollRef.current;
//         if (!container) return;

//         const interval = setInterval(() => {
//             container.scrollBy({
//                 left: 300,
//                 behavior: "smooth",
//             });

//             if (
//                 container.scrollLeft + container.clientWidth >=
//                 container.scrollWidth
//             ) {
//                 container.scrollTo({ left: 0, behavior: "smooth" });
//             }
//         }, 3000);

//         return () => clearInterval(interval);
//     }, []);

//     if (isLoading) return <HomeRatingsSkeleton />;

//     if (!ratings.length) return null;

//     return (
//         <div className="max-w-7xl mx-auto px-6 py-12">
//             <h2 className="text-2xl font-bold mb-8 text-center">
//                 What Our Customers Say
//             </h2>

//             <div
//                 ref={scrollRef}
//                 className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
//             >
//                 {ratings.map((r) => (
//                     <div
//                         key={r.user._id}
//                         className="min-w-[280px] bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
//                     >
//                         <div className="flex items-center gap-3 mb-4">
//                             <div className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center font-bold">
//                                 {r.user.name.charAt(0).toUpperCase()}
//                             </div>

//                             <div>
//                                 <h4 className="font-semibold">
//                                     {r.user.name}
//                                 </h4>
//                                 <p className="text-yellow-500 text-sm">
//                                     {"⭐".repeat(r.star)}
//                                 </p>
//                             </div>
//                         </div>

//                         <p className="text-sm text-gray-600 mb-3">
//                             Rated this product {r.star} stars.
//                         </p>

//                         <Link
//                             to={`/product/${r.productSlug}`}
//                             className="text-sm text-blue-600 hover:underline"
//                         >
//                             {r.productTitle}
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default HomeRatingsCarousel;

import Slider from "react-slick";
import { useHomeRatings } from "@/hooks/useHomeRatings";
import HomeRatingsSkeleton from "./product/skeletons/HomeRatingsSkeleton";
import { Link } from "react-router-dom";

const HomeRatingsCarousel = () => {
    const { data: ratings = [], isLoading } = useHomeRatings();

    if (isLoading) return <HomeRatingsSkeleton />;
    if (!ratings.length) return null;

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
        appendDots: dots => (
            <div className="mt-6">
                <ul className="flex justify-center gap-2">{dots}</ul>
            </div>
        ),
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold mb-10 text-center">
                What Our Customers Say
            </h2>

            <Slider {...settings}>
                {ratings.map((r) => (
                    <div key={r.user._id} className="px-3">
                        <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition h-full dark:bg-background">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-12 w-12 rounded-full bg-black text-white flex items-center justify-center font-bold">
                                    {r.user.name.charAt(0).toUpperCase()}
                                </div>

                                <div>
                                    <h4 className="font-semibold">{r.user.name}</h4>
                                    <p className="text-yellow-500 text-sm">
                                        {"⭐".repeat(r.star)}
                                    </p>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-3">
                                Rated this product {r.star} stars.
                            </p>

                            <Link
                                to={`/${r.productSlug}`}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                {r.productTitle}
                            </Link>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HomeRatingsCarousel;