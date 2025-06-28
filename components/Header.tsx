'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  className?: string;
  underlineColorClass?: string;
}> = ({ href, children, className, underlineColorClass }) => (
  <Link
    href={href}
    className={`group/link tracking-wider relative pb-1 text-sm font-medium transition-all opacity-100 group-hover:opacity-50 hover:!opacity-100 ${className}`}
  >
    {children}
    <span
      className={`absolute bottom-0 left-0 block h-px w-full max-w-0 transition-all duration-500 group-hover/link:max-w-full ${underlineColorClass}`}
    />
  </Link>
);

const IconWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <button className={`p-2 ${className}`}>{children}</button>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const headerClasses = scrolled
    ? 'fixed top-0 w-full z-50 bg-white border-b border-gray-200 transition-colors duration-300'
    : 'fixed top-0 w-full z-50 bg-transparent transition-colors duration-300';

  const linkClasses = scrolled
    ? 'text-black hover:!text-black'
    : 'text-white hover:!text-white';

  const iconClasses = scrolled
    ? 'text-black hover:text-black'
    : 'text-white hover:text-white';

  const logoClasses = scrolled ? 'text-black' : 'text-white';

  const underlineClasses = scrolled ? 'bg-black' : 'bg-white';

  return (
    <header className={headerClasses}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-1 flex items-center justify-start">
            <Link
              href="/"
              className={`text-xl font-black tracking-wide uppercase ${logoClasses}`}
            >
              The Carpenter
            </Link>
          </div>

          {/* Center: Navigation Links (hidden on mobile) */}
          <nav className="hidden md:flex items-center space-x-8 group">
            <NavLink
              href="/shop"
              className={linkClasses}
              underlineColorClass={underlineClasses}
            >
              SHOP
            </NavLink>
            <NavLink
              href="/about"
              className={linkClasses}
              underlineColorClass={underlineClasses}
            >
              ABOUT US
            </NavLink>
            <NavLink
              href="/collections"
              className={linkClasses}
              underlineColorClass={underlineClasses}
            >
              CONTACT US
            </NavLink>
          </nav>

          {/* Right Side: Icons */}
          <div className="flex-1 flex items-center justify-end space-x-2">
            <IconWrapper className={iconClasses}>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </IconWrapper>
            <IconWrapper className={iconClasses}>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
              <span className="sr-only">Cart</span>
            </IconWrapper>
          </div>
        </div>
      </div>
    </header>
  );
}