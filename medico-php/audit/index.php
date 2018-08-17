<html>
<head>	
<meta charset='tis-620' />
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
require('check_ie8.php');
// config php.ini  default_charset=tis-620
$an = $_GET['an'];
$user =$_GET['user'];
$sql = "select count(his_user) as logged  from medico_scan_user_audit where  is_allow = '1' and his_user='$user' limit 1";
$res = mysql_query($sql);
$rows = mysql_fetch_array($res);
if ($rows['logged'] <> 1) {
     echo "<div style='margin:25;color:white'><h1>You are not allowed to view document by browser.</h1></div>";
    exit;
}
if(empty($an)){
	echo "ไม่พบ  AN  นี้";
	exit;
}

require('../pdfjs/web/condb.php');


$sql = "select t.hn,t.pname,t.fname,t.lname from patient t where t.hn = (select hn from an_stat  where  an ='$an')";
$res = mysql_query($sql);
$row = mysql_fetch_array($res);
$hn=$row['hn'];
if(empty($hn)){
	echo "ไม่พบ HN จาก AN นี้";
	exit;
}
echo "<h2>(HN:".$row['hn'] .") ". $row['pname'].$row['fname']." ".$row['lname']."</h2>";
?>
<br/>  เอกสาร AN : <?=$an?>  

<table border=0>
<tr>
	<th width=280>รายการ</td><th>ส่งออก</td>
</tr>

<tr>
	<td>
	
<?php
$sql = "select t.*,c.doc_name from medico_scan_doc t left join medico_scan_code c on c.code = t.doc_type where  t.vn_an = '$an'";
$res = mysql_query($sql);
?>
<ul>
<?php
while($row = mysql_fetch_array($res)){
	$file_name=$row['file_name'];	
	$doc_name = !empty($row['doc_name'])?$row['doc_name']:'เอกสารไม่มีในรหัสมาตรฐาน';
	echo "<li><a href='../pdfjs/web/viewer_user_audit.php?user=$user&file=$hn/ipd/$file_name'>".$doc_name."</a></li>";
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
mysql_close($con);
?>
</body>
</html>