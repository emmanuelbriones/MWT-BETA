// Colors for Graphs/
let pdnC = "#FDD835";
let pdnC2 = "#FFEB3B"
let ysC = "#FF9800";
let ysC2 = '#FFB74D';
let botaC = "#304FFE";
let botaC2 = "#2196F3";

function pm14Data(mode) {
    let php_handler = 'mwt_handler.php';
    let data_for_php = {
        'key': 'all_pm14'
    };
    let data_by_mode_pm14 = {
        'driving': {
            pdn: [],
            pdn_ready: [],
            bota: [],
            bota_ready: [],
            ysleta: [],
            ysleta_ready: []
        },
        'walking': {
            pdn: [],
            pdn_ready: [],
            bota: [],
            ysleta: []
        },
        'freight': {
            bota: [],
            bota_fast: [],
            ysleta: [],
            ysleta_fast: []
        },
        'text': {
            latestYear: 0,

            drivingTime: 0,
            walkingTime: 0,
            freightTime: 0,

            driving_highest_wait_time_station: "",
            walking_highest_wait_time_station: "",
            freight_highest_wait_time_station: "",
        }
    }
    $.get(php_handler, data_for_php).done(function (data) { //succesful
        let station = {
            "driving": {
                name: [],
                wait_time: []
            },
            "walking": {
                name: [],
                wait_time: []
            },
            "freight": {
                name: [],
                wait_time: []
            }
        };

        let recentYear = 0;
        for (index in data.shape_arr) {
            let year = data.shape_arr[index]['period'];
            if (year > recentYear) {
                recentYear = year;
            }
        }

        data_by_mode_pm14.text.latestYear = recentYear;
        for (index in data.shape_arr) {
            let year = data.shape_arr[index]['period'];
            let mode_found = data.shape_arr[index]['MODE'];
            let bota_found = data.shape_arr[index]['BOTA']
            let bota_r_found = data.shape_arr[index]['BOTA_Ready'];
            let bota_f_found = data.shape_arr[index]['BOTA_Fast'];
            let pdn_found = data.shape_arr[index]['PDN'];
            let pdn_r_found = data.shape_arr[index]['PDN_Ready'];
            let ysleta_found = data.shape_arr[index]['Ysleta'];
            let ysleta_r_found = data.shape_arr[index]['Ysleta_Ready'];
            let ysleta_f_found = data.shape_arr[index]['Ysleta_Fast'];
            // let santa_teresa_found= data.bridge_data.santa_teresa[index];
            // let tornillo_found= data.bridge_data.tornillo[index];

            if (mode_found == 'psgrveh') {
                data_by_mode_pm14.driving.bota.push(parseFloat(bota_found));
                data_by_mode_pm14.driving.bota_ready.push(parseFloat(bota_r_found));
                data_by_mode_pm14.driving.pdn.push(parseFloat(pdn_found));
                data_by_mode_pm14.driving.pdn_ready.push(parseFloat(pdn_r_found));
                data_by_mode_pm14.driving.ysleta.push(parseFloat(ysleta_found));
                data_by_mode_pm14.driving.ysleta_ready.push(parseFloat(ysleta_r_found));

                // calculations for highest wait time
                if (year == recentYear) {
                    // times - - - - - -  NOTE: If more stations are added to driving then add extra station times here as well 
                    station.driving.wait_time.push(parseFloat(bota_found));
                    station.driving.wait_time.push(parseFloat(bota_r_found));
                    station.driving.wait_time.push(parseFloat(pdn_found));
                    station.driving.wait_time.push(parseFloat(pdn_r_found));
                    station.driving.wait_time.push(parseFloat(ysleta_found));
                    station.driving.wait_time.push(parseFloat(ysleta_r_found));
                    //names - - - - - -  NOTE: If more stations are added to driving then add extra stations here as well 
                    station.driving.name.push("BOTA");
                    station.driving.name.push("BOTA Ready");
                    station.driving.name.push("PDN");
                    station.driving.name.push("PDN Ready");
                    station.driving.name.push("Ysleta");
                    station.driving.name.push("Ysleta Ready");
                }
            } else if (mode_found == 'freight') {
                data_by_mode_pm14.freight.bota.push(parseFloat(bota_found));
                data_by_mode_pm14.freight.bota_fast.push(parseFloat(bota_f_found));
                data_by_mode_pm14.freight.ysleta.push(parseFloat(ysleta_found));
                data_by_mode_pm14.freight.ysleta_fast.push(parseFloat(ysleta_f_found));
                // calculations for highest wait time
                if (year == recentYear) {
                    station.freight.wait_time.push(parseFloat(bota_found));
                    station.freight.wait_time.push(parseFloat(bota_f_found));
                    station.freight.wait_time.push(parseFloat(ysleta_found));
                    station.freight.wait_time.push(parseFloat(ysleta_f_found));
                    //names - - - - - -  NOTE: If more stations are added to freight then add extra stations here as well 
                    station.freight.name.push("BOTA");
                    station.freight.name.push("BOTA Fast");
                    station.freight.name.push("Ysleta Cargo");
                    station.freight.name.push("Ysleta Cargo Fast");
                }
            } else if (mode_found == 'pedestrian') {
                data_by_mode_pm14.walking.pdn.push(parseFloat(pdn_found));
                data_by_mode_pm14.walking.pdn_ready.push(parseFloat(pdn_r_found));
                data_by_mode_pm14.walking.bota.push(parseFloat(bota_found));
                data_by_mode_pm14.walking.ysleta.push(parseFloat(ysleta_found));
                // calculations for highest wait time    
                if (year == recentYear) {
                    station.walking.wait_time.push(parseFloat(bota_found));
                    station.walking.wait_time.push(parseFloat(bota_f_found));
                    station.walking.wait_time.push(parseFloat(ysleta_found));
                    station.walking.wait_time.push(parseFloat(ysleta_f_found));
                    //names - - - - - -  NOTE: If more stations are added to walking then add extra stations here as well 
                    station.walking.name.push("PDN");
                    station.walking.name.push("PDN Ready");
                    station.walking.name.push("BOTA");
                    station.walking.name.push("Ysleta");
                }

            }
        }

        //********** calculations 
        // Average time 
        data_by_mode_pm14.text.drivingTime = pm14_average(data_by_mode_pm14.driving).toFixed(2);
        data_by_mode_pm14.text.walkingTime = pm14_average(data_by_mode_pm14.walking).toFixed(2);
        data_by_mode_pm14.text.freightTime = pm14_average(data_by_mode_pm14.freight).toFixed(2);
        // highest wait time
        data_by_mode_pm14.text.driving_highest_wait_time = pm14_highest_wait_time(station.driving);
        data_by_mode_pm14.text.walking_highest_wait_time = pm14_highest_wait_time(station.walking);
        data_by_mode_pm14.text.freight_highest_wait_time = pm14_highest_wait_time(station.freight);


        if (mode == 0) {
            let driveVal = {
                name: "pm14DText",
                value: commafy(data_by_mode_pm14.text.drivingTime) + " min"
            };
            let freightVal = {
                name: "pm14FText",
                value: commafy(data_by_mode_pm14.text.freightTime) + " min"
            };
            let walkVal = {
                name: "pm14WText",
                value: commafy(data_by_mode_pm14.text.walkingTime) + " min"
            };

            menu.push(driveVal);
            menu.push(freightVal);
            menu.push(walkVal);
        }
        if (mode == 1) {
            draw_points_pm14();
            regionalText(data_by_mode_pm14);
        }
    }).fail(function (error) {
        alert("ERROR PM 14");
        console.log(error);
    });
}

