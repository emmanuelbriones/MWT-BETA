<?php

$path = dirname(__FILE__);
require_once "{$path}./mtp_login.php";

// for this rows we only care the order they are given not the name.
$conn = mysqli_connect($host, $usr, $pw, $db);
$conn->set_charset("utf8");


if ($conn-> connect_error) {
    die('Connection Failed'. $conn-> connect_error);
}
$data = get_map_shapes($conn);

#retrieve the data.
$conn-> close();
echo json_encode($data);
//print_r($data);


function get_map_shapes($conn)
{
    $data = array();

    $tables = array('mtp_projects_lines','mtp_projects_points','mtp_projects_no_map');

    $no_map_columns = array('project_id','csj','project_na','project_de');
    $line_columns = array('project_id','csj','project_na','project_de','SHAPE','line');
    $point_columns = array('project_id','csj','project_na','proj_des','SHAPE');
    $columns = array($line_columns, $point_columns, $no_map_columns);

    for ($i=0; $i < sizeof($tables) ; $i++) {
        $query = "SELECT
                  OGR_FID as 'key_id',
                  {$columns[$i][0]} AS 'mpo_id',
                  {$columns[$i][1]} AS 'csj',
                  {$columns[$i][2]} AS 'name',
                  {$columns[$i][3]} AS 'description' ";

        if ($tables[$i] !== 'mtp_projects_no_map') { // just because no map has no shape attribute
            $query .= ", astext({$columns[$i][4]}) AS 'shape' ";
            if ($tables[$i] === 'mtp_projects_lines') { // just because no map has no shape attribute
                $query .= ", {$columns[$i][5]} AS 'line_type' ";
            }
        }

        $query .= "FROM {$tables[$i]}";

        $result = $conn->query($query);

        if ($result -> num_rows >-1) {
            while ($row = $result-> fetch_assoc()) {
                array_push($data, $row);
            }
            $result-> close();
        }
    }
    return $data;
}
