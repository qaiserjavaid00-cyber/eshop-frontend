
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'rc-slider/assets/index.css';
import { useDispatch } from "react-redux";
import { addToCart } from '../redux/cartSlice';
import { CartDrawer } from '../components/CartDrawer';
import { CopyCoupon } from '../components/CopyCoupon';

import { useProducts } from '@/hooks/products/useProducts';
import { useProductFilters } from '@/hooks/products/useFilters';
import ProductCard from '@/components/product/ProductCard';
import { ShopPagination } from '@/components/shop/ShopPagination';
import { useResetPage } from '@/hooks/url/useResetPage';
import Banner from '@/components/shop/Banner';
import { ShopSkeleton } from '@/components/product/skeletons/ShopSkeleton';
import CategoryFilter from '@/components/shop/CategoriesFilter';
import SizeFilter from '@/components/shop/SizeFilter';
import PriceFilter from '@/components/shop/PriceFilter';
import ColorFilter from '@/components/shop/ColorFilter';
import ActiveFilters from '@/components/shop/ActiveFilters';
import TagsFilter from '@/components/shop/TagsFilter';
import SpecFilter from '@/components/shop/SpecsFilter';


export const Shop = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const resetPageAndNavigate = useResetPage();

    const params = new URLSearchParams(location.search);

    useEffect(() => {
        // Scroll to top whenever query params change
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.search]);

    const searchQuery = params.get('search') || '';
    const selectedColors = params.getAll('color');
    const selectedSizes = params.getAll('size');
    const selectedTags = params.getAll('tags');
    const selectedCategories = params.getAll('category');
    const selectedSubCategories = params.getAll('subCategory');
    const minPrice = params.get('minPrice');
    const maxPrice = params.get('maxPrice');
    const sort = params.get('sort');

    const [drawerOpen, setDrawerOpen] = useState(false);

    /* ---------------- FILTER DATA (React Query) ---------------- */
    const { data: filterData, isLoading: filtersLoading, isError: filtersError, } = useProductFilters();
    const { colors = [], sizes = [], categories = [], subCategories = [], tags = [], priceRange = { minPrice: 0, maxPrice: 0 }, } = filterData || {};

    /////specifications from URL
    const selectedSpecifications = (() => {
        const specParam = params.get("specifications");
        if (!specParam) return {};

        try {
            return JSON.parse(specParam);
        } catch {
            return {};
        }
    })();


    /* ---------------- PRICE RANGE ---------------- */
    const [priceRangeState, setPriceRangeState] = useState([
        parseInt(minPrice) || priceRange.minPrice,
        parseInt(maxPrice) || priceRange.maxPrice,
    ]);


    useEffect(() => {
        setPriceRangeState([
            parseInt(minPrice) || priceRange.minPrice,
            parseInt(maxPrice) || priceRange.maxPrice,
        ]);
    }, [priceRange.minPrice, priceRange.maxPrice, minPrice, maxPrice]);

    /* ---------------- PRODUCTS ---------------- */
    const {
        products,
        isLoading,
        isError,
        // error,
        pages,
        currentPage,
        setPage,
        pageCount,
    } = useProducts({
        search: searchQuery,
        color: selectedColors,
        size: selectedSizes,
        category: selectedCategories,
        subCategory: selectedSubCategories,
        tags: selectedTags,
        specifications: selectedSpecifications,
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        sort,
    });


    /* ---------------- HANDLERS ---------------- */
    const handleCheckboxChange = (key, value) => {
        const updatedParams = new URLSearchParams(location.search);

        const existingValues = updatedParams.getAll(key);
        if (existingValues.includes(value)) {
            // REMOVE
            updatedParams.delete(key);
            existingValues
                .filter(v => v !== value)
                .forEach(v => updatedParams.append(key, v));


            // 🔥 If unchecking a category → remove all its subCategories
            if (key === "category") {
                const relatedSubs = subCategories
                    .filter(sub => String(sub.parent?._id || sub.parent) === String(value))
                    .map(sub => sub._id);

                relatedSubs.forEach(subId => {
                    const currentSubs = updatedParams.getAll("subCategory");
                    if (currentSubs.includes(subId)) {
                        updatedParams.delete("subCategory");
                        currentSubs
                            .filter(v => v !== subId)
                            .forEach(v => updatedParams.append("subCategory", v));
                    }
                });
            }

        } else {
            // ADD
            updatedParams.append(key, value);

            // 🔥 If selecting a subCategory → auto add parent category
            if (key === "subCategory") {
                const sub = subCategories.find(s => s._id === value);

                if (sub?.parent) {
                    const parentId = sub.parent._id || sub.parent;
                    const selectedCategories = updatedParams.getAll("category");

                    if (!selectedCategories.includes(parentId)) {
                        updatedParams.append("category", parentId);
                    }
                }
            }
        }

        if (key === "tags") {
            const updatedParams = new URLSearchParams(location.search);
            const existingValues = updatedParams.getAll("tags");

            if (existingValues.includes(value)) {
                updatedParams.delete("tags");
                existingValues.filter(v => v !== value).forEach(v => updatedParams.append("tags", v));
            } else {
                updatedParams.append("tags", value);
            }
            resetPageAndNavigate(updatedParams);
        }
        resetPageAndNavigate(updatedParams);
    };

    const handleSpecChange = (key, value) => {
        const updatedParams = new URLSearchParams(location.search);

        let currentSpecs = {};

        try {
            currentSpecs = JSON.parse(updatedParams.get("specifications")) || {};
        } catch {
            currentSpecs = {};
        }

        if (!currentSpecs[key]) {
            currentSpecs[key] = [];
        }

        if (currentSpecs[key].includes(value)) {
            // remove value
            currentSpecs[key] = currentSpecs[key].filter(v => v !== value);

            if (currentSpecs[key].length === 0) {
                delete currentSpecs[key];
            }
        } else {
            currentSpecs[key].push(value);
        }

        if (Object.keys(currentSpecs).length === 0) {
            updatedParams.delete("specifications");
        } else {
            updatedParams.set("specifications", JSON.stringify(currentSpecs));
        }

        resetPageAndNavigate(updatedParams);
    };

    const handlePriceCommit = () => {
        const updatedParams = new URLSearchParams(location.search);
        updatedParams.set('minPrice', priceRangeState[0]);
        updatedParams.set('maxPrice', priceRangeState[1]);
        resetPageAndNavigate(updatedParams);
    };

    const handleAdd = (product) => {
        dispatch(addToCart({ ...product, qty: 1 }));
        setDrawerOpen(true);
    };

    /* ---------------- LOADING STATES ---------------- */
    if (isLoading || filtersLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ShopSkeleton />
            </div>
        );
    }

    if (isError || filtersError) {
        return <div>Error loading shop data</div>;
    }

    /* ---------------- RENDER ---------------- */
    return (
        <>
            <Banner title="shop" />

            <div className="max-w-6xl mx-auto">
                <div className="flex">
                    {/* FILTERS */}
                    <div className="w-1/4 p-6 flex flex-col gap-3 border shadow-lg rounded-lg">
                        <h1 className="font-bold text-2xl">Filters</h1>
                        <ActiveFilters
                            selectedCategories={selectedCategories}
                            selectedSubCategories={selectedSubCategories}
                            selectedColors={selectedColors}
                            selectedSizes={selectedSizes}
                            priceRange={minPrice || maxPrice // only pass the range if user applied it
                                ? [Number(minPrice) || priceRange.minPrice, Number(maxPrice) || priceRange.maxPrice]
                                : null}
                            categories={categories}
                            subCategories={subCategories}
                            onRemoveFilter={(key, value) => {
                                const updatedParams = new URLSearchParams(location.search);

                                if (key === "price") {
                                    updatedParams.delete("minPrice");
                                    updatedParams.delete("maxPrice");
                                } else {
                                    const existing = updatedParams.getAll(key);
                                    updatedParams.delete(key);
                                    existing.filter(v => v !== value).forEach(v => updatedParams.append(key, v));
                                }

                                resetPageAndNavigate(updatedParams);
                            }}
                        />

                        {/* Categories Filter */}

                        <CategoryFilter
                            categories={categories}
                            subCategories={subCategories}
                            selectedCategories={selectedCategories}
                            selectedSubCategories={selectedSubCategories}
                            handleCheckboxChange={handleCheckboxChange}
                        />

                        {/* Price */}
                        <PriceFilter
                            minPrice={priceRange.minPrice}
                            maxPrice={priceRange.maxPrice}
                            selectedRange={priceRangeState}
                            onChange={{
                                setRange: setPriceRangeState,
                                commit: handlePriceCommit
                            }}
                        />
                        {/* Colors */}
                        <ColorFilter
                            colors={colors}
                            selectedColors={selectedColors}
                            onChange={handleCheckboxChange}
                        />
                        {/* Sizes */}
                        <SizeFilter
                            sizes={sizes}
                            selectedSizes={selectedSizes}
                            onChange={handleCheckboxChange}
                        />

                        <TagsFilter
                            tags={tags}
                            selectedTags={params.getAll('tags')}
                            handleCheckboxChange={handleCheckboxChange}
                        />
                        <SpecFilter
                            specifications={filterData?.specifications || {}}
                            selectedSpecs={selectedSpecifications}
                            onChange={handleSpecChange}
                        />
                        <CopyCoupon />
                    </div>

                    {/* PRODUCTS */}
                    <div className="w-3/4 ml-3">
                        <div className="mb-4 flex justify-between items-center">
                            <select
                                value={sort || ''}
                                onChange={(e) => {
                                    const updatedParams = new URLSearchParams(location.search);
                                    updatedParams.set('sort', e.target.value);
                                    resetPageAndNavigate(updatedParams);
                                }}
                                className="p-2 border rounded text-xs"
                            >
                                <option value="">New Arrivals</option>
                                <option value="pricelh">Price: Low to High</option>
                                <option value="pricehl">Price: High to Low</option>
                                <option value="bestSeller">Best Sellers</option>
                            </select>

                            {pageCount > 1 && (
                                <ShopPagination
                                    pages={pages}
                                    currentPage={currentPage}
                                    setPage={(p) => {
                                        setPage(p);
                                        const updatedParams = new URLSearchParams(location.search);
                                        updatedParams.set('page', p);
                                        navigate({ search: updatedParams.toString() });
                                    }}
                                    size="sm"
                                />
                            )}
                        </div>

                        {products.length === 0 ? (
                            <div className="flex flex-col items-center h-96 justify-center">
                                <h2 className="text-xl text-gray-600">No products found</h2>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                {products.map(product => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        onAdd={handleAdd}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
        </>
    );
};

