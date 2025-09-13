import type { NextPage } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Features from '@/blocks/Features'
import { getPayload } from 'payload'
import config from '@payload-config'
import { LandingPageHero } from '@/components/LandingPage/LandingPageHero'
import TwoColumnContent from '@/components/LandingPage/TwoColumnContent'
import FeaturedProducts from '@/components/LandingPage/FeaturedProducts'

const Page: NextPage = async () => {
  const payload = await getPayload({ config })
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
