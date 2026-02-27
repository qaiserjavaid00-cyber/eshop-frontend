
import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createProductAPI, updateProductAPI } from "@/Api/productApi";
import { Button } from "@/components/ui/button";
import { Loader2, PlusIcon, X } from "lucide-react";
import { toast } from "react-toastify";
import { TagInput } from "./TagInput";
import VariantRow from "./VariantRow";
import ProductImagesInput from "./ProductImagesInput";
import { CategorySelector } from "./CategorySelector";
import { productFrontendSchema } from "@/validation/productFrontendSchema";
import { Input } from "../ui/input";

export const ProductForm = ({ mode, initialData = null, initialVariants = [] }) => {
    const isEdit = mode === "edit";
    const [tags, setTags] = useState(initialData?.tags || []);
    const [existingImages, setExistingImages] = useState(initialData?.images || []);
    const [newImages, setNewImages] = useState([]);
    ///v1
    // const mergedVariants = isEdit
    //     ? initialVariants.length
    //         ? initialVariants
    //         : initialData?.variants || []
    //     : [];
    ////v2
    // const mergedVariants = isEdit
    //     ? (initialVariants.length
    //         ? initialVariants
    //         : initialData?.variants || []
    //     ).map(v => ({
    //         ...v,
    //         specifications:
    //             v.specifications && v.specifications.length > 0
    //                 ? v.specifications
    //                 : [{ key: "", value: "" }],
    //     }))
    //     : [];
    ///v3
    const mergedVariants = isEdit && initialData?.hasVariant
        ? (initialVariants.length
            ? initialVariants
            : initialData?.variants || []
        ).map(v => ({
            _id: v._id,
            size: v.size || "",
            color: v.color || "",
            price: v.price || 0,
            quantity: v.quantity || 0,

            tags: v.tags || [],

            specifications:
                v.specifications && v.specifications.length > 0
                    ? v.specifications
                    : [{ key: "", value: "" }],

            isFlashDeal: v.isFlashDeal || false,
            isOnSale: v.isOnSale || false,

            salePrice: v.salePrice || "",
            saleStart: v.saleStart || "",
            saleEnd: v.saleEnd || "",

            regularSalePrice: v.regularSalePrice || "",

            images: v.images || [],
        }))
        : [];

    const [variantImagesPreview, setVariantImagesPreview] = useState(
        mergedVariants.reduce((acc, v, idx) => {
            acc[idx] = v.images || [];
            return acc;
        }, {}) || {}
    );

    const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(productFrontendSchema),
        shouldUnregister: false, // ✅ ensures fields persist
        defaultValues: isEdit
            ? {
                title: initialData?.title || "",
                description: initialData?.description || "",
                category: initialData?.category?._id || "",
                sub: initialData?.sub?._id || "",
                hasVariant: initialData?.hasVariant || false,
                isFeatured: initialData?.isFeatured || false,
                basePrice: initialData?.basePrice || "",
                stock: initialData?.stock || "",
                brand: initialData?.brand || "",
                tags: initialData?.tags?.join(", ") || "",
                specifications:
                    initialData?.specifications?.length > 0
                        ? initialData.specifications
                        : [{ key: "", value: "" }],
                variants: initialData.hasVariant ? mergedVariants : [],
                existingImages,
                newImages,
            }
            : {
                title: "",
                description: "",
                category: "",
                sub: "",
                hasVariant: false,
                isFeatured: false,
                basePrice: "",
                stock: "",
                tags: "",
                brand:""
                specifications: [{ key: "", value: "" }],
                variants: [],
                existingImages,
                newImages,
            },
    });

    const hasVariant = watch("hasVariant");

    const {
        fields: productSpecs,
        append: addSpec,
        remove: removeSpec,
    } = useFieldArray({ control, name: "specifications" });

    const {
        fields: variants,
        append: addVariant,
        remove: removeVariant,
    } = useFieldArray({ control, name: "variants" });

    // ✅ Append default variant immediately on mount if empty
    // useEffect(() => {
    //     if (hasVariant && (!variants || variants.length === 0)) {
    //         addVariant({
    //             size: "",
    //             color: "Silver",
    //             price: 1,
    //             quantity: 0,
    //             tags: [],
    //             specifications: [{ key: "", value: "" }],
    //             isFlashDeal: false,
    //             isOnSale: false,
    //             images: [],
    //         });
    //     }
    // }, [addVariant, hasVariant, variants]);

    // Make RHF aware of image states
    useEffect(() => {
        setValue("existingImages", existingImages, { shouldValidate: true });
    }, [existingImages, setValue]);

    useEffect(() => {
        setValue("newImages", newImages, { shouldValidate: true });
    }, [newImages, setValue]);

    // ✅ Sync variant images after variants exist
    useEffect(() => {
        variants.forEach((v, idx) => {
            if (variantImagesPreview[idx]) {
                setValue(`variants.${idx}.images`, variantImagesPreview[idx], {
                    shouldValidate: true,
                });
            }
        });
    }, [variants, variantImagesPreview, setValue]);

    const { mutate, isPending } = useMutation({
        mutationFn: (formData) =>
            isEdit ? updateProductAPI(initialData._id, formData) : createProductAPI(formData),
        onSuccess: () =>
            toast.success(isEdit ? "Product updated" : "Product created"),
        onError: (err) =>
            toast.error(err?.response?.data?.message || "Something went wrong"),
    });

    const onSubmit = (data) => {
        console.log("Submitted variants:", data.variants);
        const fd = new FormData();
        // console.log("Existing Images state before submit:", existingImages);
        fd.append("title", data.title);
        fd.append("description", data.description);
        fd.append("category", data.category);
                if (data.sub) fd.append("sub", data.sub);
                fd.append("brand", data.brand);
        fd.append("hasVariant", data.hasVariant);
        fd.append("isFeatured", data.isFeatured);
        fd.append("tags", JSON.stringify(tags));
        fd.append(
            "specifications",
            JSON.stringify(data.specifications.filter((s) => s.key && s.value))
        );

        if (!data.hasVariant) {
            fd.append("basePrice", data.basePrice);
            fd.append("stock", data.stock);
        }

        fd.append("existingImages", JSON.stringify(existingImages || []));
        (data.newImages || []).forEach((file) => fd.append("productImages", file));

        if (data.hasVariant) {
            fd.append(
                "variants",
                JSON.stringify(
                    data.variants.map((v, idx) => ({
                        _id: initialVariants?.[idx]?._id || v._id || undefined,
                        tempId: idx,
                        size: v.size,
                        color: v.color,
                        price: v.price,
                        quantity: v.quantity,
                        isFlashDeal: v.isFlashDeal,
                        salePrice: v.salePrice,
                        saleStart: v.saleStart,
                        saleEnd: v.saleEnd,
                        isOnSale: v.isOnSale,
                        regularSalePrice: v.regularSalePrice,
                        tags: Array.isArray(v.tags)
                            ? v.tags
                            : typeof v.tags === "string"
                                ? v.tags.split(",").map((t) => t.trim()).filter(Boolean)
                                : [],
                        specifications: Array.isArray(v.specifications)
                            ? v.specifications.filter(s => s?.key && s?.value)
                            : [],
                    }))
                )
            );

            data.variants.forEach((v, idx) => {
                const images = variantImagesPreview[idx] || [];

                const existing = images.filter(img => typeof img === "string");
                const newFiles = images.filter(img => img instanceof File);
                console.log("existing", existing)
                console.log("new files", newFiles)
                // Send existing URLs as JSON
                fd.append(`variantExistingImages_${idx}`, JSON.stringify(existing));

                // Send new files normally
                newFiles.forEach(file => {
                    fd.append(`variantImages_${idx}`, file);
                });
            });

        }

        mutate(fd);
    };

    console.log("Initial variants", mergedVariants);

    return (
        <div className="p-10 max-w-5xl mx-auto">
            {/* <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">             */}
            <form
                onSubmit={handleSubmit(
                    (data) => {
                        console.log("SUCCESS:", data);
                        onSubmit(data);
                    },
                    (errors) => {
                        console.log("VALIDATION ERRORS:", errors);
                    }
                )}
                className="space-y-6"
            >

                <ProductImagesInput
                    existingImages={existingImages}
                    setExistingImages={setExistingImages}
                    newImages={newImages}
                    setNewImages={setNewImages}
                    setValue={setValue}
                />
                <div className="mb-2">
                    <Input {...register("title")} placeholder="Title" className="border p-2 w-full" />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>

                <div className="mb-2">
                    <textarea
                        {...register("description")}
                        placeholder="Description"
                        className="border p-2 w-full"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>
 <div className="mb-2">
                    <Input {...register("brand")} placeholder="Brand" className="border p-2 w-full" />
                    {errors.brand && (
                        <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
                    )}
                </div>
                <CategorySelector register={register} setValue={setValue} />

                <h4 className="font-bold">Specifications</h4>
                {
                    productSpecs.map((f, i) => (
                        <div key={f.id} className="flex gap-2">
                            <input
                                {...register(`specifications.${i}.key`)}
                                className="border p-2 w-1/2"
                            />
                            {errors.specifications?.[i]?.key && (
                                <p className="text-red-500 text-sm">{errors.specifications[i].key.message}</p>
                            )}
                            <input
                                {...register(`specifications.${i}.value`)}
                                className="border p-2 w-1/2"
                            />
                            {errors.specifications?.[i]?.value && (
                                <p className="text-red-500 text-sm">{errors.specifications[i].value.message}</p>
                            )}
                            <Button type="button" onClick={() => removeSpec(i)}>
                                <X size={16} />
                            </Button>
                            <Button type="button" onClick={() => addSpec({ key: "", value: "" })}>
                                <PlusIcon />
                            </Button>
                        </div>
                    ))
                }


                <TagInput tags={tags} setTags={setTags} placeholder="Type tag and press Enter" />

                <label className="flex gap-2">
                    <input type="checkbox" {...register("hasVariant")} /> Has Variants
                </label>
                <label className="flex gap-2">
                    <input type="checkbox" {...register("isFeatured")} /> Is Featured
                </label>

                {
                    !hasVariant && (
                        <>
                            <input
                                {...register("basePrice")}
                                placeholder="Base Price"
                                className="border p-2 w-full"
                            />
                            {errors.basePrice && (
                                <p className="text-red-500 text-sm mt-1">{errors.basePrice.message}</p>
                            )}
                            <input
                                {...register("stock")}
                                placeholder="Stock"
                                className="border p-2 w-full"
                            />
                            {errors.stock && (
                                <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>
                            )}
                        </>
                    )
                }

                {
                    hasVariant &&
                    variants.map((v, i) => (
                        <VariantRow
                            key={v.id}
                            index={i}
                            control={control}
                            register={register}
                            watch={watch}
                            remove={removeVariant}
                            variantImagesPreview={variantImagesPreview}
                            setVariantImagesPreview={setVariantImagesPreview}
                            setValue={setValue}
                            variantId={isEdit ? mergedVariants[i]?._id : undefined}

                        />
                    ))
                }


                {
                    hasVariant && (
                        <Button
                            type="button"
                            onClick={() =>
                                addVariant({
                                    size: "",
                                    color: "",
                                    price: "",
                                    quantity: "",
                                    tags: [],
                                    specifications: [{ key: "", value: "" }],
                                    isFlashDeal: false,
                                    isOnSale: false,
                                    images: [],
                                })
                            }
                        >
                            Add Variant
                        </Button>
                    )
                }

                <button type="submit" disabled={isPending} className="bg-orange-500 text-white p-2 rounded w-full">
                    {isPending && <Loader2 className="animate-spin inline mr-2" />}
                    {isEdit ? "Update Product" : "Create Product"}
                </button>
            </form >
        </div >
    );
};

