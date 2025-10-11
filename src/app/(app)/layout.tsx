import type { ReactNode } from 'react'
import { Metadata } from 'next'

import { cn } from '@/lib/utils'
import { Inter as FontSans } from 'next/font/google'
import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer/Footer'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'The Carpenter - Custom Doors & Woodwork',
  description:
    'Discover high-quality custom doors and exquisite woodwork from The Carpenter. Browse our catalog and request a quotation for your next project.',
}

type LayoutProps = {
  children: ReactNode
}

import './globals.css'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const Layout = async ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
            <Toaster richColors position="bottom-right" />
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

export default Layout
