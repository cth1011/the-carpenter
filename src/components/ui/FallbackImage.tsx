'use client'

import { useState, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'

export interface FallbackImageProps extends ImageProps {
  fallbackSrc?: string
}

export function FallbackImage({
  src,
  fallbackSrc = '/placeholder-door.svg',
  ...props
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState(src)

  useEffect(() => {
    setImgSrc(src)
  }, [src])

  return (
    <Image
      {...props}
      src={imgSrc}
      onError={() => setImgSrc(fallbackSrc)}
    />
  )
}
