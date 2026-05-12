import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProductCard from './ProductCard'
import { Product } from '@/payload-types'

const mockProduct: Product = {
  id: 1,
  name: 'Test Door',
  description: 'A test door description',
  productImages: [
    {
      image: {
        id: 1,
        alt: 'A test door',
        url: '/test-door.jpg',
        createdAt: '',
        updatedAt: '',
      },
    },
  ],
  category: { id: 1, name: 'Test Category', createdAt: '', updatedAt: '' },
  updatedAt: '',
  createdAt: '',
}

describe('ProductCard', () => {
  it('should render product information correctly', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Door')).toBeInTheDocument()
    expect(screen.getByText('Test Category')).toBeInTheDocument()
  })

  it('should link to the correct product page', () => {
    render(<ProductCard product={mockProduct} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', `/products/${mockProduct.id}`)
  })

  it('should render the Quick View button', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Quick View')).toBeInTheDocument()
  })

  it('should fallback to placeholder if image fails to load', () => {
    render(<ProductCard product={mockProduct} />)
    const img = screen.getByRole('img')
    fireEvent.error(img)
    // Next.js Image component might prefix the URL or use a loader
    expect(img).toHaveAttribute('src')
    const src = img.getAttribute('src')
    expect(src).toContain('placeholder-door.svg')
  })
})

