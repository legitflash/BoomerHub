import {defineType, defineArrayMember} from 'sanity'

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'H5', value: 'h5'},
        {title: 'H6', value: 'h6'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Numbered', value: 'number'}],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators render inline text styles
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
          {title: 'Underline', value: 'underline'},
          {title: 'Strike', value: 'strike-through'},
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
          {
            title: 'Text Color',
            name: 'textColor',
            type: 'object',
            fields: [
              {
                title: 'Color',
                name: 'color',
                type: 'string',
                options: {
                  list: [
                    {title: 'Red', value: '#ef4444'},
                    {title: 'Blue', value: '#3b82f6'},
                    {title: 'Green', value: '#10b981'},
                    {title: 'Purple', value: '#8b5cf6'},
                    {title: 'Orange', value: '#f97316'},
                    {title: 'Pink', value: '#ec4899'},
                    {title: 'Teal', value: '#14b8a6'},
                    {title: 'Gray', value: '#6b7280'},
                    {title: 'Yellow', value: '#eab308'},
                    {title: 'Indigo', value: '#6366f1'},
                  ]
                }
              }
            ]
          },
          {
            title: 'Background Color',
            name: 'backgroundColor',
            type: 'object',
            fields: [
              {
                title: 'Background Color',
                name: 'color',
                type: 'string',
                options: {
                  list: [
                    {title: 'Light Red', value: '#fef2f2'},
                    {title: 'Light Blue', value: '#eff6ff'},
                    {title: 'Light Green', value: '#f0fdf4'},
                    {title: 'Light Purple', value: '#faf5ff'},
                    {title: 'Light Orange', value: '#fff7ed'},
                    {title: 'Light Pink', value: '#fdf2f8'},
                    {title: 'Light Teal', value: '#f0fdfa'},
                    {title: 'Light Gray', value: '#f9fafb'},
                    {title: 'Light Yellow', value: '#fefce8'},
                    {title: 'Light Indigo', value: '#eef2ff'},
                  ]
                }
              }
            ]
          },
          {
            title: 'Font Size',
            name: 'fontSize',
            type: 'object',
            fields: [
              {
                title: 'Size',
                name: 'size',
                type: 'string',
                options: {
                  list: [
                    {title: 'Small', value: 'text-sm'},
                    {title: 'Normal', value: 'text-base'},
                    {title: 'Large', value: 'text-lg'},
                    {title: 'Extra Large', value: 'text-xl'},
                    {title: '2X Large', value: 'text-2xl'},
                    {title: '3X Large', value: 'text-3xl'},
                  ]
                }
              }
            ]
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the array
    // directly.
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          options: {
            isHighlighted: true
          }
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          options: {
            isHighlighted: true
          }
        }
      ]
    }),
    defineArrayMember({
        type: 'cta',
        title: 'Call to Action',
    }),
    defineArrayMember({
      type: 'code',
      title: 'Code Block',
    }),
  ],
})
