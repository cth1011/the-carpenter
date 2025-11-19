import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Faq from './Faq'

describe('FaqBlock', () => {
  const mockFaqs = [
    { id: '1', question: 'Question 1', answer: 'Answer 1' },
    { id: '2', question: 'Question 2', answer: 'Answer 2' },
  ]

  it('should render nothing if no faqs are provided', () => {
    const { container } = render(<Faq blockType="faq" faqs={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('should render a custom title and FAQs', () => {
    render(
      <Faq
        blockType="faq"
        title="Custom Title"
        faqs={mockFaqs}
      />,
    )
    expect(screen.getByText('Custom Title')).toBeInTheDocument()
    expect(screen.getByText('Question 1')).toBeInTheDocument()
    expect(screen.getByText('Question 2')).toBeInTheDocument()
  })

  it('should not show answers by default', () => {
    render(
      <Faq
        blockType="faq"
        title="Custom Title"
        faqs={mockFaqs}
      />,
    )
    expect(screen.queryByText('Answer 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Answer 2')).not.toBeInTheDocument()
  })

  it('should show the answer when a question is clicked', async () => {
    render(
      <Faq
        blockType="faq"
        title="Custom Title"
        faqs={mockFaqs}
      />,
    )

    const question1 = screen.getByText('Question 1')
    fireEvent.click(question1)

    const answer1 = await screen.findByText('Answer 1')
    expect(answer1).toBeInTheDocument()
  })
})
