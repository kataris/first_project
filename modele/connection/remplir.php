<?php
	if(isset($_POST['string']))
	{
		$content = $_POST['string'];
		if (get_magic_quotes_gpc()) {
			$content = stripslashes($content);
		}
		$array = preg_split('/\/\+\+\*\*\+\+\//',$content);
		$pseudo = $array[0];
		try
		{
			$bdd = new PDO('mysql:host=localhost;dbname=utilisateur', 'root', '');
		}
			catch (Exception $e)
		{
			die('Erreur : ' . $e->getMessage());
		}
		$reponse = $bdd->prepare('SELECT * FROM utilisateur where identifiant= ?');
		$reponse->execute(array($pseudo));
		while ($donnees = $reponse->fetch())
		{
			$adresse_mail = $donnees['mail'];
			$image = $donnees['image'];
		}
		
		$content = $adresse_mail.'/++**++/'.$image;
		echo $content;
	}
?>