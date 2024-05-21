<?php

require_once (__DIR__) . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function mailSendin(string $destination, string $recipient, string $subject, string $body, array $attachments = []): bool
{
    $mail = new PHPMailer(true);
    $mail->CharSet = "UTF-8";

    try {
        $emailReceveur = $_POST['email-receveur'];
        $emailRepondeur = $_POST['email-repondeur'];
        $objet = $_POST['objet'];
        $body = $_POST['body'];
        $nomStructure = $_POST['nom-structure'];

        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->Username = 'dossoumaxime888@gmail.com';
        $mail->Password = 'tfgqlngebwnnhwsr';

        $mail->setFrom('dossoumaxime888@gmail.com', htmlspecialchars_decode($nomStructure));
        $mail->addAddress($destination, $recipient);
        $mail->addReplyTo($emailRepondeur, htmlspecialchars_decode($nomStructure));

        $mail->isHTML(true);
        $mail->Subject = htmlspecialchars_decode($subject);
        $mail->Body = $body;

        // Ajouter les pièces jointes
        foreach ($attachments as $attachment) {
            if ($attachment['error'] == UPLOAD_ERR_OK) {
                $mail->addAttachment($attachment['tmp_name'], $attachment['name']);
            }
        }

        return $mail->send();
    } catch (Exception $e) {
        return false;
    }
}
