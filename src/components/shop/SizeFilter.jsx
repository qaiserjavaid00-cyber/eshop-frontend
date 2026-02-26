import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const SizeFilter = ({ sizes = [], selectedSizes = [], onChange }) => {
    const [open, setOpen] = useState(true);

    return (
        <div className="mb-4">
            <div
                className="cursor-pointer font-bold py-3 flex justify-between"
                onClick={() => setOpen(!open)}
            >
                Size <BsChevronDown />
            </div>

            {open && (
                <div className="flex flex-col gap-1">
                    {sizes.map((size) => (
                        <label key={size} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedSizes.includes(size)}
                                onChange={() => onChange("size", size)}
                            />
                            <span className="ml-2">{size}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SizeFilter;