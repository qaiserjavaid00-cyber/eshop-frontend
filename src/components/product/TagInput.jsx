// TagInput.jsx
import React, { useState } from "react";

export const TagInput = ({ tags, setTags, placeholder = "Add a tag" }) => {
    const [input, setInput] = useState("");

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const value = input.trim();
            if (!value || tags.includes(value)) return;
            setTags([...tags, value]);
            setInput("");
        }
    };

    const removeTag = (idx) => {
        setTags(tags.filter((_, i) => i !== idx));
    };

    return (
        <div className="space-y-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="border p-2 w-full rounded"
            />
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                    <span
                        key={idx}
                        className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={() => removeTag(idx)}
                            className="text-xs hover:text-red-600"
                        >
                            ✕
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};
