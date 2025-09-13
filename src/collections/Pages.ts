import { Block, CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heros',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

const TwoColumnBlock: Block = {
  slug: 'twoColumn',
  labels: {
    singular: 'Two Column',
    plural: 'Two Columns',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'text',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'imagePosition',
      type: 'select',
      options: ['left', 'right'],
      defaultValue: 'right',
    },
    {
      name: 'backgroundColor',
      type: 'select',
      options: ['white', 'light-gray', 'dark-green'],
      defaultValue: 'light-gray',
    },
  ],
}

const FeaturesBlock: Block = {
  slug: 'features',
  labels: {
    singular: 'Feature',
    plural: 'Features',
  },
  fields: [
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: ['Hammer', 'Truck', 'Ruler'],
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'disableAnimation',
      type: 'checkbox',
      label: 'Disable Animation',
      defaultValue: false,
    },
  ],
}

const RichTextBlock: Block = {
  slug: 'richText',
  labels: {
    singular: 'Rich Text',
    plural: 'Rich Texts',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor(),
    },
  ],
}

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        const baseUrl =
          process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000'
        if (data.slug === 'home') {
          return baseUrl
        }
        return `${baseUrl}/${data.slug}`
      },
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, TwoColumnBlock, FeaturesBlock, RichTextBlock],
    },
  ],
}
