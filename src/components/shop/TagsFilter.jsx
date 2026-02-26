import React from "react";

const TagsFilter = ({ tags = [], selectedTags = [], handleCheckboxChange }) => {
    if (!tags.length) return null;

    return (
        <div>
            <div className="font-bold py-3">Tags</div>
            <div className="flex flex-wrap gap-2">
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
            </div>
        </div>
    );
};

export default TagsFilter;