/**
 * Creates graphs for PM19
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

function pm19Data(mode, ex) {

    let data_for_php;

    //stores graph values
    var pm19data = {
        //barGraph
        classA: [0, 0, 0, 0, 0],
        classB: [0, 0, 0, 0, 0],
        classC: [0, 0, 0, 0, 0],
        classO: [0, 0, 0, 0, 0],
        //line graph
        injured: [0, 0, 0, 0, 0],
        injured_driving: [0, 0, 0, 0, 0],
        injured_walking: [0, 0, 0, 0, 0],
        injured_freight: [0, 0, 0, 0, 0],
        injured_biking: [0, 0, 0, 0, 0],
        //line graph New Mexico State
        injured_drivingNM: [0, 0, 0, 0, 0],
        injured_walkingNM: [0, 0, 0, 0, 0],
        injured_freightNM: [0, 0, 0, 0, 0],
        injured_bikingNM: [0, 0, 0, 0, 0],
        //line graph Texas State
        injured_drivingTX: [0, 0, 0, 0, 0],
        injured_walkingTX: [0, 0, 0, 0, 0],
        injured_freightTX: [0, 0, 0, 0, 0],
        injured_bikingTX: [0, 0, 0, 0, 0],
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
    } else if (mode == 2) {
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";

        data_for_php = {
            key: 19,
            corridors_selected: ex,
            tableName: "pm18_19"
        };
    }

    let image = "./img/markers/crash.png";

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


        pm19data.latestYear = latestYear;

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
                    if ((type == "Pedestrian" || type == "PED" || type == "PED_COMV") && classA > 0) {
                        point.setMap(map);
                        points.push(point);
                    }
                } else if (currentType == "freight") {
                    if ((type == "COMV" || type == "Commerical_Vehicles" || type == "BIKE_COMV" || type == "PED_COMV") && classA > 0) {
                        point.setMap(map);
                        points.push(point);
                    }
                } else if (currentType == "driving") {
                    if (type == "GEN" && classA > 0) {
                        point.setMap(map);
                        points.push(point);
                    }
                } else if (currentType == "biking") {
                    if ((type == "Pedcyclists" || type == "BIKE" || type == "BIKE_COMV") && classA > 0) {
                        point.setMap(map);
                        points.push(point);
                    }
                }

            }

            if (killed > 0 || classA > 0 || classB > 0 || classC > 0 || classO > 0) {
                pm19data.crashCount++;
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
                     pm19data.injured[i] += classA;
                     pm19data.classA[i] += classA;
                     pm19data.classB[i] += classB;
                     pm19data.classC[i] += classC;
                     pm19data.classO[i] += classO;
 
                     if (classA > 0) { //for line graph
                         if (type == "Pedestrian" || type == "PED") {
                             pm19data.injured_walking[i] += classA;
                             pm19data.crashCountWK++; //count crash
                             (state == "NM") ? pm19data.injured_walkingNM[i] += classA  : pm19data.injured_walkingTX[i] += classA; 
                         } else if (type == "Commerical_Vehicles" || type == "COMV") {
                             pm19data.injured_freight[i] += classA;
                             pm19data.crashCountFK++; //count crash
                             (state == "NM") ? pm19data.injured_freightNM[i] += classA  : pm19data.injured_freightTX[i] += classA; 
                         } else if (type == "GEN") {
                             pm19data.injured_driving[i] += classA;
                             pm19data.crashCountDK++; //count crash
                             (state == "NM") ? pm19data.injured_drivingNM[i] += classA  : pm19data.injured_drivingTX[i] += classA; 
                         } else if (type == "Pedcyclists" || type == "BIKE") {
                             pm19data.injured_biking[i] += classA;
                             pm19data.crashCountBK++; //count crash
                             (state == "NM") ? pm19data.injured_bikingNM[i] += classA  : pm19data.injured_bikingTX[i] += classA; 
                         } else if (type == "BIKE_COMV") {
                             pm19data.injured_biking[i] += classA;
                             pm19data.injured_freight[i] += classA;
                             pm19data.crashCountBK++; //count crash
                             pm19data.crashCountFK++;
                             pm19data.crashCountBK++; //count crash
                             (state == "NM") ? pm19data.injured_bikingNM[i] += classA  : pm19data.injured_bikingTX[i] += classA; 
                             (state == "NM") ? pm19data.injured_freightNM[i] += classA  : pm19data.injured_freightTX[i] += classA; 
                         } else if (type == "PED_COMV") {
                             pm19data.injured_walking[i] += classA;
                             pm19data.injured_freight[i] += classA;
                             pm19data.crashCountFK++;
                             pm19data.crashCountWK++;
                             (state == "NM") ? pm19data.injured_walkingNM[i] += classA  : pm19data.injured_walkingTX[i] += classA; 
                             (state == "NM") ? pm19data.injured_freightNM[i] += classA  : pm19data.injured_freightTX[i] += classA; 
                         } else {
                             //    console.log(type);
                         }
                     }
                 }
            }

        }

        //calculations for menu Text, summations
        pm19data.dtot = pm19data.injured_driving.reduce((a, b) => a + b, 0);
        pm19data.ftot = pm19data.injured_freight.reduce((a, b) => a + b, 0);
        pm19data.wtot = pm19data.injured_walking.reduce((a, b) => a + b, 0);
        pm19data.btot = pm19data.injured_biking.reduce((a, b) => a + b, 0);
        //console.table(pm19data);

        if (mode == 0) { // menu text, this is only done once
            // Send to menu Text
            let drivingValue = {
                name: "pm19DrivingTex",
                value: pm19data.dtot
            };
            let freightValue = {
                name: "pm19FreightText",
                value: pm19data.ftot
            };
            let walkingValue = {
                name: "pm19WalkingText",
                value: pm19data.wtot
            };
            let bikeValue = {
                name: "pm19BikeText",
                value: pm19data.btot
            };

            menu.push(drivingValue);
            menu.push(freightValue);
            menu.push(walkingValue);
            menu.push(bikeValue);
        }

        //calculations for static text
        if (currentType == 'driving') {
            pm19data.dtextPercent = (pm19data.crashCountDK / crashCountD) * 100;
        } else if (currentType == 'walking') {
            pm19data.dtextPercent = (pm19data.crashCountWK / crashCountW) * 100;
        } else if (currentType == 'biking') {
            pm19data.dtextPercent = (pm19data.crashCountBK / crashCountB) * 100;
        } else if (currentType == 'freight') {
            pm19data.dtextPercent = (pm19data.crashCountFK / crashCountF) * 100;
        }


        if (mode == 1) {
            regionalText(pm19data);
        } else if (mode == 2 || mode == 3) {
            let corr = translateCorridor(data_for_php.corridors_selected); // what corridor are we on?
            pm19data.currentCorridor = corr;
            dynamicCorridorText(corr, pm19data); // Send graph data and current corridor to dynamic text for corridors
        } else if (mode == 4) {
            dynamicCorridorText("AOI", pm19data); // Send graph data and current corridor to dynamic text for corridors

        }

    }).fail(function (error) {
        console.log(error);
        alert("Error Fetching Data. Please Contact MPO.");
    });;
}

function pm19chartLine(ctx, data) {
    var pm19_graphTitle;
    var pm19_graphValues = [];
    var pm19_graphValuesNM = [];
    var pm19_graphValuesTX = [];

    //line chart data
    if (currentType == 'driving') { // if Driving is click
        pm19_graphValues = data.injured_driving;
        pm19_graphValuesNM = data.injured_drivingNM;
        pm19_graphValuesTX = data.injured_drivingTX;
        pm19_graphTitle = 'Driving Serious Injuries';
    } else if (currentType == 'freight') { // if Freight is click
        pm19_graphValues = data.injured_freight;
        pm19_graphValuesNM = data.injured_freightNM;
        pm19_graphValuesTX = data.injured_freightTX;
        pm19_graphTitle = 'Freight Serious Injuries';

    } else if (currentType == 'walking') {
        pm19_graphValues = data.injured_walking;
        pm19_graphValuesNM = data.injured_walkingNM;
        pm19_graphValuesTX = data.injured_walkingTX;
        pm19_graphTitle = 'Walking Serious Injuries';
    } else if (currentType == 'biking') {
        pm19_graphValues = data.injured_biking;
        pm19_graphValuesNM = data.injured_bikingNM;
        pm19_graphValuesTX = data.injured_bikingTX;
        pm19_graphTitle = 'Bicycle Serious Injuries';
    }

    var data = {
        labels: [data.latestYear - 4, data.latestYear - 3, data.latestYear - 2, data.latestYear - 1, data.latestYear],
        datasets: [{
            label: pm19_graphTitle,
            data: pm19_graphValues,
            backgroundColor: "purple",
            borderColor: "lightblue",
            fill: false,
            lineTension: 0,
            radius: 5
        },
        {
            label: "Total Serious Injuries",
            data: data.injured,
            backgroundColor: "green",
            borderColor: "lightgreen",
            fill: false,
            lineTension: 0,
            radius: 5
        },
        {
            label: pm19_graphTitle + " NM",
            data: pm19_graphValuesNM,
            backgroundColor: "orange",
            borderColor: "grey",
            fill: false,
            lineTension: 0,
            radius: 5,
            hidden: true
        },
        {
            label: pm19_graphTitle + " TX",
            data: pm19_graphValuesTX,
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

function pm19StackedChart(ctx, data) {
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
            backgroundColor: 'rgba(92,187,3,0.5)',
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