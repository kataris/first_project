<?php
	if(isset($_POST['string']))
	{
		$content = $_POST['string'];
		if (get_magic_quotes_gpc()) {
			$content = stripslashes($content);
		}
		$array = preg_split('/\/\+\+\*\*\+\+\//',$content);
		$pseudo = $array[0];
		$mdp = $array[1];
		try
		{
			$bdd = new PDO('mysql:host=localhost;dbname=utilisateur', 'root', '');
		}
			catch (Exception $e)
		{
			die('Erreur : ' . $e->getMessage());
		}
		$reponse = $bdd->prepare('SELECT * FROM utilisateur where identifiant= BINARY"?"');
		$reponse->execute(array($pseudo));
		if($donnees = $reponse->fetch())
		{
			if($donnees['mot_de_passe']==sha1($mdp))
				{
					$content = $pseudo;
				}else
				{
					$content = 'false';
				}
		}else
		{
			$content = 'false';
		}
		
		$reponse->closeCursor();
		
		echo $content;
	}
?>