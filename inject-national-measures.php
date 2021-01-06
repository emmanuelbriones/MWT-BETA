<?php
$file = fopen("html/national-measures.html","r");

while(! feof($file))
  {
  echo fgets($file);
  }

fclose($file);
?>