<?php
    include '../../connect.php';
    session_start(); 
	if (!isset($_SESSION['user'])) {
		header('Location: '.$url.'');
    }
    
    $rest_json = file_get_contents("php://input");
    $_POST = json_decode($rest_json, true);

    $sql = "SELECT * FROM answer";
    $TotalRow = 0;
    $pageIndex = $_GET['pageIndex'];
    $perPage = $_GET['perPage'];
    $begin = ($pageIndex * $perPage) - $perPage;
    
    $questions = array();
    if(isset($_GET['pageIndex'])){
        if($_GET['status'] == 1){
            $sqlCount = "SELECT COUNT(*) as TotalRow FROM answer WHERE status = 1";
            $result = $conn->query($sql);
            $resultTotalRow = $conn->query($sqlCount);
            foreach($resultTotalRow as $value){
                $TotalRow = $value['TotalRow'];
            }
            $sqlPagination = "SELECT * FROM answer WHERE status = 1 AND name LIKE '%".$_POST['questionNameChild']."%' ORDER BY id DESC LIMIT ".$begin." , ".$perPage;
            $resultPagination = $conn->query($sqlPagination);

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
            if(isset($resultPagination)){
                if($questions){
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
                    $sqlPaginationContent = "SELECT * FROM answer WHERE status = 1 AND content LIKE '%".$_POST['questionNameChild']."%' ORDER BY id DESC LIMIT ".$begin." , ".$perPage;
                    $resultPaginationContent = $conn->query($sqlPaginationContent);

                    foreach($resultPaginationContent as $valuePaginationContent){
                        $question = array(
                            "id" => $valuePaginationContent['id'],
                            "question_id" => $valuePaginationContent['question_id'],
                            "question" => $valuePaginationContent['name'],
                            "answer" => $valuePaginationContent['content'],
                            "status" => $valuePaginationContent['status'],
                        );
                        array_push($questions, $question);
                    }
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
                }
                
            }else{
                echo json_encode(
                    [
                        'Success' => false,
                        'ErrorCode' => 1,
                        'Message' => 'fail',
                        'Data' => [
                            'TotalRow' => 0,
                            'Questions' => []
                        ]
                    ]
                );
            }
        }
        else{
            $sqlCount = "SELECT COUNT(*) as TotalRow FROM answer WHERE status = 0";
            $result = $conn->query($sql);
            $resultTotalRow = $conn->query($sqlCount);

            foreach($resultTotalRow as $value){
                $TotalRow = $value['TotalRow'];
            }
            $sqlPagination = "SELECT * FROM answer WHERE status = 0 AND name LIKE '%".$_POST['questionNameChild']."%' ORDER BY id DESC LIMIT ".$begin." , ".$perPage;
            $resultPagination = $conn->query($sqlPagination);

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
            if(isset($resultPagination)){
                if($questions){
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
                    $sqlPaginationContent = "SELECT * FROM answer WHERE status = 0 AND content LIKE '%".$_POST['questionNameChild']."%' ORDER BY id DESC LIMIT ".$begin." , ".$perPage;
                    $resultPaginationContent = $conn->query($sqlPaginationContent);

                    foreach($resultPaginationContent as $valuePaginationContent){
                        $question = array(
                            "id" => $valuePaginationContent['id'],
                            "question_id" => $valuePaginationContent['question_id'],
                            "question" => $valuePaginationContent['name'],
                            "answer" => $valuePaginationContent['content'],
                            "status" => $valuePaginationContent['status'],
                        );
                        array_push($questions, $question);
                    }
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
                }
            }else{
                echo json_encode(
                    [
                        'Success' => false,
                        'ErrorCode' => 1,
                        'Message' => 'fail',
                        'Data' => [
                            'TotalRow' => 0,
                            'Questions' => []
                        ]
                    ]
                );
            }
        }
    }else{
        echo json_encode(
            [
                'Success' => false,
                'ErrorCode' => 1,
                'Message' => 'fail',
                'Data' => [
                    'TotalRow' => 0,
                    'Questions' => []
                ]
            ]
        );
    }
?>