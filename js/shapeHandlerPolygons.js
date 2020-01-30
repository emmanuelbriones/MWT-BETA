
function shape_handlerPoly(found, key) {
    let data = [];
    console.log("Polygons are Stable");
    let example = { key: key };
    /* PM9 and PM5 go together, they share the same polygons*//*
    if(found == 'PM9' || found == 'PM5'){
      $.get('mwt_handler.php', example, function(data) {
          for (index in data.shape_arr) {
              let temp = wktFormatter(data.shape_arr[index]['shape']);
              let to_visualize = [];
              let pm5_9status = data.shape_arr[index].status;
              let title ="";

              //filter values on polygons
              if(found == 'PM9'){
                  let ratioPop = parseFloat(data.shape_arr[index].ratio_pop);
                  title = ratioPop;
              }else{ // PM5 
                  let prctprim = parseFloat(data.shape_arr[index].prcnt_prim);
                  title = prctprim;
              }
                 let color = "#039BE5";
              // if the status of a shape exists, push to visualize
              for (let i = 0; i < temp.length; i++) {
                  if(pm5_9status == "exist"){
                      color = "#039BE5";
                  }else{ //planed
                      color = "#BDBDBD";
                  }
                  to_visualize.push(temp[i]);
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
                 title: title.toFixed(1) + "%",
             });
             
             // Hover Effect for Google API Polygons
             google.maps.event.addListener(polygon, 'mouseover', function(event){ injectTooltip(event, polygon.title); });
             google.maps.event.addListener(polygon, 'mousemove', function(event){ moveTooltip(event); });
             google.maps.event.addListener(polygon, 'mouseout', function(event){ deleteTooltip(event); });

             polygon.setMap(map);
             polygons.push(polygon);
         }
      });

  }*/
    if (found == 'PM8') {
        console.log(" 8");
        $.get('mwt_handler.php', example, function (data) {
            console.log("inside 8");
            for (index in data.shape_arr) {
                let temp = wktFormatter(data.shape_arr[index]['shape']);
                let to_visualize = [];
                let title = "";

                for (let i = 0; i < temp.length; i++) {
                    to_visualize.push(temp[i]);
                }

                let color = "#039BE5";

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

                // Hover Effect for Google API Polygons
                google.maps.event.addListener(polygon, 'mouseover', function (event) { injectTooltip(event, polygon.title); });
                google.maps.event.addListener(polygon, 'mousemove', function (event) { moveTooltip(event); });
                google.maps.event.addListener(polygon, 'mouseout', function (event) { deleteTooltip(event); });

                polygon.setMap(map);
                polygons.push(polygon);
            }
        });





    }
    else if (found == 'PM6' || found == 'PM10') {
        $.get('mwt_handler.php', example, function (data) {
            for (index in data.shape_arr) {
                let temp = wktFormatter(data.shape_arr[index]['shape']);
                let to_visualize = [];
                let title = "";

                //filter values on polygons
                if (found == 'PM10') {
                    let ratioPop = parseFloat(data.shape_arr[index].ratio_pop);
                    title = ratioPop;
                } else {
                    let prctprim = parseFloat(data.shape_arr[index].prcnt_prim);
                    title = prctprim;
                }

                for (let i = 0; i < temp.length; i++) {
                    to_visualize.push(temp[i]);
                }

                let color = "#039BE5";

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
                    title: title.toFixed(1) + "%",
                });

                // Hover Effect for Google API Polygons
                google.maps.event.addListener(polygon, 'mouseover', function (event) { injectTooltip(event, polygon.title); });
                google.maps.event.addListener(polygon, 'mousemove', function (event) { moveTooltip(event); });
                google.maps.event.addListener(polygon, 'mouseout', function (event) { deleteTooltip(event); });

                polygon.setMap(map);
                polygons.push(polygon);
            }
        });

    }
    else if (found == 'PM7') {
        console.log("Poly 7");
        $.get('mwt_handler.php', example, function (data) {
            for (index in data.shape_arr) {
                let temp = wktFormatter(data.shape_arr[index]['shape']);
                let to_visualize = [];
                // let pm5_9status = data.shape_arr[index].status;
                let title = "";

                // if the status of a shape exists, push to visualize
                for (let i = 0; i < temp.length; i++) {
                    to_visualize.push(temp[i]);
                }

                let color = "#039BE5";
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
                    title: "",//title.toFixed(1) + "%",
                });

                // Hover Effect for Google API Polygons
                google.maps.event.addListener(polygon, 'mouseover', function (event) { injectTooltip(event, polygon.title); });
                google.maps.event.addListener(polygon, 'mousemove', function (event) { moveTooltip(event); });
                google.maps.event.addListener(polygon, 'mouseout', function (event) { deleteTooltip(event); });

                polygon.setMap(map);
                polygons.push(polygon);
            }

        });
    } else if (found == "PM21") {
        $.get('mwt_handler.php', example, function (data) {
            for (index in data.shape_arr) {
                let temp = wktFormatter(data.shape_arr[index]['shape']);
                let to_visualize = [];
                let pm21Pattern = data.shape_arr[index].pattern;

                for (let i = 0; i < temp.length; i++) {
                    to_visualize.push(temp[i]);
                }
                let color = "#E040FB";
                if (pm21Pattern == "Consecutive Hot Spot") {
                    color = "#f44336";
                } else if (pm21Pattern == "Sporadic Hot Spot") {
                    color = "#FFC107";
                } else if (pm21Pattern == "Sporadic Cold Spot") {
                    color = "#2196F3";
                } else if (pm21Pattern == "Persistent Cold Spot") {
                    color = "#9C27B0";
                } else if (pm21Pattern == "Oscillating Hot Spot") {
                    color = "#FF5722";
                } else if (pm21Pattern == "Intensifying Hot Spot") {
                    color = "#b71c1c";
                } else if (pm21Pattern == "New Hot Spot") {
                    color = "#FFA726";
                } else if (pm21Pattern == "Diminishing Cold Spot") {
                    color = "#B2DFDB";
                } else if (pm21Pattern == "Not Emerging") {
                    color = "#9E9E9E";
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
                    title: pm21Pattern,//pattern,//title.toFixed(1) + "%",
                });

                // Hover Effect for Google API Polygons
                google.maps.event.addListener(polygon, 'mouseover', function (event) { injectTooltip(event, polygon.title); });
                google.maps.event.addListener(polygon, 'mousemove', function (event) { moveTooltip(event); });
                google.maps.event.addListener(polygon, 'mouseout', function (event) { deleteTooltip(event); });

                polygon.setMap(map);
                polygons.push(polygon);
            }
        });
    }
    else if (found == 'pm2-transit' || found == 'pm2-walking' || found == 'pm2-biking') {
        clean();


        $.get('mwt_handler.php', example, function (data) { // ajax call to populate pavement lines
            let res = found.split("-");
            let pm = res[0];    // pm type 1 or 2
            let type = res[1];  // mode of transportation type

            // list of transportations
            let transportation_modes = [
                "PM1_pct_NonSOV_e",      // 0
                "PM2_pct_PublicTrans_e", // 1
                "PM2_pct_Walking_e",     // 2
                "PM2_pct_Biking_e",      // 3
            ];

            let tx_mean = [ // loaded mean values for tx
                2.166882,   // transit
                2.623363,   // walking
                0.262361    // biking
            ];

            let nm_mean = [ // loaded mean values for nm
                0.645192,   // transit
                1.516317,   // walking
                0.005669    // biking
            ];

            for (index in data.shape_arr) {
                let temp = wktFormatter(data.shape_arr[index]['shape']);
                let to_visualize = [];

                for (let i = 0; i < temp.length; i++) {
                    to_visualize.push(temp[i]);
                }

                let mode_values = [];
                let value = 0.000000;
                let mean = 0.000000;

                if (index <= 514) { // UPPER SECTION = Texas
                    if (type == "nonsov") {
                        mode_values = myJson[transportation_modes[0]]; // ! No myJson declared
                        //...
                    } else if (type == "transit") {
                        mode_values = myJson[transportation_modes[1]];
                        mean = tx_mean[0];
                    } else if (type == "walking") {
                        mode_values = myJson[transportation_modes[2]];
                        mean = tx_mean[1];
                    } else if (type == "biking") {
                        mode_values = myJson[transportation_modes[3]];
                        mean = tx_mean[2];
                    }
                } else { // LOWER SECTION = New Mexico
                    if (type == "nonsov") {
                        mode_values = myJson[transportation_modes[0]];
                        //...
                    } else if (type == "transit") {
                        mode_values = myJson[transportation_modes[1]];
                        mean = nm_mean[0];
                    } else if (type == "walking") {
                        mode_values = myJson[transportation_modes[2]];
                        mean = nm_mean[1];
                    } else if (type == "biking") {
                        mode_values = myJson[transportation_modes[3]];
                        mean = nm_mean[2];
                    }
                }
                value = mode_values[index];

                let color = "";
                if (pm == "pm1") {
                    //...
                } else {
                    if (value == 0.000000) { // grey = no data
                        color = "#C0C0C0";
                        no_data_num++;
                    } else if (value < mean) { // light blue = low/less than mean
                        color = "#00CCFF";
                        low_num++;
                    } else if (value > mean) { // dark blue = high/greater than mean
                        color = "#0066CC";
                        high_num++;
                    }
                }

                let polygon = new google.maps.Polygon({
                    description: "Percentage of Workers Commuting by Biking",
                    description_value: 'something from data.shape_arr[index][value]',
                    paths: to_visualize,
                    strokeColor: 'black',
                    strokeOpacity: 0.60,
                    strokeWeight: 0.70,
                    fillColor: color,
                    fillOpacity: 0.60,
                    zIndex: -1,
                    title: value.toFixed(1) + "%",
                });

                // Hover Effect for Google API Polygons
                google.maps.event.addListener(polygon, 'mouseover', function (event) { injectTooltip(event, polygon.title); });
                google.maps.event.addListener(polygon, 'mousemove', function (event) { moveTooltip(event); });
                google.maps.event.addListener(polygon, 'mouseout', function (event) { deleteTooltip(event); });

                polygon.setMap(map);
                polygons.push(polygon);
            }
            count_list[0] = no_data_num;
            count_list[1] = low_num;
            count_list[2] = high_num;

            if (found == 'pm2-transit') {
                buttonSwitch('transitWC');
            }
            if (found == 'pm2-walking') {
                buttonSwitch('walkingWC');
            }
            if (found == 'pm2-biking') {
                buttonSwitch('BikingWC');
            }

        });
    }

         
       
     
        //call text here
    }