<?php 
	$url = "http://192.168.19.220:8082/Louts-QA/";

	$servername = "localhost";
	$username = "root";
	$password = "";
	$db = "lotus1";

	$conn = new mysqli($servername, $username, $password,$db);
	mysqli_query($conn,"SET CHARACTER SET 'utf8'");
	if (!$conn) {
	    die("Connection failed: " . $conn->connect_error);
	}
?>