import BlockRenderer from '@/blocks/BlockRenderer'
import { getPayload } from 'payload'
import { unstable_noStore as noStore } from 'next/cache'
import config from '@payload-config'
import { Page } from '@/payload-types'
import { notFound } from 'next/navigation'

async function getPage(slug: string): Promise<Page | null> {
  noStore()
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
  })

  return result.docs[0] || null
}

export default async function ContactPage() {
  const page = await getPage('contact')

  if (!page) {
    return notFound()
  }

  return (
    <div>
      <BlockRenderer layout={page.layout} pageTitle={page.title} />
    </div>
  )
}