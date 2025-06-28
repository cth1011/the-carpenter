import { type SchemaTypeDefinition } from 'sanity'
import door from './door'
import category from './category'
import blockContent from './blockContent'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [door, category, blockContent],
}