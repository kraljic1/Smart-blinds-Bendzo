import React from 'react';
import styles from '../ImageZoomModal.module.css';

interface ZoomableImageProps {
  imageUrl: string;
  altText: string;
  position: { x: number; y: number };
  scale: number;
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

/**
 * Zoomable and draggable image component
 * Handles image display with zoom and pan functionality
 */
const ZoomableImage: React.FC<ZoomableImageProps> = ({
  imageUrl,
  altText,
  position,
  scale,
  isDragging,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave
}) => {
  // Calculate transform styles
  const imageTransform = `translate(${position.x}px, ${position.y}px) scale(${scale})`;
  const cursorClass = isDragging ? styles.grabbingCursor : styles.grabCursor;

  return (
    <div 
      className={`relative overflow-hidden ${styles.imageContainer}`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      <img 
        src={imageUrl} 
        alt={altText}
        className={`${styles.zoomedImage} ${cursorClass}`}
        style={{ transform: imageTransform }}
        draggable="false"
      />
    </div>
  );
};

export default ZoomableImage; 