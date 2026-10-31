import nodemailer from 'nodemailer';

interface EmailPayload {
  name: string;
  phone: string;
  service?: string;
  timePreference?: string;
  email?: string;
  message?: string;
  source?: string;
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json',
};

export const handler = async (event: any) => {
  // CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ ok: true }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, error: 'Metod nije dozvoljen. Dozvoljen je samo POST.' }),
    };
  }

  try {
    let payload: EmailPayload;
    if (typeof event.body === 'string') {
      try {
        payload = JSON.parse(event.body);
      } catch {
        // Fallback for form-urlencoded
        const params = new URLSearchParams(event.body);
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
      payload = (event.body as EmailPayload) || {};
    }

    const {
      name,
      phone,
      service = 'EMS Vođeni Trening',
      timePreference = 'Nije navedeno',
      email = '',
      message = '',
      source = 'Netlify Web Form',
    } = payload;

    if (!name || !name.trim() || !phone || !phone.trim()) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: 'Ime i broj telefona su obavezni.',
        }),
      };
    }

    // Environment variables
    const SMTP_HOST = process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com';
    const SMTP_PORT = Number(process.env.BREVO_SMTP_PORT) || 587;
    const SMTP_USER = process.env.BREVO_SMTP_USER || 'c0e126001@smtp-brevo.com';
    const SMTP_KEY = process.env.BREVO_SMTP_KEY || process.env.BREVO_API_KEY || '';
    const STUDIO_RECIPIENT =
      process.env.STUDIO_RECIPIENT_EMAIL ||
      'newfitems.oxybaric@gmail.com,newfitems.novapazova@gmail.com,DzoxUciha11@gmail.com';
    const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'newfitems.oxybaric@gmail.com';
    const SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Vuk Djoric (New Fitems)';

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
      <span class="badge">Novi upit sa sajta (Netlify)</span>
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

    // Ako ključ nije unet na Netlify, simuliramo uspešno slanje
    if (!SMTP_KEY || SMTP_KEY.trim() === '') {
      console.warn(
        `[Netlify Brevo] BREVO_SMTP_KEY nije postavljen u Netlify Environment Variables. Simulacija zabeležena:\n${name} (${phone})`
      );
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: true,
          simulated: true,
          message: 'Upit je uspešno zabeležen! (Dodajte BREVO_SMTP_KEY u Netlify Environment Variables)',
        }),
      };
    }

    // 1. Primarni način u serverless okruženju: Brevo REST API v3
    // Izbegava probleme sa blokiranim SMTP portovima na cloud serverless mrežama
    try {
      const recipientList = STUDIO_RECIPIENT.split(',').map((item) => ({
        email: item.trim(),
      })).filter((r) => r.email.includes('@'));

      const brevoApiPayload: any = {
        sender: {
          name: SENDER_NAME,
          email: SENDER_EMAIL,
        },
        to: recipientList.length > 0 ? recipientList : [{ email: 'newfitems.oxybaric@gmail.com' }],
        subject,
        htmlContent,
        textContent,
      };

      if (email && email.includes('@')) {
        brevoApiPayload.replyTo = { email: email.trim(), name };
      }

      const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': SMTP_KEY.trim(),
          accept: 'application/json',
        },
        body: JSON.stringify(brevoApiPayload),
      });

      if (brevoResponse.ok) {
        const result = await brevoResponse.json();
        console.log('[Netlify Brevo REST] Uspešno poslat email:', result);
        return {
          statusCode: 200,
          headers: CORS_HEADERS,
          body: JSON.stringify({
            success: true,
            messageId: (result as any)?.messageId || 'sent',
            message: 'Upit je uspešno poslat! Uskoro ćemo vas kontaktirati.',
          }),
        };
      } else {
        const errorText = await brevoResponse.text();
        console.warn('[Netlify Brevo REST] REST API vratio:', brevoResponse.status, errorText);
        // Ako REST API odbije (npr. ključ je strogo SMTP-only a ne API v3 ključ), idemo na Nodemailer fallback ispod
      }
    } catch (restErr) {
      console.warn('[Netlify Brevo REST] REST poziv nije uspeo, prelazak na Nodemailer SMTP:', restErr);
    }

    // 2. Fallback način: Standardni Nodemailer SMTP relay
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_KEY,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
      to: STUDIO_RECIPIENT,
      replyTo: email && email.includes('@') ? email : undefined,
      subject,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[Netlify Brevo SMTP] Email poslat preko Nodemailer SMTP! Message ID: ${info.messageId}`);
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        messageId: info.messageId,
        message: 'Upit je uspešno poslat! Uskoro ćemo vas kontaktirati.',
      }),
    };
  } catch (error: any) {
    console.error('[Netlify Brevo] Greška:', error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: false,
        error: error?.message || 'Greška prilikom slanja email-a sa servera.',
      }),
    };
  }
};
