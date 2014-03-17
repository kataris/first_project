/*variables*/
var pseudo_connecte = 'false';
var css_memoire = '';
var vote = 0;
var menu_bloc2 = '1,1,4/1,7,4';
var bloc2_choix = 0;
var bloc2_actif = false;
var bloc2_erreur;
var bloc2_nombre_ligne = 2;
var $window = $(window);
var timer = '';
var PEC_barre_progression = 10;
var projet_carrousel_image = true;
var projet_carrousel_sondage = true;

/*fonctions au chargement*/
	
if(window.location.hash) {
	} else {
	parent.location.hash='index';
	}
	changer_contenu(parent.location.hash = parent.location.hash.replace(/#([\s\S]*?)/g, '$1'), "page", 1);
$(function(){
  $("head").append(
    $(document.createElement("link")).attr({rel:"stylesheet", type:"text/css", href:"vue/deconnection/deconnection.css"})
  );
});
$(function(){
  $("head").append(
    $(document.createElement("link")).attr({rel:"stylesheet", type:"text/css", href:"vue/connection/connection.css"})
  );
});
$(function(){
  $("head").append(
    $(document.createElement("link")).attr({rel:"stylesheet", type:"text/css", href:"vue/bloc1/bloc1.css"})
  );
});
$(function(){
  $("head").append(
    $(document.createElement("link")).attr({rel:"stylesheet", type:"text/css", href:"vue/espace_detente/espace_detente.css"})
  );
});
 $(document.createElement("link")).attr({rel:"stylesheet", type:"text/css", href:"vue/espace_detente/espace_detente.css"})
$(function(){
  $("head").append(
    $(document.createElement("link")).attr({rel:"stylesheet", type:"text/css", href:"vue/bloc2/bloc2.css"})
  );
});
$(function(){
  $("head").append(
    $(document.createElement("link")).attr({rel:"stylesheet", type:"text/css", href:"vue/PEC_presentation/PEC_presentation.css"})
  );
});
if(document.cookie.indexOf('utilisateur'+'=')!=-1){
	pseudo_connecte = readCookie('utilisateur');
	changer_contenu('connection','connection',0);
	remplir_espace_perso();
}
function sleep(miliseconds) {
           var currentTime = new Date().getTime();

           while (currentTime + miliseconds >= new Date().getTime()) {
           }
       }

/*fonctions ajax*/
function getXMLHttpRequest() {
		var xhr = null;
			
		if (window.XMLHttpRequest || window.ActiveXObject) {
			if (window.ActiveXObject) {
				try {
					xhr = new ActiveXObject("Msxml2.XMLHTTP");
				} catch(e) {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}
			} else {
				xhr = new XMLHttpRequest();
			}
		} else {
			alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
			return null;
		}
			
		return xhr;
	}

/*menu*/
var positionElementInPage = $('nav').offset().top;
$(document).scroll(
    function() {
        if ($(document).scrollTop() >= positionElementInPage) {
            // fixed
            $('nav').addClass("floatable");
        } else {
            // relative
            $('nav').removeClass("floatable");
        }
    }
);

$('#participer').hover(
	function() {
		$('#sous_menu_participer').addClass("visible");
	}, function() {
		$('#sous_menu_participer').removeClass("visible");
	}
);
$('#sous_menu_participer').hover(
	function() {
		$('#sous_menu_participer').addClass("visible");
	}, function() {
		$('#sous_menu_participer').removeClass("visible");
	}
);
$('#aide').hover(
	function() {
		$('#sous_menu_aide').addClass("visible");
	}, function() {
		$('#sous_menu_aide').removeClass("visible");
	}
);
$('#sous_menu_aide').hover(
	function() {
		$('#sous_menu_aide').addClass("visible");
	}, function() {
		$('#sous_menu_aide').removeClass("visible");
	}
);

/*connection*/

function connection(){
		var pseudo = document.getElementById("connection_pseudo").value;
		var mdp = document.getElementById("connection_pass").value;
		var rester = document.getElementById("connection_rester").checked;
		var content = pseudo+'/++**++/'+mdp;
		content = encodeURIComponent(content);
		var xhr = getXMLHttpRequest();
				
		if (xhr && xhr.readyState != 0) {
			xhr.abort();
			delete xhr;
		}
				
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200){
				if(xhr.responseText!='false')
				{
					pseudo_connecte = xhr.responseText;
					if(rester)
					{
						createCookie('utilisateur',pseudo,365);
					}
					changer_contenu('connection','connection', 0);
					remplir_espace_perso();
				}else
				{
					alert('mauvais identifiant ou mot de passe !');
					document.getElementById('connection_pass').value='';
				}
			} else if (xhr.readyState == 3){
			}
		}
				
		xhr.open("POST", "modele/connection/connection.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send("string=" + content);
	}
	
function remplir_espace_perso(){
		var content = pseudo_connecte;
		content = encodeURIComponent(content);
		var xhr = getXMLHttpRequest();
		
		if (xhr && xhr.readyState != 0) {
			xhr.abort();
			delete xhr;
		}
		
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200){
				if(xhr.responseText!='false')
				{
					var reponse = xhr.responseText.split('/++**++/');
					var mail = reponse[0];
					var image = '<img src="'+reponse[1]+'" alt="photo de profil" />';
					changer_contenu(image,'connection_photo',2);
					changer_contenu(pseudo_connecte,'connection_pseudo',2);
				}else
				{
				}
			} else if (xhr.readyState == 3){
			}
		}
		
		xhr.open("POST", "modele/connection/remplir.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send("string=" + content);
	}
	
