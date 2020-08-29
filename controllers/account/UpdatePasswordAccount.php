<?php
    include '../../connect.php';
    session_start(); 
	if (!isset($_SESSION['user'])) {
		header('Location: '.$url.'');
    }
    
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);
    $sql = "UPDATE account SET password = md5('".$_POST['password']."') WHERE id =".$_POST['id'];
    if ($conn->query($sql) === TRUE) {
        echo json_encode(
            [
                'Success' => true,
                'ErrorCode' => 0,
                'Message' => 'Đã cập nhật',
            ], JSON_PRETTY_PRINT
        );
    } else {
        echo json_encode(
            [
                'Success' => false,
                'ErrorCode' => 1,
                'Message' => 'Lỗi sql',
            ], JSON_PRETTY_PRINT
        );
    }
?>