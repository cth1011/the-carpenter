import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DimensionSelector from './DimensionSelector'

const options = [{ value: '40mm' }, { value: '44mm' }]

describe('DimensionSelector', () => {
  it('should render the label and options', () => {
    render(
      <DimensionSelector
        label="Thickness"
        name="thickness"
        options={options}
        selectedValue="40mm"
        onSelect={() => {}}
      />,
    )
    expect(screen.getByText('Thickness')).toBeInTheDocument()
    expect(screen.getByLabelText('40mm')).toBeInTheDocument()
    expect(screen.getByLabelText('44mm')).toBeInTheDocument()
  })

  it('should call onSelect when an option is clicked', () => {
    const onSelect = vi.fn()
    render(
      <DimensionSelector
        label="Thickness"
        name="thickness"
        options={options}
        selectedValue="40mm"
        onSelect={onSelect}
      />,
    )
    fireEvent.click(screen.getByLabelText('44mm'))
    expect(onSelect).toHaveBeenCalledWith('44mm')
  })

  it('should apply selected styles to the selected option', () => {
    render(
      <DimensionSelector
        label="Thickness"
        name="thickness"
        options={options}
        selectedValue="40mm"
        onSelect={() => {}}
      />,
    )
    const selectedLabel = screen.getByText('40mm')
    expect(selectedLabel.className).toContain('bg-primary')
    const unselectedLabel = screen.getByText('44mm')
    expect(unselectedLabel.className).not.toContain('bg-primary')
  })

  it('should not render if no options are provided', () => {
    const { container } = render(
      <DimensionSelector
        label="Thickness"
        name="thickness"
        options={[]}
        onSelect={() => {}}
      />,
    )
    expect(container.firstChild).toBeNull()
  })
})
