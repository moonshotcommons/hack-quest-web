'use client';

import * as React from 'react';
import Image from 'next/image';

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = '/images/hackathon/placeholder.png',
  ...props
}: {
  fallbackSrc?: string;
} & React.ComponentProps<typeof Image>) {
  const [isError, setIsError] = React.useState(false);
  return <Image src={isError ? fallbackSrc : src} alt={alt} onError={() => setIsError(true)} {...props} />;
}
