import React from 'react';
import { LazyBlurredImage, LazyBlurredImageProps } from './LazyBlurredImage';

export type ImageWithFallbackProps = LazyBlurredImageProps;

/**
 * ImageWithFallback - Resilient lazy-loaded image component with blurred placeholder effect.
 * Wraps LazyBlurredImage for backwards-compatibility and progressive resilience.
 */
export const ImageWithFallback: React.FC<ImageWithFallbackProps> = (props) => {
  return <LazyBlurredImage {...props} />;
};

export default ImageWithFallback;
