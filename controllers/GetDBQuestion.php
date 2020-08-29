<?php
    include '../connect.php';
    session_start(); 
	if (!isset($_SESSION['user'])) {
		header('Location: '.$url.'');
    }

    if($_GET['pageIndex'] && isset($_GET['perPage'])){
        $sql = "SELECT * FROM answer";
        $sqlCount = "SELECT COUNT(*) as TotalRow FROM answer WHERE status = 1";
        $sqlStatusTrue = "SELECT COUNT(*) as statusTrue FROM answer WHERE status = 1";
         $sqlStatusFalse = "SELECT COUNT(*) as statusFalse FROM answer WHERE status = 0";
        $resultStatusFalse = $conn->query($sqlStatusFalse);
        $statusFalse = 0;
        foreach($resultStatusFalse as $value){
            $statusFalse = $value['statusFalse'];
        }
        $result = $conn->query($sql);
        $resultTotalRow = $conn->query($sqlCount);
        $resultStatus = $conn->query($sqlStatusTrue);
        $TotalRow = 0;
        foreach($resultTotalRow as $value){
            $TotalRow = $value['TotalRow'];
        }
        $statusTrue = 0;
        foreach($resultStatus as $value){
            $statusTrue = $value['statusTrue'];
        }
        $pageIndex = $_GET['pageIndex'];
        $perPage = $_GET['perPage'];
        $begin = ($pageIndex * $perPage) - $perPage;
        $sqlPagination = "SELECT * FROM answer WHERE status = 1 ORDER BY id DESC LIMIT ".$begin." , ".$perPage."";
        $resultPagination = $conn->query($sqlPagination);

        $questions = array();
        foreach($resultPagination as $valuePagination){
            $question = array(
                "id" => $valuePagination['id'],
                "question_id" => $valuePagination['question_id'],
                "question" => $valuePagination['name'],
                "answer" => $valuePagination['content'],
                "status" => $valuePagination['status'],
            );
            array_push($questions, $question);
        }
        if($resultPagination){
            echo json_encode(
                [
                    'Success' => true,
                    'ErrorCode' => 0,
                    'Message' => 'success',
                    'Data' => [
                        'TotalRow' => $TotalRow,
                        'Questions' => $questions,
                        'StatusTrue' => $statusTrue,
                       'StatusFalse' => $statusFalse,
                    ]
                ], JSON_PRETTY_PRINT
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
