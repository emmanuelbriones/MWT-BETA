
  /*  $.ajax({
        url: 'database_calculations.php',
        success: function(data) { alert('All Performance Measures Have Been Loaded.'); },
        error: function(errorThrown) { $.ajax(this); },
    });*/
    

    performanceDataLoader();

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
    var txt = "https://www.fhwa.dot.gov/bridge/britab.cfm";

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
        pm18Data();
        pm26Percentates(); 
        pm2Data();
        pm1Data();
        pm15Data();
        pm22Data();
        pm13_14Data();
        pm13Data();
        pm20Data();
    }

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), { // callback
            zoom: 11,
            center: new google.maps.LatLng(31.837465,-106.2851078),
            mapTypeId: 'terrain'
        });

        //infoWindow = new google.maps.InfoWindow;

        // map.addListener('click', function(e) {});

        // drawingManager = new google.maps.drawing.DrawingManager({
        //     drawingControl: true,
        //     drawingControlOptions: {
        //         position: google.maps.ControlPosition.TOP_CENTER,
        //         drawingModes: ['rectangle', 'polyline', 'polygon']
        //     },
        //     rectangleOptions: {
        //         draggable: true,
        //         clickable: true,
        //         editable: true,
        //         zIndex: 10
        //     },
        //     polylineOptions: {
        //         clickable: true,
        //         draggable: true,
        //         editable: false,
        //         geodesic: true,
        //         zIndex: 10,
        //         strokeWeight: 6
        //     },
        //     polygonOptions: {
        //         clickable: true,
        //         draggable: true,
        //         editable: false,
        //         geodesic: true,
        //         zIndex: 10
        //     }
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
    
//     function shape_handler(found, key, method) {
//         fetch('./results.json')
//             .then(function (response) {
//                 return response.json();
//             })
//             .then(function (myJson) {
//                 let example = {key: key};
//                 if(method == "line") {
//                     $.get('mwt_handler.php', example, function(data) { // ajax call to populate pavement lines
                    
//                     for(index in data.shape_arr){ // iterates through every index in the returned element (data['shape_arr'])
//                         let shp = data.shape_arr[index]['shape']; // shape is LINESTRING or MULTILINESTRING
//                         let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
//                         let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
//                         let to_visualize = []; // used to populate the map (latitude & longitude)
//                         let coord; // will be an object to push coordinates to populate the map
//                         let ln = r.getCoordinates(); // parses the shape into lat & lng
//                         //let pm11Status = data.shape_arr[index].status; // used to color code lines

//                         for (let i = 0; i < ln.length; i++) {
//                             coord = {lat: ln[i]['y'], lng: ln[i]['x']}; // this is how lat & lng is interpreted by the tool
//                             to_visualize.push(coord); // pushing the interpretation to our to_visualize array
//                         }

//                         if(found == "pm4Biking"){
//                             let line = new google.maps.Polyline({ // it is a POLYLINE
//                                 path: to_visualize, // polyline has a path, defined by lat & lng 
//                                 strokeColor: "#00796B",
//                                 strokeOpacity: .50,
//                                 strokeWeight: 4,
//                                 zIndex: 99 // on top of every other shape
//                             });
//                             line.setMap(map);
//                             polylines.push(line);
//                         }else if(found == "pm11"){   
//                             let color = '#03A9F4'; 
//                             console.log("Hello"); 
//                             /* color code lines
//                             if(pm11Status == 'COMPLETE' || pm11Status ==  'PRE-EXISTING'){
//                                color = '#76FF03'; 
//                             }else if(pm11Status == 'SCHEDULED'){
//                                 color = '#c62828';
//                             }*/
//                             let line = new google.maps.Polyline({ // it is a POLYLINE
//                                 path: to_visualize, // polyline has a path, defined by lat & lng 
//                                 strokeColor: color,
//                                 strokeOpacity: .50,
//                                 strokeWeight: 4,
//                                 zIndex: 99 // on top of every other shape
//                             });
//                             line.setMap(map);
//                             polylines.push(line);
//                         }else if(found == "pm12"){
//                             let line = new google.maps.Polyline({ // it is a POLYLINE
//                                 path: to_visualize, // polyline has a path, defined by lat & lng 
//                                 strokeColor: "#d32f2f",
//                                 strokeOpacity: .50,
//                                 strokeWeight: 4,
//                                 zIndex: 99 // on top of every other shape
//                             });
//                             line.setMap(map);
//                             polylines.push(line);
//                         }
            
