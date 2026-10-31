<?php
/**
 * New Fitems - Brevo SMTP Test Skript
 * 
 * Testirajte direktno u pregledaču ili iz terminala:
 * php /public/test_brevo.php
 */

require_once __DIR__ . '/Mailin.php';

$smtpLogin = 'c0e126001@smtp-brevo.com';
$smtpKey   = isset($_GET['key']) ? $_GET['key'] : (getenv('BREVO_SMTP_KEY') ?: 'YOUR_SMTP_KEY');

if ($smtpKey === 'YOUR_SMTP_KEY' || empty($smtpKey)) {
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode([
        'result'  => false,
        'message' => 'Molimo unesite vaš pravi Brevo SMTP ključ (kao parametar ?key=VAŠ_KLJUČ ili u BREVO_SMTP_KEY environment promenljivoj).'
    ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    exit();
}

$mailin = new Mailin($smtpLogin, $smtpKey);

$mailin->
    addTo('newfitems.oxybaric@gmail.com', 'Vuk Djoric')->
    setFrom('newfitems.oxybaric@gmail.com', 'Vuk Djoric')->
    setReplyTo('newfitems.oxybaric@gmail.com', 'Vuk Djoric')->
    setSubject('New Fitems - Brevo SMTP Test')->
    setText('Pozdrav Vuk! Ovo je test poruka sa New Fitems sajta poslata preko Brevo SMTP servera.')->
    setHtml('<strong>Pozdrav Vuk!</strong><p>Ovo je test poruka sa New Fitems sajta poslata preko Brevo SMTP servera (smtp-relay.brevo.com:587).</p>');

$res = $mailin->send();

/**
 * Successful send message will be returned in this format:
 * {'result' => true, 'message' => 'Email sent'}
 */
header('Content-Type: application/json; charset=UTF-8');
echo json_encode($res, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
