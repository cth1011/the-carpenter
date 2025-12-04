import { describe, it, expect, vi, beforeEach } from 'vitest'
import { PATCH, GET } from './route'
import { getCachedPayload } from '@/payloadClient'
import { NextRequest } from 'next/server'

// Mock the getCachedPayload function
vi.mock('@/payloadClient', () => ({
  getCachedPayload: vi.fn(),
}))

describe('PATCH /api/products/[id]', () => {
  const mockUpdate = vi.fn()
  const mockFindByID = vi.fn()
  const MOCK_PRODUCT_ID = 'product123'

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getCachedPayload).mockResolvedValue({
      update: mockUpdate,
      findByID: mockFindByID,
    } as any)
  })

  it('should update a product successfully', async () => {
    const updatedData = { name: 'Updated Door', description: 'A brand new updated door.' }
    const mockUpdatedProduct = { id: MOCK_PRODUCT_ID, ...updatedData }

    mockUpdate.mockResolvedValue(mockUpdatedProduct)

    const request = new NextRequest(`http://localhost/api/products/${MOCK_PRODUCT_ID}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })

    const response = await PATCH(request, { params: Promise.resolve({ id: MOCK_PRODUCT_ID }) })
    const responseBody = await response.json()

    expect(response.status).toBe(200)
    expect(responseBody).toEqual(mockUpdatedProduct)
    expect(mockUpdate).toHaveBeenCalledWith({
      collection: 'products',
      id: MOCK_PRODUCT_ID,
      data: updatedData,
    })
  })

  it('should return 404 if product not found during update', async () => {
    mockUpdate.mockResolvedValue(null) // Simulate product not found or update failed

    const updatedData = { name: 'Updated Door' }
    const request = new NextRequest(`http://localhost/api/products/${MOCK_PRODUCT_ID}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })

    const response = await PATCH(request, { params: Promise.resolve({ id: MOCK_PRODUCT_ID }) })
    const responseBody = await response.json()

    expect(response.status).toBe(404)
    expect(responseBody).toEqual({ error: 'Product not found or update failed' })
    expect(mockUpdate).toHaveBeenCalledOnce()
  })

  it('should return 500 if an error occurs during update', async () => {
    mockUpdate.mockRejectedValue(new Error('Database error'))

    const updatedData = { name: 'Updated Door' }
    const request = new NextRequest(`http://localhost/api/products/${MOCK_PRODUCT_ID}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })

    const response = await PATCH(request, { params: Promise.resolve({ id: MOCK_PRODUCT_ID }) })
    const responseBody = await response.json()

    expect(response.status).toBe(500)
    expect(responseBody).toEqual({ error: 'Failed to update product' })
    expect(mockUpdate).toHaveBeenCalledOnce()
  })
})

describe('GET /api/products/[id]', () => {
    const mockUpdate = vi.fn()
    const mockFindByID = vi.fn()
    const MOCK_PRODUCT_ID = 'product123'
  
    beforeEach(() => {
      vi.clearAllMocks()
      vi.mocked(getCachedPayload).mockResolvedValue({
        update: mockUpdate,
        findByID: mockFindByID,
      } as any)
    })
  
    it('should return a product successfully', async () => {
      const mockProduct = { id: MOCK_PRODUCT_ID, name: 'Test Product', description: 'A test product' }
      mockFindByID.mockResolvedValue(mockProduct)
  
      const request = new NextRequest(`http://localhost/api/products/${MOCK_PRODUCT_ID}`, {
        method: 'GET',
      })
  
      const response = await GET(request, { params: Promise.resolve({ id: MOCK_PRODUCT_ID }) })
      const responseBody = await response.json()
  
      expect(response.status).toBe(200)
      expect(responseBody).toEqual(mockProduct)
      expect(mockFindByID).toHaveBeenCalledWith({
        collection: 'products',
        id: MOCK_PRODUCT_ID,
        depth: 2,
      })
    })
  
    it('should return 404 if product not found', async () => {
      mockFindByID.mockResolvedValue(null)
  
      const request = new NextRequest(`http://localhost/api/products/${MOCK_PRODUCT_ID}`, {
        method: 'GET',
      })
  
      const response = await GET(request, { params: Promise.resolve({ id: MOCK_PRODUCT_ID }) })
      const responseBody = await response.json()
  
      expect(response.status).toBe(404)
      expect(responseBody).toEqual({ error: 'Product not found' })
      expect(mockFindByID).toHaveBeenCalledOnce()
    })
  
    it('should return 500 if an error occurs during fetch', async () => {
      mockFindByID.mockRejectedValue(new Error('Database error'))
  
      const request = new NextRequest(`http://localhost/api/products/${MOCK_PRODUCT_ID}`, {
        method: 'GET',
      })
  
      const response = await GET(request, { params: Promise.resolve({ id: MOCK_PRODUCT_ID }) })
      const responseBody = await response.json()
  
      expect(response.status).toBe(500)
      expect(responseBody).toEqual({ error: 'Failed to fetch product' })
      expect(mockFindByID).toHaveBeenCalledOnce()
    })
  })