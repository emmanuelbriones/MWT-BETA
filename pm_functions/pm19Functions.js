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
var pm19data = {
    //barGraph
    classA: [0, 0, 0, 0, 0],
    classB: [0, 0, 0, 0, 0],
    classC: [0, 0, 0, 0, 0],
    classO: [0, 0, 0, 0, 0],
    non_injuri: [0, 0, 0, 0, 0],
    unknown_injuri: [0, 0, 0, 0, 0],
    //line graph
    injured: [0, 0, 0, 0, 0],
    injured_driving: [0, 0, 0, 0, 0],
    injured_walking: [0, 0, 0, 0, 0],
    injured_freight: [0, 0, 0, 0, 0],
    injured_biking: [0, 0, 0, 0, 0],
    //Dynamic Variables
    crashCount: 0,
    crashCountDK: 0, crashCountWK: 0, crashCountFK: 0, crashCountBK: 0,
    // Deaths Total  per category
    dtot: 0, ftot: 0, wtot: 0, btot: 0,

    currentCorridor: 'Entire Region',

    dtextPercent: 0,
    dtextFatality: 0,
    latestYear: 0
}
function pm19Data(mode, ex) {

    let data_for_php;

    //stores graph values


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
        data_for_php = { key: key };
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
            let location = data.shape_arr[index]['location'];
            let crash_year = parseInt(data.shape_arr[index]['crash_year']);

            let killed = parseInt(data.shape_arr[index]['killed']);
            let non_injuri = parseInt(data.shape_arr[index]['non_injuri']);
            let unknown_injuri = parseInt(data.shape_arr[index]['unknown_in']);
            let classA = parseInt(data.shape_arr[index]['classA']);
            let classB = parseInt(data.shape_arr[index]['classB']);
            let classC = parseInt(data.shape_arr[index]['classC']);
            let classO = parseInt(data.shape_arr[index]['classO']); //


            let ogrID = parseInt(data.shape_arr[index]['OGR_FID']);

            if (location == "tx") { //class O or nonInjury = addition of nonInjury and Unknown
                classO += non_injuri;
                classO += unknown_injuri;
            }

            if (mode == 1 || mode == 2 || mode == 4) { // mode 1 and 2 allows us to draw points 
                holder.push(wktFormatterPoint(data.shape_arr[index][shape]));
                holder = holder[0][0]; // Fixes BLOBs

                let to_visualize = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };

                let point = new google.maps.Marker({
                    position: to_visualize,
                    title: "Year: " + crash_year + " \nSerious Injuries " + classA + " \nNon-Incapacitating Injuries: " + classB + "\nPossible Injuries: " + classC + "\nNon-Injury: " + non_injuri + "\nkilled: " + killed,
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

            if (killed > 0 || classA > 0 || classB > 0 || classC > 0 || classO > 0 || non_injuri > 0 || unknown_injuri > 0) {
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

                if (crash_year == latestYear - 4) {
                    //for bar graph
                    pm19data.injured[0] += classA;
                    pm19data.classA[0] += classA;
                    pm19data.classB[0] += classB;
                    pm19data.classC[0] += classC;
                    pm19data.classO[0] += classO;
                    pm19data.non_injuri[0] += non_injuri;
                    pm19data.unknown_injuri[0] += unknown_injuri;

                    if (classA > 0) {  //for line graph
                        if (type == "Pedestrian" || type == "PED") {
                            pm19data.injured_walking[0] += classA;
                            pm19data.crashCountWK++; //count crash
                        } else if (type == "Commerical_Vehicles" || type == "COMV") {
                            pm19data.injured_freight[0] += classA;
                            pm19data.crashCountFK++; //count crash
                        } else if (type == "GEN") {
                            pm19data.injured_driving[0] += classA;
                            pm19data.crashCountDK++; //count crash
                        } else if (type == "Pedcyclists" || type == "BIKE") {
                            pm19data.injured_biking[0] += classA;
                            pm19data.crashCountBK++; //count crash
                        } else if (type == "BIKE_COMV") {
                            pm19data.injured_biking[0] += classA;
                            pm19data.injured_freight[0] += classA;
                            pm19data.crashCountBK++; //count crash
                            pm19data.crashCountFK++;
                            pm19data.crashCountBK++; //count crash
                        } else if (type == "PED_COMV") {
                            pm19data.injured_walking[0] += classA;
                            pm19data.injured_freight[0] += classA;
                            pm19data.crashCountFK++;
                            pm19data.crashCountWK++;
                        } else {
                            //console.log(type);
                        }
                    }
                } else if (crash_year == latestYear - 3) {
                    //for bar graph
                    pm19data.injured[1] += classA;
                    pm19data.classA[1] += classA;
                    pm19data.classB[1] += classB;
                    pm19data.classC[1] += classC;
                    pm19data.classO[1] += classO;
                    pm19data.non_injuri[1] += non_injuri;
                    pm19data.unknown_injuri[1] += unknown_injuri;

                    if (classA > 0) {  //for line graph
                        if (type == "Pedestrian" || type == "PED") {
                            pm19data.injured_walking[1] += classA;
                            pm19data.crashCountWK++; //count crash
                        } else if (type == "Commerical_Vehicles" || type == "COMV") {
                            pm19data.injured_freight[1] += classA;
                            pm19data.crashCountFK++; //count crash
                        } else if (type == "GEN") {
                            pm19data.injured_driving[1] += classA;
                            pm19data.crashCountDK++; //count crash
                        } else if (type == "Pedcyclists" || type == "BIKE") {
                            pm19data.injured_biking[1] += classA;
                            pm19data.crashCountBK++; //count crash
                        } else if (type == "BIKE_COMV") {
                            pm19data.injured_biking[1] += classA;
                            pm19data.injured_freight[1] += classA;
                            pm19data.crashCountBK++; //count crash
                            pm19data.crashCountFK++;
                            pm19data.crashCountBK++; //count crash
                        } else if (type == "PED_COMV") {
                            pm19data.injured_walking[1] += classA;
                            pm19data.injured_freight[1] += classA;
                            pm19data.crashCountFK++;
                            pm19data.crashCountWK++;
                        } else {
                           // console.log(type);
                        }
                    }
                } else if (crash_year == latestYear - 2) {
                    //for bar graph
                    pm19data.injured[2] += classA;
                    pm19data.classA[2] += classA;
                    pm19data.classB[2] += classB;
                    pm19data.classC[2] += classC;
                    pm19data.classO[2] += classO;
                    pm19data.non_injuri[2] += non_injuri;
                    pm19data.unknown_injuri[2] += unknown_injuri;


                    if (classA > 0) {  //for line graph
                        if (type == "Pedestrian" || type == "PED") {
                            pm19data.injured_walking[2] += classA;
                            pm19data.crashCountWK++; //count crash
                        } else if (type == "Commerical_Vehicles" || type == "COMV") {
                            pm19data.injured_freight[2] += classA;
                            pm19data.crashCountFK++; //count crash
                        } else if (type == "GEN") {
                            pm19data.injured_driving[2] += classA;
                            pm19data.crashCountDK++; //count crash
                        } else if (type == "Pedcyclists" || type == "BIKE") {
                            pm19data.injured_biking[2] += classA;
                            pm19data.crashCountBK++; //count crash
                        } else if (type == "BIKE_COMV") {
                            pm19data.injured_biking[2] += classA;
                            pm19data.injured_freight[2] += classA;
                            pm19data.crashCountBK++; //count crash
                            pm19data.crashCountFK++;
                            pm19data.crashCountBK++; //count crash
                        } else if (type == "PED_COMV") {
                            pm19data.injured_walking[2] += classA;
                            pm19data.injured_freight[2] += classA;
                            pm19data.crashCountFK++;
                            pm19data.crashCountWK++;
                        } else {
                          //  console.log(type);
                        }
                    }
                } else if (crash_year == latestYear - 1) {
                    //for bar graph
                    pm19data.injured[3] += classA;
                    pm19data.classA[3] += classA;
                    pm19data.classB[3] += classB;
                    pm19data.classC[3] += classC;
                    pm19data.classO[3] += classO;
                    pm19data.non_injuri[3] += non_injuri;
                    pm19data.unknown_injuri[3] += unknown_injuri;

                    if (classA > 0) {  //for line graph
                        if (type == "Pedestrian" || type == "PED") {
                            pm19data.injured_walking[3] += classA;
                            pm19data.crashCountWK++; //count crash
                        } else if (type == "Commerical_Vehicles" || type == "COMV") {
                            pm19data.injured_freight[3] += classA;
                            pm19data.crashCountFK++; //count crash
                        } else if (type == "GEN") {
                            pm19data.injured_driving[3] += classA;
                            pm19data.crashCountDK++; //count crash
                        } else if (type == "Pedcyclists" || type == "BIKE") {
                            pm19data.injured_biking[3] += classA;
                            pm19data.crashCountBK++; //count crash
                        } else if (type == "BIKE_COMV") {
                            pm19data.injured_biking[3] += classA;
                            pm19data.injured_freight[3] += classA;
                            pm19data.crashCountBK++; //count crash
                            pm19data.crashCountFK++;
                            pm19data.crashCountBK++; //count crash
                        } else if (type == "PED_COMV") {
                            pm19data.injured_walking[3] += classA;
                            pm19data.injured_freight[3] += classA;
                            pm19data.crashCountFK++;
                            pm19data.crashCountWK++;
                        } else {
                          //  console.log(type);
                        }
                    }
                } else if (crash_year == latestYear) {
                    //for bar graph
                    pm19data.injured[4] += classA;
                    pm19data.classA[4] += classA;
                    pm19data.classB[4] += classB;
                    pm19data.classC[4] += classC;
                    pm19data.classO[4] += classO;
                    pm19data.non_injuri[4] += non_injuri;
                    pm19data.unknown_injuri[4] += unknown_injuri;

                    if (classA > 0) {  //for line graph
                        if (type == "Pedestrian" || type == "PED") {
                            pm19data.injured_walking[4] += classA;
                            pm19data.crashCountWK++; //count crash
                        } else if (type == "Commerical_Vehicles" || type == "COMV") {
                            pm19data.injured_freight[4] += classA;
                            pm19data.crashCountFK++; //count crash
                        } else if (type == "GEN") {
                            pm19data.injured_driving[4] += classA;
                            pm19data.crashCountDK++; //count crash
                        } else if (type == "Pedcyclists" || type == "BIKE") {
                            pm19data.injured_biking[4] += classA;
                            pm19data.crashCountBK++; //count crash
                        } else if (type == "BIKE_COMV") {
                            pm19data.injured_biking[4] += classA;
                            pm19data.injured_freight[4] += classA;
                            pm19data.crashCountBK++; //count crash
                            pm19data.crashCountFK++;
                            pm19data.crashCountBK++; //count crash
                        } else if (type == "PED_COMV") {
                            pm19data.injured_walking[4] += classA;
                            pm19data.injured_freight[4] += classA;
                            pm19data.crashCountFK++;
                            pm19data.crashCountWK++;
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
            document.getElementById("pm19DrivingTex").innerHTML = pm19data.dtot;
            document.getElementById("pm19FreightText").innerHTML = pm19data.ftot;
            document.getElementById("pm19WalkingText").innerHTML = pm19data.wtot;
            document.getElementById("pm19BikeText").innerHTML = pm19data.btot;
        }


        //console.log(crashCountD);
       // console.log(pm19data.crashCountDK);
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
        }
        else if (mode == 2 || mode == 3) {
            let corr = translateCorridor(data_for_php.corridors_selected); // what corridor are we on?
            pm19data.currentCorridor = corr;
            dynamicCorridorText(corr, pm19data); // Send graph data and current corridor to dynamic text for corridors
        }
        else if (mode == 4) {
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

    //line chart data
    if (currentType == 'driving') { // if Driving is click
        pm19_graphValues[0] = data.injured_driving[0];
        pm19_graphValues[1] = data.injured_driving[1];
        pm19_graphValues[2] = data.injured_driving[2];
        pm19_graphValues[3] = data.injured_driving[3];
        pm19_graphValues[4] = data.injured_driving[4];
        pm19_graphTitle = 'Driving Serious Injuries';
    } else if (currentType == 'freight') { // if Freight is click
        pm19_graphValues[0] = data.injured_freight[0];
        pm19_graphValues[1] = data.injured_freight[1];
        pm19_graphValues[2] = data.injured_freight[2];
        pm19_graphValues[3] = data.injured_freight[3];
        pm19_graphValues[4] = data.injured_freight[4];
        pm19_graphTitle = 'Freight Serious Injuries';

    } else if (currentType == 'walking') {
        pm19_graphValues[0] = data.injured_walking[0];
        pm19_graphValues[1] = data.injured_walking[1];
        pm19_graphValues[2] = data.injured_walking[2];
        pm19_graphValues[3] = data.injured_walking[3];
        pm19_graphValues[4] = data.injured_walking[4];
        pm19_graphTitle = 'Walking Serious Injuries';
    } else if (currentType == 'biking') {
        pm19_graphValues[0] = data.injured_biking[0];
        pm19_graphValues[1] = data.injured_biking[1];
        pm19_graphValues[2] = data.injured_biking[2];
        pm19_graphValues[3] = data.injured_biking[3];
        pm19_graphValues[4] = data.injured_biking[4];
        pm19_graphTitle = 'Bycycle Serious Injuries';
    }

    var data = {
        labels: [data.latestYear - 4, data.latestYear - 3, data.latestYear - 2, data.latestYear - 1, data.latestYear],
        datasets: [
            {
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
        }, {
            label: 'Non-Injury',
            backgroundColor: 'rgb(255,0,255,0.5)',
            data: data.non_injuri
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
