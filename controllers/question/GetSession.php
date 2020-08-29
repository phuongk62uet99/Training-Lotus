<?php
    include '../../connect.php';
    session_start();
    echo json_encode(['username' => $_SESSION['user']]);
?>