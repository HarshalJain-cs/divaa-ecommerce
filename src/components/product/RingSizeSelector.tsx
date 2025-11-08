/**
 * @component RingSizeSelector
 * @description Size selector component for rings with visual feedback
 */
import { useState } from 'react';
import { Ruler, Info } from 'lucide-react';

interface RingSize {
  id: string;
  size: string;
  diameter: string; // in MM
}

interface RingSizeSelectorProps {
  availableSizes?: RingSize[];
  onSizeSelect?: (size: RingSize) => void;
  selectedSize?: string | null;
}

const RingSizeSelector: React.FC<RingSizeSelectorProps> = ({
  availableSizes,
  onSizeSelect,
  selectedSize = null
}) => {
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [localSelectedSize, setLocalSelectedSize] = useState<string | null>(selectedSize);

  // Default ring sizes if none provided (common Indian sizes)
  const defaultSizes: RingSize[] = [
    { id: '1', size: '16.40 MM', diameter: '16.40' },
    { id: '2', size: '16.80 MM', diameter: '16.80' },
    { id: '3', size: '17.20 MM', diameter: '17.20' },
  ];

  const sizes = availableSizes || defaultSizes;

  const handleSizeClick = (size: RingSize) => {
    setLocalSelectedSize(size.size);
    if (onSizeSelect) {
      onSizeSelect(size);
    }
  };

  return (
    <div className="container cont-1 w-full">
      <div className="box box-1 bg-white rounded-lg border border-gray-200 p-4">
        {/* Header */}
        <div className="row justify-content-center align-items-center g-2 mb-4">
          <div className="col-12 col-md-12 col-sm-12 choose-size-1 flex items-center gap-2 text-gray-800">
            <Ruler className="size-icon w-5 h-5 text-rose-gold-dark" />
            <span className="font-semibold">Choose Size</span>
          </div>
        </div>

        {/* Size Guide Link */}
        <button
          onClick={() => setShowSizeGuide(!showSizeGuide)}
          className="size-guide-message size-guide-button guide-1 flex items-center gap-2 text-rose-gold-dark hover:text-blush text-sm font-medium mb-4 transition-colors"
        >
          <Info className="w-4 h-4" />
          Size Guide
        </button>

        {/* Size Guide Modal/Info */}
        {showSizeGuide && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Ring Size Guide</h4>
            <p className="text-sm text-gray-600 mb-2">
              To find your ring size, measure the inner diameter of a ring that fits you well.
            </p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• 16.40 MM = Size 12 (US) / L (UK)</li>
              <li>• 16.80 MM = Size 13 (US) / M (UK)</li>
              <li>• 17.20 MM = Size 14 (US) / N (UK)</li>
            </ul>
          </div>
        )}

        {/* Hidden Select (for form submission if needed) */}
        <select className="custom-select form-control d-none select-size" id="size-1">
          {sizes.map((size) => (
            <option
              key={size.id}
              value={size.size}
              data-attr-value={size.size}
              selected={localSelectedSize === size.size}
            >
              {size.size}
            </option>
          ))}
        </select>

        {/* Custom Dropdown (Visual) */}
        <div className="custom-drop-down d-none bg-white border border-gray-300 rounded-lg px-4 py-3 mb-3 flex items-center justify-between cursor-pointer hover:border-rose-gold-dark transition-colors">
          <span className="selected-value font-medium text-gray-800">
            {localSelectedSize || 'Select Size'}
          </span>
          <i id="arrowDown" className="fa fa-angle-down down-arrow text-gray-500"></i>
        </div>

        {/* Option Values - Clickable Size Buttons */}
        <div className="option-values productVariations option-values-second">
          <ul className="m-0 p-0 flex gap-3 flex-wrap">
            {sizes.map((size) => (
              <li
                key={size.id}
                className={`option-value custom-variant-size px-4 py-3 border rounded-lg cursor-pointer transition-all font-medium ${
                  localSelectedSize === size.size
                    ? 'border-rose-gold-dark bg-rose-gold/10 text-rose-gold-dark active'
                    : 'border-gray-300 text-gray-700 hover:border-rose-gold-dark hover:bg-gray-50'
                }`}
                onClick={() => handleSizeClick(size)}
                data-attr-value={size.size}
              >
                {size.size}
              </li>
            ))}
          </ul>
        </div>

        {/* Selected Size Display */}
        {localSelectedSize && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              ✓ Selected size: <span className="font-semibold">{localSelectedSize}</span>
            </p>
          </div>
        )}

        {/* Size Not Available? */}
        <div className="mt-4 text-center">
          <button className="text-sm text-gray-600 hover:text-rose-gold-dark transition-colors">
            Size not available? Contact us
          </button>
        </div>

        <div className="hidden-variation-div" data-isvariation="variation-drop-down" hidden></div>
      </div>
    </div>
  );
};

export default RingSizeSelector;
