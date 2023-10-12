function pm25Data(mode, ex) {
    let pm25Data = {
        good: [0, 0, 0, 0, 0],
        fair: [0, 0, 0, 0, 0],
        poor: [0, 0, 0, 0, 0],
        percentage_poor: [0, 0, 0, 0, 0],

        tot_miles: 0,
        poor_mi_perc: 0,
        tot_poor_mi: 0,

        tx_miles: 0,
        tx_poor_mi: 0,
        tx_poor_mi_perc: 0,

        nm_miles: 0,
        nm_poor_mi: 0,
        nm_poor_mi_perc: 0,

        latestYear: 0
    }

    let color = '#03A9F4'; // default
    let php_handler = "mwt_handler.php";
    let shape = "shape";
    let data_for_php = 0;

    if (mode == 0 || mode == 1) {
        let key = 'all_pm25';
        data_for_php = {
            key: key
        };
    } else if (mode == 4) {
        php_handler = "./backend/AOI.php";
        data_for_php = ex;
    } else if (mode == 2) {
        php_handler = "corridor_handlerB.php";
        shape = 'ST_AsText(SHAPE)';
        let tableName = "pm25";

        data_for_php = {
            key: 25,
            corridors_selected: ex,
            tableName: tableName
        };
    }

    $.get(php_handler, data_for_php, function (data) { // ajax call to populate pavement lines
        let poorconditionMiles = 0;
        let poorconditionMilesTX = 0;
        let poorconditionMilesNM = 0;
        let latestYear = 0;

        //get latest year
        for (index in data.shape_arr) {
            let year = data.shape_arr[index].year_recor;
            if (latestYear < year) {
                latestYear = year;
            }
        }

        pm25Data.latestYear = latestYear;

        if (mode == 0) {
            //   console.log(ex);
            if (ex == 'd') {
                ex = 'driving';
            } else if (ex == 't') {
                ex = 'transit';
            } else if (ex == 'f') {
                ex = 'freight';
            }
        }

        for (index in data.shape_arr) { // iterates through every index in the returned element (data['shape_arr'])
            let shp = data.shape_arr[index][shape]; // shape is LINESTRING or MULTILINESTRING
            let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
            let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
            let to_visualize = []; // used to populate the map (latitude & longitude)
            let coord; // will be an object to push coordinates to populate the map
            let ln = r.getCoordinates(); // parses the shape into lat & lng

            //PMS Data
            let iri = parseInt(data.shape_arr[index].iri);
            let year = parseInt(data.shape_arr[index].year_recor);
            let miles = parseFloat(data.shape_arr[index].miles);
            let state = data.shape_arr[index].state_code;
            let pm25PavRating = data.shape_arr[index].PAV_RATING;

            let type;
            if(data.shape_arr[index].type != null) {
                type = (data.shape_arr[index].type).toLowerCase();
            }

            // makes sure to only calculate the current mode
            if (type == currentType || ex == type) {
                //Draw latest year
                if (year == latestYear) {
                    if (mode == 1 || mode == 2 || mode == 4) {
                        for (let i = 0; i < ln.length; i++) {
                            coord = {
                                lat: ln[i]['x'],
                                lng: ln[i]['y']
                            }; // this is how lat & lng is interpreted by the tool
                            to_visualize.push(coord); // pushing the interpretation to our to_visualize array
                        }
                         // filter colors 
                        if (pm25PavRating == 'GOOD') { // good condition
                            color = '#8BC34A'; //green
                        } else if (pm25PavRating == 'FAIR') { // Fair condition
                            color = '#FFEA00'; //yellow
                        } else if (pm25PavRating == 'POOR') { // Poor condition
                            color = '#d50000'; //red
                        }
                        let line = new google.maps.Polyline({ // it is a POLYLINE
                            path: to_visualize, // polyline has a path, defined by lat & lng 
                            strokeColor: color,
                            strokeOpacity: .50,
                            strokeWeight: 4,
                            zIndex: 99 // on top of every other shape
                        });
                        // Hover Effect for Google API Polygons
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
        }
        let corr = translateCorridor(ex); // what corridor are we on?

        if (mode == 0) {
            let name = "";
            if (ex == 'driving') {
                name = "pm25DText";
            } else if (ex == 'transit') {
                name = "pm25T_Text";
            } else if (ex == 'freight') {
                name = "pm25FText";
            }
            let val = {
                name: name,
                value: pm25Data.poor_mi_perc + "%"
            };
            menu.push(val);

        } else if (mode == 1) {
            regionalText(pm25Data);
        } else if (mode == 2) {
            dynamicCorridorText(corr, pm25Data);
        } else if (mode == 4) {
            dynamicCorridorText("AOI", pm25Data);
        }
    });

    data_for_php = {
        key: "pm25_data",
        type: currentType
    };

    //get information from new table
    $.get("mwt_handler.php", data_for_php, function (data) {
        for (index in data.shape_arr) {
            pm25Data.good[index] = data.shape_arr[index].good;
            pm25Data.fair[index] = data.shape_arr[index].fair;
            pm25Data.poor[index] = data.shape_arr[index].poor;
            pm25Data.percentage_poor[index] = data.shape_arr[index].percentage_bad;
        }
    });

}

function pm25StackedChart(ctx, data) {
    var barChartData = {
        labels: [data.latestYear - 4, data.latestYear - 3, data.latestYear - 2, data.latestYear - 1, data.latestYear],
        datasets: [{
            label: 'Good',
            backgroundColor: 'rgba(139,195,74 ,1)',
            data: data.good
        }, {
            label: 'Fair',
            backgroundColor: 'rgb(255, 234, 0)',
            data: data.fair
        }, {
            label: 'Poor',
            backgroundColor: 'rgba(213,0,0 ,1)',
            data: data.poor
        }]

    };

    var chartBar = new Chart(ctx, {
        type: "bar",
        data: barChartData,
        options: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 10,
                    boxWidth: 6
                }
            },
            title: {
                display: true,
                text: 'Past 5 years'
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    stacked: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Lane-miles in all conditions'
                    }
                }]
            }
        }
    });

}

function pm25chartLine(ctx, data) {
    var data = {
        labels: [data.latestYear - 4, data.latestYear - 3, data.latestYear - 2, data.latestYear - 1, data.latestYear],
        datasets: [{
            label: "Poor Condition",
            data: data.percentage_poor,
            backgroundColor: "blue",
            borderColor: "lightblue",
            fill: false,
            lineTension: 0,
            radius: 5
        }, ]
    };

    //options
    var options = {
        responsive: true,
        title: {
            display: true,
            text: 'Percentage of pavements in poor condition'
        },
        legend: {
            display: true,
            position: "bottom",
            labels: {
                fontColor: "#333",
                fontSize: 12,
                boxWidth: 10
            }
        },
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Percentage based 100%'
                }
            }]
        }

    };

    //create Chart class object
    var chart = new Chart(ctx, {
        type: "line",
        data: data,
        options: options
    });
}