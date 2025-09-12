import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
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
        hotspot: true,
      },
       validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'role',
        title: 'Role',
        type: 'string',
        description: 'e.g. Editor, Guest Author',
         validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A short bio for the author page.',
       validation: (Rule) => Rule.required(),
    }),
     defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Optional: Email address for internal use.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
