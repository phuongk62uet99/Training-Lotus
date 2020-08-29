<?php
  include '../../connect.php';
    $sqlQS = "SELECT id,parent_id, name FROM question WHERE parent_id = 0";
	$resultQS = $conn->query($sqlQS);

	$id = (isset($_GET['id'])) ? $_GET['id'] : "";
?>