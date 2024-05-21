<?php

$erreurs = [];
$donnees = [];
$erreur = '';
$success = '';

if (isset($_GET['erreurs']) && !empty($_GET['erreurs'])) {
    $erreurs = json_decode($_GET['erreurs'], true);
}

if (isset($_GET['donnees']) && !empty($_GET['donnees'])) {
    $donnees = json_decode($_GET['donnees'], true);
}

if (isset($_GET['erreur']) && !empty($_GET['erreur'])) {
    $erreur = $_GET['erreur'];
}

if (isset($_GET['success']) && !empty($_GET['success'])) {
    $success = $_GET['success'];
}
?>

<div class="container my-3">
    <div class="row d-flex justify-content-center">
    <form class="col-md-6 card" action="index.php?page=traitement" method="POST" enctype="multipart/form-data" novalidate>
            <div class="my-3">
                <?php if (!empty($erreur)) { ?>
                    <div class="alert alert-danger" role="alert">
                        <?= $erreur; ?>
                    </div>
                <?php } ?>
                <?php if (!empty($success)) { ?>
                    <div class="alert alert-success" role="alert">
                        <?= $success; ?>
                    </div>
                <?php } ?>
            </div>
            <h2 class="my-3 text-center" style="color:green">MailPro Service</h2>
            <h5 class="my-3 text-center">Envoyez n'importe quel Email partout dans le monde</h5>

            <div class="">
                <label for="nom-structure" class="form-label">
                    Nom de votre Entreprise ou Structure:
                    <span class="text-danger">(*)</span>
                </label>
                <span class="tooltip-icon" title="Nom de votre Entreprise ou Structure:">?</span>
                <input type="text" name="nom-structure" class="form-control email" id="nom-structure" placeholder="Veuillez entrer le nom de votre structure" required value="<?= (isset($donnees['nom-structure']) && !empty($donnees['nom-structure'])) ? $donnees['nom-structure'] : '' ?>">
                <p class="text-danger">
                    <?= (isset($erreurs['nom-structure']) && !empty($erreurs['nom-structure'])) ? $erreurs['nom-structure'] : '' ?>
                </p>
            </div>

            <div class="position-relative mb-3">
                <label for="profile-picture" class="form-label">
                    Photo de profil : <span class="tooltip-icon" title="Téléchargez une photo de profil:">?</span>

                </label>
                <input type="file" name="profile-picture" class="form-control" id="profile-picture" accept="image/*">
                <p class="text-danger">
                    <?= (isset($erreurs['profile-picture']) && !empty($erreurs['profile-picture'])) ? $erreurs['profile-picture'] : '' ?>
                </p>
            </div>

            <div class="">
                <label for="objet" class="form-label">
                    Objet:
                    <span class="text-danger">(*)</span>
                </label>
                <span class="tooltip-icon" title="Objet de votre mail:">?</span>
                <input type="text" name="objet" class="form-control objet" id="objet" placeholder="Veuillez entrer l'objet de votre mail" required value="<?= (isset($donnees['objet']) && !empty($donnees['objet'])) ? $donnees['objet'] : '' ?>">
                <p class="text-danger">
                    <?= (isset($erreurs['objet']) && !empty($erreurs['objet'])) ? $erreurs['objet'] : '' ?>
                </p>
            </div>

            <div class="">
                <label for="body" class="form-label">
                    Message:
                    <span class="text-danger">(*)</span>
                </label>
                <span class="tooltip-icon" title="Contenu de votre message:">?</span>
                <textarea name="body" id="body" cols="10" class="form-control" placeholder="Veuillez entrer le contenu de l'email" rows="3" required><?= (isset($donnees['body']) && !empty($donnees['body'])) ? $donnees['body'] : '' ?></textarea>
                <p class="text-danger">
                    <?= (isset($erreurs['body']) && !empty($erreurs['body'])) ? $erreurs['body'] : '' ?>
                </p>
            </div>

            <div class="">
                <label for="email-expediteur" class="form-label">
                    Adresse email Expéditeur:
                    <span class="text-danger">(*)</span>
                </label>
                <span class="tooltip-icon" title="Adresse email de l'expéditeur:">?</span>
                <input type="email" name="email-expediteur" class="form-control email" id="email-expediteur" placeholder="Veuillez entrer l'adresse email de l'expéditeur." required value="<?= (isset($donnees['email-expediteur']) && !empty($donnees['email-expediteur'])) ? $donnees['email-expediteur'] : '' ?>">
                <p class="text-danger">
                    <?= (isset($erreurs['email-expediteur']) && !empty($erreurs['email-expediteur'])) ? $erreurs['email-expediteur'] : '' ?>
                </p>
            </div>

            <div class="mb-3">
                <label for="email-receveur" class="form-label">
                    Adresse email Receveur:
                    <span class="text-danger">(*)</span>
                </label>
                <span class="tooltip-icon" title="Adresse email du receveur:">?</span>
                <input type="email" name="email-receveur" class="form-control email-receveur" id="email-receveur" placeholder="Veuillez entrer l'adresse email du receveur." required value="<?= (isset($donnees['email-receveur']) && !empty($donnees['email-receveur'])) ? $donnees['email-receveur'] : '' ?>">
                <p class="text-danger">
                    <?= (isset($erreurs['email-receveur']) && !empty($erreurs['email-receveur'])) ? $erreurs['email-receveur'] : '' ?>
                </p>
            </div>

            <div class="mb-3">
                <label for="email-repondeur" class="form-label">
                    Adresse email du répondeur:
                    <span class="text-danger">(*)</span>
                </label>
                <span class="tooltip-icon" title="Adresse email pour répondre:">?</span>
                <input type="email" name="email-repondeur" class="form-control email-repondeur" id="email-repondeur" placeholder="Veuillez entrer l'adresse email pour répondre." required value="<?= (isset($donnees['email-repondeur']) && !empty($donnees['email-repondeur'])) ? $donnees['email-repondeur'] : '' ?>">
                <p class="text-danger">
                    <?= (isset($erreurs['email-repondeur']) && !empty($erreurs['email-repondeur'])) ? $erreurs['email-repondeur'] : '' ?>
                </p>
            </div>

            <button type="submit" class="btn btn-primary mb-3">Envoyer</button>
        </form>
    </div>
</div>

<style>
    .tooltip-icon {
        display: inline-block;
        background-color: #6c757d;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        cursor: pointer;
        margin-left: 5px;
        font-weight: bold;
    }
</style>