google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    let data = google.visualization.arrayToDataTable([
        ['Year', 'Section 1', 'Section 2', 'Section 3', 'Target', {role: 'certainty'}],
        ['2013',  1000,        400,         300,         1000,     false],
        ['2014',  1170,        460,         320,         1000,     false],
        ['2015',  700,         1120,        200,         1000,     false],
        ['2016',  800,         1120,        300,         1000,     false],
        ['2017',  900,         1000,        400,         1000,     false],

    ]);
    let options = {
        curveType: 'function',
        legend: {
            position: 'right'
        },
        chartArea: {
            width: '250',
            height: '150'
        }
    };
    let chart = new google.visualization.LineChart(document.getElementById('sl-historical'));
    chart.draw(data, options);
}