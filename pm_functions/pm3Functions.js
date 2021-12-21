/**
 * There are 4 types of mode
 * Mode 0: This is used when the page loads for the 1st time. Calculates Menu Text Only
 * Mode 1: Regional Performance Points and data
 * Mode 2: Corridor Performance Points and data
 * Mode 3: Corridor Data only, data for benchmark
 * Mode 4: AOI
 */

function pm3Data(mode, ex) {

    let pm3TextData = {
        highAvg: 0,
        lowAvg: 1000000000,
        highRoute: 0,
        lowRoute: 0,
        tot: 0,
        yearly_data: [0,0,0,0,0]

    }
    let data_for_php = {};
    let color = '#03A9F4'; // default
    let php_handler = "mwt_handler.php";
    let shape = "shape";

    if (mode == 0 || mode == 1) {
        let key = 'all_pm3';
        data_for_php = {
            key: key
        };
    } else if (mode == 2 || mode == 3) {
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";
        data_for_php = {
            key: 3,
            corridors_selected: ex,
            tableName: "pm3"
        };
    } else if (mode == 4) {
        php_handler = "./backend/AOI.php";
        data_for_php = ex;
    }

    $.get(php_handler, data_for_php, function (data) { // ajax call to populate pavement lines
        let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
        for (index in data.shape_arr) { // iterates through every index in the returned element (data['shape_arr'])
            let shp = data.shape_arr[index].shape; // shape is LINESTRING or MULTILINESTRING 
            let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
            let to_visualize = []; // used to populate the map (latitude & longitude)

            //PMS Data/Columns
            let route = parseInt(data.shape_arr[index].route_1); // used to color code line
            let avg = parseFloat(data.shape_arr[index].avg_riders);
    
            pm3TextData.yearly_data[0] += parseInt(data.shape_arr[index].f2015)
            pm3TextData.yearly_data[1] += parseInt(data.shape_arr[index].f2016)
            pm3TextData.yearly_data[2] += parseInt(data.shape_arr[index].f2017)
            pm3TextData.yearly_data[3] += parseInt(data.shape_arr[index].f2018)
            pm3TextData.yearly_data[4] += parseInt(data.shape_arr[index].f2019)

            pm3TextData.tot += avg;
            //Draw Line(s)
            if (mode == 1 || mode == 2 || mode == 4) {
                to_visualize = pm3_polyline_geojson_formatter(r);
                // if (avg > 2776.666667 && avg < 107271.682952) {
                //     color = '#FFEB3B';
                // } else if (avg > 107271.682951 && avg < 388321.351849) {
                //     color = '#FF9800';
                // } else if (avg > 388321.351848 && avg < 1144232.200000) {
                //     color = '#2196F3';
                // }
                if (avg > 0 && avg < 100000) {
                    color = '#078a00';
                } else if (avg > 100000 && avg < 400000) {
                    color = '#FF9800';
                } else if (avg > 400000) {
                    color = '#2196F3';
                }
                for (i in to_visualize) {
                    let line = new google.maps.Polyline({ // it is a POLYLINE
                        path: to_visualize[i], // polyline has a path, defined by lat & lng 
                        strokeColor: color,
                        strokeOpacity: .50,
                        strokeWeight: 4,
                        zIndex: 99 // on top of every other shape
                    });

                    google.maps.event.addListener(line, 'mouseover', function (event) {
                        injectTooltip(event, commafy(parseInt(avg)));
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
            //update highest average and Route
            if (avg > pm3TextData.highAvg) {
                pm3TextData.highAvg = avg;
                pm3TextData.highRoute = route;
            }
            //update lowest Average and Route
            if (avg < pm3TextData.lowAvg) {
                pm3TextData.lowAvg = avg;
                pm3TextData.lowRoute = route;
            }
        }
        //fix values for text
        pm3TextData.highAvg = parseInt(pm3TextData.highAvg);
        pm3TextData.lowAvg = parseInt(pm3TextData.lowAvg);
        pm3TextData.tot = parseInt(pm3TextData.tot);

        let corr = translateCorridor(ex); // what corridor are we on?
        if (mode == 0) {
            let stpm3 = "";
            stpm3 = commafy(parseInt(pm3TextData.tot));
            let value = {
                name: "pm3Text",
                value: stpm3
            };
            menu.push(value);
        } else if (mode == 1) {
            regionalText(pm3TextData);
        } else if (mode == 2) {
            dynamicCorridorText(corr, pm3TextData);
        } else if (mode == 4) {
            dynamicCorridorText('AOI', pm3TextData);
        }
    });
}

function pm3_line_geojson_formatter(data) {
    let res = [];
    let shape = data.points.coordinates; //reduced to the array of points.
    for (let point in shape) {
        let formatted_point = {
            lat: parseFloat(shape[point].x),
            lng: parseFloat(shape[point].y),
        };
        res.push(formatted_point);
    }
    return res;
}

function pm3_polyline_geojson_formatter(data) {
    let res = [];
    let shape = data.geometries; // reduce to a anrry of linestrings
    for (let item in shape) {
        let segment = line_geojson_formatter(shape[item]);
        res.push(segment);
    }
    return res;
}

function chart_pm3 (ctx, data) {
    var barChartData = {
        labels: [2015, 2016, 2017, 2018, 2019],
        datasets: [{
            label: 'Ridership',
            backgroundColor: ['#03A9F4', '#CDDC39', '#FFEB3B', '#FFAB40', '#d50000'],
            data: data.yearly_data
        }]
    };

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
            tooltips: {
                callbacks: {
                    /**
                     * Assigns a comma to the axis for better readability.
                     */
                    label: function(tooltipItem, data) {
                        var value = data.datasets[0].data[tooltipItem.index];
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);
                        value = value.join(',');
                        return value;
                    }
                }
            },
            legend: {
                display: false,
            },
            title:{
                display: true,
                text: "Annual Ridership",
                fontSize: 10
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                    ticks: {}
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        userCallback: function(value, index, values) {
                            value = value.toString();
                            value = value.split(/(?=(?:...)*$)/);
                            value = value.join(',');
                            return value;
                        }
                    }               
                }],

            }
        }
    })
}