<?php
include 'MedicoPdfMerger.php';
$pdf = new MedicoPdfMerger;
$pdf->addPDF('pdfsample/A.pdf', 'all');
$pdf->addPDF('pdfsample/B.pdf', 'all');
$pdf->merge('download','ssss.pdf');

//REPLACE 'file' WITH 'browser', 'download', 'string', or 'file' for output options
	//You do not need to give a file path for browser, string, or download - just the name.
