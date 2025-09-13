'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { Page } from '@/payload-types'
import BlockRenderer from '@/blocks/BlockRenderer'
import { notFound } from 'next/navigation'

export function AboutPageClient({ page: initialPage }: { page: Page }) {
  const { data } = useLivePreview<Page>({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2,
    initialData: initialPage,
  })

  if (!data) {
    return notFound()
  }

  const layout = data.layout

  return (
    <div className="min-h-screen">
      <BlockRenderer layout={layout} />
    </div>
  )
}
