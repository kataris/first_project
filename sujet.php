<?php
$initial = $COOKIE_['id_post'];
	try
{
	$bdd = new PDO('mysql:host=localhost;dbname=forum', 'root', '');
}
catch(Exception $e)
{
        die('Erreur : '.$e->getMessage());
}

$reponse = $bdd->query('SELECT titre_post, contenu FROM reglement WHERE initial=$initial ORDER BY id DESC');

while ($donnees = $reponse->fetch())
{
	echo '<div id="titre_post">' . htmlspecialchars($donnees['titre_post']) . '</div><div id="post">' . htmlspecialchars($donnees['contenu']) . '</div>';
}

$reponse->closeCursor();

?>