/**
 * Calculate price button component
 */

interface CalculatePriceButtonProps {
  onCalculatePrice: () => void;
  isVisible: boolean;
  animationFinished: boolean;
}

const CalculatePriceButton = ({
  onCalculatePrice,
  isVisible,
  animationFinished
}: CalculatePriceButtonProps) => {
  return (
    <button 
      className={`w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition shimmer-button ${isVisible ? 'reveal-staggered' : 'opacity-0'} ${animationFinished ? 'visible' : ''}`}
      style={{ animationDelay: '450ms' }}
      onClick={onCalculatePrice}
    >
      CALCULATE PRICE
    </button>
  );
};

export default CalculatePriceButton; 