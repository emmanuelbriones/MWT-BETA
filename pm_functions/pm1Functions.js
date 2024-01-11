/**
 * PM1 and PM2 have the same source table from database,
 * however, they are kept separate to ensure atomic requests, and avoid complexity
 * in sharing and keeping track of global variables
 *   
 * */


 /**
 * Data only for pm1 [NonSOV, SOV] - builds pie chart
 *  */

function plotPM1(mode, data_to_plot) {
    let color = "#039BE5";
    let sum = 0; 
    let data_for_php = 0;
    let shape = "shape";
    let php_handler = "mwt_handler.php";

    if (mode == 0 || mode == 1) { // if we want regional (default) data
        let key = 'all_pm1';
        data_for_php = { key: key };
    }
    else if (mode == 2) {
       // data_for_php = data_to_plot;
        shape = 'ST_AsText(SHAPE)';
        php_handler = "corridor_handlerB.php";

        data_for_php = {
            key: 1,
            corridors_selected: data_to_plot,
            tableName: "pm_1_2"
        };
    }
    else if(mode == 4){
        php_handler = './backend/AOI.php'
        data_for_php =data_to_plot;
    }
 
    $.get(php_handler, data_for_php, function (data) {
        for (index in data.shape_arr) {
            let temp = wktFormatter(data.shape_arr[index][shape]);
            let pm_prcnt_n = parseInt(data.shape_arr[index].pt_nonsove, 10);
            let to_visualize = [];

            if (mode > 0){
                for (let i = 0; i < temp.length; i++) {
                    if (pm_prcnt_n == 0) {
                        color = "#9E9E9E"; //gray
                    } else if (pm_prcnt_n <= 25) {
                        color = "#00FF00"; // green
                    } else if (pm_prcnt_n <= 50) {
                        color = "#FFFF00"; // yellow
                    } else if (pm_prcnt_n <= 75) {
                        color = "#FFA500"; // orange
                    }else if (pm_prcnt_n <= 100){
                        color = "#FF0000"; // red
                    }
                    to_visualize.push(temp[i]);
                    polyToErase.plan.push();
                }
                let polygon = new google.maps.Polygon({
                    description: "",
                    description_value: '',
                    paths: to_visualize,
                    strokeColor: 'black', strokeOpacity: 0.60,
                    strokeWeight: 0.70,
                    fillColor: color,
                    fillOpacity: 0.60,
                    zIndex: -2,
                    title: pm_prcnt_n +  "%",
                });
                polyToErase.exist.push(polygon);
                //   Hover Effect for Google API Polygons
                google.maps.event.addListener(polygon, 'mouseover', function (event) { injectTooltip(event, polygon.title); });
                google.maps.event.addListener(polygon, 'mousemove', function (event) { moveTooltip(event); });
                google.maps.event.addListener(polygon, 'mouseout', function (event) { deleteTooltip(event); });
                polygon.setMap(map);
                polygons.push(polygon);
            }
        }

        //draws boundries
        function drawOzoneFigure(figureName) {
            fetch(`./shapeBoundries/pm1.json`).then(function (response) {
                    return response.json();
            }).then(function (myJson) {
                let active_corr = myJson[figureName];
                for (let index in active_corr) {
                    let shp = active_corr[index]['shape'];
                    let reader = new jsts.io.WKTReader();
                    let r = reader.read(shp);
                    let to_visualize = [];
                    let coord;
                    let ln = r.getCoordinates();
                    for (let i = 0; i < ln.length; i++) {
                        coord = {
                            lat: ln[i]['y'],
                            lng: ln[i]['x']
                        };
                        to_visualize.push(coord);
                    }
                    let line = new google.maps.Polygon({
                        paths: to_visualize,
                        strokeColor: '#800000',
                        strokeOpacity: 0.9,
                        strokeWeight: 4,
                        fillOpacity: 0,
                        zIndex: -2 // on top of every other shape
                    });  
                    polyToErase.plan.push();
                    polyToErase.exist.push(line);                                    
                    line.setMap(map);
                    polygons.push(line);
                }
            });
        }
        
        drawOzoneFigure("West Side");
        drawOzoneFigure("Upper Valley");
        drawOzoneFigure("Downtown");
        drawOzoneFigure("East Side");
        drawOzoneFigure("Northeast Central");
        drawOzoneFigure("Far East");
        drawOzoneFigure("Hueco Tanks");
        drawOzoneFigure("Mission Valley");
        drawOzoneFigure("Fabens");
        drawOzoneFigure("Anthony,NM");
        drawOzoneFigure("Santa Teresa");
        drawOzoneFigure("Sunland Park");
        drawOzoneFigure("Chaparral, NM");
    });
}
function pieChartpm1(ctx) {
    let php_handler = "mwt_handler.php";
    let key = 'pm_1_2_table';
    data_for_php = { key: key };
    
    $.get(php_handler, data_for_php, function (data) {
        const areas = [];
        const driveAloneValues = [];

        for (index in data.shape_arr) {
            const entry = data.shape_arr[index];
            areas.push(entry.Areas);
            driveAloneValues.push(parseFloat(entry.Drive_Alone));
        }
        
        // Define colors for the bars
        const barColors = 'rgba(33,150,243,1)';

        // Creating the horizontal bar chart
        const myHorizontalBarChart = new Chart(ctx, {
            type: 'horizontalBar', // Change the chart type to 'horizontalBar'
            data: {
                labels: areas,
                datasets: [{
                    label: 'Drive Alone',
                    data: driveAloneValues,
                    backgroundColor: barColors,
                    borderColor: barColors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Drive Alone (%)'
                        },
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'El Paso Districts'
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            return data['datasets'][0]['label'] + ': ' + tooltipItem.xLabel.toFixed(1) + '%';
                        }
                    }
                }
            }
        });
    });
}


