import React, { useState } from "react";
import HeroForm from "@/components/admin/hero-form";
import { useGetHeroes, useDeleteHero } from "@/hooks/hero/useHero";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function HeroManagementPage() {
    const { data: heroes, isLoading } = useGetHeroes();
    const { mutate: deleteHero } = useDeleteHero();

    const [selectedHero, setSelectedHero] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    if (isLoading) return <div className="p-6">Loading heroes...</div>;

    const handleDelete = (heroId) => {
        if (window.confirm("Are you sure you want to delete this hero?")) {
            deleteHero(heroId, {
                onSuccess: () => toast.success("Hero deleted successfully!"),
            });
        }
    };

    const handleEdit = (hero) => {
        setSelectedHero(hero);
        setIsCreating(false);
    };

    const handleCreateNew = () => {
        setSelectedHero(null);
        setIsCreating(true);
    };

    return (
        <div className="p-6 space-y-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Hero Section</h1>
                <Button onClick={handleCreateNew}>+ Create New Hero</Button>
            </div>

            {/* Hero Form */}
            {(isCreating || selectedHero) && (
                <HeroForm
                    hero={selectedHero}
                    onSuccess={() => {
                        toast.success(
                            selectedHero ? "Hero updated successfully!" : "Hero created successfully!"
                        );
                        setSelectedHero(null);
                        setIsCreating(false);
                    }}
                />
            )}

            {/* Hero List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {heroes?.map((hero) => (
                    <div
                        key={hero._id}
                        className="bg-muted p-4 rounded-lg shadow relative flex flex-col"
                    >
                        <img
                            src={hero.image?.url}
                            alt={hero.title}
                            className="h-48 w-full object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-lg font-semibold">{hero.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{hero.subtitle}</p>

                        <div className="mt-auto flex gap-2">
                            <Button
                                size="sm"
                                onClick={() => handleEdit(hero)}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Edit
                            </Button>
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(hero._id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}