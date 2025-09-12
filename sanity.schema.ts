import { type SchemaTypeDefinition } from 'sanity'
import blockContent from './sanity/schemas/block-content'
import category from './sanity/schemas/category'
import post from './sanity/schemas/post'
import author from './sanity/schemas/author'
import page from './sanity/schemas/page'
import cta from './sanity/schemas/cta'
import code from './sanity/schemas/code'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, blockContent, page, cta, code],
}