function inscription(){
		lightbox();
		changer_contenu("inscription","lightbox",0);
	}
	
	function deconnection(){
		pseudo_connecte = 'false';
		eraseCookie('utilisateur');
		changer_contenu('deconnection','connection', 0);
	}
	
function inscription_confirm(){
		var pseudo = document.getElementById('formulaire_pseudo').value;
		var mail = document.getElementById('formulaire_mail').value;
		var pass = document.getElementById('formulaire_pass').value;
		var pass_confirm = document.getElementById('formulaire_pass_confirm').value;
		var content = pseudo+'/++**++/'+mail+'/++**++/'+pass+'/++**++/'+pass_confirm;
		content = encodeURIComponent(content);
		var xhr = getXMLHttpRequest();
		
		if (xhr && xhr.readyState != 0) {
			xhr.abort();
			delete xhr;
		}
		
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200){
				if (/^Votre inscription/.test(xhr.responseText))
				{
					changer_contenu(xhr.responseText,'lightbox',2);
				}else
				{
					var message = xhr.responseText;
					changer_contenu("inscription","lightbox",0);
					changer_contenu(message+document.getElementById('lightbox').innerHTML,'lightbox',2);
				}
			} else if (xhr.readyState == 3){
			}
		}
		
		xhr.open("POST", "modele/connection/inscription.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send("string=" + content);
	}
	
function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}

function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

function eraseCookie(name) {
		createCookie(name,"",-1);
	}
	
/*lightbox*/	
function lightbox(){
		if (document.getElementById('lightbox').style.display == 'none')
		{
			document.getElementById('lightbox').style.display = 'block';
			document.getElementById('fadebox').style.display = 'block';
		}else {
			document.getElementById('lightbox').style.display = 'none';
			document.getElementById('fadebox').style.display = 'none';
		}
	}
	
/*bloc 1*/

function afficherprojetpleinepage(blocdappel)
{
	if(blocdappel == 'plusinfo')
	{
		changer_contenu("pagedescriptionprojet","lightbox",0);
		lightbox();
	}
	else
	{
		lightbox();
	}
}