//                     }   
//                  });
//                 // original code provided for lines
//                    /* $.get('mwt_handler.php', example, function(data) { // ajax call to populate pavement lines
//                         for(index in data.shape_arr){ // iterates through every index in the returned element (data['shape_arr'])
//                             let shp = data.shape_arr[index]['shape']; // shape is LINESTRING or MULTILINESTRING
//                             let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
//                             let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
//                             let to_visualize = []; // used to populate the map (latitude & longitude)

//                             let coord; // will be an object to push coordinates to populate the map
//                             let ln = r.getCoordinates(); // parses the shape into lat & lng
//                             for (let i = 0; i < ln.length; i++) {
//                                 coord = {lat: ln[i]['y'], lng: ln[i]['x']}; // this is how lat & lng is interpreted by the tool
//                                 to_visualize.push(coord); // pushing the interpretation to our to_visualize array
//                             }

//                             let line = new google.maps.Polyline({ // it is a POLYLINE
//                                 path: to_visualize, // polyline has a path, defined by lat & lng 
//                                 value: data.shape_arr[index]['value'], // iri (attribute for the pavement condition score)
//                                 strokeColor: 'black',
//                                 strokeOpacity: 1.0,
//                                 strokeWeight: 4,
//                                 zIndex: 99 // on top of every other shape
//                             });
//                             line.setMap(map);
//                             polylines.push(line);
//                         //line.addListener('click', lineInfo_pavement); // listener for tooltip; "on'click'"
//                         //polygons["pm1"].push(line); // could store into global array for easy/fast erasing and re-populating
//                         }   
//                     });*/
                  
                   
//                 }else if (method == "point") {
//                     if(found == "pm13_14"){
//                         let images = [];
          
//                         images.push("./icons/yellowPin.png");
//                         images.push("./icons/orangePin.png");
//                         images.push("./icons/darkbluePin.png");
//                         images.push("./icons/greenPin.png");
//                         images.push("./icons/grayPin.png");

//                         let tlat = pms_13_14_cor.lat; 
//                         let tlon = pms_13_14_cor.lon;
//                         let tport = pms_13_14_cor.port;

//                         // for regular points
//                         for(index in tlat){ 
//                             let to_visualize = {lat: parseFloat(tlat[index]), lng: parseFloat(tlon[index])};
//                             let point  = new google.maps.Marker({
//                                     position: to_visualize,
//                                     title:  tport[index],
//                                     icon: images[index]
//                             });
                        
//                             //point.addListener('click', pointInfo);
//                             point.setMap(map);
//                             points.push(point);
                            
//                             }
//                     }else if(found == "pm20B" ||found == "pm20P"){
//                         // bikes
//                         let image ="./icons/yellowPin.png";
//                         let tlat = pm20_B.lat; 
//                         let tlon = pm20_B.lon;
//                         let cluster_markers = [];
//                         //Pedestrians
//                         if(found == "pm20P"){
//                             image ="./icons/darkbluePin.png";
//                             tlat = pm20_P.lat; 
//                             tlon = pm20_P.lon;
//                         }

//                         for(i in tlat){
//                             cluster_points = new google.maps.LatLng(parseFloat(tlat[i]),parseFloat(tlon[i]));
//                             cluster_markers.push(cluster_points);     

