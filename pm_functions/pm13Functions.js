//  ** There are 4 types of mode
//  ** Mode 0: This is used when the page loads for the 1st time. Calculates Menu Text Only
//  ** Mode 1: Regional Performance Points and data
//  ** Mode 2: Corridor Performance Points and data
// **Mode 3: Corridor Data only, data for benchmark
// ** Mode 4: AOI
//  */
let pdnColor = "#FDD835";
let ysletaColor = "#FF9800";
let botaColor = "#304FFE";
let pm13_years = []; // to store all pm13_years for the 5 year range -- caveat - do not hardcode the pm13_years, or updates will not reflect
let passenger_totals_by_year = []; 
let freight_totals_by_year = [];    
let pedestrian_totals_by_year = []; 
let northbound_totals_by_year = []; 
let data_by_mode_pm13 = {
    'driving':{
        pdn:[],
        ysleta:[],
        bota:[],
        stanton_dcl:[], 
        ysleta_dcl: [] ,
    },
    'walking':{
        pdn:[],
        ysleta:[],
        bota:[],
        stanton_dcl:[], 
        ysleta_dcl: [] ,
    },
    'freight':{
        pdn:[],
        ysleta:[],
        bota:[],
        stanton_dcl:[], 
        ysleta_dcl: [] ,
    },
}

function pm13Data(mode){
    let php_handler = './mwt_handler.php';
    let data_for_php = {'key':'all_pm13'};
    // if mode == x ...
    $.get(php_handler, data_for_php).done(function (data) {//succesful
        if (mode != 0) {
            alert("success");
        }
        //console.table(data);
        let all_pm13_data =
        {
            bridge_data: {
                year: [],
                pdn: [],
                ysleta: [],
                bota: [],
                stanton_dcl: [],
                ysleta_dcl: [],
                total: [],
                mode: [],
                avg: 0,
                highestPort: 0
            },
            bridge_points: {
                port_name: [],
                port_point: []
            },
        };
        let length = data.shape_arr.length;
        for (let index = 0; index < length; index++) {
            // How to distinguish between the two different dictionaries -- check if key is undefined
            const curr_index = data.shape_arr[index];
            if (curr_index.port_of_en === undefined) { //if  there is no port_of_en  in this dictionary, then this is bridge data dictionary
                //save bridge data
                all_pm13_data.bridge_data.year.push(curr_index.Period);                          // store the year
                all_pm13_data.bridge_data.pdn.push(curr_index.PDN);                               // store PDN
                all_pm13_data.bridge_data.ysleta.push(curr_index.Ysleta);                        // store Ysleta
                all_pm13_data.bridge_data.bota.push(curr_index.BOTA);                           // store Bota
                all_pm13_data.bridge_data.stanton_dcl.push(curr_index.Stanton_DCL);    // store Stanton_DCL
                all_pm13_data.bridge_data.ysleta_dcl.push(curr_index.Ysleta_DCL);        // store Ysleta_DCL
                all_pm13_data.bridge_data.total.push(curr_index.Total);                            // store total
                all_pm13_data.bridge_data.mode.push(curr_index.MODE);                        // store mode
            }
            else { // store geo-points
                if (mode ==1) {
                    all_pm13_data.bridge_points.port_name.push(curr_index.port_of_en);      //store name of the bridge
                    let geoPoint = {
                        lat: parseFloat(curr_index.latitude),
                        lng: parseFloat(curr_index.longitude)
                    };
                    all_pm13_data.bridge_points.port_point.push(geoPoint);               // store geo-location
                }
              
            }
        }// end for loop
        load_data_for_graphs(mode, all_pm13_data);
        draw_points_pm13(all_pm13_data.bridge_points);
        // Add calculations for Dynamic Text    
       
        if (mode == 1) {
            regionalText(all_pm13_data);
        }
    }).fail(function(error){
            alert("ERROR PM 13");
            console.log(error);
    });
}


