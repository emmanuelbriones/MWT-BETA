google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    let data = google.visualization.arrayToDataTable([
        ['Year', 'PH'],
        ['2013',  1000],
        ['2014',  1170],
        ['2015',  660],
        ['2016',  1030],
        ['2017',  930]
    ]);
    let options = {
        curveType: 'function',
        legend: {
            position: 'right'
        },
        chartArea: {
            width: '270',
            height: '150'
        },
    };
    let chart = new google.visualization.LineChart(document.getElementById('rl-historical'));
    chart.draw(data, options);
}