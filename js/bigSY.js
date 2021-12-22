/*jshint esversion: 6*/
$(document).ready(function() { // when the document loads
  //alert("Loading Initial Data");
  //  performanceDataLoader();
});

// * GLOBALS
let map; // global variable for map
let drawingManager;

var PM_existing_shown = {
  'PM5': [],
  'PM6': [],
  'PM7': [],
  'PM8': [],
  'PM9': [],
  'PM10': []
};

var PM_existing_selected = {
  'PM5': false,
  'PM6': false,
  'PM7': false,
  'PM8': false,
  'PM9': false,
  'PM10': false
};

var PM_planned_shown = {
  'PM5': [],
  'PM6': [],
  'PM7': [],
  'PM8': [],
  'PM9': [],
  'PM10': []
};

var PM_planned_selected = {
  'PM5': false,
  'PM6': false,
  'PM7': false,
  'PM8': false,
  'PM9': false,
  'PM10': false
};
var watcherCorr = {
  'ALAMEDA': false,
  'DONIPHAN': false,
  'DYER': false,
  'HORIZON': false,
  'MESA': false,
  'MONTANA': false,
  'MONTWOOD': false,
  'YARBROUGH': false,
  'ZARAGOZA': false
};
var corridors_shown = {
  'ALAMEDA': [],
  'DONIPHAN': [],
  'DYER': [],
  'HORIZON': [],
  'MESA': [],
  'MONTANA': [],
  'MONTWOOD': [],
  'YARBROUGH': [],
  'ZARAGOZA': [],
  'EASTLAKE': [],
  'SOCORRO': [],
  'ARTCRAFT': [],
  'MCNUTT': []
};
var corridors_selected = {
  'ALAMEDA': false,
  'DONIPHAN': false,
  'DYER': false,
  'HORIZON': false,
  'MESA': false,
  'MONTANA': false,
  'MONTWOOD': false,
  'YARBROUGH': false,
  'ZARAGOZA': false,
  'EASTLAKE': false,
  'SOCORRO': false,
  'ARTCRAFT': false,
  'MCNUTT': false
};
/*This is a temporal solution to not having to redraw corridors
Aids in having corridors drawn well and include points inside corridors
Without this corridors would be redrawn again
*/
var corridors_T = {
  'ALAMEDA': false,
  'DONIPHAN': false,
  'DYER': false,
  'HORIZON': false,
  'MESA': false,
  'MONTANA': false,
  'MONTWOOD': false,
  'YARBROUGH': false,
  'ZARAGOZA': false,

  'EASTLAKE': false,
  'SOCORRO': false,
  'ARTCRAFT': false,
  'MCNUTT': false
};
//for pms 5 to 9
function turnOff_Switches() {
  console.log("turning off");
  for (var index in PM_planned_selected) {
    PM_planned_selected[index] = false;
    console.log(index + " " + PM_planned_selected[index]);
  }
  for (let index in corridors_selected) {
    corridors_selted[index] = false;
  }
}

//temp solution, this can be shorted
function turnoff_Corridors() {
  corridors_selected.ALAMEDA = false;
  corridors_selected.DONIPHAN = false;
  corridors_selected.DYER = false;
  corridors_selected.HORIZON = false;
  corridors_selected.MESA = false;
  corridors_selected.MONTANA = false;
  corridors_selected.MONTWOOD = false;
  corridors_selected.YARBROUGH = false;
  corridors_selected.ZARAGOZA = false;
  corridors_selected.EASTLAKE = false;
  corridors_selected.SOCORRO = false;
  corridors_selected.ARTCRAFT = false;
  corridors_selected.MCNUTT = false;

  corridors_T.ALAMEDA = false;
  corridors_T.DONIPHAN = false;
  corridors_T.DYER = false;
  corridors_T.HORIZON = false;
  corridors_T.MESA = false;
  corridors_T.MONTANA = false;
  corridors_T.MONTWOOD = false;
  corridors_T.YARBROUGH = false;
  corridors_T.ZARAGOZA = false;
  corridors_T.EASTLAKE = false;
  corridors_T.SOCORRO = false;
  corridors_T.ARTCRAFT = false;
  corridors_T.MCNUTT = false;

  clear_corridors("ALAMEDA");
  clear_corridors("DONIPHAN");
  clear_corridors("DYER");
  clear_corridors("HORIZON");
  clear_corridors("MESA");
  clear_corridors("MONTANA");
  clear_corridors("MONTWOOD");
  clear_corridors("YARBROUGH");
  clear_corridors("ZARAGOZA");
  clear_corridors("EASTLAKE");
  clear_corridors("SOCORRO");
  clear_corridors("ARTCRAFT");
  clear_corridors("MCNUTT");

}
//for regionqal text, aids in separating by type
function modeFinder() {
  if (currentPM == 19) {
    alert("mod finder found " + currentType);
    if (currentType == "driving") return "pm19Driving";
    if (currentType == "freight") return "pm19Freight";
    if (currentType == "walking") return "pm19Walking";
    if (currentType == "biking") return "pm19Biking";
  }
}

