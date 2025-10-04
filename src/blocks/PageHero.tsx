import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Media } from '@/payload-types'

interface PageHeroProps {
  image?: Media
  title?: string
  pageTitle?: string
}

const PageHero: React.FC<PageHeroProps> = ({ image, title, pageTitle }) => {
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

      <div className="relative z-10 flex flex-col items-start justify-center h-full text-white text-left px-4">
        <div className="container mx-auto relative w-full flex flex-col items-start">
          <Breadcrumb>
            <BreadcrumbList className="text-white/80">
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="hover:text-white">
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">{pageTitle}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold  mt-16 mb-4">
            {title}
          </h1>
        </div>
      </div>
    </section>
  )
}

export default PageHero
