<p><h1>Formulaire d'inscription</h1><br />Tous les champs sont obligatoires.</p>
	<form method="post" action="#">
		<p>
			<label for="pseudo"><h2>Pseudo : </h2></label><input type="text" name="pseudo" id="formulaire_pseudo" onKeyPress="if (event.keyCode == 13) inscription_confirm()"  autofocus />
		</p>
		<p>
			<label for="mail"><h2>Adresse email : </h2></label><input type="text" name="mail" id="formulaire_mail" onKeyPress="if (event.keyCode == 13) inscription_confirm()" />
		</p>
		<p>
			<label for="pass"><h2>Mot de passe : </h2></label><input type="password" name="pass" id="formulaire_pass" onKeyPress="if (event.keyCode == 13) inscription_confirm()" />
		</p>
		<p>
			<label for="pass_confirm"><h2>Confirmation du mot de passe : </h2></label><input type="password" name="pass_confirm" id="formulaire_pass_confirm" onKeyPress="if (event.keyCode == 13) inscription_confirm()" />
		</p>
		<p>
			<input type="button" value="Confirmer" onclick="inscription_confirm();" />
		</p>
	</form>