

function pm11Data(mode, ex) {
    let php_handler = "mwt_handler.php";
    let shape = "shape";
    let key = 'all_pm11';
    let data_for_php = {};
    pm11data = {
        sideWalks: 0,
        roadways: 0,
        missing:0
    }

    let color = '#0D47A1';

    if (mode == 0 || mode == 1) {
        data_for_php = { key: key };
    } else if (mode == 2) {
        php_handler = "corridor_handlerB.php";
        shape = 'ST_AsText(SHAPE)';
        data_for_php = {
            key: 11,
            corridors_selected: ex,
            tableName: "pm11"
        };
    }
    else if(mode == 4){
        php_handler = "./backend/AOI.php";
        data_for_php = ex;
    }
    let roadLa6 = 0
    $.get(php_handler, data_for_php, function (data) { // ajax call to populate pavement lines
        for (index in data.shape_arr) { // iterates through every index in the returned element (data['shape_arr'])
            let shp = data.shape_arr[index][shape]; // shape is LINESTRING or MULTILINESTRING
            let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
            let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
            let to_visualize = []; // used to populate the map (latitude & longitude)
            let coord; // will be an object to push coordinates to populate the map
            let ln = r.getCoordinates(); // parses the shape into lat & lng

            pm11data.sideWalks += parseFloat(data.shape_arr[index].Sidewalk_4);
            pm11data.roadways += parseFloat(data.shape_arr[index].Roads_LA_3);
            roadLa6 += parseFloat(data.shape_arr[index].Roads_LA_6);


            if (mode == 1 || mode == 2 || mode == 4) {
                if ('geometries' in r) { //multilinestrings
                    to_visualize = pm3_polyline_geojson_formatter(r);
                 
                    for (i in to_visualize) {
                        let line = new google.maps.Polyline({ // it is a POLYLINE
                            path: to_visualize[i], // polyline has a path, defined by lat & lng 
                            strokeColor: color,
                            strokeOpacity: .50,
                            strokeWeight: 4,
                            zIndex: 99 // on top of every other shape
                        });
                        line.setMap(map);
                        polylines.push(line);
                    }
                } else if ('points' in r) { //linestrings
                    to_visualize = pm3_line_geojson_formatter(r);

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

        }





        //convert feet to miles
        pm11data.sideWalks = parseInt(pm11data.sideWalks * 0.000189393939);
        pm11data.roadways = parseInt((pm11data.roadways - roadLa6) * 0.000189393939);
        pm11data.missing = parseInt((pm11data.roadways * 2) - pm11data.sideWalks);

        if (mode == 0) {
            document.getElementById("pm11WText").innerHTML = commafy(pm11data.sideWalks);
        } else if (mode == 1) {
            regionalText(pm11data);
        } else if (mode == 2) {
            let corr = translateCorridor(ex); // what corridor are we on?
            dynamicCorridorText(corr, pm11data);
        }
        else if (mode == 4) {
            dynamicCorridorText("AOI", pm11data);
        }

    });

}
    