// * For drop down button
//  Handles Corridors on drop down button. Populates map based on what user selected.
//  Index calls this method. Sends the selected corridor i.e. 'MESA'
function turnOn_Switch(selected) {
  //variables to be send so map gets populated.
  let shapeType = "point,polygon or line";
  let tableName = "tbd"; //this is send and turn into a query
  let defaultKey = "";
  let defaultSH = "";
  let found = "";

  //clear previous data
  clearMetadata();
  markerClusterSafeDelete();
  turnoff_Corridors();

  //if regional then give it a
  if (selected == "REGIONAL") {
    found = modeFinder();
    alert(found);
  }
  //determine shapeType based on current PM and set performance
  // Table names are found on 'PMS' on Database

  //Points
  if (currentPM == 18 || currentPM == 19) {
    shapeType = "point";
    tableName = "pm18_19txdotall";
  } else if (currentPM == 26) {
    shapeType = "point";
    tableName = "pmbridge";

    //for default regional view
    defaultKey = "all_pmbridge";
    defaultSH = "pmbridge";

  } else if (currentPM == 13 || currentPM == 14) {
    shapeType = "point";
    tableName = "pm14points";
  } else if (currentPM == 21) {
    shapeType = "point";
    tableName = "pm14points";
  } else if (currentPM == 7) {
    shapeType = "point";
    tableName = "pm7_planbrst";
  } else if (currentPM == 15 || currentPM == 16 || currentPM == 17) {
    shapeType = "point";
    tableName = "pm15_16_17p";
  } else if (currentPM == 20) {

  } else if (currentPM == 22) {}
  //lines
  else if (currentPM == 3) {
    shapeType = "line";
    tableName = "pm3final";
  } else if (currentPM == 4) { //bike
    shapeType = "line";
    tableName = "pm4_bike";
  } else if (currentPM == 4.1) { //walking
    shapeType = "line";
    tableName = "pm4_walking";
  } else if (currentPM == 5) { //walking
    shapeType = "line";
    tableName = "pm5";
  } else if (currentPM == 25) {
    shapeType = "line";
    tableName = "pm25";
  } else if (currentPM == 11) {
    shapeType = "line";
    tableName = "pm11_sidewalks";
  } else if (currentPM == 12) {
    shapeType = "line";
    tableName = "pm12";
  }
  //determine what is selected then turn it on
  if (selected == "REGIONAL") { //default
    if (shapeType == "point") {

      console.log("guiding");
      pointHandler(found); //shape handlerP handles default views for points

    } else if (shapeType == "line") {
      shape_handlerL(defaultSH, defaultKey);
      buttonSwitch(defaultSH);
    }

  } else {
    if (selected == "ALAMEDA") {
      corridors_selected.ALAMEDA = true;
      corridors_T.ALAMEDA = true;
    } else if (selected == "DONIPHAN") {
      corridors_selected.DONIPHAN = true;
      corridors_T.DONIPHAN = true;
    } else if (selected == "DYER") {
      corridors_selected.DYER = true;
      corridors_T.DYER = true;
    } else if (selected == "HORIZON") {
      corridors_selected.HORIZON = true;
      corridors_T.HORIZON = true;
    } else if (selected == "MESA") {
      corridors_selected.MESA = true;
      corridors_T.MESA = true;
    } else if (selected == "MONTANA") {
      corridors_selected.MONTANA = true;
      corridors_T.MONTANA = true;
    } else if (selected == "MONTWOOD") {
      corridors_selected.MONTWOOD = true;
      corridors_T.MONTWOOD = true;
    } else if (selected == "YARBROUGH") {
      corridors_selected.YARBROUGH = true;
      corridors_T.YARBROUGH = true;
    } else if (selected == "ZARAGOZA") {
      corridors_selected.ZARAGOZA = true;
      corridors_T.ZARAGOZA = true;
    } else if (selected == "EASTLAKE") {
      corridors_selected.EASTLAKE = true;
      corridors_T.EASTLAKE = true;
    } else if (selected == "SOCORRO") {
      corridors_selected.SOCORRO = true;
      corridors_T.SOCORRO = true;
    } else if (selected == "ARTCRAFT") {
      corridors_selected.ARTCRAFT = true;
      corridors_T.ARTCRAFT = true;
    } else if (selected == "MCNUTT") {
      corridors_selected.MCNUTT = true;
      corridors_T.MCNUTT = true;
    }

    //Change Text and graph Values
    removeAllElementsBar();
    //  dynamicCorridorText(selected);


    //call these methods to populate corridor
    get_corridors_buffer(); //draws corridor buffer
    getPointsCorridors(shapeType, tableName); //populates buffer



  }

}
/* Checks status of corridors , if on then print points on that corridor*/
function getPointsCorridors(type, pm) {

  let tracker = false;
  if (corridors_T.ALAMEDA == true) {
    testCorridorHandler(type, "alameda_buffer", pm);
    tracker = true;
  }
  if (corridors_T.DONIPHAN == true) {
    tracker = true;
    testCorridorHandler(type, "doniphan_buffer", pm);
  }
  if (corridors_T.DYER == true) {
    tracker = true;
    testCorridorHandler(type, "dyer_buffer", pm);
  }
  if (corridors_T.HORIZON == true) {
    tracker = true;
    testCorridorHandler(type, "horizon_buffer", pm);
  }

  if (corridors_T.MESA == true) {
    testCorridorHandler(type, "mesa_buffer", pm);
    tracker = true;
  }
  if (corridors_T.MONTANA == true) {
    testCorridorHandler(type, "montana_buffer", pm);
    tracker = true;
  }
  if (corridors_T.MONTWOOD == true) {
    tracker = true;
    testCorridorHandler(type, "montwood_buffer", pm);
  }
  if (corridors_T.YARBROUGH == true) {
    tracker = true;
    testCorridorHandler(type, "yarbrough_buffer", pm);
  }
  if (corridors_T.ZARAGOZA == true) {
    tracker = true;
    testCorridorHandler(type, "zaragoza_buffer", pm);
  }
  if (corridors_T.SOCORRO == true) {
    tracker = true;
    testCorridorHandler(type, "socorro_buffer", pm);
  }

  if (corridors_T.MCNUTT == true) {
    tracker = true;
    testCorridorHandler(type, "mcnutt_buffer", pm);
  }

  if (corridors_T.EASTLAKE == true) {
    tracker = true;
    testCorridorHandler(type, "eastlake_buffer", pm);
  }

  if (corridors_T.ARTCRAFT == true) {
    tracker = true;
    testCorridorHandler(type, "artcraft_buffer", pm);
  }

  return tracker;
}
//existing
$("#toggle1").on('change', function() {
  if ($(this).is(':checked')) { //when TRUE
    if (currentPM == 5 || currentPM == 9) {
      PM_existing_selected.PM5 = true;
      get_exist_plan("all_pm9", "e"); // 5 & 9 share table
    } else if (currentPM == 6) {
      PM_existing_selected.PM6 = true;
      get_exist_plan("all_pm6", "e");
    } else if (currentPM == 7) {
      PM_existing_selected.PM7 = true;
      get_exist_plan("all_pm7", "e");
    } else if (currentPM == 8) {
      PM_existing_selected.PM8 = true;
      get_exist_plan("all_pm8", "e");
    } else if (currentPM == 10) {
      PM_existing_selected.PM10 = true;
      get_exist_plan("all_pm10", "e");
    }
  } else {

    if (currentPM == 5 || currentPM == 9) {
      PM_existing_selected.PM5 = false;
      clear_Exist();
    } else if (currentPM == 6) {
      PM_existing_selected.PM6 = false;
      clear_Exist();
    } else if (currentPM == 7) {
      PM_existing_selected.PM7 = false;
      clear_Exist();
    } else if (currentPM == 8) {
      PM_existing_selected.PM8 = false;
      clear_Exist();
    } else if (currentPM == 10) {
      PM_existing_selected.PM10 = false;
      clear_Exist();
    }
  }
});
//planned
$("#toggle2").on('change', function() {
  if ($(this).is(':checked')) { //when TRUE
    if (currentPM == 5 || currentPM == 9) {
      PM_planned_selected.PM5 = true;
      get_exist_plan("all_pm9", "p");
    } else if (currentPM == 6) {
      PM_planned_selected.PM6 = true;
      get_exist_plan("all_pm6", "p");
    } else if (currentPM == 7) {
      PM_planned_selected.PM7 = true;
      get_exist_plan("all_pm7", "p");
    } else if (currentPM == 8) {
      PM_planned_selected.PM8 = true;
      get_exist_plan("all_pm8", "p");
    } else if (currentPM == 10) {
      PM_planned_selected.PM10 = true;
      get_exist_plan("all_pm10", "p");
    }
  } else {
    if (currentPM == 5 || currentPM == 9) {
      PM_planned_selected.PM5 = false;
      clear_Planned();
    } else if (currentPM == 6) {
      PM_planned_selected.PM6 = false;
      clear_Planned();
    } else if (currentPM == 7) {
      PM_planned_selected.PM7 = false;
      clear_Planned();
    } else if (currentPM == 8) {
      PM_planned_selected.PM8 = false;
      clear_Planned();
    } else if (currentPM == 10) {
      PM_planned_selected.PM10 = false;
      clear_Planned();
    }
  }
});

