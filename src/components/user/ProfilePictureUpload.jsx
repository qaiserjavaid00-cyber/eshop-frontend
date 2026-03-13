import { Button } from "@/components/ui/button";

export default function ProfileAvatarUpload({ updatePic }) {

    const handleChange = (e) => {
        const file = e.target.files[0];
        console.log("Selected file:", file);

        if (file) {
            updatePic(file);
        }
    };

    return (
        <div className="flex flex-col items-center gap-2">

            <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
                id="avatarUpload"
            />

            <label htmlFor="avatarUpload">
                <Button variant="outline" asChild>
                    <span>Upload New Photo</span>
                </Button>
            </label>

        </div>
    );
}