
//// v1 for create
import { X, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductImagesInput = ({ existingImages, setExistingImages, newImages, setNewImages }) => {

    const handleFilesChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages((prev) => [...prev, ...files]);
        e.target.value = null; // Reset input so same file can be reselected
    };

    const removeNewImage = (index) => {
        setNewImages((prev) => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index) => {
        setExistingImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-3">
            {/* Existing images */}
            {existingImages.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                    {existingImages.map((img, i) => (
                        <div key={i} className="relative">
                            <img
                                src={img}
                                alt="product"
                                className="w-full h-full object-cover rounded"
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                className="absolute top-0 right-0 p-0.5"
                                onClick={() => removeExistingImage(i)}
                            >
                                <X size={12} />
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            {/* New images preview */}
            {newImages.length > 0 && (
                <div className="flex gap-2 flex-wrap items-start">
                    {newImages.map((file, i) => (
                        <div key={i} className="relative w-40 h-40 rounded overflow-hidden">
                            <img
                                src={URL.createObjectURL(file)}
                                alt="preview"
                                className="w-full h-full object-cover rounded-full"
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                className="absolute top-0 right-0 p-0.5"
                                onClick={() => removeNewImage(i)}
                            >
                                <X size={12} />
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload new images */}
            <label className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded w-24 h-24 hover:bg-gray-100 transition-colors">
                <Cloud size={32} className="text-gray-400" />
                <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFilesChange} // Manage files in state only
                />
            </label>
        </div>
    );
};

export default ProductImagesInput;

///v2 fot update

// // ProductImagesInput.jsx
// import { X, Cloud } from "lucide-react";
// import { Button } from "@/components/ui/button";

// const ProductImagesInput = ({
//     existingImages,
//     setExistingImages,
//     newImages,
//     setNewImages,
//     variantImagesPreview,
//     setVariantImagesPreview,
// }) => {
//     const handleFilesChange = (e, variantIdx = null) => {
//         const files = Array.from(e.target.files).map((f) => ({ file: f }));
//         if (variantIdx === null) setNewImages((prev) => [...prev, ...files]);
//         else setVariantImagesPreview((prev) => ({
//             ...prev,
//             [variantIdx]: [...(prev[variantIdx] || []), ...files],
//         }));
//         e.target.value = null;
//     };

//     const removeNewImage = (index, variantIdx = null) => {
//         if (variantIdx === null) setNewImages((prev) => prev.filter((_, i) => i !== index));
//         else setVariantImagesPreview((prev) => ({
//             ...prev,
//             [variantIdx]: prev[variantIdx].filter((_, i) => i !== index),
//         }));
//     };

//     const removeExistingImage = (index) => setExistingImages((prev) => prev.filter((_, i) => i !== index));

//     return (
//         <div className="space-y-3">
//             {existingImages.length > 0 && (
//                 <div className="flex gap-2 flex-wrap">
//                     {existingImages.map((img, i) => (
//                         <div key={i} className="relative">
//                             <img src={img} alt="product" className="w-full h-full object-cover rounded" />
//                             <Button type="button" variant="destructive" className="absolute top-0 right-0 p-0.5" onClick={() => removeExistingImage(i)}>
//                                 <X size={12} />
//                             </Button>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {newImages.length > 0 && (
//                 <div className="flex gap-2 flex-wrap items-start">
//                     {newImages.map((imgObj, i) => (
//                         <div key={i} className="relative w-20 h-20 rounded overflow-hidden">
//                             <img src={URL.createObjectURL(imgObj.file)} alt="preview" className="w-full h-full object-cover" />
//                             <Button type="button" variant="destructive" className="absolute top-0 right-0 p-0.5" onClick={() => removeNewImage(i)}>
//                                 <X size={12} />
//                             </Button>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             <label className="cursor-pointer flex items-center justify-center border-2 border-dashed border-gray-300 rounded w-24 h-24 hover:bg-gray-100 transition-colors">
//                 <Cloud size={32} className="text-gray-400" />
//                 <input type="file" multiple className="hidden" onChange={handleFilesChange} />
//             </label>
//         </div>
//     );
// };

// export default ProductImagesInput;
