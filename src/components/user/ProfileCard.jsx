
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfileCard({ user, onEdit }) {
    return (
        <Card className="max-w-xl mx-auto shadow-lg">
            <CardContent className="flex flex-col items-center p-8">

                <img
                    src={user.profilePic || "/avatar.png"}
                    alt="profile"
                    className="w-28 h-28 rounded-full object-cover border mb-4"
                />

                <h2 className="text-xl font-semibold">{user.name}</h2>

                <p className="text-muted-foreground">{user.email}</p>

                <Button className="mt-4" onClick={onEdit}>
                    Edit Profile
                </Button>

            </CardContent>
        </Card>
    );
}