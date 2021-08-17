//**************************************************************** pm6 shares table with pm10 on database
//Handles 2 toggles of Exist/Plan for Polygons.

function pm6Data(mode, condition) {
    let pm6Data = {
        totJobs: 0,
        jobsPercent: 0,
        totalJobsPercent: 0,

        existing_ratio_sum: 0,
        all_ratio_sum: 0
    };

    let key = 'all_pm6';
    let example = {
        key: key
    };
    let color = "#039BE5";

    $.get('mwt_handler.php', example, function (data) {
        for (index in data.shape_arr) {
            let temp = wktFormatter(data.shape_arr[index]['shape']);
            let to_visualize = [];
            let type = data.shape_arr[index].type;
            let ratio_prim = parseFloat(data.shape_arr[index].ratio_prim);
            let prcnt_prim = parseFloat(data.shape_arr[index].prcnt_prim);
            //update Dynamic Data
            if (type == "Existing") {
                pm6Data.existing_ratio_sum += ratio_prim;
            } else if (type == "Proposed") {
                pm6Data.all_ratio_sum += ratio_prim;
            }

            if (mode == 1) {
                // if the status of a shape exists, push to visualize
                for (let i = 0; i < temp.length; i++) {
                    if (type == "Existing" && condition == "e") {
                        color = "#039BE5"; //blue
                        to_visualize.push(temp[i]);
                        polyToErase.exist.push();
                    } else if (type == "Proposed" && condition == "p") {
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
                    title: prcnt_prim.toFixed(1) + "%",
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
        pm6Calculations(pm6Data, mode);
    });
}

function pm6Calculations(pm6Data, mode) {
    // TODO: Fix keys for this PM
    // let key = "all_pm5_6"
    let key = 'all_pm6';
    let example = {
        key: key
    };
    $.get('mwt_handler.php', example, function (data) {
        let totJobs = 0;
        for (index in data.shape_arr) {
            totJobs += parseInt(data.shape_arr[index].primjobsc0);
        }
        //calculations
        pm6Data.totJobs = totJobs;
        pm6Data.jobsPercent = ((pm6Data.existing_ratio_sum / pm6Data.totJobs) * 100);
        pm6Data.totalJobsPercent = ((pm6Data.all_ratio_sum / pm6Data.totJobs) * 100);

        if (mode == 0) {
            let value = {
                name: "pm6Text",
                value: String(pm6Data.jobsPercent.toFixed(2)) + "%"
            };

            menu.push(value);
        } else if (mode == 1) {
            regionalText(pm6Data);
        }
    });
}

function pm6chart(g2, data) {
    let tot = 100 - (Math.round(data.jobsPercent));
    colors = [];
    colors = [
        'rgba(33,150,243,1)',
        'rgba(255,152,0,1)',
    ];

    myPieChart = new Chart(g2, {
        type: 'pie',
        data: {
            datasets: [{
                data: [tot, Math.round(data.jobsPercent)],
                backgroundColor: colors,
                label: 'Dataset 1'
            }],
            labels: [
                'Total Jobs in the El Paso MPO region',
                'Percent of jobs 0.5 mi from existing bikeways',
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