function pm17Data(mode) {
    var pm17Data = [];
    var greatest = [];
    let images = [];

    //store all colors for points
    images.push("./icons/redPin.png");
    images.push("./icons/orangePin.png");
    images.push("./icons/lightPink.png");
    images.push("./icons/lightbluePin.png");
    images.push("./icons/grayPin.png");
    images.push("./icons/greenPin.png");

    images.push("./icons/yellowPin.png");
    images.push("./icons/pinkPin.png");
    images.push("./icons/darkbluePin.png");
    images.push("./icons/lightgreenPin.png");
    images.push("./icons/lightgrayPin.png");


    let key = 'all_pm15_16_17g';
    let example = {
        key: key
    };

    //for calculations
    let greathestNum = 0;
    let greathestStat = '';
    let year = 0;

    let i = 0; //helps on index of PM 10 



    //store graph data
    $.get('mwt_handler.php', example, function (data) {
        for (index in data.shape_arr) {
            stationName = data.shape_arr[index]['Station'];
            category = data.shape_arr[index]['Pollutant'];
            year1 = data.shape_arr[index].year1;
            year2 = data.shape_arr[index].year2;
            year3 = data.shape_arr[index].year3;
            year4 = data.shape_arr[index].year4;
            year5 = data.shape_arr[index].year5;

            if (year1 == '0') {
                year1 = null;
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

            if (category == "PM 10") {

                pm17Data[i] = {
                    name: stationName,
                    graphData: [year1, year2, year3, year4, year5]
                };

                i++;

                if (greathestNum < year1) {
                    greathestNum = year1;
                    year = 2015;
                    greathestStat = stationName;
                }
                if (greathestNum < year2) {
                    greathestNum = year2;
                    year = 2016;
                    greathestStat = stationName;
                }
                if (greathestNum < year3) {
                    greathestNum = year3;
                    year = 2017;
                    greathestStat = stationName;
                }
                if (greathestNum < year4) {
                    greathestNum = year4;
                    year = 2018;
                    greathestStat = stationName;
                }
                if (greathestNum < year5) {
                    greathestNum = year5;
                    year = 2019;
                    greathestStat = stationName;
                }
                //store greatest on current station
                greatest[i] = {
                    name: greathestStat,
                    year: year,
                    greathestNum: greathestNum
                };
                // reset
                greathestNum = 0;
                greathestStat = '';
                year = 0;

            }
        }

        // sort all the greathest stations from highest to lowest 
        greatest.sort(function (a, b) {
            return b.greathestNum - a.greathestNum
        })


        //adding dynamic info aka top 2 greathest stations
        pm17Data[pm17Data.length] = {
            num: greatest[0].greathestNum,
            station: greatest[0].name,
            year: greatest[0].year,

            num2: greatest[1].greathestNum,
            station2: greatest[1].name,
            year2: greatest[1].year
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
                    if (stationName == pm17Data[0].name || stationName == pm17Data[1].name || stationName == pm17Data[2].name || stationName == pm17Data[3].name || stationName == pm17Data[4].name) {
                        point.setMap(map);
                        points.push(point);
                    }



                }
            });
        }

        //menu text
        if (mode == 0) {
            let val = {
                name: "pm17Text",
                value: pm17Data[pm17Data.length - 1].num + " μg/m³"
            };

            menu.push(val);
        } else if (mode == 1) {
            regionalText(pm17Data);
        }
    });
}

function pm17chartLine(ctx, data) {
    //modify values

    var data = {
        labels: ['2015', '2016', '2017', '2018', '2019'],
        datasets: [{
                label: data[0].name,
                data: data[0].graphData,
                backgroundColor: "orange",
                borderColor: "orange",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data[1].name,
                data: data[1].graphData,
                backgroundColor: "green",
                borderColor: "green",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: data[2].name,
                data: data[2].graphData,
                backgroundColor: "yellow",
                borderColor: "yellow",
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
                    labelString: 'Micrograms per Cubic Meter (ug/cu meter)'
                }
            }]
        },
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
        options: options
    });
}