$("#alameda_toggle").on('change', function() {

  if ($(this).is(':checked')) { //when TRUE
    corridors_selected.ALAMEDA = true;
    corridors_T.ALAMEDA = true;
    get_corridors_buffer();
  } else {
    corridors_selected.ALAMEDA = false;
    corridors_T.ALAMEDA = false;
    clear_corridors("ALAMEDA");
  }
});
$("#doniphan_toggle").on('change', function() {
  if ($(this).is(':checked')) { //when TRUE
    corridors_selected.DONIPHAN = true;
    corridors_T.DONIPHAN = true;
    get_corridors_buffer();
  } else {
    corridors_selected.DONIPHAN = false;
    corridors_T.DONIPHAN = false;
    clear_corridors("DONIPHAN");
  }
});
$("#dyer_toggle").on('change', function() {
  if ($(this).is(':checked')) { //when TRUE
    corridors_selected.DYER = true;
    corridors_T.DYER = true;
    get_corridors_buffer();
  } else {
    corridors_selected.DYER = false;
    corridors_T.DYER = false;
    clear_corridors("DYER");
  }
});
$("#horizon_toggle").on('change', function() {
  if ($(this).is(':checked')) { //when TRUE
    corridors_selected.HORIZON = true;
    corridors_T.HORIZON = true;
    get_corridors_buffer();
  } else {
    corridors_T.HORIZON = false;
    clear_corridors("HORIZON");
  }
});
$("#mesa_toggle").on('change', function() {
  if ($(this).is(':checked')) { //when TRUE
    corridors_selected.MESA = true;
    corridors_T.MESA = true;
    get_corridors_buffer();
  } else {
    corridors_selected.MESA = false;
    corridors_T.MESA = false;
    clear_corridors("MESA");
  }
});
$("#montana_toggle").on('change', function() {
  if ($(this).is(':checked')) { //when TRUE
    corridors_selected.MONTANA = true;
    corridors_T.MONTANA = true;
    get_corridors_buffer();
  } else {
    corridors_selected.MONTANA = false;
    corridors_T.MONTANA = false;
    clear_corridors("MONTANA");
  }
});
$("#montwood_toggle").on('change', function() {
  if ($(this).is(':checked')) { //when TRUE
    corridors_selected.MONTWOOD = true;
    corridors_T.MONTWOOD = true;
    get_corridors_buffer();
  } else {
    corridors_selected.MONTWOOD = false;
    corridors_T.MONTWOOD = false;
    clear_corridors("MONTWOOD");
  }
});
$("#yarbrough_toggle").on('change', function() {
  if ($(this).is(':checked')) { //when TRUE
    corridors_selected.YARBROUGH = true;
    corridors_T.YARBROUGH = true;
    get_corridors_buffer();
  } else {
    corridors_selected.YARBROUGH = false;
    corridors_T.YARBROUGH = false;
    clear_corridors("YARBROUGH");
  }
});
$("#zaragoza_toggle").on('change', function() {
  if ($(this).is(':checked')) { //when TRUE
    corridors_selected.ZARAGOZA = true;
    corridors_T.ZARAGOZA = true;
    get_corridors_buffer();
  } else {
    corridors_selected.ZARAGOZA = false;
    corridors_T.ZARAGOZA = false;
    clear_corridors("ZARAGOZA");
  }
});
$("#eastlake_toggle").on('change', function() {
  if ($(this).is(':checked')) { //when TRUE
    corridors_selected.EASTLAKE = true;
    //alert("eastlak3e on");
    corridors_T.EASTLAKE = true;
    get_corridors_buffer();
  } else {
    corridors_selected.EASTLAKE = false;
    corridors_T.EASTLAKE = false;
    clear_corridors("EASTLAKE");
  }
});
$("#socorro_toggle").on('change', function() {
  if ($(this).is(':checked')) { //when TRUE
    corridors_selected.SOCORRO = true;
    corridors_T.SOCORRO = true;
    get_corridors_buffer();
  } else {
    corridors_selected.SOCORRO = false;
    corridors_T.SOCORRO = false;
    clear_corridors("SOCORRO");
  }
});
$("#artcraft_Domenici_toggle").on('change', function() {
  if ($(this).is(':checked')) { //when TRUE
    corridors_selected.ARTCRAFT = true;
    corridors_T.ARTCRAFT = true;
    get_corridors_buffer();
  } else {
    corridors_selected.ARTCRAFT = false;
    corridors_T.ARTCRAFT = false;
    clear_corridors("ARTCRAFT");
  }
});
$("#mcNutt_toggle").on('change', function() {
  if ($(this).is(':checked')) { //when TRUE
    corridors_selected.MCNUTT = true;
    corridors_T.MCNUTT = true;
    get_corridors_buffer();
  } else {
    corridors_selected.MCNUTT = false;
    corridors_T.MCNUTT = false;
    clear_corridors("MCNUTT");
  }
});

