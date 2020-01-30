/** 
 * Creates 2 graphs for PM26
 * Calculates percentage of Bridge Conditions
 *  
*/
/**
 * There are 4 types of mode
 * Mode 0: This is used when the page loads for the 1st time. Calculates Menu Text Only
 * Mode 1: Regional Performance Points and data
 * Mode 2: Corridor Performance Points and data
 * Mode 3: Corridor Data only, data for benchmark
 * Mode 4: AOI points and data only
 */

function pm26Data(mode, ex) {
    let pm26Data = {
        goodTX: 0,
        fairTX: 0,
        poorTX: 0,
        noDataTX: 0,

        goodNM: 0,
        fairNM: 0,
        poorNM: 0,
        noDataNM: 0,

        tx_good_count: 0,
        tx_fair_count: 0,
        tx_poor_count: 0,
        tx_no_data_count: 0,

        nm_good_count: 0,
        nm_fair_count: 0,
        nm_poor_count: 0,
        nm_no_data_count: 0,

        dynamicTot: 0,
        dynamicPoor: 0,

        totTXBridges: 0,
        totNMBridges: 0,
        tnodatabridges: 0,

        lowestRating: 0
    };

    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";

    if (mode == 0 || mode == 1) { // if we want regional (default) data
        let key = 'all_pm26F';
        if (currentType == "transit") {
            key = 'all_pm26T';
        }
        data_for_php = { key: key };


    } else if (mode == 2 || mode == 3) { // if we want corridors
        shape = 'ST_AsText(SHAPE)'; // fix -> add alias (AS) for column in mysql query: SELECT column AS shape
        php_handler = "corridor_handlerB.php";

        data_for_php = {
            key: 26,
            corridors_selected: ex,
            tableName: "pm26"
        };
    }
    else if (mode == 4) {
        data_for_php = ex; // in AOI: ex = AOI string , table from DB -> needed for PHP handler
        php_handler = "./backend/AOI.php";
    }

    $.get(php_handler, data_for_php, function (data) {
        let image = "./img/markers/crash.png";
        let condition = '';
        let deck_cond_ = 0;
        let superstruc = 0;

        let substruc_c = 0;
        //let region = '';

        for (index in data.shape_arr) { // Organize information into dictionaries
            //hold info of 1 point at a time


            deck_cond_ = data.shape_arr[index]['deck_cond_'];
            superstruc = data.shape_arr[index]['superstruc'];

            substruc_c = data.shape_arr[index]['substruc_c'];
            //region = data.shape_arr[index]['region'];

            //convert Values
            if (deck_cond_ == "N") {
                deck_cond_ = 999;
            }
            if (superstruc == "N") {
                superstruc = 999;
            }
            if (substruc_c == "N") {
                substruc_c = 999;
            }

            // if they are all equal
            if (deck_cond_ == superstruc && deck_cond_ == substruc_c) {
                lowestRating = deck_cond_;
            }
            // if a < b && a < c {a is the lowest}
            else if (deck_cond_ < superstruc && deck_cond_ < substruc_c) {
                lowestRating = deck_cond_;
            }
            // if we reach this line, then we know that a is not the lowest. Is it b or c?
            else if (superstruc < substruc_c) {
                lowestRating = superstruc;
            }
            // if we reach this point it means that neither a or b are the lowest
            else {
                lowestRating = substruc_c;
            }

            //count bridges by region
            if (region == "TX") {
                pm26Data.totTXBridges++;
            } else if (region == "NM") {
                pm26Data.totNMBridges++;
            }

            // Count Conditions by Region. Used for Graph
            if (lowestRating >= 7 && lowestRating <= 9) {
                condition = 'Good Condition';
                image = "./img/markers/green.png";
                if (region == 'TX') {
                    pm26Data.tx_good_count++;
                } else {
                    pm26Data.nm_good_count++;
                }
            } else if (lowestRating >= 5 && lowestRating <= 6) {
                condition = 'Fair Condition';
                image = "./img/markers/yellow.png"
                if (region == 'TX') {
                    pm26Data.tx_fair_count++;
                } else {
                    pm26Data.nm_fair_count++;
                }
            } else if (lowestRating >= 0 && lowestRating <= 4) {
                condition = 'Poor Condition';
                image = "./img/markers/red.png";
                if (region == 'TX') {
                    pm26Data.tx_poor_count++;
                } else {
                    pm26Data.nm_poor_count++;
                }
            } else if (lowestRating == 999) {
                condition = 'No data';
                image = "./img/markers/grey.png";
                if (region == 'TX') {
                    pm26Data.tx_no_data_count++;
                } else {
                    pm26Data.nm_no_data_count++;
                }
            } else {//null
                condition = 'No data';
                image = "./img/markers/grey.png";
                if (region == 'TX') {
                    pm26Data.tx_no_data_count++;
                } else {
                    pm26Data.nm_no_data_count++;
                }
            }
            let holder = [];
            if (mode == 1 || mode == 2 || mode == 4) { // mode 1 and 2 allows us to store points 
                holder.push(wktFormatterPoint(data.shape_arr[index][shape]));
                holder = holder[0][0]; // Fixes BLOBs
                let to_visualize = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };
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
                point.setMap(map);
                points.push(point);
            }

        }

        // tot counts
        let totTX = pm26Data.tx_good_count + pm26Data.tx_fair_count + pm26Data.tx_poor_count + pm26Data.tx_no_data_count;
        let totNM = pm26Data.nm_good_count + pm26Data.nm_fair_count + pm26Data.nm_poor_count + pm26Data.nm_no_data_count;
        let totBad = pm26Data.tx_poor_count + pm26Data.nm_poor_count;
        let mpoArea = totTX + totNM;
        let mpo = ((totBad / mpoArea) * 100).toFixed(2);

        pm26Data.tnodatabridges = pm26Data.tx_no_data_count + pm26Data.nm_no_data_count;
        pm26Data.dynamicTot = pm26Data.totTXBridges + pm26Data.totNMBridges;
        pm26Data.dynamicPoor = (((pm26Data.tx_poor_count + pm26Data.nm_poor_count) / pm26Data.dynamicTot) * 100).toFixed(2);

        //tx graph data
        if (pm26Data.tx_good_count != 0) {
            pm26Data.goodTX = ((pm26Data.tx_good_count / totTX) * 100).toFixed(2);
        }
        if (pm26Data.tx_fair_count != 0) {
            pm26Data.fairTX = ((pm26Data.tx_fair_count / totTX) * 100).toFixed(2);
        }
        if (pm26Data.tx_poor_count != 0) {
            pm26Data.poorTX = ((pm26Data.tx_poor_count / totTX) * 100).toFixed(2);
        }
        if (pm26Data.tx_no_data_count != 0) {
            pm26Data.noDataTX = ((pm26Data.tx_no_data_count / totTX) * 100).toFixed(2);
        }
        //nm
        if (pm26Data.nm_good_count != 0) {
            pm26Data.goodNM = ((pm26Data.nm_good_count / totNM) * 100).toFixed(2);
        }
        if (pm26Data.nm_fair_count != 0) {
            pm26Data.fairNM = ((pm26Data.nm_fair_count / totNM) * 100).toFixed(2);
        }
        if (pm26Data.nm_poor_count != 0) {
            pm26Data.poorNM = ((pm26Data.nm_poor_count / totNM) * 100).toFixed(2);
        }
        if (pm26Data.nm_no_data_count != 0) {
            pm26Data.noDataNM = ((pm26Data.nm_no_data_count / totNM) * 100).toFixed(2);
        }

        if (mode == 0) { // menu text, this is only done once
            // ! mpo = ( (tx_poor + nm_poor) / 2 ) * 10  | operation was missing multiplication by 10 & text was missing  ' % '  character  
            mpo = (mpo * 10).toString() + ' %';

            document.getElementById("pm26Text").innerHTML = mpo;
        }

        let corr = translateCorridor(ex); // what corridor are we on?

        if (mode == 1) {
            regionalText(pm26Data);
        }
        else if (mode > 1 & mode < 4) {
            dynamicCorridorText(corr, pm26Data); // Send graph data and current corridor to dynamic text for corridors
        }
        else if (mode == 4) {
            dynamicCorridorText("AOI", pm26Data); // Send graph data and current corridor to dynamic text for corridors
        }

    }).fail(function (error) {
        console.log(error);
        alert("Error Fetching Data. Please Contact MPO.");
    });
}

