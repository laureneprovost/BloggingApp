<?php
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

//Test API
$app->get('/hello', 'sayHello');

//APIs for Blog
$app->get('/getBlogs', '\getAllBlogs');
$app->post('/addBlogs', '\addBlogs');

//APIs for Authontication
$app->post('/registerUser', '\registerUsers');
$app->post('/loginUser', '\loginUsers');

$app->run();

function sayHello() {
	echo "Tester.. You are good to go";
}

/*Authontion related Functions*/
function loginUsers(){
	$obj = getRequestObjects();
	$sql = "SELECT * FROM registeruser WHERE email='$obj->email' AND password='$obj->password'";
	fetchAll($sql);
}

function registerUsers(){
	$obj = getRequestObjects();
	$sql = "INSERT INTO registeruser (name,email,password)
	VALUES (:name,:email,:password)";
	insertRequestObject2($sql,$obj);
}

function insertRequestObject2($sql,$obj) {
	$db = getConnection();
	$stmt = $db->prepare($sql);
	$stmt->bindParam(":name", $obj->name);
	$stmt->bindParam(":email", $obj->email);
	$stmt->bindParam(":password", $obj->password);
	$stmt->execute();
}


/*Blog Related Functions*/
function getAllBlogs(){
	fetchAll("SELECT * FROM blogs");
}

function addBlogs(){
	echo "get coffee";
}

/*Main Applicatiopn Functions*/
function getConnection() {
	$dbhost="localhost";
	$dbuser="root";	$dbpass="root";	$dbname="blogstorer";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

 function getRequestObjects(){
	$request = \Slim\Slim::getInstance()->request();
	return json_decode($request->getBody());
}

 function setResponse($object) {
	$resp = \Slim\Slim::getInstance()->response();
	$resp->headers->set('Content-Type', 'application/json');
	$resp->setBody(json_encode($object));
}

 function fetchAll($sql) {
	$db = getConnection();
	$stmt = $db->query($sql);
	$objs = $stmt->fetchAll(PDO::FETCH_OBJ);
	$db = null;
	setResponse($objs);
}
?>