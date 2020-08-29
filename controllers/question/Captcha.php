<?php
    require_once('recaptchalib.php');
    $publickey = "your_public_key"; // you got this from the signup page
    echo recaptcha_get_html($publickey);
?>