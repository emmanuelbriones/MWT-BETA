<?php
$path = dirname(__FILE__);
require_once "{$path}/mtp_login.php";
$conn = mysqli_connect($host, $usr, $pw, $db);
$conn->set_charset("utf8");

if ($conn-> connect_error) {
    die('Connection Failed'. $conn-> connect_error);
}
$data = setupTable($conn);

$conn-> close();

//print_r($data);
echo $data;

function setupTable($conn)
{
    $data = "";
    //$data= array();

#TODO: ADD line types and  make splitted lines become SL_#  
    $line_columns = ['project_id', 'csj', 'project_na', 'project_mo', 'func_class',
    'cmp_strate', 'from_', 'to_', 'city_area', 'network_ye', 'project_co', 'sponsor',
    'yoe_fy','line'];

    $point_columns = ['project_id', 'csj', 'project_na', 'project_mo', 'func_class',
    'cmp_strate', 'from_', 'to_', 'city_area', 'network_ye', 'total_proj', 'sponsor',
    'yoe_fy'];

    $no_map_columns = ['project_id', 'csj', 'project_na', 'project_mo', 'func_class',
    'cmp_strate', 'from_', 'to_', 'city_area', 'network_ye', 'project_co',
    'funding_so','yoe_fy'];

    // $columns= array($line_columns,$point_columns, $no_map_columns);
    $columns= array($line_columns, $point_columns);

    // $tables = array("mtp_projects_lines","mtp_projects_points",'mtp_projects_no_map');
    $tables = array('destinolines', 'destinopoints',);

    for ($i=0 ; $i < sizeof($tables) ; $i++) {
        $query = "SELECT
                OGR_FID as 'key_id',                    #unique identifiers
                {$columns[$i][0]} AS 'project_id',
                {$columns[$i][1]} AS 'csj',
                {$columns[$i][2]} AS 'project_na',
                {$columns[$i][3]} AS 'project_mo',
                {$columns[$i][4]} AS 'func_class',
                {$columns[$i][5]} AS 'cmp_strate',
                {$columns[$i][6]} AS 'from_',
                {$columns[$i][7]} AS 'to_',
                {$columns[$i][8]} AS 'city_area',
                {$columns[$i][9]} AS 'network_ye',
                {$columns[$i][10]} AS 'project_co',
                {$columns[$i][11]} AS 'funding_so',
                {$columns[$i][12]} AS 'yoe_fy'
            ";
        
        if ($tables[$i] === 'destinolines') { // used for distinguishing the type of line for the id.
            $query .= ", {$columns[$i][12]} AS 'line_type' ";
        }
        
        $query .= "FROM {$tables[$i]}";
        $result = $conn->query($query);
        if ($result -> num_rows > -1) {
            while ($row = $result-> fetch_assoc()) {
                $data .= setTableData(setIdentifier($i, $row));
                // $data .= setTableData($row);
        //array_push($data, $row);
            }
            $result-> close();
        }
    }
    return $data;
}

function setIdentifier($table, $row)
{
    if ($table === 0) {
        $row['key_id'] = 'L_'.$row['key_id'];
        if ($row['line_type'] == "Split"){
            $row['key_id'] = 'S'. $row['key_id'];
        }
    } elseif ($table === 1) {
        $row['key_id'] = 'P_'.$row['key_id'];
    } elseif ($table === 2) {
        $row['key_id'] = 'M_'.$row['key_id'];
    }
    return $row;
}

function readMoreFormatter($value)
{
    $lim = 30;
    if (strlen($value) <= $lim) {
        return $value;
    } else {
        $head= substr($value, 0, $lim);
        $tail = substr($value, $lim, strlen($value));
        $res = "$head<span class=\"more\" style = \"display:none\">$tail</span>
    <span onclick=\"readMore(this);\" class=\"read-more\" style =\"color:blue\">...Read more</span>";
        return $res;
    }
}

function specialYearHandler($fiscalYear)
{
    if ($fiscalYear == 5307) {
        return 'Every Year';
    } elseif ($fiscalYear === 5339) {
        return 'Every Other Year';
    }
    return $fiscalYear;
}

function setTableData($row)
{
    foreach ($row as $key => $value) {
        if (empty($value && $value !== 0)) {
            $row[$key] = 'N/A';
        }
    }
    $row['yoe_fy'] = specialYearHandler($row['yoe_fy']);
    $row['project_co'] = '$'.number_format(intval($row['project_co']));

    return  mb_convert_encoding("<tr>
      <td>{$row['key_id']}</td>
      <td>{$row["project_id"]}</td>
      <td>{$row["csj"]}</td>
      <td>{$row["project_na"]}</td>
      <td>{$row["project_mo"]}</td>
      <td>{$row["func_class"]}</td>
      <td>{$row["cmp_strate"]}</td>
      <td>{$row["from_"]}</td>
      <td>{$row["to_"]}</td>
      <td>{$row["city_area"]}</td>
      <td>{$row["network_ye"]}</td>
      <td>{$row["project_co"]}</td>
      <td>{$row["funding_so"]}</td>
      <td>{$row["yoe_fy"]}</td>
  </tr>","UTF-8");
}
