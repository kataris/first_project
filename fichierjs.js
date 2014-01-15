/*variables*/
var pseudo_connecte = 'false';
var css_memoire = '';

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
		}
	}
	
function reload() {
		changer_contenu(parent.location.hash = parent.location.hash.replace(/#([\s\S]*?)/g, '$1'), "page", 1);
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
		var content = pseudo+'/++**++/'+mdp+'/++**++/';
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
		$('#fondgris').addClass('visible');
		$('#pagedescriptionprojet').addClass('visible');
	}
	else
	{
		if(blocdappel == 'fondgris')
		{
			$('#fondgris').removeClass('visible');
			$('#pagedescriptionprojet').removeClass('visible');
		}
	}
}

$('#boutonplusungauche').hover(
	function() {
		$('#boutonplusundroite').addClass("petit");
		$('#corpsprojetdroite').addClass("petit");
	}, function() {
		$('#boutonplusundroite').removeClass("petit");
		$('#boutonplusundroite').removeClass("petit");
	}
);


$('#boutonplusundroite').hover(
	function() {
		$('#boutonplusungauche').addClass("petit");
		$('#corpsprojetgauche').addClass("petit");
	}, function() {
		$('#boutonplusungauche').removeClass("petit");
		$('#boutonplusungauche').removeClass("petit");
	}
);
	
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
if(document.cookie.indexOf('utilisateur'+'=')!=-1){
	pseudo_connecte = readCookie('utilisateur');
	changer_contenu('connection','connection',0);
	remplir_espace_perso();
}