function boutonplusun(choix)
{
	if(!vote)
	{
		switch(choix)
		{
			case 'gauche+':
				$('#boutonplusundroite').addClass('petit');
				$('#corpsprojetdroite').addClass('petit');
				$('#plusinfodroite').addClass('petit');
				break;
			
			case 'droite+':
				$('#boutonplusungauche').addClass('petit');
				$('#corpsprojetgauche').addClass('petit');
				$('#plusinfogauche').addClass('petit');
				break;
			
			case 'gauche-':
				$('#boutonplusundroite').removeClass('petit');
				$('#corpsprojetdroite').removeClass('petit');
				$('#plusinfodroite').removeClass('petit');
				break;
			
			case 'droite-':
				$('#boutonplusungauche').removeClass('petit');
				$('#corpsprojetgauche').removeClass('petit');
				$('#plusinfogauche').removeClass('petit');
				break;
				
			case 'gauche*':
				vote = 1;
				$('#boutonplusundroite').addClass('invisible');
				$('#corpsprojetdroite').addClass('invisible');
				$('#plusinfodroite').addClass('invisible');
				//changer_contenu(autre projet,"corpsprojetgauche",0);
				//changer_contenu(autre projet,"corpsprojetdroite",0);
				setTimeout("$('#boutonplusundroite').removeClass('petit').removeClass('invisible');", 1000);
				setTimeout("$('#corpsprojetdroite').removeClass('petit').removeClass('invisible');", 1000);
				setTimeout("$('#plusinfodroite').removeClass('petit').removeClass('invisible');", 1000);
				vote = 0;
				break;
				
			case 'droite*':
				vote = 1;
				$('#boutonplusungauche').addClass('invisible');
				$('#corpsprojetgauche').addClass('invisible');
				$('#plusinfogauche').addClass('invisible');
				//changer_contenu(autre projet,"corpsprojetgauche",0);
				//changer_contenu(autre projet,"corpsprojetdroite",0);
				setTimeout("$('#boutonplusungauche').removeClass('petit').removeClass('invisible');", 1000);
				setTimeout("$('#corpsprojetgauche').removeClass('petit').removeClass('invisible');", 1000);
				setTimeout("$('#plusinfogauche').removeClass('petit').removeClass('invisible');", 1000);
				vote = 0;
				break;
		}
	}
}

/* Espace detente */
 
function chargerED()
{
	changer_contenu("espace_detente","page",1);
	$('body').scrollTop(0);
}

function charger_categorie(choix)
{
	switch (choix)
	{
		case 'reglement':
			changer_contenu('reglement','page',0);
			break;
		case 'tuto':
			changer_contenu('tuto','page',0);
			break;
		case 'AQ':
			changer_contenu('question_reponse','page',0);
			break;
		case 'bar':
			changer_contenu('le_bar','page',0);
			break;
	}
}

function topic(choix, id) //choix 0 : reglement, 1 : tuto, ...
{
	switch (choix)
	{
		case 0:
			createCookie(id_sujet,id,365);
			changer_contenu('sujet','lightbox',0)
			lightbox();
			break;
	}
}


/*bloc2*/

function affiche_bloc2_choix_bloc() {
		if(document.getElementById('choix_bloc').className == '')
		{
			$("#choix_bloc").addClass("ouvert");
		}else
		{
			$("#choix_bloc").removeClass("ouvert");
		}
	}

$(document).on("mouseenter", ".bloc2_conteneur_modif", function hover_bloc2_conteneur(){
		if (bloc2_actif == true)
		{
			var $element = $(this);
			bloc2_erreur = 0;
			var longueur, largeur;
			var tableau = menu_bloc2.split('/');
			for(var i=0; i<tableau.length; ++i)
			{
				var tableau2 = tableau[i].split(',');
				switch(tableau2[2])
				{
					case '1':
						largeur = 1;
						longueur = 1;
					break;
					case '2':
						largeur = 2;
						longueur = 1;
					break;
					case '3':
						largeur = 1;
						longueur = 2;
					break;
					case '4':
						largeur = 2;
						longueur = 2;
					break;
					case '5':
						largeur = 3;
						longueur = 1;
					break;
					case '6':
						largeur = 1;
						longueur = 3;
					break;
					case '7':
						largeur = 3;
						longueur = 2;
					break;
					case '8':
						largeur = 2;
						longueur = 3;
					break;
					case '9':
						largeur = 3;
						longueur = 3;
					break;
				}
				switch(bloc2_choix)
				{
					case 1:
						largeur2 = 1;
						longueur2 = 1;
					break;
					case 2:
						largeur2 = 2;
						longueur2 = 1;
					break;
					case 3:
						largeur2 = 1;
						longueur2 = 2;
					break;
					case 4:
						largeur2 = 2;
						longueur2 = 2;
					break;
					case 5:
						largeur2 = 3;
						longueur2 = 1;
					break;
					case 6:
						largeur2 = 1;
						longueur2 = 3;
					break;
					case 7:
						largeur2 = 3;
						longueur2 = 2;
					break;
					case 8:
						largeur2 = 2;
						longueur2 = 3;
					break;
					case 9:
						largeur2 = 3;
						longueur2 = 3;
					break;
					default:
						largeur2 = 0;
						longueur2 = 0;
					break;
				}
				for (var l=0; l<=longueur2-1; ++l)
				{
					for (var m=0; m<=largeur2-1; ++m)
					{
						for (var j=tableau2[1]; j<=tableau2[1]-1+longueur; ++j)
						{
							for (var k=tableau2[0]; k<=tableau2[0]-1+largeur; ++k)
							{
								var coord = $element.attr('id').split('bloc2_conteneur');
								var coord2 = coord[1].split('_');
								if((parseInt(j) == parseInt(coord2[1])+l && parseInt(k) == parseInt(coord2[0])+m) || parseInt(coord2[1])+l>8)
								{
									bloc2_erreur++;
								}
							}
						}
					}
				}
			}
			if(document.getElementById('bloc2_element_supprime')==null)
			{
				if(bloc2_erreur != 0)
				{
					this.innerHTML = this.innerHTML+"<div id='bloc2_element_supprime' class='forme"+bloc2_choix+" bloc2_contenu_faux'></div>";
				}else
				{
					this.innerHTML = this.innerHTML+"<div id='bloc2_element_supprime' class='forme"+bloc2_choix+" bloc2_contenu_vrai'></div>";
				}
			}
		}
	});
