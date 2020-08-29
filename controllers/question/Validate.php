<?php 
	function is_valid($str) {
	    return (!preg_match("/^[a-zA-Z0-9]{5,20}$/", $str)) ? FALSE : TRUE;
	}
?>

