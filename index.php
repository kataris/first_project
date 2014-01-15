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
		<script type='text/javascript' src='http://code.jquery.com/jquery-1.10.2.min.js'></script>
	</head>
	
	<body onhashchange='reload()'>
	<div id="bloc_page">
	<?php
		include("header.php"); ?>
	<div id="page"></div>
	<?php include("footer.php"); ?>
	</div>
	<div id="lightbox" style="display: none;"></div>
	<div id="fadebox" style="display: none;" onclick="lightbox();"></div>
	<script type='text/javascript' src='fichierjs.js'></script>
	</body>
</html>