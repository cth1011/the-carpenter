'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useQuotationStore } from '@/store/quotation'
import { Button } from '@/components/ui/button'
import { Plus, Minus, TreeDeciduous, Ruler, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/payload-types'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { useLivePreview } from '@payloadcms/live-preview-react'

const DimensionSelector = dynamic(
  () => import('@/components/DimensionSelector'),
  {
    ssr: false,
    loading: () => <Skeleton className="h-20 w-full" />,
  }
)

export function ProductDetailClient({
  initialProduct,
}: {
  initialProduct: Product
}) {
  const { data: liveData } = useLivePreview<Product>({
    initialData: initialProduct,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2,
  })

  // Ensure liveData is actually a Product (avoid conflict with other hooks like Header)
  const product = liveData && 'name' in liveData ? liveData : initialProduct

  const { addToQuotation } = useQuotationStore()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedDimensions, setSelectedDimensions] = useState<{
    thickness?: string
    width?: string
    height?: string
  }>({})

  useEffect(() => {
    if (product?.dimensions) {
      const initialDimensions: typeof selectedDimensions = {}
      if (product.dimensions.thickness?.[0]) {
        initialDimensions.thickness = product.dimensions.thickness[0].value
      }
      if (product.dimensions.width?.[0]) {
        initialDimensions.width = product.dimensions.width[0].value
      }
      if (product.dimensions.height?.[0]) {
        initialDimensions.height = product.dimensions.height[0].value
      }
      setSelectedDimensions(initialDimensions)
    }
  }, [product])

  const handleDimensionSelect = (
    dimension: 'thickness' | 'width' | 'height',
    value: string
  ) => {
    setSelectedDimensions((prev) => ({ ...prev, [dimension]: value }))
  }

  const handleAddToQuotation = () => {
    if (product) {
      addToQuotation(product, selectedDimensions, quantity)
    }
  }

  const hasDimensions =
    (product?.dimensions?.thickness?.length ?? 0) > 0 ||
    (product?.dimensions?.width?.length ?? 0) > 0 ||
    (product?.dimensions?.height?.length ?? 0) > 0

  if (!product) return null

  const mainImage =
    (typeof product.productImages?.[selectedImageIndex]?.image === 'object' &&
      product.productImages?.[selectedImageIndex]?.image?.url) ||
    '/placeholder-door.svg'
  const imageAlt =
    (typeof product.productImages?.[selectedImageIndex]?.image === 'object' &&
      product.productImages?.[selectedImageIndex]?.image?.alt) ||
    product.name

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/products">Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid lg:grid-cols-2 gap-12 overflow-hidden">
          {/* Product Images */}
          <div className="w-full overflow-hidden">
            <div className="relative h-64 sm:h-96 lg:h-[500px] mb-4 w-full">
              <Image
                src={mainImage}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain bg-white"
                priority
              />
            </div>

            {/* Thumbnail Images */}
            {product.productImages && product.productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      'relative h-20 rounded-lg overflow-hidden border-2',
                      selectedImageIndex === index
                        ? 'border-amber-500'
                        : 'border-gray-200'
                    )}
                  >
                    <Image
                      src={
                        typeof image.image === 'object'
                          ? image.image.url || ''
                          : ''
                      }
                      alt={
                        (typeof image.image === 'object' && image.image.alt) ||
                        ''
                      }
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                {typeof product.category === 'object' &&
                product.category !== null
                  ? product.category.name
                  : ''}
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {product.description && (
              <div className="prose prose-gray max-w-none mb-8">
                <p>{product.description}</p>
              </div>
            )}

            {/* Dimensions */}
            {hasDimensions && (
              <fieldset className="mb-8">
                <legend className="text-lg font-medium mb-4">
                  Dimension Options
                </legend>
                <div className="grid grid-cols-1 gap-4">
                  <DimensionSelector
                    name="thickness"
                    label="Thickness"
                    options={product.dimensions?.thickness || []}
                    selectedValue={selectedDimensions.thickness}
                    onSelect={(value) =>
                      handleDimensionSelect('thickness', value)
                    }
                  />
                  <DimensionSelector
                    name="width"
                    label="Width"
                    options={product.dimensions?.width || []}
                    selectedValue={selectedDimensions.width}
                    onSelect={(value) => handleDimensionSelect('width', value)}
                  />
                  <DimensionSelector
                    name="height"
                    label="Height"
                    options={product.dimensions?.height || []}
                    selectedValue={selectedDimensions.height}
                    onSelect={(value) => handleDimensionSelect('height', value)}
                  />
                </div>
              </fieldset>
            )}

            {/* Add to Quotation */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center hover:border-gray-600 transition-all duration-400 border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 "
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 text-center min-w-[60px]">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleAddToQuotation}
                  size="lg"
                  variant="outline"
                  className="w-full"
                >
                  Add to Quotation
                </Button>
              </div>

              <p className="text-sm text-gray-500 mt-2 text-left">
                No prices displayed - contact us for a personalized quote
              </p>
            </div>
            {/* New Features Section */}
            <div className="mt-8">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <div className="flex items-center">
                  <TreeDeciduous className="mr-2 h-5 w-5 text-primary-500" />
                  High-Quality Materials
                </div>
                <div className="flex items-center">
                  <Ruler className="mr-2 h-5 w-5 text-primary-500" />
                  Customizable Sizes
                </div>
                <div className="flex items-center">
                  <Truck className="mr-2 h-5 w-5 text-primary-500" />
                  Nationwide Delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
