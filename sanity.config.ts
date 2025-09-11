/**
 * This configuration is used to for the Sanity Studio when running `sanity build` or `sanity deploy`.
 *
 * You may delete this file if you're not using the Studio.
 * https://www.sanity.io/docs/configuring-the-studio
 */
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion} from './src/lib/sanity-client'
import {schema} from './sanity.schema'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    structureTool(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
