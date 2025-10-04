'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Search, ShoppingBag, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useQuotationStore } from '@/store/quotation'
import logo from '../../public/logo.svg'
import { Header } from '@/payload-types'

const IconWrapper: React.FC<{
  children: React.ReactNode
  className?: string
  onClick?: () => void
}> = ({ children, className, onClick }) => (
  <button className={`p-2 ${className}`} onClick={onClick}>
    {children}
  </button>
)

export default function HeaderClient({ header }: { header: Header }) {
  const { logoText, navLinks } = header
  const { getItemCount } = useQuotationStore()
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [visible, setVisible] = useState(true)
  const [hasMounted, setHasMounted] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/' || pathname === '/en'

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setVisible(true)
      } else {
        setVisible(false)
      }
      setLastScrollY(currentScrollY)
      setScrolled(currentScrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  const isSolid = !isHomePage || scrolled

  const headerClasses = `w-full z-50 transition-all duration-300 ${
    isHomePage ? 'fixed top-0' : 'sticky top-0'
  } ${isSolid ? 'bg-white' : 'bg-transparent'} ${
    visible ? 'translate-y-0' : '-translate-y-full'
  }`

  const linkClasses = isSolid
    ? 'text-black hover:!text-black'
    : 'text-white hover:!text-white'

  const iconClasses = isSolid
    ? 'text-black hover:text-black'
    : 'text-white hover:!text-white'

  const logoClasses = isSolid ? 'text-black' : 'text-white'
  const logoIconClasses = isSolid ? 'invert-0' : 'invert'
  const underlineClasses = isSolid ? 'bg-black' : 'bg-white'

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-1 flex items-center text-nowrap justify-start">
            <Link
              href="/"
              className="flex items-end space-x-2 text-xl font-black tracking-wide uppercase"
            >
              <Image
                src={logo}
                alt="The Carpenter Logo"
                width={32}
                height={32}
                className={`w-8 h-8 ${logoIconClasses}`}
              />
              <span className={logoClasses}>{logoText?.toUpperCase()}</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8 group">
            {navLinks?.map((navLink, index) => (
              <div key={index} className="text-base font-medium">
                <Link
                  href={navLink.link}
                  className={`group/link tracking-wider relative pb-1 text-sm font-medium transition-all opacity-100 group-hover:opacity-50 hover:!opacity-100 ${linkClasses}`}
                >
                  <span>{navLink.text}</span>
                  <span
                    className={`absolute bottom-0 left-0 block h-px w-full max-w-0 transition-all duration-500 group-hover/link:max-w-full ${underlineClasses}`}
                  />
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex-1 flex items-center justify-end space-x-2">
            <div className="hidden md:flex items-center space-x-2">
              <IconWrapper className={iconClasses}>
                <Search className="w-5 h-5" />
                <span className="sr-only">Search</span>
              </IconWrapper>
              <Link href="/quotation">
                <IconWrapper className={iconClasses}>
                  <div className="relative">
                    <ShoppingBag className="w-5 h-5" />
                    {hasMounted && getItemCount() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                        {getItemCount()}
                      </span>
                    )}
                  </div>
                  <span className="sr-only">Quotation</span>
                </IconWrapper>
              </Link>
            </div>
            <div className="md:hidden">
              <IconWrapper
                className={iconClasses}
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
                <span className="sr-only">Menu</span>
              </IconWrapper>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-16">
          <div className="absolute top-2 right-2">
            <IconWrapper
              className="text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="w-6 h-6" />
              <span className="sr-only">Close menu</span>
            </IconWrapper>
          </div>
          <nav className="flex flex-col items-center space-y-8 pt-8">
            {navLinks?.map((navLink, index) => (
              <div key={index} className="text-2l font-medium text-black">
                <Link
                  href={navLink.link}
                  className="group/link tracking-wider relative pb-1 text-sm font-medium transition-all opacity-100 group-hover:opacity-50 hover:!opacity-100 text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{navLink.text}</span>
                  <span className="absolute bottom-0 left-0 block h-px w-full max-w-0 transition-all duration-500 group-hover/link:max-w-full bg-black" />
                </Link>
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
