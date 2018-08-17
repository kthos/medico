<?php

$path_clear = './qazwsxedcr';
$temps = scandir($path_clear);
$dir_ = ['.', '..'];
foreach ($temps as $temp) {
    if (!in_array($temp, $dir_)) {
        $fpath = $path_clear . '/' . $temp;
        //echo "<br>$file -" . date("YmdHis", filemtime($fpath));
        $filelastmodified = filemtime($fpath);
        if ((time() - $filelastmodified ) > 1) {
            @unlink($fpath);
        }
    }
}

