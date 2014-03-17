<div id="PEC_presentation">
	<div id="description" class="">
		<div id="barre_progression">
			<div id="PEC_barre_fait">
			</div>
		</div>
		<div id="description_projet">
			<?php include("vue/descriptionprojet/descriptionprojet.php"); ?>
			<div id="plusinfo" onclick="afficherprojetpleinepage('plusinfo')">Plus d'informations</div>
		</div>
	</div><!--
	--><div id="boutons" class=""><!--
		--><div class="PEC_boutons" id="PEC_favori" onclick="PEC_ajouter_favori();">
			favori
		</div><!--
		--><div class="PEC_boutons" id="PEC_mail_createur">
			mail_createur
		</div><!--
		--><div class="PEC_boutons" id="PEC_stats">
			stats
		</div><!--
	--></div><!--
	--><div id="carrousel_sondage">
		<ul>
			<li><div class="PEC_select">bloc1_sondage</div></li>
			<li><div class="PEC_select">bloc2_sondage</div></li>
			<li><div class="PEC_select">bloc3_sondage</div></li>
			<li><div class="PEC_select">bloc4_sondage</div></li>
			<li><div class="PEC_select">bloc5_sondage</div></li>
		</ul>
	</div>
	<div id="PEC_conteneur_sondage" class=""><!--
		--><div id="PEC_conteneur_sondage1" class="PEC_petit"></div><!--
		--><div id="PEC_conteneur_sondage2" class="PEC_grand"></div><!--
		--><div id="PEC_conteneur_sondage3" class="PEC_petit"></div><!--
		--><div id="PEC_petit_point_sondage"></div><!--
	--></div><!--
	--><div id="carrousel_image">
		<ul>
			<li><div class="PEC_select">bloc1_image</div></li>
			<li><div class="PEC_select">bloc2_image</div></li>
			<li><div class="PEC_select">bloc3_image</div></li>
			<li><div class="PEC_select">bloc4_image</div></li>
			<li><div class="PEC_select">bloc5_image</div></li>
		</ul>
	</div>
	<div id="PEC_conteneur_image" class=""><!--
		--><div id="PEC_conteneur_image1" class="PEC_petit"></div><!--
		--><div id="PEC_conteneur_image2" class="PEC_grand"></div><!--
		--><div id="PEC_conteneur_image3" class="PEC_petit"></div><!--
		--><div id="PEC_petit_point_image"></div><!--
	--></div>
</div>