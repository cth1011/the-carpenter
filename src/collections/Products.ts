import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { revalidateProduct, revalidateProductDelete } from '../hooks/revalidateCache'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    description: 'Manage your catalog of doors. Add new products, update images, and set available dimensions here.',
    defaultColumns: ['name', 'category', 'productType', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const baseUrl =
          process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        return `${baseUrl}/products/${data.id}`
      },
    },
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  hooks: {
    afterChange: [revalidateProduct],
    afterDelete: [revalidateProductDelete],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'productImages',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'legacyImageUrl',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Original image URL from the CSV import.',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
    },
    {
      name: 'dimensions',
      label: 'Dimension Options',
      type: 'group',
      admin: {
        description: 'Define the available dimension options for this product.',
      },
      fields: [
        {
          name: 'thickness',
          type: 'array',
          fields: [{ name: 'value', type: 'text', required: true }],
        },
        {
          name: 'width',
          type: 'array',
          fields: [{ name: 'value', type: 'text', required: true }],
        },
        {
          name: 'height',
          type: 'array',
          fields: [{ name: 'value', type: 'text', required: true }],
        },
      ],
    },
  ],
}
