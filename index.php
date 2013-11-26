<!DOCTYPE html/>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr">
    <head>
        <title>Projet</title>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8"/>
		<link href="index.css" rel="stylesheet" type="text/css" id="feuille_style"/>
		<!--[if lt IE 9]>
			<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
		<!--[if lte IE 7]>
			<link rel="stylesheet" href="index_ie.css" />
		<![endif]-->
	</head>
	
	<body onhashchange='reload()'>
	<div id="bloc_page">
	<?php
		include("header.php"); ?>
	<div id="page"></div>
	<script src="fichierjs.js"></script>
	<?php include("footer.php"); ?>
	</div>
	</body>
</html>