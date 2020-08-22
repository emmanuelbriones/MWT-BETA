/**
 *
 * 
 * 
 * */

$(document).ready(function () { // when the document loads
    //toggleSpinner('on');
    performanceDataLoader();
});
//alert("Loading Data... A confirmation window will pop up once all data is ready. Click OK to continue. ");

// * GLOBALS
let map; // global variable for map
let drawingManager;
let all_overlays = []; //for deletion of user drawn shapes

var universal = 0; // aids in managing tables on sideBar -B
//Aids in keeping track of Clusters, and destroying
var markerCluster;
var cluster_points;

// lists for the clear btn functionality -C
var polylines = [];
var points = [];
var polygons = [];

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

// var currentCorr  = ""; // current corridor tracker
var toggleOn = false;
var polyToErase = { // keeps track what polygons to erase for toggle
    exist: [],
    plan: []
}
var pointsToErase = {
    exist: [],
    plan: []
}

// keeps count of the number in each mode of transportation. Used for bar chart in workers commute. -C
var count_list = [];
count_list[0] = 0;
count_list[1] = 0;
count_list[2] = 0;
var no_data_num = 0;
var low_num = 0;
var high_num = 0;

// link for bridge condition
var txt = "https://www.fhwa.dot.gov/bridge/britab.cfm";

type = "text/javascript"


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
}
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


// * For drop down button
//  Handles Corridors on drop down button. Populates map based on what user selected.
//  Index calls this method. Sends the selected corridor i.e. 'MESA'
function turnOn_Switch(selected) {
  //  console.log(selected);

    //clear previous data, regional data
    clearMetadata();
    markerClusterSafeDelete();
    turnoff_Corridors();

    //determine what is selected then turn it on
    if (selected == "REGIONAL") { //default
        regionalCaller();
    } else {
        removeAllElementsBar();
        get_corridors_buffer(); //draws corridor buffer
      //  console.log("buffer called");
        if (selected == "ALAMEDA") {
            corridors_selected.ALAMEDA = true;
            corridors_T.ALAMEDA = true;
            sendCurrentCorridor("alameda_buffer");
        } else if (selected == "DONIPHAN") {
            corridors_selected.DONIPHAN = true;
            corridors_T.DONIPHAN = true;
            sendCurrentCorridor("doniphan_buffer");
        } else if (selected == "DYER") {
            corridors_selected.DYER = true;
            corridors_T.DYER = true;
            sendCurrentCorridor("dyer_buffer");
        } else if (selected == "HORIZON") {
            corridors_selected.HORIZON = true;
            corridors_T.HORIZON = true;
            sendCurrentCorridor("horizon_buffer");
        } else if (selected == "MESA") {
            corridors_selected.MESA = true;
            corridors_T.MESA = true;
            sendCurrentCorridor("mesa_buffer");
        } else if (selected == "MONTANA") {
            corridors_selected.MONTANA = true;
            corridors_T.MONTANA = true;
            sendCurrentCorridor("montana_buffer");
        } else if (selected == "MONTWOOD") {
            corridors_selected.MONTWOOD = true;
            corridors_T.MONTWOOD = true;
            sendCurrentCorridor("montwood_buffer");
        } else if (selected == "YARBROUGH") {
            corridors_selected.YARBROUGH = true;
            corridors_T.YARBROUGH = true;
            sendCurrentCorridor("yarbrough_buffer");
        } else if (selected == "ZARAGOZA") {
            corridors_selected.ZARAGOZA = true;
            corridors_T.ZARAGOZA = true;
            sendCurrentCorridor("zaragoza_buffer");
        } else if (selected == "EASTLAKE") {
            corridors_selected.EASTLAKE = true;
            corridors_T.EASTLAKE = true;
            sendCurrentCorridor("eastlake_buffer");
        } else if (selected == "SOCORRO") {
            corridors_selected.SOCORRO = true;
            corridors_T.SOCORRO = true;
            sendCurrentCorridor("socorro_buffer");
        } else if (selected == "ARTCRAFT") {
            corridors_selected.ARTCRAFT = true;
            corridors_T.ARTCRAFT = true;
            sendCurrentCorridor("artcraft_buffer");
        } else if (selected == "MCNUTT") {
            corridors_selected.MCNUTT = true;
            corridors_T.MCNUTT = true;
            sendCurrentCorridor("mcnutt_buffer");
        }

        //call these methods to populate corridor


    }
}

