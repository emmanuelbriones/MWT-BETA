//**************************************************************** pm5 shares table with pm9 on database
//Handles 2 toggles of Exist/Plan for Polygons.

function pm5Data(mode, status) {
    let pm5Data = {
        totJobs: 0, 
        jobsPercent: 0,
        totalJobsPercent: 0,

        existing_ratio_sum: 0,
        all_ratio_sum: 0
    };
    let key = 'all_pm5';
    let example = { key: key };
    let color = "#039BE5";

    $.get('mwt_handler.php', example, function (data) {
        console.log(data);
        for (index in data.shape_arr) {
            let temp = wktFormatter(data.shape_arr[index]['shape']);
            let to_visualize = [];
            let type = data.shape_arr[index].type;
            let ratio_prim = parseFloat(data.shape_arr[index].ratio_prim);  //filter values on polygons

            //update Dynamic Data
            if (type == "existing") {
                pm5Data.existing_ratio_sum += ratio_prim;
            } else if (type == "all") {
                pm5Data.all_ratio_sum += ratio_prim;
            }
   
            if (mode == 1) {
                // if the status of a shape exists, push to visualize
                for (let i = 0; i < temp.length; i++) {
                    if (type == "existing" && status == "e") {
                        color = "#039BE5";//blue
                        to_visualize.push(temp[i]);
                        polyToErase.exist.push();
                    } else if (type == "planned" && status == "p") {
                        color = "#9E9E9E"; //gray
                        to_visualize.push(temp[i]);
                        polyToErase.plan.push();
                    }

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
                    title: ratio_prim.toFixed(2) + "%",
                });
                if (status == "e") polyToErase.exist.push(polygon);
                if (status == "p") polyToErase.plan.push(polygon);

                // Hover Effect for Google API Polygons
                google.maps.event.addListener(polygon, 'mouseover', function (event) { injectTooltip(event, polygon.title); });
                google.maps.event.addListener(polygon, 'mousemove', function (event) { moveTooltip(event); });
                google.maps.event.addListener(polygon, 'mouseout', function (event) { deleteTooltip(event); });

                polygon.setMap(map);
                polygons.push(polygon);
            }
        }
        pm5Calculations(pm5Data,mode);

    });
}
function pm5Calculations(pm5Data, mode) {
    let key = 'all_pm5_6';
    let example = { key: key };
    $.get('mwt_handler.php', example, function (data) {
        let totJobs = 0;
        for (index in data.shape_arr) {
            totJobs += parseInt(data.shape_arr[index].primjobsc0);
        }
        //calculations
        pm5Data.totJobs = totJobs;
        pm5Data.jobsPercent = ((pm5Data.existing_ratio_sum / pm5Data.totJobs) * 100);
        pm5Data.totalJobsPercent = ((pm5Data.all_ratio_sum / pm5Data.totJobs) * 100);

        if (mode == 0) {
            document.getElementById("pm5Text").innerHTML = String(pm5Data.jobsPercent.toFixed(2)) + "%"; // menu text
        } else if (mode == 1) {
            regionalText(pm5Data);
        }
    });
}

function pm5chart(g2,data){
    colors=[];
    colors = [
        'rgba(33,150,243,1)',
        'rgba(255,152,0,1)',
    ];
    let tot = 100 - (Math.round(data.jobsPercent));
  
    myPieChart = new Chart(g2, {
        type: 'pie',
        data: {
            datasets: [{
                data: [tot, Math.round(data.jobsPercent)],
                backgroundColor: colors,
                label: 'Dataset 1'
            }],
            labels: [
                'Total Jobs in the El Paso MPO region',
                'Percent of jobs 1/2 mi from existing high-quality rapid transit',
            ]
        },
        options: {
            responsive: true,
            legend:{
                labels: {
                    fontSize: 13,
                    boxWidth:15
                }
            },
           /* title: {
                display: true,
                text: 'Title 2'
            },*/
            tooltips: {
                callbacks: {
                  label: function(tooltipItem, data) {
                    return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
                  }
                }
              }
        }
       
    });
}

    