//Clears for Toggle
function clear_Exist() {
  for (var index in polyToErase.exist) {
    polyToErase.exist[index].setMap(null);
  }
}

function clear_Planned() {
  for (var index in polyToErase.plan) {
    polyToErase.plan[index].setMap(null);
  }
}

function clear_corridors(_key) {
  let array_we_want = corridors_shown[_key];
  for (var index in array_we_want) {
    array_we_want[index].setMap(null);
  }
}

function clear_corridorsPoints(_key) {
  let array_we_want = corridors_shown[_key];
  for (var index in array_we_want) {
    array_we_want[index].setMap(null);
  }
}

//Handles 2 toggles of Exist/Plan for Polygons.
function get_exist_plan(key, condition) {
  let example = {
    key: key
  };
  $.get('mwt_handler.php', example, function(data) {
    for (let index in data.shape_arr) {
      let temp = wktFormatter(data.shape_arr[index]['shape']);
      let to_visualize = [];
      let pm5_9status = data.shape_arr[index].status;
      let title = "";

      //filter values on polygons
      if (currentPM == 9) {
        let ratioPop = parseFloat(data.shape_arr[index].ratio_pop);
        title = ratioPop;
      } else if (currentPM == 5) { // PM5
        let prctprim = parseFloat(data.shape_arr[index].prcnt_prim);
        title = prctprim;
      }
      let color = "#039BE5";

      // if the status of a shape exists, push to visualize
      for (let i = 0; i < temp.length; i++) {
        if (pm5_9status == "exist" && condition == "e") {
          color = "#039BE5"; //blue
          to_visualize.push(temp[i]);
          polyToErase.exist.push();
        } else if (pm5_9status == "planned" && condition == "p") {
          color = "#9E9E9E"; //gray
          to_visualize.push(temp[i]);
          polyToErase.plan.push();
        }

      }
      let polygon = new google.maps.Polygon({
        description: "",
        description_value: '',
        paths: to_visualize,
        strokeColor: 'black',
        strokeOpacity: 0.60,
        strokeWeight: 0.70,
        fillColor: color,
        fillOpacity: 0.60,
        zIndex: -1,
        title: title.toFixed(1) + "%",
      });
      if (condition == "e") polyToErase.exist.push(polygon);
      if (condition == "p") polyToErase.plan.push(polygon);
      // Hover Effect for Google API Polygons
      google.maps.event.addListener(polygon, 'mouseover', function(event) {
        injectTooltip(event, polygon.title);
      });
      google.maps.event.addListener(polygon, 'mousemove', function(event) {
        moveTooltip(event);
      });
      google.maps.event.addListener(polygon, 'mouseout', function(event) {
        deleteTooltip(event);
      });

      polygon.setMap(map);
      polygons.push(polygon);
    }
  });
}
//lines
function get_corridors() {
  //console.table(corridors_selected);
  fetch('./corridors_buffers.json').then(function(response) {
    return response.json();
  }).then(function(myJson) {
    for (var _key in corridors_selected) {
      //console.log(_key);
      if (corridors_selected[_key]) {
        let active_corr = myJson[_key];
        corridors_selected[_key] = false; // set to false again to not re-paint over the same active line
        for (index in active_corr) {
          //console.log(active_corr); // iterates through every index in the returned element
          let shp = active_corr[index]['shape']; // shape is LINESTRING or MULTILINESTRING
          let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
          let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
          let to_visualize = []; // used to populate the map (latitude & longitude)
          let coord; // will be an object to push coordinates to populate the map
          let ln = r.getCoordinates(); // parses the shape into lat & lng
          for (let i = 0; i < ln.length; i++) {
            coord = {
              lat: ln[i]['y'],
              lng: ln[i]['x']
            };
            to_visualize.push(coord);
          }
          let line = new google.maps.Polyline({ // it is a POLYLINE
            path: to_visualize, // polyline has a path, defined by lat & lng
            // value: data.corridor_data[index]['value'], // iri (attribute for the pavement condition score)
            strokeColor: 'teal',
            strokeOpacity: 0.70,
            strokeWeight: 5,
            zIndex: 99 // on top of every other shape
          });
          line.setMap(map);
          corridors_shown[_key].push(line);
        }
      }
    }
  });
}

//polygons
function get_corridors_buffer() {
  //console.table(corridors_selected);
  fetch('./corridors_buffers.json').then(function(response) {
    return response.json();
  }).then(function(myJson) {
    for (var _key in corridors_selected) {
      //console.log(_key);
      if (corridors_selected[_key]) {
        let active_corr = myJson[_key];
        corridors_selected[_key] = false; // set to false again to not re-paint over the same active line // find a way to fix
        for (let index in active_corr) {
          //console.log(active_corr); // iterates through every index in the returned element
          let shp = active_corr[index]['shape']; // shape is LINESTRING or MULTILINESTRING
          let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
          let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
          let to_visualize = []; // used to populate the map (latitude & longitude)
          let coord; // will be an object to push coordinates to populate the map
          let ln = r.getCoordinates(); // parses the shape into lat & lng
          for (let i = 0; i < ln.length; i++) {
            coord = {
              lat: ln[i]['y'],
              lng: ln[i]['x']
            };
            to_visualize.push(coord);
          }
          let polygon = new google.maps.Polygon({
            description: "",
            description_value: '',
            paths: to_visualize,
            strokeColor: 'teal',
            strokeOpacity: 0.80,
            strokeWeight: 2.0,
            fillColor: "teal",
            fillOpacity: 0.60,
            zIndex: 99,
            title: "1 mile buffer",
          });

          polygon.setMap(map);
          corridors_shown[_key].push(polygon);
        }
      }
    }
  });
}
let corridorPointsT = [];

