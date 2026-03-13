
import ProfileCard from "@/components/user/ProfileCard";
import ProfileEditDialog from "@/components/user/ProfileEditDialog";
import ProfileAvatarUpload from "@/components/user/ProfilePictureUpload";
import { useUser } from "@/hooks/users/useUser";
import { useState } from "react";

export const Profile = () => {

    const { data: user, isLoading, updateProfile, updateProfilePic } = useUser();

    const [open, setOpen] = useState(false);

    if (isLoading) {
        return <p className="text-center mt-20">Loading profile...</p>;
    }

    return (
        <div className="min-h-screen flex flex-col mt-4 gap-6">

            <ProfileCard user={user} onEdit={() => setOpen(true)} />

            <ProfileAvatarUpload updatePic={updateProfilePic} />

            <ProfileEditDialog
                open={open}
                setOpen={setOpen}
                user={user}
                update={updateProfile}
            />

        </div>
    );
}