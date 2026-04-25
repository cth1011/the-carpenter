import { getCachedPayload } from '@/payloadClient'
import { notFound } from 'next/navigation'
import { ProductDetailClient } from './ProductDetailClient'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const payload = await getCachedPayload()

  try {
    const product = await payload.findByID({
      collection: 'products',
      id,
      depth: 2,
    })

    if (!product) {
      return notFound()
    }

    return <ProductDetailClient initialProduct={product} />
  } catch (error) {
    console.error('Error fetching product:', error)
    return notFound()
  }
}
