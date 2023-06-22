/**
 * Creates graphs for PM18
 * Calculates data for both Pm18 and PM19
 *  
 */

/**
 * There are 4 types of mode
 * Mode 0: This is used when the page loads for the 1st time. Calculates Menu Text Only
 * Mode 1: Regional Performance Points and data
 * Mode 2: Corridor Performance Points and data
 * Mode 3: Corridor Data only, data for benchmark
 *  * Mode 4: AOI
 */
function pm18Data(mode, ex) {
    let data_for_php = {};
    //stores graph values
    var pm18data = {
        //barGraph
        classA: [0, 0, 0, 0, 0],
        classB: [0, 0, 0, 0, 0],
        classC: [0, 0, 0, 0, 0],
        classO: [0, 0, 0, 0, 0],
        //line graph
        killed: [0, 0, 0, 0, 0],
        killed_Driving: [0, 0, 0, 0, 0],
        killed_walking: [0, 0, 0, 0, 0],
        killed_freight: [0, 0, 0, 0, 0],
        killed_biking: [0, 0, 0, 0, 0],
        //line graph New Mexico State
        killed_DrivingNM: [0, 0, 0, 0, 0],
        killed_walkingNM: [0, 0, 0, 0, 0],
        killed_freightNM: [0, 0, 0, 0, 0],
        killed_bikingNM: [0, 0, 0, 0, 0],
        //line graph Texas State
        killed_DrivingTX: [0, 0, 0, 0, 0],
        killed_walkingTX: [0, 0, 0, 0, 0],
        killed_freightTX: [0, 0, 0, 0, 0],
        killed_bikingTX: [0, 0, 0, 0, 0],
        //Dynamic Variables
        crashCount: 0,
        crashCountDK: 0,
        crashCountWK: 0,
        crashCountFK: 0,
        crashCountBK: 0,
        // Deaths Total  per category
        dtot: 0,
        ftot: 0,
        wtot: 0,
        btot: 0,
        currentCorridor: 'Entire Region',
        dtextPercent: 0,
        dtextFatality: 0,
        latestYear: 0
    }

    //let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";
    let key = "";
    if (mode == 4) {
        data_for_php = ex;
        php_handler = "./backend/AOI.php";
    }

    if (mode == 0 || mode == 1) {
        key = 'all_pm18_19';
        data_for_php = {
            key: key
        };
    } else if (mode == 2 || mode == 3) {
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";

        data_for_php = {
            key: 18,
            corridors_selected: ex,
            tableName: "pm18_19"
        };
    }

    let image = "./img/markers/square.png";

    $.get(php_handler, data_for_php, function (data) {
        let latestYear = 0;

        //get latest year
        for (index in data.shape_arr) {
            let year = data.shape_arr[index].crash_year;
            if (latestYear < year) {
                latestYear = year;
            }
        }

        //crash counts
        let crashCountD = 0;
        let crashCountF = 0;
        let crashCountW = 0;
        let crashCountB = 0;

        pm18data.latestYear = latestYear;
        for (index in data.shape_arr) {
            let holder = [];
            let type = data.shape_arr[index]['type'];
            let crash_year = parseInt(data.shape_arr[index]['crash_year']);
            let killed = parseInt(data.shape_arr[index]['killed']);
            let classA = parseInt(data.shape_arr[index]['classA']);
            let classB = parseInt(data.shape_arr[index]['classB']);
            let classC = parseInt(data.shape_arr[index]['classC']);
            let classO = parseInt(data.shape_arr[index]['classO']);
            let ogrID = parseInt(data.shape_arr[index]['OGR_FID']);
            let state = data.shape_arr[index]['state'];

            if (mode == 1 || mode == 2 || mode == 4) { // mode 1 and 2 allows us to draw points 
                holder.push(wktFormatterPoint(data.shape_arr[index][shape]));
                holder = holder[0][0]; // Fixes BLOBs

                let to_visualize = {
                    lat: parseFloat(holder[0].lat),
                    lng: parseFloat(holder[0].lng)
                };

                let point = new google.maps.Marker({
                    position: to_visualize,
                    title: "Year: " + crash_year + " \nSerious Injuries " + classA + " \nNon-Incapacitating Injuries: " + classB + "\nPossible Injuries: " + classC + "\nKilled: " + killed,
                    value: ogrID,
                    icon: image
                });

                //filter crashes/points
                if (currentType == "walking") {
                    if ((type == "Pedestrian" || type == "PED" || type == "PED_COMV") && killed > 0) {
                        point.setMap(map);
                        points.push(point);
                    }
                } else if (currentType == "freight") {
                    if ((type == "COMV" || type == "Commerical_Vehicles" || type == "BIKE_COMV" || type == "PED_COMV") && killed > 0) {
                        point.setMap(map);
                        points.push(point);
                    }
                } else if (currentType == "driving") {
                    if (type == "GEN" && killed > 0) {
                        point.setMap(map);
                        points.push(point);
                    }
                } else if (currentType == "biking") {
                    if ((type == "Pedcyclists" || type == "BIKE" || type == "BIKE_COMV") && killed > 0) {
                        point.setMap(map);
                        points.push(point);
                    }
                }

            }

            if (killed > 0 || classA > 0 || classB > 0 || classC > 0 || classO > 0) {
                pm18data.crashCount++;
                // crash counts
                if (type == "Pedestrian" || type == "PED") {
                    crashCountW++;
                } else if (type == "Commerical_Vehicles" || type == "COMV") {
                    crashCountF++;
                } else if (type == "GEN") {
                    crashCountD++;
                } else if (type == "Pedcyclists" || type == "BIKE") {
                    crashCountB++;
                } else if (type == "BIKE_COMV") {
                    crashCountB++;
                    crashCountB++;
                } else if (type == "PED_COMV") {
                    crashCountF++;
                    crashCountW++;
                }
                let i = -1; //variable for indexing
                if(crash_year == latestYear - 4){
                    i = 0;
                }else if (crash_year == latestYear - 3){
                    i = 1;
                }else if (crash_year == latestYear - 2){
                    i = 2;
                }else if (crash_year == latestYear - 1){
                    i = 3;
                }else if (crash_year == latestYear){
                    i = 4;
                }
                if(i != -1){
                     //for bar graph
                     pm18data.killed[i] += killed;
                     pm18data.classA[i] += classA;
                     pm18data.classB[i] += classB;
                     pm18data.classC[i] += classC;
                     pm18data.classO[i] += classO;
 
                     if (killed > 0) { //for line graph
                         if (type == "Pedestrian" || type == "PED") {
                             pm18data.killed_walking[i] += killed;
                             pm18data.crashCountWK++; //count crash
                             (state == "NM") ? pm18data.killed_walkingNM[i] += killed  : pm18data.killed_walkingTX[i] += killed; 
                         } else if (type == "Commerical_Vehicles" || type == "COMV") {
                             pm18data.killed_freight[0] += killed;
                             pm18data.crashCountFK++; //count crash
                             (state == "NM") ? pm18data.killed_freightNM[i] += killed  : pm18data.killed_freightTX[i] += killed; 
                         } else if (type == "GEN") {
                             pm18data.killed_Driving[i] += killed;
                             pm18data.crashCountDK++; //count crash
                             (state == "NM") ? pm18data.killed_DrivingNM[i] += killed  : pm18data.killed_DrivingTX[i] += killed; 
                         } else if (type == "Pedcyclists" || type == "BIKE") {
                             pm18data.killed_biking[i] += killed;
                             pm18data.crashCountBK++; //count crash
                             (state == "NM") ? pm18data.killed_bikingNM[i] += killed  : pm18data.killed_bikingTX[i] += killed; 
                         } else if (type == "BIKE_COMV") {
                             pm18data.killed_biking[i] += killed;
                             pm18data.killed_freight[i] += killed;
                             pm18data.crashCountBK++; //count crash
                             pm18data.crashCountFK++;
                             pm18data.crashCountBK++; //count crash
                             (state == "NM") ? pm18data.killed_bikingNM[i] += killed  : pm18data.killed_bikingTX[i] += killed; 
                             (state == "NM") ? pm18data.killed_freightNM[i] += killed  : pm18data.killed_freightTX[i] += killed; 
                         } else if (type == "PED_COMV") {
                             pm18data.killed_walking[i] += killed;
                             pm18data.killed_freight[i] += killed;
                             pm18data.crashCountFK++;
                             pm18data.crashCountWK++;
                             (state == "NM") ? pm18data.killed_walkingNM[i] += killed  : pm18data.killed_walkingTX[i] += killed; 
                             (state == "NM") ? pm18data.killed_freightNM[i] += killed  : pm18data.killed_freightTX[i] += killed; 
                         } else {
                             console.log(type);
                         }
                     }
                }
            }
        }

        //calculations for menu Text, summations
        pm18data.dtot = pm18data.killed_Driving.reduce((a, b) => a + b, 0);
        pm18data.ftot = pm18data.killed_freight.reduce((a, b) => a + b, 0);
        pm18data.wtot = pm18data.killed_walking.reduce((a, b) => a + b, 0);
        pm18data.btot = pm18data.killed_biking.reduce((a, b) => a + b, 0);

        if (mode == 0) { // menu text, this is only done once
            let drivingValue = {
                name: "pm18DrivingText",
                value: pm18data.dtot
            };
            let freightValue = {
                name: "pm18FreightText",
                value: pm18data.ftot
            };
            let walkingValue = {
                name: "pm18WalkingText",
                value: pm18data.wtot
            };
            let bikeValue = {
                name: "pm18BikeText",
                value: pm18data.btot
            };

            menu.push(drivingValue);
            menu.push(freightValue);
            menu.push(walkingValue);
            menu.push(bikeValue);
        }

        //calculations for static text
        if (currentType == 'driving') {
            pm18data.dtextPercent = (pm18data.crashCountDK / crashCountD) * 100;
        } else if (currentType == 'walking') {
            pm18data.dtextPercent = (pm18data.crashCountWK / crashCountW) * 100;
        } else if (currentType == 'biking') {
            pm18data.dtextPercent = (pm18data.crashCountBK / crashCountB) * 100;
        } else if (currentType == 'freight') {
            pm18data.dtextPercent = (pm18data.crashCountFK / crashCountF) * 100;
        }

        let corr = translateCorridor(data_for_php.corridors_selected); // what corridor are we on?

        if (mode == 1) {
            regionalText(pm18data);
        } else if (mode == 2) {
            pm18data.currentCorridor = corr;
            dynamicCorridorText(corr, pm18data); // Send graph data and current corridor to dynamic text for corridors
        } else if (mode == 3) {
            let data = {
                pm: '18',
                type: currentType,
                title: "Fatalities 2013 - 2017",
                corridor: corr,
                value: pm18data.dtot
            }
            benchmarkData.push(data);
        } else if (mode == 4) {
            dynamicCorridorText("AOI", pm18data); // Send graph data and current corridor to dynamic text for corridors
        }
    });
}

