import { Resend } from 'resend';

// IMPORTANT: Create a new API key in your Resend dashboard and add it as an
// environment variable in your Netlify settings.
const resend = new Resend(process.env.RESEND_API_KEY);
const audienceId = process.env.RESEND_AUDIENCE_ID; // Also add your Audience ID as an env variable

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { email } = JSON.parse(event.body);

  if (!email) {
    return { statusCode: 400, body: 'Email is required' };
  }
  
  if (!audienceId) {
    console.error('Resend Audience ID is not configured.');
    return { statusCode: 500, body: 'Server configuration error.' };
  }

  try {
    const { data, error } = await resend.contacts.create({
      email: email,
      audienceId: audienceId,
      unsubscribed: false,
    });

    if (error) {
      // Log the detailed error from Resend
      console.error('Resend API error:', error);
      
      // Provide a generic error message to the client for security
      return { 
        statusCode: 500, 
        body: JSON.stringify({ message: 'Failed to subscribe.' }) 
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Subscription successful!' }),
    };
  } catch (error) {
    console.error('Newsletter signup function error:', error);
    return { 
        statusCode: 500, 
        body: JSON.stringify({ message: 'An unexpected error occurred.' }) 
    };
  }
};
