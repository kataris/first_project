<div id="categorie" class="seul">
Réglement
</div>
<?php
	$COOKIE_['id_page'] = 'reglement';
	try
	{
		$bdd = new PDO('mysql:host=localhost;dbname=forum', 'root', '');
	}
	catch(Exception $e)
	{
			die('Erreur : '.$e->getMessage());
	}

	$reponse = $bdd->query('SELECT id, titre_post, contenu FROM reglement WHERE initial=0 ORDER BY id DESC');

	while ($donnees = $reponse->fetch())
	{
		$id = $donnees['id'];
		echo '<div id="titre_post">' . htmlspecialchars($donnees['titre_post']) . '</div><div id="post" onclick="topic(0, /*imprimer le contenu de id*/)">' . htmlspecialchars($donnees['contenu']) . '</div>';
	}

	$reponse->closeCursor();

?>
<div id="nouveau_post">
	<form action="modele/forum/post.php" method="post">
		<p>
			<label for="titre_post">Titre du post</label> : <input type="text"
				name="titre_post" id="titre" /><br />
			<label for="post">Post</label> : <input type="text"
				name="post" id="post_" /><br />
			<input type="submit" value="Envoyer" />
		</p>
	</form>
</div>