function draw_points_pm14() {
    let source_file = "mwt_handler.php";
    let data_key = {
        "key": "all_pm13_14"
    }
    let ignore = false; // checks if we need to ignore a point or station
    $.get(source_file, data_key, function (data) {
        let image = "./img/markers/grey.png";

        for (index in data.shape_arr) {
            let holder_points = [];
            let title = data.shape_arr[index].title;
            let to_visualize_points = 0;

            if (title == "PDN") {
                image = "./icons/yellowPin.png";
            } else if (title == "Ysleta") {
                image = "./icons/orangePin.png";
            } else if (title == "BOTA") {
                image = "./icons/darkbluePin.png";
            } else if (title == "Santa Teresa") {
                image = "./icons/pinkPin.png";
            } else if (title == "Tornillo") {
                image = "./icons/greenPin.png";
            }
            holder_points.push(wktFormatterPoint(data.shape_arr[index]["shape"]));
            holder_points = holder_points[0][0]; // Fixes BLOBs
            to_visualize_points = {
                lat: parseFloat(holder_points[0].lat),
                lng: parseFloat(holder_points[0].lng)
            };
            let point = new google.maps.Marker({
                position: to_visualize_points,
                title: title,
                icon: image
            });
            point.setMap(map);
            points.push(point);


        }
    });
}

