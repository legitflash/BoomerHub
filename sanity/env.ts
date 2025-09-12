
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-07-22'

// When fetching in a server-side context (like getStaticProps),
// Vercel exposes environment variables through process.env.
// NEXT_PUBLIC_ is for client-side exposure.
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production';
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID!;
export const useCdn = false
