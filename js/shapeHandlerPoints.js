
function shape_handlerP(found, key) {
    console.log("key on point handler");
    console.log(key);

  
       
       
            let example = {key: key};
            if(found == "pm13_14"){
                let images = [];
                let imageCounter = 0;
                let stationName = [];
                console.log("inside 13 or 14");
               $.get('mwt_handler.php', example, function(data) { 
                    for(index in data.shape_arr){ 
                        let holder = [];
               
                        stationName.push(data.shape_arr[index]['port_of_en']);
                        if(imageCounter == 0){
                            images.push("./icons/yellowPin.png");
                        }else if(imageCounter == 1){
                            images.push("./icons/orangePin.png");
                        }else if(imageCounter == 2){
                            images.push("./icons/darkbluePin.png");
                        }else if(imageCounter == 3){
                            images.push("./icons/greenPin.png");
                        }else{
                            images.push("./icons/grayPin.png");
                        }
                        holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
                        holder = holder[0][0]; // Fixes BLOB
                    
                        let to_visualize = {lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng)};

                       
                        let point  = new google.maps.Marker({
                            position: to_visualize,
                            title: stationName[index],
                            value: '0',
                            icon: images[index]
                        });
                        console.log(point);
                        point.setMap(map);
                        points.push(point);
                        imageCounter++;
                    }
                }); 
            }
            else if(found == "PM7"){
                $.get('mwt_handler.php', example, function(data) { 
                    for(index in data.shape_arr){ 
                        let holder = [];

                        holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
                        holder = holder[0][0]; // Fixes BLOB
                    
                        let to_visualize = {lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng)};

                        let image = "./img/markers/yellow.png";
                        let point  = new google.maps.Marker({
                            position: to_visualize,
                            title: 'point',
                            value: '0',
                            icon: image
                        });
                 
                        point.setMap(map);
                        points.push(point);
                    }
            }); 
              
            }
            else if(found == "PM7PK"){
                console.log("pk point 7 debugg")
                $.get('mwt_handler.php', example, function(data) { 
                     console.log("plotting pk")
                    for(index in data.shape_arr){ 
                        let holder = [];

                        holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
                        holder = holder[0][0]; // Fixes BLOB
                    
                        let to_visualize = {lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng)};

                        let image = "./img/markers/red.png";
                        let point  = new google.maps.Marker({
                            position: to_visualize,
                            title: 'point',
                            value: '0',
                            icon: image
                        });
                 
                        point.setMap(map);
                        points.push(point);
                    }
                }); 
                   //PM7PK 
              
            }
            //pm20 Pedestrian Crashes
            else if(found == "PM20P"){
                   $.get('mwt_handler.php', example, function(data) { 

                    for(index in data.shape_arr){ 
                     //   console.log("Plotting");
                        let holder = [];
                 

                        holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
                        holder = holder[0][0]; // Fixes BLOB
                    
                        let to_visualize = {lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng)};
                       // console.log(to_visualize);
                        
                        let image = "./img/markers/crash.png";

                        let point  = new google.maps.Marker({
                            position: to_visualize,
                            title: '',
                            value: '0',
                            icon: image
                        });
                        point.setMap(map);
                        points.push(point);
                    }
                });
    
            }
            else if(found == "PM20P"){
                $.get('mwt_handler.php', example, function(data) { 

                 for(index in data.shape_arr){ 
                  //   console.log("Plotting");
                     let holder = [];
              

                     holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
                     holder = holder[0][0]; // Fixes BLOB
                 
                     let to_visualize = {lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng)};
                    // console.log(to_visualize);
                     
                     let image = "./img/markers/crash.png";

                     let point  = new google.maps.Marker({
                         position: to_visualize,
                         title: '',
                         value: '0',
                         icon: image
                     });
                     point.setMap(map);
                     points.push(point);
                 }
             });
 
         }
           /* else if( found == "pm20B" ||  found == "pm20P"){
                
                //data for bus stops
                let images = [];
                let tlat = []; 
                let tlon = [];
                let count = [];
                //data for crashes
                let clat = [];
                let clon = [];
                let ctype = [];

                //Pedestrians
                if(found == "pm20P"){
                    tlat = pm20_P.lat; 
                    tlon = pm20_P.lon;
                    count = pm20_P.count;
                    clat = pm20_P.clat;
                    clon = pm20_P.clon;
                    ctype = pm20_P.ctype;

                } // bikes
                else if(found == "pm20B"){
                    tlat = pm20_B.lat; 
                    tlon = pm20_B.lon;
                    count = pm20_B.count;
                    clat = pm20_B.clat;
                    clon = pm20_B.clon;
                    ctype = pm20_B.ctype;
                }
                
                // for bus stations
                for(i in tlat){ 
                    if(count[i] == 1){
                        images.push("./img/markers/green.png");
                    }else if(count[i] >1 && count[i] <4){
                        images.push("./img/markers/yellow.png");
                    }else if(count[i] >3 && count[i] <7){
                        images.push("./img/markers/pink.png");
                    }else if(count[i] >6 && count[i] <13){
                        images.push("./img/markers/red.png");
                    }else if(count[i] >12){
                        images.push("./img/markers/grey.png");
                    }
                    let to_visualize = {lat: parseFloat(tlat[i]), lng: parseFloat(tlon[i])};
                    let point  = new google.maps.Marker({
                            position: to_visualize,
                            title:  String(count[i]),
                            icon: images[i]
                    });
                    point.setMap(map);
                    points.push(point);
                }
                //for crash points
                image = "./img/markers/crash.png";
                for(i in clat){ 
                    let to_visualize = {lat: parseFloat(clat[i]), lng: parseFloat(clon[i])};
                    let point  = new google.maps.Marker({
                            position: to_visualize,
                            title:  "Crash Here",
                            icon: image
                    });
                    
                    //point.addListener('click', pointInfo);
                    point.setMap(map);
                    points.push(point);
                
                }*/
            //Pm20 end 
            
            else if(found == "PM20B"){
                for(index in pm20_points.bikeCrash){
                    pm20_points.bikeCrash[index].setMap(map);
                    points.push(pm20_points.bikeCrash[index]);
                }
                console.log("geting buses");
                 for(index in  pm20_points.busses){
                   pm20_points.busses[index].setMap(map);
                   points.push(pm20_points.busses[index]);
                }
            }
            else if (found == "pm18Driving"){
                currentType = "driving";
                console.log("switching to D");
                pm18T("regional","a"); 
            }
            else if (found == "pm18Freight"){
                currentType = "freight";
                console.log("switching to F");
                pm18T("regional", "a"); 
            }
            else if (found == "pm18Walking"){
                currentType = "walking";
                console.log("switching to W");
                pm18T("regional", "a"); 
            }
            else if (found == "pm18Biking"){
                currentType = "biking";
                console.log("switching to B");
                pm18T("regional", "a"); 
            }
            else if (found == "pm19Driving") {
                alert("snp shapeHandler 19D");
                currentType = "driving";
                currentPM = 19;
                pm19Data(1, "");
            }
            else if (found == "pm19Freight") {
                currentType = "freight";
                console.log("switching to F");
                pm19Data(1, "a");
            }
            else if (found == "pm19Walking") {
                currentType = "walking";
                console.log("switching to W");
                pm19Data(1, "a");
            }
            else if (found == "pm19Biking") {
                currentType = "biking";
                console.log("switching to B");
                pm19Data(1, "a");
            }
            //PMS 15 - PM17 we create the points at pm15Functions.js 
            else if(found == "pm15Driving"){
                //All points
                for(index in pms_15_16_17Info.points){
                    pms_15_16_17Info.points[index].setMap(map);
                    points.push(pms_15_16_17Info.points[index]);
                }
            }
            else if(found == "pm16Driving"){
                for(index in pms_15_16_17Info.points){
                    //filter points
                    if(pms_15_16_17Info.points[index].title == "El Paso UTEP" || pms_15_16_17Info.points[index].title == "El Paso Chamizal"){
                        pms_15_16_17Info.points[index].setMap(map);
                        points.push(pms_15_16_17Info.points[index]);
                    }
                }
            }
            else if(found == "pm17Driving"){
                for(index in pms_15_16_17Info.points){
                    //filter points
                    if(pms_15_16_17Info.points[index].title == "El Paso UTEP" || pms_15_16_17Info.points[index].title == "Socorro Hueco" || pms_15_16_17Info.points[index].title == "Desert View"
                    || pms_15_16_17Info.points[index].title == "Chaparral" || pms_15_16_17Info.points[index].title == "Sunland Park" ){
                        pms_15_16_17Info.points[index].setMap(map);
                        points.push(pms_15_16_17Info.points[index]);
                    }
                }
            }
            else if(found == "PM21P"){
            $.get('mwt_handler.php', example, function(data) { 

                    for(index in data.shape_arr){ 
                     
                        let holder = [];

                        holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
                        holder = holder[0][0]; // Fixes BLOB
                    
                        let to_visualize = {lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng)};
                        let point_title = "No data: ";

                        let image = "./img/markers/yellow.png";
                        
                        let point  = new google.maps.Marker({
                            position: to_visualize,
                            title:" point_title + bridge_value + ''",
                            value: 'bridge condition',
                            icon: image
                        });
                 
                        point.setMap(map);
                        points.push(point);
                    }
                 }); 
            }  
            else if (found == 'pmbridge') {
                let lowest_values = myJson["PM26_Lowest_Value_2018"];
                console.log("1 update");
                console.log(example);
                $.get('mwt_handler.php', example, function (data) {
                    console.log("2");
                    for (index in data.shape_arr) {
                        console.log("3");
                        let bridge_value = lowest_values[index];
                        // let ogr  = data.shape_arr[index]['OGR_FID'];
                        let holder = [];

                        holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
                        holder = holder[0][0]; // Fixes BLOB

                        let to_visualize = { lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng) };
                        let point_title = "No data: ";

                        let image = "./img/markers/yellow.png";

                        if (bridge_value >= 7 && bridge_value <= 9) { image = "./img/markers/green.png"; point_title = "Good Condition: " }
                        else if (bridge_value >= 5 && bridge_value <= 6) { image = "./img/markers/yellow.png"; point_title = "Fair Condition: " }
                        else if (bridge_value >= 0 && bridge_value <= 4) { image = "./img/markers/red.png"; point_title = "Poor Condition: " }
                        else if (bridge_value == 999 || bridge_value == null) { image = "./img/markers/grey.png"; }


                        let point = new google.maps.Marker({
                            position: to_visualize,
                            title: point_title + bridge_value + '',
                            value: 'bridge condition',
                            icon: image
                        });

                        point.setMap(map);
                        points.push(point);
                    }
                }); 
        
                
        }
 
          else if(found == "pm22crashes"){
            

      
                  console.log("ops");
                cmp_lines();  
                let image = "./icons/crash_red.png";
                let cluster_markers = [];
                 $.get('mwt_handler.php', example, function(data){
                     for(index in data.shape_arr){ 
                         let holder = [];
                         holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
                         holder = holder[0][0]; // Fixes BLOB
                     
                         cluster_points = {lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng)};
                         cluster_markers.push(cluster_points);   
                     }

                     var markers = cluster_markers.map(function(location, i) {
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
                 }); 

              
          
            
        }
        else if(found == "pm22nm"){
            if(getPointsCorridors("point","AOM") == true){ //If a Switch is on
                cmp_lines(); 
              
            }else{
                cmp_lines();  
                let image = "./icons/crash_red.png";
                let cluster_markers = [];
                    $.get('mwt_handler.php', example, function(data){
                        for(index in data.shape_arr){ 
                            let holder = [];
                            holder.push(wktFormatterPoint(data.shape_arr[index]['shape']));
                            holder = holder[0][0]; // Fixes BLOB
                        
                            cluster_points = {lat: parseFloat(holder[0].lat), lng: parseFloat(holder[0].lng)};
                            cluster_markers.push(cluster_points);   
                        }

                        var markers = cluster_markers.map(function(location, i) {
                            return new google.maps.Marker({
                                position: location,
                                icon: image,
                                title: "A crash ocurred at this location"
                            });
                        });

                        clusters.push(markers);
                        markerCluster = new MarkerClusterer(map, markers,{
                            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
                    });
            } 
        }
            
    
}