//returns shapes that intercept the corridor selected
function testCorridorHandler(type, Corridors_selected, Active_pm) {
  let key = currentPM;

  //prepare example that will be send to the PHP handler
  let example = {
    key: key,
    corridors_selected: Corridors_selected,
    active_pm: Active_pm
  };

  console.log("Preparing info for corridor");
  console.log(example);
  removeAllElementsBar();
  displaySpinner();
  console.log("adding spinner");
  // Once info is preapred, see who to call based on shape and performance
  if (type == "point") {
    if (currentPM == 18) {
      pm18T("t", example);
    } else if (currentPM == 19) {
      console.log("sending stuff to corridor 19 Update");
      pm19Data(2, example);
    }
  } else if (type == "line") {
    if (currentPM == 25) {
      corrShape_handlerL("pm25", example);
    } else if (currentPM == 11) {
      corrShape_handlerL("pm11", example);
    } else if (currentPM == 12) {
      corrShape_handlerL("pm12", example);
    } else if (currentPM == 3) {
      corrShape_handlerL("pm3", example);
    } else if (currentPM == 4) {
      corrShape_handlerL("pm4Biking", example);
    } else if (currentPM == 4.1) {
      corrShape_handlerL("pm4W", example);
    } else if (currentPM == 5) {
      corrShape_handlerL("pm4W", example);
    }
  }

}

var universal = 0; // aids in managing tables on sideBar -B
//Aids in keeping track of Clusters, and destroying
var markerCluster;
var cluster_points;
// lists for the clear bttn functionality -C
var polylines = [];
var points = [];
var polygons = [];
//var components = []; // for complex strucures of map objects.

// used in hover effect for polygons -C
var coordPropName = null;
var tipObj = null;
var offset = {
  x: 20,
  y: 20
};
//used to keep track of toggle.
var currentPM = 0;
var currentType = "driving||freight||transit||walking||biking";
var spinner = 0;

// var currentCorr  = ""; // current corridor tracker
var toggleOn = false;
var polyToErase = { // keeps track what polygons to erase
  exist: [],
  plan: []
};

// keeps count of the number in each mode of transportation. Used for bar chart in workers commute. -C
var count_list = [];
count_list[0] = 0;
count_list[1] = 0;
count_list[2] = 0;
var no_data_num = 0;
var low_num = 0;
var high_num = 0;

// link for bridge condition
var txt = "https://gis-txdot.opendata.arcgis.com/datasets/83af0d2957ca4c2eb340e4bd04a1046f_0/data?geometry=-134.852%2C24.539%2C-65.287%2C37.659";

type = "text/javascript"

// Loads graph Data, fetches go here
function performanceDataLoader() {
  console.log("loading");
  pm1Data();
  pm2Data();
  pm3Data();
  pm4DataW();
  pm4Data();
  pm5Data();
  pm11Data();
  pm12Data();
  pm13Data();
  pm13Data();
  pm13_14Data();

  pm15Data();
  pm18T("regional", "a"); // we want to load regional "all"
  pm19Data(0, "");
  pm20Data();
  pm20DataT();
  pm22Data();
  pm25Data();
  pm26Data();
  toggleHide();
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), { // callback
    zoom: 11,
    center: new google.maps.LatLng(31.837465, -106.2851078)

  }); // * End Map

  // ! do not remove -> for AOI
  // TODO: Get shapes from UI and send to DB to extract intersection

  let drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: ['circle', 'polygon', 'polyline', 'rectangle'] //['marker', 'circle', 'polygon', 'polyline', 'rectangle']
    },
    //markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
    circleOptions: {
      fillColor: '#ffff00',
      fillOpacity: 1,
      strokeWeight: 5,
      clickable: false,
      editable: true,
      zIndex: 1
    },
    rectangleOptions: {
      draggable: true,
      clickable: true,
      editable: true,
      zIndex: 10
    },
    polylineOptions: {
      clickable: true,
      draggable: true,
      editable: false,
      geodesic: true,
      zIndex: 10,
      strokeWeight: 6
    },
    polygonOptions: {
      clickable: true,
      draggable: true,
      editable: false,
      geodesic: true,
      zIndex: 10
    },
  });

  drawingManager.setMap(map);

} // End Init Map

/*
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), { // callback
        zoom: 11,
        center: new google.maps.LatLng(31.837465,-106.2851078)

    });

    drawingManager = new google.maps.drawing.DrawingManager({
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
},
markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
circleOptions: {
  fillColor: '#ffff00',
  fillOpacity: 1,
  strokeWeight: 5,
  clickable: false,
  editable: true,
  zIndex: 1
},
        rectangleOptions: {
            draggable: true,
            clickable: true,
            editable: true,
            zIndex: 10
        },
        polylineOptions: {
            clickable: true,
            draggable: true,
            editable: false,
            geodesic: true,
            zIndex: 10,
            strokeWeight: 6
        },
        polygonOptions: {
            clickable: true,
            draggable: true,
            editable: false,
            geodesic: true,
            zIndex: 10
        }
    });

    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
        drawingManager.setDrawingMode(null);
        drawingManager.setOptions({
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['']
            }
        });
    }
}
*/

//     rec = e.overlay;
//     rec.type = e.type;
//    // payload.AoI = 1;
//     setSelection(rec);

//     if (rec.type == 'polyline') {
//       //  lineParser();
//     } else if (rec.type == 'polygon') {
//        // polyParser();
//     }

//     google.maps.event.addListener(rec, 'click', function() {
//         if(rec.type == 'polyline') {
//          //   lineParser();
//         } else if(rec.type == 'polygon') {
//           //  polyParser();
//         }
//         clickRec(rec);

//     });
//     google.maps.event.addListener(rec, 'bounds_changed', function() {
//        // showNewRect2(rec);
//     });

//     if (rec.type == 'polyline') {
//         google.maps.event.addListener(rec, 'dragend', function() {
//          //   lineParser();
//         });
//     } else if (rec.type == 'polygon') {
//         google.maps.event.addListener(rec, 'dragend', function() {
//             // polyParser();
//              });
//     }
// });