function load_data_for_graphs(mode,all_data){
//------------------- SAVE TOTALS DATA BY pm13_years  & SAVE DATA PER MODE / PER BRIDGE ------------------------
    let data_length = all_data.bridge_data.year.length; // get the length

for(let i  = 0;   i < data_length; i++ ){
    let year_found = all_data.bridge_data.year[i];       // get the current year stored in array
    let mode_found = all_data.bridge_data.mode[i];  // get the current mode stored in array
    let total_found = all_data.bridge_data.total[i];     // get the current total stored in array
    let pdn_data_found = parseFloat(all_data.bridge_data.pdn[i]);     // get the current pdn stored in array
    let ysleta_data_found = parseFloat(all_data.bridge_data.ysleta[i]);     // get the current ysleta stored in array
    let bota_data_found = parseFloat(all_data.bridge_data.bota[i]);     // get the current bota stored in array
    let stanton_dcl_data_found = parseFloat(all_data.bridge_data.stanton_dcl[i]);     // get the current stanton dcl data stored in array
    let ysleta_dcl_data_found = parseFloat(all_data.bridge_data.ysleta_dcl[i]);     // get the current ysleta dcl data  stored in array

    if(mode_found == 'psgrveh'){
        passenger_totals_by_year.push(total_found);
        data_by_mode_pm13.driving.bota.push(bota_data_found);
        data_by_mode_pm13.driving.pdn.push(pdn_data_found);
        data_by_mode_pm13.driving.ysleta.push(ysleta_data_found);
        data_by_mode_pm13.driving.stanton_dcl.push(stanton_dcl_data_found);
        data_by_mode_pm13.driving.ysleta_dcl.push(ysleta_dcl_data_found);
    }
    if(mode_found == 'freight'){
        freight_totals_by_year.push(total_found);
        data_by_mode_pm13.freight.bota.push(bota_data_found);
        data_by_mode_pm13.freight.pdn.push(pdn_data_found);
        data_by_mode_pm13.freight.ysleta.push(ysleta_data_found);
        data_by_mode_pm13.freight.stanton_dcl.push(stanton_dcl_data_found);
        data_by_mode_pm13.freight.ysleta_dcl.push(ysleta_dcl_data_found);
    }
    if(mode_found == 'pedestrian'){
        pedestrian_totals_by_year.push(total_found);
        data_by_mode_pm13.walking.bota.push(bota_data_found);
        data_by_mode_pm13.walking.pdn.push(pdn_data_found);
        data_by_mode_pm13.walking.ysleta.push(ysleta_data_found);
        data_by_mode_pm13.walking.stanton_dcl.push(stanton_dcl_data_found);
        data_by_mode_pm13.walking.ysleta_dcl.push(ysleta_dcl_data_found);
    }
    if(pm13_years.includes(year_found)){
        //do nothing; do not include repeated values
    }
    else{// current year is not in array; save it
        pm13_years.push(year_found);
    }
}
    for (let index = 0; index < pm13_years.length; index++) {
        let sum =  parseInt(passenger_totals_by_year[index]) + parseInt(freight_totals_by_year[index]) +parseInt(pedestrian_totals_by_year[index]);
        northbound_totals_by_year.push(sum);
    }

    passenger_totals_by_year = parseStrArray2IntArray(passenger_totals_by_year);
    freight_totals_by_year = parseStrArray2IntArray(freight_totals_by_year);
    pedestrian_totals_by_year = parseStrArray2IntArray(pedestrian_totals_by_year);

    let pm13_driving_sum = arrSum(passenger_totals_by_year);
    let pm13_freight_sum = arrSum(freight_totals_by_year);
    let pm13_walking_sum = arrSum(pedestrian_totals_by_year);

    if (mode == 0) {
        document.getElementById("pm13DText").innerHTML = commafy(pm13_driving_sum);
        document.getElementById("pm13FText").innerHTML = commafy(pm13_freight_sum);
        document.getElementById("pm13WText").innerHTML = commafy(pm13_walking_sum);
    }

}
/** Sometimes int arrays are actually string arrays containing numbers as strings,  we parse them to INT*/
function parseStrArray2IntArray(string_arr_of_ints){
    let new_arr = [];
    for(let i = 0; i < string_arr_of_ints.length;i++){
        let num = string_arr_of_ints[i];
        num = parseInt(num);
        new_arr.push(num);
    }
    return new_arr;
}
function pm13ModeGraph(ctx){ 
        //line chart data
    
    var data = {
        labels: pm13_years,
        datasets: [
            {
            label: "Passenger Vechicles",
            data: passenger_totals_by_year,
            backgroundColor: "lightgreen",
            borderColor: "lightgreen",
            fill: false,
            lineTension: 0,
            radius: 5
            },
            {
            label: "Pedestrians",
            data: pedestrian_totals_by_year,
            backgroundColor: "purple",
            borderColor: "purple",
            fill: false,
            lineTension: 0,
            radius: 5
            },
            {
            label: "Cargo Trucks",
            data: freight_totals_by_year,
            backgroundColor: "lightblue",
            borderColor: "lightblue",
            fill: false,
            lineTension: 0,
            radius: 5
            },
                {
            label: "Northbound Crossing count",
            data: northbound_totals_by_year,
            backgroundColor: "#009688",
            borderColor: "#009688",
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
                //To add commas on the y Axis of the graph
                ticks: {
                    beginAtZero:true,
                    userCallback: function(value, index, values) {
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);
                        value = value.join(',');
                        return value;
                    }
                },
                scaleLabel: {
                display: true,
                }
            }]},
            // The tooltips sections adds commas to hoover text
            tooltips: {
                mode: 'label',
                label: 'mylabel',
                callbacks: {
                    label: function(tooltipItem, data) {
                        return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }, },
                },
        
    
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
                text: 'Northbound Crossings by Mode'
            }
        }
    });
}
function pm13DrivingChart(ctx) { 
    console.log(data_by_mode_pm13.driving.pdn);
var data = {
    labels: pm13_years,
    datasets: [
        {
        label: "PDN",
        data: data_by_mode_pm13.driving.pdn,
        backgroundColor: pdnColor,
        borderColor: pdnColor,
        fill: false,
        lineTension: 0,
        radius: 5
        },
        {
        label: "Ysleta",
        data:  data_by_mode_pm13.driving.ysleta,
        backgroundColor: ysletaColor,
        borderColor: ysletaColor,
        fill: false,
        lineTension: 0,
        radius: 5
        },
        {
        label: "BOTA",
        data:  data_by_mode_pm13.driving.bota,
        backgroundColor: botaColor,
        borderColor: botaColor,
        fill: false,
        lineTension: 0,
        radius: 5
        },
        {
        label: "Stanton DCL",
        data:  data_by_mode_pm13.driving.stanton_dcl,
        backgroundColor: "#FF5722", 
        borderColor: "#FF5722",
        fill: false,
        lineTension: 0,
        radius: 5
        },
        {
        label: "Ysleta DCL",
        data: data_by_mode_pm13.driving.ysleta_dcl,
        backgroundColor: "#FFB74D",
        borderColor: "#FFB74D",
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
            ticks: {
                beginAtZero:true,
                userCallback: function(value, index, values) {
                    value = value.toString();
                    value = value.split(/(?=(?:...)*$)/);
                    value = value.join(',');
                    return value;
                }
            },
            scaleLabel: {
            display: true,
            }
        }]},
        tooltips: {
        mode: 'label',
        label: 'mylabel',
        callbacks: {
            label: function(tooltipItem, data) {
                return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }, },
        },
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
        text: 'Northbound Crossing of Passenger Vehicles'
    }
}
});
}
function pm13FreightChart(ctx) {
    console.log(data_by_mode_pm13.freight.ysleta);
    console.log(data_by_mode_pm13.freight.bota);

var data = {
    labels: pm13_years,
    datasets: [
        
        {
        label: "Ysleta",
        data: data_by_mode_pm13.freight.ysleta,
        backgroundColor: ysletaColor,
        borderColor: ysletaColor,
        fill: false,
        lineTension: 0,
        radius: 5
        },
        {
        label: "BOTA",
        data: data_by_mode_pm13.freight.bota,
        backgroundColor: botaColor,
        borderColor: botaColor,
        fill: false,
        lineTension: 0,
        radius: 5
        },
        
    ]
};

//create Chart class object
var chart = new Chart(ctx, {
    type: "line",
    data: data,
    options: {
    scales:{
    yAxes: [{
        ticks: {
            beginAtZero:true,
            userCallback: function(value, index, values) {
                value = value.toString();
                value = value.split(/(?=(?:...)*$)/);
                value = value.join(',');
                return value;
            }
        },
        scaleLabel: {
        display: true,
        }
    }]},
    responsive: true,
    title: {
    display: true,
    text: 'Northbound Crossing of Cargo Trucks'
},
tooltips: {
    mode: 'label',
    label: 'mylabel',
    callbacks: {
        label: function(tooltipItem, data) {
            return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }, },
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
}

});

}
function pm13WalkingChart(ctx){
    var data = {
        labels: pm13_years,
        datasets: [
        {
            label: "PDN",
            data:data_by_mode_pm13.walking.pdn,
            backgroundColor: pdnColor,
            borderColor: pdnColor,
            fill: false,
            lineTension: 0,
            radius: 5
            },
            {
            label: "Ysleta",
            data: data_by_mode_pm13.walking.ysleta,
            backgroundColor: ysletaColor,
            borderColor: ysletaColor,
            fill: false,
            lineTension: 0,
            radius: 5
            },
            {
            label: "BOTA",
            data: data_by_mode_pm13.walking.bota,
            backgroundColor: botaColor,
            borderColor: botaColor,
            fill: false,
            lineTension: 0,
            radius: 5
            },
            
        ]
    };

    
    

    //create Chart class object
    var chart = new Chart(ctx, {
        type: "line",
        data: data,
        
                options: {
    scales:{
        yAxes: [{
            ticks: {
                beginAtZero:true,
                userCallback: function(value, index, values) {
                    value = value.toString();
                    value = value.split(/(?=(?:...)*$)/);
                    value = value.join(',');
                    return value;
                }
            },
            scaleLabel: {
            display: true,
            }
        }]},
        tooltips: {
        mode: 'label',
        label: 'mylabel',
        callbacks: {
            label: function(tooltipItem, data) {
                return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }, },
        },
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
        text: 'Northbound Crossing of Pedestrians'
    }
    }
    
    });

}
function draw_points_pm13(points_data){
    let  image = "./img/markers/grey.png";
    for (let index = 0; index < points_data.port_name.length; index++) {
        let title = points_data.port_name[index];
        let to_visualize = 0;

        // filter points by type
        if (currentType == "driving") {
            if (title == "PDN") {
                to_visualize = points_data.port_point[index];
                image = "./icons/yellowPin.png";
            } else if (title == "Ysleta") {
                to_visualize = points_data.port_point[index];
                image = "./icons/orangePin.png";
            } else if (title == "BOTA") {
                to_visualize = points_data.port_point[index];
                image = "./icons/darkbluePin.png";
            } 
        } else if (currentType == "freight") {
            if (title == "Ysleta") {
                to_visualize = points_data.port_point[index];
                image = "./icons/orangePin.png";
            } else if (title == "BOTA") {
                to_visualize = points_data.port_point[index];
                image = "./icons/darkbluePin.png";
            }
        } else if (currentType == "walking") {
            if (title == "PDN") {
                to_visualize = points_data.port_point[index];
                image = "./icons/yellowPin.png";
            } else if (title == "Ysleta") {
                to_visualize = points_data.port_point[index];
                image = "./icons/orangePin.png";
            } else if (title == "BOTA") {
                to_visualize = points_data.port_point[index];
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
