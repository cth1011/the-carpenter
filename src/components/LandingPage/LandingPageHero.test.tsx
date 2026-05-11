import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { LandingPageHero } from './LandingPageHero'
import { LandingPage } from '@/payload-types'

const mockLandingPage: LandingPage = {
  id: 1,
  hero: {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    backgroundImage: {
      id: 1,
      url: '/test-image.jpg',
      alt: 'Test Alt',
      updatedAt: '',
      createdAt: '',
    },
    showTopOverlay: true,
    cta: {
      text: 'CTA Text',
      link: '/cta-link',
    },
  },
  updatedAt: '',
  createdAt: '',
}

describe('LandingPageHero', () => {
  it('renders the top overlay when showTopOverlay is true', () => {
    render(<LandingPageHero landingPage={mockLandingPage} />)
    // The top overlay is a div with specific classes
    const overlays = screen.getAllByRole('generic').filter(el => 
      el.className.includes('bg-gradient-to-b') && el.className.includes('from-black/60')
    )
    expect(overlays.length).toBe(1)
  })

  it('does not render the top overlay when showTopOverlay is false', () => {
    const pageWithoutOverlay = {
      ...mockLandingPage,
      hero: { ...mockLandingPage.hero, showTopOverlay: false },
    }
    render(<LandingPageHero landingPage={pageWithoutOverlay} />)
    const overlays = screen.getAllByRole('generic').filter(el => 
      el.className.includes('bg-gradient-to-b') && el.className.includes('from-black/60')
    )
    expect(overlays.length).toBe(0)
  })

  it('renders title and subtitle', () => {
    render(<LandingPageHero landingPage={mockLandingPage} />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
  })
})
