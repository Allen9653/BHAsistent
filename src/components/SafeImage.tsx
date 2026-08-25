import React from 'react';
import { LazyBlurredImage, LazyBlurredImageProps } from './LazyBlurredImage';

export type SafeImageProps = LazyBlurredImageProps;

/**
 * SafeImage - Custom lazy image wrapper with blurred placeholder effect,
 * progressive loading, aspect-ratio preservation, and resilient CDN fallback.
 */
export const SafeImage: React.FC<SafeImageProps> = (props) => {
  return <LazyBlurredImage {...props} />;
};

export default SafeImage;
