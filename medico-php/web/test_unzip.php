<?php

include './config/scan_path.php';
$file_pdf = '';
$get_file_pdf = $scan_path . '/' . $file_pdf;
$zip_file = str_replace('.pdf', '.zip', $get_file_pdf);
$hn = explode('_',$file_pdf);
$hn = $hn[1];
$extract_path = './qazwsxedcr';
if (!file_exists($zip_file)) {
    //echo "Scan file not found.";
    $to = explode('/', $file_pdf);
    copy($get_file_pdf, $extract_path . '/' . $to[2]) or die('Can not copy');
} else {
    $zip = new ZipArchive();
    $zip_password = $hn . "qazwsxedcr112233";
    $zip_status = $zip->open($zip_file) or die('Can not open zip');
    if ($zip_status === true) {
        if ($zip->setPassword($zip_password)) {
            if (!$zip->extractTo($extract_path)) {
                echo "Extraction failed (wrong password?)";
            }
        }
        $zip->close();
        echo "job ok";
    } else {
        echo "Failed opening archive: " . @$zip->getStatusString() . " (code: " . $zip_status . ")";
        //exit;
    }
}
