import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

export const ProductTabs = ({ product, selectedVariant }) => {

    console.log("product from tab", product)
    console.log("variant from tab", selectedVariant)

    // 🔁 Variant specs override product specs
    const specifications = selectedVariant?.specifications?.length > 0 ? selectedVariant.specifications : [];
    const productSpecifications = product?.specifications
    const soldProduct = selectedVariant ? selectedVariant?.sold : product?.sold
    return (
        <div className="mt-10 max-w-6xl mx-auto p-5">
            <Tabs defaultValue="description" className="w-full">
                {/* Tabs Header */}
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="additional">Additional Info</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                {/* 📄 Description */}
                <TabsContent value="description" className="mt-4">
                    <div className=" leading-relaxed">
                        {product?.description || "No description available."}
                    </div>
                </TabsContent>

                {/* 📦 Additional Info */}
                <TabsContent value="additional" className="mt-4 space-y-6">

                    {/* BASIC INFO */}
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-700">
                        <p><strong>Brand:</strong>
                            <Link
                                to={`/shop?brand=${product.brand}`}
                                className="text-blue-600 hover:underline"
                            >{product?.brand || "N/A"}</Link>
                        </p>
                        <p><strong>Category:</strong>
                            <Link
                                to={`/shop?category=${product?.category?._id}`}
                                className="text-blue-600 hover:underline"
                            >{product?.category?.name || "N/A"}</Link>
                        </p>
                        <p><strong>Sold:</strong> {soldProduct || 0}</p>
                        {/* <p><strong>Shipping:</strong> {product?.shipping || "N/A"}</p> */}

                    </div>

                    {/* 🧾 SPECIFICATIONS TABLE */}
                    <div>
                        <div>
                            <h3 className="text-lg font-semibold mb-3 border-b pb-1">
                                Specifications
                            </h3>

                            {productSpecifications.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full border border-gray-500 text-sm">
                                        <tbody>
                                            {productSpecifications.map((spec, index) => (
                                                <tr
                                                    key={index}
                                                    className={index % 2 === 0 ? "" : ""}
                                                >
                                                    <td className="w-1/3 px-4 py-2 font-medium border border-gray-500">
                                                        {spec.key}
                                                    </td>
                                                    <td className="px-4 py-2 border border-gray-500 ">
                                                        {spec.value}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-500 text-sm">
                                    No specifications available.
                                </p>
                            )}
                        </div>
                        {specifications.length > 0 && (
                            <div className="overflow-x-auto">
                                <table className="w-full border border-gray-500 text-sm">
                                    <tbody>
                                        {specifications.map((spec, index) => (
                                            <tr
                                                key={index}
                                                className={index % 2 === 0 ? "" : ""}
                                            >
                                                <td className="w-1/3 px-4 py-2 font-medium border border-gray-500">
                                                    {spec.key}
                                                </td>
                                                <td className="px-4 py-2 border border-gray-500">
                                                    {spec.value}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </TabsContent>

                {/* ⭐ Reviews */}
                <TabsContent value="reviews" className="mt-4">
                    {product?.ratings?.length > 0 ? (
                        <div className="space-y-4">
                            {product.ratings.map((r, i) => (
                                <div
                                    key={i}
                                    className="border rounded-lg p-3 shadow-sm"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-yellow-500">
                                            {"★".repeat(r.star)}
                                        </span>
                                        <span className="text-gray-500 text-sm">
                                            by {r.postedBy?.name || "User"}
                                        </span>
                                    </div>
                                    {r.comment && (
                                        <p className="text-gray-700 mt-1">{r.comment}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No reviews yet.</p>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
};
