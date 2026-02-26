import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetHero, useUpdateHero } from "@/hooks/hero/useHero";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const AdminHero = () => {
    const { data, isLoading } = useGetHero();
    const { mutate, isPending } = useUpdateHero();

    const [preview, setPreview] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            subtitle: "",
        },
    });

    // Populate form when data loads
    useEffect(() => {
        if (data) {
            reset({
                title: data.title || "",
                subtitle: data.subtitle || "",
            });
            setPreview(data?.image?.url || null);
        }
    }, [data, reset]);

    // Watch image input for preview
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

        mutate(formData);
    };

    if (isLoading) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="p-6 max-w-3xl space-y-6">
            <h2 className="text-2xl font-bold">Manage Hero Section</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Title */}
                <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                        {...register("title", { required: "Title is required" })}
                        placeholder="Enter hero title"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Subtitle */}
                <div className="space-y-2">
                    <Label>Subtitle</Label>
                    <Textarea
                        {...register("subtitle", {
                            required: "Subtitle is required",
                        })}
                        rows={3}
                        placeholder="Enter hero subtitle"
                    />
                    {errors.subtitle && (
                        <p className="text-red-500 text-sm">
                            {errors.subtitle.message}
                        </p>
                    )}
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                    <Label>Hero Image</Label>
                    <Input
                        type="file"
                        accept="image/*"
                        {...register("heroImage")}
                    />
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
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full"
                >
                    {isPending ? "Updating..." : "Save Changes"}
                </Button>
            </form>
        </div>
    );
};

export default AdminHero;