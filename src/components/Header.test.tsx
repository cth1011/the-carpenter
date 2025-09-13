import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest'
import Header from './Header'
import HeaderClient from './HeaderClient'
import { useQuotationStore } from '@/store/quotation'
import { usePathname } from 'next/navigation'
import { getPayload } from 'payload'
import { Header as HeaderType } from '@/payload-types'

// Mocks
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

vi.mock('@/store/quotation', () => ({
  useQuotationStore: vi.fn(),
}))

vi.mock('payload', () => ({
  getPayload: vi.fn(),
  buildConfig: vi.fn((config) => config),
}))

const mockHeaderData: HeaderType = {
  id: 1,
  logoText: 'The Carpenter',
  navLinks: [
    { link: '/about', text: 'About', id: '1' },
    { link: '/products', text: 'Products', id: '2' },
    { link: '/contact', text: 'Contact', id: '3' },
  ],
}

describe('Header (Server Component)', () => {
  it('fetches data and renders HeaderClient', async () => {
    ;(useQuotationStore as unknown as Mock).mockReturnValue({
      getItemCount: vi.fn().mockReturnValue(0),
    })
    const findGlobalMock = vi.fn().mockResolvedValue(mockHeaderData)
    ;(getPayload as Mock).mockResolvedValue({
      findGlobal: findGlobalMock,
    })

    // We need to actually render the component to test what it does
    const { container } = render(await Header())

    expect(findGlobalMock).toHaveBeenCalledWith({ slug: 'header' })
    // Check if a specific part of HeaderClient is rendered
    expect(screen.getByText('THE CARPENTER')).toBeInTheDocument()
  })
})

describe('HeaderClient', () => {
  let getItemCountMock: Mock

  beforeEach(() => {
    getItemCountMock = vi.fn()
    ;(useQuotationStore as unknown as Mock).mockReturnValue({
      getItemCount: getItemCountMock,
    })
    // Reset mocks before each test
    vi.clearAllMocks()
  })

  const renderHeader = (pathname: string, itemCount: number) => {
    ;(usePathname as Mock).mockReturnValue(pathname)
    getItemCountMock.mockReturnValue(itemCount)
    render(<HeaderClient header={mockHeaderData} />)
  }

  it('renders the logo text', () => {
    renderHeader('/', 0)
    expect(screen.getByText('THE CARPENTER')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    renderHeader('/', 0)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('shows quotation item count when greater than 0', () => {
    renderHeader('/', 3)
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('does not show quotation item count when 0', () => {
    renderHeader('/', 0)
    expect(screen.queryByText('3')).not.toBeInTheDocument()
  })

  describe('Scroll behavior', () => {
    it('is visible by default', () => {
      renderHeader('/', 0);
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('translate-y-0');
    });

    it('hides on scroll down', () => {
      renderHeader('/', 0);
      const header = screen.getByRole('banner');

      // Initial state
      expect(header).toHaveClass('translate-y-0');

      // Simulate scroll down
      fireEvent.scroll(window, { target: { scrollY: 100 } });
      expect(header).toHaveClass('-translate-y-full');
    });

    it('shows on scroll up', () => {
      renderHeader('/', 0);
      const header = screen.getByRole('banner');

      // Scroll down first to hide it
      fireEvent.scroll(window, { target: { scrollY: 100 } });
      expect(header).toHaveClass('-translate-y-full');

      // Simulate scroll up
      fireEvent.scroll(window, { target: { scrollY: 50 } });
      expect(header).toHaveClass('translate-y-0');
    });
  });

  describe('Mobile menu', () => {
    it('opens and closes the mobile menu', () => {
      renderHeader('/', 0)
      screen.debug()
      const menuButton = screen.getByRole('button', { name: 'Menu' })
      fireEvent.click(menuButton)

      let closeButton = screen.getByRole('button', { name: 'Close menu' })
      expect(closeButton).toBeInTheDocument()

      fireEvent.click(closeButton)
      expect(screen.queryByLabelText('Close menu')).not.toBeInTheDocument()
    })
  })
})
