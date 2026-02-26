import { useEffect, useState } from "react";

const Countdown = ({ endTime }) => {
    const calculate = () => {
        const diff = new Date(endTime) - new Date();
        if (diff <= 0) return null;

        return {
            h: Math.floor(diff / (1000 * 60 * 60)),
            m: Math.floor((diff / (1000 * 60)) % 60),
            s: Math.floor((diff / 1000) % 60),
        };
    };

    const [time, setTime] = useState(calculate());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(calculate());
        }, 1000);
        return () => clearInterval(timer);
    }, [endTime]);

    if (!time) return <span className="text-red-500">Ended</span>;

    return (
        <span className="text-xs font-semibold text-red-600">
            {time.h}h {time.m}m {time.s}s
        </span>
    );
};

export default Countdown;
