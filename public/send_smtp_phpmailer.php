<?php
/**
 * New Fitems - Brevo SMTP preko PHPMailer-a (PHP)
 * 
 * Ovaj primer koristi standardni Brevo SMTP protokol (smtp-relay.brevo.com).
 * Ukoliko koristite Composer: composer require phpmailer/phpmailer
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Učitavanje PHPMailer biblioteke (preko Composer-a ili ručnog include-a)
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require __DIR__ . '/vendor/autoload.php';
} elseif (file_exists(__DIR__ . '/PHPMailer/src/PHPMailer.php')) {
    require __DIR__ . '/PHPMailer/src/Exception.php';
    require __DIR__ . '/PHPMailer/src/PHPMailer.php';
    require __DIR__ . '/PHPMailer/src/SMTP.php';
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Čitanje POST podataka
$input = json_decode(file_get_contents('php://input'), true) ?: $_POST;

$name = trim($input['name'] ?? '');
$phone = trim($input['phone'] ?? '');
$email = trim($input['email'] ?? '');
$service = trim($input['service'] ?? 'EMS Vođeni Trening');
$timePreference = trim($input['timePreference'] ?? 'Nije navedeno');
$message = trim($input['message'] ?? '');

if (empty($name) || empty($phone)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Ime i telefon su obavezni."]);
    exit;
}

// -------------------------------------------------------------
// BREVO SMTP PODEŠAVANJA
// -------------------------------------------------------------
$smtpHost = 'smtp-relay.brevo.com';
$smtpPort = 587; // ili 465 za SMTPS
$smtpUser = 'c0e126001@smtp-brevo.com'; // Vaš Brevo SMTP Login
$smtpPass = 'YOUR_BREVO_SMTP_KEY';     // Vaš Brevo SMTP Master Password (generiše se u Brevo -> SMTP & API)

$mail = new PHPMailer(true);

try {
    // Podešavanje servera
    $mail->isSMTP();
    $mail->Host       = $smtpHost;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtpUser;
    $mail->Password   = $smtpPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // ili ENCRYPTION_SMTPS za port 465
    $mail->Port       = $smtpPort;
    $mail->CharSet    = 'UTF-8';

    // Pošiljalac i primaoci
    $mail->setFrom($smtpUser, 'New Fitems Web');
    $mail->addAddress('newfitems.novapazova@gmail.com', 'New Fitems Studio');
    $mail->addAddress('DzoxUciha11@gmail.com', 'Trener');

    if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $mail->addReplyTo($email, $name);
    }

    // Sadržaj
    $mail->isHTML(true);
    $mail->Subject = "[New Fitems] Novi upit: {$name} ({$service})";
    
    $mail->Body = "
        <h2>Novi upit za termin u studiju New Fitems</h2>
        <p><strong>Ime:</strong> " . htmlspecialchars($name) . "</p>
        <p><strong>Telefon:</strong> " . htmlspecialchars($phone) . "</p>
        <p><strong>Email:</strong> " . htmlspecialchars($email ?: 'Nije naveden') . "</p>
        <p><strong>Izabrani program:</strong> " . htmlspecialchars($service) . "</p>
        <p><strong>Željeno vreme:</strong> " . htmlspecialchars($timePreference) . "</p>
        <p><strong>Napomena:</strong> " . htmlspecialchars($message ?: 'Nema') . "</p>
        <hr>
        <p><em>Poslato preko Brevo SMTP relay servera</em></p>
    ";

    $mail->AltBody = "Ime: {$name}\nTelefon: {$phone}\nEmail: {$email}\nProgram: {$service}\nTermin: {$timePreference}\nPoruka: {$message}";

    $mail->send();

    echo json_encode([
        "success" => true,
        "message" => "Email je uspešno poslat preko Brevo SMTP-a!"
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Greška pri slanju emaila: {$mail->ErrorInfo}"
    ]);
}
