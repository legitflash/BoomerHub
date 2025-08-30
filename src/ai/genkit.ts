import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {GoogleAuth} from 'google-auth-library';

const auth = new GoogleAuth({
  scopes: 'https://www.googleapis.com/auth/cloud-platform',
});

// Use GOOGLE_APPLICATION_CREDENTIALS_JSON if provided, otherwise fall back to default credentials
const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
  ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)
  : undefined;

export const ai = genkit({
  plugins: [googleAI({
    apiVersion: 'v1beta',
    auth: credentials ? new GoogleAuth({credentials, scopes: 'https://www.googleapis.com/auth/cloud-platform'}) : auth
  })],
  model: 'googleai/gemini-2.5-flash',
});
