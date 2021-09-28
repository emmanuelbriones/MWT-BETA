function pm8Data(mode, status) {
    pm8DataBuffer(mode, status);

}

function pm8DataBuffer(mode, stat) {
    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";

    if (mode == 0 || mode == 1) { // if we want regional (default) data
        let key = 'all_pm8B';
        data_for_php = {
            key: key
        };
    }

    $.get(php_handler, data_for_php, function (data) {

        let color = "#039BE5"; //blue
        if (mode == 1) {
            for (index in data.shape_arr) {
                let temp = wktFormatter(data.shape_arr[index][shape]);
                let to_visualize = [];
                let type = data.shape_arr[index]['type'];

                // if the status of a shape exists, push to visualize
                for (let i = 0; i < temp.length; i++) {
                    if (type == "existing" && stat == "e") {
                        color = "#039BE5"; //blue
                        to_visualize.push(temp[i]);

                    } else if (type == "plan_ex" && stat == "p") {
                        color = "#9E9E9E"; //gray
                        to_visualize.push(temp[i]);

                    }
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
                    title: "",
                });

                if (stat == "e") polyToErase.exist.push(polygon);
                if (stat == "p") polyToErase.plan.push(polygon);

                polygon.setMap(map);
                polygons.push(polygon);
            }
        }

        pm8DataP(mode, stat);
    });
}

function pm8DataP(mode, stat) {
    let key = 'all_pm8K';
    let example = {
        key: key
    };
    let color = "#039BE5";

    let pm8Data = {
        existing: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        planned: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        totKeyDest: 0,
        percentKeyD1: 0,
        percentKeyD2: 0,
    };


    $.get('mwt_handler.php', example, function (data) {

        let image = "./img/markers/red.png";

        pm8Data.totKeyDest = data.shape_arr.length + 1; // we are adding 1 since we are also counting the null value on this table
        let existingCount = 0;
        let proposedCount = 0;
        for (index in data.shape_arr) { // Organize information into dictionaries
            //hold info of 1 point at a time
            let holder = [];
            let existing = data.shape_arr[index].existing;
            let planned = data.shape_arr[index].planned;
            let type = data.shape_arr[index].type;
            let display = data.shape_arr[index].display;

            if (mode == 1) {
                holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
                holder = holder[0][0]; // Fixes BLOBs

                let to_visualize = {
                    lat: parseFloat(holder[0].lat),
                    lng: parseFloat(holder[0].lng)
                };

                let point = new google.maps.Marker({
                    position: to_visualize,
                    icon: image,
                    title: type
                });
                if (existing == "Yes" && stat == "e") {
                    pointsToErase.exist.push(point);
                    point.setMap(map);
                    points.push(point);
                } else if (planned == "Yes" && stat == "p") {
                    pointsToErase.plan.push(point);
                    point.setMap(map);
                    points.push(point);
                }
            }

            if (display == 1 || display == 9) {
                existingCount++;
            }
            if (display > 0) {
                proposedCount++;
            }

            //COUNT
            if (type == "Airport") {
                if (existing == "Yes") {
                    pm8Data.existing[0]++;
                } else if (planned == "Yes") {
                    pm8Data.planned[0]++;
                }
            } else if (type == "Hospital") {
                if (existing == "Yes") {
                    pm8Data.existing[1]++;
                } else if (planned == "Yes") {
                    pm8Data.planned[1]++;
                }
            } else if (type == "Leisure Time Activity") {
                if (existing == "Yes") {
                    pm8Data.existing[2]++;
                } else if (planned == "Yes") {
                    pm8Data.planned[2]++;
                }
            } else if (type == "Mall") {
                if (existing == "Yes") {
                    pm8Data.existing[3]++;
                } else if (planned == "Yes") {
                    pm8Data.planned[3]++;
                }
            } else if (type == "Military Base") {
                if (existing == "Yes") {
                    pm8Data.existing[4]++;
                } else if (planned == "Yes") {
                    pm8Data.planned[4]++;
                }
            } else if (type == "Natural and Heritage") {
                if (existing == "Yes") {
                    pm8Data.existing[5]++;
                } else if (planned == "Yes") {
                    pm8Data.planned[5]++;
                }
            } else if (type == "Nursing Home") {
                if (existing == "Yes") {
                    pm8Data.existing[6]++;
                } else if (existing == "Yes") {
                    pm8Data.planned[6]++;
                }
            } else if (type == "Prison/Jail") {
                if (existing == "Yes") {
                    pm8Data.existing[7]++;
                } else if (planned == "Yes") {
                    pm8Data.planned[7]++;
                }
            } else if (type == "Shelter") {
                if (existing == "Yes") {
                    pm8Data.existing[8]++;
                } else if (planned == "Yes") {
                    pm8Data.planned[8]++;
                }
            } else if (type == "Transit Center") {
                if (existing == "Yes") {
                    pm8Data.existing[9]++;
                } else if (planned == "Yes") {
                    pm8Data.planned[9]++;
                }
            } else if (type == "University/College") {
                if (existing == "Yes") {
                    pm8Data.existing[10]++;
                } else if (planned == "Yes") {
                    pm8Data.planned[10]++;
                }
            }

        }
        //calculations
        pm8Data.percentKeyD1 = (existingCount / pm8Data.totKeyDest) * 100;
        pm8Data.percentKeyD2 = (proposedCount / pm8Data.totKeyDest) * 100;

        if (mode == 0) {
            document.getElementById("pm8Text").innerHTML = pm8Data.percentKeyD1.toFixed(2) + "%";
            let value = {
                name: "pm8Text",
                value: pm8Data.percentKeyD1.toFixed(2) + "%"
            };

            menu.push(value);
        } else if (mode == 1) {
            regionalText(pm8Data);
        }
    });
}

function pm8HorizontalBar(ctx, data) {
    var myBarChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: ["Airport", "Hospital", "Leisure Time Activity", "Mall", "Military Base", "Natural and heritage", "Nursing Home", "Prison/Jail", "Shelter", "Transit Center", "University/College"],
            datasets: [{
                    label: "Number of Key Destinations in El Paso MPO Region",
                    data: data.existing,
                    fill: false,
                    backgroundColor: ['rgb(255,112,67)', 'rgb(255,112,67)', 'rgb(255,112,67)', 'rgb(255,112,67)', 'rgb(255,112,67)', 'rgb(255,112,67)', 'rgb(255,112,67)', 'rgb(255,112,67)', 'rgb(255,112,67)', 'rgb(255,112,67)', 'rgb(255,112,67)'],
                    borderColor: ['rgb(255,87,34)', 'rgb(255,87,34)', 'rgb(255,87,34)', 'rgb(255,87,34)', 'rgb(255,87,34)', 'rgb(255,87,34)', 'rgb(255,87,34)', 'rgb(255,87,34)', 'rgb(255,87,34)', 'rgb(255,87,34)', 'rgb(255,87,34)'],
                    borderWidth: 1
                },
                {
                    label: "Number of Key Destinations in 0.5 mi of high-quality rapid transit",
                    data: data.planned,
                    fill: false,
                    backgroundColor: ['rgba(33,150,243 ,1)', 'rgba(33,150,243 ,1)', 'rgba(33,150,243 ,1)', 'rgba(33,150,243 ,1)', 'rgba(33,150,243 ,1)', 'rgba(33,150,243 ,1)', 'rgba(33,150,243 ,1)', 'rgba(33,150,243 ,1)', 'rgba(33,150,243 ,1)', 'rgba(33,150,243 ,1)', 'rgba(33,150,243 ,1)'],
                    borderColor: ['rgb(33,150,243)', 'rgb(33,150,243)', 'rgb(33,150,243)', 'rgb(33,150,243)', 'rgb(33,150,243)', 'rgb(33,150,243)', 'rgb(33,150,243)', 'rgb(33,150,243)', 'rgb(33,150,243)', 'rgb(33,150,243)'],
                    borderWidth: 1
                },

            ]
        },

        options: {
            legend: {
                position: 'bottom',
                labels: {
                    fontSize: 11, //changes the two little boxes' text on the bottom of the graph
                    boxWidth: 15
                }
            },
            title: {
                display: true,
                text: 'Key Destinations in the El Paso MPO region in 0.5 mi of existing high-quality rapid transit'
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }



    });
}

function pm8HorizontalBar2(ctx) {
    var myBarChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: ["Airport", "Hospital", "Leisure Time Activity", "Mall", "Military Base", "Natural and Heritage", "Nursing Home", "Prison/Jail", "Shelter", "Transit Center", "University/College"],
            datasets: [{
                    label: "Number of Key Destinations in El Paso MPO Region",
                    data: [1, 5, 8, 5, 6, 7, 8, 9, 4, 6, 11],
                    fill: false,
                    backgroundColor: ['rgb(255,112,67)', 'rgb(255,112,67)', 'rgb(255,112,67)', 'rgb(255,112,67)', 'rgb(255,112,67)', 'rgb(255,112,67)', 'rgb(255,112,67)', 'rgb(255,112,67)', 'rgb(255,112,67)', 'rgb(255,112,67)', 'rgb(255,112,67)'],
                    borderColor: ['rgb(255,87,34)', 'rgb(255,87,34)', 'rgb(255,87,34)', 'rgb(255,87,34)', 'rgb(255,87,34)', 'rgb(255,87,34)', 'rgb(255,87,34)', 'rgb(255,87,34)', 'rgb(255,87,34)', 'rgb(255,87,34)', 'rgb(255,87,34)'],
                    borderWidth: 1
                },
                {
                    label: "Number of Key Destinations in 0.5 mi of high-quality rapid transit",
                    data: [1, 5, 8, 4, 8, 9, 6, 3, 4, 7, 8],
                    fill: false,
                    backgroundColor: ['rgba(33,150,243 ,1)', 'rgba(33,150,243 ,1)', 'rgba(33,150,243 ,1)', 'rgba(33,150,243 ,1)', 'rgba(33,150,243 ,1)', 'rgba(33,150,243 ,1)', 'rgba(33,150,243 ,1)', 'rgba(33,150,243 ,1)', 'rgba(33,150,243 ,1)', 'rgba(33,150,243 ,1)', 'rgba(33,150,243 ,1)'],
                    borderColor: ['rgb(33,150,243)', 'rgb(33,150,243)', 'rgb(33,150,243)', 'rgb(33,150,243)', 'rgb(33,150,243)', 'rgb(33,150,243)', 'rgb(33,150,243)', 'rgb(33,150,243)', 'rgb(33,150,243)', 'rgb(33,150,243)'],
                    borderWidth: 1
                },

            ]
        },

        options: {
            legend: {
                position: 'bottom',
                labels: {
                    fontSize: 11, //changes the two little boxes' text on the bottom of the graph
                    boxWidth: 15
                }
            },
            title: {
                display: true,
                text: 'Key Destinations in the El Paso MPO region'
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}