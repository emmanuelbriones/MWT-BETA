//calculates number display on multimodal Performance menu
/**
 * There are 4 types of mode
 * Mode 0: This is used when the page loads for the 1st time. Calculates Menu Text Only
 * Mode 1: Regional Performance Points and data
 * Mode 2: Corridor Performance Points and data
 * Mode 3: Corridor Data only, data for benchmark
 * Mode 4: AOI points and data only
 */
function pm4Data(mode, data_in) {
    let count = 0; // PM4 Data
    let color = '#03A9F4';
    let opacity = .50;
    let stroke = 4;
    let layer = 99;
    let caller = "mwt_handler.php";
    let shape = "shape";
    let key = 'all_pm4';
    let data_for_php = {};
    let pm4data = {
        dataW: 0,
        dataB: 0
    }

    //let walkingTracker = 0; // Aids mode 0 distinguish the type

    if (mode == 0) {
        data_for_php = {
            key: key
        };
    } else if (mode == 1) {
        data_for_php = {
            key: key
        };
    } else if (mode == 2) {
        caller = "corridor_handlerB.php";
        shape = 'ST_AsText(SHAPE)';

        data_for_php = {
            key: 4,
            corridors_selected: data_in,
            tableName: "pm4"
        };
    } else if (mode == 4) {
        caller = "./backend/AOI.php";
        data_for_php = data_in;
    }

    $.get(caller, data_for_php, function (data) { // ajax call to populate pavement lines
        for (index in data.shape_arr) { // iterates through every index in the returned element (data['shape_arr'])
            let shp = data.shape_arr[index][shape]; // shape is LINESTRING or MULTILINESTRING
            let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
            let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
            let to_visualize = []; // used to populate the map (latitude & longitude)
            let coord; // will be an object to push coordinates to populate the map
            let ln = r.getCoordinates(); // parses the shape into lat & lng

        
            //PMS Data

            let pm4tct = data.shape_arr[index].tactcnt; // works for both walking and Biking
            let type = data.shape_arr[index].type;

            if (type == "walking") {
                pm4data.dataW += parseInt(data.shape_arr[index].tactcnt); // count if total miles
            } else if (type == "biking") {
                pm4data.dataB += parseInt(data.shape_arr[index].tactcnt); // count if total miles
            }

            if (mode == 1 || mode == 2 || mode == 4) {
                for (let i = 0; i < ln.length; i++) {
                    coord = {
                        lat: ln[i]['x'],
                        lng: ln[i]['y']
                    }; // this is how lat & lng is interpreted by the tool
                   to_visualize.push(coord); // pushing the interpretation to our to_visualize array
                }
                // filter colors 

            if (currentType == "walking") {
                if (pm4tct > 1 && pm4tct < 25) {
                    color = '#9E9E9E';
                    opacity = .3;
                    stroke = 3;
                    layer = 94;
                } else if (pm4tct > 25 && pm4tct < 101) {
                    color = '#00FF00';
                    opacity = .3;
                    stroke = 3;
                    layer = 95;
                } else if (pm4tct > 100 && pm4tct < 501) {
                    color = '#FFFF00';
                    opacity = .35;
                    stroke = 3.5;
                    layer = 96;
                } else if (pm4tct > 500 && pm4tct < 1001) {
                    color = '#FFA500';
                    opacity = .35;
                    stroke = 3.5;
                    layer = 97;
                } else if (pm4tct > 1000 && pm4tct < 5001 ){
                    color = '#FF0000';
                    opacity = .35;
                    stroke = 3.5;
                    layer = 98;
                } else if (pm4tct > 5001 ){
                    color = '#800080';
                    opacity = .35;
                    stroke = 3.5;
                    layer = 99;
                }
          
                let line = new google.maps.Polyline({ // it is a POLYLINE
                    path: to_visualize, // polyline has a path, defined by lat & lng 
                    strokeColor: color,
                    strokeOpacity: opacity,
                    strokeWeight: stroke,
                    zIndex: layer 
                });
                    // Hover Effect for Google API Polygons
                    google.maps.event.addListener(line, 'mouseover', function (event) {
                        injectTooltip(event, pm4tct);
                    });
                    google.maps.event.addListener(line, 'mousemove', function (event) {
                        moveTooltip(event);
                    });
                    google.maps.event.addListener(line, 'mouseout', function (event) {
                        deleteTooltip(event);
                    });

                    line.setMap(map);
                    polylines.push(line);
            } else if (currentType == "biking") {
                    if (pm4tct > 1 && pm4tct < 25) {
                        color = '#9E9E9E';
                    } else if (pm4tct > 25 && pm4tct < 101) {
                        color = '#00FF00';
                    } else if (pm4tct > 100 && pm4tct < 501) {
                        color = '#FFFF00';
                    } else if (pm4tct > 500 && pm4tct < 1001) {
                        color = '#FFA500';
                    } else if (pm4tct > 1000 && pm4tct < 5001 ){
                        color = '#FF0000';
                    } else if (pm4tct > 5001 ){
                        color = '#800080';
                    }

                    let line = new google.maps.Polyline({ // it is a POLYLINE
                        path: to_visualize, // polyline has a path, defined by lat & lng 
                        strokeColor: color,
                        strokeOpacity: .50,
                        strokeWeight: 4,
                        zIndex: 99 // on top of every other shape
                });
                // Hover Effect for Google API Polygons
                google.maps.event.addListener(line, 'mouseover', function (event) {
                    injectTooltip(event, pm4tct);
                });
                google.maps.event.addListener(line, 'mousemove', function (event) {
                    moveTooltip(event);
                });
                google.maps.event.addListener(line, 'mouseout', function (event) {
                    deleteTooltip(event);
                });

                line.setMap(map);
                polylines.push(line);
}
            }

        }
       
        if (mode == 0) {
            let walkingValue = {
                name: "pm4WText",
                value: commafy(pm4data.dataW)
            };
            let bikingValue = {
                name: "pm4BText",
                value: commafy(pm4data.dataB)
            };
        } else if (mode == 1) {
            regionalText(pm4data);
        } else if (mode == 2) {
            let corr2 = translateCorridor(data_in); // what corridor are we on?
            dynamicCorridorText(corr2, pm4data);
        } else if (mode == 4) {
            dynamicCorridorText("AOI", pm4data); // Send graph data and current corridor to dynamic text for corridors
        }
    }).fail(function (error) {
        console.log(error);
        alert("Error Fetching Data. Please Contact MPO.");
        clean();
    });


}