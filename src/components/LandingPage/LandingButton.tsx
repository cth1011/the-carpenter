'use client'

import Link from 'next/link'

interface LandingButtonProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function LandingButton({
  href,
  children,
  className,
}: LandingButtonProps) {
  return (
    <Link
      href={href}
      className={`group relative overflow-hidden rounded-lg bg-white px-8 py-4 text-sm font-semibold text-black ${className}`}
    >
      <span className="absolute inset-0 rounded-full bg-orange-200 transform scale-0 transition-transform duration-500 group-hover:scale-150"></span>
      <span className="relative transition-colors duration-500 group-hover:text-white">
        {children}
      </span>
    </Link>
  )
}
