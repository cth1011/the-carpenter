import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'door',
  title: 'Door',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Enables hotspot editing for better image cropping
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Starting Price',
      type: 'number',
      description: 'The base price for the door. The quote may be higher based on customizations.',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent', // Using the rich text editor schema
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}], // This links to the Category schema
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'specifications',
        title: 'Specifications',
        type: 'array',
        of: [{
            type: 'object',
            fields: [
                {name: 'feature', type: 'string', title: 'Feature'},
                {name: 'value', type: 'string', title: 'Value'}
            ]
        }]
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: 'category.name',
    },
  },
})
