
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-07-22'

// This file is used for both server-side and client-side operations.
// Vercel exposes environment variables to the build process via `process.env`.
// We prioritize the server-side variables and fall back to the public ones.
export const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const useCdn = false
