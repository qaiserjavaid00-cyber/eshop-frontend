import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const TagsFilter = ({ tags = [], selectedTags = [], handleCheckboxChange }) => {
    const [open, setOpen] = useState(true)

    if (!tags.length) return null;

    return (
        <div>
            <div className="mb-4">
                <div
                    className="cursor-pointer font-bold py-3 flex justify-between"
                    onClick={() => setOpen(!open)}
                >
                    Tags <BsChevronDown />
                </div>

                {open && <div className="flex flex-wrap gap-2">
                    {tags.map(tag => {
                        const isActive = selectedTags.includes(tag);

                        return (
                            <span
                                key={tag}
                                onClick={() => handleCheckboxChange('tags', tag)}
                                className={`
                cursor-pointer px-3 py-1 rounded-full text-sm border transition-all
                ${isActive
                                        ? 'bg-black text-white border-black'
                                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                                    }
              `}
                            >
                                {tag}
                            </span>
                        );
                    })}
                </div>}
            </div>
        </div>
    );
};

export default TagsFilter;