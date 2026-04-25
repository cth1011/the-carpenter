'use client'

import Image from 'next/image'
import { LandingPage } from '@/payload-types'
import LandingButton from '@/components/LandingPage/LandingButton'

export function LandingPageHero({ landingPage }: { landingPage: LandingPage }) {
  const { hero } = landingPage || {}
  const backgroundImage = hero?.backgroundImage
  const imageUrl =
    typeof backgroundImage === 'object' ? backgroundImage?.url : null
  const imageAlt =
    typeof backgroundImage === 'object'
      ? backgroundImage?.alt
      : 'Crafted wooden doors'

  return (
    <section className="relative h-[95vh] w-full">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={imageAlt || 'Crafted wooden doors'}
          fill
          className="object-cover"
          priority
          sizes="100vw"
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
