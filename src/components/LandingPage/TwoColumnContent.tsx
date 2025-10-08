'use client'

import Image from 'next/image'
import Button from '@/components/LandingPage/LandingButton'
import { easeIn, motion } from 'motion/react'
import { useInView } from 'react-intersection-observer'

import { LandingPage, Media } from '@/payload-types'

interface TwoColumnContentProps {
  twoColumnContent: LandingPage['twoColumnContent']
}

export default function TwoColumnContent({
  twoColumnContent,
}: TwoColumnContentProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4, // Trigger when 10% of the component is visible
  })

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, easeIn, delay: 0.2 },
    },
  }

  const { title, text, buttonText, buttonLink, image } = twoColumnContent || {}
  const imageUrl = (image as Media)?.url
  const imageAlt = (image as Media)?.alt

  return (
    <section
      ref={ref}
      className="bg-gray-100 py-20 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={textVariants}
          className="text-center md:text-left"
        >
          <h2 className="text-4xl text-primary md:text-6xl font-black uppercase tracking-tight leading-tight">
            {title || 'Half a Century of Craft'}
          </h2>
          <p className="mt-6 text-gray-600 max-w-md mx-auto md:mx-0">
            {text ||
              'For over five decades, The Carpenter has built a legacy of excellence in woodworking—shaping homes with doors that stand the test of time. Each piece we craft is rooted in traditional techniques, refined through years of experience, and made with a deep respect for the natural beauty of wood. We honor the past not by standing still, but by continuously raising the standard for quality, design, and durability in every door we deliver.'}
          </p>
          <div className="mt-8 flex justify-center md:justify-start">
            <Button
              href={buttonLink || '/'}
              aria-label="Learn more about The Carpenter company"
            >
              {buttonText || 'Learn More'}
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={imageVariants}
          className="relative aspect-[4/5]"
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={imageAlt || 'Person on skateboard in a concrete bowl'}
              fill
              className="object-cover"
            />
          )}
        </motion.div>
      </div>
    </section>
  )
}
