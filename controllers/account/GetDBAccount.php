<?php
    include '../../connect.php';
    session_start(); 
	if (!isset($_SESSION['user'])) {
		header('Location: '.$url.'');
    }

    if($_GET['pageIndex'] && isset($_GET['perPage'])){
        $sql = "SELECT * FROM account";
        $sqlCount = "SELECT COUNT(*) as TotalRow FROM account";
        $result = $conn->query($sql);
        $resultTotalRow = $conn->query($sqlCount);

        $TotalRow = 0;
        foreach($resultTotalRow as $value){
            $TotalRow = $value['TotalRow'];
        }
        $pageIndex = $_GET['pageIndex'];
        $perPage = $_GET['perPage'];
        $begin = ($pageIndex * $perPage) - $perPage;
        $sqlPagination = "SELECT * FROM account ORDER BY id DESC LIMIT ".$begin." , ".$perPage."";
        $resultPagination = $conn->query($sqlPagination);

        $accounts = array();
        foreach($resultPagination as $valuePagination){
            $account = array(
                "id" => $valuePagination['id'],
                "username" => $valuePagination['username'],
                "password" => $valuePagination['password'],
                "fullname" => $valuePagination['fullname'],
                "avatar" => $valuePagination['avatar'],
                "email" => $valuePagination['email'],
                "status" => $valuePagination['status'],
                "permissions" => $valuePagination['permissions'],
            );
            array_push($accounts, $account);
        }
        if(isset($resultPagination)){
            echo json_encode(
                [
                    'Success' => true,
                    'ErrorCode' => 0,
                    'Message' => 'success',
                    'Data' => [
                        'TotalRow' => $TotalRow,
                        'Accounts' => $accounts
                    ]
                ], JSON_PRETTY_PRINT
            );
        }else{
            echo json_encode(
                [
                    'Success' => false,
                    'ErrorCode' => 1,
                    'Message' => 'fail',
                    'Data' => [
                        'TotalRow' => 0,
                        'Accounts' => []
                    ]
                ]
            );
        }
        
    }

    // $sqlPagination = "SELECT * FROM account WHERE id = 8";
    // $resultPagination = $conn->query($sqlPagination);
    // foreach($resultPagination as $valuePagination){
    //     echo ($valuePagination['username']);
    //     echo ($valuePagination['permissions']);
    // }
?>
