<?php
require_once(__DIR__ . '/fonction.php');
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EmailPro</title>
    <link rel="stylesheet" href="bootstrap/bootstrap.min.css">
    <script src="https://cdn.ckeditor.com/4.16.2/standard/ckeditor.js"></script>

</head>

<body>

    <?php
    if (isset($_GET['page']) && !empty($_GET['page'])) {
        switch ($_GET['page']) {

            case 'formulaire':
                include_once(__DIR__ . '/formulaire.php');
                break;

            case 'traitement':
                include_once(__DIR__ . '/traitement.php');
                break;

            default:
                include_once(__DIR__ . '/formulaire.php');
                break;
        }
    } else {
        include_once(__DIR__ . '/formulaire.php');
    } ?>
    <script src="bootstrap/bootstrap.min.js"></script>
    <script>
        CKEDITOR.replace('body');
    </script>
</body>

</html>