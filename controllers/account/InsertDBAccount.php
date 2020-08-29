<?php
    include '../../connect.php';
    session_start(); 
	if (!isset($_SESSION['user'])) {
		header('Location: '.$url.'');
	}
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);
    $_POST['permission'] = json_encode($_POST['permissions']);
    $checkData = 0;
    if($_POST['user'] == '' && $_POST['password'] == '' && $_POST['fullname'] == '' && $_POST['email'] == '' && $_POST['permissions'] == ''){
        echo json_encode(
            [
                'Success' => false,
                'Message' => 'Chưa nhập đầy đủ thông tin',
                'ErrorCode' => 1,
                'Data' => [
                    'user' => '',
                    'password' => '',
                    'fullname' => '',
                    'email' => '',
                    'permissions' => null,
                ],
            ], JSON_PRETTY_PRINT
        );
    }else{
        $sqlGet = "SELECT username,email FROM account";
        $resultGet = $conn->query($sqlGet);
        foreach($resultGet as $val){
            if(($_POST['user'] == $val['username'] && $_POST['email'] == $val['email']) || ($_POST['user'] == $val['username'] || $_POST['email'] == $val['email'])){
                $checkData = 1;
            }
        }

        if($checkData === 0){
            $sql = "INSERT INTO account (id, username, password, fullname, avatar, email, status, permissions, CreatedDate, CreatedBy, LastModifiedDate, LastModifiedBy)
            VALUES (null, '".$_POST['user']."', md5('".$_POST['password']."'), '".$_POST['fullname']."', '".$_POST['avatar']."', '".$_POST['email']."', 1,
             '".$_POST['permission']."','".$_POST['CreatedDate']."','".$_POST['usernameAccount']."','".$_POST['CreatedDate']."','".$_POST['usernameAccount']."')";
                
            if ($conn->query($sql) === TRUE) {
                echo json_encode(
                    [
                        'Success' => true,
                        'ErrorCode' => 0,
                        'Message' => 'Đã tạo',
                    ], JSON_PRETTY_PRINT
                );
            } else {
                echo json_encode(
                    [
                        'Success' => false,
                        'ErrorCode' => 1,
                        'Message' => 'Lỗi sql',
                        // 'xem loi ' => echo $_POST['usernameAccount'] ,
                    ], JSON_PRETTY_PRINT
                );
            }
        }
        else{
            echo json_encode(
                [
                    'Success' => false,
                    'ErrorCode' => 1,
                    'Message' => 'Username hoặc email đã tồn tại',
                ]
            );
        }
    }
    
    
?>