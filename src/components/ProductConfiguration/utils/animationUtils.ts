interface AnimationUtilsProps {
 isVisible: boolean;
 animationFinished: boolean;
}

export const getContainerAnimationClasses = ({ isVisible, animationFinished }: AnimationUtilsProps): string => {
 const baseClasses = 'bg-white rounded-lg border border-gray-200 overflow-hidden modern-card';
 const visibilityClass = isVisible ? 'reveal-staggered' : 'opacity-0';
 const finishedClass = animationFinished ? 'visible' : '';
 
 return `${baseClasses} ${visibilityClass} ${finishedClass}`;
};

export const getContainerAnimationStyle = () => ({
 animationDelay: '500ms'
}); 