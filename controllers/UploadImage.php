<?php
    include '../connect.php';
    session_start(); 
	if (!isset($_SESSION['user'])) {
		header('Location: '.$url.'');
    }

    
    $url_anh = '';
	$url = '../public/images/';
	$objImg = $url . basename($_FILES["image"]["name"]);

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $objImg)) {
    	$url_anh = $url . basename( $_FILES["image"]["name"]);
    }

    echo json_encode($url_anh);

?>
