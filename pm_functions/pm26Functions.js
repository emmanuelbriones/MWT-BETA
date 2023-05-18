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
        years: [],

        good: [0,0,0,0,0],
        fair: [0,0,0,0,0],
        poor: [0,0,0,0,0],
        noData: [0,0,0,0,0],

       good_count: [0,0,0,0,0],
       fair_count: [0,0,0,0,0],
       poor_count: [0,0,0,0,0],
       no_data_count: [0,0,0,0,0],

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
        for(index in data.shape_arr) {
            let year_found = parseInt(data.shape_arr[index].year);
            if(year_found > latestYear) latestYear = year_found;
        }
        pm26Data.years.push(latestYear - 4);
        pm26Data.years.push(latestYear - 3);
        pm26Data.years.push(latestYear - 2);
        pm26Data.years.push(latestYear - 1);
        pm26Data.years.push(latestYear);

        let year_index = -1;

        let image = "./img/markers/crash.png";
        let condition = '';
        var lowestRating = 0;

        for (index in data.shape_arr) { // Organize information into dictionaries
            let year_found = parseInt(data.shape_arr[index].year);
            let deck_cond_ = parseInt(data.shape_arr[index]['deck_cond_']);
            let superstruc = parseInt(data.shape_arr[index]['superstruc']);
            let substruc_c = parseInt(data.shape_arr[index]['substruc_c']);
            let region = data.shape_arr[index]['region'];
            let type = (data.shape_arr[index]['mode']).toLowerCase();
            let typeHolder = currentType;
            lowestRating = Math.min(deck_cond_, superstruc, substruc_c);

            if (year_found == latestYear - 4) {
                year_index = 0;

            } else if (year_found == latestYear - 3) {
                year_index = 1;

            } else if (year_found == latestYear - 2) {
                year_index = 2;

            } else if (year_found == latestYear - 1) {
                year_index = 3;

            } else if (year_found == latestYear) {
                year_index = 4;
            }

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
                if (lowestRating >= 7 && lowestRating <= 9) {
                    condition = 'Good Condition';
                    image = "./img/markers/green.png";
                    pm26Data.good_count[year_index]++;
                } else if (lowestRating >= 5 && lowestRating <= 6) {
                    condition = 'Fair Condition';
                    image = "./img/markers/yellow.png"
                    pm26Data.fair_count[year_index]++;
                } else if (lowestRating >= 1 && lowestRating <= 4) { //old was >=0  && <= 4
                    condition = 'Poor Condition';
                    image = "./img/markers/red.png";
                    pm26Data.totBad[year_index]++;
                    pm26Data.poor_count[year_index]++;
                } else if (lowestRating == 0) { // old was 999
                    condition = 'No data';
                    image = "./img/markers/grey.png";
                    pm26Data.no_data_count[year_index]++;
                } else { //null
                    condition = 'No data';
                    image = "./img/markers/grey.png";
                    pm26Data.no_data_count[year_index]++;
                }
            }

            let holder = [];
            if(year_index == 4) {
                if (mode == 1 || mode == 2 || mode == 4) { // mode 1 and 2 allows us to draw points 
                    holder.push(wktFormatterPoint(data.shape_arr[index][shape]));
                    holder = holder[0][0]; // Fixes BLOBs
                    let to_visualize = {
                        lat: parseFloat(holder[0].lat),
                        lng: parseFloat(holder[0].lng)
                    };
                    let titleH = condition + ": " + lowestRating;
                    if (lowestRating == 999) {
                        titleH = condition;
                    }
                    let point = new google.maps.Marker({
                        position: to_visualize,
                        title: titleH,
                        // value: '',
                        icon: image
                    });
                    // draw by 1 type at a time
                    if (currentType == type) {
                        point.setMap(map);
                        points.push(point);
                    }

                }
            }

        }

        // tot counts
        let totBad = pm26Data.totBad[4];
        let mpoArea = pm26Data.totBridges[4]
        let mpo = ((totBad / mpoArea) * 100).toFixed(2);

        // TODO; Here
        pm26Data.tnodatabridges = pm26Data.no_data_count[4];
        pm26Data.dynamicTot = mpoArea;
        pm26Data.dynamicPoor = (((pm26Data.poor_count[4]) / pm26Data.dynamicTot) * 100).toFixed(2);

        for(var i =0; i<=4; i++) {
            if (pm26Data.good_count[i] != 0) {
                pm26Data.good[i] = ((pm26Data.good_count[i] / mpoArea) * 100).toFixed(2);
            }
            if (pm26Data.fair_count[i] != 0) {
                pm26Data.fair[i] = ((pm26Data.fair_count[i] / mpoArea) * 100).toFixed(2);
            }
            if (pm26Data.poor_count[i] != 0) {
                pm26Data.poor[i] = ((pm26Data.poor_count[i] / mpoArea) * 100).toFixed(2);
            }
            if (pm26Data.no_data_count[i] != 0) {
                pm26Data.noData[i] = ((pm26Data.no_data_count[i] / mpoArea) * 100).toFixed(2);
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
            console.log(pm26Data);
            console.log("BS");
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
                },
                {
                    label: 'No Data',
                    data: data.noData,
                    backgroundColor: 'rgba(149, 165, 166, 1)',
                    borderColor: 'rgba(149, 165, 166, 1)',
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
