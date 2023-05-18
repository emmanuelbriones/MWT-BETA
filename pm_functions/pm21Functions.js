function pm21Data(mode, ex) {
    loadpm21H(mode, ex);
}


function loadpm21P(mode, ex) {
    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";
    let pm21dataCount = 0;

    if (mode == 0 || mode == 1) { // if we want regional (default) data
        let key = 'all_pm21P';
        data_for_php = {
            key: key
        };
    } else if (mode == 2) { // if we want corridors
        data_for_php = ex;
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";
    }


    $.get(php_handler, data_for_php, function (data) {
        let image = "./img/markers/yellow.png";
        for (index in data.shape_arr) {
            let holder = [];
            let project_id = data.shape_arr[index]['project_id'];
            let hotspot_ty = data.shape_arr[index]['hotspot_ty'];
            let project_name = data.shape_arr[index]['proj_name'];

            if (hotspot_ty != "N/A") {
                pm21dataCount++;
            }

            if (mode == 1 || mode == 2) { // mode 1 and 2 allows us to store points
                holder.push(wktFormatterPoint(data.shape_arr[index][shape]));
                holder = holder[0][0]; // Fixes BLOBs

                let infowincontent = document.createElement('div');
                infowincontent.class = 'containter';
                infowincontent.innerHTML = `
                <div class="container-fluid">
                    <div class="row bg-info">
                    <div class="col-sm-8  text-center text-black-85"><h6>ID: ${project_id}</h6></div>
                    </div>
                    <div class="row text-center" >
                    <div class="col-sm-12"><h6>Project Name</h6></div>
                    </div>
                    <div class="row">
                    <div class="col-xs-12"><p>${project_name}</p></div>
                    </div>
                </div>
                `;

                let to_visualize = {
                    lat: parseFloat(holder[0].lat),
                    lng: parseFloat(holder[0].lng)
                };

                let infoWindow = new google.maps.InfoWindow({
                    content: infowincontent
                });

                let point = new google.maps.Marker({
                    position: to_visualize,
                    value: project_id,
                    icon: image
                });
                point.addListener("mouseover", () => {
                    infoWindow.open({
                        anchor: point
                    });
                });
                point.addListener("mouseout", () => {
                    infoWindow.close();
                });
                point.setMap(map);
                points.push(point);
            }
        }
        loadpm21Lines(mode, ex, pm21dataCount);
    });

}

//heat
function loadpm21H(mode, ex) {
    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";

    if (mode == 0 || mode == 1) { // if we want regional (default) data
        let key = 'all_pm21_h';
        data_for_php = {
            key: key
        };
    } else if (mode == 2) { // if we want corridors
        data_for_php = ex;
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";
    }

    $.get(php_handler, data_for_php, function (data) {
        if (mode == 1) {
            let color = "#039BE5"; //blue
            for (index in data.shape_arr) {
                let temp = wktFormatter(data.shape_arr[index][shape]);
                let to_visualize = [];
                let pattern = data.shape_arr[index]['pattern'];

                // if the status of a shape exists, push to visualize
                for (let i = 0; i < temp.length; i++) {
                    to_visualize.push(temp[i]);
                    polyToErase.exist.push();
                }

                if (pattern == "Intensifying Hot Spot") {
                    color = '#D50000';
                } else if (pattern == "New Hot Spot") {
                    color = '#FFA726';
                } else if (pattern == "Not Emerging") {
                    color = '#9E9E9E';
                } else if (pattern == "Oscillating Hot Spot") {
                    color = "#FF5722";
                } else if (pattern == "Persistent Cold Spot") {
                    color = "#9C27B0";
                } else if (pattern == "Sporadic Cold Spot") {
                    color = "#1A237E";
                } else if (pattern == "Sporadic Hot Spot") {
                    color = "#3F51B5";
                } else if (pattern == "Diminishing Cold Spot") {
                    color = "#80D8FF";
                } else if (pattern == "Consecutive Hot Spot") {
                    color = "#FF4081";
                } else {
                    color = "#8BC34A";
                }
                let polygon = new google.maps.Polygon({
                    description: pattern,
                    paths: to_visualize,
                    strokeColor: 'black',
                    strokeOpacity: 0.60,
                    strokeWeight: 0.70,
                    fillColor: color,
                    fillOpacity: 0.60,
                    zIndex: -1,
                    title: pattern
                });

                polyToErase.exist.push(polygon);
                var infowindow;


                // Hover Effect for Google API Polygons
                google.maps.event.addListener(polygon, 'mouseover', function (event) {

                    var polygonBounds = polygon.getPath();
                    var point = {
                        lat: polygonBounds.getAt(0).lat(),
                        lng: polygonBounds.getAt(0).lng()
                    };
                    infowindow = new google.maps.InfoWindow({
                        content: polygon.title,
                        position: point,
                    });
                    infowindow.open(map);
                });


                google.maps.event.addListener(polygon, 'mousemove', function (event) {
                    moveTooltip(event);
                });
                google.maps.event.addListener(polygon, 'mouseout', function (event) {
                    deleteTooltip(event);
                    infowindow.close();
                });

                polygon.setMap(map);
                polygons.push(polygon);
            }
        }

        loadpm21P(mode, ex);
    });
}


