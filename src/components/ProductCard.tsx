'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product, Media } from '@/payload-types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const mainImage = product.legacyImageUrl as string
  const hoverImage = product.productImages?.[1]?.image as Media

  const imageUrl =
    isHovered && hoverImage?.url
      ? hoverImage.url
      : mainImage || '/placeholder-door.svg'
  const imageAlt = mainImage || product.name

  return (
    <Link href={`/products/${product.id}`} className="block group h-full">
      <div
        className="relative bg-white overflow-hidden border h-full border-gray-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] bg-white overflow-hidden">
          {/* Product Image */}
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-contain p-2 transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          {/* Quick View Button Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="text-center py-6 px-4 w-full uppercase text-xs font-semibold tracking-wider bg-white text-black hover:bg-primary hover:text-white transition-colors duration-500">
              Quick View
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 flex items-center justify-between flex-grow">
          <div className="w-full">
            <h3 className=" text-gray-900 mb-1 uppercase font-bold">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 capitalize">
              {typeof product.category === 'object' && product.category !== null
                ? product.category.name
                : ''}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}
