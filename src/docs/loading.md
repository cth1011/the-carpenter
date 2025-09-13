# Loading States Documentation

## Overview

This document outlines the loading state patterns and usage of the `Skeleton` component throughout The Carpenter e-commerce website. Consistent loading states provide better user experience and maintain visual hierarchy during data fetching.

## Skeleton Component

The `Skeleton` component is a simple loading placeholder that uses Tailwind's `animate-pulse` class to create a subtle loading animation.

```tsx
import { Skeleton } from '@/components/ui/skeleton'

// Basic usage
;<Skeleton className="h-4 w-full" />
```

## Loading Patterns

### 1. Product Cards

**Use Case**: Loading product grid on products page

```tsx
// ProductCardSkeleton.tsx
export function ProductCardSkeleton() {
  return (
    <div className="rounded-lg border bg-card shadow-sm">
      {/* Image placeholder */}
      <div className="relative h-64 w-full">
        <Skeleton className="h-full w-full rounded-t-lg" />
      </div>

      <div className="p-4 space-y-3">
        {/* Category badge */}
        <Skeleton className="h-3 w-20" />

        {/* Product title */}
        <Skeleton className="h-6 w-3/4" />

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Specifications */}
        <div className="space-y-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-28" />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 flex-1" />
          <Skeleton className="h-9 flex-1" />
        </div>
      </div>
    </div>
  )
}

// Usage in Products page
{loading ? (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: 8 }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
) : (
  // Actual products
)}
```

### 2. Product Detail Page

**Use Case**: Loading individual product information

```tsx
// ProductDetailSkeleton.tsx
export function ProductDetailSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-12">
      {/* Image gallery */}
      <div>
        <Skeleton className="h-96 lg:h-[500px] w-full rounded-lg mb-4" />
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded" />
          ))}
        </div>
      </div>

      {/* Product info */}
      <div className="space-y-6">
        <Skeleton className="h-3 w-24" /> {/* Category */}
        <Skeleton className="h-12 w-3/4" /> {/* Title */}
        <Skeleton className="h-4 w-20" /> {/* Status badge */}
        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        {/* Specifications */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
        {/* Add to quotation */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    </div>
  )
}
```

### 3. Quotation Page

**Use Case**: Loading quotation items and form

```tsx
// QuotationSkeleton.tsx
export function QuotationSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Quotation items */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-20" />
        </div>

        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-4 p-4 border rounded-lg">
            <Skeleton className="w-20 h-20 rounded" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
              <Skeleton className="h-6 w-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Contact form */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  )
}
```

### 4. Navigation Loading

**Use Case**: Loading quotation count in header

```tsx
// In Header component
const { getItemCount, isLoaded } = useQuotationContext()

// Show skeleton while loading
{
  !isLoaded ? (
    <Skeleton className="h-5 w-5 rounded-full" />
  ) : (
    getItemCount() > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        {getItemCount()}
      </span>
    )
  )
}
```

### 5. Search and Filter Loading

**Use Case**: Loading search results

```tsx
// SearchResultsSkeleton.tsx
export function SearchResultsSkeleton() {
  return (
    <div className="space-y-4">
      {/* Results count */}
      <Skeleton className="h-4 w-32" />

      {/* Filters */}
      <div className="flex gap-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>

      {/* Results grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}
```

### 6. Page-Level Loading

**Use Case**: Full page loading states

```tsx
// PageLoadingSkeleton.tsx
export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page header */}
        <div className="text-center mb-8">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
```

## Best Practices

### 1. Consistent Dimensions

- Match skeleton dimensions to actual content
- Use realistic proportions for text and images
- Maintain consistent spacing

### 2. Loading States Hierarchy

```tsx
// Priority order for loading states
1. Critical content (product images, titles)
2. Secondary content (descriptions, specifications)
3. Interactive elements (buttons, forms)
4. Decorative elements (badges, icons)
```

### 3. Performance Considerations

- Show skeletons immediately when navigation starts
- Use `isLoaded` flags from data fetching hooks
- Implement progressive loading for large lists

### 4. Accessibility

```tsx
// Add aria-label for screen readers
<Skeleton className="h-4 w-full" aria-label="Loading product information" />

// Use role for semantic meaning
<div role="status" aria-live="polite">
  <Skeleton className="h-6 w-32" />
</div>
```

## Implementation Examples

### Products Page

```tsx
export default function ProductsPage() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts().finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    // Actual products content
  )
}
```

### Product Detail Page

```tsx
export default function ProductDetailPage() {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProduct().finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <ProductDetailSkeleton />
        </div>
      </div>
    )
  }

  return (
    // Actual product detail content
  )
}
```

## Custom Skeleton Variants

### Text Skeletons

```tsx
// Different text sizes
<Skeleton className="h-4 w-full" /> // Small text
<Skeleton className="h-6 w-3/4" />  // Medium text
<Skeleton className="h-8 w-1/2" />  // Large text
<Skeleton className="h-12 w-2/3" /> // Title text
```

### Image Skeletons

```tsx
// Product images
<Skeleton className="h-64 w-full rounded-t-lg" /> // Product card
<Skeleton className="h-96 w-full rounded-lg" />   // Product detail
<Skeleton className="h-20 w-20 rounded" />        // Thumbnail
```

### Button Skeletons

```tsx
// Different button sizes
<Skeleton className="h-9 w-20" />   // Small button
<Skeleton className="h-10 w-32" />  // Medium button
<Skeleton className="h-12 w-40" />  // Large button
```

This loading system ensures a consistent and professional user experience across all pages of The Carpenter e-commerce website.
