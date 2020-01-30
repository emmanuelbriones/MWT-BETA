<?php

$path = dirname(__FILE__);
require_once "{$path}./repo_login.php";
// foir this rows we only care the order they are given not the name.
$conn = mysqli_connect($host, $usr, $pw, $db);

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

    $tables = array('data_repository');

    $table_columns = array('factored_c', 'SHAPE');
    $columns = array($table_columns);

    for ($i=0; $i < sizeof($tables) ; $i++) {
        $query = "SELECT
                  {$columns[$i][0]} AS 'factored_c'";
        $query .= ", astext({$columns[$i][1]}) AS 'shape' ";
        $query .= "FROM {$tables[$i]}";
        
        $result = $conn->query($query);

        if ($result -> num_rows > -1) {
            while ($row = $result-> fetch_assoc()) {
                array_push($data, $row);
            }
            $result-> close();
        }
    }
    return $data;
}
