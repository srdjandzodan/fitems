import nodemailer from 'nodemailer';

// Helper interface for Vercel Request & Response
export interface VercelApiRequest {
  method?: string;
  body?: any;
  query?: Record<string, string | string[]>;
  headers: Record<string, string | string[] | undefined>;
}

export interface VercelApiResponse {
  status: (statusCode: number) => VercelApiResponse;
  json: (body: any) => VercelApiResponse;
  send: (body: any) => VercelApiResponse;
  setHeader: (name: string, value: string | string[]) => VercelApiResponse;
  writeHead?: (statusCode: number, headers?: any) => void;
  end?: (chunk?: any) => void;
}

interface EmailPayload {
  name: string;
  phone: string;
  service?: string;
  timePreference?: string;
  email?: string;
  message?: string;
  source?: string;
}

function cleanEnv(value?: string): string {
  if (!value) return '';
  return value.trim().replace(/^["']|["']$/g, '').trim();
}

export default async function handler(req: VercelApiRequest, res: VercelApiResponse) {
  // CORS Headers for Vercel Serverless
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Preflight OPTIONS handling
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Metod nije dozvoljen. Dozvoljen je samo POST za slanje email-a.',
    });
  }

  try {
    // Parse payload whether Vercel parsed it, passed a Buffer, or passed raw text
    let payload: EmailPayload;
    const rawBody = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : req.body;

    if (typeof rawBody === 'string') {
      try {
        payload = JSON.parse(rawBody);
      } catch {
        const params = new URLSearchParams(rawBody);
        payload = {
          name: params.get('name') || '',
          phone: params.get('phone') || '',
          service: params.get('service') || undefined,
          timePreference: params.get('timePreference') || undefined,
          email: params.get('email') || undefined,
          message: params.get('message') || undefined,
          source: params.get('source') || undefined,
        };
      }
    } else {
      payload = (rawBody as EmailPayload) || {};
    }

    const {
      name,
      phone,
      service = 'EMS Vođeni Trening',
      timePreference = 'Nije navedeno',
      email = '',
      message = '',
      source = 'Vercel Web Form',
    } = payload;

    if (!name || !name.trim() || !phone || !phone.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Ime i broj telefona su obavezni.',
      });
    }

    // Brevo SMTP and API Configuration (trimmed + unquoted)
    const SMTP_HOST = cleanEnv(process.env.BREVO_SMTP_HOST) || 'smtp-relay.brevo.com';
    const SMTP_PORT = Number(cleanEnv(process.env.BREVO_SMTP_PORT)) || 587;
    const SMTP_USER = cleanEnv(process.env.BREVO_SMTP_USER) || 'c0e126001@smtp-brevo.com';
    const SMTP_KEY = cleanEnv(process.env.BREVO_SMTP_KEY) || cleanEnv(process.env.BREVO_API_KEY);
    const API_KEY = cleanEnv(process.env.BREVO_API_KEY) || (SMTP_KEY.startsWith('xkeysib-') ? SMTP_KEY : '');
    const STUDIO_RECIPIENT =
      cleanEnv(process.env.STUDIO_RECIPIENT_EMAIL) ||
      'newfitems.oxybaric@gmail.com,newfitems.novapazova@gmail.com,DzoxUciha11@gmail.com';
    const SENDER_EMAIL = cleanEnv(process.env.BREVO_SENDER_EMAIL) || 'newfitems.oxybaric@gmail.com';
    const SENDER_NAME = cleanEnv(process.env.BREVO_SENDER_NAME) || 'Vuk Djoric (New Fitems)';

    if (!SMTP_KEY) {
      console.error('[Vercel Brevo] BREVO_SMTP_KEY / BREVO_API_KEY nije podešen u Vercel Environment Variables.');
      return res.status(500).json({
        success: false,
        code: 'MISSING_BREVO_KEY',
        error:
          'Brevo ključ nije podešen na Vercel-u (Settings -> Environment Variables -> BREVO_SMTP_KEY, pa Redeploy).',
      });
    }

    const recipientEmails = STUDIO_RECIPIENT.split(/[,\s;]+/)
      .map((item) => item.trim())
      .filter((addr) => addr.includes('@'));

    if (recipientEmails.length === 0) {
      recipientEmails.push('newfitems.oxybaric@gmail.com');
    }

    const timestamp = new Date().toLocaleString('sr-RS', {
      timeZone: 'Europe/Belgrade',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    const subject = `[New Fitems] Novi upit za termin: ${name} (${service})`;

    const textContent = `
NOVI UPIT ZA TERMIN - NEW FITEMS
=================================
Vreme upita: ${timestamp}
Izvor: ${source} (Vercel Serverless)

PODACI O KLIJENTU:
------------------
Ime i prezime: ${name}
Telefon: ${phone}
Email: ${email || 'Nije unet'}

DETALJI TERMINA:
----------------
Izabrani program: ${service}
Željeni deo dana: ${timePreference}
Dodatna poruka: ${message || 'Nema dodatnih napomena'}

Studio: Kralja Petra I Karađorđevića 87, Nova Pazova
Telefon studija: +381 69 270 7889
`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FAF3EB; margin: 0; padding: 24px; color: #1c1917; }
    .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e7e5e4; box-shadow: 0 4px 12px rgba(0,0,0,0.06); }
    .header { background: #000000; padding: 28px 24px; text-align: center; }
    .header h1 { margin: 0; color: #CFF3CF; font-size: 22px; letter-spacing: 1.5px; text-transform: uppercase; font-weight: 800; }
    .header p { margin: 6px 0 0; color: #FAF3EB; font-size: 13px; }
    .badge { display: inline-block; background: #CFF3CF; color: #000000; font-size: 11px; font-weight: bold; text-transform: uppercase; padding: 4px 12px; border-radius: 9999px; margin-top: 8px; }
    .body { padding: 28px 24px; }
    .section-title { font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #78716c; margin-bottom: 12px; border-bottom: 1px solid #f5f5f4; padding-bottom: 6px; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .table td { padding: 10px 12px; font-size: 14px; border-bottom: 1px solid #f5f5f4; }
    .table td.label { font-weight: 600; color: #44403c; width: 38%; }
    .table td.value { color: #0c0a09; font-weight: 500; }
    .call-btn { display: block; text-align: center; background: #000000; color: #CFF3CF; padding: 14px 20px; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin-top: 20px; }
    .footer { background: #f5f5f4; padding: 16px 24px; text-align: center; font-size: 11px; color: #78716c; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">Novi upit sa sajta (Vercel)</span>
      <h1>NEW FITEMS</h1>
      <p>Studio za individualne EMS treninge · Nova Pazova</p>
    </div>
    <div class="body">
      <div class="section-title">Podaci o klijentu</div>
      <table class="table">
        <tr>
          <td class="label">Ime i prezime:</td>
          <td class="value"><strong>${name}</strong></td>
        </tr>
        <tr>
          <td class="label">Broj telefona:</td>
          <td class="value"><strong style="font-size: 16px; color: #000000;">${phone}</strong></td>
        </tr>
        ${email ? `<tr><td class="label">Email:</td><td class="value">${email}</td></tr>` : ''}
      </table>

      <div class="section-title">Izabrane opcije</div>
      <table class="table">
        <tr>
          <td class="label">Program:</td>
          <td class="value"><strong>${service}</strong></td>
        </tr>
        <tr>
          <td class="label">Željeni termin:</td>
          <td class="value">${timePreference}</td>
        </tr>
        ${message ? `<tr><td class="label">Poruka:</td><td class="value">${message}</td></tr>` : ''}
        <tr>
          <td class="label">Vreme prispeća:</td>
          <td class="value" style="color: #78716c;">${timestamp}</td>
        </tr>
      </table>

      <a href="tel:${phone.replace(/\s+/g, '')}" class="call-btn">
        Pozovi klijenta odmah: ${phone}
      </a>
    </div>
    <div class="footer">
      New Fitems · Kralja Petra I Karađorđevića 87, Nova Pazova · Brevo Vercel Integracija
    </div>
  </div>
</body>
</html>
`;

    let restError: string | null = null;
    let smtpError: string | null = null;

    // 1. Ako imamo Brevo REST API v3 ključ (xkeysib-...), šaljemo preko HTTPS REST API-ja (najbrže za serverless)
    if (API_KEY) {
      try {
        const brevoApiPayload: Record<string, any> = {
          sender: {
            name: SENDER_NAME,
            email: SENDER_EMAIL,
          },
          to: recipientEmails.map((addr) => ({ email: addr })),
          subject,
          htmlContent,
          textContent,
        };

        if (email && email.trim().includes('@')) {
          brevoApiPayload.replyTo = { email: email.trim(), name: name.trim() };
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 7000);

        const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': API_KEY,
            accept: 'application/json',
          },
          body: JSON.stringify(brevoApiPayload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (brevoResponse.ok) {
          const result = (await brevoResponse.json()) as any;
          console.log('[Vercel Brevo REST] Uspešno poslat email preko Brevo API:', result);
          return res.status(200).json({
            success: true,
            transport: 'brevo-rest',
            messageId: result?.messageId || 'sent',
            message: 'Upit je uspešno poslat! Uskoro ćemo vas kontaktirati.',
          });
        } else {
          const errorText = await brevoResponse.text();
          restError = `HTTP ${brevoResponse.status}: ${errorText}`;
          console.warn('[Vercel Brevo REST] REST API odbio:', restError);
        }
      } catch (err: any) {
        restError = err?.message || String(err);
        console.warn('[Vercel Brevo REST] REST poziv nije uspeo:', restError);
      }
    }

    // 2. Nodemailer SMTP relay (primarno za xsmtpsib-... / SMTP Master Password ili fallback za REST)
    const sendViaSmtpPort = async (port: number) => {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port,
        secure: port === 465,
        requireTLS: port === 587,
        auth: {
          user: SMTP_USER,
          pass: SMTP_KEY,
        },
        connectionTimeout: 6000,
        greetingTimeout: 6000,
        socketTimeout: 8000,
        tls: {
          servername: SMTP_HOST,
          rejectUnauthorized: false,
        },
      });

      return transporter.sendMail({
        from: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
        to: recipientEmails.join(', '),
        replyTo: email && email.trim().includes('@') ? email.trim() : undefined,
        subject,
        text: textContent,
        html: htmlContent,
      });
    };

    try {
      const info = await sendViaSmtpPort(SMTP_PORT);
      console.log(`[Vercel Brevo SMTP:${SMTP_PORT}] Email poslat! Message ID: ${info.messageId}`);
      return res.status(200).json({
        success: true,
        transport: `smtp-${SMTP_PORT}`,
        messageId: info.messageId,
        message: 'Upit je uspešno poslat! Uskoro ćemo vas kontaktirati.',
      });
    } catch (primarySmtpErr: any) {
      smtpError = `Port ${SMTP_PORT}: ${primarySmtpErr?.message || String(primarySmtpErr)}`;
      console.warn(`[Vercel Brevo SMTP] Neuspeh na portu ${SMTP_PORT}:`, smtpError);

      // Ako je greška mrežna/port (a ne loša šifra), probaj alternativni port (587 <-> 465)
      const isAuthFailure =
        primarySmtpErr?.responseCode === 535 ||
        /auth|invalid login|authentication/i.test(primarySmtpErr?.message || '');

      if (!isAuthFailure) {
        const fallbackPort = SMTP_PORT === 465 ? 587 : 465;
        try {
          const info = await sendViaSmtpPort(fallbackPort);
          console.log(`[Vercel Brevo SMTP:${fallbackPort}] Fallback uspeo! Message ID: ${info.messageId}`);
          return res.status(200).json({
            success: true,
            transport: `smtp-${fallbackPort}`,
            messageId: info.messageId,
            message: 'Upit je uspešno poslat! Uskoro ćemo vas kontaktirati.',
          });
        } catch (fallbackSmtpErr: any) {
          smtpError += ` | Port ${fallbackPort}: ${fallbackSmtpErr?.message || String(fallbackSmtpErr)}`;
          console.error(`[Vercel Brevo SMTP] Neuspeh i na portu ${fallbackPort}:`, fallbackSmtpErr);
        }
      }
    }

    return res.status(500).json({
      success: false,
      error: smtpError || restError || 'Greška prilikom slanja email-a preko Brevo servera.',
      details: {
        smtpHost: SMTP_HOST,
        smtpPort: SMTP_PORT,
        smtpUser: SMTP_USER,
        senderEmail: SENDER_EMAIL,
        keyType: SMTP_KEY.startsWith('xkeysib-')
          ? 'api-v3'
          : SMTP_KEY.startsWith('xsmtpsib-')
          ? 'smtp-key'
          : 'custom',
        restError,
        smtpError,
      },
    });
  } catch (error: any) {
    console.error('[Vercel Brevo] Neočekivana greška pri obradi:', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Greška prilikom slanja email-a sa Vercel serverless funkcije.',
    });
  }
}
