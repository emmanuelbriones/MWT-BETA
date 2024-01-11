/** 
 * Creates 2 graphs for PM26
 * Calculates percentage of Bridge Conditions
 *  
 */

/**
 * There are 5 types of mode
 * Mode 0: This is used when the page loads for the 1st time. Calculates Menu Text Only
 * Mode 1: Regional Performance Points and data
 * Mode 2: Corridor Performance Points and data
 * Mode 3: Corridor Data only, data for benchmark
 * Mode 4: AOI points and data only
 */

function pm26Data(mode, ex) {
    let pm26Data = {
        years: ['2019','2020','2021','2022','2023'],

        good: [],
        fair: [],
        poor: [],

       good_count: [0,0,0,0,0],
       fair_count: [0,0,0,0,0],
       poor_count: [0,0,0,0,0],

       dynamicTot: 0,
       dynamicPoor: 0,

       totBridges: [0,0,0,0,0],
       tnodatabridges: 0,

       lowestRating: 0, 

       totBad: [0,0,0,0,0]

    };

    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";

    if (mode == 0 || mode == 1) { // if we want regional (default) data
        let key = 'all_pm26';
        data_for_php = {
            key: key
        };

    } else if (mode == 2 || mode == 3) { // if we want corridors
        shape = 'ST_AsText(SHAPE)'; // fix -> add alias (AS) for column in mysql query: SELECT column AS shape
        php_handler = "corridor_handlerB.php";
        let key = 26;
        let tableName = 'pm26';

        data_for_php = {
            key: key,
            corridors_selected: ex,
            tableName: tableName
        };
    } else if (mode == 4) {
        data_for_php = ex; // in AOI: ex = AOI string , table from DB -> needed for PHP handler
        php_handler = "./backend/AOI.php";
    }

    $.get(php_handler, data_for_php, function (data) {
        let latestYear = 0;
        let year_found = 2023;
        let year_index = 0;
        let region = 'Texas'            

        let image = "./img/markers/crash.png";
        let condition = '';
        var lowestRating = 0;

        for (index in data.shape_arr) { // Organize information into dictionaries
            let type = (data.shape_arr[index]['mode']).toLowerCase();
            let typeHolder = currentType;
            // lowestRating = Math.min(deck_cond_, superstruc, substruc_c);

            let overall_cond = data.shape_arr[index]['brdg_cond'];
                
            if (mode == 0) {
                let zeroType = "";
                if (ex == "d") {
                    typeHolder = "driving";
                } else if (ex == "t") {
                    typeHolder = "transit";
                } else if (ex == "f") {
                    typeHolder = "freight";
                }

            }

            if (typeHolder == type) {
                //count bridges by region
                pm26Data.totBridges[year_index]++;
                // Count Conditions by Region. Used for Graph
                if (overall_cond == 'G') {
                    condition = 'Good Condition';
                    image = "./img/markers/green.png";
                    pm26Data.good_count[year_index]++;
                } else if (overall_cond == 'F') {
                    condition = 'Fair Condition';
                    image = "./img/markers/yellow.png"
                    pm26Data.fair_count[year_index]++;
                } else if (overall_cond == 'P') { 
                    condition = 'Poor Condition';
                    image = "./img/markers/red.png";
                    pm26Data.totBad[year_index]++;
                    pm26Data.poor_count[year_index]++;
                } else { //null
                    condition = 'No data';
                    image = "./img/markers/grey.png";
                    pm26Data.no_data_count[year_index]++;
                }
            }


            let holder = [];
            if (mode == 1 || mode == 2 || mode == 4) { // mode 1 and 2 allows us to draw points 
                // holder.push(wktFormatterPoint(data.shape_arr[index][shape]));
                // holder = holder[0][0]; // Fixes BLOBs
                // let to_visualize = {
                //     lat: parseFloat(holder[0].lat),
                //     lng: parseFloat(holder[0].lng)
                // };

                let latLng = data.shape_arr[index];
                let to_visualize = {
                    lat: parseFloat(latLng.lat),
                    lng: parseFloat(latLng.lng)
                };

                let titleH = condition + ": " + lowestRating;
                if (lowestRating == 999) {
                    titleH = condition;
                }
                let point = new google.maps.Marker({
                    position: to_visualize,
                    title: titleH,
                    icon: image
                });
                // draw by 1 type at a time
                if (currentType == type) {
                    point.setMap(map);
                    points.push(point);
                }

            }

        }
    }).fail(function (error) {
        pm_error_handler(mode, ex);
        toggleSpinner('off');
    });

    data_for_php = {
        key: "pm26_table"
    };
    $.get(php_handler, data_for_php, function (data) {
        for (index in data.shape_arr) {
            if ((data.shape_arr[index]['Type']).toLowerCase() == currentType){
                pm26Data.good.push(data.shape_arr[index].Good);
                pm26Data.fair.push(data.shape_arr[index].Fair);
                pm26Data.poor.push(data.shape_arr[index].Poor);
            }
        }

        if (mode == 0) { // menu text, this is only done once
            mpo = (mpo * 10).toString() + ' %';
            let name = "";
            if (ex == 'd') {
                name = "pm26DText";
            } else if (ex == 't') {
                name = "pm26TText";
            } else if (ex == 'f') {
                name = "pm26FText";
            }
            let value = {
                name: name,
                value: pm26Data.dynamicPoor + "%"
            };
            menu.push(value);
        }

        let corr = translateCorridor(ex); // what corridor are we on?

        if (mode == 1) {
            regionalText(pm26Data);
        } else if (mode == 2) {
            dynamicCorridorText(corr, pm26Data); // Send graph data and current corridor to dynamic text for corridors
        } else if (mode == 4) {
            dynamicCorridorText("AOI", pm26Data); // Send graph data and current corridor to dynamic text for corridors
        } else if(mode == 3){
            let data = {
                pm:'26',
                type:currentType,
                title:"Bridge & culvert condition 2018",
                corridor: corr,
                value:pm26Data.dynamicPoor + "%"
            }
            benchmarkData.push(data);
        }
    }).fail(function (error) {
        pm_error_handler(mode, ex);
        toggleSpinner('off');
    });

}

function chart_pm26(g1, data) {
    //  pm26Percentates();
    var myChart = new Chart(g1, {
        type: 'line',
        data: {
            labels: data.years,
            datasets: [{
                    label: "Good Condition",
                    data: data.good,
                    backgroundColor: 'green',
                    borderColor: 'green',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Fair Condition',
                    data: data.fair,
                    backgroundColor:'rgba(247, 202, 24, 1)',
                    borderColor: 'rgba(247, 202, 24, 1)',
                    borderWidth: 1,
                    fill: false
                },
                {
                    label: 'Poor Condition',
                    data: data.poor,
                    backgroundColor:'rgba(242, 38, 19, 1)',
                    borderColor: 'rgba(242, 38, 19, 1)',
                    borderWidth: 1,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            legend: {
                labels: {
                    fontSize: 14,
                    boxWidth: 15
                }
            },
            title: {
                display: true,
                text: 'El Paso MPO area (' + data.totBridges[4] + ' bridges)'
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Percentage',
                    },
                }, ],
            },
        }
    });

}
