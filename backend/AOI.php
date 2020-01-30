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
$AOI_SHAPE = $_GET['AOI'];
$active_pm = $_GET['PM_SOURCE'];

/**
*Initialize special MySQL variable
*/ 
$query = "SET @poly =  ST_GeomFromGeoJSON('$AOI_SHAPE');";
$result = mysqli_query($conn, $query); 

/**
 * Select query to be run in database
 */
if($active_pm == "pm_1_2"){
	$query = "SELECT  ra_nonsove,ratio_area, b08301e1 as e1, b08301e3 as e3, ra_publict, ra_walk, ra_bike, pt_nonsove, pt_publict, pt_walk, pt_bike,ST_AsText(SHAPE) as shape FROM $active_pm  WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 5), shape );";
}

else if($active_pm == "pm22txpoints" || $active_pm == "pm22nmpoints"){
	$query = "SELECT ST_AsText(SHAPE) as shape FROM (SELECT SHAPE FROM pm22txpoints UNION SELECT SHAPE FROM pm22nmpoints ) as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 4), p.SHAPE );";
}
else if($active_pm =="pm14points"){ 
	$query = "SELECT port_of_en,ST_AsText(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 6), p.SHAPE );";
}
else if($active_pm =="pm15_16_17p"){ 
	$query = "SELECT station_na,ST_AsText(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 6), p.SHAPE );";

}
else if($active_pm =="pm18_19"){ 
	$query = "SELECT OGR_FID,crash_year,type,killed,classA,classB,classC,classO,non_injuri,unknown_in,location, astext(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 4), p.SHAPE );";

}
else if($active_pm =="pm20_buffer"){ 
	$query = "SELECT  count_bike,count_ped,address,on_st,at_strt,ST_AsText(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 4), p.SHAPE );"; 
}
else if($active_pm =="pm20_crashes"){ 
	$query = "SELECT type,ST_AsText(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 4), p.SHAPE );"; 
}
else if($active_pm =="pm20_stationsbus"){ 
	$query = "SELECT ST_AsText(SHAPE)  FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 4), p.SHAPE );"; 
}
else if($active_pm == "pm22"){
	
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
    FROM mpo_test_jhuerta.pm22txpoints WHERE crash_year >= @year_ AND  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 4), shape) ORDER BY crash_year ASC;";
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
    FROM mpo_test_jhuerta.pm22nmpoints WHERE crash_year >= @year_ AND   ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 4), shape) ORDER BY crash_year ASC;";
    $result = mysqli_query($conn, $query); // do the query, store in result
    while($row = mysqli_fetch_assoc($result)){
        array_push($toReturn,$row);
    }
    $pm22_data['NM_DATA'] = $toReturn;

    // get CMP lines & append to array
	$toReturn = [];

    $query = "SELECT astext(SHAPE) AS shape FROM pm22_cmp_2019 WHERE   ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 4), shape) ;";
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
else if($active_pm =="pm24"){ 
	$query = "SELECT leng_cal,miles,tti,trktti, ST_AsText(SHAPE)  as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 4), p.SHAPE );"; 
}
else if($active_pm =="pm25"){ 
	$query = "SELECT state_code,year_recor,iri, miles, ST_AsText(SHAPE)  as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 4), p.SHAPE );"; 
}

else if($active_pm =="pm26"){ 
	
	$query = "SELECT mode,deck_cond_,superstruc,substruc_c,region,ST_AsText(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 4), p.SHAPE );";
		/**
	 *Run selected query
	 */
	$result = mysqli_query($conn, $query); 
	if(!$result){
		$query = "SELECT mode,deck_cond_,superstruc,substruc_c,region,ST_AsText(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 9), p.SHAPE );";
		$result = mysqli_query($conn, $query); 
		if($result != true){
			$query = "SELECT mode,deck_cond_,superstruc,substruc_c,region,ST_AsText(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 4), p.SHAPE );";
		}
	}

}
else if($active_pm =="pm4"){ 
	$query = "SELECT type,tactcnt, astext(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly),7), p.SHAPE );";
}
else if($active_pm =="pm3"){ 
	$query = "SELECT  TotalRid_7 , TotalRid_1 , astext(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly),4), p.SHAPE );";
}
else if($active_pm == "pm11"){
	$query = "SELECT Sidewalk_4, Roads_LA_3, Roads_LA_6, astext(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly),4), p.SHAPE );"; 
}

else if($active_pm == "pm12"){
	$query = "SELECT  status, bikepath, mile, astext(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly),4), p.SHAPE );"; 
	
}
else{
	$query = "SELECT ST_AsText(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 6), p.SHAPE );";
}


		/**
	 *Run selected query
	 */
	$result = mysqli_query($conn, $query); 

/**
 *Save results into indexed Array
 */
while($temporal = mysqli_fetch_assoc($result)){ 
	array_push($shape, $temporal);
}




/**
 *Respond request to Front-end with JSON
 */
$toReturn['shape_arr'] = $shape; 					// store it in an index on our array, by name == more significant
header('Content-Type: application/json'); 			//specifies how the data will return 
echo json_encode($toReturn); 						//encodes our array to json, which lets us manipulate in front-end
$conn->close();
?>

