<?php
// linux must chmod 0777 audit 
require('../pdfjs/web/condb.php');

$hn = $_GET['hn'];
$an = $_GET['an'];
$path = "../pdfjs/images/$hn/ipd";

$zip = new \ZipArchive;
$zip_file  = "AN".$an."_".date('Ymd')."_".date('His').".zip";

if ($zip->open($zip_file, \ZipArchive::CREATE) === TRUE){
	
	$sql  = "SELECT t.file_name ,concat(c.doc_name,'.pdf') new_file from medico_scan_doc t \n".
	" LEFT JOIN medico_scan_code c ON c.code = t.doc_type \n".
    " WHERE t.hn = '$hn' AND t.department = 'ipd' \n".
    " AND t.vn_an = '$an'";

$res = mysql_query($sql);
while($row = mysql_fetch_array($res)){
	$f=$row['file_name'];
	$n=str_replace('/','_',$row['new_file']);
	$n=str_replace(',',' ',$n);
	$file_pdf = $path.'/'.$f;
	
	 // Add random.txt file to zip and rename it to newfile.txt
    $zip->addFile($file_pdf,$n);
}
    
   // All files are added, so close the zip file.
    $zip->close();
}

//log
include('get_ip.php');
$user =$_GET['user'];
$ip = getRealIpAddr();
$sql = "insert into medico_scan_log (id,host,username,file_request,date_request) values (UUID_SHORT(),'$ip','$user','$zip_file',now())";
mysql_query($sql);
mysql_close($con);

//download
header('Pragma: public'); 	// required
header('Expires: 0');		// no cache
header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
//header('Last-Modified: '.gmdate ('D, d M Y H:i:s', filemtime ($zip_file)).' GMT');
header('Cache-Control: private',false);
header('Content-Type: application/zip');
header('Content-Disposition: attachment; filename="'.basename($zip_file).'"');
header('Content-Transfer-Encoding: binary');
header('Content-Length: '.filesize($zip_file));	// provide file size
header('Connection: close');
readfile($zip_file);	
sleep(10);
unlink($zip_file);




?>