import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PageHero from './PageHero'
import { Media } from '@/payload-types'

const mockImage: Media = {
  id: 1,
  alt: 'A beautiful hero image',
  url: '/hero-image.jpg',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  filename: 'hero-image.jpg',
  mimeType: 'image/jpeg',
  filesize: 1000,
  width: 1920,
  height: 1080,
}

describe('PageHero', () => {
  it('should render the title and breadcrumb correctly', () => {
    render(<PageHero title="About Us" pageTitle="About Us" />)
    expect(screen.getByRole('heading', { name: 'About Us' })).toBeInTheDocument()
    expect(screen.getByRole('link', { current: 'page' })).toHaveTextContent('About Us')
  })

  it('should render the image with correct alt text when provided', () => {
    render(<PageHero image={mockImage} pageTitle="About Us" />)
    const image = screen.getByAltText('A beautiful hero image')
    expect(image).toBeInTheDocument()
  })

  it('should not render an image if the image prop is not provided', () => {
    render(<PageHero pageTitle="About Us" />)
    const image = screen.queryByRole('img')
    expect(image).not.toBeInTheDocument()
  })

  it('should render fallback alt text if image.alt is not provided', () => {
    const imageWithoutAlt = { ...mockImage, alt: '' }
    render(<PageHero image={imageWithoutAlt} pageTitle="About Us" />)
    const image = screen.getByAltText('Hero Image')
    expect(image).toBeInTheDocument()
  })
})
