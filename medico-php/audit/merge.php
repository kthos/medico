<?php
// namespace audit
require('../pdfjs/web/condb.php');


include '../pdfmerger/MedicoPdfMerger.php';
$pdf = new MedicoPdfMerger;

$hn = $_GET['hn'];
$an = $_GET['an'];

$path = "../pdfjs/images/$hn/ipd";

$sql  = "SELECT t.file_name from medico_scan_doc t \n".
"WHERE t.hn = '$hn' AND t.department = 'ipd' \n".
"AND t.vn_an = '$an'";
$res = mysql_query($sql);
while($row = mysql_fetch_array($res)){
	$f=$row['file_name'];
	$file_pdf = $path.'/'.$f;
	$pdf->addPDF($file_pdf, 'all');
}


$file_download = "AN".$an."_".date('Ymd')."_".date('His');

//log
include('get_ip.php');
$user =$_GET['user'];
$ip = getRealIpAddr();
$file_download = $file_download.".pdf";
$sql = "insert into medico_scan_log (id,host,username,file_request,date_request) values (UUID_SHORT(),'$ip','$user','$file_download',now())";
mysql_query($sql);


//download
$pdf->merge('download',"$file_download");



mysql_close($con);
?>
