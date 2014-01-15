<div id="bloc1">
	<div id="projetgauche">
		<div id="conteneurprojetgauche" >
			<div id="boutonplusungauche" onmouseover="retrecitprojet('gauche')" onmouseout="deretrecitprojet('gauche')">+1</div>
			<div id="corpsprojet">
				<?php include("descriptionprojet.php"); ?>
				<div id="plusinfo" onclick="afficherprojetpleinepage('plusinfo')">Plus d'informations</div>
			</div>
		</div>
	</div>
	<div id="projetdroite">
		<div id="conteneurprojetdroite" >
			<div id="boutonplusundroite" onmouseover="retrecitprojet('droit')" onmouseout="deretrecitprojet('droit')">+1</div>
			<div id="corpsprojet">
				<?php include("descriptionprojet.php"); ?>
				<div id="plusinfo" onclick="afficherprojetpleinepage('plusinfo')">Plus d'informations</div>
			</div>
		</div>
	</div>
</div>