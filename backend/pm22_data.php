<?php
/**
 * Last Updated: 10/09/19
 * By: S.
 * Reason: To see if the AJAX call on web app loads pm22 data instead of JSON file
 */
ini_set('memory_limit', '-1');
ini_set('max_execution_time', 10000); //10 seconds
//connection to utep database
require_once("../conn_mwt.php"); //file needed to make connection to DB, "$conn" variable originates from there
$toReturn = [];

if($key == "all_pm22"){
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
    FROM mpo_test_jhuerta.pm22txpoints WHERE crash_year >= @year_;";
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
    FROM mpo_test_jhuerta.pm22nmpoints WHERE crash_year >= @year_;";
    $result = mysqli_query($conn, $query); // do the query, store in result
    while($row = mysqli_fetch_assoc($result)){
        array_push($toReturn,$row);
    }
    $pm22_data['NM_DATA'] = $toReturn;

    // get CMP lines & append to array
    $toReturn = [];
    $query = "SELECT astext(SHAPE) AS shape FROM pm22_cmp_2019;";
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


/*
                                                 ,  ,
                                               / \/ \
                                              (/ //_ \_
     .-._                                      \||  .  \
      \  '-._                            _,:__.-"/---\_ \
 ______/___  '.    .--------------------'~-'--.)__( , )\ \
`'--.___  _\  /    |             Here        ,'    \)|\ `\|
     /_.-' _\ \ _:,_          Be Dragons           " ||   (
   .'__ _.' \'-/,`-~`                                |/
       '. ___.> /=,|  Abandon hope all ye who enter  |
        / .-'/_ )  '---------------------------------'
        )'  ( /(/
             \\ "
              '=='

This horrible monstrosity takes a medicare monstrosity and mangles it
into a data structure that can easily be used to create a medicare feed.
It's bloated, confusing, and pretty awful by necessity(for the most part).

May the force be with you both,
Chris S.
*/
?>
