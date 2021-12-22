$(document).ready(function () { // when the document loads
    alert("Loading Initial Data")
    performanceDataLoader();
   
});

// * GLOBALS
let map; // global variable for map 
let drawingManager;// the little menu that lets the user draw on the map
let all_overlays = [];//for deletion of user drawn shapes






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
    'EASTLAKE':[],
    'SOCORRO':[],
    'ARTCRAFT':[],
    'MCNUTT':[]
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
    'SOCORRO':false,
    'ARTCRAFT':false,
    'MCNUTT':false
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
    'SOCORRO':false,
    'ARTCRAFT':false,
    'MCNUTT':false
};

//temp solution, this can be shorted
function turnoff_Corridors(){
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
    corridors_selected.MCNUTT =false;
    
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
    corridors_T.MCNUTT =false;

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

//for regional text, aids in separating by type
function modeFinder() {
    if (currentPM == 3) {
        return "PM3";
    } else if (currentPM == 4) {
        console.log('purple');
        if (currentType == "biking") return "pm4Biking";
        if (currentType == "walking") return "pm4Walking";
    } else if (currentPM == 11) {
        return 'pm11Walking';
    } else if (currentPM == 12) {
        return 'pm12Biking';
    }
    else if (currentPM == 19) {
        if (currentType == "driving") return "pm19Driving";
        if (currentType == "freight") return "pm19Freight";
        if (currentType == "walking") return "pm19Walking";
        if (currentType == "biking") return "pm19Biking";
    } else if (currentPM == 18) {
        if (currentType == "driving") return "pm18Driving";
        if (currentType == "freight") return "pm18Freight";
        if (currentType == "walking") return "pm18Walking";
        if (currentType == "biking") return "pm18Biking";
    }
    else if (currentPM == 26) {
        return "pm26";
    }
}

// * For drop down button
//  Handles Corridors on drop down button. Populates map based on what user selected.
//  Index calls this method. Sends the selected corridor i.e. 'MESA'
function turnOn_Switch(selected){
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
        console.log('found');
        console.log(found);
        console.log(currentPM);
        console.log(currentType);
    }
    //determine shapeType based on current PM and set performance
    // Table names are found on 'PMS' on Database

    //Points
     if (currentPM == 18 || currentPM == 19) {
        shapeType = "point";
        tableName = "pm18_19txdotall";
    } else if (currentPM == 26) {
        shapeType = "point";
        tableName = "pm26";
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
    }
    //lines
    else if (currentPM == 3) {
        shapeType = "line";
        tableName = "pm3final";
    } else if (currentPM == 4) { //bike
         console.log('setting table name');
         console.log(currentType);
        shapeType = "line";
        if (currentType == "biking") {
            tableName = "pm4_bike";
            console.log(tableName);
        } else if (currentType == "walking") {
            tableName = "pm4_walking";
            console.log(tableName);
        }
     } else if (currentPM == 5) { //! 
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
    //polygons

    //determine what is selected then turn it on
    if (selected == "REGIONAL") { //default
        if (shapeType == "point") {
            console.log("guiding");
            pointHandler(found); //shape handlerP handles default views for points
            
        } else if (shapeType == "line") {
            console.log('going to lineHandlerS');
            lineHandler(found);
        }
     
    }else{
        if(selected == "ALAMEDA"){
            corridors_selected.ALAMEDA = true;
            corridors_T.ALAMEDA = true;
        }else if(selected == "DONIPHAN"){
            corridors_selected.DONIPHAN = true;
            corridors_T.DONIPHAN = true;
        }else if(selected == "DYER"){
            corridors_selected.DYER = true;
            corridors_T.DYER = true;
        }else if(selected == "HORIZON"){
            corridors_selected.HORIZON = true;
            corridors_T.HORIZON = true;
        }else if(selected == "MESA"){
            corridors_selected.MESA = true;
            corridors_T.MESA = true;
        }else if(selected == "MONTANA"){
            corridors_selected.MONTANA = true;
            corridors_T.MONTANA = true;
        }else if(selected == "MONTWOOD"){
            corridors_selected.MONTWOOD = true;
            corridors_T.MONTWOOD = true;
        }else if(selected == "YARBROUGH"){
            corridors_selected.YARBROUGH = true;
            corridors_T.YARBROUGH = true;
        }else if(selected == "ZARAGOZA"){
            corridors_selected.ZARAGOZA = true;
            corridors_T.ZARAGOZA = true;
        }else if(selected == "EASTLAKE"){
            corridors_selected.EASTLAKE = true;
            corridors_T.EASTLAKE = true;
        }else if(selected == "SOCORRO"){
            corridors_selected.SOCORRO = true;
            corridors_T.SOCORRO = true;
        }else if(selected == "ARTCRAFT"){
            corridors_selected.ARTCRAFT = true;
            corridors_T.ARTCRAFT = true;
        }else if(selected == "MCNUTT"){
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
function getPointsCorridors(type, tableName){
 
    let tracker = false;
    if(corridors_T.ALAMEDA == true){
        testCorridorHandler(type, "alameda_buffer", tableName);
        tracker = true;
    }
    if(corridors_T.DONIPHAN == true){
        tracker = true;
        testCorridorHandler(type, "doniphan_buffer", tableName);
    } 
    if(corridors_T.DYER == true){
        tracker = true;
        testCorridorHandler(type, "dyer_buffer", tableName);
    }
    if(corridors_T.HORIZON == true){
        tracker = true;
        testCorridorHandler(type, "horizon_buffer", tableName);
    }

    if(corridors_T.MESA == true){   
        testCorridorHandler(type, "mesa_buffer", tableName);
        tracker = true;
    }
    if(corridors_T.MONTANA == true){
        testCorridorHandler(type, "montana_buffer", tableName);
        tracker = true;
    }
    if(corridors_T.MONTWOOD  == true){
        tracker = true;
        testCorridorHandler(type, "montwood_buffer", tableName);
    }
    if(corridors_T.YARBROUGH == true){
        tracker = true;
        testCorridorHandler(type, "yarbrough_buffer", tableName);
    }
    if(corridors_T.ZARAGOZA == true){
        tracker = true;
        testCorridorHandler(type, "zaragoza_buffer", tableName);
    }
    if(corridors_T.SOCORRO == true){
        tracker = true;
        testCorridorHandler(type, "socorro_buffer", tableName);
    }
    
    if(corridors_T.MCNUTT == true){
        tracker = true;
        testCorridorHandler(type, "mcnutt_buffer", tableName);
    }
    
    if(corridors_T.EASTLAKE == true){
        tracker = true;
        testCorridorHandler(type, "eastlake_buffer", tableName);
    }
    
    if(corridors_T.ARTCRAFT == true){
        tracker = true;
        testCorridorHandler(type,"artcraft_buffer",tableName);
    }
    
    return tracker;
}


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
        corridors_T.DYER= true;
        get_corridors_buffer();
    } else {
        corridors_selected.DYER = false;
        corridors_T.DYER= false;
        clear_corridors("DYER");
    }
});
$("#horizon_toggle").on('change', function() {
    if ($(this).is(':checked')) { //when TRUE
        corridors_selected.HORIZON = true;
        corridors_T.HORIZON= true;
        get_corridors_buffer();
    } else {
        corridors_T.HORIZON= false;
        clear_corridors("HORIZON");
    }
});
$("#mesa_toggle").on('change', function() {
    if ($(this).is(':checked')) { //when TRUE
        corridors_selected.MESA = true;
        corridors_T.MESA= true;
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
function testCorridorHandler(type,Corridors_selected, Active_pm) {
    let key = currentPM;
    console.log('this is the current key');
    console.log(key);

    //prepare example that will be send to the PHP handler
    let example = { key: key, corridors_selected: Corridors_selected, active_pm: Active_pm };

    console.log("Preparing info for corridor");
    console.log(example);
    removeAllElementsBar();
    displaySpinner();
    console.log("adding spinner");
    // Once info is preapred, see who to call based on shape and performance
    if (type == "point") {
        if (currentPM == 18) {
            pm18Data(2, example);
        } else if (currentPM == 19) {
            console.log("sending stuff to corridor 19 Update");
            pm19Data(2, example);
        } else if (currentPM == 26) {
            pm26Data(2, example);
        }
    } else if (type == "line") {
        if (currentPM == 25) {
            corrShape_handlerL("pm25", example);
        } else if (currentPM == 11) {
            pm11Data(2, example);
        } else if (currentPM == 12) {
            pm12Data(2, example);
        }else if (currentPM == 3) {
            pm3Data(2, example);
        } else if (currentPM == 4) {
            pm4Data(2, example);
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
var spinner= 0;

// var currentCorr  = ""; // current corridor tracker
var toggleOn = false; 
var polyToErase = { // keeps track what polygons to erase
    exist: [], plan: []
}

    // keeps count of the number in each mode of transportation. Used for bar chart in workers commute. -C
    var count_list = []; count_list[0] = 0; count_list[1] = 0; count_list[2] = 0;
    var no_data_num = 0;
    var low_num = 0;
    var high_num = 0;

    // link for bridge condition
    var txt = "https://gis-txdot.opendata.arcgis.com/datasets/83af0d2957ca4c2eb340e4bd04a1046f_0/data?geometry=-134.852%2C24.539%2C-65.287%2C37.659";

    type="text/javascript"

    // Loads graph Data, fetches go here
function performanceDataLoader() {
    console.log("loading BC");
    //pm1Data();
    //pm2Data();
    //pm3Data(0, '');
    //lineHandler('0pm4W'); // mode 0 in pm4 Walking
    
  

   // pm5Data(0, '');
    pm9Data(0, '');
   // pm11Data(0, '');
   // pm12Data(0,'');
   // pm13Data();
    //pm13Data();
    //pm13_14Data();

    pm15Data();
    pm18Data(0, '');
    pm19Data(0, '');
    //pm20Data();
    //pm20DataT();
    pm22Data();
    //pm25Data();
    pm26Data(0,'');
    toggleHide();
}

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), { // callback
            zoom: 11,
            center: new google.maps.LatLng(31.837465,-106.2851078)
        
        });// * End Map

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
                zIndex: 99,
                fillColor: '#00796b',
                fillOpacity: .8,
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
                if (i == 0) { first_coords.push(y); first_coords.push(x); }
                dummy.push(y);
                dummy.push(x);
                coords_arr.push(dummy);
            }
            // ! add first coordinates to last place -> a drawn shape is closed where it started
            coords_arr.push(first_coords);
            AOI_STRING = createGeoJSON(event.type, coords_arr);
           // console.log(AOI_STRING);
    
        
            //clearMetadata();
            console.log(AOI_STRING);
            AOI(AOI_STRING);
          });

          drawingManager.setMap(map);

    }// End Init Map





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
    

   function cmp_lines(){
          fetch('./results.json').then(function(response) {
        return response.json();
    }).then(function(myJson) {
        console.log("CMP NETWORK LINES");
        for(var index in myJson.PM22_Lines){
            for(var county in myJson.PM22_Lines[index]){
                let shp =  myJson.PM22_Lines[index][county]["shape"];
                
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
    });
    }
   
    function wktFormatter(poly) {
        let name = poly.slice(0,7);
        let shape_s = [];
        if (name == "MULTIPO") { // Multipolygon parser
            let new_poly = poly.slice(15,-3);
            new_poly = new_poly.split(")),((");
            let len = new_poly.length;
            for (var j = 0; j < len; j++) {
                let polyCoordi = [];
                let polyTemp = new_poly[j].split(",");
                for(i = 0; i<polyTemp.length; i++){
                    let temp = polyTemp[i].split(" ");
                    polyCoordi.push({lat: parseFloat(temp[1]), lng: parseFloat(temp[0])});
                }
                shape_s[j] = polyCoordi;
            }
        } else { // Polygon parser
        
            let new_poly = poly.slice(9,-2);
            new_poly = new_poly.split("),(");
            let len = new_poly.length;
            for (var j = 0; j < len; j++) {
                let polyCoordi = [];
                let polyTemp = new_poly[j].split(",");
                for(i = 0; i < polyTemp.length; i++) {
                    let temp = polyTemp[i].split(" ");
                    polyCoordi.push({lat: parseFloat(temp[1]), lng: parseFloat(temp[0])});
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
        let new_point = point.slice(6,-2);
       // console.log(new_point);
        new_point = new_point.split("),(");
        //console.log(new_point);
        let len = new_point.length;
        for (var j = 0; j < len; j++) {
            let pointCoordi = [];
            let pointTemp = new_point[j].split(",");
            for(i = 0; i < pointTemp.length; i++) {
                let temp = pointTemp[i].split(" ");
                pointCoordi.push({lat: parseFloat(temp[1]), lng: parseFloat(temp[0])});
            }
            shape_s[j] = pointCoordi;
        }    
        return shape_s;
    }

    // adds a hover effect on polygons(google api has not provided functionality for it)
    function injectTooltip(event, data) {
		if(!tipObj && event){
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
            if(!coordPropName){
                //discover the name of the prop with MouseEvent
                for(var i in eventPropNames){
                    var name = eventPropNames[i];
                    if(event[name] instanceof MouseEvent){
                        coordPropName = name;
                        break;
                    }
                }
            }
            
            if(coordPropName){
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
        for(var i = 0; i < polylines.length; i++) {
            polylines[i].setMap(null);
        }
        for(var i = 0; i < points.length; i++) {
            points[i].setMap(null);
        }
        for(var i = 0; i < polygons.length; i++) {
            polygons[i].setMap(null);
        }
      // drawingManager.setMap(null);

        polylines = [];
        points = [];
        polygons = [];
        clusters = [];

        markerClusterSafeDelete();
    }





