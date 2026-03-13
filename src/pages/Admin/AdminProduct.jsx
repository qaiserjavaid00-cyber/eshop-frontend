
// import React, { useState } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { getAllCatsAPI } from "../Api/catApi";
// import { getSingleSubAPI } from "../Api/subApi";
// import { createProductAPI } from "../Api/productApi";
// import { Button } from "@/components/ui/button";
// import { Loader2, X } from "lucide-react";
// import { toast } from "react-toastify";

// /* ---------------- VARIANT ROW ---------------- */
// const VariantRow = ({ index, control, register, remove, watch }) => {
//     const {
//         fields: specFields,
//         append,
//         remove: removeSpec,
//     } = useFieldArray({
//         control,
//         name: `variants.${index}.specifications`,
//     });

//     const isFlashDeal = watch(`variants.${index}.isFlashDeal`);
//     const isOnSale = watch(`variants.${index}.isOnSale`);

//     return (
//         <div className="border p-4 rounded space-y-3">
//             <input {...register(`variants.${index}.size`)} placeholder="Size" className="border p-2 w-full" />
//             <input {...register(`variants.${index}.color`)} placeholder="Color" className="border p-2 w-full" />
//             <input type="number" {...register(`variants.${index}.price`)} placeholder="Price" className="border p-2 w-full" />
//             <input type="number" {...register(`variants.${index}.quantity`)} placeholder="Quantity" className="border p-2 w-full" />

//             {/* TAGS */}
//             <input {...register(`variants.${index}.tags`)} placeholder="Variant tags (comma separated)" className="border p-2 w-full" />

//             {/* FLASH / SALE */}
//             <label className="flex gap-2 items-center">
//                 <input type="checkbox" {...register(`variants.${index}.isFlashDeal`)} />
//                 Flash Deal
//             </label>

//             <label className="flex gap-2 items-center">
//                 <input type="checkbox" {...register(`variants.${index}.isOnSale`)} />
//                 On Sale
//             </label>

//             {isFlashDeal && (
//                 <>
//                     <input type="number" {...register(`variants.${index}.salePrice`)} placeholder="Flash Price" className="border p-2 w-full" />
//                     <input type="datetime-local" {...register(`variants.${index}.saleStart`)} className="border p-2 w-full" />
//                     <input type="datetime-local" {...register(`variants.${index}.saleEnd`)} className="border p-2 w-full" />
//                 </>
//             )}

//             {isOnSale && !isFlashDeal && (
//                 <input
//                     type="number"
//                     {...register(`variants.${index}.regularSalePrice`)}
//                     placeholder="Sale Price"
//                     className="border p-2 w-full"
//                 />
//             )}

//             {/* VARIANT SPECS */}
//             <h5 className="font-semibold">Variant Specifications</h5>

//             {specFields.map((f, sIdx) => (
//                 <div key={f.id} className="flex gap-2">
//                     <input {...register(`variants.${index}.specifications.${sIdx}.key`)} placeholder="Key" className="border p-2 w-1/2" />
//                     <input {...register(`variants.${index}.specifications.${sIdx}.value`)} placeholder="Value" className="border p-2 w-1/2" />
//                     <Button type="button" size="sm" onClick={() => removeSpec(sIdx)}>
//                         <X size={16} />
//                     </Button>
//                 </div>
//             ))}

//             <Button type="button" size="sm" onClick={() => append({ key: "", value: "" })}>
//                 Add Variant Spec
//             </Button>

//             <input type="file" multiple {...register(`variants.${index}.images`)} />

//             <Button type="button" variant="destructive" onClick={() => remove(index)}>
//                 Remove Variant
//             </Button>
//         </div>
//     );
// };

// /* ---------------- MAIN ---------------- */
// export const AdminProduct = () => {
//     const {
//         register,
//         handleSubmit,
//         control,
//         watch,
//         setValue,
//     } = useForm({
//         defaultValues: {
//             title: "",
//             description: "",
//             category: "",
//             sub: "",
//             hasVariant: false,
//             basePrice: "",
//             stock: "",
//             tags: "",
//             specifications: [{ key: "", value: "" }],
//             variants: [],
//         },
//     });

//     /* PRODUCT SPECS */
//     const { fields: productSpecs, append: addProductSpec, remove: removeProductSpec } =
//         useFieldArray({ control, name: "specifications" });

//     /* VARIANTS */
//     const { fields: variants, append: addVariant, remove: removeVariant } =
//         useFieldArray({ control, name: "variants" });

//     const hasVariant = watch("hasVariant");
//     const [parentId, setParentId] = useState("");

//     /* QUERIES */
//     const { data: cats } = useQuery({ queryKey: ["categories"], queryFn: getAllCatsAPI });
//     const { data: sub } = useQuery({
//         queryKey: ["subs", parentId],
//         queryFn: () => getSingleSubAPI(parentId),
//         enabled: !!parentId,
//     });

//     /* MUTATION */
//     const { mutate, isPending } = useMutation(
//         {
//             mutationFn: createProductAPI,
//             onSuccess: (data) => {
//                 toast.success(`${data?.message}`)
//             },
//             onError: (error) => {
//                 toast.error(`${error?.response?.data?.message}`)
//                 console.log(error)
//             }


//         });

//     /* SUBMIT */
//     const onSubmit = (data) => {
//         const fd = new FormData();

