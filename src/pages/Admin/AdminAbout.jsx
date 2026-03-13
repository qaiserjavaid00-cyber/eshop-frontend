import { useEffect, useState } from "react";
import { useGetAbout, useUpdateAbout } from "@/hooks/useAbout";
import AboutSkeleton from "@/components/product/skeletons/AboutSkeleton";

const AdminAbout = () => {
    const { data, isLoading } = useGetAbout();
    const { mutate, isPending } = useUpdateAbout();

    const [form, setForm] = useState({
        title: "",
        description: "",
        mission: "",
        vision: "",
    });

    const [videoFile, setVideoFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (data) {
            setForm({
                title: data.title || "",
                description: data.description || "",
                mission: data.mission || "",
                vision: data.vision || "",
            });
            setPreview(data.video?.url || null);
        }
    }, [data]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        setVideoFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(form).forEach((key) =>
            formData.append(key, form[key])
        );

        if (videoFile) {
            formData.append("video", videoFile);
        }

        mutate(formData, {
            onError: (error) => { console.log("Error loading video", error) }
        });
    };

    if (isLoading) return <AboutSkeleton />;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Edit About Page</h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full border p-3 rounded"
                />

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description"
                    rows={4}
                    className="w-full border p-3 rounded"
                />

                <textarea
                    name="mission"
                    value={form.mission}
                    onChange={handleChange}
                    placeholder="Mission"
                    rows={3}
                    className="w-full border p-3 rounded"
                />

                <textarea
                    name="vision"
                    value={form.vision}
                    onChange={handleChange}
                    placeholder="Vision"
                    rows={3}
                    className="w-full border p-3 rounded"
                />

                <div>
                    <label className="block mb-2 font-medium">
                        Upload Video
                    </label>
                    <input type="file" accept="video/*" onChange={handleVideoChange} />
                </div>

                {preview && (
                    <video
                        src={preview}
                        controls
                        className="w-full rounded mt-4"
                    />
                )}

                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-black text-white px-6 py-3 rounded hover:opacity-80"
                >
                    {isPending ? "Updating..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
};

export default AdminAbout;