// // google.maps.event.addDomListener(document.getElementById('draw'), 'click', drawAnotherRectangle());
// infoWindow = new google.maps.InfoWindow();


function avg(data) {
  let sum = 0.0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i];
  }
  return sum / data.length;
}

function pdf() {
  print();
}


function cmp_lines() {
  fetch('./results.json').then(function(response) {
    return response.json();
  }).then(function(myJson) {
    console.log("CMP NETWORK LINES");
    for (var index in myJson.PM22_Lines) {
      for (var county in myJson.PM22_Lines[index]) {
        let shp = myJson.PM22_Lines[index][county]["shape"];

        let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
        let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
        let to_visualize = []; // used to populate the map (latitude & longitude)
        let coord; // will be an object to push coordinates to populate the map
        let ln = r.getCoordinates(); // parses the shape into lat & lng
        for (let i = 0; i < ln.length; i++) {
          coord = {
            lat: ln[i]['y'],
            lng: ln[i]['x']
          };
          to_visualize.push(coord);
        }
        let line = new google.maps.Polyline({ // it is a POLYLINE
          path: to_visualize, // polyline has a path, defined by lat & lng
          // value: data.corridor_data[index]['value'], // iri (attribute for the pavement condition score)
          strokeColor: 'pink',
          strokeOpacity: 0.80,
          strokeWeight: 5,
          zIndex: 99 // on top of every other shape
        });
        line.setMap(map);
        polylines.push(line);
      }

    }

    // for (var index in myJson.PM22_Lines.TX_CMP_LINES) {
    //     let shp =  myJson.PM22_Lines[index]['shape']; // shape is LINESTRING or MULTILINESTRING
    //     let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
    //     let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
    //     let to_visualize = []; // used to populate the map (latitude & longitude)
    //     let coord; // will be an object to push coordinates to populate the map
    //     let ln = r.getCoordinates(); // parses the shape into lat & lng
    //     for (let i = 0; i < ln.length; i++) {
    //         coord = {
    //             lat: ln[i]['y'],
    //             lng: ln[i]['x']
    //         };
    //         to_visualize.push(coord);
    //     }
    //     let line = new google.maps.Polyline({ // it is a POLYLINE
    //         path: to_visualize, // polyline has a path, defined by lat & lng
    //         // value: data.corridor_data[index]['value'], // iri (attribute for the pavement condition score)
    //         strokeColor: 'teal',
    //         strokeOpacity: 0.70,
    //         strokeWeight: 5,
    //         zIndex: 99 // on top of every other shape
    //     });
    //     line.setMap(map);
    //     corridors_shown[_key].push(line);


    // }
  });
}

function wktFormatter(poly) {
  let name = poly.slice(0, 7);
  let shape_s = [];
  if (name == "MULTIPO") { // Multipolygon parser
    let new_poly = poly.slice(15, -3);
    new_poly = new_poly.split(")),((");
    let len = new_poly.length;
    for (var j = 0; j < len; j++) {
      let polyCoordi = [];
      let polyTemp = new_poly[j].split(",");
      for (i = 0; i < polyTemp.length; i++) {
        let temp = polyTemp[i].split(" ");
        polyCoordi.push({
          lat: parseFloat(temp[1]),
          lng: parseFloat(temp[0])
        });
      }
      shape_s[j] = polyCoordi;
    }
  } else { // Polygon parser

    let new_poly = poly.slice(9, -2);
    new_poly = new_poly.split("),(");
    let len = new_poly.length;
    for (var j = 0; j < len; j++) {
      let polyCoordi = [];
      let polyTemp = new_poly[j].split(",");
      for (i = 0; i < polyTemp.length; i++) {
        let temp = polyTemp[i].split(" ");
        polyCoordi.push({
          lat: parseFloat(temp[1]),
          lng: parseFloat(temp[0])
        });
      }
      shape_s[j] = polyCoordi;
    }
  }
  return shape_s;
}

// function wkt_points(blob){
//     console.log("1 " + blob);
//     var point = new Wkt.Wkt();
//     point =  point.read(blob);
//     console.log("3 " + point.components );
//     point.toObject();
//     console.log("4");
//     point.toJson();
//     console.log("5");
//     return point;

// }
function wktFormatterPoint(point) {
  // let name = point.slice(0,5);
  // console.log(name);
  let shape_s = [];
  // console.log(point);
  let new_point = point.slice(6, -2);
  // console.log(new_point);
  new_point = new_point.split("),(");
  //console.log(new_point);
  let len = new_point.length;
  for (var j = 0; j < len; j++) {
    let pointCoordi = [];
    let pointTemp = new_point[j].split(",");
    for (i = 0; i < pointTemp.length; i++) {
      let temp = pointTemp[i].split(" ");
      pointCoordi.push({
        lat: parseFloat(temp[1]),
        lng: parseFloat(temp[0])
      });
    }
    shape_s[j] = pointCoordi;
  }
  return shape_s;
}

// adds a hover effect on polygons(google api has not provided functionality for it)
function injectTooltip(event, data) {
  if (!tipObj && event) {
    //create the tooltip object
    tipObj = document.createElement("div");
    tipObj.style.width = '100px';
    tipObj.style.height = '40px';
    tipObj.style.backgroundColor = "white";
    tipObj.style.borderRadius = "5px";
    tipObj.style.padding = "10px";
    tipObj.style.fontFamily = "Arial,Helvetica";
    tipObj.style.textAlign = "center";
    tipObj.innerHTML = data;

    //fix for the version issue
    eventPropNames = Object.keys(event);
    if (!coordPropName) {
      //discover the name of the prop with MouseEvent
      for (var i in eventPropNames) {
        var name = eventPropNames[i];
        if (event[name] instanceof MouseEvent) {
          coordPropName = name;
          break;
        }
      }
    }

    if (coordPropName) {
      //position it
      tipObj.style.position = "fixed";
      tipObj.style.top = event[coordPropName].clientY + window.scrollY + offset.y + "px";
      tipObj.style.left = event[coordPropName].clientX + window.scrollX + offset.x + "px";

      //add it to the body
      document.body.appendChild(tipObj);
    }
  }
}

