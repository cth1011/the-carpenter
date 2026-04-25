import type { NextPage } from 'next'
import { getCachedPayload } from '@/payloadClient'
import { LandingPageClient } from './LandingPageClient'

const Page: NextPage = async () => {
  const payload = await getCachedPayload()
  const landingPage = await payload.findGlobal({
    slug: 'landing-page',
    depth: 2,
  })

  return <LandingPageClient initialLandingPage={landingPage} />
}

export default Page
