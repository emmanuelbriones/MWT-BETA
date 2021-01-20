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
            tableName: "pm_1_2_new"
        };
    } else if (mode == 4) {
        php_handler = "./backend/AOI.php";
        data_for_php = ex;
    }
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
                hooverValue = parseFloat(data.shape_arr[index].pt_publict).toFixed(2);
            } else if (currentType == "walking") {
                hooverValue = parseFloat(data.shape_arr[index].pt_walk).toFixed(2);
            } else if (currentType == "biking") {
                hooverValue = parseFloat(data.shape_arr[index].pt_bike).toFixed(2);
            }
            if (mode > 0) {
                for (let i = 0; i < temp.length; i++) {
                    if (hooverValue == 0) {
                        color = "#9E9E9E"; //gray
                    } else if (hooverValue < median) {
                        color = "#64B5F6"; // light blue
                    } else if (hooverValue == median) {
                        color = "#1565C0"; // blue
                    } else if (hooverValue > median) {
                        color = "#1A237E"; // dark blue
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
                    strokeWeight: 0.70,
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
            tableName: "pm_1_2_new"
        };
    } else if (mode == 4) {
        file = "./backend/AOI.php";
        key = ex;
    }

    /** Fetch data from database */
    $.get(file, key).done(function (data) { //succesful
        //acknowledge fetch
        //   if(mode != 0){ alert('Retrieving Data, this might take a minute to load');}
        let for_pm2 = {
            SOV: -1, //
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
/** Draws pie chart for pm2*/
/*function piechartpm2(ctx, data) {
    colors = [];
    colors = [
        'rgba(255,82,0,0.5)',
        'rgba(92,187,3,0.5)',
        'rgba(117,36,221,0.5)',
        'rgba(228,245,20,0.5)',
    ];
    myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: [
                    data.Transit.toFixed(2),
                    data.Biking.toFixed(2),
                    data.Walking.toFixed(2),
                    data.Non_SOV.toFixed(2)
                ],
                backgroundColor: colors,
                label: 'Dataset 1'
            }],
            labels: [
                'Transit',
                'Biking',
                'Walking',
                'Other Modes',
            ]
        },
        options: {
            responsive: true,
            legend: {
                labels: {
                    fontSize: 13,
                    boxWidth: 15
                }
            },
            /* title: {
                 display: true,
                 text: 'Title 2'
             },*/
            /*tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                    }
                }
            }
        }

    });
}*/

function piechartpm2(ctx, data) {
    var data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: 84.0,
            title: { text: "Transit" },
            type: "indicator",
            mode: "gauge+number"
        }
    ];
    
    var layout = { width: 300, height: 200, margin: { t: 0, b: 0 } };
    Plotly.newPlot('chart1', data, layout);
}