//draw Chart
function chart_pm26(g1, data) {
    //  pm26Percentates();
    var myChart = new Chart(g1, {
        type: 'bar',
        data: {
            labels: [''],
            datasets: [
                {
                    label: data.tx_good_count + " Good",
                    data: [data.goodTX],
                    backgroundColor: [
                        'rgba(30, 130, 76, 1)',
                    ],
                    borderColor: [
                        'rgba(30, 130, 76, 1)',

                    ],
                    borderWidth: 1
                },
                {
                    label: data.tx_fair_count + ' Fair',
                    data: [data.fairTX],
                    backgroundColor: [
                        'rgba(247, 202, 24, 1)',
                    ],
                    borderColor: [
                        'rgba(247, 202, 24, 1)',

                    ],
                    borderWidth: 1
                },
                {
                    label: data.tx_poor_count + ' Poor',
                    data: [data.poorTX],
                    backgroundColor: [
                        'rgba(242, 38, 19, 1)',
                    ],
                    borderColor: [
                        'rgba(242, 38, 19, 1)',

                    ],
                    borderWidth: 1
                },
                {
                    label: data.tx_no_data_count + ' No Data',
                    data: [data.noDataTX],
                    backgroundColor: [
                        'rgba(149, 165, 166, 1)',
                    ],
                    borderColor: [
                        'rgba(149, 165, 166, 1)',

                    ],
                    borderWidth: 1
                }]
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
                text: 'Texas (' + data.totTXBridges + ' bridges)'
            },
            scales: {
                yAxes: [
                    {
                        scaleLabel: {
                            display: true,
                            labelString: 'Percentage',
                        },
                    },
                ],
            },
        }
    });

}

