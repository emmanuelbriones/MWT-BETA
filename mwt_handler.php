<?php

ini_set('memory_limit', '-1');
ini_set('max_execution_time', 30000); //300 seconds = 5 minutes
//conection to utep database
require_once("./conn_mwt.php"); //file needed to make connection to DB, "$conn" variable originates from there

$key = $_GET['key']; // key sent from front-end, from the object defined at the ajax call

//global array that will return requested data
$toReturn = array();
$tables = array(); 															// used to store where the pm will be found ("found_in_table")
$query = "select * from pms where pms_key = '$key';"; // return all the information for ONE pm, because $key is unique
$result = mysqli_query($conn, $query); 				// do the query, store in result
$temporal = 0;
while($temporal = mysqli_fetch_assoc($result)){ // loops through $result array, stores into $temporal
	array_push($tables, $temporal); 						// pushes $temporal to our desired array
}
$pm_table = $tables[0]['found_in_table']; 			// table name where we will find the data for our particular pm
$corridor_key = explode("_", $key); 				// extract the corridor key into an array
$corridor_key = $corridor_key[0]; 					// following our DB and naming conventions, the $corridor_key will be found at the 0 index
$shape = array();												// for the data that will be returned, shape and value

// ! some repetition needs to be addressed 

if($key == "all_pm1" || $key == "all_pm2"){ 
	$query = "select astext(SHAPE) as shape, ra_nonsove,ratio_area, b08301e1 as e1, b08301e3 as e3, publict_e, walk_e, bike_e, pt_nonsove, publict_m, walk_m, bike_m from pm_1_2_2021;";
}else if($key == "all_pmbridge"){ 
	$query = "select astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm26"){ 
	$query = "select mode,deck_cond_,superstruc,substruc_c,region,astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm3"){
	$query = "select TotalRid_7 , TotalRid_1 , astext(SHAPE) as shape from $pm_table where corridor_key = '$key'"; // temporal note: find an elegant way to generalize this
}else if($key == "all_pm4"){
	$query = "select type,tactcnt, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm5"){ // Pm5 and PM9 share table both have all_pm9
	$query = "select prcnt_prim,type,ratio_prim, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm5K"){ // Pm5 and PM9 share table both have all_pm9
	$query = "select primjobsc0 from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm6"){ 
	$query = "select type,ratio_prim, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm5_6"){ 
	$query = "select primjobsc0 from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm7B"){
	$query = "select type, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";// ! repetition
}else if($key == "all_pm7S"){
	$query = "select status, stopname,astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";// ! repetition
}else if($key == "all_pm7K"){
	$query = "select display,type,existing,planned,astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";// ! repetition
}else if($key == "all_pm8B"){
	$query = "select type, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";// ! repetition
}else if($key == "all_pm8K"){
	$query = "select display,type,existing,planned, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";// ! repetition
}else if($key == "all_pm9"){ // Pm5 and PM9 share table both have all_pm9
	$query = "select type,ratio_pop, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm9_C"){ // Pm5 and PM9 share table both have all_pm9
	$query = "select b00001e1 from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm10"){ 
	$query = "select statefp,type,ratio_pop, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm9_10"){ 
	$query = "select b00001e1 from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm11"){
	$query = "select Sidewalk_4, Roads_LA_3, Roads_LA_6, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm12"){
	$query = "select status, bikepath, mile, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm13_14"){
	$query = "select port_of_en as title, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm18_19"){
	$query = "select OGR_FID,crash_year,type,killed,classA,classB,classC,classO,non_injuri,unknown_in,statefp, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'"; 
}else if($key == "all_pm21_h"){ //
	$query = "select pattern, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm21_lines"){
	$query = "select hotspot_ty,project_id,astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";// ! repetition
}else if($key == "all_pm21P"){ // special case pm21 has points, lines, polygons 
	$query = "select hotspot_ty,project_id, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";// ! repetition
}
else if($key == "all_pm22"){ 
	$query = "select crash_year, killed, classa, classb,classc, classo,total,crash_type,statefp, astext(SHAPE) as shape from pm22 where corridor_key = '$key'";
	/*
   //constraints:
    //1. Shape data has to be from the last 5 years stored in database
    //2. Crash data has be from the last 5 years stored in database
    //3. TX and NM data can't be merged in the same array

    $pm22_data = Array();// return this will all points
    $toReturn = []; // clear return array
    //Setup year range
    $query = "SET @year_ = (SELECT Max(crash_year) FROM pm22_allpoints_final);";
    $result = mysqli_query($conn, $query); // do the query, store in result
    $query = "SET @year_ = @year_ - 4;";
    $result = mysqli_query($conn, $query); // do the query, store in result
    // Given the year range, fetch the data
    $query = "SELECT st_astext(SHAPE) AS shape, 
	crash_year, 
	killed,
	classa, 
	classb,
	classc,
	classo,
	total,
	crash_type,
	statefp
	FROM pm22"; // WHERE crash_year >= @year_ ORDER BY crash_year ASC;";
*/
}
else if($key == "pm22_lines"){
    $toReturn = []; // clear return array
    $query = "SELECT st_astext(SHAPE) AS shape FROM pm22_cmp_lines;";

}
else if($key == "all_pm24"){ 
	$query = "select leng_cal,miles,tti,trktti,astext(SHAPE) as shape from $pm_table where corridor_key = '$key'";
}else if($key == "all_pm25"){
	$query = "select type,state_code,year_recor,iri, miles, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'"; 
}else if($key == "all_pm13"){ 
	$query = "SET @year_ = (SELECT Max(Period) FROM mpo_test_jhuerta.pm13);";
	$result = mysqli_query($conn, $query); 
	$query = "SET @year_ = @year_ - 4; ";
	$result = mysqli_query($conn, $query); 
	$query = "SELECT * FROM mpo_test_jhuerta.pm13 WHERE Period >= @year_;";

}else if($key == "all_pm14"){
	$query = "SET @year_pm14 = (SELECT Max(period) FROM mpo_test_jhuerta.pm14);";
	$result = mysqli_query($conn, $query); 
	$query = "SET @year_pm14 = @year_pm14 - 4; ";
	$result = mysqli_query($conn, $query); 
	$query = "SELECT period,
    PDN,
    PDN_Ready,
    BOTA,
    BOTA_Ready,
    BOTA_Fast,
    Ysleta,
    Ysleta_Ready,
    Ysleta_Fast,
    Santa_Teresa,
    Tornillo,
    MODE FROM mpo_test_jhuerta.pm14 WHERE Period >= @year_pm14;";
}/*else if($key == "pm13_14_points"){
	$query = "SELECT st_astext(SHAPE) as shape,port_of_en as title FROM mpo_test_jhuerta.pm14points;";
}*/
else if($key == "all_pm15_16_17"){
	$query = "select station_na, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'"; 
}else if($key == "all_pm15_16_17g"){
	$query = "select Station, year1,year2,year3,year4,year5,Pollutant from $pm_table where corridor_key = '$key'"; 
}else if($key == "all_pm20B"){
	$query = "select count_bike,count_ped,address,on_st,at_strt, astext(SHAPE) as shape from $pm_table where corridor_key = '$key'"; 
}else if($key == "all_pm20P"){
	$query = "select type,astext(SHAPE) as shape from $pm_table where corridor_key = '$key'"; 
}else if($key == "all_pm20_bus"){
	$query = "select astext(SHAPE) as shape from $pm_table where corridor_key = '$key'"; 
}
else{
	$query = "select astext(SHAPE) as shape from $pm_table where corridor_key = '$key'"; // temporal note: find an elegant way to generalize this
}

$result = mysqli_query($conn, $query); 
while($temporal = mysqli_fetch_assoc($result)){ 
	array_push($shape, $temporal);
}

$toReturn['shape_arr'] = $shape; // store it in an index on our array, by name == more significant
header('Content-Type: application/json'); //specifies how the data will return 
echo json_encode($toReturn); //encodes our array to json, which lets us manipulate in front-end
$conn->close();
?>

