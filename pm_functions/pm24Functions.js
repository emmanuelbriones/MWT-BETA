function pm24Data(mode, ex) {
    let php_handler = "mwt_handler.php";
    let shape = "shape";
    let key = 'all_pm24';

    let color = '#2196F3';
    pm24data = {
        ttiAvg: 0,
        graphVals: [0, 0, 0, 0, 0, 0],
        sumGreater: 0,
        percentGreater: 0
    }
    if (mode == 0 || mode == 1) {
        data_for_php = {
            key: key
        };
    } else if (mode == 2) {
        php_handler = "corridor_handlerB.php";
        shape = 'ST_AsText(SHAPE)';
        data_for_php = {
            key: 24,
            corridors_selected: ex,
            tableName: 'pm24'
        };
    } else if (mode == 4) {
        php_handler = "./backend/AOI.php";
        data_for_php = ex;
    }
    let ttiSum = 0;
    let ttiLength = 0;
    let totalMiles = 0;


    $.get(php_handler, data_for_php, function (data) {
        let identifier = ex;
        for (index in data.shape_arr) {
            let shp = data.shape_arr[index][shape];
            let reader = new jsts.io.WKTReader();
            let r = reader.read(shp);
            let to_visualize = [];
            let coord;
            let ln = r.getCoordinates();
            let miles = parseFloat(data.shape_arr[index].leng_cal);
            let tti = 0;
            if (currentType == 'driving' || identifier == 'd') {
                tti = parseFloat(data.shape_arr[index].tti);
            } else if (currentType == 'freight' || identifier == 'f') {
                tti = parseFloat(data.shape_arr[index].trktti);
            }

            ttiSum += tti;

            if (tti > 1.5) {
                pm24data.sumGreater += miles;
            }
            if (tti > 0) {
                ttiLength++;
                totalMiles += miles;
            }

            //color
            if (tti == 0) {
                color = '#9E9E9E';
            } else if (tti >= 1 && tti <= 1.1) {
                color = '#03A9F4';
                pm24data.graphVals[0] += miles;
            } else if (tti >= 1.11 && tti <= 1.2) {
                color = '#CDDC39';
                pm24data.graphVals[1] += miles;
            } else if (tti >= 1.21 && tti <= 1.3) {
                color = '#FFEB3B';
                pm24data.graphVals[2] += miles;
            } else if (tti >= 1.31 && tti <= 1.5) {
                color = '#FFAB40';
                pm24data.graphVals[3] += miles;
            } else if (tti >= 1.51) {
                color = '#d50000';
                pm24data.graphVals[4] += miles;
            }

            if (mode == 1 || mode == 2 || mode == 4) {
                for (let i = 0; i < ln.length; i++) {
                    coord = {
                        lat: ln[i]['x'],
                        lng: ln[i]['y']
                    };
                    to_visualize.push(coord);
                }
                let line = new google.maps.Polyline({ // it is a POLYLINE
                    path: to_visualize, // polyline has a path, defined by lat & lng 
                    strokeColor: color,
                    strokeOpacity: .50,
                    strokeWeight: 4,
                    zIndex: 99 // on top of every other shape
                });
                // Hover Effect for Google API Polygon
                google.maps.event.addListener(line, 'mouseover', function (event) {
                    injectTooltip(event, tti);
                });
                google.maps.event.addListener(line, 'mousemove', function (event) {
                    moveTooltip(event);
                });
                google.maps.event.addListener(line, 'mouseout', function (event) {
                    deleteTooltip(event);
                });


                line.setMap(map);
                polylines.push(line);
            }
        }
        //calculations
        pm24data.ttiAvg = (ttiSum / ttiLength).toFixed(2);
        pm24data.percentGreater = (pm24data.sumGreater / totalMiles) * 100;
        pm24data.graphVals[0] = parseFloat(pm24data.graphVals[0]).toFixed(2);
        pm24data.graphVals[1] = parseFloat(pm24data.graphVals[1].toFixed(2));
        pm24data.graphVals[2] = parseFloat(pm24data.graphVals[2].toFixed(2));
        pm24data.graphVals[3] = parseFloat(pm24data.graphVals[3].toFixed(2));
        pm24data.graphVals[4] = parseFloat(pm24data.graphVals[4].toFixed(2));
        pm24data.graphVals[5] = parseFloat(pm24data.graphVals[5].toFixed(2));

        let corr = translateCorridor(data_for_php.corridors_selected); // what corridor are we on?


        if (mode == 0) {
            let name = "";
            if (identifier == 'd') {
                name = "pm24DText";
            }
            else if (identifier == 'f') {
                name = "pm24FText";
            }
            let val = {
                name: name,
                value: pm24data.ttiAvg
            };
            menu.push(val);
        } else if (mode == 1) {
            regionalText(pm24data);
        } else if (mode == 2) {
            dynamicCorridorText(corr, pm24data);
        } else if (mode == 4) {
            dynamicCorridorText("AOI", pm24data);
        }

    });

}

function pm24BarGraph(ctx, data) {
    let label1 = "1-1.1";
    let label2 = "1.11-1.2";
    let label3 = "1.21-1.3";
    let label4 = "1.31-1.5";
    let label5 = "1.51 >";
    let title = '';
    // console.log(data);
    if (currentType == 'driving') {
        title = 'TTI(driving)';
    } else if (currentType == 'freight') {
        title = 'TTI(Freight)';
    }
    var barChartData = {
        labels: [label1, label2, label3, label4, label5],
        datasets: [{
            label: title,
            backgroundColor: ['#03A9F4', '#CDDC39', '#FFEB3B', '#FFAB40', '#d50000'],
            data: data.graphVals
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
                text: 'Driving miles in Travel Time Index',
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