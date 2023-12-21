/* Last Edited: Sebastian 1/22/2020
    Added calculations
 */

/* Last Edited: Brian 1/05/2019
	Added plotpm2 method
 */
function plotPM2(mode, ex) {
    let color = "#039BE5";
    let sum = 0;
    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";
    if (mode == 0 || mode == 1) { // if we want regional (default) data
        let key = 'all_pm2';
        data_for_php = {
            key: key
        };
    } else if (mode == 2) {
        data_for_php = ex;
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";

        data_for_php = {
            key: 1,
            corridors_selected: ex,
            tableName: "pm_1_2"
        };
    } else if (mode == 4) {
        php_handler = "./backend/AOI.php";
        data_for_php = ex;
    }
    //draw boundries
    drawOzoneFigure("West Side");
    drawOzoneFigure("Upper Valley");
    drawOzoneFigure("Downtown");
    drawOzoneFigure("East Side");
    drawOzoneFigure("Northeast Central");
    drawOzoneFigure("Far East");
    drawOzoneFigure("Hueco Tanks");
    drawOzoneFigure("Mission Valley");
    drawOzoneFigure("Fabens");
    drawOzoneFigure("Anthony,NM");
    drawOzoneFigure("Santa Teresa");
    drawOzoneFigure("Sunland Park");
    drawOzoneFigure("Chaparral, NM");

    $.get(php_handler, data_for_php, function (data) {
        
        let median = 0;
        //to get median for color coding
        for (index in data.shape_arr) {
            if (currentType == "transit") {
                if (data.shape_arr[index].pt_nonsove > 0) {
                    sum += parseFloat(data.shape_arr[index].pt_publict);
                }
            } else if (currentType == "walking") {
                if (data.shape_arr[index].pt_nonsove > 0) {
                    sum += parseFloat(data.shape_arr[index].pt_walk);
                }
            } else if (currentType == "biking") {
                if (data.shape_arr[index].pt_nonsove > 0) {
                    sum += parseFloat(data.shape_arr[index].pt_bike);
                }
            }

        }
        median = (sum / data.shape_arr.length).toFixed(2); // for color coding
        for (index in data.shape_arr) {
            let temp = wktFormatter(data.shape_arr[index][shape]);
            let to_visualize = [];
            let hooverValue = 0;
            if (currentType == "transit") {
                hooverValue = parseInt(data.shape_arr[index].pt_publict, 10);
            } else if (currentType == "walking") {
                hooverValue = parseInt(data.shape_arr[index].pt_walk, 10);
            } else if (currentType == "biking") {
                hooverValue =  parseInt(data.shape_arr[index].pt_bike, 10);
            }
            if (mode > 0) {
                for (let i = 0; i < temp.length; i++) {
                    if (hooverValue == 0) {
                        color = "#9E9E9E"; //gray
                    } else if (hooverValue <= 25) {
                        color = "#00FF00"; // green
                    } else if (hooverValue <= 50) {
                        color = "#FFFF00"; // yellow
                    } else if (hooverValue <= 75) {
                        color = "#FFA500"; // orange
                    }else if (hooverValue <= 100){
                        color = "#FF0000"; // red
                    }
                    to_visualize.push(temp[i]);
                    polyToErase.plan.push();
                }
                let polygon = new google.maps.Polygon({
                    description: "",
                    description_value: '',
                    paths: to_visualize,
                    strokeColor: 'black',
                    strokeOpacity: 0.60,
                    strokeWeight: 0.80,
                    fillColor: color,
                    fillOpacity: 0.60,
                    zIndex: -1,
                    title: hooverValue,
                });
                polyToErase.exist.push(polygon);

                //   Hover Effect for Google API Polygons
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
        }

    
    });
}

//draws boundries
function drawOzoneFigure(figureName) {
    fetch(`./shapeBoundries/pm1.json`).then(function (response) {
            return response.json();
    }).then(function (myJson) {
        let active_corr = myJson[figureName];
        for (let index in active_corr) {
            let shp = active_corr[index]['shape'];
            let reader = new jsts.io.WKTReader();
            let r = reader.read(shp);
            let to_visualize = [];
            let coord;
            let ln = r.getCoordinates();
            for (let i = 0; i < ln.length; i++) {
                coord = {
                    lat: ln[i]['y'],
                    lng: ln[i]['x']
                };
                to_visualize.push(coord);
            }
            let line = new google.maps.Polygon({
                paths: to_visualize,
                strokeColor: 'black',
                strokeOpacity: 0.5,
                strokeWeight: 2,
                fillOpacity: 0,
                zIndex: -2 // on top of every other shape
            });  
            polyToErase.plan.push();
            polyToErase.exist.push(line);                                    
            line.setMap(map);
            polygons.push(line);
        }
    });
}

/**Creates graph data for PM2*/
function pm2Data(mode, ex) { // gets valuesPm2 for pm2 graph, returns array with percent
    let file = './mwt_handler.php';
    let key = 'all_pm1';
    // ! change the handler and key if needed according to the MODE requested
    if (mode == 0 || mode == 1) { // if we want regional (default) data
        key = 'all_pm2';
        key = {
            key: key
        };
    } else if (mode == 2) {
        shape = 'ST_AsText(SHAPE)';
        file = "corridor_handlerB.php";

        key = {
            key: 1,
            corridors_selected: ex,
            tableName: "pm_1_2"
        };
    } else if (mode == 4) {
        file = "./backend/AOI.php";
        key = ex;
    }

    /** Fetch data from database */
    $.get(file, key).done(function (data) { //succesful
        //acknowledge fetch
        let for_pm2 = {
            SOV: -1,
            Walking: -1,
            Biking: -1,
            Transit: -1,
            Non_SOV: -1
        };

        // All BELOW IS MODE INDEPENDENT..data comes from the variable 'file'; the specific handler [AOI,MWT,CORRIDOR]
        let nonsove = [];
        let b_e1 = [];
        let walk_data = []
        let bike_data = []
        let public_trans_data = []
        for (let index = 0; index < data.shape_arr.length; index++) {
            nonsove.push(parseFloat(data.shape_arr[index].ra_nonsove));
            b_e1.push(parseFloat(data.shape_arr[index].e1));
            walk_data.push(parseFloat(data.shape_arr[index].ra_walk));
            bike_data.push(parseFloat(data.shape_arr[index].ra_bike));
            public_trans_data.push(parseFloat(data.shape_arr[index].ra_publict));
        }

        //Non SOV
        let data_avg = arrSum(nonsove) / arrSum(b_e1);
        for_pm2.Non_SOV = data_avg * 100;

        //SOV
        for_pm2.SOV = 100 - (data_avg * 100);

        // Walking
        data_avg = arrSum(walk_data) / arrSum(b_e1);
        for_pm2.Walking = data_avg * 100;

        // Biking
        data_avg = arrSum(bike_data) / arrSum(b_e1);
        for_pm2.Biking = data_avg * 100;

        // Transit
        data_avg = arrSum(public_trans_data) / arrSum(b_e1);
        for_pm2.Transit = data_avg * 100;

        // Draw Shapes
        plotPM2(mode, ex);

        if (mode == 0) {
            let transitValue = {
                name: "pm2-transit",
                value: for_pm2.Transit.toFixed(2) + "%"
            };
            let bikingValue = {
                name: "pm2-biking",
                value: for_pm2.Biking.toFixed(2) + "%"
            };
            let walkingValue = {
                name: "pm2-walking",
                value: for_pm2.Walking.toFixed(2) + "%"
            };

            menu.push(transitValue);
            menu.push(bikingValue);
            menu.push(walkingValue);

        } else if (mode == 1) {
            regionalText(for_pm2);

        } else if (mode == 2) {
            let corr = translateCorridor(ex.corridors_selected); // what corridor are we on?
            dynamicCorridorText(corr, for_pm2);
        } else if (mode == 4) {
            //	let corr = translateCorridor(data_to_plot.corridors_selected); // what corridor are we on?
            dynamicCorridorText("AOI", for_pm2);
        }
    }).fail(function (error) { //error
        alert('Whoops, we could not retrieve data from our database. Check your internet connection or contact MPO');
        console.log(error);
    });
}

function piechartpm2(ctx, data) {
    let php_handler = "mwt_handler.php";
    let key = 'pm_1_2_table';
    data_for_php = { key: key };
    let dataProperty;

    switch (currentType) {
        case 'transit':
            dataProperty = 'Transit';
            break;
        case 'biking':
            dataProperty = 'Pedalcycling';
            break;
        case 'walking':
            dataProperty = 'Walking';
            break;
        // Add more cases for additional chart types
        default:
            console.error(`Unsupported chart type: ${currentType}`);
            return;
    }

    $.get(php_handler, data_for_php, function (data) {
        const areas = [];
        const driveAloneValues = [];
        for (index in data.shape_arr) {
            const entry = data.shape_arr[index];
            areas.push(entry.Areas);
            driveAloneValues.push(parseFloat(entry[dataProperty]));
        }
        // Define colors for the bars
        const barColors = 'rgba(33,150,243,1)';

        // Creating the bar chart
        const myBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: areas,
                datasets: [{
                    label: 'Drive Alone',
                    data: driveAloneValues,
                    backgroundColor: barColors,
                    borderColor: barColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Areas'
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: `${currentType} (%)`
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return data['datasets'][0]['label'] + ': ' + tooltipItem.yLabel.toFixed(1) + '%';
                        }
                    }
                }
            }
        });
    });
}
