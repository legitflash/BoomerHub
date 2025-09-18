import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Safe initialization for build time - use placeholder key if not available
const apiKey = process.env.GEMINI_API_KEY || 'build-placeholder-key';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey,
      apiVersion: 'v1beta',
    }),
  ],
  model: 'googleai/gemini-2.5-flash',
});
