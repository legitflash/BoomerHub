import {defineField, defineType} from 'sanity'
import {Code} from 'lucide-react'

export default defineType({
  name: 'code',
  title: 'Code Block',
  type: 'object',
  icon: Code,
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      description: 'Default: Renders HTML as visual components. Choose "Show Code" to display syntax-highlighted code instead.',
      options: {
        list: [
          {title: 'Render as Component (Default)', value: 'component'},
          {title: 'Show Code (Syntax Highlighted)', value: 'code'},
        ]
      }
    }),
    defineField({
      name: 'filename',
      title: 'Filename',
      type: 'string',
      description: '(Optional) A filename to display for the code block (e.g., "index.js").',
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'filename',
      subtitle: 'language',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Code Block',
        subtitle: subtitle || 'Unknown language',
        icon: Code,
      }
    },
  },
})
