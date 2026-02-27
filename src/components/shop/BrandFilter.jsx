import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

export const BrandFilter = ({ brands=[], selectedBrands=[], onChange }) => {

  return (
    <div className="mb-4">
        <div
                className="cursor-pointer font-bold py-3 flex justify-between"
                onClick={() => setOpen(!open)}
            >
                Brand <BsChevronDown />
            </div>
      
      {open && <div className="flex flex-col gap-1">
        {brands.map((brand) => (
          <label key={brand} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => onChange('brand', brand)}
            />
            {brand}
          </label>
        ))}
      </div>}
    </div>
  );
};

export default BrandFilter;