function chart_pm26_2(g2, data) {
    myChart2 = new Chart(g2, {
        type: 'bar',
        data: {
            labels: [''],
            datasets: [
                {
                    label: 'Good',
                    data: [data.goodNM],
                    backgroundColor: [
                        'rgba(30, 130, 76, 1)',
                    ],
                    borderColor: [
                        'rgba(30, 130, 76, 1)',

                    ],
                    borderWidth: 1
                },
                {
                    label: 'Fair',
                    data: [data.fairNM],
                    backgroundColor: [
                        'rgba(247, 202, 24, 1)',
                    ],
                    borderColor: [
                        'rgba(247, 202, 24, 1)',

                    ],
                    borderWidth: 1
                },
                {
                    label: 'Poor',
                    data: [data.poorNM],
                    backgroundColor: [
                        'rgba(242, 38, 19, 1)',
                    ],
                    borderColor: [
                        'rgba(242, 38, 19, 1)',

                    ],
                    borderWidth: 1
                },
                {
                    label: 'No Data',
                    data: [data.noDataNM],
                    backgroundColor: [
                        'rgba(149, 165, 166, 1)',
                    ],
                    borderColor: [
                        'rgba(149, 165, 166, 1)',

                    ],
                    borderWidth: 1
                }]
        },
        options: {
            responsive: true,
            legend: {
                labels: {
                    fontSize: 14,
                    boxWidth: 16
                }
            },
            title: {
                display: true,
                text: 'New Mexico (' + data.totNMBridges + ' bridges)'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        callback: function (value) {
                            value = value / 100;
                            return value.toLocaleString('en-US', { style: 'percent' });
                        },
                    }
                }]
            }
        }
    });
}

