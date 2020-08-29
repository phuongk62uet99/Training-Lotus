<?php
    include '../connect.php';
    session_start();
    $sql = "SELECT * FROM account ORDER BY id";
    $result = $conn->query($sql);
    $permission;
    foreach($result as $value){
        if($value['username'] == $_SESSION['user']){
            $permission = $value['permissions'];
        }
    }
    echo json_encode(
        [
            'username' => $_SESSION['user'],
            'permission' => $permission
        ]
    );
?>