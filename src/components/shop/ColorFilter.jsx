
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const ColorFilter = ({ colors = [], selectedColors = [], onChange }) => {
    const [open, setOpen] = useState(true);

    const isValidColor = (c) => {
        const s = new Option().style;
        s.color = c;
        return s.color !== "";
    };

    return (
        <div className="mb-4">
            <div
                className="cursor-pointer font-bold py-3 flex justify-between"
                onClick={() => setOpen(!open)}
            >
                Color <BsChevronDown />
            </div>

            {open && (
                <div className="flex flex-wrap gap-2">
                    {colors.map((color) => {
                        const isSelected = selectedColors.includes(color);
                        const backgroundColor = isValidColor(color)
                            ? color
                            : `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;

                        return (
                            <div
                                key={color}
                                onClick={() => onChange("color", color)}
                                className={`w-8 h-8 rounded-lg border-2 cursor-pointer transition-all duration-200 ${isSelected
                                        ? "ring-2 ring-offset-2 ring-blue-500 animate-pulse"
                                        : "border-gray-400 ring-offset-1 hover:ring-2 ring-blue-300"
                                    }`}
                                style={{ backgroundColor }}
                                title={color}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ColorFilter;