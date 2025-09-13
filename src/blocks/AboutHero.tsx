import React from 'react'
import Image from 'next/image'

import { Media } from '@/payload-types'

interface AboutHeroProps {
  image?: Media
  title?: string
  text?: string
}

const AboutHero: React.FC<AboutHeroProps> = ({ image, title, text }) => {
  const imageUrl = image?.url
  const imageAlt = image?.alt

  return (
    <section className="relative h-[60vh] md:h-[40vh] w-full overflow-hidden">
      {/* Background image */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={imageAlt || 'Hero Image'}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <div className="max-w-4xl mx-auto relative w-full flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest mb-4">
            {title}
          </h1>
          <p className="text-base md:text-base lg:text-base font-light tracking-wider text-white/90 max-w-2xl mx-auto">
            {text}
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutHero
