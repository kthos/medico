<html>
<head>	
<meta charset='utf-8' />
<meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
<style>
	td {
	vertical-align: top;
	text-align: left;
}
</style>
</head>
<body style="background-color:#E0F2F1">
<?php

// config php.ini  default_charset=tis-620
$an = $_GET['an'];
$user =$_GET['user'];
if(empty($an)){
	echo "ไม่พบ  AN  นี้";
	exit;
}

require('../pdfjs/web/condb_pg.php');


$sql = " SELECT t.patient_hn hn,t.patient_firstname fname,t.patient_lastname lname from t_patient t
INNER JOIN t_visit v on v.visit_hn = t.patient_hn
WHERE  v.f_visit_type_id = '1' and v.visit_vn = '$an' ";

$res = pg_query($sql);
$row = pg_fetch_array($res);
$hn=$row['hn'];
if(empty($hn)){
	echo "ไม่พบ HN จาก AN นี้";
	exit;
}
echo "<h2>(HN:".$row['hn'] .") ". $row['fname']." ".$row['lname']."</h2>";
?>
<br/>  เอกสารแผนกผู้ป่วยใน  AN : <?=$an?>  

<table border=0>
<tr>
	<th width=280>รายการ</td><th>ส่งออก</td>
</tr>

<tr>
	<td>
	
<?php
$sql = "select t.*,c.doc_name from medico_scan_doc t left join medico_scan_code c on c.code = t.doc_type where  t.vn_an = '$an'";
$res = pg_query($sql);
?>
<ul>
<?php
while($row = pg_fetch_array($res)){
	$file_name=$row['file_name'];	
	$doc_name = !empty($row['doc_name'])?$row['doc_name']:'เอกสารไม่มีในรหัสมาตรฐาน';
	echo "<li><a href='../pdfjs/web/viewer_audit.php?user=$user&file=../images/$hn/ipd/$file_name'>".$doc_name."</a></li>";
}
?>

</ul>	
	
	</td>
	<td>
		<ul>
		<li><a href='merge.php?hn=<?=$hn?>&an=<?=$an?>&user=<?=$user?>' >Single Export</a></li>
		<li><a href='zip.php?hn=<?=$hn?>&an=<?=$an?>&user=<?=$user?>' >Separate Export</a></li>
		</ul>
	</td>
</tr>

</table>



<?php
pg_close($con);
?>
</body>
</html>