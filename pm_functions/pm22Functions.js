/** 
 * Creates graph for PM22
 * Calculates graph data
 *  
*/

function pm22Data(mode,ex){
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
        dynamic_txt_val:0,
        TX:{
            years:[],
            fatalities:[0,0,0,0,0],
            suspected_inj:[0,0,0,0,0],
            non_incap:[0,0,0,0,0],
            possible_inj:[0,0,0,0,0],
            non_inj:[0,0,0,0,0],
            unknown:[0,0,0,0,0],
            totals:[0,0,0,0,0]
        },
        NM:{
            years:[],
            fatalities:[0,0,0,0,0],
            suspected_inj:[0,0,0,0,0],
            non_incap:[0,0,0,0,0],
            possible_inj:[0,0,0,0,0],
            non_inj:[0,0,0,0,0],
            unknown:[0,0,0,0,0],
            totals:[0,0,0,0,0]
        }

    }
    if (mode == 2) {
        pm22_data.currentCorridor = ex;
    }
    $.get(php_handler, data_for_php, function (data) {
   //     console.table(data);
        pm22_data.dynamic_txt_val = parseInt(data.PM22.TX_DATA.length) + parseInt( data.PM22.NM_DATA.length);
        
        let fatal_sum =0;
        let suspected_inj_sum =0;
        let non_incap_sum =0;
        let possible_inj_sum =0;
        let non_inj_sum = 0;
        let unknown_sum =0;
          // to store data by years
        let year_index = -1;

        for(let i = 0; i < data.PM22.TX_DATA.length ; i++){
            let year_found = data.PM22.TX_DATA[i].crash_year;
            if(!pm22_data.TX.years.includes(year_found)){//new year found
                pm22_data.TX.years.push(year_found);
                
                fatal_sum +=parseInt( data.PM22.TX_DATA[i].fatal);
                suspected_inj_sum +=parseInt( data.PM22.TX_DATA[i].suspected_inj);
                non_incap_sum += parseInt(data.PM22.TX_DATA[i].non_incap_inj);
                possible_inj_sum += parseInt(data.PM22.TX_DATA[i].possible_inj);
                non_inj_sum += parseInt(data.PM22.TX_DATA[i].non_inj);
                unknown_sum += parseInt(data.PM22.TX_DATA[i].unknown_inj);

                year_index++;
            }
            else{//data belongs to same year in year range
                fatal_sum +=parseInt( data.PM22.TX_DATA[i].fatal);
                suspected_inj_sum +=parseInt( data.PM22.TX_DATA[i].suspected_inj);
                non_incap_sum += parseInt(data.PM22.TX_DATA[i].non_incap_inj);
                possible_inj_sum += parseInt(data.PM22.TX_DATA[i].possible_inj);
                non_inj_sum += parseInt(data.PM22.TX_DATA[i].non_inj);
                unknown_sum += parseInt(data.PM22.TX_DATA[i].unknown_inj);

                pm22_data.TX.fatalities[year_index] = fatal_sum;
                pm22_data.TX.non_incap[year_index] = non_incap_sum;
                pm22_data.TX.possible_inj[year_index] = possible_inj_sum;
                pm22_data.TX.suspected_inj[year_index] = suspected_inj_sum;
                pm22_data.TX.non_inj[year_index] = non_inj_sum;
                pm22_data.TX.unknown[year_index] = unknown_sum;
                pm22_data.TX.totals[year_index] = fatal_sum + suspected_inj_sum + non_incap_sum + possible_inj_sum + non_inj_sum ;
            }
    }  

     fatal_sum =0;
     suspected_inj_sum =0;
     non_incap_sum =0;
     possible_inj_sum =0;
     non_inj_sum = 0;
     unknown_sum =0;
     year_index = -1;

     for(let i = 0; i < data.PM22.NM_DATA.length ; i++){
        let year_found = data.PM22.NM_DATA[i].crash_year;
        if(!pm22_data.NM.years.includes(year_found)){//new year found
            pm22_data.NM.years.push(year_found);
            
            fatal_sum +=parseInt( data.PM22.NM_DATA[i].fatal);
            suspected_inj_sum +=parseInt( data.PM22.NM_DATA[i].suspected_inj);
            non_incap_sum += parseInt(data.PM22.NM_DATA[i].non_incap_inj);
            possible_inj_sum += parseInt(data.PM22.NM_DATA[i].possible_inj);
            non_inj_sum += parseInt(data.PM22.NM_DATA[i].non_inj);
            //unknown_sum += parseInt(data.PM22.NM_DATA[i].unknown_inj);

            year_index++;
        }
        else{//data belongs to same year in year range
            fatal_sum +=parseInt( data.PM22.NM_DATA[i].fatal);
            suspected_inj_sum +=parseInt( data.PM22.NM_DATA[i].suspected_inj);
            non_incap_sum += parseInt(data.PM22.NM_DATA[i].non_incap_inj);
            possible_inj_sum += parseInt(data.PM22.NM_DATA[i].possible_inj);
            non_inj_sum += parseInt(data.PM22.NM_DATA[i].non_inj);
          //  unknown_sum += parseInt(data.PM22.NM_DATA[i].unknown_inj);

            pm22_data.NM.fatalities[year_index] = fatal_sum;
            pm22_data.NM.non_incap[year_index] = non_incap_sum;
            pm22_data.NM.possible_inj[year_index] = possible_inj_sum;
            pm22_data.NM.suspected_inj[year_index] = suspected_inj_sum;
            pm22_data.NM.non_inj[year_index] = non_inj_sum;
            //pm22_data.NM.unknown[year_index] = unknown_sum;
            pm22_data.NM.totals[year_index] = fatal_sum + suspected_inj_sum + non_incap_sum + possible_inj_sum + non_inj_sum ;
        }
        }  
        if (mode == 1|| mode == 4) {
            let shape = 'shape';
            let image = "./icons/crash_red.png";
            let cluster_markers = [];

            for (index in data.PM22.TX_DATA) {
                let holder = [];
                holder.push(wktFormatterPoint(data.PM22.TX_DATA[index]['shape']));
                holder = holder[0][0]; // Fixes BLOB
                cluster_points = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };
                cluster_markers.push(cluster_points);
            }
            for (index in data.PM22.NM_DATA) {
                let holder = [];
                holder.push(wktFormatterPoint(data.PM22.NM_DATA[index]['shape']));
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
            for (let index = 0; index < data.PM22.CMP_LINES.length; index++) {
         //       console.log('PRINT LINES CMP')

                let shp = data.PM22.CMP_LINES[index][shape];
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
     //       console.log('PRINT CLUSTERS CMP')
            clusters.push(markers);
            markerCluster = new MarkerClusterer(map, markers,
                {
                    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
                });
        }
        //dynamic text calculation

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
    }).fail(function(error){
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
    data_crashes = arraySum(data.TX.totals, data.NM.totals);
    data_totInjuries = arraySum(data.TX.suspected_inj, data.NM.suspected_inj);
    data_totInjuries = arraySum(data_totInjuries, arraySum(data.TX.possible_inj, data.NM.possible_inj));
    data_totInjuries = arraySum(data_totInjuries, arraySum(data.TX.non_inj, data.NM.non_inj));
    //     //line chart data
    var data = {
        labels: data.TX.years,
        datasets: [
            {
                label: "Crashes",
                data: data_crashes,
                backgroundColor: "blue",
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
            display: true,
            //  position: "top",
            text: "CMP Network",
            fontSize: 10
        },
        legend: {
            display: true,
            position: "bottom",
            labels: {
                fontColor: "#000",
                fontSize: 10,
                boxWidth: 6
            }
        },
        tooltips: {
            mode: 'index',
            //intersect: false
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
    console.log(data.TX.fatalities);
    var barChartData = {
        labels: data.TX.years,//[0], data.TX.years[1], data.TX.years[2],data.TX.years[3], data.TX.years[4]],
        datasets: [{
            label: 'Fatalities',
            backgroundColor: 'rgba(255,82,0,0.5)',
            data: arraySum(data.TX.fatalities,data.NM.fatalities)
        }, {
            label: 'Serious Injuries',
            backgroundColor: 'rgba(92,187,3,0.5)',
            data: 0
        }, {
            label: 'Non-Incapacitating Injuries',
            backgroundColor: 'rgba(117,36,221,0.5)',
                data: arraySum(data.TX.non_incap ,data.NM.non_incap)
        }, {
            label: 'Possible Injuries',
                backgroundColor: 'rgba(255,235,59,1)',
                data: arraySum(data.TX.possible_inj , data.NM.possible_inj)
        }, {
            label: 'Non-Injury',
            backgroundColor: 'rgb(255,0,255,0.5)',
                data: arraySum(data.TX.non_inj , data.NM.non_inj)
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
// function pm22nmPoints(mode, ex) {
//     console.log("nm points");
//     let shape = "shape";
//     let php_handler = "mwt_handler.php";
//     let data_for_php = {};

//     let key = "";
//     if (mode == 4) {
//         data_for_php = ex;
//         php_handler = "./backend/AOI.php";
//     }

//     if (mode == 0 || mode == 1) {
//         key = 'all_pm22';
//         data_for_php = { key: key };
//     } else if (mode == 2) {
//         shape = 'ST_AsText(SHAPE)';
//         php_handler = "corridor_handlerB.php";

//         data_for_php = {
//             key: 22,
//             corridors_selected: ex,
//             tableName: "pm22nmpoints"
//         };
//     }
//     let image = "./icons/crash_red.png";
//     let cluster_markers = [];
//     $.get(php_handler, data_for_php, function (data) {
//         console.log("nm points inside");
//         for (index in data.shape_arr) {
//             let holder = [];
//             holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
//             holder = holder[0][0]; // Fixes BLOB

//             cluster_points = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };
//             cluster_markers.push(cluster_points);
//         }

//         var markers = cluster_markers.map(function (location, i) {
//             return new google.maps.Marker({
//                 position: location,
//                 icon: image,
//                 title: "A crash ocurred at this location"
//             });
//         });

//         clusters.push(markers);
//         markerCluster = new MarkerClusterer(map, markers, {
//             imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
//         });
//     });
// }
// function pm22txPoints(mode,ex) {
//     let shape = "shape";
//     let php_handler = "mwt_handler.php";
//     let data_for_php = {};

//     let key = "";
//     if (mode == 4) {
//         data_for_php = ex;
//         php_handler = "./backend/AOI.php";
//     }

//     if (mode == 0 || mode == 1) {
//         key = 'all_pm22';
//         data_for_php = { key: key };
//     } else if (mode == 2) {
//         shape = 'ST_AsText(SHAPE)';
//         php_handler = "corridor_handlerB.php";

//         data_for_php = {
//             key: 22,
//             corridors_selected: ex,
//             tableName: "pm22txpoints"
//         };
//     }

//         cmp_lines();
//         let image = "./icons/crash_red.png";
//         let cluster_markers = [];
//         $.get(php_handler, data_for_php, function (data) {
//             for (index in data.shape_arr) {
//                 let holder = [];
//                 holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
//                 holder = holder[0][0]; // Fixes BLOB

//                 cluster_points = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };
//                 cluster_markers.push(cluster_points);
//             }

//             var markers = cluster_markers.map(function (location, i) {
//                 return new google.maps.Marker({
//                     position: location,
//                     icon: image,
//                     title: "A crash ocurred at this location"
//                 });
//             });

//             clusters.push(markers);
//             markerCluster = new MarkerClusterer(map, markers,
//                 {
//                     imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
//                 });
//             pm22nmPoints(mode,ex);
//         });
// }

//function pm22Data(mode, ex) {
    // var pm22_crashes = []; // stores year totals for pm22 crashes
    // let pm22Text = 0;
    // //stores summation


    // let pm22_TX_data = {
    //     _2013: { injuries: 0 },
    //     _2014: { injuries: 0 },
    //     _2015: { injuries: 0 },
    //     _2016: { injuries: 0 },
    //     _2017: { injuries: 0 }
    // };
    // let pm22_NM_data = {
    //     _2013: { injuries: 0 },
    //     _2014: { injuries: 0 },
    //     _2015: { injuries: 0 },
    //     _2016: { injuries: 0 },
    //     _2017: { injuries: 0 }
    // };
    // pm22_crashes = []; // gets valuesPm22 for pm22 graph

   // $.get("./backend/pm22_data.TX.php", function (myJson) {

        // // crashes data
        // let all_tx_years = myJson.PM22.TX_YEARS;
        // let all_nm_years = myJson.PM22.NM_YEARS;
        // //console.log(all_tx_years);


        // let c17 = 0, c16 = 0, c15 = 0, c14 = 0, c13 = 0; // counts per year


        // // FOR Texas
        // for (let i = 0; i < all_tx_years.length; i++) {
        //     if (all_tx_years[i] == "2017") {
        //         c17++;// crash count

        //         /* FOR INJURIES */
        //         pm22_TX_data._2017.injuries += parseInt(myJson.PM22.TX_INJURIES[i]);

        //     }
        //     else if (all_tx_years[i] == "2016") {
        //         c16++;// crash count

        //         /* FOR INJURIES */
        //         pm22_TX_data._2016.injuries += parseInt(myJson.PM22.TX_INJURIES[i]);
        //     }
        //     else if (all_tx_years[i] == "2015") {
        //         c15++;// crash count
        //         /* FOR INJURIES */
        //         pm22_TX_data._2015.injuries += parseInt(myJson.PM22.TX_INJURIES[i]);


        //     }
        //     else if (all_tx_years[i] == "2014") {
        //         c14++;// crash count
        //         /* FOR INJURIES */
        //         pm22_TX_data._2014.injuries += parseInt(myJson.PM22.TX_INJURIES[i]);


        //     }
        //     else if (all_tx_years[i] == "2013") {
        //         c13++;// crash count
        //         /* FOR INJURIES */
        //         pm22_TX_data._2013.injuries += parseInt(myJson.PM22.TX_INJURIES[i]);

        //     }
        // }

        // // now for New Mexico
        // for (let i = 0; i < all_nm_years.length; i++) {
        //     if (all_nm_years[i] == "2017") {
        //         c17++;// crash count

        //         /* FOR INJURIES */
        //         pm22_NM_data._2017.injuries += parseInt(myJson.PM22.NM_INJURIES[i]);

        //     }
        //     else if (all_nm_years[i] == "2016") {
        //         c16++;// crash count

        //         /* FOR INJURIES */
        //         pm22_NM_data._2016.injuries += parseInt(myJson.PM22.NM_INJURIES[i]);
        //     }
        //     else if (all_nm_years[i] == "2015") {
        //         c15++;// crash count

        //         /* FOR INJURIES */
        //         pm22_NM_data._2015.injuries += parseInt(myJson.PM22.NM_INJURIES[i]);


        //     }
        //     else if (all_nm_years[i] == "2014") {
        //         c14++;// crash count

        //         /* FOR INJURIES */
        //         pm22_NM_data._2014.injuries += parseInt(myJson.PM22.NM_INJURIES[i]);


        //     }
        //     else if (all_nm_years[i] == "2013") {
        //         c13++;// crash count

        //         /* FOR INJURIES */
        //         pm22_NM_data._2013.injuries += parseInt(myJson.PM22.NM_INJURIES[i]);

        //     }
        // }

        // pm22_crashes.push(c17);//0
        // pm22_crashes.push(c16);//1
        // pm22_crashes.push(c15);//2
        // pm22_crashes.push(c14);//3
        // pm22_crashes.push(c13);//4
        // pm22Text = c17 + c16 + c15 + c14 + c13;

        //draw
        // if (mode == 1 || mode == 2) {
        //  //   pm22txPoints(mode, ex);
        // }

        // if (mode == 0) {
        //   //  document.getElementById("pm22Count").innerHTML = commafy(pm22Text);
        // } else if (mode == 1) {
        //     //regionalText(pm22_TX_data);
        // } else if (mode == 2) {

       // }

//    });
 
// }




	

// 	//stores summation

//     /*
// 	pm22_TX_data = {
// 			    _2013:{injuries:0},
// 			    _2014:{injuries:0},
// 			    _2015:{injuries:0},
// 			    _2016:{injuries:0},
// 			    _2017:{injuries:0}
// 				};
// 	pm22_NM_data = {
// 			    _2013:{injuries:0},
// 			    _2014:{injuries:0},
// 			    _2015:{injuries:0},
// 			    _2016:{injuries:0},
// 			    _2017:{injuries:0}
// 			};
//             */
// 	}


// 		/* STACKED BAR CHART */
// function pm22StackedChart(ctx){
//     var barChartData = {
// 		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
// 			datasets: [{
// 				label: 'Dataset 1',
// 				backgroundColor: 'rgba(255,82,0,0.5)',
// 				data: [
// 					1,3,8,9,10,7,5
// 				]
// 			}, {
// 				label: 'Dataset 2',
// 				backgroundColor: 'rgba(92,187,3,0.5)',
// 				data: [
// 					5,13,6,8,4,2,1
// 				]
// 			}, {
// 				label: 'DataSet 3',
// 				backgroundColor: 'rgba(117,36,221,0.5)',
// 				data: [
// 					20,7,9,1,0,5,13
// 				]
// 			}]

// 	};
//     var chartBar = new Chart(ctx, {
//         type: "bar",
//         data: barChartData,
//         options: {
//             legend: {
//                 display: true,
//                 position: "bottom",
//                 labels: {
//                     fontColor: "#333",
//                     fontSize: 12,
//                     boxWidth:10
//                 }
//                 },
//             title: {
//                 display: true,
//                 text: 'CMP Network'
//             },
//             tooltips: {
//                 mode: 'index',
//                 intersect: false
//             },
//             responsive: true,
//             scales: {
//                 xAxes: [{
//                     stacked: true,
//                 }],
//                 yAxes: [{
//                     stacked: true
//                 }]
//             }
//         }
//     });
	
// }

    


    

	
