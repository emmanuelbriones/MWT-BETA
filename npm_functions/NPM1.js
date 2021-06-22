function npm1_1tx() {
    Chart.defaults.font.size = 18;
    var ctx = document.getElementById('Tx_NPM1-1');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [2016, 2017, 2018, 2019, 2020],
            datasets: [{
                label: 'Fatalities',
                data: [83, 59, 91, 80, 84],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

function npm1_1nm() {
    Chart.defaults.font.size = 18;
    var ctx = document.getElementById('Nm_NPM1-1');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [2015, 2016, 2017, 2018, 2019],
            datasets: [{
                label: 'Fatalities',
                data: [2, 6, 8, 3, 7],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}