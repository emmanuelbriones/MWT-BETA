
<?php
$file = fopen("html/imports.html","r");

while(! feof($file))
  {
  echo fgets($file);
  }

fclose($file);
?>