<?php
/**
 * New Fitems - Brevo SMTP & Mailin Obrada Upita (PHP)
 * 
 * Ovaj skript prima podatke iz forme (JSON ili standardni POST) i šalje email
 * direktoru/treneru putem Brevo SMTP servera koristeći Mailin klasu.
 */

// 1. CORS i JSON zaglavlja
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Dozvoljen je samo POST metod."]);
    exit();
}

// 2. Učitavanje Mailin klase
require_once __DIR__ . '/Mailin.php';

// 3. Parsiranje dolaznih podataka
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    $data = $_POST;
}

$name           = isset($data['name']) ? trim($data['name']) : '';
$phone          = isset($data['phone']) ? trim($data['phone']) : '';
$email          = isset($data['email']) ? trim($data['email']) : '';
$service        = isset($data['service']) ? trim($data['service']) : 'EMS Vođeni Trening';
$timePreference = isset($data['timePreference']) ? trim($data['timePreference']) : 'Nije navedeno';
$message        = isset($data['message']) ? trim($data['message']) : '';
$source         = isset($data['source']) ? trim($data['source']) : 'Web Forma';

// Validacija obaveznih polja
if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Ime i broj telefona su obavezni."]);
    exit();
}

// 4. Brevo SMTP Konfiguracija
// Login: c0e126001@smtp-brevo.com
// Host: smtp-relay.brevo.com:587
$brevoLogin   = getenv('BREVO_SMTP_USER') ?: 'c0e126001@smtp-brevo.com';
$brevoSmtpKey = getenv('BREVO_SMTP_KEY') ?: getenv('BREVO_API_KEY') ?: 'YOUR_SMTP_KEY';

$timestamp = date('d.m.Y. H:i');
$subject   = "[New Fitems] Novi upit za termin: {$name} ({$service})";

// Tekstualna verzija
$textBody = "NOVI UPIT ZA TERMIN - NEW FITEMS\n";
$textBody .= "=================================\n";
$textBody .= "Vreme upita: {$timestamp}\n";
$textBody .= "Izvor: {$source}\n\n";
$textBody .= "Ime i prezime: {$name}\n";
$textBody .= "Broj telefona: {$phone}\n";
$textBody .= "Email: " . (!empty($email) ? $email : 'Nije unet') . "\n";
$textBody .= "Izabrani program: {$service}\n";
$textBody .= "Željeno vreme: {$timePreference}\n";
$textBody .= "Napomena: " . (!empty($message) ? $message : 'Nema dodatnih napomena') . "\n";

// HTML verzija u prepoznatljivom New Fitems brending stilu
$htmlBody = "
<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #FAF3EB; margin: 0; padding: 20px; color: #1c1917; }
    .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e7e5e4; }
    .header { background: #000000; padding: 24px; text-align: center; color: #CFF3CF; }
    .header h1 { margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1.5px; }
    .header p { margin: 4px 0 0; color: #FAF3EB; font-size: 12px; }
    .badge { display: inline-block; background: #CFF3CF; color: #000000; font-size: 11px; font-weight: bold; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; margin-bottom: 8px; }
    .body { padding: 24px; }
    .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .table td { padding: 10px 12px; font-size: 14px; border-bottom: 1px solid #f5f5f4; }
    .table td.label { font-weight: bold; color: #57534e; width: 35%; }
    .call-btn { display: block; text-align: center; background: #000000; color: #CFF3CF; padding: 14px; text-decoration: none; border-radius: 12px; font-weight: bold; text-transform: uppercase; margin-top: 15px; }
    .footer { background: #f5f5f4; padding: 14px; text-align: center; font-size: 11px; color: #78716c; }
  </style>
</head>
<body>
  <div class='card'>
    <div class='header'>
      <span class='badge'>Novi upit sa sajta</span>
      <h1>NEW FITEMS</h1>
      <p>Studio za individualne EMS treninge · Nova Pazova</p>
    </div>
    <div class='body'>
      <table class='table'>
        <tr><td class='label'>Ime i prezime:</td><td><strong>" . htmlspecialchars($name) . "</strong></td></tr>
        <tr><td class='label'>Broj telefona:</td><td><strong style='font-size: 16px; color: #000000;'>" . htmlspecialchars($phone) . "</strong></td></tr>
        <tr><td class='label'>Email:</td><td>" . (!empty($email) ? htmlspecialchars($email) : 'Nije unet') . "</td></tr>
        <tr><td class='label'>Izabrani program:</td><td><strong>" . htmlspecialchars($service) . "</strong></td></tr>
        <tr><td class='label'>Željeni termin:</td><td>" . htmlspecialchars($timePreference) . "</td></tr>
        <tr><td class='label'>Dodatna poruka:</td><td>" . (!empty($message) ? htmlspecialchars($message) : 'Nema dodatnih napomena') . "</td></tr>
        <tr><td class='label'>Vreme prispeća:</td><td>{$timestamp}</td></tr>
      </table>
      <a href='tel:" . preg_replace('/\s+/', '', $phone) . "' class='call-btn'>POZOVI KLIJENTA: " . htmlspecialchars($phone) . "</a>
    </div>
    <div class='footer'>
      New Fitems · Kralja Petra I Karađorđevića 87, Nova Pazova · Brevo SMTP Sistem
    </div>
  </div>
</body>
</html>
";

// 5. Instanciranje Mailin klijenta
$mailin = new Mailin($brevoLogin, $brevoSmtpKey);

// Slanje ka New Fitems primaocima
$mailin->addTo('newfitems.oxybaric@gmail.com', 'Vuk Djoric');
$mailin->addTo('newfitems.novapazova@gmail.com', 'New Fitems Nova Pazova');
$mailin->addTo('DzoxUciha11@gmail.com', 'Trener');

// Pošiljalac (verifikovana Brevo adresa)
$mailin->setFrom('newfitems.oxybaric@gmail.com', 'Vuk Djoric (New Fitems)');

// Ako je klijent uneo svoj email, stavi ga u Reply-To, u suprotnom ostavi studio
if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $mailin->setReplyTo($email, $name);
} else {
    $mailin->setReplyTo('newfitems.oxybaric@gmail.com', 'Vuk Djoric');
}

$mailin->setSubject($subject);
$mailin->setText($textBody);
$mailin->setHtml($htmlBody);

// 6. Provera da li je unet pravi ključ
if ($brevoSmtpKey === 'YOUR_SMTP_KEY' || empty($brevoSmtpKey)) {
    echo json_encode([
        'success'   => true,
        'simulated' => true,
        'message'   => 'Podaci su uspešno primljeni na serveru! (Za slanje emaila u produkciji unesite pravi Brevo SMTP ključ)',
        'data'      => ['name' => $name, 'phone' => $phone, 'service' => $service]
    ]);
    exit();
}

// 7. Izvršenje slanja
$res = $mailin->send();

if (isset($res['result']) && $res['result'] === true) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'result'  => true,
        'message' => 'Email sent'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'result'  => false,
        'error'   => $res['message'] ?? 'Greška prilikom slanja preko Brevo SMTP-a.'
    ]);
}
