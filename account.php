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
	<title>Account</title>
	<link rel="stylesheet" href="public/css/question.css">
	<link rel="stylesheet" href="public/css/loader.css">
	<link rel="stylesheet" href="public/css/dialog.css">
	<link rel="stylesheet" href="public/css/formCreateQuestion.css">
	<link rel="stylesheet" href="public/css/accountManage.css">
	<link rel="stylesheet" href="http://statics.lotuscdn.vn/embed/editor/statics/editor/fonts/font-icons/css/font-icon.min.css">
</head>
<body>
	<div id="ims"></div>
	<script src="public/js/list-account.js"></script>
</body>
</html>