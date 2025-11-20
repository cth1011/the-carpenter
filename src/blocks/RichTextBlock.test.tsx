import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import RichTextBlock from './RichTextBlock'

const mockLexicalData = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'text',
            format: 0,
            mode: 'normal',
            text: 'This is a rich text block.',
            version: 1,
          },
        ],
      },
    ],
  },
}

describe('RichTextBlock', () => {
  it('should render rich text content', () => {
    // @ts-ignore
    render(<RichTextBlock content={mockLexicalData} />)
    expect(screen.getByText('This is a rich text block.')).toBeInTheDocument()
  })

  it('should render nothing if content is null', () => {
    // @ts-ignore
    const { container } = render(<RichTextBlock content={null} />)
    expect(container.firstChild).toBeNull()
  })
})
