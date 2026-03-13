import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    useGetNotifications,
    useCreateNotification,
    useUpdateNotification,
    useDeleteNotification,
} from "@/hooks/notifications/useNotification";
import { toast } from "react-toastify";

export const AdminNotifications = () => {
    const { data: notifications = [], isLoading } = useGetNotifications();
    const createNotification = useCreateNotification();
    const updateNotification = useUpdateNotification();
    const deleteNotification = useDeleteNotification();

    const [newMessage, setNewMessage] = useState("");
    const [priority, setPriority] = useState(0);

    if (isLoading) return <p>Loading...</p>;

    const handleCreate = () => {
        if (!newMessage) return toast.error("Message cannot be empty");
        createNotification.mutate(
            { message: newMessage, priority: Number(priority) },
            {
                onSuccess: () => {
                    setNewMessage("");
                    setPriority(0);
                    toast.success("Notification created!");
                },
            }
        );
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure?")) {
            deleteNotification.mutate(id, {
                onSuccess: () => toast.success("Notification deleted!"),
                onError: (error) => { console.log(error) }
            });
        }
    };

    const toggleActive = (notification) => {
        updateNotification.mutate(
            {
                id: notification._id,
                notification: { isActive: !notification.isActive },
            },
            { onSuccess: () => toast.success("Notification updated!") }
        );
    };

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold">Manage Notifications</h2>

            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Notification message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-24 p-2 border rounded"
                />
                <Button onClick={handleCreate}>Create</Button>
            </div>

            <div className="mt-4 space-y-2">
                {notifications.map((n) => (
                    <div
                        key={n._id}
                        className="flex justify-between items-center p-2 border rounded"
                    >
                        <div>
                            <p className="font-semibold">{n.message}</p>
                            <small className="text-gray-500">
                                Priority: {n.priority} | Active: {n.isActive ? "Yes" : "No"}
                            </small>
                        </div>

                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                onClick={() => toggleActive(n)}
                                className={n.isActive ? "bg-green-500" : "bg-gray-400"}
                            >
                                {n.isActive ? "Deactivate" : "Activate"}
                            </Button>
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(n._id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};