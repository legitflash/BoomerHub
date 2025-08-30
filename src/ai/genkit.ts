import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {GoogleAuth} from 'google-auth-library';

const auth = new GoogleAuth({
  scopes: 'https://www.googleapis.com/auth/cloud-platform',
});

// Use GOOGLE_APPLICATION_CREDENTIALS_JSON if provided, otherwise fall back to default credentials
let credentials;
if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
  try {
    // Standard JSON parsing
    credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
  } catch (e) {
    try {
      // Fallback for improperly escaped newlines
      const sanitizedJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON.replace(/\\n/g, '\n');
      credentials = JSON.parse(sanitizedJson);
    } catch (error) {
      console.error("Failed to parse GOOGLE_APPLICATION_CREDENTIALS_JSON:", error);
      credentials = undefined;
    }
  }
}


export const ai = genkit({
  plugins: [googleAI({
    apiVersion: 'v1beta',
    auth: credentials ? new GoogleAuth({credentials, scopes: 'https://www.googleapis.com/auth/cloud-platform'}) : auth
  })],
  model: 'googleai/gemini-2.5-flash',
});
