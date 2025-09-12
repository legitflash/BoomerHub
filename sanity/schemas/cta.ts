import {defineField, defineType} from 'sanity'
import {Megaphone} from 'lucide-react'

export default defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  icon: Megaphone,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main headline for the CTA.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A short description or subtext.',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'The text that appears on the button.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'The destination URL for the button.',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }).required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'buttonText',
    },
  },
})
