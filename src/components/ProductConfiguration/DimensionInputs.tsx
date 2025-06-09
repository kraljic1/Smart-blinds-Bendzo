/**
 * Dimension inputs component for width and height fields
 */

import { formatDimensionRange, DEFAULT_DIMENSION_CONSTRAINTS } from '../../utils/dimensionValidation';

interface DimensionInputsProps {
  width: number | '';
  height: number | '';
  onWidthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onHeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWidthBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onHeightBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  isVisible: boolean;
  animationFinished: boolean;
}

const DimensionInputs = ({
  width,
  height,
  onWidthChange,
  onHeightChange,
  onWidthBlur,
  onHeightBlur,
  isVisible,
  animationFinished
}: DimensionInputsProps) => {
  return (
    <div className="grid sm:grid-cols-2 gap-4 mb-4">
      <div 
        className={`${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} 
        style={{ animationDelay: '350ms' }}
      >
        <label 
          htmlFor="product-width" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Width
        </label>
        <input
          id="product-width"
          name="product-width"
          type="number"
          min="30"
          max="350"
          placeholder={formatDimensionRange(DEFAULT_DIMENSION_CONSTRAINTS)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white product-configuration-input"
          value={width}
          onChange={onWidthChange}
          onBlur={onWidthBlur}
          autoComplete="off"
        />
      </div>
      <div 
        className={`${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`} 
        style={{ animationDelay: '400ms' }}
      >
        <label 
          htmlFor="product-height" 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Height
        </label>
        <input
          id="product-height"
          name="product-height"
          type="number"
          min="30"
          max="350"
          placeholder={formatDimensionRange(DEFAULT_DIMENSION_CONSTRAINTS)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white product-configuration-input"
          value={height}
          onChange={onHeightChange}
          onBlur={onHeightBlur}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default DimensionInputs; 