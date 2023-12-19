<?php

ini_set('memory_limit', '-1');
ini_set('max_execution_time', 30000); //300 seconds = 5 minutes
//conection to utep database
require_once("./conn_mwt.php"); //file needed to make connection to DB, "$conn" variable originates from there

$key = $_GET['key']; // key sent from front-end, from the object defined at the ajax call

//global array that will return requested data
$toReturn = array();
$temporal = 0;
$shape = array(); 

if($key == "all_pm1" || $key == "all_pm2"){ 
	$query = "select St_astext(SHAPE) as shape, pt_nonsove, pt_publict, pt_walk, pt_bike from pm_1_2;";
}else if($key == "pm_1_2_table"){ 
	$query = "SELECT * FROM pm_1_2_table";
}else if($key == "all_pmbridge"){ 
	$query = "select astext(SHAPE) as shape from pm26 where corridor_key = '$key'";
}else if($key == "all_pm26"){ 
	$query = "select mode,deck_cond_,superstruc,substruc_c,region, ST_astext(SHAPE) as shape, year from pm26";
}else if($key == "all_pm3"){
	$query = "select avg_riders,route_1,St_astext(SHAPE) as shape, f2015, f2016, f2017, f2018, f2019 from pm3"; // temporal note: find an elegant way to generalize this
}else if($key == "all_pm4"){
	$query = "select type,tactcnt, St_astext(SHAPE) as shape from pm4";
}else if($key == "all_pm5"){ // Pm5 and PM9 share table both have all_pm9
	$query = "select prcnt_prim,type,ratio_jobs, St_astext(SHAPE) as shape from pm5";
}else if($key == "all_pm6"){ 
	$query = "select primjobsc0,type,ratio_prim,prcnt_prim,St_astext(SHAPE) as shape from pm6_10";
}else if($key == "all_pm5_6"){ 
	$query = "select prim_jobs from totjobs";
}else if($key == "all_pm7B"){
	$query = "select status, St_astext(SHAPE) as shape from stations7_8";// ! repetition
}else if($key == "all_pm7S"){
	$query = "select status, stopname,St_astext(SHAPE) as shape from pm7_8stations";// ! repetition
}else if($key == "all_pm7K"){
	$query = "select display,type,existing,planned,St_astext(SHAPE) as shape from pm7_8stations";// ! repetition
}else if($key == "all_pm8B"){
	$query = "select type, St_astext(SHAPE) as shape from bikeways7_8";// ! repetition
}else if($key == "all_pm8K"){
	$query = "select display,type,existing,planned, St_astext(SHAPE) as shape from pm7_8bikeways";// ! repetition
}else if($key == "all_pm9"){ // Pm5 and PM9 share table both have all_pm9
	$query = "select type,ratio_pop, St_astext(SHAPE) as shape from pm9";
}else if($key == "all_pm10"){ 
	$query = "select statefp,type,ratio_pop, b00001e1, St_astext(SHAPE) as shape from pm6_10";
}else if($key == "all_pm9_10"){ 
	$query = "select b01001e1 from mpo_pop_data";
}else if($key == "all_pm11"){
	$query = "select Sidewalk_4, Roads_LA_3, Roads_LA_6, St_astext(SHAPE) as shape from pm11";
}else if($key == "all_pm12"){
	$query = "select status, bikepath, mile, St_astext(SHAPE) as shape from pm12";
}else if($key == "all_pm13_14"){
	$query = "select port_of_en as title, St_astext(SHAPE) as shape from pm13_14";
}else if($key == "all_pm18_19"){
	$query = "select OGR_FID,crash_year,type,killed,classA,classB,classC,classO,state, lat, lng from pm18_19 WHERE crash_year BETWEEN 2018 AND 2022"; 
}else if($key == "all_pm21_h"){ //
	$query = "select pattern, St_astext(SHAPE) as shape from pm21_hotspot";
}else if($key == "all_pm21_lines"){
	$query = "select hotspot_ty,project_id, St_astext(SHAPE) as shape from pm21_lines";// ! repetition
}else if($key == "all_pm21P"){ // special case pm21 has points, lines, polygons 
	$query = "select hotspot_ty,project_id, proj_name, St_astext(SHAPE) as shape from pm21_points";// ! repetition
}
else if($key == "all_pm22"){ 
	$query = "select crash_year, killed, classa, classb,classc, classo,total,statefp, lat, lng from pm22 WHERE crash_year BETWEEN 2018 AND 2022";
	/*
   //constraints:
    //1. Shape data has to be from the last 5 years stored in database
    //2. Crash data has be from the last 5 years stored in database
    //3. TX and NM data can't be merged in the same array
*/
}
else if($key == "pm22_lines"){
    $toReturn = []; // clear return array
    $query = "SELECT st_astext(SHAPE) AS shape FROM pm22_cmp_lines;";

}
else if($key == "all_pm24"){ 
	$query = "select leng_cal,miles,tti,trktti,st_astext(SHAPE) as shape from pm24";
}else if($key == "all_pm25"){
	$query = "select type,state_code,year_recor,iri, miles, PAV_RATING, st_astext(SHAPE) as shape from pm25";
}else if($key == "pm25_data"){
	$type = $_GET['type']; // type sent from front-end, from the object defined at the ajax call
	$query = "SELECT * FROM pm25_data WHERE type = '$type'";
}else if($key == "all_pm13"){ 
	$query = "SET @year_ = (SELECT Max(Period) FROM mwt.pm13);";
	$result = mysqli_query($conn, $query); 
	$query = "SET @year_ = @year_ - 4; ";
	$result = mysqli_query($conn, $query); 
	$query = "SELECT * FROM mwt.pm13 WHERE Period >= @year_;";

}else if($key == "all_pm14"){
	$query = "SET @year_pm14 = (SELECT Max(period) FROM mwt.pm14);";
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
    MODE FROM mwt.pm14 WHERE Period >= @year_pm14;";
}
else if($key == "all_pm15_16_17"){
	$query = "select station_na, st_astext(SHAPE) as shape from pm15_16_17";
}else if($key == "all_pm15_16_17g"){
	$query = "select Station,year1,year2,year3,year4,year5,Pollutant from PM15_16_17_g";
}else if($key == "all_pm20B"){
	$query = "select count_bike,count_ped,St_astext(SHAPE) as shape from pm20bufferpedbike"; 
}else if($key == "all_pm20P"){
	$query = "select type, St_astext(SHAPE) as shape, w_i_buffer from pm20crashes"; 
}else if($key == "all_pm20_bus"){
	$query = "select St_astext(SHAPE) as shape from pm20busstops"; 
}
else{
	$query = "select astext(SHAPE) as shape from $pm_table where corridor_key = '$key'"; // temporal note: find an elegant way to generalize this
}

$result = mysqli_query($conn, $query) or die (mysqli_error($conn));

while ($temporal = mysqli_fetch_assoc($result)) {
    array_push($shape, $temporal);
}

$toReturn['shape_arr'] = $shape; // store it in an index on our array, by name == more significant
header('Content-Type: application/json'); //specifies how the data will return 
echo json_encode($toReturn); //encodes our array to json, which lets us manipulate in front-end
$conn->close();
?>

