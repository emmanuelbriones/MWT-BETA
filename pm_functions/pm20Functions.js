function pm20Data(mode, corr) {
    pm20_buffers(mode,corr);
    

}


function pm20_buffers(mode, corr) {
  //  console.log(1);
    let pm20data = {
        countSumB: 0,
        countSumP:0,

        b_greatest: 0,
        b_greatestCounter: 1,
        b_address: 'beto',
        b_on_st: '',
        b_at_strt: 0,
     //   b_count: 1,

        w_greatest: 0,
        w_greatestCounter: 1,
        w_address: '',
        w_on_st: '',
        w_at_strt: 0,
       // w_count: 1,

        percentPed: 0,
        percentBike:0
    };

    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";
    let key = '';

    if (mode == 0 || mode == 1) {
        key = 'all_pm20B';
        data_for_php = { key: key };
    } 
    else if (mode == 2) {
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";

        data_for_php = {
            key: 20.1, // 20.1 = buffer on corridor Handler 
            corridors_selected: corr,
            tableName: "pm20_buffer"
        };
    }
    else if(mode == 4){
        data_for_php = corr;
        data_for_php.PM_SOURCE = "pm20_buffer";
        php_handler = "./backend/AOI.php"
    }


    $.get(php_handler, data_for_php, function (data) {
      //  console.log(2);
        let color = "#1A237E"; // Blue
        let currentCount = 0;

        for (index in data.shape_arr) {
            let temp = wktFormatter(data.shape_arr[index][shape]);
            let to_visualize = [];
            let address = data.shape_arr[index]['address'];
            let on_st = data.shape_arr[index]['on_st'];
            let at_strt = data.shape_arr[index]['at_strt'];
            let count_bike = parseInt(data.shape_arr[index]['count_bike']);
            let count_ped = parseInt(data.shape_arr[index]['count_ped']);

            //calculations 
            if (count_bike > 0) {
                pm20data.countSumB += count_bike;
            
                if (count_bike == pm20data.b_greatest) {
                    pm20data.b_greatestCounter++;
                }
                if (count_bike > pm20data.b_greatest) {
                    pm20data.b_greatest = count_bike;
                    pm20data.b_greatestCounter = 1;
                    pm20data.b_address = address;
                    pm20data.b_on_st = on_st;
                    pm20data.b_at_strt = at_strt;
                    pm20data.b_count = count_bike;
                }
            }
            if (count_ped > 0) {
                pm20data.countSumP += count_ped;
           
                if (count_ped == pm20data.w_greatest) {
                    pm20data.w_greatestCounter++;
                }
                if (count_ped > pm20data.w_greatest) {
                    pm20data.w_greatest = count_ped;
                    pm20data.w_greatestCounter = 1;
                    pm20data.w_address = address;
                    pm20data.w_on_st = on_st;
                    pm20data.w_at_strt = at_strt;
                    pm20data.w_count = count_ped;
                }
            }
            //filter color
            if (currentType == "biking") {
                currentCount = count_bike;
            } else if (currentType == "walking") {
                currentCount = count_ped;
            }

            if (mode == 1 || mode == 2 || mode == 4) {
                if (currentType == "walking") {
                    if (currentCount == 1) {
                        color = "#4CAF50"; //lime
                    } else if (currentCount > 1 && currentCount < 4) {
                        color = "#8BC34A"; //green
                    } else if (currentCount > 3 && currentCount < 7) {
                        color = "#CDDC39"; //orange
                    } else if (currentCount > 6 && currentCount < 11) {
                        color = "#f44336" //red
                    } else {
                        color = "#9E9E9E"; //gray
                    }
                } else if (currentType == "biking") {
                    console.log(currentCount);
                    if (currentCount == 0) {
                        color = "#9E9E9E"; //gray
                    } else if (currentCount == 1) {
                        color = "#8BC34A"; //lime
                    } else if (currentCount == 2) {
                        color = "#f44336";  //red
                    }
                }
            

                for (let i = 0; i < temp.length; i++) {
                    to_visualize.push(temp[i]);
                    polyToErase.exist.push();
                }

                let polygon = new google.maps.Polygon({
                    description: "",
                    description_value: '',
                    paths: to_visualize,
                    strokeColor: 'black',
                    strokeOpacity: 0.40,
                    strokeWeight: 0.70,
                    fillColor: color,
                    fillOpacity: 0.40,
                    zIndex: -1,
                    title: "",

                });

                if (currentType == "biking") {
                    polyToErase.exist.push(polygon);
                    polygon.setMap(map);
                    polygons.push(polygon);
                } else if (currentType == "walking") {
                    polyToErase.exist.push(polygon);
                    polygon.setMap(map);
                    polygons.push(polygon);
                }
            }
           
         
        }
        loadpm20P(mode, corr, pm20data);
    });
}
function loadpm20P(mode, corr, pm20data) {
 //   console.log(3);
    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";
    let image = "./img/markers/red.png";
    let key = 'all_pm20P';
    let bikeCrash = 0;
    let pedCrash = 0;
    if (currentType == "biking") {
        image = "./img/markers/cyclist.png";
    } else if (currentType == "walking") {
        image = "./img/markers/ped.png";
    }

    if (mode == 0 || mode == 1) {
        data_for_php = { key: key };
    } else if (mode == 2) {
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";

        data_for_php = {
            key: 20, // 20 = points on corridor Handler 
            corridors_selected: corr,
            tableName: "pm20_crashes"
        };
    }
    else if( mode == 4 ){
        php_handler = "./backend/AOI.php";
        data_for_php = corr;
        data_for_php.PM_SOURCE ='pm20_crashes';
    }


    $.get(php_handler, data_for_php, function (data) {
        for (index in data.shape_arr) {
            let holder = [];
            let type = data.shape_arr[index]['type'];
            
            if (mode == 1 || mode == 2 || mode == 4) { // mode 1 and 2 allows us to store points
                holder.push(wktFormatterPoint(data.shape_arr[index][shape]));
                holder = holder[0][0]; // Fixes BLOBs
                let to_visualize = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };
            

                let point = new google.maps.Marker({
                    position: to_visualize,
                    title: '',
                    value: '',
                    icon: image
                });
                if (currentType == "biking" && type == "Pedcyclists") {
                    point.setMap(map);
                    points.push(point);
                } else if (currentType == "walking" && type == "Pedestrian") {
                    point.setMap(map);
                    points.push(point);
                }

            }

            if (type == "Pedcyclists") {
                bikeCrash++;
            } else if (type == "Pedestrian") {
                pedCrash++;
            }
        }
        // console.log(pedCrash);
        // console.log(bikeCrash);

        //calculations
        pm20data.percentPed = (pm20data.countSumP * 100) / pedCrash;
        pm20data.percentBike = (pm20data.countSumB * 100) / bikeCrash;
        if (mode == 0) {
            document.getElementById("pm20-B").innerHTML = pm20data.percentBike.toFixed(2) + '%';
            document.getElementById("pm20-P").innerHTML = pm20data.percentPed.toFixed(2) + '%';
        } else if (mode == 1) {
            regionalText(pm20data);
        } else if (mode == 2) {
            let corr = translateCorridor(data_for_php.corridors_selected); // what corridor are we on?
            dynamicCorridorText(corr, pm20data);
        }
        else if (mode == 4) {
            dynamicCorridorText("AOI", pm20data);
        }
        loadpm20Bus(mode,corr);
        
    });

}
function loadpm20Bus(mode, corr) {
    //console.log(5);
    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";
    let image = "./img/markers/yellow_small.png";
    let key = "all_pm20_bus";

    if (mode == 0 || mode == 1) {
        data_for_php = { key: key };
    } else if (mode == 2) {
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";

        data_for_php = {
            key: 20.2, // 20.2 = Bus points on corridor Handler 
            corridors_selected: corr,
            tableName: "pm20_stationsbus"
        };
    }
    else if( mode == 4 ){
        data_for_php = corr;
        php_handler = "./backend/AOI.php"
        data_for_php = corr;
        data_for_php.PM_SOURCE ='pm20_stationsbus';
        shape = 'ST_AsText(SHAPE)';

    }

    $.get(php_handler, data_for_php, function (data) {
        console.log(6);
        for (index in data.shape_arr) {
            let holder = [];


            if (mode == 1 || mode == 2 || mode == 4) { // mode 1 and 2 allows us to store points
                holder.push(wktFormatterPoint(data.shape_arr[index][shape]));
                holder = holder[0][0]; // Fixes BLOBs
                let to_visualize = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };

                let point = new google.maps.Marker({
                    position: to_visualize,
                    title: '',
                    value: '',
                    icon: image
                });
                point.setMap(map);
                points.push(point);

            }
        }


    });

}