$(document).ready(function () { // when the document loads
    alert("Loading Initial Data")
    performanceDataLoader();
    //wkt_points();

    
});

var corridors_shown = {
    'ALAMEDA': [],
    'DONIPHAN': [],
    'DYER': [],
    'HORIZON': [],
    'MESA': [],
    'MONTANA': [],
    'MONTWOOD': [],
    'YARBROUGH': [],
    'ZARAGOZA': []
};
var corridors_selected = {
    'ALAMEDA': false,
    'DONIPHAN': false,
    'DYER': false,
    'HORIZON': false,
    'MESA': false,
    'MONTANA': false,
    'MOTNWOOD': false,
    'YARBROUGH': false,
    'ZARAGOZA': false
};
$("#alameda_toggle").on('change', function() {
    if ($(this).is(':checked')) { //when TRUE
        corridors_selected.ALAMEDA = true;
        get_corridors_buffer();
    } else {
        corridors_selected.ALAMEDA = false;
        clear_corridors("ALAMEDA");
    }
});
$("#doniphan_toggle").on('change', function() {
    if ($(this).is(':checked')) { //when TRUE
        corridors_selected.DONIPHAN = true;
        get_corridors_buffer();
    } else {
        corridors_selected.DONIPHAN = false;
        clear_corridors("DONIPHAN");
    }
});
$("#dyer_toggle").on('change', function() {
    if ($(this).is(':checked')) { //when TRUE
        corridors_selected.DYER = true;
        get_corridors_buffer();
    } else {
        corridors_selected.DYER = false;
        clear_corridors("DYER");
    }
});
$("#horizon_toggle").on('change', function() {
    if ($(this).is(':checked')) { //when TRUE
        corridors_selected.HORIZON = true;
        get_corridors_buffer();
    } else {
        corridors_selected.HORIZON = false;
        clear_corridors("HORIZON");
    }
});
$("#mesa_toggle").on('change', function() {
    if ($(this).is(':checked')) { //when TRUE
        corridors_selected.MESA = true;
        get_corridors_buffer();
    } else {
        corridors_selected.MESA = false;
        clear_corridors("MESA");
    }
});
$("#montana_toggle").on('change', function() {
    if ($(this).is(':checked')) { //when TRUE
        corridors_selected.MONTANA = true;
        get_corridors_buffer();
    } else {
        corridors_selected.MONTANA = false;
        clear_corridors("MONTANA");
    }
});
$("#montwood_toggle").on('change', function() {
    if ($(this).is(':checked')) { //when TRUE
        corridors_selected.MONTWOOD = true;
        get_corridors_buffer();
    } else {
        corridors_selected.MONTWOOD = false;
        clear_corridors("MONTWOOD");
    }
});
$("#yarbrough_toggle").on('change', function() {
    if ($(this).is(':checked')) { //when TRUE
        corridors_selected.YARBROUGH = true;
        get_corridors_buffer();
    } else {
        corridors_selected.YARBROUGH = false;
        clear_corridors("YARBROUGH");
    }
});
$("#zaragoza_toggle").on('change', function() {
    if ($(this).is(':checked')) { //when TRUE
        corridors_selected.ZARAGOZA = true;
        get_corridors_buffer();
    } else {
        corridors_selected.ZARAGOZA = false;
        clear_corridors("ZARAGOZA");
    }
});

function clear_corridors(_key) {
    let array_we_want = corridors_shown[_key];
    for (var index in array_we_want) {
        array_we_want[index].setMap(null);
    }
}

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


