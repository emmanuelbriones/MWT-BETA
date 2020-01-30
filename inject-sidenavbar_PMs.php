<?php
$file = fopen("html/sidenavbar1.html","r");

while(! feof($file))
  {
  echo fgets($file);
  }

fclose($file);
?>

