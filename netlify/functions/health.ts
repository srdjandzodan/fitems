export const handler = async () => {
  const SMTP_HOST = process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com';
  const SMTP_PORT = Number(process.env.BREVO_SMTP_PORT) || 587;
  const SMTP_USER = process.env.BREVO_SMTP_USER || 'c0e126001@smtp-brevo.com';
  const SMTP_KEY = process.env.BREVO_SMTP_KEY || process.env.BREVO_API_KEY || '';
  const STUDIO_RECIPIENT =
    process.env.STUDIO_RECIPIENT_EMAIL ||
    'newfitems.oxybaric@gmail.com,newfitems.novapazova@gmail.com,DzoxUciha11@gmail.com';

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      status: 'ok',
      platform: 'netlify-functions',
      smtpHost: SMTP_HOST,
      smtpPort: SMTP_PORT,
      smtpUser: SMTP_USER,
      hasSmtpKey: Boolean(SMTP_KEY && SMTP_KEY.trim().length > 0),
      recipient: STUDIO_RECIPIENT,
      timestamp: new Date().toISOString(),
    }),
  };
};