//mimics a click of the menu text. 
function regionalCaller() {
    if (currentPM == 1) {
        polygonHandler('PM1');
    } else if (currentPM == 2) {
        if (currentType == "transit") {
            polygonHandler("PM2T");
        } else if (currentType == "walking") {
            polygonHandler("PM2W");
        } else if (currentType == "biking") {
            polygonHandler("PM2B");
        }
    }else if (currentPM == 3) {
        lineHandler("PM3");
    } else if (currentPM == 4) {
        if (currentType == "biking") lineHandler("pm4Biking");
        if (currentType == "walking") lineHandler("pm4Walking");
    } else if (currentPM == 11) {
        lineHandler('pm11Walking');
    } else if (currentPM == 12) {
        lineHandler('pm12Biking');
    } else if (currentPM == 18) {
        if (currentType == "driving") {
            pointHandler("pm18Driving");
        } else if (currentType == "freight") {
            pointHandler("pm18Freight");
        } else if (currentType == "walking") {
            pointHandler("pm18Walking");
        } else if (currentType == "biking") {
            pointHandler("pm18Biking");
        }
    } else if (currentPM == 19) {
        if (currentType == "driving") {
            pointHandler("pm19Driving");
        } else if (currentType == "freight") {
            pointHandler("pm19Freight");
        } else if (currentType == "walking") {
            pointHandler("pm19Walking");
        } else if (currentType == "biking") {
            pointHandler("pm19Biking");
        }
    } else if (currentPM == 20) {
        if (currentType == "walking") {
            pointHandler("PM20W");
        } else if (currentType == "biking") {
            pointHandler("PM20B");
        }
    } else if (currentPM == 22) {
        pointHandler("PM22");
    }else if (currentPM == 24) {
        if (currentType == "driving") {
            lineHandler("PM24D");
        } else if (currentType == "freight") {
            lineHandler("PM24F");
        }
    } else if (currentPM == 25) {
        lineHandler("PM25");
    } else if (currentPM == 26) {
        if (currentType == "driving") {
            pointHandler("pm26");
        } else if (currentType == "freight") {
            pointHandler("pm26F");
        } else if (currentType == "transit") {
            pointHandler("pm26T");
        }
    }
   
}
// mode 2 on PMS, sends the corridor that is ON
function sendCurrentCorridor(corr) {
    removeAllElementsBar();
    toggleNav('off');
    toggleRadio('off');
    toggleSpinner('on');

    if (currentPM == 18) {
        pm18Data(2, corr);
    } else if (currentPM == 20) {
        pm20Data(2, corr);
    } else if (currentPM == 22) {
        pm22Data(2, corr);
    }else if (currentPM == 19) {
        pm19Data(2, corr);
     } else if (currentPM == 26) {
        pm26Data(2, corr);
    } else if (currentPM == 24) {
        pm24Data(2, corr);
    }else if (currentPM == 25) {
        pm25Data(2, corr);
     } else if (currentPM == 11) {
        pm11Data(2, corr);
    } else if (currentPM == 12) {
        pm12Data(2, corr);
    } else if (currentPM == 3) {
        pm3Data(2, corr);
    } else if (currentPM == 4) {
        pm4Data(2, corr);
    } else if (currentPM == 5) {
        corrShape_handlerL("pm4W", corr);
    }else if (currentPM == 1) {
        pm1Data(2, corr);
    } else if (currentPM == 2) {
        pm2Data(2, corr);
    }
    
}


$("#alameda_toggle").on('change', function () {
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
$("#doniphan_toggle").on('change', function () {
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
$("#dyer_toggle").on('change', function () {
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
$("#horizon_toggle").on('change', function () {
    if ($(this).is(':checked')) { //when TRUE
        corridors_selected.HORIZON = true;
        corridors_T.HORIZON = true;
        get_corridors_buffer();
    } else {
        corridors_T.HORIZON = false;
        clear_corridors("HORIZON");
    }
});
$("#mesa_toggle").on('change', function () {
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
$("#montana_toggle").on('change', function () {
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
$("#montwood_toggle").on('change', function () {
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
$("#yarbrough_toggle").on('change', function () {
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
$("#zaragoza_toggle").on('change', function () {
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
$("#eastlake_toggle").on('change', function () {
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
$("#socorro_toggle").on('change', function () {
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
$("#artcraft_Domenici_toggle").on('change', function () {
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
$("#mcNutt_toggle").on('change', function () {
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
    for (var index in pointsToErase.exist) {
        pointsToErase.exist[index].setMap(null);
    }
}

function clear_Planned() {
    for (var index in polyToErase.plan) {
        polyToErase.plan[index].setMap(null);
    }
    for (var index in pointsToErase.plan) {
        pointsToErase.plan[index].setMap(null);
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


//lines
function get_corridors() {
    //console.table(corridors_selected);
    fetch('./corridors_buffers.json').then(function (response) {
        return response.json();
    }).then(function (myJson) {
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
    let color = 'teal'; //default
    let fillOpacityval = 0.35; //default
    //console.table(corridors_selected);
  //  if (currentPM == 20) {
        color = "#9E9E9E"; //gray
        fillOpacityval = 0.25;
    //}
    fetch('./corridors_buffers.json').then(function (response) {
        return response.json();
    }).then(function (myJson) {
        for (var _key in corridors_selected) {
            //console.log(_key);
            if (corridors_selected[_key]) {
                let active_corr = myJson[_key];
                corridors_selected[_key] = false; // set to false again to not re-paint over the same active line // find a way to fix
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
             
                    let polygon = new google.maps.Polygon({
                        description: "",
                        description_value: '',
                        paths: to_visualize,
                        strokeColor: color,
                        strokeOpacity: 0.80,
                        strokeWeight: 2.0,
                        fillColor: color,
                        fillOpacity: fillOpacityval,
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

// Loads graph Data, fetches go here
function performanceDataLoader() {
    toggleSpinner('on');
    var values;
    $.when(
       readJSON()
       /* $.ajax(pm1Data(0, '')),
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
        */
        )
        .done(function(){
            console.log("values read");
            console.log(values);
            toggleSpinner('off');
        })
        .fail(function(error){
            alert("Error loading data. \nCheck your internet connection or\ncontact Sonia Perez at:\nsperez@epmpo.org")
            console.log(error)
        });
        
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), { // callback
        zoom: 11,
        center: new google.maps.LatLng(31.837465, -106.2851078)

    }); // * End Map

    // ! do not remove -> for AOI
    // TODO: Get shapes from UI and send to DB to extract intersection
    drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: false,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['polygon']
        },
        polygonOptions: {
            clickable: false,
            draggable: false,
            editable: false,
            geodesic: true,
            zIndex: 1,
            fillColor: '#00796b',
            fillOpacity: .2,
        },
    });
    drawingManager.setMap(map);
    // * Listeners for the user-drawn shapes
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
        deleteUserShapes();
        all_overlays.push(event);
        var poly_bounds = event.overlay.getPath();
        var coords_arr = [];

        // ! for some reason, polygons are not being stored correctly. The last/closing coordinates are missing
        // ! last and first pairs of coordinates must be the same in the case of Polygon
        // ! read https://stackoverflow.com/questions/34524031/mysql-invalid-gis-data-provided-to-function-st-geometryfromtext

        let first_coords = [];
        for (var i = 0; i < poly_bounds.length; i++) {
            var dummy = [];
            var x = poly_bounds.getAt(i).lat();
            var y = poly_bounds.getAt(i).lng();
            //! save first coordinates, then insert/push outside for loop to our main array
            if (i == 0) {
                first_coords.push(y);
                first_coords.push(x);
            }
            dummy.push(y);
            dummy.push(x);
            coords_arr.push(dummy);
        }
        // ! add first coordinates to last place -> a drawn shape is closed where it started
        coords_arr.push(first_coords);
        AOI_STRING = createGeoJSON(event.type, coords_arr);
        // console.log(AOI_STRING);


        //clearMetadata();
      //  console.log(AOI_STRING);
        AOI(AOI_STRING); // send AOI string
    });



} // End Init Map


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


// function cmp_lines() {
//     fetch('./results.json').then(function (response) {
//         return response.json();
//     }).then(function (myJson) {
//         console.log("CMP NETWORK LINES");
//         for (var index in myJson.PM22_Lines) {
//             for (var county in myJson.PM22_Lines[index]) {
//                 let shp = myJson.PM22_Lines[index][county]["shape"];

//                 let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
//                 let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
//                 let to_visualize = []; // used to populate the map (latitude & longitude)
//                 let coord; // will be an object to push coordinates to populate the map
//                 let ln = r.getCoordinates(); // parses the shape into lat & lng
//                 for (let i = 0; i < ln.length; i++) {
//                     coord = {
//                         lat: ln[i]['y'],
//                         lng: ln[i]['x']
//                     };
//                     to_visualize.push(coord);
//                 }
//                 let line = new google.maps.Polyline({ // it is a POLYLINE
//                     path: to_visualize, // polyline has a path, defined by lat & lng
//                     // value: data.corridor_data[index]['value'], // iri (attribute for the pavement condition score)
//                     strokeColor: 'pink',
//                     strokeOpacity: 0.80,
//                     strokeWeight: 5,
//                     zIndex: 99 // on top of every other shape
//                 });
//                 line.setMap(map);
//                 polylines.push(line);
//             }

//         }

//         // for (var index in myJson.PM22_Lines.TX_CMP_LINES) {
//         //     let shp =  myJson.PM22_Lines[index]['shape']; // shape is LINESTRING or MULTILINESTRING
//         //     let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
//         //     let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
//         //     let to_visualize = []; // used to populate the map (latitude & longitude)
//         //     let coord; // will be an object to push coordinates to populate the map
//         //     let ln = r.getCoordinates(); // parses the shape into lat & lng
//         //     for (let i = 0; i < ln.length; i++) {
//         //         coord = {
//         //             lat: ln[i]['y'],
//         //             lng: ln[i]['x']
//         //         };
//         //         to_visualize.push(coord);
//         //     }
//         //     let line = new google.maps.Polyline({ // it is a POLYLINE
//         //         path: to_visualize, // polyline has a path, defined by lat & lng
//         //         // value: data.corridor_data[index]['value'], // iri (attribute for the pavement condition score)
//         //         strokeColor: 'teal',
//         //         strokeOpacity: 0.70,
//         //         strokeWeight: 5,
//         //         zIndex: 99 // on top of every other shape
//         //     });
//         //     line.setMap(map);
//         //     corridors_shown[_key].push(line);


//         // }
//     });
// }

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
        tipObj.style.width = 'auto';
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
       // console.log('points off');
    }
    for (var i = 0; i < polygons.length; i++) {
        polygons[i].setMap(null);
    }
    for (let i = 0; i < components.length; i++) {
        components[i].clean();
    }

    for (let id in components) {
        ////console.log('cleaning ' + id);
        components[id].clean();
    }
    //switch_AOI();
    // active_pm_for_AOI=0;
    polylines = [];
    points = [];
    polygons = [];
    clusters = [];
    components = {};
  //  currentPM = 0;
    markerClusterSafeDelete();
}

/** Get SUM of array
 * | Input: array
 * | Output: integer || float*/
// function arrSum(list){
//   let sum= 0;
//   for(let i = 0; i < list.length; i++){
//     sum = sum + list[i];
//   }
//   return sum;
// }


/** Get AVG of array
* | Input: array
* | Output: integer || float*/
// function arrAvg(list){
//   let avg = 0;
//   let sum = arrSum(list);
//   avg = sum / list.length;
//   return avg;
// }
