import AboutSkeleton from "@/components/product/skeletons/AboutSkeleton";
import { Button } from "@/components/ui/button";
import { useGetAbout } from "@/hooks/useAbout";
import { Link } from "react-router-dom";

const AboutPage = () => {
    const { data, isLoading } = useGetAbout();

    if (isLoading) return <AboutSkeleton />;
    if (!data?.isActive) return null;

    return (
        <div>

            <div className="max-w-7xl mx-auto px-6 py-20 space-y-24">

                {/* HERO SECTION */}
                <section className="grid md:grid-cols-2 gap-14 items-center">

                    {data.video?.url && (
                        <div className="rounded-2xl overflow-hidden shadow-xl">
                            <video
                                src={data.video.url}
                                controls
                                className="w-full h-[420px] object-cover"
                            />
                        </div>
                    )}

                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold  leading-tight">
                            {data.title}
                        </h1>

                        <p className="text-lg  leading-relaxed">
                            {data.description}
                        </p>

                        <div className="flex gap-4">

                            <Button asChild>
                                <Link
                                    to="/shop"
                                    className="px-6 py-3 rounded-lg hover:opacity-90 transition"
                                >
                                    Explore Products
                                </Link>
                            </Button>

                            <div className="border px-6 pt-1 rounded-lg transition">
                                <Link to="/contact"> Contact Us</Link>
                            </div>

                        </div>
                    </div>

                </section>


                {/* STATS SECTION */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <h3 className="text-3xl font-bold text-gray-900">10K+</h3>
                        <p className="text-gray-600 mt-1">Happy Customers</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <h3 className="text-3xl font-bold text-gray-900">50+</h3>
                        <p className="text-gray-600 mt-1">Countries Served</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <h3 className="text-3xl font-bold text-gray-900">5K+</h3>
                        <p className="text-gray-600 mt-1">Products Delivered</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border">
                        <h3 className="text-3xl font-bold text-gray-900">99%</h3>
                        <p className="text-gray-600 mt-1">Customer Satisfaction</p>
                    </div>

                </section>


                {/* MISSION & VISION */}
                <section className="grid md:grid-cols-2 gap-10">

                    <div className=" p-10 rounded-2xl shadow-sm border hover:shadow-md transition">
                        <h2 className="text-2xl font-semibold  mb-4">
                            Our Mission
                        </h2>
                        <p className=" leading-relaxed">
                            {data.mission}
                        </p>
                    </div>

                    <div className=" p-10 rounded-2xl shadow-sm border hover:shadow-md transition">
                        <h2 className="text-2xl font-semibold  mb-4">
                            Our Vision
                        </h2>
                        <p className=" leading-relaxed">
                            {data.vision}
                        </p>
                    </div>

                </section>


                {/* WHY CHOOSE US */}
                <section className="space-y-10 text-center">

                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold">
                            Why Choose Us
                        </h2>
                        <p className=" mt-3">
                            We focus on delivering high-quality products, excellent customer
                            service, and a seamless shopping experience.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">

                        <div className=" border rounded-xl p-8 hover:shadow-md transition">
                            <h3 className="font-semibold text-lg mb-2">
                                Premium Quality
                            </h3>
                            <p className="text-sm">
                                Carefully curated products with the highest standards of
                                quality and reliability.
                            </p>
                        </div>

                        <div className=" border rounded-xl p-8 hover:shadow-md transition">
                            <h3 className="font-semibold text-lg mb-2">
                                Fast Delivery
                            </h3>
                            <p className=" text-sm">
                                Our logistics network ensures fast and secure delivery for
                                customers worldwide.
                            </p>
                        </div>

                        <div className=" border rounded-xl p-8 hover:shadow-md transition">
                            <h3 className="font-semibold text-lg mb-2">
                                24/7 Support
                            </h3>
                            <p className=" text-sm">
                                Our support team is available anytime to assist with orders,
                                questions, and concerns.
                            </p>
                        </div>

                    </div>

                </section>


                {/* CTA SECTION */}
                <section className="rounded-2xl text-center py-16 px-8">

                    <h2 className="text-3xl font-bold">
                        Join Thousands of Happy Customers
                    </h2>

                    <p className=" mt-4 max-w-2xl mx-auto">
                        Discover high-quality products and an exceptional shopping
                        experience designed for modern customers.
                    </p>

                    <Button
                        asChild
                        size="sm"
                        className="mt-3"
                    >
                        <Link to="/shop">Shop Now</Link>
                    </Button>
                </section>

            </div >
        </div >
    );
};

export default AboutPage;