// continues hover effect while moving within the polygon
function moveTooltip(event) {
  if (tipObj && event && coordPropName) {
    //position it
    tipObj.style.top = event[coordPropName].clientY + window.scrollY + offset.y + "px";
    tipObj.style.left = event[coordPropName].clientX + window.scrollX + offset.x + "px";
  }
}

// removes hover effect when exiting polygon
function deleteTooltip(event) {
  if (tipObj) {
    //delete the tooltip if it exists in the DOM
    document.body.removeChild(tipObj);
    tipObj = null;
  }
}

function clearMetadata() {
  for (var i = 0; i < polylines.length; i++) {
    polylines[i].setMap(null);
  }
  for (var i = 0; i < points.length; i++) {
    points[i].setMap(null);
  }
  for (var i = 0; i < polygons.length; i++) {
    polygons[i].setMap(null);
  }
  // drawingManager.setMap(null);


  for (let id in components) {
    ////console.log('cleaning ' + id);
    components[id].clean();
  }
  document.getElementById('non-pm-content').innerHTML = '';

  polylines = [];
  points = [];
  polygons = [];
  clusters = [];
  components = {};

  markerClusterSafeDelete();
}

function openLegend() {
  if (detectmob() == true) {
    console.log("Mobile");
    document.getElementById("legendHolder").style.width = "60%";
  } else {
    document.getElementById("legendHolder").style.width = "25%"; //length of legend
  }
}

function closeLegend() {
  document.getElementById("legendHolder").style.width = "0";
  //  removeAllElementsLegend();
  //   document.getElementById("legendHolder").style.display = "none";
}

/* This functions are for sidebar */
function openNav() {
  document.getElementById("mySidenav").style.overflow = "scroll";
  document.getElementById("mySidenav").className = "sidenav rounded-left mb-2 bg-light text-dark";
  $('#mySidenav').tooltip('disable');
  if (detectmob() == true) {
    document.getElementById("mySidenav").style.width = "100%";
    //  document.getElementById("mySidenav").style.height = "50%";
  } else {
    document.getElementById("mySidenav").style.width = "53%";
    document.getElementById("mySidenav").style.height = "71%";
    document.getElementById("mySidenav").style.marginTop = "8.5%";
  }
}

function closeNav() {
  // document.getElementById("mySidenav").style.width = "0%";
  document.getElementById("mySidenav").style.width = "1%";
  document.getElementById("mySidenav").style.height = "2%";
  document.getElementById("mySidenav").style.overflow = "hidden";
  document.getElementById("mySidenav").className = "sidenav rounded-left mb-2 bg-info text-dark";
  $('#mySidenav').tooltip('enable');


  //removeAllElementsBar(); // destroy everything when closing bar
}

function clean() {
  removeAllElementsBar();
  removeAllElementsLegend();
  clearMetadata();
  markerClusterSafeDelete();
  toggleSafeRemove();
  turnoff_Corridors();
  resetRadioBtn();
  console.log("calling clean");
}

function toggleSafeRemove() {
  if (toggleOn == true) {
    toggleHide();
    turnOff_Switches();
    // reseter();
  }
}
// removes any element
function removeElement(id) {
  var element = document.getElementById(id);
  element.remove();
}

// safe removal for legend elements
function removeAllElementsLegend() {
  var element = document.getElementById("temp_title");
  var element2 = document.getElementById("temp_list");
  // if element exist, delete
  if (element) {
    removeElement("temp_title");
  }
  if (element2) {
    removeElement("temp_list");
  }
  closeLegend();

}

// removes bar elements only
function removeAllElementsBar() {
  for (var x = 0; x < universal; x++) {
    removeElement(x);
  }
  universal = 0; // reset counter
  canvasSafeDelete('myChart');
  canvasSafeDelete('myChart2');
}

function imageAdder(imageDir, holderDiv) {
  // create a new div element
  var newDiv = document.createElement("div");
  newDiv.id = universal;
  universal++;
  var holder = document.getElementById(holderDiv);
  holder.appendChild(newDiv);
  // Create Image on Div
  var x = document.createElement("IMG");
  x.setAttribute("src", imageDir);
  x.setAttribute("width", "80%");
  x.setAttribute("height", "1%");
  x.className = 'col-md-12 col-sm-12 col-xs-12'; // add bootstrap
  x.id = universal;
  holder.appendChild(x);
  universal++;
}

// adds the pm title
function headerAdder(text, holderTitle) {
  var x = document.createElement("HEADER");
  var y;
  x.setAttribute("id", universal);
  document.body.appendChild(x);
  var holder = document.getElementById(holderTitle);
  if (holderTitle == "legend_title") {
    y = document.createElement("H5");
    if (detectmob() == true) {
      y = document.createElement("H7");
    }
    y.id = "temp_title"
  } else {
    y = document.createElement("H4");
    y.id = universal;
  }
  var t = document.createTextNode(text);
  y.appendChild(t);

  holder.appendChild(y);

  // styles
  holder.style.textAlign = "center";

  universal++;
}

// adds Anchor
function anchorAdder(text, link) {
  var x = document.createElement("A");
  x.setAttribute("class", "bridgeText");
  x.setAttribute("target", "#");
  x.setAttribute("style", "font-size: medium; color: blue;");
  // if one keep link as text of anchor
  if (text == 1) {
    var t = document.createTextNode(link);
  } else {
    var t = document.createTextNode(text);
  }
  x.setAttribute("href", link);
  x.appendChild(t);
  var holder = document.getElementById(universal - 1);
  holder.appendChild(x);

  //styles
  holder.style.fontSize = "medium";
}

// adds the information/subtitles(e.g summary/analysis period/data source/how it was calculated) of the pm
function paragraphAdder(text, elemtype, infotype) {
  var elem = document.createElement("P");
  var node = document.createTextNode(text);
  elem.id = universal;
  elem.appendChild(node);
  var holder = document.getElementById(infotype);
  holder.appendChild(elem);

  if (elemtype == "subtitle") {
    // styles
    holder.style.fontSize = "large"; // xx-small, x-small, small, medium, large, x-large, xx-large
    holder.style.fontWeight = 'bold';
  } else {
    // styles
    holder.style.fontSize = "medium"; // xx-small, x-small, small, medium, large, x-large, xx-large
  }

  universal++;
}

