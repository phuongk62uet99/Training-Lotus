<?php
	include "../connect.php";
	session_start(); 
	if (!isset($_SESSION['user'])) {
		header('Location: '.$url.'');
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Question</title>
	<link rel="stylesheet" href="<?= $url ?>public/css/question.css">
	<link rel="stylesheet" href="<?= $url ?>public/css/addquestion.css">
	<link rel="stylesheet" href="<?= $url ?>public/fontawesome/css/all.css">
	<script type="text/javascript" src="https://statics.lotuscdn.vn/embed/editor-beta/plugins/editor-with-jquery.js"></script>
</head>
<body>
	<div id="ims"></div>
	<script src="<?= $url ?>public/js/question-manager.js"></script>
</body>
</html>