//                             var markers = cluster_markers.map(function(location, i) {
//                                 return new google.maps.Marker({
//                                     position: location,
//                                     icon: image,
//                                     title: ""
//                                 });
//                             });

//                         }

//                          markerCluster = new MarkerClusterer(map, markers,
// 			                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
//                     }
//                     else if(found == "pm18Driving" || found == "pm18Freight" || found == "pm18Walking" || found == "pm18Biking"  ){      
//                         let image = "./img/markers/red.png";
//                         let cluster_markers = [];
                       
//                         // temp holders, aid in updating data depending on what button is clicked. 
//                         let cordinateHolderlat = []; let cordinateHolderLong = [];  let classAHolder = [];  let classBHolder = [];
//                         let classCHolder = [];       let classOHolder = [];         let yearHolder = [];    let fatalityHolder = [];
                        
//                         if(found == "pm18Driving"){
//                             image = "./icons/crash_red.png";
//                             cordinateHolderlat = driving_Cordinates_Fatalities.lat;
//                             cordinateHolderLong = driving_Cordinates_Fatalities.lon;
//                             classAHolder = driving_Cordinates_Fatalities.classA;
//                             classBHolder = driving_Cordinates_Fatalities.classB;
//                             classCHolder = driving_Cordinates_Fatalities.classC;
//                             classOHolder = driving_Cordinates_Fatalities.classO;
//                             yearHolder = driving_Cordinates_Fatalities.year;
                           
//                             fatalityHolder = driving_Cordinates_Fatalities.fatality;
//                             console.log(yearHolder);
//                             console.log(fatalityHolder);
//                         }else if(found == "pm18Freight"){
//                             image = "./icons/truck.png";
//                             cordinateHolderlat = Freight_Cordinates_Fatalities.lat;
//                             cordinateHolderLong = Freight_Cordinates_Fatalities.lon;
//                             classAHolder = Freight_Cordinates_Fatalities.classA;
//                             classBHolder = Freight_Cordinates_Fatalities.classB;
//                             classCHolder = Freight_Cordinates_Fatalities.classC;
//                             classOHolder = Freight_Cordinates_Fatalities.classO;
//                             yearHolder = Freight_Cordinates_Fatalities.year;
//                             fatalityHolder = Freight_Cordinates_Fatalities.fatality;
//                         }else if(found == "pm18Walking"){
//                             image = "./icons/b22_p.png";
//                             cordinateHolderlat = Walking_Cordinates_Fatalities.lat;
//                             cordinateHolderLong = Walking_Cordinates_Fatalities.lon;
//                             classAHolder = Walking_Cordinates_Fatalities.classA;
//                             classBHolder = Walking_Cordinates_Fatalities.classB;
//                             classCHolder = Walking_Cordinates_Fatalities.classC;
//                             classOHolder = Walking_Cordinates_Fatalities.classO;
//                             yearHolder = Walking_Cordinates_Fatalities.year;
//                             fatalityHolder = Walking_Cordinates_Fatalities.fatality;
//                         }else if(found == "pm18Biking"){
//                             image = "./icons/b22_b.png";
//                             cordinateHolderlat = Bike_Cordinates_Fatalities.lat;
//                             cordinateHolderLong = Bike_Cordinates_Fatalities.lon;
//                             classAHolder = Bike_Cordinates_Fatalities.classA;
//                             classBHolder = Bike_Cordinates_Fatalities.classB;
//                             classCHolder = Bike_Cordinates_Fatalities.classC;
//                             classOHolder = Bike_Cordinates_Fatalities.classO;
//                             yearHolder = Bike_Cordinates_Fatalities.year;
//                             fatalityHolder = Bike_Cordinates_Fatalities.fatality;
//                         }

                            
//                         for(i in cordinateHolderlat){
//                             cluster_points = new google.maps.LatLng(parseFloat(cordinateHolderlat[i]),parseFloat(cordinateHolderLong[i]));
//                             cluster_markers.push(cluster_points);     

