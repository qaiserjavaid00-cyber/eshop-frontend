import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceFilter = ({ minPrice, maxPrice, selectedRange, onChange }) => {
    return (
        <div className="mb-4">
            <h3 className="font-semibold mb-2">Price</h3>
            <Slider
                range
                min={minPrice}
                max={maxPrice}
                value={selectedRange}
                step={100}
                onChange={onChange.setRange}
                onAfterChange={onChange.commit}
            />
            <div className="flex justify-between text-sm mt-2">
                <span>${selectedRange[0]}</span>
                <span>${selectedRange[1]}</span>
            </div>
        </div>
    );
};

export default PriceFilter;