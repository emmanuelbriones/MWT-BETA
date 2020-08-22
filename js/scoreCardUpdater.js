
/**
 * Score Card menu Functions
 * 
 */

function readJSON() {
  $.getJSON("documents/scoreCardValues.json", function (json) {
    console.log(json); 
    loadScoreCardValues(json);
  });
}

function loadScoreCardValues(values){
  console.log(values);
  for (x in values.Menu) {
    document.getElementById(values.Menu[x].name).innerHTML = values.Menu[x].value;
  }
}

function createJson(){

}

/**
 * Score Card menu Functions
 * 
 */