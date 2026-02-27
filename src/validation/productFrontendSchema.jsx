
import { z } from "zod";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const numberOrUndefined = (val) => {
    if (val === "" || val === null || val === undefined) return undefined;
    return Number(val);
};

export const productFrontendSchema = z
    .object({
        title: z
            .string()
            .trim()
            .min(3, "Title must be at least 3 characters")
            .max(120, "Title is too long"),

        description: z
            .string()
            .trim()
            .min(10, "Description must be at least 10 characters")
            .max(2000, "Description is too long"),

        category: z.string().min(1, "Please select a category"),
        brand: z.string().trim().min(1, "Brand required"),

        sub: z.string().optional(),

        hasVariant: z.boolean(),

        isFeatured: z.boolean().optional(),

        // ✅ FIXED
        basePrice: z.preprocess(
            numberOrUndefined,
            z.number().positive("Base price must be positive").optional()
        ),

        // ✅ FIXED
        stock: z.preprocess(
            numberOrUndefined,
            z.number()
                .int("Stock must be an integer")
                .min(0, "Stock cannot be negative")
                .optional()
        ),

        specifications: z
            .array(
                z.object({
                    key: z.string().trim().min(1, "Specification key required"),
                    value: z.string().trim().min(1, "Specification value required"),
                })
            )
            .optional()
            .default([]),


        variants: z
            .array(
                z.object({
                    _id: z.string().optional(),

                    size: z.string().trim().min(1, "Size required"),
                    color: z.string().trim().min(1, "Color required"),
                     price: z.preprocess(
                        numberOrUndefined,
                        z.number().positive("Price must be positive")
                    ),
                    quantity: z.preprocess(
                        numberOrUndefined,
                        z.number().int("Quantity must be integer").min(0, "Quantity cannot be negative")
                    ),

                    tags: z.array(z.string()).optional(),

                    specifications: z
                        .array(
                            z.object({
                                key: z.string().trim().min(1, "Specification key required"),
                                value: z.string().trim().min(1, "Specification value required"),
                            })
                        )
                        .optional()
                        .default([]),

                    isFlashDeal: z.boolean().optional(),
                    isOnSale: z.boolean().optional(),

                    salePrice: z.preprocess(
                        numberOrUndefined,
                        z.number().positive("Sale price must be positive").optional()
                    ),
                    saleStart: z.string().optional(),
                    saleEnd: z.string().optional(),
                    regularSalePrice: z.preprocess(
                        numberOrUndefined,
                        z.number().positive("Regular sale price must be positive").optional()
                    ),

                    images: z.array(z.union([z.string().url(), z.instanceof(File)])).optional(),
                })
            )
            .optional(),

        existingImages: z.array(z.string().url()).optional(),

        newImages: z
            .array(
                z
                    .instanceof(File)
                    .refine(
                        (file) => file.size <= MAX_IMAGE_SIZE,
                        "Max image size is 5MB"
                    )
                    .refine(
                        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
                        "Only JPEG, PNG, WEBP images allowed"
                    )
            )
            .optional(),
    })
    .superRefine((data, ctx) => {
        const totalImages =
            (data.existingImages?.length || 0) +
            (data.newImages?.length || 0);

        // 1️⃣ At least one image required
        if (totalImages === 0) {
            ctx.addIssue({
                path: ["newImages"],
                message: "At least one product image is required",
                code: "custom",
            });
        }

        // 2️⃣ Max 8 images allowed
        if (totalImages > 8) {
            ctx.addIssue({
                path: ["newImages"],
                message: "Maximum 8 images allowed",
                code: "custom",
            });
        }

        // 3️⃣ If NO variants → basePrice & stock required
        if (!data.hasVariant) {
            if (data.basePrice == null) {
                ctx.addIssue({
                    path: ["basePrice"],
                    message:
                        "Base price is required when product has no variants",
                    code: "custom",
                });
            }

            if (data.stock == null) {
                ctx.addIssue({
                    path: ["stock"],
                    message:
                        "Stock is required when product has no variants",
                    code: "custom",
                });
            }
        }

        // 4️⃣ If has variants → must have at least one
        if (data.hasVariant) {
            if (!data.variants || data.variants.length === 0) {
                ctx.addIssue({
                    path: ["variants"],
                    message: "At least one variant is required",
                    code: "custom",
                });
            }

            // Prevent duplicate size + color combinations
            if (data.variants) {
                const seen = new Set();
                for (const v of data.variants) {
                    const key = `${v.size}-${v.color}`;
                    if (seen.has(key)) {
                        ctx.addIssue({
                            path: ["variants"],
                            message:
                                "Duplicate variant combinations detected",
                            code: "custom",
                        });
                    }
                    seen.add(key);
                }
            }
        }
    });

