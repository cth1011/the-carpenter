import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import ProductDetailPage from './page'
import { useQuotationStore } from '@/store/quotation'
import { Product } from '@/payload-types'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useParams: () => ({ id: '1' }),
  useRouter: () => ({}),
}))

// Mock DimensionSelector
vi.mock('@/components/DimensionSelector', () => ({
  default: ({ name, label, options, selectedValue, onSelect }: any) => (
    <div>
      <p>{label}</p>
      {options.map((option: any) => (
        <div key={option.value}>
          <input
            type="radio"
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onSelect(option.value)}
            aria-label={option.value}
          />
          <label htmlFor={`${name}-${option.value}`}>{option.value}</label>
        </div>
      ))}
    </div>
  ),
}))

// Mock the store
const mockAddToQuotation = vi.fn()
vi.mock('@/store/quotation', () => ({
  useQuotationStore: () => ({
    addToQuotation: mockAddToQuotation,
  }),
}))

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  description: 'Test description',
  category: { id: 1, name: 'Test Category', createdAt: '', updatedAt: '' },
  dimensions: {
    thickness: [{ value: '40mm' }, { value: '44mm' }],
    width: [{ value: '800mm' }],
    height: [{ value: '2100mm' }],
  },
  updatedAt: '',
  createdAt: '',
}

describe('ProductDetailPage', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProduct),
      }),
    ) as any
    mockAddToQuotation.mockClear()
  })

  it('should render product details after loading', async () => {
    render(<ProductDetailPage />)
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Test Product' })
      ).toBeInTheDocument()
      expect(screen.getByText('Test description')).toBeInTheDocument()
    })
  })

  it('should allow selecting dimensions and adding to quotation', async () => {
    render(<ProductDetailPage />)
    await waitFor(() => {
      expect(
        screen.getByRole('heading', { name: 'Test Product' })
      ).toBeInTheDocument()
    })

    // Check default selection
    const defaultThickness = await screen.findByLabelText('40mm')
    expect(defaultThickness).toBeChecked()

    // Change selection
    const newThickness = await screen.findByLabelText('44mm')
    fireEvent.click(newThickness)
    expect(newThickness).toBeChecked()

    // Add to quotation
    const addButton = screen.getByRole('button', { name: /add to quotation/i })
    fireEvent.click(addButton)

    expect(mockAddToQuotation).toHaveBeenCalledWith(
      mockProduct,
      {
        thickness: '44mm',
        width: '800mm',
        height: '2100mm',
      },
      1, // quantity
    )
  })
})
