<?php
	try
	{
		$bdd = new PDO('mysql:host=localhost;dbname=forum', 'root', '');
	}
	catch(Exception $e)
	{
		die('Erreur : '.$e->getMessage());
	}
	$req = $bdd->prepare('INSERT INTO reglement (titre_post, contenu) VALUES(?, ?)');
	$req->execute(array($_POST['titre_post'], $_POST['post']));
?>