$(document).on("mouseleave", ".bloc2_conteneur_modif", function(){
		if (bloc2_actif == true)
		{
			suppr(document.getElementById('bloc2_element_supprime'));
		}
	});
	
function changer_etat_bloc2(){
		if(bloc2_actif == true)
		{
			bloc2_actif = false;
			$(".bloc2_conteneur_modif").addClass('bloc2_conteneur');
			$(".bloc2_conteneur_modif").removeClass('bloc2_conteneur_modif');
			bloc2_suppr_ligne();
		}else
		{
			bloc2_actif = true;
			$(".bloc2_conteneur").addClass('bloc2_conteneur_modif');
			$(".bloc2_conteneur").removeClass('bloc2_conteneur');
			bloc2_choix = 0;
		}
	}
	
function bloc2_poser(id){
		if(bloc2_erreur ==0 && bloc2_actif == true && bloc2_choix != 0)
		{
			var coord = id.split('bloc2_conteneur')
			var coord2 = coord[1].split('_');
			document.getElementById(id).innerHTML = "<div class='forme"+bloc2_choix+" bloc2_contenu'></div>";
			menu_bloc2 = menu_bloc2+'/'+coord2[0]+','+coord2[1]+','+bloc2_choix;
			bloc2_choix = 0;
		}
	}
	
$window.scroll(function(){
		if(document.body.clientHeight + document.body.scrollTop == $(document).height() && bloc2_actif == true)
		{
			bloc2_nombre_ligne++;
			for(var i=1; i<=8; ++i)
			{
				document.getElementById('bloc2_menu').innerHTML = document.getElementById('bloc2_menu').innerHTML+'<div class="bloc2_conteneur_modif" id="bloc2_conteneur'+bloc2_nombre_ligne+'_'+i+'" onclick="bloc2_poser(\'bloc2_conteneur'+bloc2_nombre_ligne+'_'+i+'\');"></div><!-- -->';
			}
		}
	}
);

function bloc2_suppr_ligne(){
		var ligne = 0;
		var plus = 0;
		var bloc = menu_bloc2.split('/');
		for(var i=0; i<bloc.length; i++)
		{
			plus = 0;
			var bloc2 = bloc[i].split(',');
			switch(bloc2[2])
			{
				case '1':
					plus = 0;
				break;
				case '2':
					plus = 1;
				break;
				case '3':
					plus = 0;
				break;
				case '4':
					plus = 1;
				break;
				case '5':
					plus = 2;
				break;
				case '6':
					plus = 0;
				break;
				case '7':
					plus = 2;
				break;
				case '8':
					plus = 1;
				break;
				case '9':
					plus = 2;
				break;
			}
			plus = parseInt(bloc2[0])+plus;
			if(plus>ligne)
			{
				ligne = plus;
			}
		}
		while(bloc2_nombre_ligne<ligne)
		{
			bloc2_nombre_ligne++;
			for(var i=1; i<=8; ++i)
			{
				document.getElementById('bloc2_menu').innerHTML = document.getElementById('bloc2_menu').innerHTML+'<div class="bloc2_conteneur" id="bloc2_conteneur'+bloc2_nombre_ligne+'_'+i+'" onclick="bloc2_poser(\'bloc2_conteneur'+bloc2_nombre_ligne+'_'+i+'\');"></div><!-- -->';
			}
		}
		for(var i=bloc2_nombre_ligne; i>ligne; --i)
		{
			for(var j=1; j<=8; ++j)
			{
				suppr(document.getElementById('bloc2_conteneur'+i+'_'+j));
			}
		}
		bloc2_nombre_ligne = ligne;
	}
			
	
