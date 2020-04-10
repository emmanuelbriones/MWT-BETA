<?php
$file = fopen("html/spinner.html","r");

while(! feof($file))
  {
  echo fgets($file);
  }

fclose($file);
?>