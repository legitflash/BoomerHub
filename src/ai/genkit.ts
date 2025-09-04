import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {GoogleAuth} from 'google-auth-library';

let credentials;

// Check if individual credential environment variables are set
if (
  process.env.GOOGLE_PRIVATE_KEY &&
  process.env.GOOGLE_CLIENT_EMAIL &&
  process.env.GOOGLE_PROJECT_ID
) {
  credentials = {
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    project_id: process.env.GOOGLE_PROJECT_ID,
  };
} else if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
  // Fallback for local development if the full JSON is still provided
  try {
    let jsonString = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON.replace(/\\n/g, '\n').trim();
    if (jsonString.startsWith('"') && jsonString.endsWith('"')) {
      jsonString = jsonString.substring(1, jsonString.length - 1);
    }
    credentials = JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse GOOGLE_APPLICATION_CREDENTIALS_JSON:", error);
    credentials = undefined;
  }
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
      apiVersion: 'v1beta',
      // Use credentials object if it was successfully created, otherwise use default auth
      auth: credentials
        ? new GoogleAuth({
            credentials,
            scopes: 'https://www.googleapis.com/auth/cloud-platform',
          })
        : new GoogleAuth({
            scopes: 'https://www.googleapis.com/auth/cloud-platform',
          }),
    }),
  ],
  model: 'googleai/gemini-2.5-flash',
});