function suppr(elt)
{
    elt.parentNode.removeChild(elt);
}

/*PEC_presentation*/

function mise_en_page_presentation(){
		if(projet_carrousel_image && projet_carrousel_sondage)
		{
			$('#PEC_conteneur_sondage').addClass('PEC_conteneur_sondage2');
			$('#PEC_conteneur_image').addClass('PEC_conteneur_image2');
			$('#description').addClass('PEC_description3');
			$('#boutons').addClass('PEC_bouton3');
		}else if(projet_carrousel_image)
		{
			$('#PEC_conteneur_sondage').addClass('PEC_conteneur_sondage0');
			$('#PEC_conteneur_image').addClass('PEC_conteneur_image1');
			$('#description').addClass('PEC_description2');
			$('#boutons').addClass('PEC_bouton2');
		}else if(projet_carrousel_sondage)
		{
			$('#PEC_conteneur_sondage').addClass('PEC_conteneur_sondage1');
			$('#PEC_conteneur_image').addClass('PEC_conteneur_image0');
			$('#description').addClass('PEC_description2');
			$('#boutons').addClass('PEC_bouton2');
		}else
		{
			$('#PEC_conteneur_sondage').addClass('PEC_conteneur_sondage0');
			$('#PEC_conteneur_image').addClass('PEC_conteneur_image0');
			$('#description').addClass('PEC_description1');
			$('#boutons').addClass('PEC_bouton1');
		}
	}

function carrousel(){
		function changer_sondage(compteur){
				if(compteur-1 < 0)
				{
					$currentSondage = $sondage.eq(indexSondage);
				}else
				{
					$currentSondage = $sondage.eq(compteur-1);
				}
				$('#PEC_conteneur_sondage1').html('<div id="'+$currentSondage.html()+'" class="PEC_petit_prev_sondage"></div>');
				$('#PEC_conteneur_sondage2').html('');
				$('#PEC_conteneur_sondage3').html('');
				$currentSondage = $sondage.eq(compteur);
				$('#PEC_conteneur_sondage2').html('<div id="'+$currentSondage.html()+'" class="PEC_grand"></div>');
				if(compteur+1 > indexSondage)
				{
					$currentSondage = $sondage.eq(0);
				}else
				{
					$currentSondage = $sondage.eq(compteur+1);
				}
				$('#PEC_conteneur_sondage3').html('<div id="'+$currentSondage.html()+'" class="PEC_petit_next_sondage"></div>');				
			}
		var $carrousel_sondage = $('#carrousel_sondage'), 
		$sondage = $('#carrousel_sondage div'), 
		indexSondage = $sondage.length - 1, 
		i_sondage = 0;
		changer_sondage(i_sondage);
		
		$(document).on("click", '.PEC_petit_next_sondage', function(){
				i_sondage++;
				if(i_sondage <= indexSondage)
				{
					changer_sondage(i_sondage);
				}else
				{
					i_sondage = 0;
					changer_sondage(0);
				}
			});
		$(document).on("click", '.PEC_petit_prev_sondage', function(){
				i_sondage--;
				if(i_sondage >= 0)
				{
					changer_sondage(i_sondage);
				}else
				{
					i_sondage = indexSondage;
					changer_sondage(indexSondage);
				}
			});
			
		$(document).on("click", '.bouton_carrousel_sondage', function(){
				var id = $(this).attr('id').split('bouton_carrousel_sondage');
				var id2 = parseInt(id[1]);
				i_sondage = id2;
				changer_sondage(id2);
			});
		
		function slideCarrousel(){				
				timer = setTimeout(function(){
						if(i_sondage < indexSondage)
						{
							i_sondage++;
						}else
						{
							i_sondage = 0;
						}
						if(i_image < indexImage)
						{
							i_image++;
						}else
						{
							i_image = 0;
						}
						changer_sondage(i_sondage);
						changer_image(i_image);
						slideCarrousel();
					}, 20000);
			}
		$('#PEC_conteneur_sondage').hover(function(){
				clearTimeout(timer);
				timer = '';
			},function(){
					slideCarrousel();
				});
				
		function petit_point_sondage(){
				for(var i_sondage=0; i_sondage<=indexSondage; ++i_sondage)
				{
					$('#PEC_petit_point_sondage').append('<div id="bouton_carrousel_sondage'+i_sondage+'" class="bouton_carrousel_sondage"></div>');
				}
				var largeur = ((indexSondage+1)*10)+5;
				$('#PEC_petit_point_sondage').css("margin-left",'-'+largeur+'px');
			}
		petit_point_sondage();
		
		function changer_image(compteur){
				if(compteur-1 < 0)
				{
					$currentImage = $image.eq(indexImage);
				}else
				{
					$currentImage = $image.eq(compteur-1);
				}
				$('#PEC_conteneur_image1').html('<div id="'+$currentImage.html()+'" class="PEC_petit_prev_image"></div>');
				$('#PEC_conteneur_image2').html('');
				$('#PEC_conteneur_image3').html('');
				$currentImage = $image.eq(compteur);
				$('#PEC_conteneur_image2').html('<div id="'+$currentImage.html()+'" class="PEC_grand"></div>');
				if(compteur+1 > indexImage)
				{
					$currentImage = $image.eq(0);
				}else
				{
					$currentImage = $image.eq(compteur+1);
				}
				$('#PEC_conteneur_image3').html('<div id="'+$currentImage.html()+'" class="PEC_petit_next_image"></div>');				
			}
		var $carrousel_image = $('#carrousel_image'), 
		$image = $('#carrousel_image div'), 
		indexImage = $image.length - 1, 
		i_image = 0;
		changer_image(i_image);
		
		$(document).on("click", '.PEC_petit_next_image', function(){
				i_image++;
				if(i_image <= indexImage)
				{
					changer_image(i_image);
				}else
				{
					i_image = 0;
					changer_image(0);
				}
			});
		$(document).on("click", '.PEC_petit_prev_image', function(){
				i_image--;
				if(i_image >= 0)
				{
					changer_image(i_image);
				}else
				{
					i_image = indexImage;
					changer_image(indexImage);
				}
			});
			
		$(document).on("click", '.bouton_carrousel_image', function(){
				var id = $(this).attr('id').split('bouton_carrousel_image');
				var id2 = parseInt(id[1]);
				i_image = id2;
				changer_image(id2);
			});
			
		$('#PEC_conteneur_image').hover(function(){
				clearTimeout(timer);
				timer = '';
			},function(){
					slideCarrousel();
				});
				
		function petit_point_image(){
				for(var i_image=0; i_image<=indexImage; ++i_image)
				{
					$('#PEC_petit_point_image').append('<div id="bouton_carrousel_image'+i_image+'" class="bouton_carrousel_image"></div>');
				}
				var largeur = ((indexImage+1)*10)+5;
				$('#PEC_petit_point_image').css("margin-left",'-'+largeur+'px');
			}
		petit_point_image();
		slideCarrousel();
	}
	