function pm18chartLine(ctx, data) {
    var pm18_graphTitle;
    var pm18_graphValues = [];
    var pm18_graphValuesNM = [];
    var pm18_graphValuesTX = [];

    //line chart data
    if (currentType == 'driving') { // if Driving is clicked
        pm18_graphValues = data.killed_Driving;
        pm18_graphValuesNM = data.killed_DrivingNM;
        pm18_graphValuesTX = data.killed_DrivingTX;
        pm18_graphTitle = 'Driving Fatalities';
    } else if (currentType == 'freight') { // if Freight is clicked
        pm18_graphValues = data.killed_freight;
        pm18_graphValuesNM = data.killed_freightNM;
        pm18_graphValuesTX = data.killed_freightTX;
        pm18_graphTitle = 'Freight Fatalities';
    } else if (currentType == 'walking') {
        pm18_graphValues = data.killed_walking;
        pm18_graphValuesNM = data.killed_walkingNM;
        pm18_graphValuesTX = data.killed_walkingTX;
        pm18_graphTitle = 'Pedestrian Fatalities';
    } else if (currentType == 'biking') {
        pm18_graphValues = data.killed_biking;
        pm18_graphValuesNM = data.killed_bikingTX;
        pm18_graphValuesTX = data.killed_bikingNM;
        pm18_graphTitle = 'Bicycle Fatalities';
    }

    var data = {
        labels: [data.latestYear - 4, data.latestYear - 3, data.latestYear - 2, data.latestYear - 1, data.latestYear],
        datasets: [{
            label: pm18_graphTitle,
            data: pm18_graphValues,
            backgroundColor: "purple",
            borderColor: "lightblue",
            fill: false,
            lineTension: 0,
            radius: 5
        },
        {
            label: "Total Fatalities"+ "\u00B9",
            data: data.killed,
            //data: [data.tot13, data.tot14, data.tot15, data.tot16, data.tot17],
            backgroundColor: "green",
            borderColor: "lightgreen",
            fill: false,
            lineTension: 0,
            radius: 5
        },
        {
            label: pm18_graphTitle + " NM",
            data: pm18_graphValuesNM,
            //data: [data.tot13, data.tot14, data.tot15, data.tot16, data.tot17],
            backgroundColor: "orange",
            borderColor: "grey",
            fill: false,
            lineTension: 0,
            radius: 5,
            hidden: true
        },
        {
            label: pm18_graphTitle + " TX",
            data: pm18_graphValuesTX,
            //data: [data.tot13, data.tot14, data.tot15, data.tot16, data.tot17],
            backgroundColor: "blue",
            borderColor: "lightblue",
            fill: false,
            lineTension: 0,
            radius: 5,
            hidden: true
        }
        ]
    };

    //options
    var options = {
        responsive: true,
        title: {
            /*display: true,
            position: "top",
            text: title;
            fontSize: 12,
            fontColor: "#111"*/
        },
        legend: {
            display: true,
            position: "bottom",
            labels: {
                fontColor: "#333",
                fontSize: 12,
                boxWidth: 10
            }
        }
    };

    //create Chart class object
    var chart = new Chart(ctx, {
        type: "line",
        data: data,
        options: options
    });

}

function pm18StackedChart(ctx, data) {
    let titleH = data.currentCorridor;
    if (titleH != 'Entire Region') { //if corridor, fix wording
        titleH = wordFix(titleH + " Corridor");
    }
    var barChartData = {
        labels: [data.latestYear - 4, data.latestYear - 3, data.latestYear - 2, data.latestYear - 1, data.latestYear],
        datasets: [{
            label: 'Fatalities',
            backgroundColor: 'rgba(255,82,0,0.5)',
            data: data.killed
        }, {
            label: 'Serious Injuries',
            backgroundColor: 'rgba(92,187,3,0.5)rgba(92,187,3,0.5)',
            data: data.classA
        }, {
            label: 'Non-Incapacitating Injuries',
            backgroundColor: 'rgba(117,36,221,0.5)',
            data: data.classB
        }, {
            label: 'Possible Injuries',
            backgroundColor: 'rgba(255,235,59,1)',
            data: data.classC
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
                text: titleH,
                fontSize: 10
                //fontColor: "#111"
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
                    ticks: {
                        //max:45000
                    }
                }]
            }
        }
    });

}