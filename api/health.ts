import nodemailer from 'nodemailer';

export interface VercelApiRequest {
  method?: string;
  query?: Record<string, string | string[]>;
  headers: Record<string, string | string[] | undefined>;
}

export interface VercelApiResponse {
  status: (statusCode: number) => VercelApiResponse;
  json: (body: any) => VercelApiResponse;
  setHeader: (name: string, value: string | string[]) => VercelApiResponse;
}

function cleanEnv(value?: string): string {
  if (!value) return '';
  return value.trim().replace(/^["']|["']$/g, '').trim();
}

export default async function handler(req: VercelApiRequest, res: VercelApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  const SMTP_HOST = cleanEnv(process.env.BREVO_SMTP_HOST) || 'smtp-relay.brevo.com';
  const SMTP_PORT = Number(cleanEnv(process.env.BREVO_SMTP_PORT)) || 587;
  const SMTP_USER = cleanEnv(process.env.BREVO_SMTP_USER) || 'c0e126001@smtp-brevo.com';
  const SMTP_KEY = cleanEnv(process.env.BREVO_SMTP_KEY) || cleanEnv(process.env.BREVO_API_KEY);
  const SENDER_EMAIL = cleanEnv(process.env.BREVO_SENDER_EMAIL) || 'newfitems.oxybaric@gmail.com';
  const STUDIO_RECIPIENT =
    cleanEnv(process.env.STUDIO_RECIPIENT_EMAIL) ||
    'newfitems.oxybaric@gmail.com,newfitems.novapazova@gmail.com,DzoxUciha11@gmail.com';

  const keyFormat = !SMTP_KEY
    ? 'missing'
    : SMTP_KEY.startsWith('xkeysib-')
    ? 'api-v3 (xkeysib-...)'
    : SMTP_KEY.startsWith('xsmtpsib-')
    ? 'smtp-key (xsmtpsib-...)'
    : 'custom-password';

  let smtpVerify: string | null = null;
  let apiVerify: string | null = null;

  const shouldVerify = req.query?.verify === '1' || req.query?.verify === 'true';

  if (shouldVerify && SMTP_KEY) {
    // Test SMTP connection & auth without sending email
    try {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        requireTLS: SMTP_PORT === 587,
        auth: {
          user: SMTP_USER,
          pass: SMTP_KEY,
        },
        connectionTimeout: 5000,
        greetingTimeout: 5000,
        tls: {
          servername: SMTP_HOST,
          rejectUnauthorized: false,
        },
      });
      await transporter.verify();
      smtpVerify = 'ok';
    } catch (err: any) {
      smtpVerify = `error: ${err?.message || String(err)}`;
    }

    // If API v3 key format, also verify Brevo REST API
    if (SMTP_KEY.startsWith('xkeysib-')) {
      try {
        const resp = await fetch('https://api.brevo.com/v3/account', {
          headers: { 'api-key': SMTP_KEY, accept: 'application/json' },
        });
        apiVerify = resp.ok ? 'ok' : `HTTP ${resp.status}: ${await resp.text()}`;
      } catch (err: any) {
        apiVerify = `error: ${err?.message || String(err)}`;
      }
    }
  }

  return res.status(200).json({
    status: SMTP_KEY ? 'ok' : 'misconfigured',
    platform: 'vercel-serverless',
    smtpHost: SMTP_HOST,
    smtpPort: SMTP_PORT,
    smtpUser: SMTP_USER,
    senderEmail: SENDER_EMAIL,
    hasSmtpKey: Boolean(SMTP_KEY),
    keyFormat,
    recipient: STUDIO_RECIPIENT,
    ...(shouldVerify ? { smtpVerify, apiVerify } : {}),
    timestamp: new Date().toISOString(),
  });
}