//                             var markers = cluster_markers.map(function(location, i) {
//                                 return new google.maps.Marker({
//                                     position: location,
//                                     icon: image,
//                                     title: "Year: " + yearHolder[i] + " \nSerious Injuries: " + classAHolder[i]  + " \nNon-Incapacitating Injuries: " + classBHolder[i] + "\nPossible Injuries: "   + classCHolder[i] + "\nNon-Injury: "   + classOHolder[i] + "\nFatalities: " + fatalityHolder[i] 
//                                 });
//                             });

//                         }

//                          markerCluster = new MarkerClusterer(map, markers,
// 			                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

            

// 		            }else if(found == "pm19Driving" || found == "pm19Freight" || found == "pm19Walking" || found == "pm19Biking" ){
//                         let image = "./img/markers/red.png";
//                         let cluster_markers = [];
                       
//                         // temp holders, aid in updating data depending on what button is clicked. 
//                         let cordinateHolderlat = []; let cordinateHolderLong = [];  let classAHolder = [];  let classBHolder = [];
//                         let classCHolder = [];       let classOHolder = [];         let yearHolder = [];    let fatalityHolder = [];
                      
//                         if(found == "pm19Driving"){
//                             image = "./icons/crash_red.png";
//                             cordinateHolderlat = driving_Cordinates_Injuries.lat;
//                             cordinateHolderLong = driving_Cordinates_Injuries.lon;
//                             classAHolder = driving_Cordinates_Injuries.classA;
//                             classBHolder = driving_Cordinates_Injuries.classB;
//                             classCHolder = driving_Cordinates_Injuries.classC;
//                             classOHolder = driving_Cordinates_Injuries.classO;
//                             yearHolder = driving_Cordinates_Injuries.year;
//                             fatalityHolder = driving_Cordinates_Injuries.fatality;
//                         }else if(found == "pm19Freight"){
//                             image = "./icons/truck.png";
//                             cordinateHolderlat = Freight_Cordinates_Injuries.lat;
//                             cordinateHolderLong = Freight_Cordinates_Injuries.lon;
//                             classAHolder = Freight_Cordinates_Injuries.classA;
//                             classBHolder = Freight_Cordinates_Injuries.classB;
//                             classCHolder = Freight_Cordinates_Injuries.classC;
//                             classOHolder = Freight_Cordinates_Injuries.classO;
//                             yearHolder = Freight_Cordinates_Injuries.year;
//                             fatalityHolder = Freight_Cordinates_Injuries.fatality;
//                         }else if(found == "pm19Walking"){
//                             image = "./icons/b22_p.png";
//                             cordinateHolderlat = Walking_Cordinates_Injuries.lat;
//                             cordinateHolderLong = Walking_Cordinates_Injuries.lon;
//                             classAHolder = Walking_Cordinates_Injuries.classA;
//                             classBHolder = Walking_Cordinates_Injuries.classB;
//                             classCHolder = Walking_Cordinates_Injuries.classC;
//                             classOHolder = Walking_Cordinates_Injuries.classO;
//                             yearHolder = Walking_Cordinates_Injuries.year;
//                             fatalityHolder = Walking_Cordinates_Injuries.fatality;
//                         }else if(found == "pm19Biking"){
//                             image = "./icons/b22_b.png";
//                             cordinateHolderlat = Biking_Cordinates_Injuries.lat;
//                             cordinateHolderLong = Biking_Cordinates_Injuries.lon;
//                             classAHolder = Biking_Cordinates_Injuries.classA;
//                             classBHolder = Biking_Cordinates_Injuries.classB;
//                             classCHolder = Biking_Cordinates_Injuries.classC;
//                             classOHolder = Biking_Cordinates_Injuries.classO;
//                             yearHolder = Biking_Cordinates_Injuries.year;
//                             fatalityHolder = Biking_Cordinates_Injuries.fatality;
//                         }

