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
	$query = "SELECT ra_nonsove,ratio_area, b08301e1 as e1, b08301e3 as e3, ra_publict, ra_walk, ra_bike, pt_nonsove, pt_publict, pt_walk, pt_bike,ST_AsText(SHAPE) as shape FROM pm_1_2 WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 4294967294), shape );";
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
	$query = "SELECT OGR_FID,crash_year,type,killed,classA,classB,classC,classO,non_injuri,unknown_in,statefp, astext(SHAPE) as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 4), p.SHAPE );";

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
else if($active_pm == "pm22_allpoints_final"){
    $pm22_data = Array();// return this will all points
    $toReturn = []; // clear return array
    //Setup year range
    $query = "SET @year_ = (SELECT Max(crash_year) FROM $active_pm );";
    $result = mysqli_query($conn, $query); // do the query, store in result
    $query = "SET @year_ = @year_ - 4;";
    $result = mysqli_query($conn, $query); // do the query, store in result
    // Given the year range, fetch the data
    $query = "SELECT ST_AsText(SHAPE), 
	crash_year, 
	fatalities,
	susp_serious_inj, 
	non_inc_inj,
	possible_inj,
	unknown_inj,
	total,
	crash_type,
	state_name
	FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 4), p.SHAPE );";
    $result = mysqli_query($conn, $query); 
    while($temporal = mysqli_fetch_assoc($result)){ 
        array_push($shape, $temporal);
    }
    $toReturn['shape_arr'] = $shape; 					// store it in an index on our array, by name == more significant
    header('Content-Type: application/json'); 			//specifies how the data will return 
    echo json_encode($toReturn); 						//encodes our array to json, which lets us manipulate in front-end
    $conn->close();
    exit();

}
else if($active_pm =="pm24"){ 
	$query = "SELECT leng_cal,miles,tti,trktti, ST_AsText(SHAPE)  as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 4), p.SHAPE );"; 
}
else if($active_pm =="pm25"){ 
	$query = "SELECT type,state_code,year_recor,iri, miles, ST_AsText(SHAPE)  as shape FROM $active_pm as p WHERE  ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 4), p.SHAPE );"; 
}

else if($active_pm =="pm26_new"){
	$query = "SELECT mode,deck_cond_,superstruc,substruc_c,region,ST_AsText(SHAPE) as shape FROM $active_pm as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 7), p.SHAPE );";
		/**
	 *Run selected query
	 */
	$result = mysqli_query($conn, $query); 
	if(!$result){
		$query = "SELECT mode,deck_cond_,superstruc,substruc_c,region,ST_AsText(SHAPE) as shape FROM $active_pm as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 7), p.SHAPE );";
		$result = mysqli_query($conn, $query); 
		if($result != true){
			$query = "SELECT mode,deck_cond_,superstruc,substruc_c,region,ST_AsText(SHAPE) as shape FROM $active_pm as p WHERE ST_INTERSECTS( st_geomfromtext( st_astext(@poly), 7), p.SHAPE );";
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

