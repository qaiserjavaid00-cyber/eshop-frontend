import { useState, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";

const CategoryFilter = ({
    categories = [],
    subCategories = [],
    selectedCategories = [],
    selectedSubCategories = [],
    handleCheckboxChange,
}) => {
    const [showCats, setShowCats] = useState(true);
    const [expandedCategories, setExpandedCategories] = useState({});
    console.log("CATEGORIES:", categories);
    console.log("SUBCATEGORIES:", subCategories);
    const toggleCategory = (catId) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [catId]: !prev[catId],
        }));
    };

    // Optional: auto expand selected categories
    useEffect(() => {
        const autoExpand = {};
        selectedCategories.forEach((id) => {
            autoExpand[id] = true;
        });
        setExpandedCategories((prev) => ({ ...prev, ...autoExpand }));
    }, [selectedCategories]);

    return (
        <div>
            <div
                onClick={() => setShowCats(!showCats)}
                className="cursor-pointer font-bold py-3 flex justify-between"
            >
                Categories <BsChevronDown />
            </div>

            {showCats &&
                categories.map((cat) => {
                    const isCategorySelected = selectedCategories.includes(cat._id);
                    const isExpanded = expandedCategories[cat._id];

                    const relatedSubs = subCategories.filter(
                        (sub) => String(sub.parent?._id || sub.parent) === String(cat._id)

                    );

                    return (
                        <div key={cat._id} className="mb-2">
                            {/* Category Row */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={isCategorySelected}
                                        onChange={() =>
                                            handleCheckboxChange("category", cat._id)
                                        }
                                    />
                                    <span className="ml-2 font-medium">{cat.name}</span>
                                </label>

                                {relatedSubs.length > 0 && (
                                    <button
                                        onClick={() => toggleCategory(cat._id)}
                                        className="text-sm font-bold px-2"
                                        type="button"
                                    >
                                        {isExpanded ? "-" : "+"}
                                    </button>
                                )}
                            </div>

                            {/* Subcategories */}
                            {isExpanded && relatedSubs.length > 0 && (
                                <div className="ml-6 mt-2 flex flex-col gap-1">
                                    {relatedSubs.map((sub) => {
                                        const isSubSelected =
                                            selectedSubCategories.includes(sub._id);

                                        return (
                                            <label
                                                key={sub._id}
                                                className="flex items-center text-sm"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isSubSelected}
                                                    onChange={() =>
                                                        handleCheckboxChange(
                                                            "subCategory",
                                                            sub._id
                                                        )
                                                    }
                                                />
                                                <span className="ml-2">{sub.name}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
        </div>
    );
};

export default CategoryFilter;