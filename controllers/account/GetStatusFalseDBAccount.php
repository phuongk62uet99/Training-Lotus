<?php
    include '../../connect.php';
    session_start(); 
	if (!isset($_SESSION['user'])) {
		header('Location: '.$url.'');
    }
    if($_GET['pageIndex']  && $_GET['perPage']){
        $sql = "SELECT * FROM account";
        $sqlCount = "SELECT COUNT(*) as TotalRow FROM account WHERE status = 0";
        $result = $conn->query($sql);
        $resultTotalRow = $conn->query($sqlCount);
        $TotalRow = 0;
        foreach($resultTotalRow as $value){
            $TotalRow = $value['TotalRow'];
        }
        $pageIndex = $_GET['pageIndex'];
        $perPage = $_GET['perPage'];
        $begin = ($pageIndex * $perPage) - $perPage;
        $sqlPagination = "SELECT * FROM account WHERE status = 0 ORDER BY id DESC  LIMIT ".$begin." , ".$perPage;
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
        if($resultPagination){
            echo json_encode(
                [
                    'Success' => true,
                    'ErrorCode' => 0,
                    'Message' => 'success',
                    'Data' => [
                        'TotalRow' => $TotalRow,
                        'Accounts' => $accounts
                    ]
                ]
            );
        }else{
            echo json_encode(
                [
                    'Success' => false,
                    'ErrorCode' => 0,
                    'Message' => 'fail',
                ]
            );
        }
        
    }
?>