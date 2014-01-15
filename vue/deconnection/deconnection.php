<label for="connection_pseudo">Pseudo</label><input type="text" name="pseudo" id="connection_pseudo" size="19" onKeyPress="if (event.keyCode == 13) connection()" />
<label for="connection_pass">Mot de passe</label><input type="password" name="pass" id="connection_pass" size="13" onKeyPress="if (event.keyCode == 13) connection()" />
<div id="connection_c" onclick="connection();">C</div>
<div id="connection_bloc_rester"><label for="connection_rester">Rester connecté</label><input type="checkbox" id="connection_rester" onKeyPress="if (event.keyCode == 13) connection()" /></div>
<div id="connection_onnection" onclick="connection();">onnection</div>
<div id="connection_inscription" onclick="inscription();">s'inscrire</div>