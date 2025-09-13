'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LandingPage, Media } from '@/payload-types'
import LandingButton from '@/components/LandingPage/LandingButton'

export function LandingPageHero({
  landingPage: initialLandingPage,
}: {
  landingPage: LandingPage
}) {
  const { data: landingPage } = useLivePreview<LandingPage>({
    initialData: initialLandingPage,
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000',
  })

  const { hero } = landingPage
  const backgroundImage = hero?.backgroundImage as Media

  return (
    <section className="relative h-[95vh] w-full">
      {backgroundImage?.url && (
        <Image
          src={backgroundImage.url}
          alt={backgroundImage.alt || 'Crafted wooden doors'}
          fill
          className="object-cover"
          priority
          fetchPriority="high"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
      <span className="absolute left-4 bottom-4 text-white text-sm uppercase tracking-widest">
        Timeless Design. Lasting Strength.
      </span>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center pb-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          {hero?.title || 'Doors that Welcome, Wood that Lasts'}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-white">
          {hero?.subtitle ||
            'Create a lasting first impression with doors that feel like home.'}
        </p>
        <LandingButton className="mt-8" href={hero?.cta?.link || '/products'}>
          {hero?.cta?.text || 'EXPLORE NOW'}
        </LandingButton>
      </div>
    </section>
  )
}
