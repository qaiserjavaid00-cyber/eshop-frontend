// import React, { useState } from "react";
// import { useCategories } from "@/hooks/categories/useCategories";
// import { useSubcategories } from "@/hooks/categories/useSubCategories";

// export const CategorySelector = ({ register, setValue }) => {
//     const [parentId, setParentId] = useState("");

//     const { categories, isLoading: catsLoading } = useCategories();
//     const { subcategories, isLoading: subLoading } = useSubcategories(parentId);

//     const handleCategoryChange = (e) => {
//         const selected = e.target.value;
//         setParentId(selected);
//         setValue("category", selected);
//         setValue("sub", "");
//     };

//     return (
//         <div className="space-y-2">
//             {catsLoading ? (
//                 <p>Loading categories...</p>
//             ) : (
//                 <select
//                     {...register("category")}
//                     onChange={handleCategoryChange}
//                     className="border p-2 w-full"
//                 >
//                     <option value="">Select Category</option>
//                     {categories.map((c) => (
//                         <option key={c._id} value={c._id}>
//                             {c.name}
//                         </option>
//                     ))}
//                 </select>
//             )}

//             {parentId && (subLoading ? (
//                 <p>Loading subcategories...</p>
//             ) : subcategories.length > 0 ? (
//                 <select {...register("sub")} className="border p-2 w-full">
//                     <option value="">Select Subcategory</option>
//                     {subcategories.map((s) => (
//                         <option key={s._id} value={s._id}>
//                             {s.name}
//                         </option>
//                     ))}
//                 </select>
//             ) : null)}
//         </div>
//     );
// };


import React, { useState, useEffect } from "react";
import { useCategories } from "@/hooks/categories/useCategories";
import { useSubcategories } from "@/hooks/categories/useSubCategories";

export const CategorySelector = ({ register, setValue, initialCategory }) => {
    const [parentId, setParentId] = useState(initialCategory || "");

    const { categories, isLoading: catsLoading } = useCategories();
    const { subcategories, isLoading: subLoading } = useSubcategories(parentId);

    useEffect(() => {
        if (initialCategory) {
            setParentId(initialCategory);
        }
    }, [initialCategory]);

    const handleCategoryChange = (e) => {
        const selected = e.target.value;
        setParentId(selected);
        setValue("category", selected);
        setValue("sub", "");
    };

    return (
        <div className="space-y-2">
            {catsLoading ? (
                <p>Loading categories...</p>
            ) : (
                <select
                    {...register("category")}
                    value={parentId}
                    onChange={handleCategoryChange}
                    className="border p-2 w-full"
                >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            )}

            {parentId && (
                subLoading ? (
                    <p>Loading subcategories...</p>
                ) : subcategories.length > 0 && (
                    <select {...register("sub")} className="border p-2 w-full">
                        <option value="">Select Subcategory</option>
                        {subcategories.map((s) => (
                            <option key={s._id} value={s._id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                )
            )}
        </div>
    );
};