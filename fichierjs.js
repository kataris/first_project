function changer_contenu(contenu, conteneur){
		parent.location.hash=contenu;
		var content = encodeURIComponent(contenu);
		var xhr = getXMLHttpRequest();
				
		if (xhr && xhr.readyState != 0) {
			xhr.abort();
			delete xhr;
		}
				
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200){
				document.getElementById(conteneur).innerHTML = xhr.responseText.replace(/([\s\S]*?)1$/g, '$1');
				executer(contenu);
			} else if (xhr.readyState == 3){
				document.getElementById(conteneur).innerHTML = "<div style=\"text-align: center;\">Chargement en cours...</div>";
			}
		}
				
		xhr.open("POST", "changer_page.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send("string=" + content);
	}
	
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
	
function executer(page) {
		switch (page) {
			case "page":
			break;		
		}
	}

// listen for scroll
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
	
if(window.location.hash) {
	} else {
	parent.location.hash='index';
	}
	changer_contenu(parent.location.hash = parent.location.hash.replace(/#([\s\S]*?)/g, '$1'), "page");