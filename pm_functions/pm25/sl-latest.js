google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
     let data = google.visualization.arrayToDataTable([
        ['Sections', 'PH', 'Target', {role: 'certainty'}],
        ['Section 1', 1000, 1000, false],
        ['Section 2', 1170, 1000, false],
        ['Section 3', 660,  1000, false],
        ['Section 4', 1030, 1000, false],
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
    let chart = new google.visualization.LineChart(document.getElementById('sl-latest'));
    chart.draw(data, options);
}