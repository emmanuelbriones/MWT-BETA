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
let santaTeresaColor = "#304FFE";
let tornilloColor = "#304FFE";

let pm13_years = []; // to store all pm13_years for the 5 year range -- caveat - do not hardcode the pm13_years, or updates will not reflect
let passenger_totals_by_year = [];
let freight_totals_by_year = [];
let pedestrian_totals_by_year = [];
let northbound_totals_by_year = [];


function pm13Data(mode) {
    let data_by_mode_pm13 = {
        'driving': {
            pdn: [],
            ysleta: [],
            bota: [],
            stanton_dcl: [],
            ysleta_dcl: [],
            santa_teresa:[],
            tornillo:[],
            period: [],
            total: []
        },
        'walking': {
            pdn: [],
            ysleta: [],
            bota: [],
            stanton_dcl: [],
            ysleta_dcl: [],
            santa_teresa:[],
            tornillo:[],
            period: [],
            total: []
        },
        'freight': {
            pdn: [],
            ysleta: [],
            bota: [],
            stanton_dcl: [],
            ysleta_dcl: [],
            santa_teresa:[],
            tornillo:[],
            period: [],
            total: []
        },
        'text': {
            greatest: 0,
            greatestStation: "",
            averageD: 0,
            averageW: 0,
            averageF: 0
        }
    }
    if(mode >0){      /**draw points in map */
        let source_file = "mwt_handler.php";
        let data_key = { "key": "all_pm13_14" }
        $.get(source_file, data_key, function (data) {
            let image = "./img/markers/grey.png";
       
            for (let index = 0; index < data.shape_arr.length; index++) {
                let holder_points = [];
    
                let title = data.shape_arr[index].title;
                let to_visualize_points = 0;
            // filter points by type
            
             
                    if (title == "PDN") {
                        image = "./icons/yellowPin.png";
                    } else if (title == "Ysleta") {
                        image = "./icons/orangePin.png";
                    } else if (title == "BOTA") {
                    image = "./icons/darkbluePin.png";
                    } else if (title == "Santa Teresa") {
                        image = "./icons/pinkPin.png";
                    }else if (title == "Tornillo") {
                        image = "./icons/greenPin.png";
                    }
          
                // if the station is not ignored then print it
              
                    holder_points.push(wktFormatterPoint(data.shape_arr[index]["shape"]));
                    holder_points = holder_points[0][0]; // Fixes BLOBs
                    to_visualize_points = { lat: parseFloat(holder_points[0].lat), lng: parseFloat(holder_points[0].lng) };
                    let point = new google.maps.Marker({
                        position:  to_visualize_points,
                        title: title,
                        icon: image
                    });
                    point.setMap(map);
                    points.push(point);
                
            }
        });
    }

    let php_handler = './mwt_handler.php';
    let data_for_php = { 'key': 'all_pm13' };
    // if mode == x ...
    $.get(php_handler, data_for_php).done(function (data) {//succesful
        let greatest = 0;
        let greatestStation = "";

        for (index in data.shape_arr) {
            let mode = data.shape_arr[index]['Mode'];
            let pdn = parseFloat(data.shape_arr[index]['PDN'].replace(/,/g, ''));
            let ysleta = parseFloat(data.shape_arr[index]['Ysleta'].replace(/,/g, ''));
            let bota = parseFloat(data.shape_arr[index]['BOTA'].replace(/,/g, ''));
            let stantondcl = parseFloat(data.shape_arr[index]['Stanton_DCL'].replace(/,/g, ''));
            let ysletadcl = parseFloat(data.shape_arr[index]['Ysleta_DCL'].replace(/,/g, ''));
            let santaTeresa = parseFloat(data.shape_arr[index]['Santa_Teresa'].replace(/,/g, ''));
            let tornillo = parseFloat(data.shape_arr[index]['Tornillo'].replace(/,/g, ''));

            let period = parseFloat(data.shape_arr[index]['period'].replace(/,/g, ''));
            let total = parseFloat(data.shape_arr[index]['Total'].replace(/,/g, ''));

            //********** calculations

            // Port of entry with highest personal vehicle traffic
            // If statement makes sure to keep track of greatest station on current type ONLY
            if ((currentType == "driving" && mode == "psgrveh") || (currentType == "walking" && mode == "pedestrian") || (currentType == "freight" && mode == "freight") ) {
                if (greatest < pdn) {
                    greatest = pdn;
                    greatestStation = "PDN";
                }
                if (greatest < ysleta) {
                    greatest = ysleta;
                    greatestStation = "Ysleta";
                }
                if (greatest < bota) {
                    greatest = bota;
                    greatestStation = "BOTA";
                }
                if (greatest < stantondcl) {
                    greatest = stantondcl;
                    greatestStation = "Stanton DCL";
                }
                if (greatest < ysletadcl) {
                    greatest = ysletadcl;
                    greatestStation = "Ysleta DCL";
                }
            }
      

            // filter into data_by_mode_pm13 dictionary

            if (mode == "psgrveh") {
                data_by_mode_pm13.driving.pdn.push(pdn);
                data_by_mode_pm13.driving.ysleta.push(ysleta);
                data_by_mode_pm13.driving.bota.push(bota);
                data_by_mode_pm13.driving.stanton_dcl.push(stantondcl);
                data_by_mode_pm13.driving.ysleta_dcl.push(ysletadcl);
                data_by_mode_pm13.driving.total.push(total);
                data_by_mode_pm13.driving.santa_teresa.push(santaTeresa);
                data_by_mode_pm13.driving.tornillo.push(tornillo);
                data_by_mode_pm13.driving.total.push(total);
                data_by_mode_pm13.driving.period.push(period);
        
            } else if (mode == "pedestrian") {
                data_by_mode_pm13.walking.pdn.push(pdn);
                data_by_mode_pm13.walking.ysleta.push(ysleta);
                data_by_mode_pm13.walking.bota.push(bota);
                data_by_mode_pm13.walking.stanton_dcl.push(stantondcl);
                data_by_mode_pm13.walking.ysleta_dcl.push(ysletadcl);
                data_by_mode_pm13.walking.santa_teresa.push(santaTeresa);
                data_by_mode_pm13.walking.tornillo.push(tornillo);
                data_by_mode_pm13.walking.period.push(period);
                data_by_mode_pm13.walking.total.push(total);
            } else if (mode == "freight") {
                data_by_mode_pm13.freight.pdn.push(pdn);
                data_by_mode_pm13.freight.ysleta.push(ysleta);
                data_by_mode_pm13.freight.bota.push(bota);
                data_by_mode_pm13.freight.stanton_dcl.push(stantondcl);
                data_by_mode_pm13.freight.ysleta_dcl.push(ysletadcl);
                data_by_mode_pm13.freight.santa_teresa.push(santaTeresa);
                data_by_mode_pm13.freight.tornillo.push(tornillo);
                data_by_mode_pm13.freight.period.push(period);
                data_by_mode_pm13.freight.total.push(total);
            }
        }
        
        // save greatest station info
        data_by_mode_pm13.text.greatest = greatest;
        data_by_mode_pm13.text.greatestStation = greatestStation;
        // save averages
        data_by_mode_pm13.text.averageD = (data_by_mode_pm13.driving.total.reduce((a, b) => a + b, 0) / data_by_mode_pm13.driving.total.length).toFixed(0);
        data_by_mode_pm13.text.averageF = (data_by_mode_pm13.freight.total.reduce((a, b) => a + b, 0) / data_by_mode_pm13.freight.total.length).toFixed(0);
        data_by_mode_pm13.text.averageW = (data_by_mode_pm13.walking.total.reduce((a, b) => a + b, 0) / data_by_mode_pm13.walking.total.length).toFixed(0);
     
        //modes 
        if (mode == 0) { // menu text
            document.getElementById("pm13DText").innerHTML = commafy(data_by_mode_pm13.text.averageD);
            document.getElementById("pm13FText").innerHTML = commafy(data_by_mode_pm13.text.averageF);
            document.getElementById("pm13WText").innerHTML = commafy(data_by_mode_pm13.text.averageW);
        } else if (mode == 1) {
            regionalText(data_by_mode_pm13);
        }
    }).fail(function (error) {
        alert("ERROR PM 13");
        console.log(error);
    });
}
function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray);
}

