<?php
$file = fopen("html/modal_PMs.html","r");

while(! feof($file))
  {
  echo fgets($file);
  }

fclose($file);
?>