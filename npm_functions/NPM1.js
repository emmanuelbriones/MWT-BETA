function npm1_1tx() {
    Chart.defaults.font.size = 18;
    var ctx = document.getElementById('Tx_NPM1-1');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - TX',
                data: [83, 59, 91, 80, 84],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                // pointRadius: 5
            }, {
                type: 'line',
                label: "5-yr Rolling Average",
                data: [null, null, 73, 75, 79.4],
                backgroundColor: [
                    'orange'
                ],
                borderColor: [
                    'orange'
                ],
                borderWidth: 1
            }, {
                type: 'scatter',
                label: 'EPMPO Target',
                data: [null, null, 76.1, 70, 87.5],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 10
            }, {
                type: 'scatter',
                label: 'EPMPO Target - 2021',
                data: [null, null, null, null, null, 91.1],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 10
            }],
            labels: [2016, 2017, 2018, 2019, 2020, 2021]
        },

        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: "Year",
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: "No. of Fatalities",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 20,
                    // max: 100,
                    // ticks: {
                    //     stepSize: 5
                    // }

                }
            },
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        usePointStyle: true
                    }
                },
                title: {
                    text: "Number of Fatalities",
                    display: true,
                    padding: 1,
                    font: { weight: 'bold' }
                }
            }
        }
    });
}


function npm1_1nm() {
    Chart.defaults.font.size = 18;
    var ctx = document.getElementById('Nm_NPM1-1');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Fatalities - NM',
                data: [2, 6, 8, 3, 7],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1
            }, {
                type: 'line',
                label: "5-yr Rolling Average",
                data: [null, null, null, 5, 5.2],
                backgroundColor: [
                    'orange'
                ],
                borderColor: [
                    'orange'
                ],
                borderWidth: 1

            }, {
                type: 'scatter',
                label: 'EPMPO Target',
                data: [null, null, null, 5.7, 6],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 10
            }, {
                type: 'scatter',
                label: 'EPMPO Target - 2020',
                data: [null, null, null, null, null, 6.6],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 10
            }],
            labels: [2015, 2016, 2017, 2018, 2019, 2020]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: "Year",
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: "No. of Fatalities",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min:0,
                    max:10
                }
            },
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        usePointStyle: true
                    }
                },
                title: {
                    text: "Number of Fatalities",
                    display: true,
                    padding: 5,
                    font: { weight: 'bold' }
                }
            }
        }
    });
}