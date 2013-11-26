<?php
 
function parseZCode($id) {
	$adresse="vue/".$id."/".$id.".php";
	$content=include($adresse);
     
    return $content;
 
}
 
if (isset($_POST["string"])) {
    $content = $_POST["string"];
     
    if (get_magic_quotes_gpc()) {
        $content = stripslashes($content);
    }
 
    echo parseZCode($content); // Ecriture du contenu parsé. 
}
?>