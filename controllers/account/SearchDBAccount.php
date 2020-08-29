<?php
    include '../../connect.php';
    session_start(); 
	if (!isset($_SESSION['user'])) {
		header('Location: '.$url.'');
    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $rest_json = file_get_contents("php://input");
        $_POST = json_decode($rest_json, true);

        $sql = "SELECT * FROM account";
        $TotalRow = 0;
        $pageIndex = $_GET['pageIndex'];
        $perPage = $_GET['perPage'];
        $begin = ($pageIndex * $perPage) - $perPage;
        
        $accounts = array();
        if(isset($_GET['pageIndex'])){
            $sqlCount = "SELECT COUNT(*) as TotalRow FROM account";
            $result = $conn->query($sql);
            $resultTotalRow = $conn->query($sqlCount);

            foreach($resultTotalRow as $value){
                $TotalRow = $value['TotalRow'];
            }
            $sqlPagination = "SELECT * FROM account WHERE username LIKE '%".$_POST['...']."%' ORDER BY id DESC LIMIT ".$begin." , ".$perPage;
            $resultPagination = $conn->query($sqlPagination);

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
                if($accounts){
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
                    $sqlPaginationContent = "SELECT * FROM account WHERE fullname LIKE '%".$_POST['...']."%' ORDER BY id DESC LIMIT ".$begin." , ".$perPage;
                    $resultPaginationContent = $conn->query($sqlPaginationContent);

                    foreach($resultPaginationContent as $valuePaginationContent){
                        $account = array(
                            "id" => $valuePaginationContent['id'],
                            "username" => $valuePaginationContent['username'],
                            "password" => $valuePaginationContent['password'],
                            "fullname" => $valuePaginationContent['fullname'],
                            "avatar" => $valuePaginationContent['avatar'],
                            "email" => $valuePaginationContent['email'],
                            "status" => $valuePaginationContent['status'],
                            "permissions" => $valuePaginationContent['permissions'],
                        );
                        array_push($accounts, $account);
                    }
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
                }
                
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
    }else{
        header("Location: http://192.168.19.220:8082/Louts-QA/account.php");
    }
?>