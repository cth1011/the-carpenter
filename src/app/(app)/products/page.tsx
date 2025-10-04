import { Suspense } from 'react'
import ProductsPageClient from './ProductsPageClient'
import { Skeleton } from '@/components/ui/skeleton'
import { getPayload } from 'payload'
import config from '@/payload.config'

import BlockRenderer from '@/blocks/BlockRenderer'

const PageSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="text-center mb-8">
      <Skeleton className="h-10 w-1/2 mx-auto" />
      <Skeleton className="h-6 w-3/4 mx-auto mt-4" />
    </div>
    <Skeleton className="mb-8 h-24" />
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="aspect-[3/4] w-full" />
          <div className="p-4">
            <Skeleton className="h-4 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default async function ProductsPage() {
  const payload = await getPayload({ config })
  const productsPage = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'products',
      },
    },
  })

  return (
    <Suspense fallback={<PageSkeleton />}>
      <BlockRenderer layout={productsPage.docs[0].layout} pageTitle={productsPage.docs[0].title} />
      <ProductsPageClient />
    </Suspense>
  )
}
