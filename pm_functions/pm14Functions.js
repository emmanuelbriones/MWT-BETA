// Colors for Graphs/
let pdnC = "#FDD835";
let pdnC2 = "#FFEB3B"
let ysC = "#FF9800";
let ysC2 = '#FFB74D';
let botaC = "#304FFE";
let botaC2 = "#2196F3";

let data_by_mode_pm14 = {
    'driving':{
        pdn:[],
        pdn_ready:[], 
        bota:[], 
        bota_ready:[], 
        ysleta:[], 
        ysleta_ready:[]
    },
    'walking':{
        pdn:[], 
        pdn_ready:[], 
        bota:[], 
        ysleta:[]
    },
    'freight':{
        bota:[],
        bota_fast:[], 
        ysleta:[],
        ysleta_fast:[]
    }
}

function pm14Data(mode){
    let php_handler = 'mwt_handler.php';
    let data_for_php = {'key':'all_pm14'};

    $.get(php_handler,data_for_php).done(function(data) {//succesful
        
        let all_pm14_data = 
        {
            bridge_data: {
                    year:[],
                    pdn:[],
                    pdn_ready:[],
                    bota:[],
                    bota_ready:[],
                    bota_fast:[],
                    ysleta:[],
                    ysleta_ready:[],
                    ysleta_fast:[],
                    santa_teresa:[],
                    tornillo:[],
                    mode:[]
            },
            bridge_points:{
                port_name:[],
                port_point:[]
            },
        };
        let data_retrieved = data.shape_arr;
        let data_length = data_retrieved.length;
        for (let i = 0; i < data_length; i++) {
            let curr_index = data_retrieved[i];
            if(curr_index.port_of_en === undefined){ // if the data does not contain geo-points
                //Save the years & mode
                all_pm14_data.bridge_data.year.push(curr_index.period);
                all_pm14_data.bridge_data.mode.push(curr_index.MODE);

                //Save Paso Del Norte data
                all_pm14_data.bridge_data.pdn.push(curr_index.PDN);
                all_pm14_data.bridge_data.pdn_ready.push(curr_index.PDN_Ready);

                //Save Bridge of the Americas data
                all_pm14_data.bridge_data.bota.push(curr_index.BOTA);
                all_pm14_data.bridge_data.bota_fast.push(curr_index.BOTA_Ready);
                all_pm14_data.bridge_data.bota_ready.push(curr_index.BOTA_Fast);

                //Save Zaragoza/Ysleta bridge data
                all_pm14_data.bridge_data.ysleta.push(curr_index.Ysleta);
                all_pm14_data.bridge_data.ysleta_fast.push(curr_index.Ysleta_Fast);
                all_pm14_data.bridge_data.ysleta_ready.push(curr_index.Ysleta_Ready);

                //Save Tornillo bridge data
                all_pm14_data.bridge_data.tornillo.push(curr_index.Tornillo);

                //Save Santa Teresa bridge data
                all_pm14_data.bridge_data.santa_teresa.push(curr_index.Santa_Teresa);
            }
            else{
                all_pm14_data.bridge_points.port_name.push(curr_index.port_of_en);
                let geoPoint = {
                    lat:parseFloat(curr_index.latitude),
                    lng:parseFloat(curr_index.longitude)
                };
                all_pm14_data.bridge_points.port_point.push(geoPoint);
            }
        }

        load_graph_values_pm14(all_pm14_data);
        if (mode == 0){
            //walking text data
            let sum = arrSum(data_by_mode_pm14.walking.bota) + arrSum(data_by_mode_pm14.walking.pdn) + arrSum(data_by_mode_pm14.walking.pdn_ready) + arrSum(data_by_mode_pm14.walking.ysleta);
             document.getElementById("pm14WText").innerHTML = sum;

        //driving text data
            sum = arrSum(data_by_mode_pm14.driving.bota_ready) +  arrSum(data_by_mode_pm14.driving.bota) +
            arrSum(data_by_mode_pm14.driving.pdn) + arrSum(data_by_mode_pm14.driving.pdn_ready) +
             arrSum(data_by_mode_pm14.driving.ysleta) + arrSum(data_by_mode_pm14.driving.ysleta_ready);
             document.getElementById("pm14DText").innerHTML = sum;

             //freight data text
             sum = arrSum(data_by_mode_pm14.freight.bota) +  arrSum(data_by_mode_pm14.freight.bota_fast) +
             arrSum(data_by_mode_pm14.freight.ysleta) + arrSum(data_by_mode_pm14.freight.ysleta_fast);
              document.getElementById("pm14FText").innerHTML = sum;
        } 
        if (mode == 1) {
            draw_points_pm14(all_pm14_data);
            regionalText(all_pm14_data);
        }
    }).fail(function(error){
        alert("ERROR PM 14");
        console.log(error);
    });
}
function draw_points_pm14(points_data) {
    let image = "./img/markers/grey.png";
    for (let index = 0; index < 4; index++) {
        let title = points_data.bridge_points.port_name[index];
        let to_visualize;
        to_visualize = points_data.bridge_points.port_point[index];

        // filter points by type
        if (currentType == "driving") {
            if (title == "PDN") {
      //          to_visualize = points_data.port_point[index];
                image = "./icons/yellowPin.png";
            } else if (title == "Ysleta") {
      //          to_visualize = points_data.port_point[index];
                image = "./icons/orangePin.png";
            } else if (title == "BOTA") {
   //             to_visualize = points_data.port_point[index];
                image = "./icons/darkbluePin.png";
            }
        } else if (currentType == "freight") {
            if (title == "Ysleta") {
     //           to_visualize = points_data.port_point[index];
                image = "./icons/orangePin.png";
            } else if (title == "BOTA") {
     //           to_visualize = points_data.port_point[index];
                image = "./icons/darkbluePin.png";
            }
        } else if (currentType == "walking") {
            if (title == "PDN") {
          //      to_visualize = points_data.port_point[index];
                image = "./icons/yellowPin.png";
            } else if (title == "Ysleta") {
           //     to_visualize = points_data.port_point[index];
                image = "./icons/orangePin.png";
            } else if (title == "BOTA") {
          //      to_visualize = points_data.port_point[index];
                image = "./icons/darkbluePin.png";
            }
        }

        let point = new google.maps.Marker({
            position: to_visualize,
            title: title,
            icon: image
        });
        point.setMap(map);
        points.push(point);
    }
}
function load_graph_values_pm14(all_data){
    let all_years_found = all_data.bridge_data.year;
    let unique_years = [];
    for (let index = 0; index < all_years_found.length; index++) {
        //calculate unique year set
        const this_year = all_years_found[index];
        if(unique_years.includes(this_year)){
            //skip
        }
        else{
            unique_years.push(this_year);
        }
        let mode_found = all_data.bridge_data.mode[index];
        let bota_found = all_data.bridge_data.bota[index];
        let bota_r_found = all_data.bridge_data.bota_ready[index];
        let bota_f_found = all_data.bridge_data.bota_fast[index];
        let pdn_found = all_data.bridge_data.pdn[index];
        let pdn_r_found = all_data.bridge_data.pdn_ready[index];
        let ysleta_found = all_data.bridge_data.ysleta[index];
        let ysleta_r_found= all_data.bridge_data.ysleta_ready[index];
        let ysleta_f_found= all_data.bridge_data.ysleta_fast[index];
        // let santa_teresa_found= all_data.bridge_data.santa_teresa[index];
        // let tornillo_found= all_data.bridge_data.tornillo[index];

        if(mode_found == 'psgrveh'){
            data_by_mode_pm14.driving.bota.push(parseFloat(bota_found));
            data_by_mode_pm14.driving.bota_ready.push(parseFloat(bota_r_found));
            data_by_mode_pm14.driving.pdn.push(parseFloat(pdn_found));
            data_by_mode_pm14.driving.pdn_ready.push(parseFloat(pdn_r_found));
            data_by_mode_pm14.driving.ysleta.push(parseFloat(ysleta_found));
            data_by_mode_pm14.driving.ysleta_ready.push(parseFloat(ysleta_r_found));
        }
       else if(mode_found == 'freight'){
        data_by_mode_pm14.freight.bota.push(parseFloat(bota_found));
        data_by_mode_pm14.freight.bota_fast.push(parseFloat(bota_f_found));
        data_by_mode_pm14.freight.ysleta.push(parseFloat(ysleta_found));
        data_by_mode_pm14.freight.ysleta_fast.push(parseFloat(ysleta_f_found));
        }
       else if(mode_found == 'pedestrian'){
        data_by_mode_pm14.walking.pdn.push(parseFloat(pdn_found));
        data_by_mode_pm14.walking.pdn_ready.push(parseFloat(pdn_r_found));
        data_by_mode_pm14.walking.bota.push(parseFloat(bota_found));
        data_by_mode_pm14.walking.ysleta.push(parseFloat(ysleta_found));
        }
    }
}
function pm14DrivingChart(ctx){ 
    var data = {
       labels: unique_years,
       datasets: [
           {
                label: "PDN Personal Vehicles",
                data: data_by_mode_pm14.driving.pdn,
                backgroundColor: pdnC,
                borderColor: pdnC,
                fill: false,
                lineTension: 0,
                radius: 5
           },
           {
                label: "PND Ready Personal Vehicles",
                data: data_by_mode_pm14.driving.pdn_ready,
                backgroundColor: pdnC2,
                borderColor: pdnC2,
                fill: false,
                lineTension: 0,
                radius: 5
           },
           {
                label: "BOTA Personal Vehicles",
                data:  data_by_mode_pm14.driving.bota,
                backgroundColor: botaC,
                borderColor: botaC,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "BOTA Ready Personal Vehicles",
                data:  data_by_mode_pm14.driving.bota_ready,
                backgroundColor: botaC2,
                borderColor: botaC2,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Ysleta Personal Vehicles",
                data:  data_by_mode_pm14.driving.ysleta,
                backgroundColor: ysC2,
                borderColor: ysC2,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Ysleta Ready Personal Vehicles",
                data:  data_by_mode_pm14.driving.ysleta_ready,
                backgroundColor: ysC,
                borderColor: ysC,
                fill: false,
                lineTension: 0,
                radius: 5
            }
       ]
   };

   //create Chart class object
   var chart = new Chart(ctx, {
       type: "line",
       data: data,
       options: {
        responsive: true,
        scales:{
            yAxes: [{
                scaleLabel: {
                display: true,
                labelString: 'Mean (Minutes)'
             }
         }]},
        legend: {
            display: true,
            position: "bottom",
            labels: {
                fontColor: "#333",
                fontSize: 12,
                boxWidth:8
            }
       },
        title: {
            display: true,
            text: 'Wait Times Personal Vehicles'
        }
    }
   });
}
function pm14FreightChart(ctx){
 var data = {
       labels: unique_years,
       datasets: [
           {
                label: "BOTA Cargo",
                data: data_by_mode_pm14.freight.bota,
                backgroundColor: botaC,
                borderColor: botaC,
                fill: false,
                lineTension: 0,
                radius: 5
           },
           {
                label: "BOTA Fast Cargo",
                data:  data_by_mode_pm14.freight.bota_fast,
                backgroundColor: botaC2 ,
                borderColor: botaC2,
                fill: false,
                lineTension: 0,
                radius: 5
           },
           {
                label: "Ysleta Cargo",
                data: data_by_mode_pm14.freight.ysleta,
                backgroundColor: ysC,
                borderColor: ysC,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Ysleta Cargo Fast",
                data: data_by_mode_pm14.freight.ysleta_fast,
                backgroundColor: ysC2,
                borderColor: ysC2,
                fill: false,
                lineTension: 0,
                radius: 5
            }
       ]
   };

    //options
   var options = {
    scales: {
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
           boxWidth:10
       }
       }
   };

   //create Chart class object
   var chart = new Chart(ctx, {
       type: "line",
       data: data,
       options: {
        scales:{
            yAxes: [{
                scaleLabel: {
                display: true,
                labelString: 'Mean (Minutes)'
             }
         }]},
        legend: {
            display: true,
            position: "bottom",
            labels: {
                fontColor: "#333",
                fontSize: 12,
                boxWidth:10
            }
        },
        title: {
            display: true,
            text: 'Wait Times Cargo Trucks'
        }
    }
   });
}
function pm14WalkingChart(ctx){
    var data = {
       labels:unique_years,
       datasets: [
           {
                label: "PDN Pedestrians",
                data: data_by_mode_pm14.walking.pdn,
                backgroundColor: pdnC,
                borderColor: pdnC,
                fill: false,
                lineTension: 0,
                radius: 5
           },
           {
                label: "PDN Ready Pedestrians",
                data: data_by_mode_pm14.walking.pdn_ready,
                backgroundColor: pdnC2,
                borderColor: pdnC2,
                fill: false,
                lineTension: 0,
                radius: 5
           },
           {
                label: "BOTA Pedestrians",
                data: data_by_mode_pm14.walking.bota,
                backgroundColor: botaC,
                borderColor: botaC,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Ysleta Pedestrians",
                data:  data_by_mode_pm14.walking.ysleta,
                backgroundColor: ysC,
                borderColor: ysC,
                fill: false,
                lineTension: 0,
                radius: 5
            }
       ]
   };

   //create Chart class object
   var chart = new Chart(ctx, {
       type: "line",
       data: data,
       options: {
        scales:{
            yAxes: [{
                scaleLabel: {
                display: true,
                labelString: 'Mean (Minutes)'
             }
         }]},
        legend: {
            display: true,
            position: "bottom",
            labels: {
                fontColor: "#333",
                fontSize: 12,
                boxWidth:10
            }
        },
        title: {
            display: true,
            text: 'Wait Times Pedestrians'
        }
    }
   });
}
