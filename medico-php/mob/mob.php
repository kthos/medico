<?php


$pdf = 'test.pdf';
//file_get_contents is standard function
$content = file_get_contents($pdf);
header('Content-Type: application/pdf');
header('Content-Length: '.strlen( $content ));
header('Content-disposition: inline; filename="' . $pdf . '"');
header('Cache-Control: public, must-revalidate, max-age=0');
header('Pragma: public');
header('Expires: Sat, 26 Jul 1997 05:00:00 GMT');
header('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT');
echo $content;



?>