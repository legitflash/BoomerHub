import {defineField, defineType} from 'sanity'

const icons = ['DollarSign', 'Tv', 'Code', 'Briefcase', 'Rocket', 'BarChart', 'Newspaper', 'Gamepad', 'Trophy', 'TrendingUp', 'Plane', 'Edit'];

export default defineType({
  name: 'category',
  title: 'Category',
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
      name: 'iconName',
      title: 'Icon Name',
      type: 'string',
      options: {
        list: icons.map(icon => ({ title: icon, value: icon })),
      },
      description: 'Select an icon from the Lucide icon library.',
       validation: [
        (Rule) => Rule.required(),
        (Rule) => Rule.custom((value) => {
            if (!value) return true; // Handled by required()
            return icons.includes(value) ? true : 'Please select a valid icon from the list.'
        })
      ]
    }),
  ],
})
