const chartAreaBorder = {
    id: 'chartAreaBorder',
    beforeDraw(chart, args, options) {
        const { ctx, chartArea: { left, top, width, height } } = chart;
        ctx.save();
        ctx.strokeStyle = options.borderColor;
        ctx.lineWidth = options.borderWidth;
        ctx.setLineDash(options.borderDash || []);
        ctx.lineDashOffset = options.borderDashOffset;
        ctx.strokeRect(left, top, width, height);
        ctx.restore();
    }
};

function npm3_1tx() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Tx_NPM3-1');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - TX',
                data: [88.4, 88.3, 91.2, 98.3],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 2,
                pointRadius: 3
            },
            {
                type: 'line',
                label: "Baseline",
                data: [79.6, 79.6, 79.6, 79.6],
                backgroundColor: 'orange',
                borderColor: 'orange',
                borderWidth: 2,
                pointRadius: 0
            },
            {
                type: 'scatter',
                label: 'TXDOT Target - 2020',
                data: [null, null, null, 61.2],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            },
            {
                type: 'scatter',
                label: 'TXDOT Target - 2022',
                data: [null, null, null, null, null, 56.6],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2017, 2018, 2019, 2020, 2021, 2022, 2023]
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
                        text: "Travel Time Reliability Measure",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 25
                    },
                },
            },
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        usePointStyle: true
                    }
                },
                title: {
                    text: "Person-Miles Traveled",
                    display: true,
                    padding: 1,
                    font: { weight: 'bold' }
                },
                chartAreaBorder: {
                    borderColor: "black",
                    borderWidth: 2,
                }
            }
        },
        plugins: [chartAreaBorder]
    });
}

function npm3_1nm() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Nm_NPM3-1');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - NM',
                data: [100,100,100,100],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 2,
                pointRadius: 3
            },
            {
                type: 'line',
                label: "Baseline",
                data: [79.6, 79.6, 79.6, 79.6],
                backgroundColor: 'orange',
                borderColor: 'orange',
                borderWidth: 2,
                pointRadius: 0
            },
            {
                type: 'scatter',
                label: 'NMDOT Target - 2020',
                data: [null, null, null, 61.2],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            },
            {
                type: 'scatter',
                label: 'NMDOT Target - 2022',
                data: [null, null, null, null, null, 56.6],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2017, 2018, 2019, 2020, 2021, 2022, 2023]
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
                        text: "Travel Time Reliability Measure",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 25
                    },
                },
            },
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        usePointStyle: true
                    }
                },
                title: {
                    text: "Person-Miles Traveled",
                    display: true,
                    padding: 1,
                    font: { weight: 'bold' }
                },
                chartAreaBorder: {
                    borderColor: "black",
                    borderWidth: 2,
                }
            }
        },
        plugins: [chartAreaBorder]
    });
}

function npm3_2tx() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Tx_NPM3-2');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - TX',
                data: [79.2, 76.7, 83.1, 86.7],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 2,
                pointRadius: 3
            },
            {
                type: 'scatter',
                label: 'TXDOT Target - 2022',
                data: [null, null, null, null, null, 55.4],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2017, 2018, 2019, 2020, 2021, 2022, 2023]
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
                        text: "Travel Time Reliability Measure",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 25
                    },
                },
            },
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        usePointStyle: true
                    }
                },
                title: {
                    text: "Person-Miles Traveled",
                    display: true,
                    padding: 1,
                    font: { weight: 'bold' }
                },
                chartAreaBorder: {
                    borderColor: "black",
                    borderWidth: 2,
                }
            }
        },
        plugins: [chartAreaBorder]
    });
}

function npm3_2nm() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Nm_NPM3-2');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - NM',
                data: [100, 100, 80.7, 91.9],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 2,
                pointRadius: 3
            },
            {
                type: 'scatter',
                label: 'NMDOT Target - 2022',
                data: [null, null, null, null, null, 55.4],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2017, 2018, 2019, 2020, 2021, 2022, 2023]
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
                        text: "Travel Time Reliability Measure",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 25
                    },
                },
            },
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        usePointStyle: true
                    }
                },
                title: {
                    text: "Person-Miles Traveled",
                    display: true,
                    padding: 1,
                    font: { weight: 'bold' }
                },
                chartAreaBorder: {
                    borderColor: "black",
                    borderWidth: 2,
                }
            }
        },
        plugins: [chartAreaBorder]
    });
}

function npm3_3tx() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Tx_NPM3-3');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - TX',
                data: [1.54, 1.49, 1.47, 1.26],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 2,
                pointRadius: 3
            },
            {
                type: 'line',
                label: "Baseline",
                data: [1.50, 1.50, 1.50, 1.50],
                backgroundColor: 'orange',
                borderColor: 'orange',
                borderWidth: 2,
                pointRadius: 0
            },
            {
                type: 'scatter',
                label: 'TXDOT Target - 2020',
                data: [null, null, null, 1.70],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            },
            {
                type: 'scatter',
                label: 'TXDOT Target - 2022',
                data: [null, null, null, null, null, 1.79],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2017, 2018, 2019, 2020, 2021, 2022, 2023]
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
                        text: "Truck Travel Time Reliability (TTTR)",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 1.00,
                    max: 1.80,
                    ticks: {
                        stepSize: 0.10
                    },
                },
            },
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        usePointStyle: true
                    }
                },
                title: {
                    text: "Truck Travel Time Reliability",
                    display: true,
                    padding: 1,
                    font: { weight: 'bold' }
                },
                chartAreaBorder: {
                    borderColor: "black",
                    borderWidth: 2,
                }
            }
        },
        plugins: [chartAreaBorder]
    });
}

function npm3_3nm() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Nm_NPM3-3');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - NM',
                data: [1.13, 1.14, 1.17, 1.13],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 2,
                pointRadius: 3
            },
            {
                type: 'line',
                label: "Baseline",
                data: [1.50, 1.50, 1.50, 1.50],
                backgroundColor: 'orange',
                borderColor: 'orange',
                borderWidth: 2,
                pointRadius: 0
            },
            {
                type: 'scatter',
                label: 'NMDOT Target - 2020',
                data: [null, null, null, 1.70],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            },
            {
                type: 'scatter',
                label: 'NMDOT Target - 2022',
                data: [null, null, null, null, null, 1.79],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2017, 2018, 2019, 2020, 2021, 2022, 2023]
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
                        text: "Truck Travel Time Reliability (TTTR)",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 1.00,
                    max: 1.80,
                    ticks: {
                        stepSize: 0.10
                    },
                },
            },
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        usePointStyle: true
                    }
                },
                title: {
                    text: "Truck Travel Time Reliability",
                    display: true,
                    padding: 1,
                    font: { weight: 'bold' }
                },
                chartAreaBorder: {
                    borderColor: "black",
                    borderWidth: 2,
                }
            }
        },
        plugins: [chartAreaBorder]
    });
}
