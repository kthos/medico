<?php
function check_ie8(){
	$ie6 = (ereg("MSIE 6", $_SERVER["HTTP_USER_AGENT"])) ? true : false;
    $ie7 = (ereg("MSIE 7", $_SERVER["HTTP_USER_AGENT"])) ? true : false;
    $ie8 = (ereg("MSIE 8", $_SERVER["HTTP_USER_AGENT"])) ? true : false;

    if ($ie6 || $ie7 || $ie8) {
       return true;
    }
	return false;
}


?>