//                         //for clusters
//                         for(i in cordinateHolderlat){
//                             cluster_points = new google.maps.LatLng(parseFloat(cordinateHolderlat[i]),parseFloat(cordinateHolderLong[i]));
//                             cluster_markers.push(cluster_points);     

//                             var markers = cluster_markers.map(function(location, i) {
//                                 return new google.maps.Marker({
//                                     position: location,
//                                     icon: image,
//                                     title: "Year: " + yearHolder[i] + " \nSerious Injuries: " + classAHolder[i]  + " \nNon-Incapacitating Injuries: " + classBHolder[i] + "\nPossible Injuries: "   + classCHolder[i] + "\nNon-Injury: "   + classOHolder[i] + "\nFatalities: " + fatalityHolder[i]
//                                     // title is what hoover displays
//                                 });
//                             });

//                         }

//                          markerCluster = new MarkerClusterer(map, markers,
// 			                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
                    
//                     }else if(found == "pm15Driving" || found == "pm16Driving" || found == "pm17Driving"){
//                         pm15_handler();
//                         let tlat = []; let tlon = []; let tStatName = [];
//                         let images = []; // array of images
                  
//                         if(found == "pm15Driving"){
//                             images.push("./icons/redPin.png");
//                             images.push("./icons/orangePin.png");
//                             images.push("./icons/lightPink.png");
//                             images.push("./icons/lightbluePin.png");
//                             images.push("./icons/grayPin.png");
//                             images.push("./icons/greenPin.png");
//                             images.push("./icons/yellowPin.png");
//                             images.push("./icons/pinkPin.png");
//                             images.push("./icons/darkbluePin.png");
//                             images.push("./icons/lightgreenPin.png");
//                             images.push("./icons/lightgrayPin.png");
//                             tlat = pms_15_16_17Info.lat;
//                             tlon = pms_15_16_17Info.lon;
//                             tStatName = pms_15_16_17Info.stationName;
//                         }else if(found == "pm16Driving"){
//                             // 2 points
//                             images.push("./icons/orangePin.png");
//                             images.push("./icons/darkbluePin.png");
//                             tlat = pm16Coordinates.lat;
//                             tlon = pm16Coordinates.lon;
//                             tStatName = pm16Coordinates.StationName;
//                         }else if(found == "pm17Driving"){
//                            // image = "./icons/b22_p.png";
//                             images.push("./icons/orangePin.png");
//                             images.push("./icons/greenPin.png");
//                             images.push("./icons/lightPink.png");
//                             images.push("./icons/darkbluePin.png");
//                             images.push("./icons/grayPin.png");
//                             tlat = pm17Coordinates.lat;
//                             tlon = pm17Coordinates.lon;
//                             tStatName = pm17Coordinates.StationName;
//                         }
                     
//                         // for regular points
//                         for(index in tlat){ 
//                             let to_visualize = {lat: parseFloat(tlat[index]), lng: parseFloat(tlon[index])};
//                             let point  = new google.maps.Marker({
//                                     position: to_visualize,
//                                     title:  tStatName[index],
//                                     icon: images[index]
//                             });
                            
//                             //point.addListener('click', pointInfo);
//                             point.setMap(map);
//                             points.push(point);
                        
//                         }
                        


//                     } 
                               
//                     else if(found == 'pmbridge' ){
                        
//                         $.get('mwtB_handler.php', example, function(data) { // ajax call to populate points
//                         let lowest_values = myJson["PM26_Lowest_Value_2018"];

//                             for(index in data.shape_arr){ 
//                                 //let temp = wktFormatterPoint(data.shape_arr[index]['shape']);
//                                 //let to_visualize = temp[0][0]; // should fix return method
//                                 let to_visualize = {lat: parseFloat(data.shape_arr[index].lat_dd), lng: parseFloat(data.shape_arr[index].long_dd)};

