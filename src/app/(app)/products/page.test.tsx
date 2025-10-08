import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter, useSearchParams } from 'next/navigation'
import ProductsPageClient from './ProductsPageClient'

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}))

// Mock the ProductCard component since it's not the focus of these tests
vi.mock('@/components/ProductCard', () => ({
  default: ({ product }: { product: any }) => (
    <div data-testid={`product-${product.id}`}>
      <h3>{product.name}</h3>
    </div>
  ),
}))

// Mock the usePagination hook
vi.mock('@/hooks/usePagination', () => ({
  usePagination: vi.fn(() => [1, 2, 3]),
  DOTS: '...',
}))

// Mock fetch globally
const mockFetch = vi.fn()
global.fetch = mockFetch

describe('ProductsPage', () => {
  const mockRouter = {
    replace: vi.fn(),
  }

  const mockSearchParams = new URLSearchParams()
  const mockSearchParamsGet = vi.fn()

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks()
    mockFetch.mockClear()
    mockRouter.replace.mockClear()

    // Setup default mocks
    ;(useRouter as any).mockReturnValue(mockRouter)
    mockSearchParams.get = mockSearchParamsGet
    ;(useSearchParams as any).mockReturnValue(mockSearchParams)

    // Default search params values
    mockSearchParamsGet.mockImplementation((key: string) => {
      switch (key) {
        case 'page':
          return '1'
        case 'search':
          return ''
        case 'category':
          return ''
        default:
          return null
      }
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  const mockProductsResponse = {
    docs: [
      { id: '1', name: 'Oak Door', category: 'interior' },
      { id: '2', name: 'Pine Door', category: 'exterior' },
    ],
    totalPages: 1,
    totalDocs: 2,
  }

  const mockCategoriesResponse = {
    docs: [
      { id: 'interior', name: 'Interior Doors' },
      { id: 'exterior', name: 'Exterior Doors' },
    ],
  }

  it('fetches and displays products on mount', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockProductsResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      })

    render(<ProductsPageClient />)

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByTestId('product-1')).toBeInTheDocument()
      expect(screen.getByTestId('product-2')).toBeInTheDocument()
    })

    // Verify API calls
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/public/products?page=1&limit=12&depth=2'
    )
    expect(mockFetch).toHaveBeenCalledWith('/api/categories?limit=100')
  })

  it('displays loading state while fetching data', async () => {
    // Mock delayed response
    mockFetch
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                ok: true,
                json: async () => mockProductsResponse,
              })
            }, 100)
          })
      )
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      })

    render(<ProductsPageClient />)

    // Should show loading state (you might need to adjust this selector based on your Skeleton component)
    expect(screen.getByText('0 products')).toBeInTheDocument()

    // Wait for loading to complete
    await waitFor(
      () => {
        expect(screen.getByTestId('product-1')).toBeInTheDocument()
      },
      { timeout: 200 }
    )
  })

  it('handles search functionality with debouncing', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockProductsResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      })

    const user = userEvent.setup()
    render(<ProductsPageClient />)

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByTestId('product-1')).toBeInTheDocument()
    })

    // Type in search input
    const searchInput = screen.getByPlaceholderText('Search doors...')
    await user.type(searchInput, 'oak')

    // Should debounce and update URL after 500ms
    await waitFor(
      () => {
        expect(mockRouter.replace).toHaveBeenCalledWith('?search=oak&page=1')
      },
      { timeout: 600 }
    )
  })

  it('handles category filter changes', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockProductsResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      })

    render(<ProductsPageClient />)

    // Wait for categories to load
    await waitFor(() => {
      expect(screen.getByDisplayValue('All Categories')).toBeInTheDocument()
    })

    // Change category
    const categorySelect = screen.getByDisplayValue('All Categories')
    fireEvent.change(categorySelect, { target: { value: 'interior' } })

    expect(mockRouter.replace).toHaveBeenCalledWith('?category=interior&page=1')
  })

  it('handles pagination correctly', async () => {
    const mockMultiPageResponse = {
      ...mockProductsResponse,
      totalPages: 3,
      totalDocs: 36,
    }

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockMultiPageResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      })

    render(<ProductsPageClient />)

    await waitFor(() => {
      expect(screen.getByTestId('product-1')).toBeInTheDocument()
    })

    // Click on page 2 - look for link with text "2"
    const page2Link = screen.getByRole('link', { name: '2' })
    fireEvent.click(page2Link)

    expect(mockRouter.replace).toHaveBeenCalledWith('?page=2')
  })

  it('displays "no products" message when no results found', async () => {
    const emptyResponse = {
      docs: [],
      totalPages: 0,
      totalDocs: 0,
    }

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => emptyResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      })

    render(<ProductsPageClient />)

    await waitFor(() => {
      expect(
        screen.getByText('No products found matching your criteria.')
      ).toBeInTheDocument()
      expect(screen.getByText('Clear Filters')).toBeInTheDocument()
    })
  })

  it('clears filters when clear button is clicked', async () => {
    // Set up initial state with filters applied
    mockSearchParamsGet.mockImplementation((key: string) => {
      switch (key) {
        case 'page':
          return '2'
        case 'search':
          return 'oak'
        case 'category':
          return 'interior'
        default:
          return null
      }
    })

    const emptyResponse = {
      docs: [],
      totalPages: 0,
      totalDocs: 0,
    }

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => emptyResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      })

    render(<ProductsPageClient />)

    await waitFor(() => {
      expect(screen.getByText('Clear Filters')).toBeInTheDocument()
    })

    // Click clear filters
    const clearButton = screen.getByText('Clear Filters')
    fireEvent.click(clearButton)

    // Should clear search input and update URL
    const searchInput = screen.getByPlaceholderText('Search doors...')
    expect(searchInput).toHaveValue('')
    expect(mockRouter.replace).toHaveBeenCalledWith('?page=1')
  })

  it('handles API errors gracefully', async () => {
    mockFetch
      .mockRejectedValueOnce(new Error('API Error'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      })

    // Mock console.error to avoid noise in tests
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(<ProductsPageClient />)

    // Should show products count as 0 when there's an error
    await waitFor(() => {
      expect(screen.getByText('0 products')).toBeInTheDocument()
    })

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching products:',
      expect.any(Error)
    )
    consoleSpy.mockRestore()
  })

  it('respects initial URL parameters', async () => {
    mockSearchParamsGet.mockImplementation((key: string) => {
      switch (key) {
        case 'page':
          return '2'
        case 'search':
          return 'oak'
        case 'category':
          return 'interior'
        default:
          return null
      }
    })

    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockProductsResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      })

    render(<ProductsPageClient />)

    // Verify API was called with correct parameters
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/public/products?page=2&limit=12&depth=2&category=interior&search=oak'
      )
    })

    // Check that search input has the correct value
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Search doors...')
      expect(searchInput).toHaveValue('oak')
    })
  })

  it('shows correct product count', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockProductsResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      })

    render(<ProductsPageClient />)

    await waitFor(() => {
      expect(screen.getByText('2 products')).toBeInTheDocument()
    })
  })

  it('only searches when input length is 0 or >= 3 characters', async () => {
    mockFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockProductsResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCategoriesResponse,
      })

    const user = userEvent.setup()
    render(<ProductsPageClient />)

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByTestId('product-1')).toBeInTheDocument()
    })

    const searchInput = screen.getByPlaceholderText('Search doors...')

    // Type 2 characters - should not trigger search
    await user.type(searchInput, 'oa')

    // Wait for debounce period
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Should not have called router.replace for the 2-character search
    expect(mockRouter.replace).not.toHaveBeenCalledWith('?search=oa&page=1')

    // Type one more character - should trigger search
    await user.type(searchInput, 'k')

    await waitFor(
      () => {
        expect(mockRouter.replace).toHaveBeenCalledWith('?search=oak&page=1')
      },
      { timeout: 600 }
    )
  })
})
