<?php
	include "connect.php";
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
	<link rel="stylesheet" href="http://statics.lotuscdn.vn/embed/editor/statics/editor/fonts/font-icons/css/font-icon.min.css">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="public/css/accountManage.css">
</head>
<body>
	<div id="ims"></div>
	<script src="public/js/question-manager.js"></script>
</body>
</html>