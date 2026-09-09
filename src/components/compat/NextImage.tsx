import React from 'react';

export default function NextImage({
  src,
  alt = '',
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  quality,
  sizes,
  ...props
}: any) {
  const finalClass = fill
    ? `absolute inset-0 w-full h-full object-cover ${className}`
    : className;

  return (
    <img
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={finalClass}
      {...props}
    />
  );
}
