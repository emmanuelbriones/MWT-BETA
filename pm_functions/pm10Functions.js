//**************************************************************** pm5 shares table with pm10 on database
//Handles 2 toggles of Exist/Plan for Polygons.

function pm10Data(mode, condition) {

    let pm10Data = {
        totPop: 0, //The summation of people living in the proposed & planned areas

        peopleLivingTransit: 0, // PeopleLivingBikeways
        totalpeopleLivingTransit: 0, // PeopleLivingBikeways

        existing_ratio_sum: 0,
        all_ratio_sum: 0
    };

    let key = 'all_pm10';
    let example = {
        key: key
    };
    let color = "#039BE5";


    $.get('mwt_handler.php', example, function (data) {
        for (index in data.shape_arr) {
            let temp = wktFormatter(data.shape_arr[index]['shape']);
            let to_visualize = [];

            let type = data.shape_arr[index].type;
            let ratioPop = parseFloat(data.shape_arr[index].ratio_pop);
            let statefp = parseInt(data.shape_arr[index].statefp);

            // update Text Data
            if (type == "ex") {
                pm10Data.existing_ratio_sum += ratioPop;
            } else if (type == "all" && statefp == 48) {
                pm10Data.all_ratio_sum += ratioPop;
            }

            if (mode == 1) {
                for (let i = 0; i < temp.length; i++) {
                    if (type == "ex" && condition == "e") {
                        color = "#039BE5"; //blue
                        to_visualize.push(temp[i]);
                        polyToErase.exist.push();
                    } else if (type == "all" && condition == "p") {
                        color = "#9E9E9E"; //gray
                        to_visualize.push(temp[i]);
                        polyToErase.plan.push();
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
                    title: Math.round(ratioPop),
                });

                if (condition == "e") polyToErase.exist.push(polygon);
                if (condition == "p") polyToErase.plan.push(polygon);

                // Hover Effect for Google API Polygons
                google.maps.event.addListener(polygon, 'mouseover', function (event) {
                    injectTooltip(event, polygon.title);
                });
                google.maps.event.addListener(polygon, 'mousemove', function (event) {
                    moveTooltip(event);
                });
                google.maps.event.addListener(polygon, 'mouseout', function (event) {
                    deleteTooltip(event);
                });

                polygon.setMap(map);
                polygons.push(polygon);
            }
        }
        pm10Calculations(pm10Data, mode);
    });

}

function pm10Calculations(pm10Data, mode) {
    let key = 'all_pm9_10';
    let example = {
        key: key
    };
    $.get('mwt_handler.php', example, function (data) {
        let totPop = 0;
        for (index in data.shape_arr) {
            totPop += parseInt(data.shape_arr[index].b00001e1);
        }
        //calculations
        pm10Data.totPop = totPop;
        pm10Data.peopleLivingTransit = ((pm10Data.existing_ratio_sum / pm10Data.totPop) * 100);
        // pm10Data.totalpeopleLivingTransit = ((pm10Data.all_ratio_sum / pm10Data.totPop) * 100);

        if (mode == 0) {
            let value = {
                name: "pm10Text",
                value: pm10Data.peopleLivingTransit.toFixed(2) + "%"
            };

            menu.push(value);
        } else if (mode == 1) {
            regionalText(pm10Data);
        }

    });

}

function pm10chart(g2, data) {
    colors = [];
    colors = [
        'rgba(33,150,243,1)',
        'rgba(255,152,0,1)',
    ];
    let tot = 100 - data.peopleLivingTransit.toFixed(2);
    myPieChart = new Chart(g2, {
        type: 'pie',
        data: {
            datasets: [{
                data: [tot, data.peopleLivingTransit.toFixed(2)],
                backgroundColor: colors,
                label: 'Dataset 1'
            }],
            labels: [
                'Total Population',
                'Population within 1/2 mi from proposed high-quality rapid transit',
            ]
        },
        options: {
            responsive: true,
            legend: {
                labels: {
                    fontSize: 13,
                    boxWidth: 15
                }
            },
            /* title: {
                 display: true,
                 text: 'Title 2'
             },*/
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                    }
                }
            }
        }

    });
}