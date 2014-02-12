<div id="bloc1">
	<div id="projetgauche">
		<div id="boutonplusungauche" onmouseover="boutonplusun('gauche+')" onmouseout="boutonplusun('gauche-')" onclick="boutonplusun('gauche*')">+1</div>
		<div id="corpsprojetgauche">
			<?php include("vue/descriptionprojet/descriptionprojet.php"); ?>
		<div id="plusinfogauche" onclick="afficherprojetpleinepage('plusinfo')">Plus d'informations</div>
		</div>
	</div>
	<div id="projetdroite">
		<div id="boutonplusundroite" onmouseover="boutonplusun('droite+')" onmouseout="boutonplusun('droite-')" onclick="boutonplusun('droite*')">+1</div>
		<div id="corpsprojetdroite">
			<?php include("vue/descriptionprojet/descriptionprojet.php"); ?>
			<div id="plusinfodroite" onclick="afficherprojetpleinepage('plusinfo')">Plus d'informations</div>
		</div>
	</div>
</div>