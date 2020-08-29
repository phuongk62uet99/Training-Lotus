 	
<?php
    session_start();
    include "../connect.php";
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);

    $sql = "SELECT * FROM account";
    $result = $conn->query($sql);
    $username = "";
    $password = "";
    $checkLogin = 0;

    foreach($result as $val){
        if($_POST['username'] == $val['username'] && md5($_POST['password']) == $val['password']){
            $username = $val['username'];
            $password = $val['password'];
            $checkLogin = 1;
        }
    }
    
    if($username != "" && $checkLogin == 1){
        $_SESSION["user"] = $username;
        echo json_encode(true);
    }else{
        echo json_encode(false);
    }

?>