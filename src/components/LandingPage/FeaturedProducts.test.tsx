import { render, screen, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FeaturedProducts from './FeaturedProducts';
import { Product } from '@/payload-types';

// Mock ResizeObserver
const mockResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
vi.stubGlobal('ResizeObserver', mockResizeObserver);

// Mock the ProductCard component to isolate the FeaturedProducts component
vi.mock('@/components/ProductCard', () => ({
  default: ({ product }: { product: Product }) => (
    <div data-testid="product-card">{product.name}</div>
  ),
}));

const mockProduct1: Product = {
  id: 1,
  name: 'Product 1',
  description: {
    root: {
      type: 'root',
      children: [],
      direction: null,
      format: '',
      indent: 0,
      version: 1,
    },
  },
  category: { id: 1, name: 'Interior', createdAt: '', updatedAt: '' },
  productType: 'simple',
  updatedAt: '2023-01-01T00:00:00.000Z',
  createdAt: '2023-01-01T00:00:00.000Z',
  productImages: [],
};

const mockProduct2: Product = {
  id: 2,
  name: 'Product 2',
  description: {
    root: {
      type: 'root',
      children: [],
      direction: null,
      format: '',
      indent: 0,
      version: 1,
    },
  },
  category: { id: 2, name: 'Exterior', createdAt: '', updatedAt: '' },
  productType: 'simple',
  updatedAt: '2023-01-01T00:00:00.000Z',
  createdAt: '2023-01-01T00:00:00.000Z',
  productImages: [],
};

describe('FeaturedProducts', () => {
  it('should render nothing if products prop is not provided', () => {
    const { container } = render(<FeaturedProducts />);
    expect(container.firstChild).toBeNull();
  });

  it('should render nothing if products array is empty', () => {
    const { container } = render(<FeaturedProducts products={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render nothing if products array contains only numbers', () => {
    const { container } = render(<FeaturedProducts products={[1, 2, 3]} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render only the valid products', () => {
    render(<FeaturedProducts products={[mockProduct1, 2, mockProduct2]} />);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    const productCards = screen.getAllByTestId('product-card');
    expect(productCards).toHaveLength(2);
  });

  it('should render the main section and title when there are valid products', () => {
    render(<FeaturedProducts products={[mockProduct1]} />);
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(within(h2).getByText(/Our/)).toBeInTheDocument();
    expect(within(h2).getByText(/Collections/)).toBeInTheDocument();
    expect(screen.getByText(/Shop Customer Favorites/)).toBeInTheDocument();
  });

  it('should link to the products page', () => {
    render(<FeaturedProducts products={[mockProduct1]} />);
    const link = screen.getByText(/Shop Customer Favorites/)
    expect(link.closest('a')).toHaveAttribute('href', '/products');
  });
});