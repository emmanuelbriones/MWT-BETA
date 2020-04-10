<?php
/**
 *initial configuration
 */
ini_set('memory_limit', '-1');
ini_set('max_execution_time', 120); //120 seconds = 2 minutes
require_once("./../conn_mwt.php");
/**
*Initialize return variables and fetch request
*/ 
$toReturn = array();								//global array that will return requested data
$shape = array(); 									// for the data that will be returned, shape and value
$key = $_GET['key'];

if($key == "pm22_lines"){
    $query = "SELECT st_astext(SHAPE) AS shape FROM pm22_cmp_lines;";
}

$result = mysqli_query($conn, $query); 

while($temporal = mysqli_fetch_assoc($result)){ 
	array_push($shape, $temporal);
}

$toReturn['shape_arr'] = $shape; 					// store it in an index on our array, by name == more significant
header('Content-Type: application/json'); 			//specifies how the data will return 
echo json_encode($toReturn); 						//encodes our array to json, which lets us manipulate in front-end
$conn->close();
?>
