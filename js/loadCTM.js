function populateArea(tstm, area){
  if (tstm=="" || tstm=="0") {
    document.getElementById(tstm).innerHTML="";
    return;
  } 
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
      document.getElementById(area).innerHTML=xmlhttp.responseText;
    }
  }
  if(tstm === "!@#"){
    xmlhttp.open("GET","inc/seltst.php",true);
  }else{
    xmlhttp.open("GET","inc/getdscr.php?q="+tstm+"&a="+area,true);
  }
  xmlhttp.send();
}
function loadCTM(tstm, area){
  var xmlhttp;
  if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
    }
  else{// code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
  xmlhttp.onreadystatechange=function(){
    if (xmlhttp.readyState==4 && xmlhttp.status==200){
      document.getElementById(area).innerHTML=xmlhttp.responseText;
      }
  }
  xmlhttp.open("GET","inc/loading.php",true);
  xmlhttp.send();
  populateArea(tstm, area);
  // multi();
}