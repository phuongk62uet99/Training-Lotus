<?php
    include '../../connect.php';
    session_start(); 
	if (!isset($_SESSION['user'])) {
		header('Location: '.$url.'');
    }
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);

    $permissions = array();
    if($_POST['permissions'] == 0){
        $account = ["id" => 1];
        $question = ["id" => 2];
        array_push($permissions,$account);
        array_push($permissions,$question);
        $per = json_encode( $permissions);
        $_POST['permission'] = $per;
        $sql = "UPDATE account SET fullname = '".$_POST['fullname']."' , email = '".$_POST['email']."' 
        , permissions = '".$_POST['permissions']."' WHERE id =".$_POST['id'];
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
                    'Message' => 'Lỗi sql1',
                ], JSON_PRETTY_PRINT
            );
        }
    }
    else{
        $option = ["id" => $_POST['permissions']];
        array_push($permissions,$option);
        $per = json_encode( $permissions);
        $_POST['permission'] = $per;
        $sql = "UPDATE account SET fullname = '".$_POST['fullname']."' , email = '".$_POST['email']."' , permissions = '".$_POST['permissions']."' WHERE id =".$_POST['id'];
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
                    'Message' => 'Lỗi sql2',
                ], JSON_PRETTY_PRINT
            );
        }
    }
?>