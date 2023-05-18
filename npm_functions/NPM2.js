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

function npm2_1tx() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Tx_NPM2-1');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - TX',
                data: [42.12, 43.97, 48.82, 47.71],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            },
            {
                type: 'scatter',
                label: 'TXDOT Target - 2022',
                data: [null, null, null, null, null, null, null, 66.4],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
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
                        text: "Percentage",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 10
                    }
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
                    text: "Percentage of Pavements on the Interstate System in Good Condition",
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

function npm2_1nm() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Nm_NPM2-1');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - NM',
                data: [100, 100, 100, 100],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            },
            {
                type: 'scatter',
                label: 'NMDOT Target - 2019',
                data: [null, null, null, null, 57.3, null, null, null],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            },
            {
                type: 'scatter',
                label: 'NMDOT Target - 2021',
                data: [null, null, null, null, null, null, 59.1],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
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
                        text: "Percentage",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 20,
                    max: 120,
                    ticks: {
                        stepSize: 10
                    }
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
                    text: "Percentage of Pavements on the Interstate System in Good Condition",
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

function npm2_2tx() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Tx_NPM2-2');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - TX',
                data: [6.73, 4.85, 5.32, 4.75],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            },
            {
                type: 'scatter',
                label: 'TXDOT Target - 2022',
                data: [null, null, null, null, null, null, null, 0.3],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
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
                        text: "Percentage",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 10
                    }
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
                    text: "Percentage of Pavements on the Interstate System in Poor Condition",
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

function npm2_2nm() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Nm_NPM2-2');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - NM',
                data: [0, 0, 0, 0],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            },
            {
                type: 'scatter',
                label: 'NMDOT Target - 2019',
                data: [null, null, null, null, 4.50, null, null, null],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            },
            {
                type: 'scatter',
                label: 'NMDOT Target - 2021',
                data: [null, null, null, null, null, null, 5.00],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
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
                        text: "Percentage",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: -20,
                    max: 80,
                    ticks: {
                        stepSize: 10
                    }
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
                    text: "Percentage of Pavements on the Interstate System in Poor Condition",
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

function npm2_3tx() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Tx_NPM2-3');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - TX',
                data: [34, 54.67, 27.97, 29.28],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            },
            {
                type: 'scatter',
                label: 'TXDOT Target - 2020',
                data: [null, null, null, null, null, 52],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            },
            {
                type: 'scatter',
                label: 'TXDOT Target - 2022',
                data: [null, null, null, null, null, null, null, 52.3],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
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
                        text: "Percentage",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 10
                    }
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
                    text: "Percentage of Pavements on the Non-Interstate NHS in Good Condition",
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

function npm2_3nm() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Nm_NPM2-3');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - NM',
                data: [84.18, 78.51, 75.20, 72.16],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            },
            {
                type: 'scatter',
                label: 'NMDOT Target - 2019',
                data: [null, null, null, null, 35.6],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            },
            {
                type: 'scatter',
                label: 'NMDOT Target - 2021',
                data: [null, null, null, null, null, null, 34.2],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
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
                        text: "Percentage",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 10
                    }
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
                    text: "Percentage of Pavements on the Non-Interstate NHS in Good Condition",
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

function npm2_4tx() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Tx_NPM2-4');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - TX',
                data: [21.61, 14.07, 24.99, 25.55],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            },
            {
                type: 'scatter',
                label: 'TXDOT Target - 2020',
                data: [null, null, null, null, null, 14.3],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            },
            {
                type: 'scatter',
                label: 'TXDOT Target - 2022',
                data: [null, null, null, null, null, null, null, 14.3],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
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
                        text: "Percentage",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 10
                    }
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
                    text: "Percentage of Pavements on the Non-Interstate NHS in Poor Condition",
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

function npm2_4nm() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Nm_NPM2-4');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - NM',
                data: [2.09, 5.14, 7.07, 7.58],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            },
            {
                type: 'scatter',
                label: 'NMDOT Target - 2019',
                data: [null, null, null, null, 9],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            },
            {
                type: 'scatter',
                label: 'NMDOT Target - 2021',
                data: [null, null, null, null, null, null, 12],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
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
                        text: "Percentage",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 10
                    }
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
                    text: "Percentage of Pavements on the Non-Interstate NHS in Poor Condition",
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

function npm2_5tx() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Tx_NPM2-5');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - TX',
                data: [58.94, 58.16, 57.65, 54.37, 51.79],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            },
            {
                type: 'scatter',
                label: 'TXDOT Target - 2020',
                data: [null, null, null, null, 50.58],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            }, {
                type: 'scatter',
                label: 'TXDOT Target - 2022',
                data: [null, null, null, null, null, null, 50.42],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
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
                        text: "Percentage",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 100,
                    ticks: {
                        stepSize: 10
                    }
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
                    text: "Percentage of Bridges in Good Condition",
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

function npm2_5nm() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Nm_NPM2-5');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - NM',
                data: [39.86, 39.86, 39.86, 39.86, 39.86],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            },
            {
                type: 'scatter',
                label: 'NMDOT Target - 2019',
                data: [null, null, null, null, 36.00],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            }, {
                type: 'scatter',
                label: 'NMDOT Target - 2021',
                data: [null, null, null, null, null, null, 30.00],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
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
                        text: "Percentage",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 60
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
                    text: "Percentage of Bridges in Good Condition",
                    display: true,
                    padding: 5,
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

function npm2_6tx() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Tx_NPM2-6');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - TX',
                data: [0, 0, 0, 0, 0.21],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            },
            {
                type: 'scatter',
                label: 'TXDOT Target - 2020',
                data: [null, null, null, null, 0.80],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            }, {
                type: 'scatter',
                label: 'TXDOT Target - 2022',
                data: [null, null, null, null, null, null, 0.80],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
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
                        text: "Percentage",
                        font: {
                            weight: 'bold'
                        }
                    },
                    // min: 0,
                    max: 5,
                    ticks: {
                        stepSize: 1
                    }
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
                    text: "Percentage of Bridges in Poor Condition",
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

function npm2_6nm() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Nm_NPM2-6');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - NM',
                data: [null],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            },
            {
                type: 'scatter',
                label: 'NMDOT Target - 2019',
                data: [null, null, null, null, 3.3],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            }, {
                type: 'scatter',
                label: 'NMDOT Target - 2021',
                data: [null, null, null, null, null, null, 2.5],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
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
                        text: "Percentage",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 10
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
                    text: "Percentage of Bridges in Good Condition",
                    display: true,
                    padding: 5,
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