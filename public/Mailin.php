<?php
/**
 * Brevo (Sendinblue) Mailin PHP Wrapper za New Fitems
 * 
 * Ova klasa omogućava slanje email poruka preko Brevo servisa u identičnom
 * formatu koji ste naveli:
 * 
 *   $mailin = new Mailin('c0e126001@smtp-brevo.com', 'YOUR_SMTP_KEY');
 *   $mailin->addTo('newfitems.oxybaric@gmail.com', 'Vuk Djoric')
 *          ->setFrom('newfitems.oxybaric@gmail.com', 'Vuk Djoric')
 *          ->setReplyTo('newfitems.oxybaric@gmail.com', 'Vuk Djoric')
 *          ->setSubject('Novi upit sa sajta')
 *          ->setText('Tekstualna verzija')
 *          ->setHtml('<strong>HTML verzija</strong>');
 *   $res = $mailin->send();
 * 
 * Radi u dva režima:
 * 1. Brevo v3 Transactional REST API (najstabilnije na deljenim hostinzima poput cPanel-a)
 * 2. Direktan SMTP socket (smtp-relay.brevo.com:587 STARTTLS) bez ikakvih eksternih biblioteka
 */

class Mailin {
    private $smtpHost = 'smtp-relay.brevo.com';
    private $smtpPort = 587;
    private $login;
    private $key;
    
    private $to = [];
    private $from = ['email' => 'newfitems.oxybaric@gmail.com', 'name' => 'Vuk Djoric'];
    private $replyTo = null;
    private $subject = '';
    private $text = '';
    private $html = '';
    private $lastError = '';

    /**
     * @param string $login Brevo SMTP Login (npr. 'c0e126001@smtp-brevo.com')
     * @param string $key   Brevo SMTP Master Key ili API v3 ključ
     */
    public function __construct($login = 'c0e126001@smtp-brevo.com', $key = '') {
        $this->login = trim($login);
        $this->key = trim($key);
    }

    /**
     * Dodaj primaoca
     */
    public function addTo($email, $name = '') {
        $this->to[] = [
            'email' => trim($email),
            'name'  => trim($name)
        ];
        return $this;
    }

    /**
     * Postavi pošiljaoca (mora biti verifikovan na Brevo nalogu)
     */
    public function setFrom($email, $name = '') {
        $this->from = [
            'email' => trim($email),
            'name'  => trim($name)
        ];
        return $this;
    }

    /**
     * Postavi Reply-To adresu (npr. email posetioca koji popunjava upit)
     */
    public function setReplyTo($email, $name = '') {
        $this->replyTo = [
            'email' => trim($email),
            'name'  => trim($name)
        ];
        return $this;
    }

    /**
     * Postavi naslov poruke
     */
    public function setSubject($subject) {
        $this->subject = (string)$subject;
        return $this;
    }

    /**
     * Postavi običan tekst poruke
     */
    public function setText($text) {
        $this->text = (string)$text;
        return $this;
    }

    /**
     * Postavi HTML sadržaj poruke
     */
    public function setHtml($html) {
        $this->html = (string)$html;
        return $this;
    }

    /**
     * Glavni metod za slanje
     * 
     * @return array ['result' => bool, 'message' => string]
     */
    public function send() {
        if (empty($this->to)) {
            return ['result' => false, 'message' => 'Nijedan primalac nije naveden (addTo).'];
        }
        if (empty($this->from['email'])) {
            return ['result' => false, 'message' => 'Pošiljalac nije definisan (setFrom).'];
        }
        if (empty($this->key)) {
            return ['result' => false, 'message' => 'Brevo SMTP ključ ili API ključ nije podešen.'];
        }

        // Pokušaj 1: Brevo v3 Transactional API preko cURL-a (radi na 100% hostinga, ne blokira ga firewall za port 587)
        if (function_exists('curl_init')) {
            $apiResult = $this->sendViaApi();
            if ($apiResult['result']) {
                return $apiResult;
            }
            // Ako API vrati specifičnu grešku o ključu, zabeleži
            $this->lastError = $apiResult['message'];
        }

        // Pokušaj 2: Direktan SMTP Socket preko porta 587 sa STARTTLS autentifikacijom
        $smtpResult = $this->sendViaSmtpSocket();
        if ($smtpResult['result']) {
            return $smtpResult;
        }

        $errMsg = !empty($smtpResult['message']) ? $smtpResult['message'] : $this->lastError;
        return ['result' => false, 'message' => 'Greška pri slanju preko Brevo: ' . $errMsg];
    }

