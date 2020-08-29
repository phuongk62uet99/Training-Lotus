<?php
    include '../../connect.php';
    
    session_start(); 
	if (!isset($_SESSION['user'])) {
		header('Location: '.$url.'');
    }

    if(isset($_GET['pageIndex']) && isset($_GET['perPage'])){
        $sql = "SELECT * FROM question";
        $sqlCount = "SELECT COUNT(*) as TotalRow FROM question WHERE parent_id = 0";
        $result = $conn->query($sql);
        $resultTotalRow = $conn->query($sqlCount);

        $TotalRow = 0;
        foreach($resultTotalRow as $value){
            $TotalRow = $value['TotalRow'];
        }
        $pageIndex = $_GET['pageIndex'];
        $perPage = $_GET['perPage'];
        $begin = ($pageIndex * $perPage) - $perPage;
        $sqlPagination = "SELECT * FROM question WHERE parent_id = 0 LIMIT ".$begin." , ".$perPage;
        $resultPagination = $conn->query($sqlPagination);

        $questions = array();
        foreach($resultPagination as $valuePagination){
            $question = array(
                "id" => $valuePagination['id'],
                "name" => $valuePagination['name'],
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
                        'Questions' => $questions
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
    }else{
        $sql = "SELECT * FROM question";
        $result = $conn->query($sql);
        $questions = array();
        foreach($result as $value){
            $question = array(
                "id" => $value['id'],
                "name" => $value['name'],
                "parent_id" => $value['parent_id']
            );
            array_push($questions, $question);
        }
        if($result){
            echo json_encode(
                [
                    'Success' => true,
                    'ErrorCode' => 0,
                    'Message' => 'success',
                    'Data' => [
                        'Questions' => $questions
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