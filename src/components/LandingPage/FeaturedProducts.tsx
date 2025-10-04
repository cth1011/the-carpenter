'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Product } from '@/payload-types'
import ProductCard from '@/components/ProductCard'

interface FeaturedProductsProps {
  products?: (Product | number)[] | null | undefined
}

const isProduct = (item: Product | number): item is Product => {
  return typeof item === 'object' && item !== null && 'id' in item
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const validProducts = (products || []).filter(isProduct)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScroll, setCanScroll] = useState({ left: false, right: false })

  const updateScrollability = useCallback(() => {
    const container = scrollContainerRef.current
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container
      setCanScroll({
        left: scrollLeft > 0,
        right: scrollLeft < scrollWidth - clientWidth - 1, // -1 for precision
      })
    }
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      updateScrollability()
      container.addEventListener('scroll', updateScrollability)
      const resizeObserver = new ResizeObserver(updateScrollability)
      resizeObserver.observe(container)

      return () => {
        container.removeEventListener('scroll', updateScrollability)
        resizeObserver.unobserve(container)
      }
    }
  }, [validProducts.length, updateScrollability])

  if (validProducts.length === 0) {
    return null
  }

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = current.clientWidth / 2
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-2">
              Our <em className="font-serif">Collections</em>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/products">
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wider hover:text-gray-900 transition-colors">
                Shop Customer Favorites
              </span>
            </Link>
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScroll.left}
                className="p-2 rounded-full transition-colors group disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-8 h-8 stroke-1 text-gray-500 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-gray-900 group-disabled:translate-x-0 group-disabled:text-gray-500" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScroll.right}
                className="p-2 rounded-full transition-colors group disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-8 h-8 stroke-1 text-gray-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-gray-900 group-disabled:translate-x-0 group-disabled:text-gray-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-4 -mb-4 scrollbar-hide"
        >
          {validProducts.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-full md:w-1/2 lg:w-1/4"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