function get_corridors_buffer() {
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

    // keeps count of the number in each mode of transportation. Used for bar chart in workers commute. -C
    var count_list = []; count_list[0] = 0; count_list[1] = 0; count_list[2] = 0;
    var no_data_num = 0;
    var low_num = 0;
    var high_num = 0;

    // link for bridge condition
    var txt = "https://gis-txdot.opendata.arcgis.com/datasets/83af0d2957ca4c2eb340e4bd04a1046f_0/data?geometry=-134.852%2C24.539%2C-65.287%2C37.659";

    $(document).ready(function() { // when the document loads
        let map; // global variable for map 
        // $.get('mwt_populate_pms.php', function(data){ // ajax call to populate all the pms
        //     // missing implementation
        //     // console.log(data);
        //     // populate programatically
        // });
    });

    type="text/javascript"

    // Loads graph Data, fetches go here
    function performanceDataLoader(){
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
        pm18Data();
        pm20Data();
        pm22Data();
        pm25Data();
        pm26Data();
    }

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), { // callback
            zoom: 11,
            center: new google.maps.LatLng(31.837465,-106.2851078)
        
        });
        var drawingManager = new google.maps.drawing.DrawingManager({
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

        //   google.maps.event.addListener(drawingManager, 'circlecomplete', function(circle) {
        //     var radius = circle.getRadius();
        //   });
          
        //   google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
        //     if (event.type == 'circle') {
        //       var radius = event.overlay.getRadius();
        //     }
        // });

        //infoWindow = new google.maps.InfoWindow;

        // map.addListener('click', function(e) {});

        // drawingManager = new google.maps.drawing.DrawingManager({
        //     drawingControl: true,
        //     drawingControlOptions: {
        //         position: google.maps.ControlPosition.TOP_CENTER,
        //         drawingModes: ['rectangle', 'polyline', 'polygon']
        //     },
            // rectangleOptions: {
            //     draggable: true,
            //     clickable: true,
            //     editable: true,
            //     zIndex: 10
            // },
            // polylineOptions: {
            //     clickable: true,
            //     draggable: true,
            //     editable: false,
            //     geodesic: true,
            //     zIndex: 10,
            //     strokeWeight: 6
            // },
            // polygonOptions: {
            //     clickable: true,
            //     draggable: true,
            //     editable: false,
            //     geodesic: true,
            //     zIndex: 10
            // }
        // });

        // drawingManager.setMap(map);

        // google.maps.event.addListener(drawingManager, 'overlaycomplete', function(e) {
        //     drawingManager.setDrawingMode(null);
        //     drawingManager.setOptions({
        //         drawingControl: true,
        //         drawingControlOptions: {
        //             position: google.maps.ControlPosition.TOP_CENTER,
        //             drawingModes: ['']
        //         }
        //     });

        //     rec = e.overlay;
        //     rec.type = e.type;
        //     payload.AoI = 1;
        //     setSelection(rec);

        //     if (rec.type == 'polyline') {
        //         lineParser();
        //     } else if (rec.type == 'polygon') {
        //         polyParser();
        //     }

        //     google.maps.event.addListener(rec, 'click', function() {
        //         if(rec.type == 'polyline') {
        //             lineParser();
        //         } else if(rec.type == 'polygon') {
        //             polyParser();
        //         }
        //         clickRec(rec);

        //     });
        //     google.maps.event.addListener(rec, 'bounds_changed', function() {
        //         showNewRect2(rec);
        //     });

        //     if (rec.type == 'polyline') {
        //         google.maps.event.addListener(rec, 'dragend', function() {
        //             lineParser();
        //         });
        //     } else if (rec.type == 'polygon') {
        //         google.maps.event.addListener(rec, 'dragend', function() { polyParser(); });
        //     }
        // });

        // // google.maps.event.addDomListener(document.getElementById('draw'), 'click', drawAnotherRectangle());
        // infoWindow = new google.maps.InfoWindow();
        }

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
    
    function shape_handler(found, key, method) {
        fetch('./results.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                let example = {key: key};
                
                if(method == "line") {
                    $.get('mwt_handler.php', example, function(data) { // ajax call to populate pavement lines
                    for(index in data.shape_arr){ // iterates through every index in the returned element (data['shape_arr'])
                        let shp = data.shape_arr[index]['shape']; // shape is LINESTRING or MULTILINESTRING
                        let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
                        let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
                        let to_visualize = []; // used to populate the map (latitude & longitude)
                        let coord; // will be an object to push coordinates to populate the map
                        let ln = r.getCoordinates(); // parses the shape into lat & lng
                        let color = '#03A9F4';  // default
                        
                        //PMS Data
                        let pm12Status = data.shape_arr[index].status; // used to color code lines
                        let pm3Ridership = data.shape_arr[index].AVG_ridership;
                        let pm4tct = data.shape_arr[index].tactcnt; // works for both walking and Biking
                        let pm25Iri = data.shape_arr[index].iri;

                        for (let i = 0; i < ln.length; i++) {
                            coord = {lat: ln[i]['y'], lng: ln[i]['x']}; // this is how lat & lng is interpreted by the tool
                            to_visualize.push(coord); // pushing the interpretation to our to_visualize array
                        }
                        // filter colors 
                        if(found == "pm4W"){
                            if(pm4tct > 4 && pm4tct < 16){
                                color = '#f44336';
                            }else if(pm4tct > 15 && pm4tct < 130){
                                color = '#64DD17';
                            }else if(pm4tct > 129 && pm4tct < 1306){
                                color = '#9C27B0';
                            }
                            let line = new google.maps.Polyline({ // it is a POLYLINE
                                path: to_visualize, // polyline has a path, defined by lat & lng 
                                strokeColor: color,
                                strokeOpacity: .50,
                                strokeWeight: 4,
                                zIndex: 99 // on top of every other shape
                            });
                            line.setMap(map);
                            polylines.push(line);
                        }
                        else if(found == "pm4Biking"){
                            if(pm4tct > 4 && pm4tct < 31){
                                color = '#f44336';
                            }else if(pm4tct > 31 && pm4tct < 481){
                                color = '#64DD17';
                            }else if(pm4tct > 480 && pm4tct < 8461){
                                color = '#9C27B0';
                            }

                            let line = new google.maps.Polyline({ // it is a POLYLINE
                                path: to_visualize, // polyline has a path, defined by lat & lng 
                                strokeColor: color,
                                strokeOpacity: .50,
                                strokeWeight: 4,
                                zIndex: 99 // on top of every other shape
                            });
                            line.setMap(map);
                            polylines.push(line);
                        }
                        else if(found == "PM21"){
                            console.log("new Lines");
                            color = '#9C27B0';
                            let line = new google.maps.Polyline({ // it is a POLYLINE
                                path: to_visualize, // polyline has a path, defined by lat & lng 
                                strokeColor: color,
                                strokeOpacity: .50,
                                strokeWeight: 4,
                                zIndex: 99 // on top of every other shape
                            });
                            line.setMap(map);
                            polylines.push(line);
                        }
                       
                        else if(found == "PM3"){                
                            if(pm3Ridership > 2776.666667 && pm3Ridership < 107271.682952){
                                color = '#8BC34A';       
                            }else if(pm3Ridership > 107271.682951 && pm3Ridership < 388321.351849){
                                color = '#FFCA28';        
                            }else if(pm3Ridership > 388321.351848 && pm3Ridership < 1144232.200000){
                                color = '#f44336';      
                            }
            
                            // color = '#f44336';
                            let line = new google.maps.Polyline({ // it is a POLYLINE
                                path: to_visualize, // polyline has a path, defined by lat & lng 
                                strokeColor: color,
                                strokeOpacity: .50,
                                strokeWeight: 4,
                                zIndex: 99 // on top of every other shape
                            });
                            line.setMap(map);
                            polylines.push(line);
                        }
                        else if(found == "pm11"){   
                            color = '#0D47A1'; 
                            let line = new google.maps.Polyline({ // it is a POLYLINE
                                path: to_visualize, // polyline has a path, defined by lat & lng 
                                strokeColor: color,
                                strokeOpacity: .50,
                                strokeWeight: 4,
                                zIndex: 99 // on top of every other shape
                            });
                            line.setMap(map);
                            polylines.push(line);

                        }else if(found == "pm12"){
                            if(pm12Status.toLowerCase() == 'proposed' ){
                                color = '#81C784';
                            }else if(pm12Status.toLowerCase() == 'existing' && pm12Status.toLowerCase() == 'existing/proposed'){
                                color = '#3949AB'; 
                            }else{
                                color = '#3949AB';
                            }
                
                            let line = new google.maps.Polyline({ // it is a POLYLINE
                                path: to_visualize, // polyline has a path, defined by lat & lng 
                                strokeColor: color,
                                strokeOpacity: .50,
                                strokeWeight: 4,
                                zIndex: 99 // on top of every other shape
                            });
                            line.setMap(map);
                            polylines.push(line);
                        } else if(found == "pm25"){
                            color = '#558B2F'; 
                            if(pm25Iri < 95){
                                color = '#8BC34A';
                            }else if(pm25Iri > 94 && pm25Iri < 171){
                                color = '#F57C00'; 
                            }else if(pm25Iri > 170){
                                color = '#d50000';
                            }
                            let line = new google.maps.Polyline({ // it is a POLYLINE
                                path: to_visualize, // polyline has a path, defined by lat & lng 
                                strokeColor: color,
                                strokeOpacity: .50,
                                strokeWeight: 4,
                                zIndex: 99 // on top of every other shape
                            });
                            line.setMap(map);
                            polylines.push(line);
                        }
                    }  

                 });
                // original code provided for lines
                   /* $.get('mwt_handler.php', example, function(data) { // ajax call to populate pavement lines
                        for(index in data.shape_arr){ // iterates through every index in the returned element (data['shape_arr'])
                            let shp = data.shape_arr[index]['shape']; // shape is LINESTRING or MULTILINESTRING
                            let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
                            let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
                            let to_visualize = []; // used to populate the map (latitude & longitude)

                            let coord; // will be an object to push coordinates to populate the map
                            let ln = r.getCoordinates(); // parses the shape into lat & lng
                            for (let i = 0; i < ln.length; i++) {
                                coord = {lat: ln[i]['y'], lng: ln[i]['x']}; // this is how lat & lng is interpreted by the tool
                                to_visualize.push(coord); // pushing the interpretation to our to_visualize array
                            }

                            let line = new google.maps.Polyline({ // it is a POLYLINE
                                path: to_visualize, // polyline has a path, defined by lat & lng 
                                value: data.shape_arr[index]['value'], // iri (attribute for the pavement condition score)
                                strokeColor: 'black',
                                strokeOpacity: 1.0,
                                strokeWeight: 4,
                                zIndex: 99 // on top of every other shape
                            });
                            line.setMap(map);
                            polylines.push(line);
                        //line.addListener('click', lineInfo_pavement); // listener for tooltip; "on'click'"
                        //polygons["pm1"].push(line); // could store into global array for easy/fast erasing and re-populating
                        }   
                    });*/
                  
                   
                }else if (method == "point") {
                    if(found == "pm13_14"){
                        let images = [];
          
                        images.push("./icons/yellowPin.png");
                        images.push("./icons/orangePin.png");
                        images.push("./icons/darkbluePin.png");
                        images.push("./icons/greenPin.png");
                        images.push("./icons/grayPin.png");

                        let tlat = pms_13_14_cor.lat; 
                        let tlon = pms_13_14_cor.lon;
                        let tport = pms_13_14_cor.port;

                        // for regular points
                        for(index in tlat){ 
                            let to_visualize = {lat: parseFloat(tlat[index]), lng: parseFloat(tlon[index])};
                            let point  = new google.maps.Marker({
                                    position: to_visualize,
                                    title:  tport[index],
                                    icon: images[index]
                            });
                        
                            //point.addListener('click', pointInfo);
                            point.setMap(map);
                            points.push(point);
                            
                            }
                    }else if(found == "PM21"){
                        $.get('mwt_handler.php', example, function(data) { // ajax call to populate point
                            console.log("points");
                                for(index in data.shape_arr){ 
                                    let to_visualize = {lat: parseFloat(data.shape_arr[index].latitude), lng: parseFloat(data.shape_arr[index].longitude)};
                                    let image = "./img/markers/yellow.png";
                                    let point  = new google.maps.Marker({
                                        position: to_visualize,
                                        title: 'point',
                                        value: '0',
                                        icon: image
                                    });
                             
                                    point.setMap(map);
                                    points.push(point);
                                }
                        }); 

                        // console.log("Now Arriving at 7");
                        // $.get('mwt_handler.php', example, function(data) {
                        //     console.log("entering");
                        //     for (index in data.shape_arr) {
                        //         console.log("redirecting to wkt");
                        //         let temp = wktFormatter(data.shape_arr[index]['shape']);
                        //         let to_visualize = [];
                        //         // let pm5_9status = data.shape_arr[index].status;
                        //         let title ="";
        
                        //         // if the status of a shape exists, push to visualize
                        //         for (let i = 0; i < temp.length; i++) {
                        //                 to_visualize.push(temp[i]);
                        //         }
        
                        //        let color = "#039BE5";
                        //         console.log("in 7");
                        //        let polygon = new google.maps.Polygon({
                        //            description: "",
                        //            description_value: '',
                        //            paths: to_visualize,
                        //            strokeColor: 'black',
                        //            strokeOpacity: 0.60,
                        //            strokeWeight: 0.70,
                        //            fillColor: color,
                        //            fillOpacity: 0.60,
                        //            zIndex: -1,
                        //            title: "",//title.toFixed(1) + "%",
                        //        });
                    }else if(found == "PM7"){
                        $.get('mwt_handler.php', example, function(data) { 
                            for(index in data.shape_arr){ 
                                let holder = [];

                                holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
                                holder = holder[0][0]; // Fixes BLOB
                            
                                let to_visualize = {lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng)};
    
                                let image = "./img/markers/yellow.png";
                                let point  = new google.maps.Marker({
                                    position: to_visualize,
                                    title: 'point',
                                    value: '0',
                                    icon: image
                                });
                         
                                point.setMap(map);
                                points.push(point);
                            }
                    }); 
                            
                      
                    }
                    else if(found == "pm20B" ||found == "pm20P"){
                        //data for bus stops
                        let images = [];
                        let tlat = []; 
                        let tlon = [];
                        let count = [];
                        //data for crashes
                        let clat = [];
                        let clon = [];
                        let ctype = [];

                        //Pedestrians
                        if(found == "pm20P"){
                            tlat = pm20_P.lat; 
                            tlon = pm20_P.lon;
                            count = pm20_P.count;
                            clat = pm20_P.clat;
                            clon = pm20_P.clon;
                            ctype = pm20_P.ctype;

                        } // bikes
                        else if(found == "pm20B"){
                            tlat = pm20_B.lat; 
                            tlon = pm20_B.lon;
                            count = pm20_B.count;
                            clat = pm20_B.clat;
                            clon = pm20_B.clon;
                            ctype = pm20_B.ctype;
                        }
                        
                        // for bus stations
                        for(i in tlat){ 
                            if(count[i] == 1){
                                images.push("./img/markers/green.png");
                            }else if(count[i] >1 && count[i] <4){
                                images.push("./img/markers/yellow.png");
                            }else if(count[i] >3 && count[i] <7){
                                images.push("./img/markers/pink.png");
                            }else if(count[i] >6 && count[i] <13){
                                images.push("./img/markers/red.png");
                            }else if(count[i] >12){
                                images.push("./img/markers/grey.png");
                            }
                            let to_visualize = {lat: parseFloat(tlat[i]), lng: parseFloat(tlon[i])};
                            let point  = new google.maps.Marker({
                                    position: to_visualize,
                                    title:  String(count[i]),
                                    icon: images[i]
                            });
                            point.setMap(map);
                            points.push(point);
                        }
                        //for crash points
                        image = "./img/markers/crash.png";
                        for(i in clat){ 
                            let to_visualize = {lat: parseFloat(clat[i]), lng: parseFloat(clon[i])};
                            let point  = new google.maps.Marker({
                                    position: to_visualize,
                                    title:  "Crash Here",
                                    icon: image
                            });
                            
                            //point.addListener('click', pointInfo);
                            point.setMap(map);
                            points.push(point);
                        
                        }
                    //Pm20 end 
                    }
                    else if(found == "pm18Driving" || found == "pm18Freight" || found == "pm18Walking" || found == "pm18Biking"  ){      
                        let image = "./img/markers/red.png";
                        let cluster_markers = [];
                       
                        // temp holders, aid in updating data depending on what button is clicked. 
                        let cordinateHolderlat = []; let cordinateHolderLong = [];  let classAHolder = [];  let classBHolder = [];
                        let classCHolder = [];       let classOHolder = [];         let yearHolder = [];    let fatalityHolder = [];
                        
                        if(found == "pm18Driving"){
                            image = "./icons/crash_red.png";
                            cordinateHolderlat = driving_Cordinates_Fatalities.lat;
                            cordinateHolderLong = driving_Cordinates_Fatalities.lon;
                            classAHolder = driving_Cordinates_Fatalities.classA;
                            classBHolder = driving_Cordinates_Fatalities.classB;
                            classCHolder = driving_Cordinates_Fatalities.classC;
                            classOHolder = driving_Cordinates_Fatalities.classO;
                            yearHolder = driving_Cordinates_Fatalities.year;
                           
                            fatalityHolder = driving_Cordinates_Fatalities.fatality;
                            // console.log(yearHolder);
                            // console.log(fatalityHolder);
                        }else if(found == "pm18Freight"){
                            image = "./icons/truck.png";
                            cordinateHolderlat = Freight_Cordinates_Fatalities.lat;
                            cordinateHolderLong = Freight_Cordinates_Fatalities.lon;
                            classAHolder = Freight_Cordinates_Fatalities.classA;
                            classBHolder = Freight_Cordinates_Fatalities.classB;
                            classCHolder = Freight_Cordinates_Fatalities.classC;
                            classOHolder = Freight_Cordinates_Fatalities.classO;
                            yearHolder = Freight_Cordinates_Fatalities.year;
                            fatalityHolder = Freight_Cordinates_Fatalities.fatality;
                        }else if(found == "pm18Walking"){
                            image = "./icons/b22_p.png";
                            cordinateHolderlat = Walking_Cordinates_Fatalities.lat;
                            cordinateHolderLong = Walking_Cordinates_Fatalities.lon;
                            classAHolder = Walking_Cordinates_Fatalities.classA;
                            classBHolder = Walking_Cordinates_Fatalities.classB;
                            classCHolder = Walking_Cordinates_Fatalities.classC;
                            classOHolder = Walking_Cordinates_Fatalities.classO;
                            yearHolder = Walking_Cordinates_Fatalities.year;
                            fatalityHolder = Walking_Cordinates_Fatalities.fatality;
                        }else if(found == "pm18Biking"){
                            image = "./icons/b22_b.png";
                            cordinateHolderlat = Bike_Cordinates_Fatalities.lat;
                            cordinateHolderLong = Bike_Cordinates_Fatalities.lon;
                            classAHolder = Bike_Cordinates_Fatalities.classA;
                            classBHolder = Bike_Cordinates_Fatalities.classB;
                            classCHolder = Bike_Cordinates_Fatalities.classC;
                            classOHolder = Bike_Cordinates_Fatalities.classO;
                            yearHolder = Bike_Cordinates_Fatalities.year;
                            fatalityHolder = Bike_Cordinates_Fatalities.fatality;
                        }

                            
                        for(i in cordinateHolderlat){
                            cluster_points = new google.maps.LatLng(parseFloat(cordinateHolderlat[i]),parseFloat(cordinateHolderLong[i]));
                            cluster_markers.push(cluster_points);     

                            var markers = cluster_markers.map(function(location, i) {
                                return new google.maps.Marker({
                                    position: location,
                                    icon: image,
                                    title: "Year: " + yearHolder[i] + " \nSerious Injuries: " + classAHolder[i]  + " \nNon-Incapacitating Injuries: " + classBHolder[i] + "\nPossible Injuries: "   + classCHolder[i] + "\nNon-Injury: "   + classOHolder[i] + "\nFatalities: " + fatalityHolder[i] 
                                });
                            });

                        }

                         markerCluster = new MarkerClusterer(map, markers,
			                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

            

		            }
                    else if(found == "pm19Driving" || found == "pm19Freight" || found == "pm19Walking" || found == "pm19Biking" ){
                        let image = "./img/markers/red.png";
                        let cluster_markers = [];
                       
                        // temp holders, aid in updating data depending on what button is clicked. 
                        let cordinateHolderlat = []; let cordinateHolderLong = [];  let classAHolder = [];  let classBHolder = [];
                        let classCHolder = [];       let classOHolder = [];         let yearHolder = [];    let fatalityHolder = [];
                      
                        if(found == "pm19Driving"){
                            image = "./icons/crash_red.png";
                            cordinateHolderlat = driving_Cordinates_Injuries.lat;
                            cordinateHolderLong = driving_Cordinates_Injuries.lon;
                            classAHolder = driving_Cordinates_Injuries.classA;
                            classBHolder = driving_Cordinates_Injuries.classB;
                            classCHolder = driving_Cordinates_Injuries.classC;
                            classOHolder = driving_Cordinates_Injuries.classO;
                            yearHolder = driving_Cordinates_Injuries.year;
                            fatalityHolder = driving_Cordinates_Injuries.fatality;
                        }else if(found == "pm19Freight"){
                            image = "./icons/truck.png";
                            cordinateHolderlat = Freight_Cordinates_Injuries.lat;
                            cordinateHolderLong = Freight_Cordinates_Injuries.lon;
                            classAHolder = Freight_Cordinates_Injuries.classA;
                            classBHolder = Freight_Cordinates_Injuries.classB;
                            classCHolder = Freight_Cordinates_Injuries.classC;
                            classOHolder = Freight_Cordinates_Injuries.classO;
                            yearHolder = Freight_Cordinates_Injuries.year;
                            fatalityHolder = Freight_Cordinates_Injuries.fatality;
                        }else if(found == "pm19Walking"){
                            image = "./icons/b22_p.png";
                            cordinateHolderlat = Walking_Cordinates_Injuries.lat;
                            cordinateHolderLong = Walking_Cordinates_Injuries.lon;
                            classAHolder = Walking_Cordinates_Injuries.classA;
                            classBHolder = Walking_Cordinates_Injuries.classB;
                            classCHolder = Walking_Cordinates_Injuries.classC;
                            classOHolder = Walking_Cordinates_Injuries.classO;
                            yearHolder = Walking_Cordinates_Injuries.year;
                            fatalityHolder = Walking_Cordinates_Injuries.fatality;
                        }else if(found == "pm19Biking"){
                            image = "./icons/b22_b.png";
                            cordinateHolderlat = Biking_Cordinates_Injuries.lat;
                            cordinateHolderLong = Biking_Cordinates_Injuries.lon;
                            classAHolder = Biking_Cordinates_Injuries.classA;
                            classBHolder = Biking_Cordinates_Injuries.classB;
                            classCHolder = Biking_Cordinates_Injuries.classC;
                            classOHolder = Biking_Cordinates_Injuries.classO;
                            yearHolder = Biking_Cordinates_Injuries.year;
                            fatalityHolder = Biking_Cordinates_Injuries.fatality;
                        }

                        //for clusters
                        for(i in cordinateHolderlat){
                            cluster_points = new google.maps.LatLng(parseFloat(cordinateHolderlat[i]),parseFloat(cordinateHolderLong[i]));
                            cluster_markers.push(cluster_points);     

                            var markers = cluster_markers.map(function(location, i) {
                                return new google.maps.Marker({
                                    position: location,
                                    icon: image,
                                    title: "Year: " + yearHolder[i] + " \nSerious Injuries: " + classAHolder[i]  + " \nNon-Incapacitating Injuries: " + classBHolder[i] + "\nPossible Injuries: "   + classCHolder[i] + "\nNon-Injury: "   + classOHolder[i] + "\nFatalities: " + fatalityHolder[i]
                                    // title is what hoover displays
                                });
                            });

                        }

                         markerCluster = new MarkerClusterer(map, markers,
			                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
                    
                    }
                    else if(found == "pm15Driving" || found == "pm16Driving" || found == "pm17Driving"){
                        pm15_handler();
                        let tlat = []; let tlon = []; let tStatName = [];
                        let images = []; // array of images
                  
                        if(found == "pm15Driving"){
                            images.push("./icons/redPin.png");
                            images.push("./icons/orangePin.png");
                            images.push("./icons/lightPink.png");
                            images.push("./icons/lightbluePin.png");
                            images.push("./icons/grayPin.png");
                            images.push("./icons/greenPin.png");
                            images.push("./icons/yellowPin.png");
                            images.push("./icons/pinkPin.png");
                            images.push("./icons/darkbluePin.png");
                            images.push("./icons/lightgreenPin.png");
                            images.push("./icons/lightgrayPin.png");
                            tlat = pms_15_16_17Info.lat;
                            tlon = pms_15_16_17Info.lon;
                            tStatName = pms_15_16_17Info.stationName;
                        }else if(found == "pm16Driving"){
                            // 2 points
                            images.push("./icons/orangePin.png");
                            images.push("./icons/darkbluePin.png");
                            tlat = pm16Coordinates.lat;
                            tlon = pm16Coordinates.lon;
                            tStatName = pm16Coordinates.StationName;
                        }else if(found == "pm17Driving"){
                           // image = "./icons/b22_p.png";
                            images.push("./icons/orangePin.png");
                            images.push("./icons/greenPin.png");
                            images.push("./icons/lightPink.png");
                            images.push("./icons/darkbluePin.png");
                            images.push("./icons/grayPin.png");
                            tlat = pm17Coordinates.lat;
                            tlon = pm17Coordinates.lon;
                            tStatName = pm17Coordinates.StationName;
                        }
                     
                        // for regular points
                        for(index in tlat){ 
                            let to_visualize = {lat: parseFloat(tlat[index]), lng: parseFloat(tlon[index])};
                            let point  = new google.maps.Marker({
                                    position: to_visualize,
                                    title:  tStatName[index],
                                    icon: images[index]
                            });
                            
                            //point.addListener('click', pointInfo);
                            point.setMap(map);
                            points.push(point);
                        
                        }
                        


                    }    
                    else if(found == 'pmbridge' ){
                        
                        $.get('mwtB_handler.php', example, function(data) { // ajax call to populate points
                        let lowest_values = myJson["PM26_Lowest_Value_2018"];

                            for(index in data.shape_arr){ 
                                //let temp = wktFormatterPoint(data.shape_arr[index]['shape']);
                                //let to_visualize = temp[0][0]; // should fix return method
                                let to_visualize = {lat: parseFloat(data.shape_arr[index].lat_dd), lng: parseFloat(data.shape_arr[index].long_dd)};

                                let bridge_value = lowest_values[index];

                                let image = "./img/markers/old_imgs/black_dot.svg";
                                let point_title = "No data: ";

                                if (bridge_value >= 7 && bridge_value <= 9) { image = "./img/markers/green.png";  point_title= "Good Condition: "}
                                else if (bridge_value >= 5 && bridge_value <= 6) { image = "./img/markers/yellow.png"; point_title= "Fair Condition: "}
                                else if (bridge_value >= 0 && bridge_value <= 4) { image = "./img/markers/red.png";  point_title= "Poor Condition: "}
                                else if (bridge_value == 999 || bridge_value == null) { image = "./img/markers/grey.png"; }

                                let point  = new google.maps.Marker({
                                    position: to_visualize,
                                    title: point_title + bridge_value + '',
                                    value: 'bridge condition',
                                    icon: image
                                });
                            
                                //point.addListener('click', pointInfo);
                                point.setMap(map);
                                points.push(point);
                                //points["pm1"].push(point); // could store into global array for easy/fast erasing and re-populating
                            }
                    }); 
                }
                // --------------------- PM 22 CLuster Markers  60k+ points---------------------
                else if(found == "pm22crashes"){
                      cmp_lines();  
                   
                   let pm22_txlat = myJson.PM22.TX_LAT;
                   let pm22_txlong = myJson.PM22.TX_LON;
                   let pm22_nmlat = myJson.PM22.NM_LAT;
                   let pm22_nmlong = myJson.PM22.NM_LON;                     
                   let image = "./icons/crash_red.png";
                   let cluster_markers = [];

                    for(index in pm22_txlat){ 
                        cluster_points = {lat: parseFloat(pm22_txlat[index]), lng: parseFloat(pm22_txlong[index])};
                        cluster_markers.push(cluster_points);             
                   }
                    for(index in pm22_nmlat){ 
                        cluster_points = {lat: parseFloat(pm22_nmlat[index]), lng: parseFloat(pm22_nmlong[index])};
                        cluster_markers.push(cluster_points);             
                   }
                   var markers = cluster_markers.map(function(location, i) {
                        return new google.maps.Marker({
                            position: location,
                            icon: image,
                            title: "A crash ocurred at this location"
                        });
                   });
                   clusters.push(markers);
                   
                    markerCluster = new MarkerClusterer(map, markers,
                       {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
                   
                     }    



           }else{ // polygons

            /* PM9 and PM5 go together, they share the same polygons*/
              if(found == 'PM9' || found == 'PM5'){
                $.get('mwt_handler.php', example, function(data) {
                    for (index in data.shape_arr) {
                        let temp = wktFormatter(data.shape_arr[index]['shape']);
                        let to_visualize = [];
                        let pm5_9status = data.shape_arr[index].status;
                        let title ="";

                        //filter values on polygons
                        if(found == 'PM9'){
                            let ratioPop = parseFloat(data.shape_arr[index].ratio_pop);
                            title = ratioPop;
                        }else{ // PM5 
                            let prctprim = parseFloat(data.shape_arr[index].prcnt_prim);
                            title = prctprim;
                        }
                       
                        // if the status of a shape exists, push to visualize
                        for (let i = 0; i < temp.length; i++) {
                            if(pm5_9status == "exist"){
                                to_visualize.push(temp[i]);
                            }
                        }

                       let color = "#039BE5";

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
                       
                       // Hover Effect for Google API Polygons
                       google.maps.event.addListener(polygon, 'mouseover', function(event){ injectTooltip(event, polygon.title); });
                       google.maps.event.addListener(polygon, 'mousemove', function(event){ moveTooltip(event); });
                       google.maps.event.addListener(polygon, 'mouseout', function(event){ deleteTooltip(event); });

                       polygon.setMap(map);
                       polygons.push(polygon);
                   }
                });

            }else if(found == 'PM6' || found == 'PM10'){
                $.get('mwt_handler.php', example, function(data) {
                    for (index in data.shape_arr) {
                        let temp = wktFormatter(data.shape_arr[index]['shape']);
                        let to_visualize = [];
                        let title ="";

                        //filter values on polygons
                        if(found == 'PM10'){
                            let ratioPop = parseFloat(data.shape_arr[index].ratio_pop);
                            title = ratioPop;
                        }else{ 
                            let prctprim = parseFloat(data.shape_arr[index].prcnt_prim);
                            title = prctprim;
                        }
                    
                        for (let i = 0; i < temp.length; i++) {
                                to_visualize.push(temp[i]);
                        }

                        let color = "#039BE5";

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
                        
                        // Hover Effect for Google API Polygons
                        google.maps.event.addListener(polygon, 'mouseover', function(event){ injectTooltip(event, polygon.title); });
                        google.maps.event.addListener(polygon, 'mousemove', function(event){ moveTooltip(event); });
                        google.maps.event.addListener(polygon, 'mouseout', function(event){ deleteTooltip(event); });

                        polygon.setMap(map);
                        polygons.push(polygon);
                    }
             });
            
            }
            else if(found == 'PM7'){
                console.log("Now Arriving at 7");
                $.get('mwt_handler.php', example, function(data) {
                    console.log("entering");
                    for (index in data.shape_arr) {
                        console.log("redirecting to wkt");
                        let temp = wktFormatter(data.shape_arr[index]['shape']);
                        let to_visualize = [];
                        // let pm5_9status = data.shape_arr[index].status;
                        let title ="";

                        // if the status of a shape exists, push to visualize
                        for (let i = 0; i < temp.length; i++) {
                                to_visualize.push(temp[i]);
                        }

                       let color = "#039BE5";
                        console.log("in 7");
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
                           title: "",//title.toFixed(1) + "%",
                       });
                       
                       // Hover Effect for Google API Polygons
                       google.maps.event.addListener(polygon, 'mouseover', function(event){ injectTooltip(event, polygon.title); });
                       google.maps.event.addListener(polygon, 'mousemove', function(event){ moveTooltip(event); });
                       google.maps.event.addListener(polygon, 'mouseout', function(event){ deleteTooltip(event); });

                       polygon.setMap(map);
                       polygons.push(polygon);
                   }
             
                });
            }else if(found == "PM21"){
                $.get('mwt_handler.php', example, function(data) {
                   
           
                    for (index in data.shape_arr) {
                        let temp = wktFormatter(data.shape_arr[index]['shape']);
                        let to_visualize = [];
                      //  let pm21Pattern = data.shape_arr[index].pattern;
                        // if the status of a shape exists, push to visualize
                        for (let i = 0; i < temp.length; i++) {
                                to_visualize.push(temp[i]);
                        }
                        let color = "#039BE5"; 
                   /*     if(pm21Pattern == "Consecutive Hot Spot"){
                            color = "f44336";
                        }else if(pm21Pattern== "Sporadic Hot Spot"){
                            color = "FFC107";
                        }else if(pm21Pattern== "Sporadic Cold Spot"){
                            color = "2196F3";
                        }else if(pm21Pattern== "Persistent Cold Spot"){
                            color = "80DEEA";
                        }else if(pm21Pattern== "Oscillating Hot Spot"){
                            color = "FF5722";
                        }else if(pm21Pattern== "Not Emerging"){
                            color = "9E9E9E";
                        }
                     */

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
                           title:"",//pattern,//title.toFixed(1) + "%",
                       });
                       
                       // Hover Effect for Google API Polygons
                       google.maps.event.addListener(polygon, 'mouseover', function(event){ injectTooltip(event, polygon.title); });
                       google.maps.event.addListener(polygon, 'mousemove', function(event){ moveTooltip(event); });
                       google.maps.event.addListener(polygon, 'mouseout', function(event){ deleteTooltip(event); });

                       polygon.setMap(map);
                       polygons.push(polygon);
                   }
                });
            }
              else if(found == 'pm2-transit' || found == 'pm2-walking'|| found == 'pm2-biking' ){
                   clean();                      
               
                 
               $.get('mwtB_handler.php', example, function(data) { // ajax call to populate pavement lines
                   let res = found.split("-");
                   let pm = res[0];    // pm type 1 or 2
                   let type = res[1];  // mode of transportation type

                   // list of transportations
                   let transportation_modes = [
                       "PM1_pct_NonSOV_e",      // 0
                       "PM2_pct_PublicTrans_e", // 1
                       "PM2_pct_Walking_e",     // 2
                       "PM2_pct_Biking_e",      // 3
                   ];

                   let tx_mean = [ // loaded mean values for tx
                       2.166882,   // transit
                       2.623363,   // walking
                       0.262361    // biking
                   ];

                   let nm_mean = [ // loaded mean values for nm
                       0.645192,   // transit
                       1.516317,   // walking
                       0.005669    // biking
                   ];

                   for (index in data.shape_arr) {
                       let temp = wktFormatter(data.shape_arr[index]['shape']);
                       let to_visualize = [];

                       for (let i = 0; i < temp.length; i++) {
                           to_visualize.push(temp[i]);
                       }

                       let mode_values = [];
                       let value = 0.000000;
                       let mean = 0.000000;

                       if (index <= 514) { // UPPER SECTION = Texas
                           if (type == "nonsov") {
                               mode_values = myJson[transportation_modes[0]];
                               //...
                           } else if (type == "transit") {
                               mode_values = myJson[transportation_modes[1]];
                               mean = tx_mean[0];
                           } else if (type == "walking") {
                               mode_values = myJson[transportation_modes[2]];
                               mean = tx_mean[1];
                           } else if (type == "biking") {
                               mode_values = myJson[transportation_modes[3]];
                               mean = tx_mean[2];
                           }
                       } else { // LOWER SECTION = New Mexico
                           if (type == "nonsov") {
                               mode_values = myJson[transportation_modes[0]];
                               //...
                           } else if (type == "transit") {
                               mode_values = myJson[transportation_modes[1]];
                               mean = nm_mean[0];
                           } else if (type == "walking") {
                               mode_values = myJson[transportation_modes[2]];
                               mean = nm_mean[1];
                           } else if (type == "biking") {
                               mode_values = myJson[transportation_modes[3]];
                               mean = nm_mean[2];
                           }
                       }
                       value = mode_values[index];

                       let color = "";
                       if (pm == "pm1") {
                           //...
                       } else {
                           if (value == 0.000000) { // grey = no data
                               color = "#C0C0C0";
                               no_data_num++;
                           } else if (value < mean) { // light blue = low/less than mean
                               color = "#00CCFF";
                               low_num++;
                           } else if (value > mean) { // dark blue = high/greater than mean
                               color = "#0066CC";
                               high_num++;
                           }
                       }

                       let polygon = new google.maps.Polygon({
                           description: "Percentage of Workers Commuting by Biking",
                           description_value: 'something from data.shape_arr[index][value]',
                           paths: to_visualize,
                           strokeColor: 'black',
                           strokeOpacity: 0.60,
                           strokeWeight: 0.70,
                           fillColor: color,
                           fillOpacity: 0.60,
                           zIndex: -1,
                           title: value.toFixed(1) + "%",
                       });
                       
                       // Hover Effect for Google API Polygons
                       google.maps.event.addListener(polygon, 'mouseover', function(event){ injectTooltip(event, polygon.title); });
                       google.maps.event.addListener(polygon, 'mousemove', function(event){ moveTooltip(event); });
                       google.maps.event.addListener(polygon, 'mouseout', function(event){ deleteTooltip(event); });

                       polygon.setMap(map);
                       polygons.push(polygon);
                   }
                   count_list[0] = no_data_num;
                   count_list[1] = low_num;
                   count_list[2] = high_num;
                
                   if(found == 'pm2-transit'){
                       buttonSwitch('transitWC');
                   }
                   if(found == 'pm2-walking'){
                       buttonSwitch('walkingWC');
                   }
                   if(found == 'pm2-biking'){
                       buttonSwitch('BikingWC');
                   }
               
               });
           }
           }
              });         
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
    
