
function pm25Data(mode, ex) {
    console.log("PM25 6/01/2020 Update by B");
    let pm25Data = {
        good: [0, 0, 0, 0, 0],
        fair: [0, 0, 0, 0, 0],
        poor: [0, 0, 0, 0, 0],

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

    let color = '#03A9F4';  // default
    let php_handler = "mwt_handler.php";
    let shape = "shape";
    let data_for_php = 0;

    if (mode == 0 || mode == 1) {
        let key = 'all_pm25';
        data_for_php = { key: key };
    } else if (mode == 4) {
        php_handler = "./backend/AOI.php";
        data_for_php = ex;
    }
    else if (mode == 2) {
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
            let type = (data.shape_arr[index].type).toLowerCase();

            // makes sure to only calculate the current mode
            if (type == currentType || ex == type) {
                //filter graph Data by Year, add counts on 3 conditions
                if (year == latestYear - 4) {
                    if (iri > 0 && iri < 95) { // good condition
                        pm25Data.good[0] += miles;
                    } else if (iri > 94 && iri < 171) { // Fair condition
                        pm25Data.fair[0] += miles;
                    } else if (iri > 170) { // Poor condition
                        pm25Data.poor[0] += miles;
                    }
                } else if (year == latestYear - 3) {
                    if (iri > 0 && iri < 95) {
                        pm25Data.good[1] += miles;
                    } else if (iri > 94 && iri < 171) {
                        pm25Data.fair[1] += miles;
                    } else if (iri > 170) {
                        pm25Data.poor[1] += miles;
                    }
                } else if (year == latestYear - 2) {
                    if (iri > 0 && iri < 95) {
                        pm25Data.good[2] += miles;
                    } else if (iri > 94 && iri < 171) {
                        pm25Data.fair[2] += miles;
                    } else if (iri > 170) {
                        pm25Data.poor[2] += miles;
                    }
                } else if (year == latestYear - 1) {
                    if (iri > 0 && iri < 95) {
                        pm25Data.good[3] += miles;
                    } else if (iri > 94 && iri < 171) {
                        pm25Data.fair[3] += miles;
                    } else if (iri > 170) {
                        pm25Data.poor[3] += miles;
                    }
                } else if (year == latestYear) {
                    if (iri > 0 && iri < 95) {
                        pm25Data.good[4] += miles;
                    } else if (iri > 94 && iri < 171) {
                        pm25Data.fair[4] += miles;
                    } else if (iri > 170) {
                        pm25Data.poor[4] += miles;
                    }
                }

                if (year == latestYear) {
                    if (iri > 170) {      // total poor condition miles
                        poorconditionMiles += miles;
                    }
                    //Texas 
                    if (state == 48 || state == "Texas") {
                        //total in tx
                        if (iri != 0) {
                            pm25Data.tx_miles += miles;
                        }

                        //poor in tx
                        if (iri > 170) {
                            pm25Data.tx_poor_mi += miles;
                        }

                    } else if (state == 35 || state == "New Mexico") {
                        if (iri != 0) {
                            pm25Data.nm_miles += miles;
                        }

                        if (iri > 170) {
                            pm25Data.nm_poor_mi += miles;
                        }
                    }
                }
                //Draw latest year
                if (year == latestYear) {
                    if (mode == 1 || mode == 2 || mode == 4) {
                        for (let i = 0; i < ln.length; i++) {
                            coord = { lat: ln[i]['y'], lng: ln[i]['x'] }; // this is how lat & lng is interpreted by the tool
                            to_visualize.push(coord); // pushing the interpretation to our to_visualize array
                        }
                        // filter colors 
                        if (iri > 0 && iri < 95) {
                            color = '#8BC34A'; //green
                        } else if (iri > 94 && iri < 171) {
                            color = '#F57C00'; //orange
                        } else if (iri > 170) {
                            color = '#d50000'; //red
                        } else if (iri == 0) { // No data
                            color = '#9E9E9E';
                        }
                        let line = new google.maps.Polyline({ // it is a POLYLINE
                            path: to_visualize, // polyline has a path, defined by lat & lng 
                            strokeColor: color,
                            strokeOpacity: .50,
                            strokeWeight: 4,
                            zIndex: 99 // on top of every other shape
                        });
                        // Hover Effect for Google API Polygons
                        google.maps.event.addListener(line, 'mouseover', function (event) { injectTooltip(event,commafy(parseInt(iri))); }); 
                        google.maps.event.addListener(line, 'mousemove', function (event) { moveTooltip(event); });
                        google.maps.event.addListener(line, 'mouseout', function (event) { deleteTooltip(event); });
                              
                        
                        line.setMap(map);
                        polylines.push(line);
                    }
                }
            }   
        }
 
        //totals
        pm25Data.tot_poor_mi = (pm25Data.nm_poor_mi + pm25Data.tx_poor_mi).toFixed(2);
        pm25Data.tot_miles = pm25Data.tx_miles + pm25Data.nm_miles;

        // Dynamic Text Calculations Percentages
        pm25Data.poor_mi_perc = ((pm25Data.tot_poor_mi / pm25Data.tot_miles) * 100).toFixed(2);
        pm25Data.tx_poor_mi_perc = ((pm25Data.tx_poor_mi / pm25Data.tx_miles) * 100).toFixed(2);
        pm25Data.nm_poor_mi_perc = ((pm25Data.nm_poor_mi / pm25Data.nm_miles) * 100).toFixed(2);

        // If we fixed used 'toFixed(2)' earlier it cause a bug. Estimating here worked
        pm25Data.good[0] = (pm25Data.good[0]).toFixed(2);
        pm25Data.good[1] = (pm25Data.good[1]).toFixed(2);
        pm25Data.good[2] = (pm25Data.good[2]).toFixed(2);
        pm25Data.good[3] = (pm25Data.good[3]).toFixed(2);
        pm25Data.good[4] = (pm25Data.good[4]).toFixed(2);

        pm25Data.fair[0] = (pm25Data.fair[0]).toFixed(2);
        pm25Data.fair[1] = (pm25Data.fair[1]).toFixed(2);
        pm25Data.fair[2] = (pm25Data.fair[2]).toFixed(2);
        pm25Data.fair[3] = (pm25Data.fair[3]).toFixed(2);
        pm25Data.fair[4] = (pm25Data.fair[4]).toFixed(2);

        pm25Data.poor[0] = (pm25Data.poor[0]).toFixed(2);
        pm25Data.poor[1] = (pm25Data.poor[1]).toFixed(2);
        pm25Data.poor[2] = (pm25Data.poor[2]).toFixed(2);
        pm25Data.poor[3] = (pm25Data.poor[3]).toFixed(2);
        pm25Data.poor[4] = (pm25Data.poor[4]).toFixed(2);
 
        let corr = translateCorridor(ex); // what corridor are we on?

        if (mode == 0) {
            if (ex == 'driving') {
                document.getElementById("pm25DText").innerHTML = pm25Data.poor_mi_perc + "%";
            } else if (ex == 'transit') {
                document.getElementById("pm25T_Text").innerHTML = pm25Data.poor_mi_perc + "%";
            } else if (ex == 'freight') {
                document.getElementById("pm25FText").innerHTML = pm25Data.poor_mi_perc + "%";
            }
            
        }
        else if (mode == 1) {
            regionalText(pm25Data);
        } else if (mode == 2) {
            dynamicCorridorText(corr, pm25Data);
        }
        else if(mode == 4){
            dynamicCorridorText("AOI", pm25Data);
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
            backgroundColor: 'rgba(239,108,0 ,1)',
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
                        labelString: 'Miles in all conditions'
                    }
                }]
            }
        }
    });

}
function pm25chartLine(ctx, data) {
    var data = {
        labels: [data.latestYear - 4, data.latestYear - 3, data.latestYear - 2, data.latestYear - 1, data.latestYear],
        datasets: [
            {
                label: "Poor Condition",
                data: data.poor,
                backgroundColor: "blue",
                borderColor: "lightblue",
                fill: false,
                lineTension: 0,
                radius: 5
            },
        ]
    };

    //options
    var options = {
        responsive: true,
        title: {
            display: true,
            text: 'Pavements in poor condition'
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
                    labelString: 'Number of miles on poor condition'
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
