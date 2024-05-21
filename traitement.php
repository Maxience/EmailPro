<?php
$erreurs = [];
$success = '';
$erreur = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (empty($_POST['email-repondeur']) || !filter_var($_POST['email-repondeur'], FILTER_VALIDATE_EMAIL)) {
        $erreurs['email-repondeur'] = 'Ce champ doit contenir une adresse email du répondeur';
    }

    if (empty($_POST['email-receveur']) || !filter_var($_POST['email-receveur'], FILTER_VALIDATE_EMAIL)) {
        $erreurs['email-receveur'] = 'Ce champ est obligatoire et doit contenir l\'adresse email du receveur';
    }

    if (empty($_POST['email-expediteur']) || !filter_var($_POST['email-expediteur'], FILTER_VALIDATE_EMAIL)) {
        $erreurs['email-expediteur'] = 'Ce champ est obligatoire et doit contenir l\'adresse email de l\'expéditeur';
    }

    if (empty($_POST['objet'])) {
        $erreurs['objet'] = 'Ce champ est obligatoire et doit contenir l\'objet du mail';
    }

    if (empty($_POST['body'])) {
        $erreurs['body'] = 'Ce champ est obligatoire et doit contenir le message de votre mail';
    }

    if (empty($_POST['nom-structure'])) {
        $erreurs['nom-structure'] = 'Ce champ est obligatoire et doit contenir le nom de votre structure ou entreprise';
    } else {
        $emailReceveur = $_POST['email-receveur'];
        $emailRepondeur = $_POST['email-repondeur'];
        $objet = $_POST['objet'];
        $body = $_POST['body'];
        $nomStructure = $_POST['nom-structure'];

        if (empty($erreurs)) {
            // Fichiers joints
            $attachments = [];
            if (isset($_FILES['profile-picture']) && $_FILES['profile-picture']['error'] == UPLOAD_ERR_OK) {
                $attachments[] = $_FILES['profile-picture'];
            }

            // Utiliser PHPMailer pour envoyer l'email
            if (mailSendin($emailReceveur, $nomStructure, $objet, $body, $attachments)) {
                $success = 'Email envoyé avec succès.';
            } else {
                $erreur = 'Une erreur s\'est produite lors de l\'envoi de l\'email.';
            }
        } else {
            $erreur = 'Une erreur s\'est produite lors de l\'envoi de l\'email';
        }
    }

    header('Location: index.php?page=formulaire&erreur=' . urlencode($erreur) . '&erreurs=' . urlencode(json_encode($erreurs)) . '&success=' . urlencode($success));
    exit;
}
