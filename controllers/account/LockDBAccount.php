<?php
    include '../../connect.php';
    session_start(); 
	if (!isset($_SESSION['user'])) {
		header('Location: '.$url.'');
    }
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);
    // cho status = 0 la khoa tai khoan
    $sql = "UPDATE account SET status = 0 WHERE id = ".$_POST['id'];
    if ($conn->query($sql) === TRUE) {
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
?>