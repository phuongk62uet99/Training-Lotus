<?php
   include '../../connect.php';
    session_start(); 
	if (!isset($_SESSION['user'])) {
		header('Location: '.$url.'');
    }
    
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);
    echo json_encode($_POST);
    if($_POST['question_id'] == ''){
        $sql = "UPDATE answer SET question_id = null , name = '".$_POST['question']."' , content = '".$_POST['answer']."' , created_user = '".$_POST['username']."' WHERE id =".$_POST['id'];
    }else{
        $sql = "UPDATE answer SET question_id = ".$_POST['question_id']." , name = '".$_POST['question']."'
         , content = '".$_POST['answer']."' , created_user = '".$_POST['username']."' WHERE id =".$_POST['id'];
    }
    if ($conn->query($sql) === TRUE) {
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
?>