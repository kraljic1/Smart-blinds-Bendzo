import React from 'react';
import DimensionInputs from '../DimensionInputs';
import CalculatePriceButton from '../CalculatePriceButton';

interface DimensionSectionProps {
 width: number | '';
 height: number | '';
 onWidthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 onHeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
 onWidthBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
 onHeightBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
 onCalculatePrice: () => void;
 isVisible: boolean;
 animationFinished: boolean;
}

export function DimensionSection({
 width,
 height,
 onWidthChange,
 onHeightChange,
 onWidthBlur,
 onHeightBlur,
 onCalculatePrice,
 isVisible,
 animationFinished
}: DimensionSectionProps) {
 return (
 <>
 <DimensionInputs
 width={width}
 height={height}
 onWidthChange={onWidthChange}
 onHeightChange={onHeightChange}
 onWidthBlur={onWidthBlur}
 onHeightBlur={onHeightBlur}
 isVisible={isVisible}
 animationFinished={animationFinished}
 />
 <CalculatePriceButton
 onCalculatePrice={onCalculatePrice}
 isVisible={isVisible}
 animationFinished={animationFinished}
 />
 </>
 );
} 