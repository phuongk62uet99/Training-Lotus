<?php
    include '../connect.php';
    session_start(); 
	if (!isset($_SESSION['user'])) {
		header('Location: '.$url.'');
	}
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);
    echo json_encode($_POST);
    
    if($_POST['question_id'] == ''){
        $sql = "INSERT INTO answer (id, question_id, name, content, status, created_user)
        VALUES (null, null , '".$_POST['question']."', '".$_POST['answer']."',1,'".$_POST['username']."')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(true);
        } else {
            echo json_encode(false);
        }
    }else{
        $sql = "INSERT INTO answer (id, question_id, name, content, status, created_user)
        VALUES (null, ".$_POST['question_id']." , '".$_POST['question']."', '".$_POST['answer']."',1,'".$_POST['username']."')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(true);
        } else {
            echo json_encode(false);
        }
    }
    
?>