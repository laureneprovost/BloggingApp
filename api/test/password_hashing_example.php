<?php
function getConn(){
	$dbname = 'hash';
	$username = 'root';
	$password = 'root';
	$servername = 'localhost';
	$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $conn;
}

$passw= 'mants';
$pass = md5($passw);
echo $pass;

/*$bs64encd = base64_encode($pass);
echo base64_encode($bs64encd);
echo "<br>";
echo base64_decode('$bs64encd');*/

$db = getConn();
$sql = "select * from appu where pass='$pass'";
$stmt = $db->prepare($sql);
$stmt->execute();
$db=null;

$objs = $stmt->fetchAll(PDO::FETCH_OBJ);
print_r(json_encode($objs));

?>