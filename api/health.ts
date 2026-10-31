export interface VercelApiRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
}

export interface VercelApiResponse {
  status: (statusCode: number) => VercelApiResponse;
  json: (body: any) => VercelApiResponse;
  setHeader: (name: string, value: string | string[]) => VercelApiResponse;
}

export default function handler(req: VercelApiRequest, res: VercelApiResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  const SMTP_HOST = process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com';
  const SMTP_PORT = Number(process.env.BREVO_SMTP_PORT) || 587;
  const SMTP_USER = process.env.BREVO_SMTP_USER || 'c0e126001@smtp-brevo.com';
  const SMTP_KEY = process.env.BREVO_SMTP_KEY || process.env.BREVO_API_KEY || '';
  const STUDIO_RECIPIENT =
    process.env.STUDIO_RECIPIENT_EMAIL ||
    'newfitems.oxybaric@gmail.com,newfitems.novapazova@gmail.com,DzoxUciha11@gmail.com';

  return res.status(200).json({
    status: 'ok',
    platform: 'vercel-serverless',
    smtpHost: SMTP_HOST,
    smtpPort: SMTP_PORT,
    smtpUser: SMTP_USER,
    hasSmtpKey: Boolean(SMTP_KEY && SMTP_KEY.trim().length > 0),
    recipient: STUDIO_RECIPIENT,
    timestamp: new Date().toISOString(),
  });
}
