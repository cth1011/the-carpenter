'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Repeater, Link, types } from 'react-bricks/rsc'
import { Search, ShoppingBag, Menu, X } from 'lucide-react'
import Image from 'next/image'
import logo from '@/public/logo.svg'

interface HeaderClientProps {
  logo: any
  logoText: string
  navLinks: any
}

const IconWrapper: React.FC<{
  children: React.ReactNode
  className?: string
  onClick?: () => void
}> = ({ children, className, onClick }) => (
  <button className={`p-2 ${className}`} onClick={onClick}>
    {children}
  </button>
)

const HeaderClient: React.FC<HeaderClientProps> = ({ logoText, navLinks }) => {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/' || pathname === '/en'

  useEffect(() => {
    if (!isHomePage) {
      return
    }
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isHomePage])

  const isSolid = !isHomePage || scrolled

  const headerClasses = `w-full z-50 transition-colors duration-300 ${
    isHomePage ? 'fixed top-0' : 'sticky top-0'
  } ${isSolid ? 'bg-white border-b border-gray-200' : 'bg-transparent'}`

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
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-1 flex items-center text-nowrap justify-start">
            <Link
              href="/"
              className="flex items-end  space-x-2 text-xl font-black tracking-wide uppercase"
            >
              <Image
                src={logo}
                alt="The Carpenter Logo"
                className={`w-8 h-8 ${logoIconClasses}`}
              />
              <span className={logoClasses}>THE CARPENTER</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8 group">
            <Repeater
              propName="navLinks"
              items={navLinks}
              itemProps={{
                className: linkClasses,
                underlineColorClass: underlineClasses,
              }}
              renderItemWrapper={(item) => (
                <div className="text-base font-medium">{item}</div>
              )}
            />
          </nav>

          <div className="flex-1 flex items-center justify-end space-x-2">
            <div className="hidden md:flex items-center space-x-2">
              <IconWrapper className={iconClasses}>
                <Search className="w-5 h-5" />
                <span className="sr-only">Search</span>
              </IconWrapper>
              <IconWrapper className={iconClasses}>
                <ShoppingBag className="w-5 h-5" />
                <span className="sr-only">Cart</span>
              </IconWrapper>
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
            <Repeater
              propName="navLinks"
              items={navLinks}
              itemProps={{
                className: 'text-black',
                underlineColorClass: 'bg-black',
                onLinkClick: () => setIsMenuOpen(false),
              }}
              renderItemWrapper={(item) => (
                <div className="text-2xl font-medium text-black">{item}</div>
              )}
            />
          </nav>
        </div>
      )}
    </header>
  )
}

export default HeaderClient
