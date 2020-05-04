/** 
 * Creates graph for PM22
 * Calculates graph data
 *  
*/

function pm22Data(mode, ex) {
    console.log("here 1");
    let shape = "shape";
    let php_handler = "mwt_handler.php";
    let key = "";
    if (mode == 4) {
        data_for_php = ex;
        php_handler = "./backend/AOI.php";
    }

    if (mode == 0 || mode == 1) {
        data_for_php = { 'key': 'all_pm22' };
    } else if (mode == 2) {
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";

        data_for_php = {
            key: 22,
            corridors_selected: ex
            //tableName: ""
        };
    }



    let clusters = [];
    let pm22_data = {
        currentCorridor: 'Entire Region',
        dynamic_txt_val: 0,
        years:[],
        TX: {
            years:[],
            killed: [0, 0, 0, 0, 0],
            classa: [0, 0, 0, 0, 0],
            classb: [0, 0, 0, 0, 0],
            classc: [0, 0, 0, 0, 0],
            classo: [0, 0, 0, 0, 0],
            crashes:[0, 0, 0, 0, 0]
        },
        NM: {
            years:[],
            killed: [0, 0, 0, 0, 0],
            classa: [0, 0, 0, 0, 0],
            classb: [0, 0, 0, 0, 0],
            classc: [0, 0, 0, 0, 0],
            classo: [0, 0, 0, 0, 0],
            crashes:[0, 0, 0, 0, 0]
        }

    }
    if (mode == 2) {
        pm22_data.currentCorridor = ex;
    }

   // console.log("here2");
    //print lines when called from PM button menu
    if (mode > 0) {
        let source_file = "backend/cmp_lines_handler.php";
        let data_for_lines = { "key": "pm22_lines" };
        $.get(source_file, data_for_lines, function (data) {
            for (let index = 0; index < data.shape_arr.length; index++) {
                //       console.log('PRINT LINES CMP')

                let shp = data.shape_arr[index]["shape"];
                let reader = new jsts.io.WKTReader(); // 3rd party tool to handle multiple shapes
                let r = reader.read(shp); // r becomes an object from the 3rd party tool, for a single shp
                let to_visualize = []; // used to populate the map (latitude & longitude)
                let coord; // will be an object to push coordinates to populate the map
                let ln = r.getCoordinates(); // parses the shape into lat & lng
                for (let i = 0; i < ln.length; i++) {
                    coord = {
                        lat: ln[i]['y'],
                        lng: ln[i]['x']
                    };
                    to_visualize.push(coord);
                }
                let line = new google.maps.Polyline({ // it is a POLYLINE
                    path: to_visualize, // polyline has a path, defined by lat & lng
                    // value: data.corridor_data[index]['value'], // iri (attribute for the pavement condition score)
                    strokeColor: 'pink',
                    strokeOpacity: 0.80,
                    strokeWeight: 5,
                    zIndex: 99 // on top of every other shape
                });
                line.setMap(map);
                polylines.push(line);
            }

        });
    }
    //console.log(php_handler);
    //console.log(data_for_php);
    
    $.get(php_handler, data_for_php, function (data) {
        let latestYear = 0;
        for (index in data.shape_arr) {
            let year_found = parseInt(data.shape_arr[index].crash_year);
            if (year_found > latestYear) latestYear = year_found;
        }
        pm22_data.years.push(latestYear - 4);
        pm22_data.years.push(latestYear - 3);
        pm22_data.years.push(latestYear - 2);
        pm22_data.years.push(latestYear - 1);
        pm22_data.years.push(latestYear);

        let killed = 0;
        let classa = 0; // Class A SUspected Serious Injuries
        let classb = 0; // Class B Non - Incapacitating Injuries
        let classc = 0; // Class C = possible injuries
        let classo = 0; // Class O = Non-Injuries + classo Injuries

        // to store data by years
        let year_index = -1;

        for (i in data.shape_arr) {
            let year_found = parseInt(data.shape_arr[i].crash_year);
            let state = data.shape_arr[i].statefp;

            killed = parseInt(data.shape_arr[i].killed);
            classa = parseInt(data.shape_arr[i].classa);
            classb = parseInt(data.shape_arr[i].classb);
            classc = parseInt(data.shape_arr[i].classc);
            classo = parseInt(data.shape_arr[i].classo);

            if (year_found == latestYear - 4) {
                year_index = 0;
  
            } else if (year_found == latestYear - 3) {
                year_index = 1;

            } else if (year_found == latestYear - 2) {
                year_index = 2;
 
            } else if (year_found == latestYear - 1) {
                year_index = 3;

            } else if (year_found == latestYear) {
                year_index = 4;
            }

            if (state == 48) {
                pm22_data.TX.crashes[year_index] ++;//= killed + classa + classb + classc + classo;
                pm22_data.TX.killed[year_index] += killed;
                pm22_data.TX.classb[year_index] += classb;
                pm22_data.TX.classc[year_index] += classc;
                pm22_data.TX.classa[year_index] += classa;
                pm22_data.TX.classo[year_index] += classo;
            
            } else if (state == 35) {
                pm22_data.NM.crashes[year_index] ++//= killed + classa + classb + classc + classo;
                pm22_data.NM.killed[year_index] += killed;
                pm22_data.NM.classb[year_index] += classb;
                pm22_data.NM.classc[year_index] += classc;
                pm22_data.NM.classa[year_index] += classa;
                pm22_data.NM.classo[year_index] += classo;
            }
        }


        if (mode == 1 || mode == 4) {
            let shape = 'shape';
            let image = "./icons/crash_red.png";
            let cluster_markers = [];

            for (index in data.shape_arr) {
                let holder = [];
                holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
                holder = holder[0][0]; // Fixes BLOB
                cluster_points = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };
                cluster_markers.push(cluster_points);
            }
            for (index in data.shape_arr) {
                let holder = [];
                holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
                holder = holder[0][0]; // Fixes BLOB
                cluster_points = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };
                cluster_markers.push(cluster_points);
            }
            var markers = cluster_markers.map(function (location, i) {
                return new google.maps.Marker({
                    position: location,
                    icon: image,
                    title: "A crash ocurred at this location"
                });
            });
            clusters.push(markers);
            markerCluster = new MarkerClusterer(map, markers,
                {
                    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                });
        }
        //dynamic text calculation

        pm22_data.dynamic_txt_val  = pm22_data.TX.crashes.reduce((a,b) => a + b, 0);
        pm22_data.dynamic_txt_val  += pm22_data.NM.crashes.reduce((a,b) => a + b, 0);

        if (mode == 0) {
            document.getElementById('pm22Count').innerHTML = commafy(pm22_data.dynamic_txt_val);
        }
        else if (mode == 1) {
            regionalText(pm22_data);
        }
        else if (mode == 2) {
            dynamicCorridorText(corr, pm22_data); // Send graph data and current corridor to dynamic text for corridors
        }
        else if (mode == 4) {
            dynamicCorridorText("AOI", pm22_data); // Send graph data and current corridor to dynamic text for corridors
        }
    }).fail(function (error) {
        pm_error_handler(mode, ex);
    });
}
function arraySum(array1, array2) {
    let sum = [];
    for (var i = 0; i < array1.length; i++) {
        sum.push(array1[i] + array2[i]);
    }
    return sum;
}

