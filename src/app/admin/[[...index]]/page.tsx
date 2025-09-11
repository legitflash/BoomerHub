// This route is responsible for the built-in Sanity Studio.
// All routes that start with `/admin` are routed here.
// You can learn more about this file here: https://www.sanity.io/docs/guides/next-js-app-router-and-sanity-v3

'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