const arrSum = arr => arr.reduce((a,b) => a + b, 0);
function arrAvg(arr){
    let sum = arrSum(arr);
    let avg = sum/arr.length;
    return avg;

}
/**Fetches pm1 data from Database and makes calculations on the fly  */
function pm1Data(mode, data_to_plot) { 
    let file = './mwt_handler.php';
    let key = 'all_pm1';

    let for_pm1 = {
        SOV: 0,
        NonSOV:0
    };
    // ! change the handler and key if needed according to the MODE requested
    if (mode == 0 || mode == 1) { // if we want regional (default) data
        key = 'all_pm1';
        key = { key: key };
    }
    else if (mode == 2 || mode ==3) {
        // data_for_php = data_to_plot;
        shape = 'ST_AsText(SHAPE)';
        file = "corridor_handlerB.php";

        key = {
            key: 1,
            corridors_selected: data_to_plot,
            tableName: "pm_1_2"
        };
    }
    else if (mode == 4 ){
        file = "./backend/AOI.php";
        key = data_to_plot;
    }

    /** Fetch data from database */ 
    $.get(file,key).done(function(data) {//succesful
       //acknowledge fetch
	   if(mode != 0){
	//	alert('Retrieving Data, this might take a minute to load');
       }

       let nonsove = [];
       let b_e1 = [];
        // All BELOW IS MODE INDEPENDENT..data comes from the variable 'file'; the specific handler [AOI,MWT,CORRIDOR]
       for (let index = 0; index < data.shape_arr.length; index++) {
           nonsove.push(parseFloat(data.shape_arr[index].ra_nonsove));
           b_e1.push(parseFloat(data.shape_arr[index].e1));
       }
         /**
         Stores calculations: 
        PT_NonSOVe =  (sum(ra_nonsove) / sum(e1) ) *100
        */
       let nonsov_avg = arrSum(nonsove) / arrSum(b_e1);
       for_pm1.NonSOV = nonsov_avg * 100;
       for_pm1.SOV = 100 - (nonsov_avg * 100);
   
        if(mode != 0){
		//	alert('Data ready'); // after operations
		}
        //Display shapes
        plotPM1(mode, data_to_plot);
    

        if (mode == 0) {
            let value = {
                name: "pm1-sov",
                value: for_pm1.SOV.toFixed(1) +  "%"
            };
            menu.push(value);
        } else if (mode == 1) {
            regionalText(for_pm1);
        } else if (mode == 2) {
			let corr = translateCorridor(data_to_plot.corridors_selected); // what corridor are we on?
            dynamicCorridorText(corr,for_pm1);
        }
        else if (mode == 3) {
            let data = {
                pm:'1',
                type:currentType,
                title:"Bridge & culvert condition 2018",
                corridor: corr,
                value:pm26Data.dynamicPoor + "%"
            }
        }
        else if (mode == 4) {
		//	let corr = translateCorridor(data_to_plot.corridors_selected); // what corridor are we on?
            dynamicCorridorText("AOI",for_pm1);
        }
    }).fail(function(error){//error
        alert('Whoops, we could not retrieve data from our database. Check your internet connection or contact MPO');
        console.log(error);
    });
} 
