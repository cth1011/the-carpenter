# Design System Documentation

## Overview

This design system is inspired by the [Shopify Aesthetic theme](https://themes.shopify.com/themes/aesthetic/presets/aesthetic?surface_detail=minimalist&surface_inter_position=1&surface_intra_position=10&surface_type=collection) and follows minimalist design principles with refined typography, balanced layouts, and immersive brand storytelling. The system prioritizes visual hierarchy, image-first sections, and sales-focused functionality.

## Design Principles

### 1. Minimalist & Balanced Design

- **Clean layouts** with generous white space
- **Visual hierarchy** through typography and spacing
- **Image-first approach** for product presentation
- **Balanced proportions** across all components

### 2. Sales-Focused Functionality

- **Quick view** capabilities for products
- **Image galleries** with zoom functionality
- **Product badges** and stock counters
- **Upsells** and recommended products

### 3. Immersive Brand Storytelling

- **Large hero sections** with compelling imagery
- **Story-driven content** sections
- **Consistent brand voice** throughout
- **Emotional connection** through design

## Color Palette

### Primary Colors

```css
/* Amber/Gold - Primary Brand Color */
--color-primary: #f59e0b; /* amber-500 */
--color-primary-light: #fcd34d; /* amber-300 */
--color-primary-dark: #d97706; /* amber-600 */

/* Neutral Grays */
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827;
```

### Semantic Colors

```css
/* Success */
--color-success: #10b981; /* emerald-500 */
--color-success-light: #34d399; /* emerald-400 */

/* Warning */
--color-warning: #f59e0b; /* amber-500 */
--color-warning-light: #fcd34d; /* amber-300 */

/* Error */
--color-error: #ef4444; /* red-500 */
--color-error-light: #f87171; /* red-400 */

/* Info */
--color-info: #3b82f6; /* blue-500 */
--color-info-light: #60a5fa; /* blue-400 */
```

## Typography

### Font Stack

```css
/* Primary Font - Inter */
font-family:
  'Inter',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  sans-serif;

/* Display Font - For headlines */
font-family: 'Inter', sans-serif;
```

### Type Scale

```css
/* Display Large - Hero headlines */
.text-6xl md:text-7xl font-bold tracking-tighter

/* Display Medium - Section headlines */
.text-4xl md:text-5xl font-bold tracking-tight

/* Display Small - Card headlines */
.text-2xl md:text-3xl font-bold tracking-tight

/* Heading Large - Page titles */
.text-3xl md:text-4xl font-bold

/* Heading Medium - Section titles */
.text-2xl font-bold

/* Heading Small - Card titles */
.text-xl font-semibold

/* Body Large - Main content */
.text-lg leading-relaxed

/* Body Medium - Regular content */
.text-base leading-relaxed

/* Body Small - Captions, metadata */
.text-sm leading-relaxed

/* Caption - Small text, labels */
.text-xs font-medium uppercase tracking-wider
```

### Typography Classes

```tsx
// Hero Headlines
className = 'text-4xl md:text-6xl font-bold tracking-tighter'

// Section Headlines
className = 'text-3xl md:text-4xl font-bold'

// Card Titles
className = 'text-xl font-semibold'

// Body Text
className = 'text-base md:text-lg leading-relaxed text-gray-600'

// Captions
className = 'text-sm font-medium uppercase tracking-wider text-gray-500'
```

## Spacing System

### Base Spacing Units

```css
/* Tailwind spacing scale */
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
--space-24: 6rem; /* 96px */
```

### Layout Spacing

```tsx
// Page sections
className = 'py-16 md:py-24'

// Component spacing
className = 'space-y-6 md:space-y-8'

// Card padding
className = 'p-6 md:p-8'

// Button padding
className = 'px-6 py-3 md:px-8 md:py-4'
```

## Layout System

### Container Widths

```tsx
// Full width container
className = 'w-full'

// Content container
className = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'

// Narrow container for forms
className = 'max-w-2xl mx-auto px-4'

// Wide container for hero sections
className = 'max-w-screen-xl mx-auto px-4'
```

### Grid System

```tsx
// Product grid
className = 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'

// Two-column layout
className = 'grid lg:grid-cols-2 gap-12'

// Three-column layout
className = 'grid md:grid-cols-3 gap-8'
```

## Component Patterns

### 1. Hero Sections

```tsx
// Full-height hero
<section className="relative h-[95vh] w-full">
  <Image
    src={heroImage}
    alt="Hero image"
    fill
    className="object-cover"
    priority
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center pb-20 px-4">
    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
      Doors that Welcome, Wood that Lasts
    </h1>
    <p className="mt-4 max-w-xl text-lg text-white">
      Create a lasting first impression with doors that feel like home.
    </p>
    <Button asChild className="mt-8">
      <Link href="/products">EXPLORE NOW</Link>
    </Button>
  </div>
</section>
```

### 2. Product Cards

```tsx
// Product card structure
<Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
  <CardHeader className="p-0">
    <div className="relative h-64 w-full">
      <Image
        src={productImage}
        alt={productName}
        fill
        className="object-cover"
      />
    </div>
  </CardHeader>

  <CardContent className="p-4">
    <div className="mb-2">
      <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
        {category}
      </span>
    </div>

    <CardTitle className="text-lg mb-2 line-clamp-2">{productName}</CardTitle>

    <p className="text-sm text-gray-600 mb-3 line-clamp-3">{description}</p>
  </CardContent>
</Card>
```

### 3. Section Headers

```tsx
// Section header pattern
<div className="text-center mb-12">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
    Our Door Collection
  </h2>
  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
    Discover our handcrafted doors, each piece carefully designed and built to
    enhance your living spaces
  </p>
</div>
```

### 4. Feature Cards

```tsx
// Feature card pattern
<Card className="text-center border-0 shadow-lg">
  <CardHeader>
    <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-amber-600" />
    </div>
    <CardTitle className="text-xl">Premium Quality</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-gray-600">
      Each door is crafted with the finest materials and attention to detail
    </p>
  </CardContent>
</Card>
```

## Button System

### Button Variants

```tsx
// Primary button
<Button size="lg" className="text-lg px-8 py-4">
  EXPLORE NOW
</Button>

// Secondary button
<Button variant="outline" size="lg" className="text-lg px-8 py-4">
  Learn More
</Button>

// Ghost button
<Button variant="ghost" size="sm">
  View Details
</Button>
```

### Button Sizes

```tsx
// Small
className = 'h-9 px-3 text-sm'

// Medium (default)
className = 'h-10 px-4 py-2'

// Large
className = 'h-11 px-8 text-lg'

// Extra Large
className = 'h-12 px-8 py-4 text-lg'
```

## Form Design

### Input Fields

```tsx
// Standard input
<input
  type="text"
  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
/>

// Form group
<div className="space-y-4">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Full Name *
    </label>
    <input
      type="text"
      required
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
    />
  </div>
</div>
```

## Image Guidelines

### Image Sizes

```tsx
// Hero images
className = 'h-[95vh] w-full object-cover'

// Product card images
className = 'h-64 w-full object-cover'

// Product detail images
className = 'h-96 lg:h-[500px] w-full object-cover'

// Thumbnail images
className = 'h-20 w-20 object-cover rounded'
```

### Image Optimization

```tsx
// Next.js Image component usage
<Image
  src={imageUrl}
  alt={altText}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={isHero}
/>
```

## Animation & Transitions

### Hover Effects

```tsx
// Card hover
className = 'hover:shadow-lg transition-shadow duration-300'

// Button hover
className = 'hover:bg-amber-600 transition-colors duration-200'

// Link hover
className = 'hover:text-amber-600 transition-colors duration-200'
```

### Loading States

```tsx
// Skeleton loading
<Skeleton className="h-64 w-full rounded-t-lg" />

// Loading spinner
<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto" />
```

## Responsive Design

### Breakpoints

```css
/* Mobile first approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktop */
2xl: 1536px /* Large desktop */
```

### Responsive Patterns

```tsx
// Responsive text
className = 'text-2xl md:text-4xl lg:text-6xl'

// Responsive spacing
className = 'py-8 md:py-16 lg:py-24'

// Responsive grid
className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
```

## Accessibility

### Color Contrast

- **Text on light backgrounds**: Minimum 4.5:1 ratio
- **Large text**: Minimum 3:1 ratio
- **Interactive elements**: High contrast for focus states

### Focus States

```tsx
// Focus ring
className = 'focus:ring-2 focus:ring-amber-500 focus:ring-offset-2'

// Focus visible
className =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500'
```

### Screen Reader Support

```tsx
// Semantic HTML
<button aria-label="Add to quotation">
  <Plus className="h-4 w-4" />
</button>

// Loading states
<div role="status" aria-live="polite">
  <Skeleton className="h-6 w-32" />
</div>
```

## Performance Guidelines

### Image Optimization

- Use Next.js Image component for automatic optimization
- Implement lazy loading for below-the-fold images
- Use appropriate image formats (WebP, AVIF)
- Optimize image sizes for different screen sizes

### Code Splitting

- Use dynamic imports for heavy components
- Implement route-based code splitting
- Lazy load non-critical components

### CSS Optimization

- Use Tailwind's purge feature to remove unused styles
- Minimize custom CSS
- Use CSS-in-JS sparingly

## Brand Guidelines

### Voice & Tone

- **Professional yet approachable**
- **Craftsmanship-focused**
- **Quality-driven**
- **Customer-centric**

### Visual Identity

- **Minimalist aesthetic**
- **Warm, natural colors**
- **Clean typography**
- **High-quality imagery**
- **Consistent spacing**

This design system ensures consistency across all components and pages while maintaining the refined, minimalist aesthetic inspired by the Shopify Aesthetic theme.