function pm14_highest_wait_time(array) {
    h_wait_time = 0;
    h_name = "";

    for (index in array.wait_time) {
        if (array.wait_time[index] > h_wait_time) {
            h_wait_time = array.wait_time[index];
            h_name = array.name[index];
        }
    }

    return h_name;
}

// receives array of type. Ex: Driving array
function pm14_average(array) {
    let holder = [];
    for (index in array) {
        let arrAvg = array[index].reduce((a, b) => a + b, 0) / array[index].length; // get average of 1 array of the given category array
        holder.push(arrAvg); // push average into holder array
    }
    return holder.reduce((a, b) => a + b, 0) / holder.length; // average of averages
}

function pm14DrivingChart(ctx, data14) {
    let latestYear = data14.text.latestYear;
    var data = {
        labels: [latestYear - 4, latestYear - 3, latestYear - 2, latestYear - 1, latestYear],
        datasets: [{
                label: "PDN Personal Vehicles",
                data: data14.driving.pdn,
                backgroundColor: pdnC,
                borderColor: pdnC,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "PND Ready Personal Vehicles",
                data: data14.driving.pdn_ready,
                backgroundColor: pdnC2,
                borderColor: pdnC2,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "BOTA Personal Vehicles",
                data: data14.driving.bota,
                backgroundColor: botaC,
                borderColor: botaC,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "BOTA Ready Personal Vehicles",
                data: data14.driving.bota_ready,
                backgroundColor: botaC2,
                borderColor: botaC2,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Ysleta Personal Vehicles",
                data: data14.driving.ysleta,
                backgroundColor: ysC2,
                borderColor: ysC2,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Ysleta Ready Personal Vehicles",
                data: data14.driving.ysleta_ready,
                backgroundColor: ysC,
                borderColor: ysC,
                fill: false,
                lineTension: 0,
                radius: 5
            }
        ]
    };

    //create Chart class object
    var chart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
            responsive: true,
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Mean (Minutes)'
                    }
                }]
            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 12,
                    boxWidth: 8
                }
            },
            title: {
                display: true,
                text: 'Wait Times Personal Vehicles'
            }
        }
    });
}

function pm14FreightChart(ctx, data14) {
    let latestYear = data14.text.latestYear;
    var data = {
        labels: [latestYear - 4, latestYear - 3, latestYear - 2, latestYear - 1, latestYear],
        datasets: [{
                label: "BOTA Cargo",
                data: data14.freight.bota,
                backgroundColor: botaC,
                borderColor: botaC,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "BOTA Fast Cargo",
                data: data14.freight.bota_fast,
                backgroundColor: botaC2,
                borderColor: botaC2,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Ysleta Cargo",
                data: data14.freight.ysleta,
                backgroundColor: ysC,
                borderColor: ysC,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Ysleta Cargo Fast",
                data: data14.freight.ysleta_fast,
                backgroundColor: ysC2,
                borderColor: ysC2,
                fill: false,
                lineTension: 0,
                radius: 5
            }
        ]
    };

    //options
    var options = {
        scales: {},
        responsive: true,
        title: {

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
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Mean (Minutes)'
                    }
                }]
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
            title: {
                display: true,
                text: 'Wait Times Cargo Trucks'
            }
        }
    });
}

function pm14WalkingChart(ctx, data14) {
    let latestYear = data14.text.latestYear;
    var data = {
        labels: [latestYear - 4, latestYear - 3, latestYear - 2, latestYear - 1, latestYear],
        datasets: [{
                label: "PDN Pedestrians",
                data: data14.walking.pdn,
                backgroundColor: pdnC,
                borderColor: pdnC,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "PDN Ready Pedestrians",
                data: data14.walking.pdn_ready,
                backgroundColor: pdnC2,
                borderColor: pdnC2,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "BOTA Pedestrians",
                data: data14.walking.bota,
                backgroundColor: botaC,
                borderColor: botaC,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Ysleta Pedestrians",
                data: data14.walking.ysleta,
                backgroundColor: ysC,
                borderColor: ysC,
                fill: false,
                lineTension: 0,
                radius: 5
            }
        ]
    };

    //create Chart class object
    var chart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Mean (Minutes)'
                    }
                }]
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
            title: {
                display: true,
                text: 'Wait Times Pedestrians'
            }
        }
    });
}