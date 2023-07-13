function pm15Data(mode) {
    var pm15Data = [];
    let images = [];

    //store all colors for points
    images.push("./icons/greenPin.png");
    images.push("./icons/redPin.png");
    images.push("./icons/greenPin.png");
    images.push("./icons/redPin.png");
    images.push("./icons/redPin.png");
    images.push("./icons/greenPin.png");

    images.push("./icons/greenPin.png");
    images.push("./icons/redPin.png");
    images.push("./icons/redPin.png");
    images.push("./icons/redPin.png");
    images.push("./icons/redPin.png");


    let key = 'all_pm15_16_17g';
    let example = {
        key: key
    };

    //for calculations
    let greathestNum8 = 0;
    let greathestStat8 = '';
    let year8 = 0;

    let greathestNum1 = 0;
    let greathestStat1 = '';
    let year1 = 0;

    //store graph data
    $.get('mwt_handler.php', example, function (data) {
        for (index in data.shape_arr) {
            stationName = data.shape_arr[index]['Station'];
            category = data.shape_arr[index]['Pollutant'];
            gfirst = data.shape_arr[index].year1;
            year2 = data.shape_arr[index].year2;
            year3 = data.shape_arr[index].year3;
            year4 = data.shape_arr[index].year4;
            year5 = data.shape_arr[index].year5;

            if (category == "Ozone 1 hr" || category == "Ozone 8 hr") {
                if (gfirst == '0') {
                    gfirst = null;
                }
                if (year2 == '0') {
                    year2 = null;
                }
                if (year3 == '0') {
                    year3 = null;
                }
                if (year4 == '0') {
                    year4 = null;
                }
                if (year5 == '0') {
                    year5 = null;
                }

                pm15Data[index] = {
                    name: stationName,
                    category: category,
                    graphData: [gfirst, year2, year3, year4, year5]
                };

                if (category == "Ozone 1 hr") {
                    if (greathestNum1 < gfirst) {
                        greathestNum1 = gfirst;
                        year1 = 2015;
                        greathestStat1 = stationName;
                    }
                    if (greathestNum1 < year2) {
                        greathestNum1 = year2;
                        year1 = 2016;
                        greathestStat1 = stationName;
                    }
                    if (greathestNum1 < year3) {
                        greathestNum1 = year3;
                        year1 = 2017;
                        greathestStat1 = stationName;
                    }
                    if (greathestNum1 < year4) {
                        greathestNum1 = year4;
                        year1 = 2018;
                        greathestStat1 = stationName;
                    }
                    if (greathestNum1 < year5) {
                        greathestNum1 = year5;
                        year1 = 2019;
                        greathestStat1 = stationName;
                    }
                } else if (category == "Ozone 8 hr") {
                    if (greathestNum8 < gfirst) {
                        greathestNum8 = gfirst;
                        year8 = 2015;
                        greathestStat8 = stationName;
                    }
                    if (greathestNum8 < year2) {
                        greathestNum8 = year2;
                        year8 = 2016;
                        greathestStat8 = stationName;
                    }
                    if (greathestNum8 < year3) {
                        greathestNum8 = year3;
                        year8 = 2017;
                        greathestStat8 = stationName;
                    }
                    if (greathestNum8 < year4) {
                        greathestNum8 = year4;
                        year8 = 2018;
                        greathestStat8 = stationName;
                    }
                    if (greathestNum8 < year5) {
                        greathestNum8 = year5;
                        year8 = 2019;
                        greathestStat8 = stationName;
                    }
                }
            }
        }

        //adding dynamic variables to last element of our data 
        pm15Data[pm15Data.length] = {
            num8: greathestNum8,
            station8: greathestStat8,
            year_8: year8,
            num1: greathestNum1,
            station1: greathestStat1,
            year_1: year1
        };

        //print points 
        if (mode == 1) {
            key = 'all_pm15_16_17';
            example = {
                key: key
            };
            $.get('mwt_handler.php', example, function (data) {
                for (index in data.shape_arr) {
                    let holder = [];
                    let stationName = [];

                    holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
                    holder = holder[0][0]; // Fixes BLOB
                    stationName = data.shape_arr[index]['station_na'];

                    let to_visualize = {
                        lat: parseFloat(holder[0].lat),
                        lng: parseFloat(holder[0].lng)
                    };

                    let point = new google.maps.Marker({
                        position: to_visualize,
                        title: stationName,
                        value: '0',
                        icon: images[index]

                    });

                    point.setMap(map);
                    points.push(point);

                }
            });
        }

        //menu text
        if (mode == 0) {
            let val = {
                name: "pm15Text",
                value: pm15Data[pm15Data.length - 1].num8 + " ppb"
            };
            menu.push(val);
        } else if (mode == 1) {
            regionalText(pm15Data);
        }
    });
}



function pm15chartLine(ctx, data) {
    var data = {
        labels: ['2015', '2016', '2017', '2018', '2019'],
        datasets: [{
                label: data[5].name,
                data: data[5].graphData,
                backgroundColor: "red",
                borderColor: "red",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data[6].name,
                data: data[6].graphData,
                backgroundColor: "orange",
                borderColor: "orange",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data[7].name,
                data: data[7].graphData,
                backgroundColor: "pink",
                borderColor: "pink",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data[8].name,
                data: data[8].graphData,
                backgroundColor: "lightblue",
                borderColor: "lightblue",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data[9].name,
                data: data[9].graphData,
                backgroundColor: "gray",
                borderColor: "gray",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data[10].name,
                data: data[10].graphData,
                backgroundColor: "green",
                borderColor: "green",
                fill: false,
                lineTension: 0,
                radius: 5
            }
        ]
    };

    //options
    var options = {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Parts per Billion (ppb)'
                }
            }]
        },
        responsive: true,
        title: {
            display: true,
            position: 'top',
            text: 'Ozone 8hr Emissions (2015-2019)'
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

function pm15chartLine2(ctx, data) {
    var data = {
        labels: ['2015', '2016', '2017', '2018', '2019'],
        datasets: [{
                label: data[0].name,
                data: data[0].graphData,
                backgroundColor: "yellow",
                borderColor: "yellow",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data[1].name,
                data: data[1].graphData,
                backgroundColor: "purple",
                borderColor: "purple",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data[2].name,
                data: data[2].graphData,
                backgroundColor: "blue",
                borderColor: "blue",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data[3].name,
                data: data[3].graphData,
                backgroundColor: "lightgreen",
                borderColor: "lightgreen",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data[4].name,
                data: data[4].graphData,
                backgroundColor: "lightgray",
                borderColor: "lightgray",
                fill: false,
                lineTension: 0,
                radius: 5
            }
        ]

    };

    //options
    var options = {
        scales: {
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Parts per Million (ppm)'
                }
            }]
        },
        responsive: true,
        title: {
            display: true,
            text: 'Ozone 1hr Emissions (2015-2019)'
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