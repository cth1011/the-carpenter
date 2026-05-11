import { GlobalConfig } from 'payload'
import { revalidateLayout } from '../hooks/revalidateCache'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header',
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateLayout],
  },
  fields: [
    {
      name: 'logoText',
      type: 'text',
      label: 'Logo Text',
      defaultValue: 'The Carpenter',
    },
    {
      name: 'navLinks',
      type: 'array',
      label: 'Navigation Links',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
