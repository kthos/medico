<?php

include './config/scan_path.php';

$get_file_pdf = $scan_path . '/' . $_GET['file'];
$zip_file = str_replace('.pdf', '.zip', $get_file_pdf);
$hn = explode('_', $_GET['file']);
$hn = $hn[1];
$extract_path = './qazwsxedcr';
if (!file_exists($zip_file)) {
    //echo "Scan file not found.";
    $to = explode('/', $_GET['file']);
    copy($get_file_pdf, $extract_path . '/' . $to[2]);
} else {
    $zip = new ZipArchive();
    $zip_password = $hn . "qazwsxedcr112233";
    $zip_status = $zip->open($zip_file);
    if ($zip_status === true) {
        if ($zip->setPassword($zip_password)) {
            if (!$zip->extractTo($extract_path)) {
                echo "Extraction failed (wrong password?)";
            }
        }
        $zip->close();
        //echo "ok";
    } else {
        echo "Failed opening archive: " . @$zip->getStatusString() . " (code: " . $zip_status . ")";
        //exit;
    }
}

