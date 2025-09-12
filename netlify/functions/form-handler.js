
exports.handler = async (event) => {
  const { formName, ...fields } = JSON.parse(event.body);

  const formSubmission = {
    form_name: formName,
    payload: fields,
    created_at: new Date(),
  };

  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`${process.env.URL}/.netlify/functions/submission-created`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formSubmission),
    });

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Form submission processed' }),
      };
    } else {
      throw new Error(`Failed to submit to Netlify: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Form handler error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error processing form submission' }),
    };
  }
};
