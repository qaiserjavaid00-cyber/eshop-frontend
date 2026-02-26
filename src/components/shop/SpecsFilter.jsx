import React from "react";

const SpecFilter = ({
    specifications = {},
    selectedSpecs = {},
    onChange,
}) => {
    return (
        <div className="flex flex-col gap-3">
            <h2 className="font-semibold text-lg">Specifications</h2>

            {Object.entries(specifications).map(([key, values]) => (
                <div key={key} className="flex flex-col gap-1">
                    <h3 className="font-medium text-sm">{key}</h3>

                    {values.map((value) => {
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
    );
};

export default SpecFilter;