function wkt_points(blob){
    console.log("1 " + blob);
    var point = new Wkt.Wkt();
    point =  point.read(blob);
    console.log("3 " + point.components );
    point.toObject();
    console.log("4");
    point.toJson();
    console.log("5");
    return point;

}
    function wktFormatterPoint(point) {
        // let name = point.slice(0,5);
        // console.log(name);
        let shape_s = [];
        let new_point = point.slice(6,-2);
        //console.log(new_point);
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
        console.log("how it looks" + shape_s );
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

        polylines = [];
        points = [];
        polygons = [];
        clusters = [];
        markerClusterSafeDelete();
    }

    function openLegend() {
        if(detectmob() == true){
            console.log("Mobile");
            document.getElementById("legendHolder").style.width = "60%";
        }else{
            document.getElementById("legendHolder").style.width = "20%"; //length of legend
        }
    }

    function closeLegend() {
        document.getElementById("legendHolder").style.width = "0";
       //  removeAllElementsLegend();
 //   document.getElementById("legendHolder").style.display = "none";
    }

    /* This functions are for sidebar */
    function openNav() {
        if(detectmob() == true){
            document.getElementById("mySidenav").style.width = "100%";
          //  document.getElementById("mySidenav").style.height = "50%";
        }else{
            document.getElementById("mySidenav").style.width = "53%";
            document.getElementById("mySidenav").style.height = "71%";
            document.getElementById("mySidenav").style.marginTop = "8.5%";
        }
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0%";
		removeAllElementsBar(); // destroy everything when closing bar
    }
 ///// Fix later
	// handles Button methods
    function buttonSwitch(var1) {
   
        let buttonValue = var1.value;
        // if(buttonValue == 'pm15tester' || buttonValue == 'pm16tester' || buttonValue == 'pm17tester'){
        //     clean();
        //     //pm15_tester();
        //     canvasMaker('chart1','myChart');
        //     var ctx2pm1 = document.getElementById('myChart').getContext('2d');
        //     pieChartpm1(ctx2pm1);
        //     headerAdder(buttonValue, "title");
        //     paragraphAdder("Summary:", "subtitle", "summary-title");
        //     paragraphAdder( valsPm1[0]+ "% of workers living in the El Paso MPO area reported to drive alone during their commute to work," 
        //      +"therefore only "+ valsPm1[1]+"% of workers commute via non-SOV modes, which includes carpooled via car, truck, or van. Workers"
        //      +"used Public Transport means such as bus or trolley bus, streetcar or trolley car, subway or elevated railroad, railroad,"
        //      +" and ferryboat. Some workers also used a taxicab, motorcycle, bicycle, walking, and other means to go to work or they worked"
        //      +" at home. …","paragraph","summary-info");
        //     paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        //     paragraphAdder("2012-2016 5-year average estimates", "paragraph", "analysis-info");
        //     paragraphAdder("Data Source:", "subtitle", "data-title");
        //     anchorAdder("American Community Survey 5-Year Estimates","https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2018.html");
        //     anchorAdder("TIGER/Line Shapefiles and TIGER/Line Files ","https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-data.2016.html");
		// 	paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
        //     paragraphAdder("PM1 is calculated as:", "paragraph", "calc-info");
        //    // imageAdder('./img/performance_measures/pm1/pm1Eqn.PNG','calc-info');
        //     openNav();
        // }
        if (buttonValue == 'pm1') {
            clean();
            canvasMaker('chart1','myChart');
            var ctx2pm1 = document.getElementById('myChart').getContext('2d');
            pieChartpm1(ctx2pm1);
            headerAdder("Percent of non-single occupancy vehicle (SOV) commute", "title");
            paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder( valsPm1[0]+ "% of workers living in the El Paso MPO area reported to drive alone during their commute to work," 
             +"therefore only "+ valsPm1[1]+"% of workers commute via non-SOV modes, which includes carpooled via car, truck, or van. Workers"
             +"used Public Transport means such as bus or trolley bus, streetcar or trolley car, subway or elevated railroad, railroad,"
             +" and ferryboat. Some workers also used a taxicab, motorcycle, bicycle, walking, and other means to go to work or they worked"
             +" at home. …","paragraph","summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("2012-2016 5-year average estimates", "paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            anchorAdder("American Community Survey 5-Year Estimates","https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2018.html");
            anchorAdder("TIGER/Line Shapefiles and TIGER/Line Files ","https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-data.2016.html");
			paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("PM1 is calculated as:", "paragraph", "calc-info");
            imageAdder('./img/performance_measures/pm1/pm1Eqn.PNG','calc-info');
            openNav();
         //PM2 starts here   
        }else if(var1 == 'transitWC' || var1 == 'walkingWC' || var1 == 'BikingWC' || buttonValue == 'transitWC' || buttonValue == 'walkingWC'||buttonValue == 'BikingWC') {
            // No Clean() call needed
            canvasMaker('chart1/2','myChart');
            canvasMaker('chart2/2','myChart2');
            var ctx = document.getElementById('myChart').getContext('2d');
            var ctx2 = document.getElementById('myChart2').getContext('2d');
            pm2chart2(ctx2);
     
            if(var1 == 'transitWC' || buttonValue == 'transitWC'){
                pm2chart1(ctx, count_list);
                headerAdder("Percent of Workers Commuting by Transit", "title");
            }else if(var1 == 'walkingWC'|| buttonValue ==  'walkingWC'){
                pm2chart1(ctx, count_list);
                headerAdder("Percent of Workers Commuting by Walking", "title");
            }else{
                pm2chart1(ctx, count_list);
                headerAdder("Percent of Workers Commuting by Biking", "title");
            }

            paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder("During 2012-2016 "+ valuesPm2[1]  +"% of workers living in the El Paso MPO area reported to walk to work, "+valuesPm2[1]+"% of workers bike, and "+ valuesPm2[0]+ "% of workers reported to commute by public transit. ", "paragraph", "summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("2012-2016 5-year average estimates", "paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            anchorAdder("American Community Survey 5-Year Estimates","https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-data.2016.html");
            anchorAdder("TIGER/Line Shapefiles","https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2018.html");
			paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
            imageAdder('./img/performance_measures/pm2/transEqn.PNG','calc-title');
            imageAdder('./img/performance_measures/pm2/walkEqn.PNG','calc-title');
            imageAdder('./img/performance_measures/pm2/bikingEqn.PNG','calc-title');

            //Legend elements
            let names = ['No Data','Below mean','Above Mean'];
            let colors = ['background:#C0C0C0;','background:#00CCFF;','background:#0066CC;'];
            legendMaker("Legend",names,colors);
            openNav();

            no_data_num = 0;
            low_num = 0;
            high_num = 0;
            count_list[0] = 0; count_list[1] = 0; count_list[2] = 0;

        } else if(buttonValue == 'pmbridge'){
            clean();
            console.log('testing Bridges num');
            canvasMaker('chart1/2','myChart');
            canvasMaker('chart2/2','myChart2');
            var ctx = document.getElementById('myChart').getContext('2d');
            var ctx2 = document.getElementById('myChart2').getContext('2d');
            chart1(ctx); 
            chart2(ctx2);
            headerAdder("Bridge Condition", "title");
	        paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder("Within the Texas portion of the El Paso MPO area, there are " + pm26TX[0] + " bridges("+ pm26PrctTX[0]+ "%) in Good condition, "+pm26TX[1] + " bridges("+pm26PrctTX[1]+"%) in Fair condition, "+  pm26TX[2]+" bridges("+  pm26PrctTX[2]+"%) in Poor condition.", "paragraph", "summary-info");
            paragraphAdder("Within the New Mexico portion of the El Paso MPO area, there are " + pm26NM[0]+ " bridges("+pm26PrctNM[0]+"%) in Good conditions, "+ pm26NM[1] +" bridges("+pm26PrctNM[1]+"%) in Fair condition, "+pm26NM[2]+" bridge("+pm26PrctNM[2]+"%) in Poor condition.", "paragraph", "summary-info");
            paragraphAdder("Condition data was not available for "+ pm26P[5] + " bridges within the El Paso MPO area.", "paragraph", "summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("Bridges condition data as of 2018", "paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            paragraphAdder("Bridge condition data was provided by TxDOT and NMDOT.", "paragraph", "data-info");
            paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("Bridge condition rating is based on the lowest condition rating from the following components: deck, substructure, superstructure or culvert.", "paragraph", "calc-info");
            paragraphAdder("Following the FHWA guidance, bridges with lowest rating between 7 and 9 are classified as Good, those rated 6 or 5 are classified as Fair and bridges with lowest rating 4 or below are classified as Poor.", "paragraph", "calc-info");
            paragraphAdder("More information about Bridge Condition Performance can be found at this TxDOT website: ", "paragraph", "calc-info");
            anchorAdder(1,"https://gis-txdot.opendata.arcgis.com/datasets/83af0d2957ca4c2eb340e4bd04a1046f_0/data?geometry=-134.852%2C24.539%2C-65.287%2C37.659");
            openNav();
	    }else if(buttonValue == 'PM5'){
            clean();
            canvasMaker('chart1','myChart');
            var ctx = document.getElementById('myChart').getContext('2d');
            pm5chart(ctx);
            headerAdder("Percent of jobs within ½ mile of high-quality rapid transit", "title");
	        paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder("In the El Paso MPO region, there are a total of "+commafy(pm5TxtData.jobs)+" jobs. In a half-mile of high-quality rapid transit, there are a total of __  (__%) jobs.  Once all proposed high-quality rapid transit stations are complete, there will be a total of __  (__%)  jobs within a half-mile of high-quality rapid transit.", "paragraph", "summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("Data from 2015 LEHD files, 2017 Tigerline shapefile, bikeway data from 2018. ", "paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            anchorAdder(1,"https://gis-txdot.opendata.arcgis.com/datasets/83af0d2957ca4c2eb340e4bd04a1046f_0/data?geometry=-134.852%2C24.539%2C-65.287%2C37.659");
            paragraphAdder("TIGER/Line Shapefiles & Longitudinal Employer-Household Dynamics (LEHD) files.", "paragraph", "data-info");
            paragraphAdder("The layer of the high-quality transit stations was provided by Sun Metro.  ", "paragraph", "data-info");
            paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("LEHD worskplace area characteristics (WAC) data was analysed on a census block group-level in order to estimate the population within ½ mile of high-quality rapid transit, assuming a homogenous distribution of population each the block group.", "paragraph", "calc-info");
            openNav();
        }else if(buttonValue == 'PM9'){
            clean();
            canvasMaker('chart1','myChart');
            var ctx = document.getElementById('myChart').getContext('2d');
            pm9chart(ctx);
            headerAdder("Percent of jobs within ½ mile of high-quality rapid transit", "title");
	        paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder("In the El Paso MPO region, there are a total of _ jobs. In a half-mile of high-quality rapid transit, there are a total of __  (__%) jobs.  Once all proposed high-quality rapid transit stations are complete, there will be a total of __  (__%)  jobs within a half-mile of high-quality rapid transit.", "paragraph", "summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("Data from 2015 LEHD files, 2017 Tigerline shapefile, bikeway data from 2018. ", "paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            paragraphAdder("TIGER/Line Shapefiles & Longitudinal Employer-Household Dynamics (LEHD) files.", "paragraph", "data-info");
            paragraphAdder("The layer of the high-quality transit stations was provided by Sun Metro.  ", "paragraph", "data-info");
            paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("LEHD worskplace area characteristics (WAC) data was analysed on a census block group-level in order to estimate the population within ½ mile of high-quality rapid transit, assuming a homogenous distribution of population each the block group.", "paragraph", "calc-info");
            openNav();

        }else if(buttonValue == 'PM3'){
            clean();
            headerAdder("Transit ridership", "title");
	        paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder("The routes with most ridership in the city are mainly the ones that go from the far places (Eastside, North and Westside) to downtown. The route "+commafy(pm3TextData.highRoute)+" has the highest ridership with an average of "+commafy(pm3TextData.highAvg)+". The route "+pm3TextData.lowRoute+" has the lowest ridership with an average of "+commafy(pm3TextData.lowAvg)+".", "paragraph", "summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("2014-2018", "paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            paragraphAdder("Data provided by Sun Metro", "paragraph", "data-info");
            paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("The received data was separated by years and routes. The average of the 5 years was calculated to create the symbology; 2,777-107,272 (Green), 107,272-388,321 (Orange), 388,321-1,144,232 (Red). Since Sun Metro stopped using route 204 in 2014 data was not included. Route 205 from BRIO was included in the map. ", "paragraph", "calc-info");
            openNav();
            names = ['2,777 - 107,272','107,273 - 388,321','388,321 - 1,144,232'];
            colors = ['background:#8BC34A;','background:#FFCA28;', 'background:#f44336','background:#e53935;'];
            legendMaker("Legend", names, colors);

        }else if(buttonValue == 'PM7'){
            clean();
            canvasMaker('chart1','myChart');
            canvasMaker('chart2','myChart2');
            var ctx = document.getElementById('myChart').getContext('2d');
            var ctx2 = document.getElementById('myChart2').getContext('2d');
            pm7HorizontalBar(ctx);
            pm7HorizontalBar(ctx2);
            headerAdder("key destinations within ½ mile of high-quality rapid transit", "title");
	        paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder("In the El Paso MPO region, there are a total of _ key destinations. In a half-mile of existing high-quality rapid transit stations, there are a total of __  (__%) key destinations.  Once all proposed high-quality rapid transit stations are complete, there will be a total of __  (__%)  key destinations within a half-mile of high-quality rapid transit.  ", "paragraph", "summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("Data was provided by various local agencies in 2018", "paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            paragraphAdder("Bikeway data was provided by the municipalities: Paso del Norte Health foundation, City of Sunland Park, City of San Elizario, and the City of El Paso. Key destinations were identified from the EPMPO 2040 Horizon Model – Model Development Report and leisure time activity locations were identified from Visit El Paso website.  ", "paragraph", "data-info");
            paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("A ½ mile buffer was drawn around existing high-quality rapid transit and the number of key destinations within the buffer was calculated. This analysis was also done for proposed high-quality rapid transit, to indicate the potential result if all high-quality rapid transit in existing plans were completed.", "paragraph", "calc-info");
            openNav();

        }else if(buttonValue == 'PM6'){
            clean();
            canvasMaker('chart1','myChart');
            var ctx = document.getElementById('myChart').getContext('2d');
            pm5chart(ctx);
            headerAdder("Percent of jobs within ½ mile of bikeways ", "title");
	        paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder("In the El Paso MPO region, there are a total of _ jobs. In a half-mile of existing bikeways, there are a total of __  (__%) jobs.  Once all proposed bikeways are completed, there will be a total of __  (__%)  jobs within a half-mile of bikeways.   ", "paragraph", "summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("Data from 2015 LEHD files, 2017 Tigerline shapefile, bikeway data from 2018. ", "paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            anchorAdder("TIGER/Line Shapefiles","https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2018.html");
            anchorAdder("Longitudinal Employer-Household Dynamics (LEHD) files","https://lehd.ces.census.gov/data/");
            paragraphAdder("Bikeway data was provided by the following entities in January 2019: Paso del Norte Health foundation, City of Sunland Park, City of San Elizario, and the City of El Paso.", "paragraph", "data-info");
            paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("LEHD workplace area characteristics (WAC) data was analysed on a census block group-level in order to estimate the number of jobs within a ½ mile from a bikeway, assuming a homogenous distribution of jobs each the block group", "paragraph", "calc-info");
            openNav();
        }else if(buttonValue == 'PM10'){
            clean();
            canvasMaker('chart1','myChart');
            var ctx = document.getElementById('myChart').getContext('2d');
            pm5chart(ctx);
            headerAdder("Percent of population within ½ mile of bikeways ", "title");
	        paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder("There are _ people residing in the El Paso MPO region. There are __  (__%)  people living within a half-mile of existing bikeways.  Once all proposed bikeways are complete, there will be a total of __  (__%)  people living within a half-mile of bikeways. ", "paragraph", "summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("Data from 2015 LEHD files, 2012-2016 ACS data, bikeway data from 2018.", "paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            anchorAdder("American Community Survey 5-Year Estimates","https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-data.2016.html");
            anchorAdder("TIGER/Line Shapefiles ","https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2018.html");
            paragraphAdder("Bikeway data was provided by the municipalities: Paso del Norte Health foundation, City of Sunland Park, City of San Elizario, and the City of El Paso.  ", "paragraph", "data-info");
            paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("American Community Survey data was analysed on a census block group-level in order to estimate the number of jobs within a ½ mile from a bikeway, assuming a homogenous distribution of jobs each the block group. ", "paragraph", "calc-info");
            openNav();
        }
        else if(buttonValue == 'pm18Driving' || buttonValue == 'pm18Freight' || buttonValue == 'pm18Walking' || buttonValue == 'pm18Biking'){
            clean();
            pm18_pm19_Data_Texas();
            canvasMaker('chart1/2','myChart');
            canvasMaker('chart2/2','myChart2');
            var ctx = document.getElementById('myChart').getContext('2d');
            var ctx2 = document.getElementById('myChart2').getContext('2d');
            pm18StackedChart(ctx2);

            paragraphAdder("Summary:", "subtitle", "summary-title");
         
            if(buttonValue == 'pm18Driving'){
                headerAdder("Number of Fatalities - Driving", "title");
                paragraphAdder("During a 5-year period (2013-2017), a total of " +  pm18Calculations.totalCarCrashes + " crashes occurred in the El Paso MPO region and " + pm18Calculations.drivingDeathRate.toFixed(3) + "% of those crashes resulted in fatalities. "+ pm18Calculations.Driving +" people were killed.", "paragraph", "summary-info");
                pm18chartLine(ctx,'D'); 
            }
            else if(buttonValue == 'pm18Freight'){
                headerAdder("Number of Fatalities - Freight", "title");
                paragraphAdder("During a 5-year period (2013-2017), a total of " + pm18Calculations.totalFreightCrashes + " crashes that involved a commercial motor vehicle (CMV) occurred in the El Paso MPO region and " + pm18Calculations.freightDeathRate.toFixed(3) + "% of those crashes resulted in fatalities. " + pm18Calculations.freightTotalFatalities + " people were killed in CMV-related crashes. ", "paragraph", "summary-info");
                pm18chartLine(ctx,'F'); 
            }
            else if(buttonValue == 'pm18Walking'){
                headerAdder("Number of Fatalities - Walking", "title");
                paragraphAdder("During a 5-year period (2013-2017), a total of " + pm18Calculations.totalWalkingCrashes + " crashes that involved a pedestrian occurred in the El Paso MPO region and " + pm18Calculations.walkingDeathRate.toFixed(3)  + "% of those crashes resulted in fatalities. " + pm18Calculations.walkingTotalFatalities +" pedestrians were killed.", "paragraph", "summary-info");
                pm18chartLine(ctx,'W'); 
            }
            else if(buttonValue == 'pm18Biking'){
                headerAdder("Number of Fatalities - Biking", "title");
                paragraphAdder("During a 5-year period (2013-2017), a total of " + pm18Calculations.totalBikingCrashes + " crashes that involved a bicyclist occurred in the El Paso MPO region and "+ pm18Calculations.bikingDeathRate.toFixed(3)  +" of those crashes resulted in fatalities. " + pm18Calculations.bikingTotalFatalities + " bicyclists were killed.", "paragraph", "summary-info");
                pm18chartLine(ctx,'B'); 
            }
           
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("2013 – 2017", "paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            paragraphAdder("Crash data provided by TxDOT and NMDOT.", "paragraph", "data-info");
            paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("The total number of crashes includes crashes of all severities: fatal, suspected serious injury, non-incapacitating injury, possible injury, and non-injury*. ", "paragraph", "calc-info");
            paragraphAdder("*Note: Crash severities classified by TxDOT as ‘non-injury’ or ‘unknown injury’ are here shown as ‘non-injury’. Crash severity classified by NMDOT as ‘unhurt’ is shown here as ‘non-injury’. ", "paragraph", "calc-info");
   
   
            openNav();
	    }else if(buttonValue == 'pm19Driving' || buttonValue == 'pm19Freight' || buttonValue == 'pm19Walking' || buttonValue == 'pm19Biking'){
            clean();
            pm18_pm19_Data_Texas();
            canvasMaker('chart1/2','myChart');
            canvasMaker('chart2/2','myChart2');
            var ctx = document.getElementById('myChart').getContext('2d');
            var ctx2 = document.getElementById('myChart2').getContext('2d');
            pm18StackedChart(ctx2); 
            if(buttonValue == 'pm19Driving'){
                headerAdder("Number serious injuries - Driving", "title");
                paragraphAdder("During a 5-year period (2013-2017), a total of " +  pm18Calculations.totalCarCrashes + " crashes occurred in the El Paso MPO region and __ (__%)of those crashes resulted in serious injuries. " + pm19Calculations.Driving +  " people were seriously injured.", "paragraph", "summary-info");
                pm19chartLine(ctx, 'D');
            }
            else if(buttonValue == 'pm19Freight'){
                headerAdder("Number serious injuries - Freight", "title");
                paragraphAdder("During a 5-year period (2013-2017), a total of " + pm18Calculations.totalFreightCrashes + " crashes that involved a commercial vehicle occurred in the El Paso MPO region and __ (__%) of those crashes resulted in serious injuries. __ people were seriously injured in commercial vehicle-related crashes.", "paragraph","summary-info");
                pm19chartLine(ctx, 'F');
            }
            else if(buttonValue == 'pm19Walking'){
                headerAdder("Number serious injuries - Walking", "title");
                paragraphAdder("During a 5-year period (2013-2017), a total of " + pm18Calculations.totalWalkingCrashes + " crashes that involved a pedestrian occurred in the El Paso MPO region and __ (__%) of those crashes resulted in serious injuries. __ pedestrians were seriously injured.", "paragraph", "summary-info");
                pm19chartLine(ctx, 'W');
            }
            else if(buttonValue == 'pm19Biking'){
                headerAdder("Number serious injuries - Biking", "title");
                paragraphAdder("During a 5-year period (2013-2017), a total of " + pm18Calculations.totalBikingCrashes + " crashes that involved a bicyclist occurred in the El Paso MPO region and __ (__%) of those crashes resulted in serious injuries. __ bicyclits were seriously injured.", "paragraph", "summary-info");
                pm19chartLine(ctx, 'B');

            }
	        paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("2013 – 2017", "paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            paragraphAdder("Crash data provided by TxDOT and NMDOT.", "paragraph", "data-info");
            paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("The total number of crashes includes crashes of all severities: fatal, suspected serious injury, non-incapacitating injury, possible injury, and non-injury*.", "paragraph", "calc-info");
            paragraphAdder("*Note: Crash severities classified by TxDOT as ‘non-injury’ or ‘unknown injury’ are here shown as ‘non-injury’. Crash severity classified by NMDOT as ‘unhurt’ is shown here as ‘non-injury’. ", "paragraph", "calc-info");
            openNav();
            
	    }else if(buttonValue == 'pm22Driving'){
            clean();
            pm18_pm19_Data_Texas();
            canvasMaker('chart1/2','myChart');
            canvasMaker('chart2/2','myChart2');
            var ctx = document.getElementById('myChart').getContext('2d');
            var ctx2 = document.getElementById('myChart2').getContext('2d');
            pm22chartLine(ctx); 
            pm18StackedChart(ctx2); 

            headerAdder("Number of crashes on the CMP network", "title");
	        paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(pm22Text) + " crashes occurred on the El Paso MPO Congestion Management Process (CMP) network.", "paragraph", "summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("2013 – 2017", "paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            paragraphAdder("Crash data provided by TxDOT and NMDOT.", "paragraph", "data-info");
            paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("This performance measures includes all crashes that occurred within 150 ft. of the CMP network adopted by the MPO in 2019.  ", "paragraph", "calc-info");
            openNav();

        }else if(buttonValue == 'pm8Biking'){
            clean();
            canvasMaker('chart1','myChart');
            canvasMaker('chart2','myChart2');
            var ctx = document.getElementById('myChart').getContext('2d');
            var ctx2 = document.getElementById('myChart2').getContext('2d');
            pm8HorizontalBar(ctx);
            pm8HorizontalBar2(ctx2);

            headerAdder("Key Destinations in the El Paso MPO Region ", "title");
	        paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder(" In the El Paso MPO region, there are a total of _ key destinations. In a half-mile of existing bikeways, there are a total of __  (__%) key destinations.  Once all proposed bikeways are complete, there will be a total of __  (__%)  key destinations within a half-mile of bikeways. ", "paragraph", "summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("Data was provided by various local agencies in 2018 ", "paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            paragraphAdder("Crash data provided by TxDOT and NMDOT.", "paragraph", "data-info");
            paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("A ½ mile buffer was drawn around existing bikeways and the number of key destinations within the buffer was calculated. This analysis was also done for proposed bikeways, to indicate the potential result if all bikeways in existing plans were completed.", "paragraph", "calc-info");
            openNav();       

        }else if(buttonValue == 'pm15Driving' || buttonValue == 'pm16Driving'  || buttonValue == 'pm17Driving' ){
            pm15_handler(); // for pm 15 to pm 17
            clean();
            canvasMaker('chart1','myChart');
            var ctx = document.getElementById('myChart').getContext('2d');
            if(buttonValue == 'pm15Driving'){
                canvasMaker('chart2','myChart2');
                var ctx2 = document.getElementById('myChart2').getContext('2d');
                pm15chartLine(ctx) 
                pm15chartLine2(ctx2);
                headerAdder("Ozone Emissions ", "title");      
            }else if(buttonValue == 'pm16Driving'){
                pm16chartLine(ctx) 
                headerAdder("Carbon Monoxide Emissions (2014-2018)", "title");
            }else if(buttonValue == 'pm17Driving'){
                pm17chartLine(ctx) 
                headerAdder("Particulate Matter Emissions(2014-2018)", "title");
            }
            paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder("According to the data available, ozone, carbon monoxide, and particulate matter pollution has been increasing in the last 5 years.", "paragraph", "summary-info");
            paragraphAdder("Stations with the highest annual readings for each pollutant are:" ,"paragraph", "summary-info");
            paragraphAdder("Ozone 8hr – El Paso Chamizal in 2018,", "paragraph", "summary-info");
            paragraphAdder("Ozone 1hr – Santa Teresa in 2017,", "paragraph", "summary-info"); 
            paragraphAdder("Particulate Matter – Desert View in 2016", "paragraph", "summary-info"); 
            paragraphAdder("Carbon Monoxide – El Paso UTEP in 2018.", "paragraph", "summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("2014-2018", "paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            paragraphAdder("Texas Commission on Environmental Quality website and New Mexico Environment Department website", "paragraph", "data-info");
            paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("Annual readings are reported exactly as they appear at Texas Commission on Environmental Quality website and New Mexico Environment Department website. In Texas 8-hour ozone standard is reported, in NM only 1-hour ozone standard was available. Carbon monoxide and particulate matter (PM10) are also reported.", "paragraph", "calc-info");
            paragraphAdder("*Note: Not all monitors collected data for all three pollutants, also not all monitors have data for the full 5-year period.","paragraph", "calc-info");
            openNav();
        }else if(buttonValue == 'pm13Driving' || buttonValue == 'pm13Freight' || buttonValue == 'pm13Walking' || buttonValue == 'pm13Biking'){
            clean();
            canvasMaker('chart1','myChart');
            canvasMaker('chart2','myChart2');
            var ctx = document.getElementById('myChart').getContext('2d');
            var ctx2 = document.getElementById('myChart2').getContext('2d');
            headerAdder("Northbound Border Crossings", "title");
            paragraphAdder("Summary:", "subtitle", "summary-title");
            if(buttonValue == 'pm13Driving'){
                paragraphAdder("During a 5-year period (2014-2018), on average " + commafy(pm13Calculations.average) +" personal vehicles crossed northbound at the ports of entry. The port of entry with highest personal vehicle traffic is " + pm13Calculations.portWithHighestTrafficName + ".", "paragraph", "summary-info");
                pm13DrivingChart(ctx); 
            }
            else if(buttonValue == 'pm13Freight'){
                paragraphAdder("During a 5-year period (2014-2018), on average " + commafy(pm13Calculations.avgFreight) + " commercial vehicles crossed northbound at the ports of entry. The port of entry with highest commercial vehicle traffic is "+ pm13Calculations.portWithHighestTrafficNameFreight + ".", "paragraph", "summary-info");
                pm13FreightChart(ctx);  
            }
          
            else if(buttonValue == 'pm13Walking'){
                paragraphAdder("During a 5-year period (2014-2018), on average " +  commafy(pm13Calculations.avgWalking) + " pedestrians crossed northbound at the ports of entry. The port of entry with highest pedestrian traffic is "+ pm13Calculations.portWithHighestTrafficNameWalking + ".", "paragraph", "summary-info");
                pm13WalkingChart(ctx);  
            }
            pm13ModeGraph(ctx2);
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("2014-2018", "paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            paragraphAdder("Customs and Border Protection, compiled by the City of El Paso International Bridges Department.", "paragraph", "data-info");
            paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("These statistics were obtained from the City of El Paso International Bridges Department. In this context, pedestrians include people walking or bicycling.", "paragraph", "calc-info");
            openNav();
        } else if(buttonValue == 'pm14Driving' || buttonValue == 'pm14Freight' || buttonValue == 'pm14Walking'){
            clean();
            canvasMaker('chart1','myChart');
            var ctx = document.getElementById('myChart').getContext('2d');
            headerAdder("Northbound border wait times", "title");
            paragraphAdder("Summary:", "subtitle", "summary-title");
            if(buttonValue == 'pm14Driving'){
                paragraphAdder("In 2018  the average wait time for personal vehicles crossing northbound at the ports of entry was " +  pm14Calculations.vehAvgTime +  " minutes. The port of entry with highest wait time for personal vehicles in 2018 was "+pm14Calculations.vehHighestWait+".", "paragraph", "summary-info");
                pm14DrivingChart(ctx);
                
            }
            else if(buttonValue == 'pm14Freight'){                
                paragraphAdder("In 2018  the average wait time for commercial vehicles crossing northbound at the ports of entry was "+ pm14Calculations.freightAvgTime+" minutes. The port of entry with highest wait time for commercial vehicles in 2018 was "+ pm14Calculations.freightHigherstWait+".", "paragraph", "summary-info");
                pm14FreightChart(ctx);
            }
          
            else if(buttonValue == 'pm14Walking'){
                paragraphAdder("In 2018  the average wait time for pedestrians crossing northbound at the ports of entry was "+ pm14Calculations.WalkAvgTime +" minutes. The port of entry with highest wait time for pedestrians in 2018 was "+  pm14Calculations.walkHighestWait +".", "paragraph", "summary-info");
                pm14WalkingChart(ctx);
            }
            
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("2014-2018", "paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            paragraphAdder("Customs and Border Protection, compiled by the City of El Paso International Bridges Department.", "paragraph", "data-info");
            paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("These statistics were obtained from the City of El Paso International Bridges Department. These wait times were estimated based on the queue length from the end of the line to primary inspection. In this context, pedestrians include people walking or bicycling.", "paragraph", "calc-info");
            openNav();
        }
        else if(buttonValue == 'pm4Biking'){
            clean();
            headerAdder("Number of Biking Trips Recorded by Strava", "title");
            paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder("In 2018, a total of "+pm4Txt+" bike trips were recorded by Strava in the El Paso MPO region. ", "paragraph", "summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("2018 data licensed by Strava","paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            paragraphAdder("Strava Metro data provided via a sublicense from the Texas Department of Transportation.", "paragraph", "data-info");
            paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("This performance measure reflects the total number of bike trips on the street regardless of the direction (column TACTCNT) recorded by Strava in 2018. Trips recorded on Interstate 10 were removed from this dataset, since I-10 is a limited access facility. The legend shows the data in a geometric interval, which provides the best viewing distribution.", "paragraph", "calc-info");
            names = ['5.00 - 30.23','30.24 - 479.04','479.05 - 6,460.00'];
            colors = ['background:#f44336;','background:#64DD17;', 'background:#9C27B0','background:#e53935;'];
            legendMaker("Legend",names,colors);
            openNav();
        }
       
        else if (buttonValue == 'pm4Walking'){
            clean();
            headerAdder("Number of Walking Trips Recorded by Strava", "title");
            paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder("In 2017, a total of "+pm4WTxt+" walk trips were recorded by Strava in the El Paso MPO region. ", "paragraph", "summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("2017 data from Strava Metro.", "paragraph", "analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            paragraphAdder("Strava Metro (2017) provided via a sublicense from the Texas Department of Transportation.", "paragraph", "data-info");
            paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("This performance measure reflects the total number of walk trips on the street regardless of the direction (column TACTCNT) recorded by Strava in 2017. Trips recorded on the Interstate 10 were removes from this dataset, since I-10 is a limited access facility. The legend shows the data in a geometric interval, which provides the best viewing distribution.", "paragraph", "calc-info");
            names = ['5.00 - 15','16 - 129','130 -1,305'];
            colors = ['background:#f44336;','background:#64DD17;', 'background:#9C27B0','background:#e53935;'];
            legendMaker("Legend",names,colors);
            openNav();
           
        }
        else if(buttonValue == 'pm11Walking'){
            clean();
            headerAdder("Length of Sidewalks per Mile", "title");
            paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder("There are a total of "+ pm11Slength.toFixed(2) +" miles of sidewalks along 2,692.873 miles of roadways within the City of El Paso city limits. Assuming that each roadway has a sidewalk on both sides, there are 2,373.390 miles of sidewalks missing.","paragraph","summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("Sidewalk GIS layer was provided in 2018","paragraph","analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            paragraphAdder("City of El Paso","paragraph","data-info");
            paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("Mileage of roadway network (stcent, without limited access roadways such as the Interstate 10, US 54, Loop 375, Cesar Chavez Memorial Highway, Spur 601) was compared with mileage of sidewalks. Only sidewalks with status ‘complete’, ‘pre-existing’, ‘private’ or ‘scheduled’ were included in the analysis. Sidewalks with no information about status, or status ‘removed’, ‘unfeasible’, or ‘awaiting assessment’ were not included in this performance measure. ","paragraph","calc-info");
            paragraphAdder("Note: A GIS sidewalk layer was at the time of analysis available only from the City of El Paso. GIS data from other municipalities will be added as it becomes available.","paragraph","calc-info");
            openNav();
        }
        else if(buttonValue == 'pm12Biking'){
            clean();
            headerAdder("Bikeway Buildout", "title");
            canvasMaker('chart1','myChart');
            var ctx = document.getElementById('myChart').getContext('2d');
            pm12StackedChart(ctx);
            paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder("In the El Paso MPO region, there are a total of "+ pm12Info.pm12existing.toFixed(2)+" miles of existing bikeways. There are "+ pm12Info.pm12proposed.toFixed(2)+" miles of proposed bikeways. If all proposed bikeways are completed, there would be a total of "+ pm12Info.tot.toFixed(2) +" miles in the El Paso MPO region.","paragraph","summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("2018 bikeway data provided.","paragraph","analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            paragraphAdder("Bikeway data was provided by the municipalities: Paso del Norte Health foundation, City of Sunland Park, City of San Elizario and the City of El Paso. ","paragraph","data-info");
            paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("The data inside the layer package had contained columns that have its status, proposed or existing, which were filtered to make a distinction between the two. The files containing existing bikeways were placed into a new, individual layer. The miles were then calculated for both existing and all bikeways.","paragraph","calc-info");
            openNav();
        }
        else if(buttonValue == 'pm20B' || buttonValue == 'pm20P'){
            clean();
            if(buttonValue == 'pm20B'){
                 headerAdder("Number of crashes between motorized vehicles and bicyclists nearby bus stops.", "title");
            }else{
                  headerAdder("Number of crashes between motorized vehicles and pedestrians nearby bus stops.", "title");
            }
          
            paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder(pm20_P.pedTxt + "% of all pedestrian crashes and "+ pm20_B.bikeTxt +"% of all bicycle crashes in El Paso region occurred within 200 feet of transit stops. Majority of the crashes near bus stops occurred in downtown area, Mesa St. Dyer St. and Hondo Pass. The highest observed number of crashes within 200 ft. from a bus stop is "+pm20_P.highCrashNum+" for pedestrian (on "+pm20_P.highCrashAdd +") and "+pm20_B.highCrashNum+" for bicycle ("+pm20_B.sameCrashNum+" locations have the same number).","paragraph","summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("Crashes 2013-2017, SunMetro bus stops as of 2019","paragraph","analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            paragraphAdder("Crash data from TxDOT, location of bus stops from Sun Metro ","paragraph","data-info");
            paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("A buffer of 200 ft. was created from the bus stops to identify how many crashes occurred within that distance. The crashes are from 2013 to 2017, and the bus stop locations are as of 2019.","paragraph","calc-info");
           //Legend elements
            names = ['1','2-3','4-6','7-12',];
            colors = ['background:#388E3C;','background:#FFEB3B;', 'background:#E040FB','background:#e53935;'];
            legendMaker("Legend", names, colors);
            openNav();
        }  
        else if(buttonValue == 'pm21Driving'){
            clean();
            headerAdder("Number of projects that include safety enhancements located near crash hotspots.", "title");
            paragraphAdder("Summary:", "subtitle", "summary-title");

            paragraphAdder("► Project C035X. Hot-spot type: Persistent.","paragraph","summary-info");
            paragraphAdder("► Project P402X-05A. Hot-spot type: Persistent.","paragraph","summary-info");
            paragraphAdder("► Project P464X-CAP. Hot-spot type: Persistent.","paragraph","summary-info");
            paragraphAdder("► Project F057X-CAP. Hot-spot type: Persistent.","paragraph","summary-info");
            paragraphAdder("► Project F405X-CAP. Hot-spot type: Persistent.","paragraph","summary-info");
            paragraphAdder("► Project A136X-CAP. Hot-spot type: Persistent","paragraph","summary-info");
            paragraphAdder("► Project F407A-CAP. Hot-spot type: Persistent.","paragraph","summary-info");
            paragraphAdder("► Project F407B-CAP. Hot-spot type: Persistent.","paragraph","summary-info");
            paragraphAdder("► Project F058X-CAP. Hot-spot type: Persistent. ","paragraph","summary-info");
            paragraphAdder("► Project F407C. Hot-spot type: Persistent.","paragraph","summary-info");
            paragraphAdder("► Project I061X-CAP. Hot-spot type: Persistent.","paragraph","summary-info");
            paragraphAdder("► Project P002X-CAP. Hot-spot type: Persistent.","paragraph","summary-info");
            paragraphAdder("► Project P533X. Hot-spot type: Persistent.","paragraph","summary-info");
            paragraphAdder("► Project T069X. Hot-spot type: Persistent, New, Intensifying.","paragraph","summary-info");
            paragraphAdder("► Project P428X-MOD. Hot-spot type: Persistent, New, Oscillating.","paragraph","summary-info");
            paragraphAdder("► Project P428X-CAP-2. Hot-spot type: Persistent, Intensifying.","paragraph","summary-info");
            paragraphAdder("► Project P428X-CAP-2. Hot-spot type: Persistent, Intensifying.","paragraph","summary-info");
            paragraphAdder("► Project M087B. Hot-spot type: Persistent, Intensifying","paragraph","summary-info");
            paragraphAdder("► Project R307D. Hot-spot type: Persistent, Intensifying","paragraph","summary-info");
            paragraphAdder("► Project I063X-CAP. Hot-spot type: Persistent, Intensifying. ","paragraph","summary-info");
            paragraphAdder("► Project P530X-MOD. Hot-spot type: Persistent, Intensifying.","paragraph","summary-info");
            paragraphAdder("► Project M025B. Hot-spot type: Persistent, Intensifying, Oscillating. ","paragraph","summary-info");
            paragraphAdder("► Project M087A. Hot-spot type: Persistent, Intensifying, Oscillating. ","paragraph","summary-info");
            paragraphAdder("► Project M090X. Hot-spot type: Persistent, Intensifying, Oscillating. ","paragraph","summary-info");
            paragraphAdder("► Project F056X-CAP. Hot-spot type: Persistent, Oscillating.","paragraph","summary-info");
            paragraphAdder("► Project I406X-CAP. Hot-spot type: Persistent, Oscillating.","paragraph","summary-info");
            paragraphAdder("► Project P410X-15A. Hot-spot type: Persistent, Oscillating.","paragraph","summary-info");
            paragraphAdder("► Project E304X. Hot-spot type: Intensifying.","paragraph","summary-info");
            paragraphAdder("► Project E303X. Hot-spot type: Intensifying.","paragraph","summary-info");
            paragraphAdder("► Project M089A. Hot-spot type: Intensifying.","paragraph","summary-info");
            paragraphAdder("► Project B300X. Hot-spot type: Intensifying.","paragraph","summary-info");
            paragraphAdder("► Project B301X. Hot-spot type: Intensifying.","paragraph","summary-info");
            paragraphAdder("► Project E302X-1. Hot-spot type: Intensifying.","paragraph","summary-info");
            paragraphAdder("► Project E302X-2. Hot-spot type: Intensifying.","paragraph","summary-info");
            paragraphAdder("► Project F060X. Hot-spot type: Intensifying.","paragraph","summary-info");
            paragraphAdder("► Project P334X. Hot-spot type: Intensifying.","paragraph","summary-info");
            paragraphAdder("► Project I006X-15A. Hot-spot type: Intensifying.","paragraph","summary-info");
            paragraphAdder("► Project A434X-CAP. Hot-spot type: Oscillating.","paragraph","summary-info");
            paragraphAdder("► Project I405X-CAP. Hot-spot type: Oscillating.","paragraph","summary-info");

            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("Crash data from 2013-2017, safety projects identified from the Metropolitan Transportation Plan Destino 2045","paragraph","analysis-info");

            paragraphAdder("Data Source:", "subtitle", "data-title");
            paragraphAdder("Crash data provided by TxDOT and NMDOT. Destino 2045 projects identified by El Paso MPO.","paragraph","data-info");
           
            paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("Most of the projects in the map were obtained from Alliance. ","paragraph","calc-info");
            paragraphAdder("Most of the projects are represented as lanes in the maps, and three of them are represented as a point, those are: C035X, P333X and P334X.","paragraph","calc-info");
            paragraphAdder("There is no layer for safety projects in Dona Ana and Otero counties, just the crash hotspots was calculated.","paragraph","calc-info");
            paragraphAdder("Space-Time Analysis was made to identify the crash hot spots which classified as follows:","paragraph","calc-info");
            paragraphAdder("Space-Time Analysis was made to identify the crash hot spots which classified as follows:","paragraph","calc-info");
            paragraphAdder("► Persistent: \“A location that has been a statistically significant hot spot for ninety percent of the time-step intervals with no discernible trend indicating an increase or decrease in the intensity of clustering over time”\ (ArcGIS).","paragraph","calc-info");
            paragraphAdder("► New: \“A location that is a statistically significant hot spot for the final time step and has never been a statistically significant hot spot before”\ (ArcGIS). ","paragraph","calc-info");
            paragraphAdder("► Intensifying: \“A location that has been a statistically significant hot spot for ninety percent of the time-step intervals, including the final time step. In addition, the intensity of clustering of high counts in each time step is increasing overall and that increase is statistically significant”\ (ArcGIS).","paragraph","calc-info");
            paragraphAdder("► Oscillating: \“A statistically significant hot spot for the final time-step interval that has a history of also being a statistically significant cold spot during a prior time step. Less than ninety percent of the time-step intervals have been statistically significant hot spots”\ (ArcGIS).","paragraph","calc-info");

            openNav();
        }else if(buttonValue == 'pm25'){
            clean();
            console.log(pm25Vals.milesLength);
            headerAdder("Percentage of pavements in poor condition", "title");
            canvasMaker('chart1/2','myChart');
            canvasMaker('chart2/2','myChart2');
            var ctx = document.getElementById('myChart').getContext('2d');
            var ctx2 = document.getElementById('myChart2').getContext('2d');
            pm25StackedChart(ctx);
            pm25chartLine(ctx2);
            paragraphAdder("Summary:", "subtitle", "summary-title");
            paragraphAdder("HPMS reports 2017 pavement condition for 432.69 miles within the El Paso MPO area, out of that 21.47% is in poor condition. 78.45 miles (21.65%) of pavement in poor condition are located in Texas and 14.43 miles (20.52%) are in New Mexico. In 2017, 35.64 miles (12.55%) of freight network has pavements in poor condition and 70.78 miles (32.08%) of transit network has pavements in poor condition.","paragraph","summary-info");
            paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
            paragraphAdder("2013-2017","paragraph","analysis-info");
            paragraphAdder("Data Source:", "subtitle", "data-title");
            anchorAdder("Highway Performance Monitoring System (HPMS) Public Release of Geospatial Data in Shapefile Format","https://www.fhwa.dot.gov/policyinformation/hpms/shapefiles.cfm");
            //anchorAdder("https://www.fhwa.dot.gov/policyinformation/hpms/shapefiles.cfm ","https://www.fhwa.dot.gov/policyinformation/hpms/shapefiles.cfm");
            paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
            paragraphAdder("Pavement condition was based on International Roughness Index (IRI) as defined by:","paragraph","calc-info");
            anchorAdder("Federal Highway Administration","https://www.fhwa.dot.gov/policy/2013cpr/chap3.cfm#1");
            paragraphAdder("Good condition (IRI < 95), fair condition (IRI 95-170), and poor condition (IRI > 170). In this analysis, any sections with IRI = 0 are considered as entries with no data. ","paragraph","calc-info");
            openNav();
            //legend elements
            names = ['Good Condition','Fair Condition','Poor Condition'];
            colors = ['background:#8BC34A;','background:#F57C00;', 'background:#d50000'];
            legendMaker("Legend",names,colors);
        }

    }

    function clean(){
        removeAllElementsBar(); 
        removeAllElementsLegend();
        clearMetadata();
        markerClusterSafeDelete();
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
        if(element){
            removeElement("temp_title");
        }
        if(element2){
            removeElement("temp_list");
        }
        closeLegend();
    }

    // removes bar elements only
    function removeAllElementsBar() {
        for(var x = 0; x < universal; x++) {
            removeElement(x);
        }
        universal = 0; // reset counter
        canvasSafeDelete('myChart');
        canvasSafeDelete('myChart2');
    }

    function imageAdder(imageDir, holderDiv){
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
     function headerAdder(text,holderTitle) {
        var x = document.createElement("HEADER");
        var y;
        x.setAttribute("id", universal);
        document.body.appendChild(x);
        var holder = document.getElementById(holderTitle);
        if(holderTitle == "legend_title"){
             y = document.createElement("H5"); 
             if(detectmob() == true){
                y = document.createElement("H7"); 
             }
             y.id = "temp_title"
        }
        else{
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
    function anchorAdder(text,link){
        var x = document.createElement("A");
        x.setAttribute("class", "bridgeText");
        x.setAttribute("target", "#");
        x.setAttribute("style", "font-size: medium; color: blue;");
        // if one keep link as text of anchor
        if(text == 1){
            var t = document.createTextNode(link);
        }else{
            var t = document.createTextNode(text);
        }
        x.setAttribute("href", link);
        x.appendChild(t);
        var holder = document.getElementById(universal-1);
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
    function canvasMaker(id, name){
        var holder = document.getElementById(id); 
        var x = document.createElement("CANVAS");
        x.id = name;
        holder.appendChild(x);
    }

    function canvasSafeDelete(name){
        var element = document.getElementById(name); 
        if(element){
            removeElement(name);
        }
    }

    function markerClusterSafeDelete(){
        // Unset all markers
        if(markerCluster != null && cluster_points !=null){
        
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
        var holder =  document.getElementById("temp_list");
        holder.appendChild(node);
    }

    //Creates a temporal div to hold list for PM2,  so it can be deleted. Method(2/3) for legend
    function createTempList(){
        var newDiv = document.createElement("div"); 
        newDiv.id = "temp_list";
        var holder =  document.getElementById("legendList");
        holder.appendChild(newDiv);
    }

    // Method (1/3) for Legend
    // title = string && names = string[] && colors = string[]
    function legendMaker(title,names,colors){
        createTempList();
        headerAdder(title, "legend_title");
        for(let i = 0; i < names.length; i++){
            listForLegend(names[i], colors[i]);
        }
        openLegend();
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



