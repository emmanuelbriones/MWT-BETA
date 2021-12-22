<?php
ini_set('memory_limit', '-1');
ini_set('max_execution_time', 30000); //300 seconds = 5 minutes
//conection to utep database
require_once("./conn_mwt.php"); //file needed to make connection to DB, "$conn" variable originates from there

$key = $_GET['key'];
$corridors_selected = $_GET['corridors_selected'];//"mesa_buffer"; 
$tableName = $_GET['tableName'];	 //"pm22txpoints";// // key sent from front-end, from the object defined at the ajax call

$toReturn = array();//global array that will return requested data
$shape = array(); // for the data that will be returned, shape and value

if($key == 1) {
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); 
	$query = "SELECT ST_AsText(SHAPE),ra_nonsove,ratio_area, b08301e1 as e1, b08301e3 as e3, ra_publict, ra_walk, ra_bike, pt_nonsove, pt_publict, pt_walk, pt_bike FROM " . $tableName ." as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 4326), p.SHAPE ) and OGR_FID >0;";
	$result = mysqli_query($conn, $query); 

	while($temporal = mysqli_fetch_assoc($result)){ 
		array_push($shape, $temporal);
	}
}else if($key == 18 || $key ==19) {
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); 
	$query = "SELECT OGR_FID,crash_year,type,killed,classA,classB,classC,classO,ST_AsText(SHAPE) FROM pm18_19 as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 4326), p.SHAPE ) and OGR_FID >0;";
	$result = mysqli_query($conn, $query); 

	while($temporal = mysqli_fetch_assoc($result)){ 
		array_push($shape, $temporal);
	}
}
else if($key == 24){
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); 
	$query = "select leng_cal,miles,tti,trktti,ST_AsText(SHAPE) FROM ". $tableName ." as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 4326), p.SHAPE ) and OGR_FID >0;";
	$result = mysqli_query($conn, $query); 
	while($temporal = mysqli_fetch_assoc($result)){ 
		array_push($shape, $temporal);
	}
}
else if($key == 22){

	//constraints:
    //1. Shape data has to be from the last 5 years stored in database
    //2. Crash data has be from the last 5 years stored in database
    //3. TX and NM data can't be merged in the same array

    $pm22_data = Array();

    // get TX points & append to array
    $toReturn = []; // clear return array
    //Setup year range
    $query = "SET @year_ = (SELECT Max(crash_year) FROM mpo_test_jhuerta.pm22txpoints);";
    $result = mysqli_query($conn, $query); // do the query, store in result
    $query = "SET @year_ = @year_ - 4;";
    $result = mysqli_query($conn, $query); // do the query, store in result

	// Given the year range, fetch the data
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); // do the query, store in result
    $query = "SELECT astext(SHAPE) AS shape, 
    crash_year, 
    fatalities as fatal, 
    suspected_ as suspected_inj, 
    non_incapa as non_incap_inj,
    possible_i as possible_inj,
    non_injuri as non_inj,
    unknown_in as unknown_inj,
    total as total_fatalities_injuries,
    type_involved,
    legend
    FROM mpo_test_jhuerta.pm22txpoints WHERE crash_year >= @year_ AND ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 4), shape )  ORDER BY crash_year ASC;";
    $result = mysqli_query($conn, $query); // do the query, store in result
    while($row = mysqli_fetch_assoc($result)){
        array_push($toReturn,$row);
    }
    $pm22_data['TX_DATA'] = $toReturn;

    // get NM points & append to array
    $toReturn = [];
    //Setup year range
    $query = "SET @year_ = (SELECT Max(crash_year) FROM mpo_test_jhuerta.pm22nmpoints);";
    $result = mysqli_query($conn, $query); // do the query, store in result
    $query = "SET @year_ = @year_ - 4;";
	$result = mysqli_query($conn, $query); // do the query, store in result
	//$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
///	$result = mysqli_query($conn, $query); // do the query, store in result
    // Given the year range, fetch the data
    $query = "SELECT astext(SHAPE) AS shape, 
    crash_year, 
    killed as fatal, 
    classa as suspected_inj, 
    classb as non_incap_inj,
    classc as possible_inj,
    classo as non_inj,
    total as total_fatalities_injuries,
    type_involved,
    legend
    FROM mpo_test_jhuerta.pm22nmpoints WHERE crash_year >= @year_ AND ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 4), shape )  ORDER BY crash_year ASC;";
    $result = mysqli_query($conn, $query); // do the query, store in result
    while($row = mysqli_fetch_assoc($result)){
        array_push($toReturn,$row);
    }
    $pm22_data['NM_DATA'] = $toReturn;

    // get CMP lines & append to array
	$toReturn = [];
	//$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
