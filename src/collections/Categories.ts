import type { CollectionConfig } from 'payload'
import { revalidateCategory, revalidateCategoryDelete } from '../hooks/revalidateCache'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    description: 'Organize your products into categories like "Entrance Doors" or "Internal Doors".',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateCategory],
    afterDelete: [revalidateCategoryDelete],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'sort_order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
