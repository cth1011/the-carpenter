import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      label: 'Company Name',
      defaultValue: 'The Carpenter',
    },
    {
      name: 'companyDescription',
      type: 'textarea',
      label: 'Company Description',
    },
    {
      name: 'navSections',
      type: 'array',
      label: 'Navigation Sections',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'navLinks',
          type: 'array',
          label: 'Navigation Links',
          fields: [
            {
              name: 'linkText',
              type: 'text',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'href',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          options: ['facebook', 'instagram', 'twitter'],
          required: true,
        },
      ],
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
    },
    {
      name: 'workHours',
      type: 'text',
      label: 'Work Hours',
    },
    {
      name: 'contacts',
      type: 'array',
      label: 'Contacts',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
        {
          name: 'isEmail',
          type: 'checkbox',
          label: 'Is Email',
          defaultValue: false,
        },
      ],
    },
  ],
}
