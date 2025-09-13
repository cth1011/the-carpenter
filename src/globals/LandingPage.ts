import { GlobalConfig } from 'payload'

export const LandingPage: GlobalConfig = {
  slug: 'landing-page',
  label: 'Landing Page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          label: 'Subtitle',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Background Image',
        },
        {
          name: 'cta',
          type: 'group',
          label: 'Call to Action',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              label: 'Text',
            },
            {
              name: 'link',
              type: 'text',
              required: true,
              label: 'Link',
            },
          ],
        },
      ],
    },
    {
      name: 'twoColumnContent',
      type: 'group',
      label: 'Two Column Content',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Text',
        },
        {
          name: 'buttonText',
          type: 'text',
          label: 'Button Text',
        },
        {
          name: 'buttonLink',
          type: 'text',
          label: 'Button Link',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
        },
      ],
    },
    {
      name: 'featuredProducts',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      label: 'Featured Products',
    },
  ],
}