//                                 let bridge_value = lowest_values[index];

//                                 let image = "./img/markers/old_imgs/black_dot.svg";
//                                 let point_title = "No data: ";

//                                 if (bridge_value >= 7 && bridge_value <= 9) { image = "./img/markers/green.png";  point_title= "Good Condition: "}
//                                 else if (bridge_value >= 5 && bridge_value <= 6) { image = "./img/markers/yellow.png"; point_title= "Fair Condition: "}
//                                 else if (bridge_value >= 0 && bridge_value <= 4) { image = "./img/markers/red.png";  point_title= "Poor Condition: "}
//                                 else if (bridge_value == 999 || bridge_value == null) { image = "./img/markers/grey.png"; }

//                                 let point  = new google.maps.Marker({
//                                     position: to_visualize,
//                                     title: point_title + bridge_value + '',
//                                     value: 'bridge condition',
//                                     icon: image
//                                 });
                            
//                                 //point.addListener('click', pointInfo);
//                                 point.setMap(map);
//                                 points.push(point);
//                                 //points["pm1"].push(point); // could store into global array for easy/fast erasing and re-populating
//                             }
//                     });
//                 }
//                 // --------------------- PM 22 CLuster Markers  60k+ points---------------------
// else if(found == "pm22crashes"){
                   
//                    let pm22_txlat = myJson.PM22.TX_LAT;
//                    let pm22_txlong = myJson.PM22.TX_LON;
//                    let pm22_nmlat = myJson.PM22.NM_LAT;
//                    let pm22_nmlong = myJson.PM22.NM_LON;                     
                   
//                let image = "./icons/crash_red.png";
//                let cluster_markers = [];

//                    for(index in pm22_txlat){ 
//                     cluster_points = {lat: parseFloat(pm22_txlat[index]), lng: parseFloat(pm22_txlong[index])};
//                            cluster_markers.push(cluster_points);             
//                    }
//                      for(index in pm22_nmlat){ 
//                         cluster_points = {lat: parseFloat(pm22_nmlat[index]), lng: parseFloat(pm22_nmlong[index])};
//                            cluster_markers.push(cluster_points);             
//                    }
//                    var markers = cluster_markers.map(function(location, i) {
//                      return new google.maps.Marker({
//                        position: location,
//                        icon: image,
//                        title: "A crash ocurred at this location"
//                                      });
//                    });
//                    clusters.push(markers);
                   
//                     markerCluster = new MarkerClusterer(map, markers,
//                        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
//                      }    



//            } else { // polygons
//                if(found == 'pm2-transit' || found == 'pm2-walking'|| found == 'pm2-biking' ){
//                    clean();                      
//                }
                 
//                $.get('mwtB_handler.php', example, function(data) { // ajax call to populate pavement lines
//                    let res = found.split("-");
//                    let pm = res[0];    // pm type 1 or 2
//                    let type = res[1];  // mode of transportation type

//                    // list of transportations
//                    let transportation_modes = [
//                        "PM1_pct_NonSOV_e",      // 0
//                        "PM2_pct_PublicTrans_e", // 1
//                        "PM2_pct_Walking_e",     // 2
//                        "PM2_pct_Biking_e",      // 3
//                    ];

//                    let tx_mean = [ // loaded mean values for tx
//                        2.166882,   // transit
//                        2.623363,   // walking
//                        0.262361    // biking
//                    ];

//                    let nm_mean = [ // loaded mean values for nm
//                        0.645192,   // transit
//                        1.516317,   // walking
//                        0.005669    // biking
//                    ];

//                    for (index in data.shape_arr) {
//                        let temp = wktFormatter(data.shape_arr[index]['shape']);
//                        let to_visualize = [];

//                        for (let i = 0; i < temp.length; i++) {
//                            to_visualize.push(temp[i]);
//                        }

