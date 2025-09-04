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
    // Sanitize the JSON string: remove escaped newlines and trim whitespace/quotes.
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
  plugins: [googleAI({
    apiKey: process.env.GEMINI_API_KEY,
    apiVersion: 'v1beta',
    auth: credentials ? new GoogleAuth({credentials, scopes: 'https://www.googleapis.com/auth/cloud-platform'}) : auth
  })],
  model: 'googleai/gemini-2.5-flash',
});
