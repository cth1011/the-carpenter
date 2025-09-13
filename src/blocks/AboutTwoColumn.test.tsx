import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import AboutTwoColumn from './AboutTwoColumn'
import { Media } from '@/payload-types'

const mockImage: Media = {
  id: 1,
  alt: 'A test image',
  url: '/test-image.jpg',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  filename: 'test-image.jpg',
  mimeType: 'image/jpeg',
  filesize: 1000,
  width: 500,
  height: 500,
}

describe('AboutTwoColumn', () => {
  it('should render the default title and text', () => {
    render(<AboutTwoColumn />)
    expect(screen.getByText('OUR STORY')).toBeInTheDocument()
    expect(
      screen.getByText(/Founded over five decades ago/)
    ).toBeInTheDocument()
  })

  it('should render custom title and text when provided', () => {
    render(<AboutTwoColumn title="Custom Title" text="Custom text." />)
    expect(screen.getByText('Custom Title')).toBeInTheDocument()
    expect(screen.getByText('Custom text.')).toBeInTheDocument()
  })

  it('should render the image with the correct alt text', () => {
    render(<AboutTwoColumn image={mockImage} />)
    expect(screen.getByAltText('A test image')).toBeInTheDocument()
  })

  it('should apply the correct class for imagePosition="left"', () => {
    const { container } = render(<AboutTwoColumn imagePosition="left" />)
    const gridContainer = container.querySelector('.grid')
    expect(gridContainer?.children[0]).toHaveClass('md:order-last')
    expect(gridContainer?.children[1]).toHaveClass('md:order-first')
  })

  it('should apply the correct class for backgroundColor', () => {
    const { container } = render(
      <AboutTwoColumn backgroundColor="dark-green" />
    )
    expect(container.firstChild).toHaveClass('bg-[#234537]')
  })
})
