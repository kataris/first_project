<?php	
	if(isset($_POST['string']))
	{
		$content = $_POST['string'];
		if (get_magic_quotes_gpc()) {
			$content = stripslashes($content);
		}
		$array = preg_split('/\/\+\+\*\*\+\+\//',$content);
		$pseudo = $array[0];
		$mail = $array[1];
		$mdp = $array[2];
		$confirmation = $array[3];
		$faute = 0;
		try
		{
			$bdd = new PDO('mysql:host=localhost;dbname=utilisateur', 'root', '');
		}
			catch (Exception $e)
		{
			die('Erreur : ' . $e->getMessage());
		}
		if ($pseudo != '')
		{
			$reponse = $bdd->query('SELECT identifiant FROM utilisateur');
			$pseudo = htmlspecialchars($pseudo);
			while ($donnees = $reponse->fetch())
			{
				if($donnees['identifiant']==$pseudo)
				{
					echo 'Le pseudo que vous avez chosi est déjà pris.<br />';
					$faute = 1;
				}
			}
		}
		else
		{
			echo 'Vous n\'avez pas entré de pseudo.<br />';
			$faute = 1;
		}	
		if ($mail != '')
		{
			$mail = htmlspecialchars($mail);
			if (preg_match("#^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$#", $mail))
			{
			}
			else
			{
				echo 'L\'adresse mail n\'est pas valide.<br />';
				$faute = 1;
			}
		}
		else
		{
			echo 'Vous n\'avez pas entré d\'adresse mail.<br />';
			$faute = 1;
		}	
		if ($mdp != '')
		{
		}
		else
		{
			echo 'Vous n\'avez pas entré de mot de passe.<br />';
			$faute = 1;
		}	
		if ($confirmation != '')
		{
			$confirmation = htmlspecialchars($confirmation);
			$mdp = htmlspecialchars($mdp);
			if ($mdp != $confirmation)
			{
				echo 'Les deux mots de passe ne sont pas identiques.<br />';
				$faute = 1;
			}
		}
		else
		{
			echo 'Vous n\'avez pas rentré la confirmation du mot de passe.<br />';
			$faute = 1;
		}
		if ($faute != 1)
		{
			$req = $bdd->prepare('INSERT INTO utilisateur(identifiant, mot_de_passe, mail) VALUES(:identifiant, :mot_de_passe, :mail)');
			$req->execute(array(
				'identifiant' => $pseudo,
				'mot_de_passe' => sha1($mdp),
				'mail' => $mail));
			echo 'Votre inscription est maintenant terminé. Un mail vous a été envoyé pour que vous validiez votre adresse mail.<br />
			Si vous ne l\'avez pas reçu, veuillez vous rendre sur votre profil pour modifier votre adresse.<br />Vous pouvez maintenant vous conneter<br /><br /><span onclick="view2(\'index\',\'page\');">Retour à l\'acceuil</span>';
		}
	}
?>