function loadpm21Projected(mode, ex) {
    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";

    if (mode == 0 || mode == 1) { // if we want regional (default) data
        let key = 'all_pm21_pj';
        data_for_php = {
            key: key
        };
    } else if (mode == 2) { // if we want corridors
        data_for_php = ex;
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";
    }

    $.get(php_handler, data_for_php, function (data) {
        let color = "#E91E63";
        for (index in data.shape_arr) {
            let temp = wktFormatter(data.shape_arr[index][shape]);
            let pattern = wktFormatter(data.shape_arr[index]['pattern']);
            let to_visualize = [];


            // if the status of a shape exists, push to visualize
            for (let i = 0; i < temp.length; i++) {
                if (pattern == 'Intensifying Hot Spot') {
                    color = '';
                } else if (pattern == 'New Hot Spot') {

                } else if (pattern == 'Not Emerging') {

                } else if (pattern == 'Oscillating Hot Spot') {

                } else if (pattern == 'Persistent Cold Spot') {

                } else if (pattern == 'Sporadic Cold Spot') {

                } else if (pattern == 'Sporadic Hot Spot') {

                }

                to_visualize.push(temp[i]);
                polyToErase.exist.push();
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
                title: "Testing",

            });

            polyToErase.exist.push(polygon);

            // Hover Effect for Google API Polygons
            google.maps.event.addListener(polygon, 'mouseover', function (event) {
                injectTooltip(event, polygon.title);
            });
            google.maps.event.addListener(polygon, 'mousemove', function (event) {
                moveTooltip(event);
            });
            google.maps.event.addListener(polygon, 'mouseout', function (event) {
                deleteTooltip(event);
            });

            polygon.setMap(map);
            polygons.push(polygon);
        }


    });
}

function loadpm21Lines(mode, ex, pm21dataCount) {
    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";

    if (mode == 0 || mode == 1) { // if we want regional (default) data
        let key = 'all_pm21_lines';
        data_for_php = {
            key: key
        };
    } else if (mode == 2) { // if we want corridors
        data_for_php = ex;
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";
    }
    let color = "#039BE5"; //blue

    $.get(php_handler, data_for_php, function (data) { // ajax call to populate pavement lines
        let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
        for (index in data.shape_arr) { // iterates through every index in the returned element (data['shape_arr'])
            let shp = data.shape_arr[index][shape]; // shape is LINESTRING or MULTILINESTRING
            let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
            let to_visualize = []; // used to populate the map (latitude & longitude)
            let projectId = data.shape_arr[index]['project_id'];
            let hotspot_ty = data.shape_arr[index]['hotspot_ty'];

            if (hotspot_ty != "N/A") {
                pm21dataCount++;
            }

            if (mode == 1 || mode == 2) {
                if ('geometries' in r) { //multilinestrings
                    to_visualize = pm3_polyline_geojson_formatter(r);

                    for (i in to_visualize) {
                        let line = new google.maps.Polyline({ // it is a POLYLINE
                            title: projectId, // Add column that has name of project here !!!!!
                            path: to_visualize[i], // polyline has a path, defined by lat & lng 
                            strokeColor: color,
                            strokeOpacity: .50,
                            strokeWeight: 4,
                            zIndex: 99 // on top of every other shape
                        });

                        google.maps.event.addListener(line, 'mouseover', function (event) {
                            injectTooltip(event, line.title);
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
                } else if ('points' in r) { //linestrings
                    to_visualize = pm3_line_geojson_formatter(r);

                    let line = new google.maps.Polyline({ // it is a POLYLINE
                        title: projectId, // Add column that has name of project here !!!!!
                        path: to_visualize, // polyline has a path, defined by lat & lng 
                        strokeColor: color,
                        strokeOpacity: .50,
                        strokeWeight: 4,
                        zIndex: 99 // on top of every other shape
                    });

                    google.maps.event.addListener(line, 'mouseover', function (event) {
                        injectTooltip(event, line.title);
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
            let val = {
                name: "pm21Text",
                value: pm21dataCount
            };

            menu.push(val);
        } else if (mode == 1) {
            regionalText(pm21dataCount);
        }



    });
}