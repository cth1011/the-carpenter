import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { AboutPageClient } from './AboutPageClient'

export default async function AboutPage() {
  const payload = await getPayload({ config })
  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'about' },
    },
    depth: 2,
  })

  if (!page.docs[0]) {
    return notFound()
  }

  return <AboutPageClient page={page.docs[0]} />
}
