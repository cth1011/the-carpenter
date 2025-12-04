import type { NextPage } from 'next'
import Features from '@/blocks/Features'
import { getCachedPayload } from '@/payloadClient'
import { LandingPageHero } from '@/components/LandingPage/LandingPageHero'
import TwoColumnContent from '@/components/LandingPage/TwoColumnContent'
import FeaturedProducts from '@/components/LandingPage/FeaturedProducts'

const Page: NextPage = async () => {
  const payload = await getCachedPayload()
  const landingPage = await payload.findGlobal({
    slug: 'landing-page',
    depth: 2,
  })

  return (
    <div className="min-h-screen">
      <LandingPageHero landingPage={landingPage} />
      <TwoColumnContent twoColumnContent={landingPage.twoColumnContent} />
      {landingPage.featuredProducts &&
        landingPage.featuredProducts.length > 0 && (
          <FeaturedProducts products={landingPage.featuredProducts} />
        )}
      {/* Features Section */}
      <Features />
    </div>
  )
}

export default Page
