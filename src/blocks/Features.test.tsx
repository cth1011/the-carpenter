import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Features from './Features'

// Mock the useInView hook to control the animation trigger
vi.mock('react-intersection-observer', () => ({
  useInView: () => ({
    ref: vi.fn(),
    inView: true, // Assume component is always in view for these tests
  }),
}))

describe('Features', () => {
  it('should render the default features if no props are provided', () => {
    render(<Features />)
    expect(screen.getByText('Crafted by Skilled Artisans')).toBeInTheDocument()
    expect(screen.getByText('Delivered Wherever You Build')).toBeInTheDocument()
    expect(screen.getByText('Built for Your Vision')).toBeInTheDocument()
  })

  it('should render custom features when passed as props', () => {
    const customFeatures = [
      { icon: 'Hammer', title: 'Custom Feature 1', description: 'Desc 1' },
      { icon: 'Truck', title: 'Custom Feature 2', description: 'Desc 2' },
    ]
    render(<Features features={customFeatures} />)
    expect(screen.getByText('Custom Feature 1')).toBeInTheDocument()
    expect(screen.getByText('Desc 1')).toBeInTheDocument()
    expect(screen.getByText('Custom Feature 2')).toBeInTheDocument()
    expect(screen.getByText('Desc 2')).toBeInTheDocument()
    expect(
      screen.queryByText('Crafted by Skilled Artisans'),
    ).not.toBeInTheDocument()
  })

  it('should render without crashing when animation is disabled', () => {
    const customFeatures = [
      { icon: 'Hammer', title: 'Custom Feature 1', description: 'Desc 1' },
    ]
    render(<Features features={customFeatures} disableAnimation={true} />)
    expect(screen.getByText('Custom Feature 1')).toBeInTheDocument()
  })
})
