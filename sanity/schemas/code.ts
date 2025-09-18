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
      description: 'Choose language for syntax highlighting, or "component" to render HTML as visual components',
      options: {
        list: [
          {title: 'Render as Component (HTML)', value: 'component'},
          {title: 'TypeScript', value: 'typescript'},
          {title: 'JavaScript', value: 'javascript'},
          {title: 'HTML', value: 'html'},
          {title: 'CSS', value: 'css'},
          {title: 'Python', value: 'python'},
          {title: 'Java', value: 'java'},
          {title: 'PHP', value: 'php'},
          {title: 'JSON', value: 'json'},
          {title: 'SQL', value: 'sql'},
          {title: 'Bash', value: 'bash'},
          {title: 'Text (No highlighting)', value: 'text'},
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
