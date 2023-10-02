function shape_handlerL(found, key) {
    console.log("handleling lines");
    let example = { key: key };

    $.get('mwt_handler.php', example, function (data) { // ajax call to populate pavement lines
        for (index in data.shape_arr) { // iterates through every index in the returned element (data['shape_arr'])
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
            let pm25PavRating = data.shape_arr[index].PAV_RATING;

            for (let i = 0; i < ln.length; i++) {
                coord = { lat: ln[i]['y'], lng: ln[i]['x'] }; // this is how lat & lng is interpreted by the tool
                to_visualize.push(coord); // pushing the interpretation to our to_visualize array
            }
            // filter colors 
            if (found == "pm4W") {
                if (pm4tct > 4 && pm4tct < 16) {
                    color = '#f44336';
                } else if (pm4tct > 15 && pm4tct < 130) {
                    color = '#64DD17';
                } else if (pm4tct > 129 && pm4tct < 1306) {
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
            else if (found == "pm4Biking") {
                if (pm4tct > 4 && pm4tct < 31) {
                    color = '#f44336';
                } else if (pm4tct > 31 && pm4tct < 481) {
                    color = '#64DD17';
                } else if (pm4tct > 480 && pm4tct < 8461) {
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
            else if (found == "PM21L") {
                color = '#64FFDA';
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

            else if (found == "PM3") {
                if (pm3Ridership > 2776.666667 && pm3Ridership < 107271.682952) {
                    color = '#8BC34A';
                } else if (pm3Ridership > 107271.682951 && pm3Ridership < 388321.351849) {
                    color = '#FFCA28';
                } else if (pm3Ridership > 388321.351848 && pm3Ridership < 1144232.200000) {
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
            else if (found == "pm11") {
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

            } else if (found == "pm12") {
                if (pm12Status.toLowerCase() == 'proposed') {
                    color = '#81C784';
                } else if (pm12Status.toLowerCase() == 'existing' && pm12Status.toLowerCase() == 'existing/proposed') {
                    color = '#3949AB';
                } else {
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
            } else if (found == "pm25") {
                color = '#558B2F';
                if(pm25PavRating == 'GOOD'){
                    color = '#8BC34A';
                }else if(pm25PavRating == 'FAIR'){
                    color = '#FFEA00'; 
                }else if(pm25PavRating == 'POOR'){
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

}

function shlregionalHandler() {
    let data = [];
    if (key != 'corridor') {
        if (currentPM == 25) {
            data = pm25Data();
        }







    }
}
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
          
           
        