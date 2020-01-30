google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    let baseTitle = "IRI_Good_Fair_Bad_";
    let years = [
        "2013",
        "2014",
        "2015",
        "2016",
        "2017"
    ];
    let types = [
        "Good_total_",
        "Fair_total_",
        "Poor_total_"
    ];

    fetch('../results.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            let chartData = google.visualization.arrayToDataTable([
                ['Year',
                    'Poor',
                    'Fair',
                    'Good',
                ],
                ['2013',
                    10,
                    10,
                    10
                ],
                ['2014',
                    10,
                    10,
                    10
                ],
                ['2015',
                    10,
                    10,
                    10
                ],
                ['2016',
                    10,
                    10,
                    10
                ],
                ['2017',
                    myJson["PM25_Good_Fair_Bad_2017"][0]["Poor_total_2017"],
                    myJson["PM25_Good_Fair_Bad_2017"][0]["Fair_total_2017"],
                    myJson["PM25_Good_Fair_Bad_2017"][0]["Good_total_2017"],
                ]
            ]);
            let options = {
                isStacked: true,
                chartArea: {
                    width: '250',
                    height: '170'
                },
                legend: {position: 'right', maxLines: 3},
                colors: ['red', 'yellow', 'green'],
            };
            let chart = new google.visualization.ColumnChart(document.getElementById('rl-latest'));
            chart.draw(chartData, options);
        });
}