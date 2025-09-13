import { describe, it, expect, beforeEach } from 'vitest'
import { useQuotationStore } from './quotation'
import { Product } from '@/payload-types'

const mockProduct1: Product = {
  id: 1,
  name: 'Test Door',
  description: 'A test door',
  category: { id: 1, name: 'Interior', createdAt: '', updatedAt: '' },
  dimensions: {
    thickness: [{ value: '40mm' }],
    width: [{ value: '800mm' }, { value: '900mm' }],
    height: [{ value: '2100mm' }],
  },
  updatedAt: '2023-01-01T00:00:00.000Z',
  createdAt: '2023-01-01T00:00:00.000Z',
}

const mockProduct2: Product = {
  id: 2,
  name: 'Another Door',
  description: 'Another test door',
  category: { id: 2, name: 'Exterior', createdAt: '', updatedAt: '' },
  dimensions: {
    thickness: [{ value: '44mm' }],
    width: [{ value: '820mm' }],
    height: [{ value: '2040mm' }],
  },
  updatedAt: '2023-01-01T00:00:00.000Z',
  createdAt: '2023-01-01T00:00:00.000Z',
}

const dimensions1 = { thickness: '40mm', width: '800mm', height: '2100mm' }
const dimensions2 = { thickness: '40mm', width: '900mm', height: '2100mm' }

describe('useQuotationStore', () => {
  beforeEach(() => {
    useQuotationStore.getState().clearQuotation()
  })

  it('should add a new product with specific dimensions to the quotation', () => {
    const { addToQuotation } = useQuotationStore.getState()
    addToQuotation(mockProduct1, dimensions1, 1)
    const { items } = useQuotationStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0].product.name).toBe('Test Door')
    expect(items[0].quantity).toBe(1)
    expect(items[0].selectedDimensions).toEqual(dimensions1)
  })

  it('should add the same product with different dimensions as a new item', () => {
    const { addToQuotation } = useQuotationStore.getState()
    addToQuotation(mockProduct1, dimensions1, 1)
    addToQuotation(mockProduct1, dimensions2, 2)
    const { items } = useQuotationStore.getState()
    expect(items).toHaveLength(2)
    expect(items[0].quantity).toBe(1)
    expect(items[1].quantity).toBe(2)
  })

  it('should increase the quantity of an existing product with the same dimensions', () => {
    const { addToQuotation } = useQuotationStore.getState()
    addToQuotation(mockProduct1, dimensions1, 1)
    addToQuotation(mockProduct1, dimensions1, 2)
    const { items } = useQuotationStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0].quantity).toBe(3)
  })

  it('should remove a product from the quotation', () => {
    const { addToQuotation, removeFromQuotation } = useQuotationStore.getState()
    addToQuotation(mockProduct1, dimensions1)
    const cartId = useQuotationStore.getState().items[0].cartId
    removeFromQuotation(cartId)
    const { items } = useQuotationStore.getState()
    expect(items).toHaveLength(0)
  })

  it('should update the quantity of a product', () => {
    const { addToQuotation, updateQuantity } = useQuotationStore.getState()
    addToQuotation(mockProduct1, dimensions1)
    const cartId = useQuotationStore.getState().items[0].cartId
    updateQuantity(cartId, 5)
    const { items } = useQuotationStore.getState()
    expect(items[0].quantity).toBe(5)
  })

  it('should remove a product if quantity is updated to 0 or less', () => {
    const { addToQuotation, updateQuantity } = useQuotationStore.getState()
    addToQuotation(mockProduct1, dimensions1)
    const cartId = useQuotationStore.getState().items[0].cartId
    updateQuantity(cartId, 0)
    const { items } = useQuotationStore.getState()
    expect(items).toHaveLength(0)
  })

  it('should clear the quotation', () => {
    const { addToQuotation, clearQuotation } = useQuotationStore.getState()
    addToQuotation(mockProduct1, dimensions1)
    addToQuotation(mockProduct2, dimensions2)
    clearQuotation()
    const { items } = useQuotationStore.getState()
    expect(items).toHaveLength(0)
  })

  it('should calculate the total number of items correctly', () => {
    const { addToQuotation, getItemCount } = useQuotationStore.getState()
    addToQuotation(mockProduct1, dimensions1, 1)
    addToQuotation(mockProduct1, dimensions1, 2)
    addToQuotation(mockProduct2, dimensions2, 1)
    expect(getItemCount()).toBe(4)
  })
})