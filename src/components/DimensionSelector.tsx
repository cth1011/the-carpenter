'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const DimensionSelector = ({
  label,
  options,
  selectedValue,
  onSelect,
  name,
}: {
  label: string
  options: { value: string }[]
  selectedValue?: string
  onSelect: (value: string) => void
  name: string
}) => {
  if (!options || options.length === 0) return null

  return (
    <fieldset>
      <legend className="text-sm font-medium text-gray-500 mb-2">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <div key={option.value}>
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onSelect(option.value)}
              className="sr-only"
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className={cn(
                'cursor-pointer rounded-md border px-3 py-1.5 text-xs',
                selectedValue === option.value
                  ? 'bg-primary text-white'
                  : 'bg-white hover:bg-gray-50'
              )}
            >
              {option.value}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  )
}

export default DimensionSelector
