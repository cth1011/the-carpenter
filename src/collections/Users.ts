import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    description: 'Manage admin users who have access to this dashboard.',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
