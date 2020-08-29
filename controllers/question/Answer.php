<?php
    include '../../connect.php';
    $sqlANS = "SELECT ans.question_id, ans.name, ans.content FROM question AS qs, answer ans WHERE ans.question_id = qs.id";
	$resultANS = $conn->query($sqlANS);
?>