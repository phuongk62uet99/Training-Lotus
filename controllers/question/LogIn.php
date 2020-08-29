<?php
    session_start();
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);
    $username = $_POST['username'];
    $password = $_POST['password'];
    if($_POST['username'] != "" && $_POST['username'] == "admin" && $_POST['password'] == "admin123"){
        $_SESSION["user"] = $username;
        echo json_encode(true);
    }else{
        echo json_encode(false);
    }

?>