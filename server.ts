import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

// Brevo SMTP configuration
const SMTP_HOST = process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com';
const SMTP_PORT = Number(process.env.BREVO_SMTP_PORT) || 587;
const SMTP_USER = process.env.BREVO_SMTP_USER || 'c0e126001@smtp-brevo.com';
const SMTP_KEY = process.env.BREVO_SMTP_KEY || process.env.BREVO_API_KEY || '';
const STUDIO_RECIPIENT = process.env.STUDIO_RECIPIENT_EMAIL || 'newfitems.oxybaric@gmail.com,newfitems.novapazova@gmail.com,DzoxUciha11@gmail.com';
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'newfitems.oxybaric@gmail.com';
const SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Vuk Djoric (New Fitems)';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Transporter setup
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // true for 465, false for 587
  auth: {
    user: SMTP_USER,
    pass: SMTP_KEY,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    smtpHost: SMTP_HOST,
    smtpPort: SMTP_PORT,
    smtpUser: SMTP_USER,
    hasSmtpKey: Boolean(SMTP_KEY && SMTP_KEY.trim().length > 0),
    recipient: STUDIO_RECIPIENT,
  });
});

// Interface for booking / contact request
interface EmailPayload {
  name: string;
  phone: string;
  service?: string;
  timePreference?: string;
  email?: string;
  message?: string;
  source?: string;
}

const handleSendEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      name,
      phone,
      service = 'EMS Vođeni Trening',
      timePreference = 'Nije navedeno',
      email = '',
      message = '',
      source = 'Website Form'
    } = req.body as EmailPayload;

    if (!name || !phone) {
      res.status(400).json({
        success: false,
        error: 'Ime i broj telefona su obavezni.',
      });
      return;
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
Izvor: ${source}

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
Telefon studija: 069 270 7833
`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FAF3EB; margin: 0; padding: 24px; color: #1c1917; }
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
      <span class="badge">Novi upit sa sajta</span>
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
      New Fitems · Kralja Petra I Karađorđevića 87, Nova Pazova · Brevo SMTP integracija
    </div>
  </div>
</body>
</html>
`;

    // If SMTP_KEY is not configured yet, simulate gracefully and notify
    if (!SMTP_KEY || SMTP_KEY.trim() === '') {
      console.warn(
        `[Brevo SMTP] BREVO_SMTP_KEY nije postavljen u .env fajlu. Upit je uspešno simuliran i zabeležen na serveru:\nIme: ${name}\nTelefon: ${phone}\nProgram: ${service}\nTermin: ${timePreference}`
      );
      res.json({
        success: true,
        simulated: true,
        message: 'Upit je uspešno zabeležen! (SMTP ključ čeka unos u .env konfiguraciji)',
      });
      return;
    }

    // Send email via Brevo SMTP
    const info = await transporter.sendMail({
      from: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
      to: STUDIO_RECIPIENT,
      replyTo: email && email.includes('@') ? email : undefined,
      subject,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[Brevo SMTP] Email uspešno poslat preko Brevo relay-a! Message ID: ${info.messageId}`);
    res.json({
      success: true,
      messageId: info.messageId,
      message: 'Upit je uspešno poslat! Uskoro ćemo vas kontaktirati.',
    });
  } catch (error: any) {
    console.error('[Brevo SMTP] Greška prilikom slanja email-a:', error);
    res.status(500).json({
      success: false,
      error: error?.message || 'Greška prilikom slanja poruke preko Brevo SMTP servera.',
    });
  }
};

// Route handlers
app.post('/api/send-email', handleSendEmail);
app.post('/api/book', handleSendEmail);
app.post('/api/contact', handleSendEmail);

// Server startup with Vite middlewares in development or static serving in production
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] New Fitems server listening on port ${PORT} (dev: ${!isProduction})`);
    console.log(`[Brevo SMTP] Server: ${SMTP_HOST}:${SMTP_PORT}, Login: ${SMTP_USER}`);
    console.log(`[Brevo SMTP] Ključ: ${SMTP_KEY ? 'Konfigurisan' : 'Nije unet (potreban BREVO_SMTP_KEY u .env)'}`);
  });
}

startServer().catch((err) => {
  console.error('[Server] Neuspešno pokretanje servera:', err);
});
