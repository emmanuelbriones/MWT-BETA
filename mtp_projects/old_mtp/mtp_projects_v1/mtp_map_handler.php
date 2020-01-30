<?php

$path = dirname(__FILE__);
require_once "{$path}./mtp_login.php";
// foir this rows we only care the order they are given not the name.
$conn = mysqli_connect($host,$usr,$pw,$db);

if($conn-> connect_error) die('Connection Failed'. $conn-> connect_error);
$data = get_map_shapes($conn);

#retrieve the data.
$conn-> close();
echo json_encode($data);
//print_r($data);


function get_map_shapes($conn){
  $data = array();

  $tables = array('mtp_projects_lines','mtp_projects_points');
  $line_columns = array('SHAPE','project_id','csj','project_na','project_de','to_');
  $point_columns = array('SHAPE','project_id','csj','project_na','proj_des','to_');
  $columns = array($line_columns, $point_columns);

  for ($i=0; $i < sizeof($tables) ; $i++) {
      $query = "SELECT
                  OGR_FID as 'key_id',
                  astext({$columns[$i][0]}) AS 'shape',
                  {$columns[$i][1]} AS 'mpo_id',
                  {$columns[$i][2]} AS 'csj',
                  {$columns[$i][3]} AS 'name',
                  {$columns[$i][4]} AS 'description',
                  {$columns[$i][4]} AS 'to'
                FROM
                  {$tables[$i]}";

      $result = $conn->query($query);

  /* For the data retrieval i can jsut return the whole associative
  array and append them all together. no processing necesssary on php,
  let it be done in JS*/

      if ( $result -> num_rows >-1){
        while($row = $result-> fetch_assoc()){
          array_push($data, $row);
        }
        $result-> close();
      }
}
  return $data;
}
 ?>
