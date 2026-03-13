
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSubscribe } from "@/hooks/users/useSubscribe";

export default function SubscribeSection() {
    const [email, setEmail] = useState("");
    const { mutate, isPending, isSuccess, isError, error } = useSubscribe();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;

        mutate(email, {
            onSuccess: () => {
                setEmail("");
            },
            onError: (error) => { console.log(error) }
        });
    };

    return (
        <div className="bg-muted py-12 px-6 text-center rounded-2xl">
            <h2 className="text-2xl font-semibold mb-2">
                Subscribe to our Newsletter
            </h2>
            <p className="text-muted-foreground mb-6">
                Get exclusive deals and updates directly to your inbox.
            </p>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
            >
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button type="submit" disabled={isPending}>
                    {isPending ? "Subscribing..." : "Subscribe"}
                </Button>
            </form>

            {isSuccess && (
                <p className="text-green-600 mt-4">
                    Successfully subscribed!
                </p>
            )}

            {isError && (
                <p className="text-green-500 mt-4">
                    {error?.response?.data?.message}
                </p>
            )}
        </div>
    );
}