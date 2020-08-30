
/**
 * Score Card menu Functions
 * 
 */

function readJSON() {
  $.getJSON("documents/scoreCardValues.json", function (json) {
   // console.log(json); 
    loadScoreCardValues(json);
  });
}

function loadScoreCardValues(values){
  for (x in values) {
    document.getElementById(values[x].name).innerHTML = values[x].value;
  }
}
var menu = [];
function createJson(){
  toggleSpinner('on');
  $.when(
      $.ajax(pm1Data(0, '')), 
      $.ajax(pm2Data(0, '')),
      $.ajax(pm3Data(0, '')), 
      $.ajax(pm4Data(0, '')),
      $.ajax(pm5Data(0, '')),
      $.ajax(pm6Data(0, '')),
      $.ajax(pm7Data(0, '')),
      $.ajax(pm8Data(0, '')),
      $.ajax(pm9Data(0, '')),
      $.ajax(pm10Data(0, '')),
      $.ajax(pm11Data(0, '')),
      $.ajax(pm12Data(0, '')),
      $.ajax(pm13Data(0)),
      $.ajax(pm14Data(0)),
      $.ajax(pm15Data(0)),
      $.ajax(pm16Data(0)),
      $.ajax(pm17Data(0)),
      $.ajax(pm18Data(0, '')),   
      $.ajax(pm19Data(0, '')),
      $.ajax(pm20Data(0, '')),
      $.ajax(pm21Data(0, '')),
      $.ajax(pm22Data(0, '')),
      $.ajax(pm24Data(0, 'f')),
      $.ajax(pm24Data(0, 'd')),
      $.ajax(pm25Data(0, 'd')),
      $.ajax(pm25Data(0, 't')),
      $.ajax(pm25Data(0, 'f')), 
      $.ajax(pm26Data(0, 'd')),   
      $.ajax(pm26Data(0, 't')),   
      $.ajax(pm26Data(0, 'f'))    
      )
      .done(function(){
          console.log("values read");
          console.log(menu);
         // exportToJsonFile(menu);
          toggleSpinner('off');
      })
      .fail(function(error){
          alert("Error loading data. \nCheck your internet connection or\ncontact Sonia Perez at:\nsperez@epmpo.org")
          console.log(error)
      });
}

"use strict";

function exportToJsonFile(jsonData) {
    let dataStr = JSON.stringify(jsonData);
    let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    let exportFileDefaultName = 'data.json';

    let linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

/**
 * Score Card menu Functions
 * 
 */