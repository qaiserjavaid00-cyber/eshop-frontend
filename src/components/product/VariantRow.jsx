// import React, { useEffect } from "react";
// import { useFieldArray } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { ArrowDown, Cloud, X } from "lucide-react";
// import { TagInput } from "./TagInput";

// const VariantRow = ({
//     index,
//     control,
//     register,
//     watch,
//     remove,
//     variantImagesPreview,
//     setVariantImagesPreview,
//     setValue,
// }) => {
//     const { fields: specs, append, remove: removeSpec } = useFieldArray({
//         control,
//         name: `variants.${index}.specifications`,
//     });

//     const isFlash = watch(`variants.${index}.isFlashDeal`);
//     const isSale = watch(`variants.${index}.isOnSale`);

//     useEffect(() => {
//         register(`variants.${index}.tags`);
//     }, [register, index]);
//     useEffect(() => {
//         register(`variants.${index}.specifications`);
//     }, [register, index]);

//     const handleVariantImagesChange = (e) => {
//         const files = Array.from(e.target.files);

//         setVariantImagesPreview((prev) => {
//             const updated = { ...prev, [index]: [...(prev[index] || []), ...files] };
//             setValue(`variants.${index}.images`, updated[index], { shouldValidate: true });
//             return updated;
//         });
//         setValue(`variants.${index}.images`, [...(variantImagesPreview[index] || []), ...files], { shouldValidate: true });
//     };


//     const removeVariantImage = (imgIdx) => {
//         const newFiles = variantImagesPreview[index].filter((_, i) => i !== imgIdx);
//         setVariantImagesPreview((prev) => ({ ...prev, [index]: newFiles }));
//         setValue(`variants.${index}.images`, newFiles, { shouldValidate: true }); // ✅ sync with RHF
//     };


//     return (
//         <div className="border p-4 rounded space-y-3">
//             <div className="flex gap-2">
//                 <input {...register(`variants.${index}.size`)} placeholder="Size" className="border p-2 w-full" />
//                 <input {...register(`variants.${index}.color`)} placeholder="Color" className="border p-2 w-full" />
//                 <input type="number" {...register(`variants.${index}.price`)} placeholder="Price" className="border p-2 w-full" />
//                 <input type="number" {...register(`variants.${index}.quantity`)} placeholder="Quantity" className="border p-2 w-full" />
//             </div>
//             {/* <input {...register(`variants.${index}.tags`)} placeholder="Tags (comma separated)" className="border p-2 w-full" /> */}
//             <TagInput
//                 tags={watch(`variants.${index}.tags`) || []}
//                 setTags={(newTags) => {
//                     setValue(`variants.${index}.tags`, newTags, {
//                         shouldDirty: true,
//                         shouldValidate: true,
//                     });
//                 }}

//                 placeholder="Variant tags (press Enter)"
//             />


//             <label className="flex items-center gap-2">
//                 <input type="checkbox" {...register(`variants.${index}.isFlashDeal`)} /> Flash Deal
//             </label>

//             <label className="flex items-center gap-2">
//                 <input type="checkbox" {...register(`variants.${index}.isOnSale`)} /> On Sale
//             </label>

//             {isFlash && (
//                 <>
//                     <input type="number" {...register(`variants.${index}.salePrice`)} placeholder="Flash Price" className="border p-2 w-full" />
//                     <input type="datetime-local" {...register(`variants.${index}.saleStart`)} className="border p-2 w-full" />
//                     <input type="datetime-local" {...register(`variants.${index}.saleEnd`)} className="border p-2 w-full" />
//                 </>
//             )}

//             {isSale && !isFlash && (
//                 <input type="number" {...register(`variants.${index}.regularSalePrice`)} placeholder="Sale Price" className="border p-2 w-full" />
//             )}

//             <h5 className="font-semibold">Variant Specifications</h5>


//             {specs.map((s, sIdx) => (
//                 <div key={s.id} className="flex gap-2">
//                     <input {...register(`variants.${index}.specifications.${sIdx}.key`)} placeholder="Key" className="border p-2 w-1/2" />
//                     <input {...register(`variants.${index}.specifications.${sIdx}.value`)} placeholder="Value" className="border p-2 w-1/2" />
//                     <Button type="button" size="sm" onClick={() => removeSpec(sIdx)}>
//                         <X size={16} />
//                     </Button>
//                 </div>
//             ))}
//             <Button type="button" size="sm" onClick={() => append({ key: "", value: "" })}>
//                 <ArrowDown />
//             </Button>

//             {/* Variant images */}
//             <label className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded w-16 h-16 hover:bg-gray-100 transition-colors">
//                 <Cloud color="green" size={22} className="text-gray-400" />
//                 <input
//                     type="file"
//                     className="hidden"
//                     multiple
//                     onChange={handleVariantImagesChange}
//                 />
//             </label>

//             {variantImagesPreview[index]?.length > 0 && (
//                 <div className="flex gap-2 flex-wrap mt-2">
//                     {variantImagesPreview[index].map((file, i) => (
//                         <div key={i} className="relative">
//                             <img
//                                 src={typeof file === "string" ? file : URL.createObjectURL(file)}
//                                 alt="variant"
//                                 className="w-20 h-20 object-cover rounded"
//                             />
//                             <Button
//                                 type="button"
//                                 variant="destructive"
//                                 className="absolute top-0 right-0 p-0.5"
//                                 onClick={() => removeVariantImage(i)}
//                             >
//                                 <X size={12} />
//                             </Button>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             <Button type="button" variant="destructive" onClick={() => remove(index)}>
//                 Remove
//             </Button>
//         </div>
//     );
// };

// export default VariantRow;

