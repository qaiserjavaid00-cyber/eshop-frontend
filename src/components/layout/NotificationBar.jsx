import React from "react";
import { useActiveNotifications } from "@/hooks/notifications/useNotification";

export const NotificationBar = () => {
    const { data: notifications = [] } = useActiveNotifications();

    if (!notifications.length) return null;

    return (
        <div className="bg-black text-white py-2 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap inline-block">
                {notifications.map((n, idx) => (
                    <span key={n._id} className="mx-4">
                        {n.message}
                        {idx !== notifications.length - 1 && " |"}
                    </span>
                ))}
            </div>
        </div>
    );
};