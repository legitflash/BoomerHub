
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-07-22'

// When fetching in a server-side context (like getStaticProps),
// Vercel exposes environment variables through process.env.
// NEXT_PUBLIC_ is for client-side exposure.
export const dataset = 'production';
export const projectId = 'qbb85k0a';
export const useCdn = false
