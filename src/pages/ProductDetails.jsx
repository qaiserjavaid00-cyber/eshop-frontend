
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProductBySlugAPI, getVariantsByProductIdAPI, rateProductAPI } from '../Api/productApi';
import { StarRatingModal } from '../components/StarRatingModal';
import Slider from "react-slick";
import { toast } from 'react-toastify';
import { addToWishlistAPI } from '../Api/userApi';
import { Button } from '@/components/ui/button';
import { ProductTabs } from '@/components/product/ProductTabs';
import { addToCart, setBuyNowItem } from '@/redux/cartSlice';
import { useDispatch } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import { ProductDetailsSkeleton } from '@/components/product/skeletons/ProductDetailsSkeleton';

export const ProductDetails = () => {
    const [searchParams] = useSearchParams();
    const variantIdFromUrl = searchParams.get("variant");
    const navigate = useNavigate();
    const { slug } = useParams();
    const [isModalOpen, setModalOpen] = useState(false);
    const slider1 = useRef(null);
    const slider2 = useRef(null);
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    // 1️⃣ Fetch product
    const { data: product, isLoading: isProductLoading } = useQuery({
        queryKey: ['product', slug],
        queryFn: () => getProductBySlugAPI(slug),
        enabled: !!slug
    });

    // 2️⃣ Fetch variants separately
    const { data: variants = [], isLoading: isVariantsLoading } = useQuery({
        queryKey: ['variants', product?._id],
        queryFn: () => product ? getVariantsByProductIdAPI(product._id) : [],
        enabled: !!product?._id
    });
    console.log("Prodiuct ==", product)
    console.log("Variants ==", variants)
    const hasVariants = product?.hasVariant && variants?.length > 0;

    let selectedVariant;

    // Sizes & colors
    const sizes = [...new Set(variants.map(v => v.size))];
    const colors = variants.filter(v => v.size === selectedSize).map(v => v.color);

    // Selected variant
    selectedVariant = variants.find(
        v => v.size === selectedSize && v.color === selectedColor
    );

    ///decide price

    let priceDisplay;

    if (!hasVariants) {
        priceDisplay = product?.basePrice; //// product without variant base price
    } else if (selectedVariant) {
        priceDisplay = selectedVariant?.finalPrice; ///product with variant price
    } else {
        const prices = variants?.map(v => v.finalPrice);
        priceDisplay = `${Math.min(...prices)} – ${Math.max(...prices)}`; ///varaints range price
    }


    useEffect(() => {
        if (!variantIdFromUrl || variants.length === 0) return;

        const variantFromUrl = variants.find(
            v => v._id === variantIdFromUrl
        );

        if (!variantFromUrl) {
            // Invalid variant → clean URL
            navigate(`/${slug}`, { replace: true });
            return;
        }

        // Only set if not already selected
        if (
            selectedSize !== variantFromUrl.size ||
            selectedColor !== variantFromUrl.color
        ) {
            setSelectedSize(variantFromUrl.size);
            setSelectedColor(variantFromUrl.color);
        }

        // Optional: Clean URL after selection (recommended)
        navigate(`/${slug}`, { replace: true });

    }, [variantIdFromUrl, variants, navigate, slug, selectedColor, selectedSize]);
    // 🔹 Determine current stock
    let currentStock = 0;

    if (!hasVariants) {
        currentStock = product?.stock || 0;
    } else if (selectedVariant) {
        currentStock = selectedVariant?.quantity || 0;
    } else {
        currentStock = 0; // no variant selected yet
    }

    const isOutOfStock = currentStock <= 0;


    // Auto-select color when size changes
    const autoSelectColorForSize = (size) => {
        const variantsForSize = variants.filter(v => v.size === size);
        const inStockVariant = variantsForSize.find(v => v.quantity > 0);
        if (inStockVariant) setSelectedColor(inStockVariant.color);
        else if (variantsForSize.length > 0) setSelectedColor(variantsForSize[0].color);
    };

    // Min/Max prices for display
    const minPrice = variants.length ? Math.min(...variants.map(v => v.finalPrice)) : 0;
    const maxPrice = variants.length ? Math.max(...variants.map(v => v.finalPrice)) : 0;

    // Images: variant images if selected, otherwise product images
    const displayImages = selectedVariant?.images?.length > 0 ? selectedVariant.images : product?.images || [];
    const hasMultipleImages = displayImages.length > 1;

    // ⭐ Star rating mutation
    const { mutate: rateProduct } = useMutation({
        mutationFn: rateProductAPI,
        onSuccess: () => {
            toast.success("Thank you for rating!");
            queryClient.invalidateQueries(['product', slug]);
        },
        onError: (err) => toast.error(err?.response?.data?.message || "Rating failed"),
    });

    // ❤️ Wishlist mutation
    const { mutate: addToWishlist } = useMutation({
        mutationFn: addToWishlistAPI,
        onSuccess: () => toast.success("Added to wishlist"),
        onError: (err) => toast.error(err?.response?.data?.message || "Failed to add to wishlist"),
    });

    const handleWishlist = (id) => {
        addToWishlist(id);
        navigate("/user/wishlist");
        // return <Navigate to="/user/wishlist" />
    };

    const handleBuyNow = async () => {


        if (hasVariants && !selectedVariant) {
            toast.error("Please select size and color");
            return;
        }

        dispatch(setBuyNowItem(
            hasVariants
                ? {
                    productId: product._id,
                    variantId: selectedVariant._id,
                    title: product.title,
                    size: selectedVariant.size,
                    color: selectedVariant.color,
                    price: selectedVariant.finalPrice,
                    image: selectedVariant.images?.[0] || product.images?.[0],
                    quantity: 1
                }
                : {
                    productId: product._id,
                    title: product.title,
                    price: product.basePrice,
                    image: product.images?.[0],
                    quantity: 1
                }
        ));

        navigate("/checkout");


    };

    const handleAddToCart = () => {
        if (hasVariants && !selectedVariant) {
            toast.error("Please select size and color");
            return;
        }

        dispatch(
            addToCart(
                hasVariants
                    ? {
                        productId: product._id,
                        _id: selectedVariant._id,
                        title: product.title,
                        slug: product.slug,
                        size: selectedVariant.size,
                        color: selectedVariant.color,
                        price: selectedVariant.finalPrice,
                        image: selectedVariant.images?.[0] || product.images?.[0],
                        qty: 1,
                        countInStock: selectedVariant.quantity,
                    }
                    : {
                        _id: product._id,
                        productId: product._id,
                        title: product.title,
                        slug: product.slug,
                        price: product.basePrice,
                        image: product.images?.[0],
                        qty: 1,
                        countInStock: product.stock,
                    }
            )
        );

        toast.success("Added to cart");
    };


    if (isProductLoading || isVariantsLoading) {
        return <div className="">
            <ProductDetailsSkeleton />
            {/* <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div> */}
        </div>;
    }

    return (
        <>
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row border border-gray-100 p-4 gap-6">

                {/* Image Slider */}
                <div className="w-full lg:w-1/2 px-2">
                    <Slider
                        asNavFor={nav2}
                        ref={(slider) => { slider1.current = slider; setNav1(slider); }}
                        slidesToShow={1}
                        slidesToScroll={1}
                        infinite={hasMultipleImages}
                        fade={hasMultipleImages}
                        arrows
                    >
                        {displayImages.map((img, index) => (
                            <div key={index} className="w-full h-[420px] md:h-[520px] flex items-center justify-center bg-gray-50 rounded-xl">
                                <img src={img} alt={`product-${index}`} className="w-full h-full object-cover rounded-xl" />
                            </div>
                        ))}
                    </Slider>

                    {hasMultipleImages && (
                        <Slider
                            asNavFor={nav1}
                            ref={(slider) => { slider2.current = slider; setNav2(slider); }}
                            slidesToShow={Math.min(displayImages.length, 5)}
                            swipeToSlide
                            focusOnSelect
                            arrows={false}
                            centerMode={displayImages.length > 3}
                            className="mt-4"
                        >
                            {displayImages.map((img, index) => (
                                <div key={index} className="px-1 cursor-pointer">
                                    <img src={img} alt={`thumb-${index}`} className="flex h-16 w-16 object-cover rounded-md border border-gray-300" />
                                </div>
                            ))}
                        </Slider>
                    )}
                </div>

                {/* Product Info */}
                <div className="w-full lg:w-1/2 px-2">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">{product?.title}</h2>

                    <div className="flex items-center gap-2 text-yellow-500 mb-4">
                        ⭐ {product.averageRating || "No ratings"}
                        <span className="text-gray-500 text-sm">({product.ratings.length})</span>
                    </div>

                    {/* Price */}
                    {hasVariants ? (
                        <div className="mb-4">
                            {selectedVariant ? (
                                <>
                                    {selectedVariant.finalPrice !== selectedVariant.price && (
                                        <p className="text-gray-400 line-through text-sm">${selectedVariant.price}</p>
                                    )}
                                    <p className="text-3xl font-bold text-orange-500">${selectedVariant.finalPrice}</p>

                                    {selectedVariant.isFlashDeal && <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded">FLASH DEAL</span>}
                                    {!selectedVariant.isFlashDeal && selectedVariant.isOnSale && <span className="inline-block bg-green-600 text-white text-xs px-2 py-1 rounded">ON SALE</span>}
                                </>
                            ) : (
                                <p className="text-3xl font-bold text-orange-500">
                                    ${minPrice === maxPrice ? minPrice : `${minPrice} – ${maxPrice}`}
                                </p>
                            )}
                        </div>) : <p className="text-3xl font-bold text-orange-500">
                        ${priceDisplay}
                    </p>
                    }


                    {/* Size */}
                    {hasVariants &&
                        <div className="mb-2">
                            <p className="font-semibold underline">Size</p>
                            <div className="flex gap-2 flex-wrap">
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        onClick={() => { setSelectedSize(size); autoSelectColorForSize(size); }}
                                        className={`px-2 py-1 border rounded text-xs ${selectedSize === size ? "bg-gray-100 border-gray-400" : "border-gray-100"}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>}

                    {/* Color */}
                    {selectedSize && (
                        <div className="mb-2">
                            <p className="font-semibold underline">Color</p>
                            <div className="flex gap-2 flex-wrap">
                                {colors.map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`px-2 py-1 border rounded text-xs ${selectedColor === color ? "bg-gray-100 border-gray-400" : "border-gray-100"}`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <p className="text-sm text-gray-600">
                        {!hasVariants
                            ? product.stock > 0
                                ? `${product.stock} in stock`
                                : "Out of stock"
                            : selectedVariant
                                ? selectedVariant.quantity > 0
                                    ? `${selectedVariant.quantity} in stock`
                                    : "Out of stock"
                                : "Select size & color"}
                    </p>

                    {/* selected variant info  */}
                    {hasVariants && selectedVariant && (
                        <div className="mb-3 p-3 border rounded bg-gray-50 text-sm">
                            <p className="font-semibold mb-1">Selected Variant</p>
                            <p>Size: <strong>{selectedVariant.size}</strong></p>
                            <p>Color: <strong>{selectedVariant.color}</strong></p>
                            <p>Price: <strong>${selectedVariant.finalPrice}</strong></p>
                        </div>
                    )}
                    <div className="mt-4 flex gap-2">
                        {/*  <Button onClick={handleBuyNow} size="sm" className="bg-orange-500 hover:bg-orange-500/90 duration-300 text-white">Buy Now</Button>
                        <Button onClick={handleAddToCart} size="sm">Add to Cart</Button>
                        <button onClick={() => handleWishlist(product._id)} className="p-1 text-white rounded-full">❤️</button>*/}
                        <div className="mt-4 flex gap-2">
                            <Button
                                onClick={handleBuyNow}
                                size="sm"
                                disabled={isOutOfStock}
                                className={`duration-300 text-white ${isOutOfStock
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-orange-500 hover:bg-orange-500/90"
                                    }`}
                            >
                                {isOutOfStock ? "Out of Stock" : "Buy Now"}
                            </Button>

                            <Button
                                onClick={handleAddToCart}
                                size="sm"
                                disabled={isOutOfStock}
                                className={isOutOfStock ? "bg-gray-400 cursor-not-allowed" : ""}
                            >
                                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                            </Button>

                            <button
                                onClick={() => handleWishlist(product._id)}
                                className="p-1 text-white rounded-full"
                            >
                                ❤️
                            </button>
                        </div>
                    </div>

                    {/* Rating stars */}
                    <div className="flex items-center gap-1 mt-2 text-yellow-500">
                        {[1, 2, 3, 4, 5].map(star => (
                            <button
                                key={star}
                                onClick={() => rateProduct({ productId: product._id, star })}
                                className={`text-xl hover:scale-110 transition-transform ${star <= Math.round(product?.averageRating) ? 'text-yellow-500' : 'text-gray-400'}`}
                                title={`Rate ${star} star${star > 1 ? 's' : ''}`}
                            >★</button>
                        ))}
                        <span className="ml-1 text-gray-600 text-sm">({product?.ratings?.length} reviews)</span>
                    </div>
                </div>
            </div>

            <ProductTabs product={product} selectedVariant={selectedVariant} />
            <StarRatingModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} productId={product?._id} />
        </>
    );
};
