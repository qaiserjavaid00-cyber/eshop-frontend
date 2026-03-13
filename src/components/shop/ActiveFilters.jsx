import React from "react";

const ActiveFilters = ({
    selectedCategories = [],
    selectedSubCategories = [],
    selectedColors = [],
    selectedSizes = [],
    selectedBrands = [],
    selectedTags = [],
    selectedSpecifications = {},
    priceRange = [0, 0],
    categories = [],
    subCategories = [],
    onRemoveFilter,
}) => {
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {/* Categories */}
            {selectedCategories.map((catId) => {
                const cat = categories.find((c) => c._id === catId);
                if (!cat) return null;
                return (
                    <span
                        key={catId}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full cursor-pointer flex items-center gap-1"
                        onClick={() => onRemoveFilter("category", catId)}
                    >
                        {cat.name} ✕
                    </span>
                );
            })}

            {/* SubCategories */}
            {selectedSubCategories.map((subId) => {
                const sub = subCategories.find((s) => s._id === subId);
                if (!sub) return null;
                return (
                    <span
                        key={subId}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full cursor-pointer flex items-center gap-1"
                        onClick={() => onRemoveFilter("subCategory", subId)}
                    >
                        {sub.name} ✕
                    </span>
                );
            })}

            {/* Colors */}
            {selectedColors.map((color) => (
                <span
                    key={color}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full cursor-pointer flex items-center gap-1"
                    onClick={() => onRemoveFilter("color", color)}
                >
                    {color} ✕
                </span>
            ))}

            {/* Sizes */}
            {selectedSizes.map((size) => (
                <span
                    key={size}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full cursor-pointer flex items-center gap-1"
                    onClick={() => onRemoveFilter("size", size)}
                >
                    {size} ✕
                </span>
            ))}

            {/* Brands */}
            {selectedBrands.map((brand) => (
                <span
                    key={brand}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full cursor-pointer flex items-center gap-1"
                    onClick={() => onRemoveFilter("brand", brand)}
                >
                    {brand} ✕
                </span>
            ))}

            {/* Tags */}
            {selectedTags.map((tag) => (
                <span
                    key={tag}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full cursor-pointer flex items-center gap-1"
                    onClick={() => onRemoveFilter("tags", tag)}
                >
                    {tag} ✕
                </span>
            ))}

            {/* Price */}
            {priceRange && (
                <span
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full cursor-pointer flex items-center gap-1"
                    onClick={() => onRemoveFilter("price")}
                >
                    ${priceRange[0]} - ${priceRange[1]} ✕
                </span>
            )}

            {/* Specifications */}
            {Object.entries(selectedSpecifications).map(([specKey, values]) =>
                values.map((value) => (
                    <span
                        key={`${specKey}-${value}`}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full cursor-pointer flex items-center gap-1"
                        onClick={() =>
                            onRemoveFilter("specifications", {
                                specKey,
                                specValue: value,
                            })
                        }
                    >
                        {value} ✕
                    </span>
                ))
            )}
        </div>
    );
};

export default ActiveFilters;