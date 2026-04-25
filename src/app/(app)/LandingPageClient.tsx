'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { LandingPage } from '@/payload-types'
import { LandingPageHero } from '@/components/LandingPage/LandingPageHero'
import TwoColumnContent from '@/components/LandingPage/TwoColumnContent'
import FeaturedProducts from '@/components/LandingPage/FeaturedProducts'
import Features from '@/blocks/Features'

export function LandingPageClient({
  initialLandingPage,
}: {
  initialLandingPage: LandingPage
}) {
  const { data: liveData } = useLivePreview<LandingPage>({
    initialData: initialLandingPage,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    depth: 2,
  })

  // Ensure liveData is actually a LandingPage (Payload's hook can sometimes return data from other hooks on the page)
  const landingPage = liveData && 'hero' in liveData ? liveData : initialLandingPage

  if (!landingPage) return null

  return (
    <div className="min-h-screen">
      <LandingPageHero landingPage={landingPage} />
      <TwoColumnContent twoColumnContent={landingPage.twoColumnContent} />
      {landingPage.featuredProducts &&
        landingPage.featuredProducts.length > 0 && (
          <FeaturedProducts
            products={landingPage.featuredProducts.map((p) =>
              typeof p === 'object' ? p : ({} as any)
            )}
          />
        )}
      <Features />
    </div>
  )
}