//   CHARTS 
// 		 LINE CHART 

function pm22chartLine(ctx, data) {
    let data_crashes = [];
    let data_totInjuries = [];

    data_crashes = arraySum(data.TX.crashes, data.NM.crashes);

    data_totInjuries = arraySum(data.TX.classa, data.NM.classa);
    let dummy = arraySum(data.TX.classc, data.NM.classc);
    let b = arraySum(data.TX.classb, data.NM.classb);
    data_totInjuries = arraySum(data_totInjuries, dummy);
    data_totInjuries = arraySum(data_totInjuries, b);

    var data = {
        labels: data.years,
        datasets: [
            {
                label: "Total Crashes",
                data: data_crashes,
                backgroundColor: "purple",
                borderColor: "lightblue",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Injuries",
                data: data_totInjuries,
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

function pm22StackedChart(ctx, data) {
    let titleH = data.currentCorridor;
    if (titleH != 'Entire Region') { //if corridor, fix wording
        titleH = wordFix(titleH + " Corridor");
    }
    //  console.log(data.TX.killed);
    var barChartData = {
        labels: data.years,//[0], data.TX.years[1], data.TX.years[2],data.TX.years[3], data.TX.years[4]],
        datasets: [
            {
            label: 'Killed',
            backgroundColor: 'rgba(255,82,0,0.5)',
            data: arraySum(data.TX.killed, data.NM.killed)
            }, {
                label: 'Serious Injuries',
                backgroundColor: 'rgba(92,187,3,0.5)',
                data: arraySum(data.TX.classa, data.NM.classa)
            },{
            label: 'Non-Incapacitating Injuries',
            backgroundColor: 'rgba(117,36,221,0.5)',
            data: arraySum(data.TX.classb, data.NM.classb)
            },{
            label: 'Possible Injuries',
            backgroundColor: 'rgba(255,235,59,1)',
            data: arraySum(data.TX.classc, data.NM.classc)
            },{
            label: 'Non-Injury',
            backgroundColor: 'rgb(255,0,255,0.5)',
            data: arraySum(data.TX.classo, data.NM.classo)
            }
        ]

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