//	$result = mysqli_query($conn, $query); // do the query, store in result
    $query = "SELECT astext(SHAPE) AS shape FROM pm22_cmp_2019 WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 4), shape ) ;";
    $result = mysqli_query($conn, $query); // do the query, store in result
    while($row = mysqli_fetch_assoc($result)){
        array_push($toReturn,$row);
    }
    $pm22_data['CMP_LINES'] = $toReturn;
    $toReturn = [];
    $toReturn['PM22'] = $pm22_data;
    
    header('Content-Type: application/json'); //specifies how the data will return 
    echo json_encode($toReturn); //encodes our array to json, which lets us manipulate in front-end
    mysqli_close($conn);
    exit(0);
}
else if($key == 26){ 
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); 

	$query = "select mode,deck_cond_,superstruc,substruc_c,region,ST_AsText(SHAPE), year FROM ". $tableName ." as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 4326), p.SHAPE ) and OGR_FID >0;";
	$result = mysqli_query($conn, $query); 

	while($temporal = mysqli_fetch_assoc($result)){ 
		array_push($shape, $temporal);
	}
}
else if($key == 26.1){ 
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); 

	$query = "select deck_cond_,superstruc,substruc_c,region,ST_AsText(SHAPE) FROM ". $tableName ." as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 4326), p.SHAPE ) and OGR_FID >0;";
	$result = mysqli_query($conn, $query); 

	while($temporal = mysqli_fetch_assoc($result)){ 
		array_push($shape, $temporal);
	}
}
else if($key == 3){ //lines 
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); 
	$query = "select avg_riders,route_1,St_astext(SHAPE) as shape, f2015, f2016, f2017, f2018, f2019 from pm3 as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 4326), p.SHAPE ) and OGR_FID >0;";
	$result = mysqli_query($conn, $query); 

	while($temporal = mysqli_fetch_assoc($result)){ 
		array_push($shape, $temporal);
	}
}

else if($key == 4 ){ //lines 
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); 
	$query = "SELECT type,tactcnt, ST_AsText(SHAPE) FROM " . $tableName ." as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 7), p.SHAPE ) and OGR_FID >0;";
	$result = mysqli_query($conn, $query); 

	while($temporal = mysqli_fetch_assoc($result)){ 
		array_push($shape, $temporal);
	}
}

else if($key == 25){ //lines 
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); 
	$query = "SELECT type,state_code,year_recor,iri, miles, ST_AsText(SHAPE) FROM " . $tableName ." as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 4326), p.SHAPE ) and OGR_FID >0;";
	$result = mysqli_query($conn, $query); 

	while($temporal = mysqli_fetch_assoc($result)){ 
		array_push($shape, $temporal);
	}
}
else if($key == 11){ //lines 
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); 
	$query = "SELECT Sidewalk_4, Roads_LA_3, Roads_LA_6,ST_AsText(SHAPE) FROM pm11 as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 4326), p.SHAPE ) and OGR_FID >0;";
	$result = mysqli_query($conn, $query); 

	while($temporal = mysqli_fetch_assoc($result)){ 
		array_push($shape, $temporal);
	}
}else if($key == 12){ //lines 
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); 
	$query = "SELECT status, bikepath, mile, ST_AsText(SHAPE) FROM pm12 as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 4326), p.SHAPE ) and OGR_FID >0;";
	$result = mysqli_query($conn, $query); 

	while($temporal = mysqli_fetch_assoc($result)){ 
		array_push($shape, $temporal);
	}
}else if($key == 20){ //POINTS
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); 
	$query = "SELECT type, ST_AsText(SHAPE), w_i_buffer FROM pm20crashes as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 4326), p.SHAPE ) and OGR_FID >0;";
	$result = mysqli_query($conn, $query); 

	while($temporal = mysqli_fetch_assoc($result)){ 
		array_push($shape, $temporal);
	}
}else if($key == 20.1){ //buffer
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); 
	$query = "SELECT count_bike,count_ped,ST_AsText(SHAPE) FROM pm20bufferpedbike as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 4326), p.SHAPE ) and OGR_FID >0;";
	$result = mysqli_query($conn, $query); 

	while($temporal = mysqli_fetch_assoc($result)){ 
		array_push($shape, $temporal);
	}
}else if($key == 20.2){ //bus
	$query = "SET @buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM ". $corridors_selected . " WHERE OGR_FID = 1);";
	$result = mysqli_query($conn, $query); 
	$query = "SELECT ST_AsText(SHAPE) FROM pm20busstops as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@buff), 4326), p.SHAPE ) and OGR_FID >0;";
	$result = mysqli_query($conn, $query); 

	while($temporal = mysqli_fetch_assoc($result)){ 
		array_push($shape, $temporal);
	}
}


$toReturn['shape_arr'] = $shape; // store it in an index on our array, by name == more significant

header('Content-Type: application/json'); //specifies how the data will return 
echo json_encode($toReturn); //encodes our array to json, which lets us manipulate in front-end
$conn->close();

/* For testing, paste on MYSQL and change tables to test
SET @mesa_buff = (SELECT ST_GeomFromText(ST_AsText(SHAPE)) FROM mesa_buffer WHERE OGR_FID = 1);
SELECT * FROM mpo_all.pm3final as p WHERE ST_INTERSECTS( st_geomfromtext(st_astext(@mesa_buff), 4), p.SHAPE ) and OGR_FID >0;

*/
?>

