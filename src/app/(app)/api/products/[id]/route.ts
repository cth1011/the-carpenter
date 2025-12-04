import { NextRequest, NextResponse } from 'next/server'
import { getCachedPayload } from '@/payloadClient'
import config from '@/payload.config'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const payload = await getCachedPayload()

    const product = await payload.findByID({
      collection: 'products',
      id,
      depth: 2,
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const payload = await getCachedPayload()

    const updatedProduct = await payload.update({
      collection: 'products',
      id,
      data: body,
    })

    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not found or update failed' }, { status: 404 })
    }

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}