import React, { useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ArrowDown, Cloud, X } from "lucide-react";
import { TagInput } from "./TagInput";
import { useMutation } from "@tanstack/react-query";
import { deleteVariantAPI } from "@/Api/productApi";
import { toast } from "react-toastify";

const VariantRow = ({
    index,
    control,
    register,
    watch,
    remove,
    variantImagesPreview,
    setVariantImagesPreview,
    setValue,
    variantId,
}) => {
    const { fields: specs, append, remove: removeSpec } = useFieldArray({
        control,
        name: `variants.${index}.specifications`,
    });

    const isFlash = watch(`variants.${index}.isFlashDeal`);
    const isSale = watch(`variants.${index}.isOnSale`);

    // React Query mutation for deletion
    const deleteVariantMutation = useMutation({
        mutationFn: (id) => deleteVariantAPI(id),
        onSuccess: () => {
            toast.success("Variant deleted from backend");
            remove(index); // remove from RHF form
        },
        onError: (err) => {
            toast.error("Failed to delete variant");
            console.error(err);
        },
    });

    // const handleRemoveVariant = () => {
    //     if (variantId) {
    //         mutation.mutate(variantId); // call backend
    //     } else {
    //         remove(index); // just remove local variant if it never existed in DB
    //     }
    // };
    const handleRemoveVariant = () => {
        if (variantId && deleteVariantMutation) {
            deleteVariantMutation.mutate(variantId, {
                onSuccess: () => {
                    remove(index); // remove from RHF array AFTER backend deletion
                },
                onError: (err) => {
                    console.error("Failed to delete variant", err);
                },
            });
        } else {
            remove(index); // new variant, remove locally
        }
    };

    useEffect(() => {
        register(`variants.${index}.tags`);
    }, [register, index]);
    useEffect(() => {
        register(`variants.${index}.specifications`);
    }, [register, index]);

    const handleVariantImagesChange = (e) => {
        const files = Array.from(e.target.files);
        setVariantImagesPreview((prev) => {
            const updated = { ...prev, [index]: [...(prev[index] || []), ...files] };
            setValue(`variants.${index}.images`, updated[index], { shouldValidate: true });
            return updated;
        });
    };

    const removeVariantImage = (imgIdx) => {
        const newFiles = variantImagesPreview[index].filter((_, i) => i !== imgIdx);
        setVariantImagesPreview((prev) => ({ ...prev, [index]: newFiles }));
        setValue(`variants.${index}.images`, newFiles, { shouldValidate: true });
    };

    return (
        <div className="border p-4 rounded space-y-3">
            <div className="flex gap-2">
                <input {...register(`variants.${index}.size`)} placeholder="Size" className="border p-2 w-full" />
                <input {...register(`variants.${index}.color`)} placeholder="Color" className="border p-2 w-full" />
                <input type="number" {...register(`variants.${index}.price`)} placeholder="Price" className="border p-2 w-full" />
                <input type="number" {...register(`variants.${index}.quantity`)} placeholder="Quantity" className="border p-2 w-full" />
            </div>

            <TagInput
                tags={watch(`variants.${index}.tags`) || []}
                setTags={(newTags) => setValue(`variants.${index}.tags`, newTags, { shouldDirty: true, shouldValidate: true })}
                placeholder="Variant tags (press Enter)"
            />

            <label className="flex items-center gap-2">
                <input type="checkbox" {...register(`variants.${index}.isFlashDeal`)} /> Flash Deal
            </label>

            <label className="flex items-center gap-2">
                <input type="checkbox" {...register(`variants.${index}.isOnSale`)} /> On Sale
            </label>

            {isFlash && (
                <>
                    <input type="number" {...register(`variants.${index}.salePrice`)} placeholder="Flash Price" className="border p-2 w-full" />
                    <input type="datetime-local" {...register(`variants.${index}.saleStart`)} className="border p-2 w-full" />
                    <input type="datetime-local" {...register(`variants.${index}.saleEnd`)} className="border p-2 w-full" />
                </>
            )}

            {isSale && !isFlash && (
                <input type="number" {...register(`variants.${index}.regularSalePrice`)} placeholder="Sale Price" className="border p-2 w-full" />
            )}

            <h5 className="font-semibold">Variant Specifications</h5>
            {specs.map((s, sIdx) => (
                <div key={s.id} className="flex gap-2">
                    <input {...register(`variants.${index}.specifications.${sIdx}.key`)} placeholder="Key" className="border p-2 w-1/2" />
                    <input {...register(`variants.${index}.specifications.${sIdx}.value`)} placeholder="Value" className="border p-2 w-1/2" />
                    <Button type="button" size="sm" onClick={() => removeSpec(sIdx)}>
                        <X size={16} />
                    </Button>
                </div>
            ))}
            <Button type="button" size="sm" onClick={() => append({ key: "", value: "" })}>
                <ArrowDown />
            </Button>

            {/* Variant images */}
            <label className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded w-16 h-16 hover:bg-gray-100 transition-colors">
                <Cloud color="green" size={22} className="text-gray-400" />
                <input type="file" className="hidden" multiple onChange={handleVariantImagesChange} />
            </label>

            {variantImagesPreview[index]?.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-2">
                    {variantImagesPreview[index].map((file, i) => (
                        <div key={i} className="relative">
                            <img src={typeof file === "string" ? file : URL.createObjectURL(file)} alt="variant" className="w-20 h-20 object-cover rounded" />
                            <Button type="button" variant="destructive" className="absolute top-0 right-0 p-0.5" onClick={() => removeVariantImage(i)}>
                                <X size={12} />
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            <Button type="button" variant="destructive" onClick={handleRemoveVariant}>
                Remove
            </Button>
        </div>
    );
};

export default VariantRow;