/** Sometimes int arrays are actually string arrays containing numbers as strings,  we parse them to INT*/
function parseStrArray2IntArray(string_arr_of_ints) {
    let new_arr = [];
    for (let i = 0; i < string_arr_of_ints.length; i++) {
        let num = string_arr_of_ints[i];
        num = parseInt(num);
        new_arr.push(num);
    }
    return new_arr;
}
function pm13ModeGraph(ctx, data) {
    let sum = [0,0,0,0,0];
    for (index in data.driving.total) {
        sum[index] += data.driving.total[index];
        sum[index] += data.walking.total[index];
        sum[index] += data.freight.total[index];
    }
    var data = {
        labels: data.driving.period,
        datasets: [
            {
                label: "Passenger Vechicles",
                data: data.driving.total,
                backgroundColor: "lightgreen",
                borderColor: "lightgreen",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Pedestrians",
                data: data.walking.total,
                backgroundColor: "purple",
                borderColor: "purple",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Cargo Trucks",
                data: data.freight.total,
                backgroundColor: "lightblue",
                borderColor: "lightblue",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Northbound Crossing count",
                data: sum,
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
            scales: {
                yAxes: [{
                    //To add commas on the y Axis of the graph
                    ticks: {
                        beginAtZero: true,
                        userCallback: function (value, index, values) {
                            value = value.toString();
                            value = value.split(/(?=(?:...)*$)/);
                            value = value.join(',');
                            return value;
                        }
                    },
                    scaleLabel: {
                        display: true,
                    }
                }]
            },
            // The tooltips sections adds commas to hoover text
            tooltips: {
                mode: 'label',
                label: 'mylabel',
                callbacks: {
                    label: function (tooltipItem, data) {
                        return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    },
                },
            },


            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 12,
                    boxWidth: 10
                }
            },
            title: {
                display: true,
                text: 'Northbound Crossings by Mode'
            }
        }
    });
}
function pm13Chart(ctx, data) {
    let dataH = [];
    let datasetHolder = [];
    let titleH = "";
    if (currentType == "driving") {
        dataH = data.driving;
        titleH = "Northbound Crossing of Passenger Vehicles";
        datasetHolder = [
            {
                label: "PDN",
                data: dataH.pdn,
                backgroundColor: pdnColor,
                borderColor: pdnColor,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Ysleta",
                data: dataH.ysleta,
                backgroundColor: ysletaColor,
                borderColor: ysletaColor,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "BOTA",
                data: dataH.bota,
                backgroundColor: botaColor,
                borderColor: botaColor,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Stanton DCL",
                data: dataH.stanton_dcl,
                backgroundColor: "#FF5722",
                borderColor: "#FF5722",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Ysleta DCL",
                data: dataH.ysleta_dcl,
                backgroundColor: "#FFB74D",
                borderColor: "#FFB74D",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Santa Teresa",
                data: dataH.santa_teresa,
                backgroundColor: "#C133FF",
                borderColor: "#C133FF",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Tornillo",
                data: dataH.tornillo,
                backgroundColor: "#5D8C37",
                borderColor: "#5D8C37",
                fill: false,
                lineTension: 0,
                radius: 5
            }

        ];
    } else if (currentType == "freight") {
        dataH = data.freight;
        titleH = "Northbound Crossing of Cargo Trucks";
        datasetHolder = [
            {
                label: "Ysleta",
                data: dataH.ysleta,
                backgroundColor: ysletaColor,
                borderColor: ysletaColor,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "BOTA",
                data: dataH.bota,
                backgroundColor: botaColor,
                borderColor: botaColor,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Santa Teresa",
                data: dataH.santa_teresa,
                backgroundColor: "#C133FF",
                borderColor: "#C133FF",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Tornillo",
                data: dataH.tornillo,
                backgroundColor: "#5D8C37",
                borderColor: "#5D8C37",
                fill: false,
                lineTension: 0,
                radius: 5
            }
        ];
        
    } else if (currentType == "walking") {
        dataH = data.walking;
        titleH = "Northbound Crossing of Pedestrians";
        datasetHolder = [
            {
                label: "PDN",
                data: dataH.pdn,
                backgroundColor: pdnColor,
                borderColor: pdnColor,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Ysleta",
                data: dataH.ysleta,
                backgroundColor: ysletaColor,
                borderColor: ysletaColor,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "BOTA",
                data: dataH.bota,
                backgroundColor: botaColor,
                borderColor: botaColor,
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Santa Teresa",
                data: dataH.santa_teresa,
                backgroundColor: "#C133FF",
                borderColor: "#C133FF",
                fill: false,
                lineTension: 0,
                radius: 5
            },
            {
                label: "Tornillo",
                data: dataH.tornillo,
                backgroundColor: "#5D8C37",
                borderColor: "#5D8C37",
                fill: false,
                lineTension: 0,
                radius: 5
            }
        ];
    }

    var data = {
        labels: dataH.period,
        datasets:  datasetHolder
    };

    //create Chart class object
    var chart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        userCallback: function (value, index, values) {
                            value = value.toString();
                            value = value.split(/(?=(?:...)*$)/);
                            value = value.join(',');
                            return value;
                        }
                    },
                    scaleLabel: {
                        display: true,
                    }
                }]
            },
            tooltips: {
                mode: 'label',
                label: 'mylabel',
                callbacks: {
                    label: function (tooltipItem, data) {
                        return tooltipItem.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    },
                },
            },
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 12,
                    boxWidth: 10
                }
            },
            title: {
                display: true,
                text: titleH
            }
        }
    });
}
