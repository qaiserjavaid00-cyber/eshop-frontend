import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useCreateHero, useUpdateHero } from "@/hooks/hero/useHero";

const HeroForm = ({ hero, onSuccess }) => {
    const isEdit = Boolean(hero);

    const { mutate: createHero, isPending: creating } = useCreateHero();
    const { mutate: updateHero, isPending: updating } = useUpdateHero();

    const [preview, setPreview] = useState(hero?.image?.url || null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: hero?.title || "",
            subtitle: hero?.subtitle || "",
        },
    });

    // Reset form when hero changes
    useEffect(() => {
        if (hero) {
            reset({
                title: hero.title || "",
                subtitle: hero.subtitle || "",
            });
            setPreview(hero.image?.url || null);
        }
    }, [hero, reset]);

    // Watch image for preview
    const imageFile = watch("heroImage");
    useEffect(() => {
        if (imageFile && imageFile.length > 0) {
            const file = imageFile[0];
            setPreview(URL.createObjectURL(file));
        }
    }, [imageFile]);

    const onSubmit = (formValues) => {
        const formData = new FormData();
        formData.append("title", formValues.title);
        formData.append("subtitle", formValues.subtitle);

        if (formValues.heroImage && formValues.heroImage.length > 0) {
            formData.append("heroImage", formValues.heroImage[0]);
        }

        if (isEdit) {
            updateHero({ id: hero._id, formData }, { onSuccess });
        } else {
            createHero(formData, { onSuccess });
        }
    };

    const isPending = creating || updating;

    return (
        <div className="p-6 max-w-3xl space-y-6">
            <h2 className="text-2xl font-bold">
                {isEdit ? "Edit Hero" : "Create New Hero"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                        {...register("title", { required: "Title is required" })}
                        placeholder="Enter hero title"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm">{errors.title.message}</p>
                    )}
                </div>

                {/* Subtitle */}
                <div className="space-y-2">
                    <Label>Subtitle</Label>
                    <Textarea
                        {...register("subtitle", { required: "Subtitle is required" })}
                        rows={3}
                        placeholder="Enter hero subtitle"
                    />
                    {errors.subtitle && (
                        <p className="text-red-500 text-sm">{errors.subtitle.message}</p>
                    )}
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                    <Label>Hero Image</Label>
                    <Input type="file" accept="image/*" {...register("heroImage")} />
                </div>

                {/* Preview */}
                {preview && (
                    <div className="space-y-2">
                        <Label>Preview</Label>
                        <img
                            src={preview}
                            alt="Hero Preview"
                            className="w-full h-64 object-cover rounded-xl border"
                        />
                    </div>
                )}

                {/* Submit */}
                <Button type="submit" disabled={isPending} className="w-full">
                    {isPending
                        ? isEdit
                            ? "Updating..."
                            : "Creating..."
                        : isEdit
                            ? "Save Changes"
                            : "Create Hero"}
                </Button>
            </form>
        </div>
    );
};

export default HeroForm;