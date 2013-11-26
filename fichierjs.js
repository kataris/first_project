function changer_contenu(contenu, conteneur){
		parent.location.hash=contenu;
		var content = encodeURIComponent(contenu);
		var xhr = getXMLHttpRequest();
		var adresse = "vue/"+contenu+"/"+contenu+".css";
		document.getElementById("feuille_style").href=adresse;
				
		if (xhr && xhr.readyState != 0) {
			xhr.abort();
			delete xhr;
		}
				
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200){
				document.getElementById(conteneur).innerHTML = xhr.responseText;
				executer(contenu);
			} else if (xhr.readyState == 3){
				document.getElementById(conteneur).innerHTML = "<div style=\"text-align: center;\">Chargement en cours...</div>";
			}
		}
				
		xhr.open("POST", "changer_page.php", true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send("string=" + content);
	}
function executer(page) {
		switch (page) {
		
		}
	}
	
if(window.location.hash) {
	} else {
	parent.location.hash='index';
	}
	changer_contenu(parent.location.hash = parent.location.hash.replace(/#([\s\S]*?)/g, '$1'), "page");