    /**
     * Slanje preko Brevo v3 REST API-ja
     */
    private function sendViaApi() {
        $url = 'https://api.brevo.com/v3/smtp/email';

        $payload = [
            'sender'      => ['email' => $this->from['email'], 'name' => $this->from['name'] ?: 'New Fitems'],
            'to'          => $this->to,
            'subject'     => $this->subject ?: 'Poruka sa New Fitems sajta',
            'htmlContent' => $this->html ?: nl2br(htmlspecialchars($this->text)),
            'textContent' => $this->text ?: strip_tags($this->html),
        ];

        if (!empty($this->replyTo) && !empty($this->replyTo['email'])) {
            $payload['replyTo'] = [
                'email' => $this->replyTo['email'],
                'name'  => $this->replyTo['name'] ?: $this->replyTo['email']
            ];
        }

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Accept: application/json',
            'Content-Type: application/json',
            'api-key: ' . $this->key,
        ]);
        curl_setopt($ch, CURLOPT_TIMEOUT, 15);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        if ($curlError) {
            return ['result' => false, 'message' => "cURL greška: {$curlError}"];
        }

        $resJson = json_decode($response, true);

        if ($httpCode >= 200 && $httpCode < 300) {
            return [
                'result'    => true,
                'message'   => 'Email sent',
                'messageId' => $resJson['messageId'] ?? null
            ];
        }

        $errMessage = isset($resJson['message']) ? $resJson['message'] : "HTTP {$httpCode}: {$response}";
        return ['result' => false, 'message' => $errMessage];
    }

    /**
     * Slanje direktno preko čistog PHP SMTP soketa (smtp-relay.brevo.com:587)
     */
    private function sendViaSmtpSocket() {
        $host = $this->smtpHost;
        $port = $this->smtpPort;
        $timeout = 15;

        $socket = @fsockopen($host, $port, $errno, $errstr, $timeout);
        if (!$socket) {
            return ['result' => false, 'message' => "Ne mogu se povezati na {$host}:{$port} ({$errno}: {$errstr})"];
        }

        $read = function() use ($socket) {
            $data = '';
            while ($str = fgets($socket, 515)) {
                $data .= $str;
                if (substr($str, 3, 1) === ' ') {
                    break;
                }
            }
            return $data;
        };

        $write = function($cmd) use ($socket) {
            fputs($socket, $cmd . "\r\n");
        };

        $greeting = $read();
        if (substr($greeting, 0, 3) !== '220') {
            fclose($socket);
            return ['result' => false, 'message' => "SMTP pozdrav neispravan: {$greeting}"];
        }

        $write("EHLO " . gethostname());
        $read();

        // STARTTLS
        $write("STARTTLS");
        $tlsResp = $read();
        if (substr($tlsResp, 0, 3) !== '220') {
            fclose($socket);
            return ['result' => false, 'message' => "STARTTLS nije podržan ili je odbijen: {$tlsResp}"];
        }

        // Kriptovanje soketa
        $cryptoMethod = STREAM_CRYPTO_METHOD_TLS_CLIENT;
        if (defined('STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT')) {
            $cryptoMethod |= STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT;
        }
        if (defined('STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT')) {
            $cryptoMethod |= STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT;
        }

        if (!stream_socket_enable_crypto($socket, true, $cryptoMethod)) {
            fclose($socket);
            return ['result' => false, 'message' => "TLS kriptovanje soketa nije uspelo."];
        }

        // Ponovni EHLO nakon TLS-a
        $write("EHLO " . gethostname());
        $read();

        // Autentifikacija
        $write("AUTH LOGIN");
        $authResp = $read();
        if (substr($authResp, 0, 3) !== '334') {
            fclose($socket);
            return ['result' => false, 'message' => "AUTH LOGIN odbijen: {$authResp}"];
        }

        $write(base64_encode($this->login));
        $userResp = $read();
        if (substr($userResp, 0, 3) !== '334') {
            fclose($socket);
            return ['result' => false, 'message' => "Korisničko ime odbijeno: {$userResp}"];
        }

        $write(base64_encode($this->key));
        $passResp = $read();
        if (substr($passResp, 0, 3) !== '235') {
            fclose($socket);
            return ['result' => false, 'message' => "Neuspešna Brevo SMTP lozinka/ključ: {$passResp}"];
        }

        // MAIL FROM
        $write("MAIL FROM:<{$this->from['email']}>");
        $mailFromResp = $read();
        if (substr($mailFromResp, 0, 3) !== '250') {
            fclose($socket);
            return ['result' => false, 'message' => "MAIL FROM odbijen: {$mailFromResp}"];
        }

        // RCPT TO za svakog primaoca
        foreach ($this->to as $recipient) {
            $write("RCPT TO:<{$recipient['email']}>");
            $rcptResp = $read();
            if (substr($rcptResp, 0, 3) !== '250' && substr($rcptResp, 0, 3) !== '251') {
                fclose($socket);
                return ['result' => false, 'message' => "Primalac odbijen ({$recipient['email']}): {$rcptResp}"];
            }
        }

        // DATA
        $write("DATA");
        $dataResp = $read();
        if (substr($dataResp, 0, 3) !== '354') {
            fclose($socket);
            return ['result' => false, 'message' => "DATA komanda odbijena: {$dataResp}"];
        }

        // Priprema MIME poruke
        $boundary = "----=_Part_" . md5(uniqid(time()));
        
        $toList = [];
        foreach ($this->to as $rec) {
            $toList[] = !empty($rec['name']) ? "=?UTF-8?B?" . base64_encode($rec['name']) . "?= <{$rec['email']}>" : "<{$rec['email']}>";
        }

        $headers = [];
        $headers[] = "Date: " . date('r');
        $headers[] = "From: =?UTF-8?B?" . base64_encode($this->from['name']) . "?= <{$this->from['email']}>";
        $headers[] = "To: " . implode(', ', $toList);
        if (!empty($this->replyTo) && !empty($this->replyTo['email'])) {
            $replyName = !empty($this->replyTo['name']) ? "=?UTF-8?B?" . base64_encode($this->replyTo['name']) . "?= " : '';
            $headers[] = "Reply-To: {$replyName}<{$this->replyTo['email']}>";
        }
        $headers[] = "Subject: =?UTF-8?B?" . base64_encode($this->subject) . "?=";
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-Type: multipart/alternative; boundary=\"{$boundary}\"";
        $headers[] = "";

        $body = [];
        if (!empty($this->text)) {
            $body[] = "--{$boundary}";
            $body[] = "Content-Type: text/plain; charset=UTF-8";
            $body[] = "Content-Transfer-Encoding: base64";
            $body[] = "";
            $body[] = chunk_split(base64_encode($this->text));
        }
        if (!empty($this->html)) {
            $body[] = "--{$boundary}";
            $body[] = "Content-Type: text/html; charset=UTF-8";
            $body[] = "Content-Transfer-Encoding: base64";
            $body[] = "";
            $body[] = chunk_split(base64_encode($this->html));
        }
        $body[] = "--{$boundary}--";
        $body[] = ".";

        $fullPayload = implode("\r\n", array_merge($headers, $body));
        $write($fullPayload);

        $sendResp = $read();
        $write("QUIT");
        fclose($socket);

        if (substr($sendResp, 0, 3) === '250') {
            return ['result' => true, 'message' => 'Email sent'];
        }

        return ['result' => false, 'message' => "Greška prilikom slanja poruke: {$sendResp}"];
    }
}