// creates canvas so graph can be loaded
function canvasMaker(id, name) {
  var holder = document.getElementById(id);
  var x = document.createElement("CANVAS");
  x.id = name;
  holder.appendChild(x);
}

function canvasSafeDelete(name) {
  var element = document.getElementById(name);
  if (element) {
    removeElement(name);
  }
}

function markerClusterSafeDelete() {
  // Unset all markers
  if (markerCluster != null && cluster_points != null) {

    for (var i = 0; i < cluster_points.length; i++) {
      cluster_points[i].setMap(null)
    }
    cluster_points = [];

    // Clears all clusters and markers from the clusterer.
    markerCluster.clearMarkers();
    console.log("cluster deleted");
  }
}

// adds 1 list element to temp_list div. Method(3/3) for legend
function listForLegend(text, color) {
  var node = document.createElement("LI");
  var x = document.createElement("SPAN");
  x.setAttribute("style", color);
  node.appendChild(x);
  var textnode = document.createTextNode(text);
  node.appendChild(textnode);
  var holder = document.getElementById("temp_list");
  holder.appendChild(node);
}

//Creates a temporal div to hold list for PM2,  so it can be deleted. Method(2/3) for legend
function createTempList() {
  var newDiv = document.createElement("div");
  newDiv.id = "temp_list";
  var holder = document.getElementById("legendList");
  holder.appendChild(newDiv);
}

// Method (1/3) for Legend
// title = string && names = string[] && colors = string[]
function legendMaker(title, names, colors) {
  createTempList();
  headerAdder(title, "legend_title");
  for (let i = 0; i < names.length; i++) {
    listForLegend(names[i], colors[i]);
  }
  openLegend();
}
//changes id name from old to new
function idChanger(old, newId) {
  var holder = document.getElementById(old);
  holder.id = newId;
  //console.log("Jquery used");
  //$('old').attr('id', 'newId');

}
// function inputCreator(holderId, id){
//     var x = document.createElement("INPUT");
//     x.setAttribute("type", "checkbox");
//     x.id = id;
//     var holder =  document.getElementById(holderId);
//     holder.insertBefore(x, holder.childNodes[0]);
// }


// //restores default name for toggle
// function toggleIdRestore(){
//     //idChanger(toggleTracker,"tobeChanged");
//    // idChanger(toggleTracker2,"tobeChanged2");
// }

function toggleHide() {
  document.getElementById("ToggleHolder").style.visibility = "hidden";
  // toggleIdRestore();
  toggleOn = false;
}

function togglevisible() {
  document.getElementById("ToggleHolder").style.visibility = "visible";
  toggleOn = true;
}

// detects if user is on mobile
function detectmob() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  /*if( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
  //    || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
  ){
  return true;
   }
  else {
      return false;
   }*/
}
// //forces toggle to close
// function reseter(){
//     document.getElementsByClassName("slider round").style.left = 0;

// }

//helper method for word fix
function upperCaseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
//helper method for word fix
function lowerCaseAllWordsExceptFirstLetters(string) {
  return string.replace(/\w\S*/g, function(word) {
    return word.charAt(0) + word.slice(1).toLowerCase();
  });
}
// returns a string with 1st letter Uppercase Only
function wordFix(string) {
  return upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(string));
}

function toggleVisibilityCorr(mode) {
  var x = document.getElementById("dropdownMenuButton");

  if (mode == "on") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


//translates buffertext to readable corridor
function translateCorridor(corridors_selected) {
  let corr = "";
  if (corridors_selected == "alameda_buffer") corr = 'ALAMEDA';
  else if (corridors_selected == "doniphan_buffer") corr = 'DONIPHAN';
  else if (corridors_selected == "dyer_buffer") corr = 'DYER';
  else if (corridors_selected == "horizon_buffer") corr = 'HORIZON';
  else if (corridors_selected == "mesa_buffer") corr = 'MESA';
  else if (corridors_selected == "montana_buffer") corr = 'MONTANA';
  else if (corridors_selected == "montwood_buffer") corr = 'MONTWOOD';
  else if (corridors_selected == "yarbrough_buffer") corr = 'YARBROUGH';
  else if (corridors_selected == "zaragoza_buffer") corr = 'ZARAGOZA';
  else if (corridors_selected == "socorro_buffer") corr = 'SOCORRO';
  else if (corridors_selected == "mcnutt_buffer") corr = 'MCNUTT';
  else if (corridors_selected == "eastlake_buffer") corr = 'EASTLAKE';
  else if (corridors_selected == "artcraft_buffer") corr = 'ARTCRAFT';
  return corr;
}

function resetRadioBtn() {
  var ele = document.getElementsByName("radio1");
  ele.checked = true;
}

// displays loading animation
function displaySpinner() {
  toggleElements("on", "spinner");
  toggleElements("off", "rad1");
  toggleElements("off", "rad2");
  toggleElements("off", "rad3");
  toggleElements("off", "dropdownMenuButton");
  document.getElementById("summary-title").className = "";
  document.getElementById("analysis-title").className = "";
  document.getElementById("data-title").className = "";
  document.getElementById("calc-title").className = "";
}
//turns off loading animation
function turnOffSpinner() {
  toggleElements("off", "spinner");
  toggleElements("on", "rad1");
  toggleElements("on", "rad2");
  toggleElements("on", "rad3");
  toggleElements("on", "dropdownMenuButton");
  document.getElementById("summary-title").className = "border-top border-dark";
  document.getElementById("analysis-title").className = "border-top border-dark";
  document.getElementById("data-title").className = "border-top border-dark";
  document.getElementById("calc-title").className = "border-top border-dark";
}
//aids in stopping possible bugs due to messing with the visibility of borders and other elements
function resetViewsBeforeSpinner() {
  turnOffSpinner();
  toggleElements("off", "dropdownMenuButton"); //this stops a bug of making button appear
}

//turns on and off any element. In order to work you must go to index and on desired element add style="display: block;"
function toggleElements(mode, element) {
  var x = document.getElementById(element);

  if (mode == "on") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}