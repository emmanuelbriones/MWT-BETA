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
   // console.log(data_for_php);
 //   console.log(data_for_php);
    $.get(php_handler, data_for_php, function (data) {
        let median = 0;
        //to get median for color coding
        for (index in data.shape_arr) {
            if (data.shape_arr[index].pt_nonsove > 0) {
                sum += parseFloat(data.shape_arr[index].pt_nonsove);
            }
        }
        median = (sum / data.shape_arr.length).toFixed(2); // for color coding
        for (index in data.shape_arr) {
            let temp = wktFormatter(data.shape_arr[index][shape]);
            let pm_prcnt_n = parseFloat(data.shape_arr[index].pt_nonsove).toFixed(2);
            //let nonsov_e = parseFloat(data.shape_arr[index].nonsov_e);
            let to_visualize = [];
            if (mode > 0){
                for (let i = 0; i < temp.length; i++) {
                    if (pm_prcnt_n == 0) {
                        color = "#9E9E9E"; //gray
                    } else if (pm_prcnt_n < median) {
                        color = "#64B5F6"; // light blue
                    } else if (pm_prcnt_n == median) {
                        color = "#1565C0"; // blue
                    } else if (pm_prcnt_n > median) {
                        color = "#1A237E"; // dark blue
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
                    zIndex: -1,
                    title: pm_prcnt_n,
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
    });
}
function pm1chart(g2, data) {

    colors = [];
    colors = [
        'rgba(33,150,243,1)',
        'rgba(255,152,0,1)',
    ];
    let tot = 100 - (Math.round(data.Sum_nonsov_e));
   // console.log(tot);
    myPieChart = new Chart(g2, {
        type: 'pie',
        data: {
            datasets: [{
                data: [tot, data.Sum_nonsov_e.toFixed(2)],
                backgroundColor: colors,
                label: 'Dataset 1'
            }],
            labels: [
                'Total Jobs in the El Paso MPO region',
                'Percent of jobs 0.5 mi from existing high-quality rapid transit',
            ]
        },
        options: {
            responsive: true,
            legend: {
                labels: {
                    fontSize: 13,
                    boxWidth: 15
                }
            },
            /* title: {
                 display: true,
                 text: 'Title 2'
             },*/
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                    }
                }
            }
        }

    });
}
function pieChartpm1(ctx,data){
 //   console.log("inside PM1 graph");
    console.log(data);
    colors = [];
    colors = [
        'rgba(33,150,243,1)',
        'rgba(255,152,0,1)',
    ];
    let tot = 100 - (data.Sum_nonsov_e);

    myPieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: [data.NonSOV.toFixed(2), data.SOV.toFixed(2)],
                backgroundColor: colors,
                label: 'Dataset 1'
            }],
            labels: [
                'Non SOV',
                'SOV',
            ]
        },
        options: {
            responsive: true,
            legend: {
                labels: {
                    fontSize: 13,
                    boxWidth: 15
                }
            },
            /* title: {
                 display: true,
                 text: 'Title 2'
             },*/
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                    }
                }
            }
        }

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
    else if (mode == 2) {
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
		alert('Retrieving Data, this might take a minute to load');
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
			alert('Data ready'); // after operations
		}
        //Display shapes
        plotPM1(mode, data_to_plot);
    

        if (mode == 0) {
			document.getElementById("pm1-sov").innerHTML = for_pm1.SOV.toFixed(2) + " %";
        } else if (mode == 1) {
            regionalText(for_pm1);
        } else if (mode == 2) {
			let corr = translateCorridor(data_to_plot.corridors_selected); // what corridor are we on?
            dynamicCorridorText(corr,for_pm1);
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