//                        let mode_values = [];
//                        let value = 0.000000;
//                        let mean = 0.000000;

//                        if (index <= 514) { // UPPER SECTION = Texas
//                            if (type == "nonsov") {
//                                mode_values = myJson[transportation_modes[0]];
//                                //...
//                            } else if (type == "transit") {
//                                mode_values = myJson[transportation_modes[1]];
//                                mean = tx_mean[0];
//                            } else if (type == "walking") {
//                                mode_values = myJson[transportation_modes[2]];
//                                mean = tx_mean[1];
//                            } else if (type == "biking") {
//                                mode_values = myJson[transportation_modes[3]];
//                                mean = tx_mean[2];
//                            }
//                        } else { // LOWER SECTION = New Mexico
//                            if (type == "nonsov") {
//                                mode_values = myJson[transportation_modes[0]];
//                                //...
//                            } else if (type == "transit") {
//                                mode_values = myJson[transportation_modes[1]];
//                                mean = nm_mean[0];
//                            } else if (type == "walking") {
//                                mode_values = myJson[transportation_modes[2]];
//                                mean = nm_mean[1];
//                            } else if (type == "biking") {
//                                mode_values = myJson[transportation_modes[3]];
//                                mean = nm_mean[2];
//                            }
//                        }
//                        value = mode_values[index];

//                        let color = "";
//                        if (pm == "pm1") {
//                            //...
//                        } else {
//                            if (value == 0.000000) { // grey = no data
//                                color = "#C0C0C0";
//                                no_data_num++;
//                            } else if (value < mean) { // light blue = low/less than mean
//                                color = "#00CCFF";
//                                low_num++;
//                            } else if (value > mean) { // dark blue = high/greater than mean
//                                color = "#0066CC";
//                                high_num++;
//                            }
//                        }

//                        let polygon = new google.maps.Polygon({
//                            description: "Percentage of Workers Commuting by Biking",
//                            description_value: 'something from data.shape_arr[index][value]',
//                            paths: to_visualize,
//                            strokeColor: 'black',
//                            strokeOpacity: 0.60,
//                            strokeWeight: 0.70,
//                            fillColor: color,
//                            fillOpacity: 0.60,
//                            zIndex: -1,
//                            title: value.toFixed(1) + "%",
//                        });
                       
//                        // Hover Effect for Google API Polygons
//                        google.maps.event.addListener(polygon, 'mouseover', function(event){ injectTooltip(event, polygon.title); });
//                        google.maps.event.addListener(polygon, 'mousemove', function(event){ moveTooltip(event); });
//                        google.maps.event.addListener(polygon, 'mouseout', function(event){ deleteTooltip(event); });

//                        polygon.setMap(map);
//                        polygons.push(polygon);
//                    }
//                    count_list[0] = no_data_num;
//                    count_list[1] = low_num;
//                    count_list[2] = high_num;
                
//                    if(found == 'pm2-transit'){
//                        buttonSwitch('transitWC');
//                    }
//                    if(found == 'pm2-walking'){
//                        buttonSwitch('walkingWC');
//                    }
//                    if(found == 'pm2-biking'){
//                        buttonSwitch('BikingWC');
//                    }
               
//                });
//            }
//         });
//    }
   
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
        //console.log(shape_s);
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
            document.getElementById("legendHolder").style.width = "35%";
        }
    }

    function closeLegend() {
        document.getElementById("legendHolder").style.width = "0";
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
     /*function headerAdder(text,holderTitle) {
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
    }*/

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

    //Adds PM2 names and colors to legend list. Method(1/3) for legend
    function legendPM2Transit(){
        createTempList();
        names = ['No Data','Below mean','Above Mean'];
        colors = ['background:#C0C0C0;','background:#00CCFF;','background:#0066CC;'];
        for(let i = 0; i < names.length; i++){
            listForLegend(names[i], colors[i]);
        }
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