//         // PRODUCT IMAGES
//         if (data.images?.length) {
//             Array.from(data.images).forEach((file) => {
//                 fd.append("productImages", file);
//             });
//         }
//         fd.append("title", data.title);
//         fd.append("description", data.description);
//         fd.append("category", data.category);
//         if (data.sub) fd.append("sub", data.sub);
//         fd.append("hasVariant", data.hasVariant);

//         fd.append("tags", JSON.stringify(data.tags?.split(",").map(t => t.trim()).filter(Boolean)));
//         fd.append("specifications", JSON.stringify(data.specifications.filter(s => s.key && s.value)));

//         if (!data.hasVariant) {
//             fd.append("basePrice", data.basePrice);
//             fd.append("stock", data.stock);
//         }

//         if (data.hasVariant) {
//             fd.append(
//                 "variants",
//                 JSON.stringify(
//                     // data.variants.map(v => ({
//                     //     ...v,
//                     //     tags: v.tags?.split(",").map(t => t.trim()).filter(Boolean),
//                     //     specifications: v.specifications.filter(s => s.key && s.value),
//                     // }))
//                     data.variants.map((v, index) => ({
//                         tempId: index,
//                         size: v.size,
//                         color: v.color,
//                         price: v.price,
//                         quantity: v.quantity,
//                         isFlashDeal: v.isFlashDeal,
//                         salePrice: v.salePrice,
//                         saleStart: v.saleStart,
//                         saleEnd: v.saleEnd,
//                         isOnSale: v.isOnSale,
//                         regularSalePrice: v.regularSalePrice,
//                         tags: v.tags?.split(",").map(t => t.trim()).filter(Boolean),
//                         specifications: v.specifications.filter(s => s.key && s.value),
//                     }))

//                 )
//             );

//             data.variants.forEach((variant, index) => {
//                 if (variant.images?.length) {
//                     Array.from(variant.images).forEach((file) => {
//                         fd.append(`variantImages_${index}`, file);
//                     });
//                 }
//             });
//         }

//         mutate(fd);
//     };

//     return (
//         <div className="p-10 max-w-5xl mx-auto">
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

//                 <input {...register("title")} placeholder="Title" className="border p-2 w-full" />
//                 <textarea {...register("description")} placeholder="Description" className="border p-2 w-full" />

//                 {/* CATEGORY */}
//                 <select
//                     {...register("category")}
//                     onChange={(e) => {
//                         setValue("category", e.target.value);
//                         setParentId(e.target.value);
//                         setValue("sub", "");
//                     }}
//                     className="border p-2 w-full"
//                 >
//                     <option value="">Select Category</option>
//                     {cats?.categories?.map(c => (
//                         <option key={c._id} value={c._id}>{c.name}</option>
//                     ))}
//                 </select>

//                 {/* SUBCATEGORY */}
//                 {sub?.sub?.length > 0 && (
//                     <select {...register("sub")} className="border p-2 w-full">
//                         <option value="">Select Subcategory</option>
//                         {sub.sub.map(s => (
//                             <option key={s._id} value={s._id}>{s.name}</option>
//                         ))}
//                     </select>
//                 )}

//                 {/* PRODUCT SPECS */}
//                 <h4 className="font-bold">Product Specifications</h4>
//                 {productSpecs.map((f, i) => (
//                     <div key={f.id} className="flex gap-2">
//                         <input {...register(`specifications.${i}.key`)} className="border p-2 w-1/2" />
//                         <input {...register(`specifications.${i}.value`)} className="border p-2 w-1/2" />
//                         <Button type="button" onClick={() => removeProductSpec(i)}><X size={16} /></Button>
//                     </div>
//                 ))}
//                 <Button type="button" onClick={() => addProductSpec({ key: "", value: "" })}>Add Product Spec</Button>

//                 <input {...register("tags")} placeholder="Product tags" className="border p-2 w-full" />

//                 <label className="flex gap-2">
//                     <input type="checkbox" {...register("hasVariant")} /> Has Variants
//                 </label>

//                 {!hasVariant && (
//                     <>
//                         <input {...register("basePrice")} placeholder="Base Price" className="border p-2 w-full" />
//                         <input {...register("stock")} placeholder="Stock" className="border p-2 w-full" />
//                     </>
//                 )}

//                 {hasVariant && variants.map((v, i) => (
//                     <VariantRow
//                         key={v.id}
//                         index={i}
//                         control={control}
//                         register={register}
//                         remove={removeVariant}
//                         watch={watch}
//                     />
//                 ))}

//                 {hasVariant && (
//                     <Button type="button" onClick={() => addVariant({
//                         size: "",
//                         color: "",
//                         price: "",
//                         quantity: "",
//                         tags: "",
//                         specifications: [{ key: "", value: "" }],
//                         isFlashDeal: false,
//                         isOnSale: false,
//                         images: [],
//                     })}>
//                         Add Variant
//                     </Button>
//                 )}

//                 <input type="file" multiple {...register("images")} />

//                 <button disabled={isPending} className="bg-orange-500 text-white p-2 rounded w-full">
//                     {isPending && <Loader2 className="animate-spin inline mr-2" />}
//                     Save Product
//                 </button>
//             </form>
//         </div>
//     );
// };


import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ProductForm } from '@/components/product/ProductForm'
import React from 'react'

export const AdminProduct = () => {
    return (
        <div>
            <ErrorBoundary>

                <ProductForm mode="create" />
            </ErrorBoundary>
        </div>
    )
}
