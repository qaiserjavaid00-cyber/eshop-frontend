import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

const SpecFilter = ({ specifications = {}, selectedSpecs = {}, onChange, }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className="flex flex-col gap-3">
            <div className="mb-4">
                <div
                    className="cursor-pointer font-bold py-3 flex justify-between"
                    onClick={() => setOpen(!open)}
                >
                    Specs <BsChevronDown />
                </div>

                {Object.entries(specifications).map(([key, values]) => (
                    <div key={key} className="flex flex-col gap-1">
                        <h3 className="font-medium text-sm">{key}</h3>

                        {open && values.map((value) => {
                            const isChecked =
                                selectedSpecs[key]?.includes(value) || false;

                            return (
                                <label key={value} className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => onChange(key, value)}
                                    />
                                    {value}
                                </label>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SpecFilter;