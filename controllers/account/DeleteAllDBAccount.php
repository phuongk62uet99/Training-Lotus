<?php
    include '../connect.php';
    session_start(); 
	if (!isset($_SESSION['user'])) {
		header('Location: '.$url.'');
    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $rest_json = file_get_contents("php://input");
        $_POST = json_decode($rest_json, true);
        $_POST1 = json_encode($_POST);
        $_POST2 = substr($_POST1, 1, -1);
        $sql = "UPDATE account SET status = 0 WHERE id IN(".$_POST2.")";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(true);
        } else {
            echo json_encode(false);
        }
    }
?>