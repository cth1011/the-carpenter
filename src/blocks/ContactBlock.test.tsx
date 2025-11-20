import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ContactBlock from './ContactBlock'

// Mock sonner
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe('ContactBlock', () => {
  it('should render with the default title', () => {
    render(<ContactBlock />)
    expect(screen.getByText('Send us a Message')).toBeInTheDocument()
  })

  it('should render with a custom title', () => {
    render(<ContactBlock title="Custom Contact Title" />)
    expect(screen.getByText('Custom Contact Title')).toBeInTheDocument()
  })
  
  it('should have a form with required fields', () => {
    render(<ContactBlock />)
    expect(screen.getByLabelText(/Full Name/)).toBeRequired()
    expect(screen.getByLabelText(/Email Address/)).toBeRequired()
    expect(screen.getByLabelText(/Subject/)).toBeRequired()
    expect(screen.getByLabelText(/Message/)).toBeRequired()
    expect(screen.getByLabelText(/Phone Number/)).not.toBeRequired()
  })
})