function PEC_ajouter_favori(){
		alert('Ce projet a été ajouté à vos favoris');
	}
	
/*changer_contenu 0:bloc venant d'un fichier php / 1:nouvelle page / 2:texte récupérer directement mis dans contenu*/
function changer_contenu(contenu, conteneur, page){
		var content = encodeURIComponent(contenu);
		var xhr = getXMLHttpRequest();
				
		if (xhr && xhr.readyState != 0) {
			xhr.abort();
			delete xhr;
		}			
		
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200){
				document.getElementById(conteneur).innerHTML = xhr.responseText.replace(/([\s\S]*?)1$/g, '$1');
				if (page == 1)
				{
					parent.location.hash=contenu;
					clearTimeout(timer);
					timer = '';
				}
				executer(contenu);
			} else if (xhr.readyState == 3){
				document.getElementById(conteneur).innerHTML = "<div style=\"text-align: center;\">Chargement en cours...</div>";
			}
		}
		
		if(page!=2)
		{
			xhr.open("POST", "changer_page.php", false);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send("string=" + content);
		}else
		{
			document.getElementById(conteneur).innerHTML = contenu;
		}
	}
	
	function executer(page) {
		switch (page) {
			case "index":
			break;
			case "projet_en_cours":
				$('body').scrollTop(0);
				carrousel();
				mise_en_page_presentation()
				$('#PEC_barre_fait').css('width',PEC_barre_progression+'%');
				$('#PEC_barre_fait').html(PEC_barre_progression+'%');
			break;
		}
	}
	
function reload() {
		changer_contenu(parent.location.hash = parent.location.hash.replace(/#([\s\S]*?)/g, '$1'), "page", 1);
	}