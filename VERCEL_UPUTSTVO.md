# 🚀 Vercel Deployment & Brevo Serverless Uputstvo

Ovaj projekat sada u potpunosti podržava **Vercel Serverless Functions** pored postojećih Netlify funkcija i lokalnog Express servera.

---

## 📁 Šta je podešeno za Vercel:

1. **`api/send-email.ts`**:
   - Vercel Serverless funkcija koja obrađuje `POST /api/send-email`.
   - Podržava CORS preflight (`OPTIONS`), validaciju imena i telefona.
   - **Dvostruki mehanizam slanja**:
     - **Primarni**: Brevo REST API v3 (`https://api.brevo.com/v3/smtp/email`) — idealno za serverless oblak jer zaobilazi blokade portova 587/465 na cloud nodovima.
     - **Fallback**: Nodemailer SMTP relay (`smtp-relay.brevo.com:587`).
   - Ako ključ još nije unet, serverless funkcija vraća simuliran uspešan odgovor uz obaveštenje u konzoli (tako da forma ne "puca" pre unosa tajnih ključeva).

2. **`api/health.ts`**:
   - Vercel Serverless funkcija na `GET /api/health` za brzu proveru stanja Brevo konfiguracije i statusa platforme.

3. **`vercel.json`**:
   - Rutiranje za Single Page Application (SPA): `/api/(.*)` ide na Vercel API funkcije, a sve ostale rute (`/koncept`, `/usluge`, `/cenovnik`, `/kontakt`, `/iskustva`) vode na `/index.html` bez 404 grešaka.
   - Bezbednosna zaglavlja (`X-Frame-Options`, `X-Content-Type-Options`, `strict-origin-when-cross-origin`).
   - Caching za `sitemap.xml`, `robots.txt` i statičke assete.

---

## ⚙️ Podešavanje Environment Variables na Vercel-u

Kada uvezeš projekat na [Vercel](https://vercel.com):

1. Otvori svoj projekat na Vercel Dashboard-u.
2. Idi na **Settings** -> **Environment Variables**.
3. Dodaj sledeće promenljive (označi ih za: **Production**, **Preview**, **Development**):

| Naziv promenljive | Preporučena vrednost | Opis |
|---|---|---|
| `BREVO_SMTP_KEY` | `xkeysib-...` ili SMTP Master Password | Tvoj Brevo API v3 ključ ili SMTP lozinka |
| `BREVO_SMTP_USER` | `c0e126001@smtp-brevo.com` | Brevo SMTP korisničko ime / login |
| `BREVO_SMTP_HOST` | `smtp-relay.brevo.com` | Brevo SMTP server host |
| `BREVO_SMTP_PORT` | `587` | Port (587 ili 465) |
| `BREVO_SENDER_EMAIL` | `newfitems.oxybaric@gmail.com` | Verifikovani pošiljalac u Brevo nalogu |
| `BREVO_SENDER_NAME` | `Vuk Djoric (New Fitems)` | Ime koje se prikazuje primaocu |
| `STUDIO_RECIPIENT_EMAIL` | `newfitems.oxybaric@gmail.com,newfitems.novapazova@gmail.com,DzoxUciha11@gmail.com` | Email adrese na koje stiže svaki upit |

> **Napomena za Brevo ključ**:
> Na [Brevo Dashboard-u](https://app.brevo.com/) pod **SMTP & API** preporuka je generisati **API v3 key** (počinje sa `xkeysib-...`) ili kopirati generisanu **SMTP lozinku**. Naš serverless kod automatski koristi Brevo REST API v3 koji radi trenutno i pouzdano na Vercel nodovima!

---

## 🧪 Kako testirati na Vercel-u:

1. **Health check provera**:
   Otvori u browseru:
   ```
   https://tvoj-domen.vercel.app/api/health
   ```
   Dobićeš JSON:
   ```json
   {
     "status": "ok",
     "platform": "vercel-serverless",
     "hasSmtpKey": true,
     "recipient": "newfitems.oxybaric@gmail.com,..."
   }
   ```

2. **Test forme**:
   Otvori kontakt formu ili modal za zakazivanje na sajtu, unesi test ime i telefon, i klikni na dugme za slanje. Email sa detaljima i dugmetom za direktan poziv stiže na sve definisane adrese!
