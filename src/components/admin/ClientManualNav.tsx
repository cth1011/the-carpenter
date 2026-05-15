'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const ClientManualNav: React.FC = () => {
  const pathname = usePathname()
  const isActive = pathname?.includes('/client-manual')

  return (
    <div 
      className="nav-group" 
      style={{ 
        marginTop: '20px',
        padding: '0 15px'
      }}
    >
      <div 
        className="nav-group__label"
        style={{
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '10px',
          opacity: 0.5
        }}
      >
        Support
      </div>
      <Link 
        href="/admin/client-manual" 
        style={{ 
          textDecoration: 'none', 
          color: isActive ? 'var(--theme-elevation-800)' : 'inherit',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '5px 0',
          fontSize: '14px',
          fontWeight: isActive ? 'bold' : 'normal'
        }}
      >
        <span style={{ fontSize: '18px' }}>📖</span>
        Client Manual
      </Link>
    </div>
  )
}
