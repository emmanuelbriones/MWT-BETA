const chartAreaBorder = {
    id: 'chartAreaBorder',
    beforeDraw(chart, args, options) {
      const {ctx, chartArea: {left, top, width, height}} = chart;
      ctx.save();
      ctx.strokeStyle = options.borderColor;
      ctx.lineWidth = options.borderWidth;
      ctx.setLineDash(options.borderDash || []);
      ctx.lineDashOffset = options.borderDashOffset;
      ctx.strokeRect(left, top, width, height);
      ctx.restore();
    }
  };
  
function npm1_1tx() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
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
                pointRadius: 5
            }, {
                type: 'line',
                label: "5-yr Rolling Average",
                data: [null, null, 73, 75, 79.4],
                backgroundColor: 'orange',
                borderColor: 'orange',
                borderWidth: 1,
                pointRadius: 5
            }, {
                type: 'scatter',
                label: 'TXDOT Target',
                data: [null, null, 76.1, 70, 87.5],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            }, {
                type: 'scatter',
                label: 'TXDOT Target - 2021',
                data: [null, null, null, null, null, 91.1],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2016, 2017, 2018, 2019, 2020, 2021, 2022]
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
                    text: "Number of Fatalities",
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
        plugins:[chartAreaBorder]
    });
}


function npm1_1nm() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Nm_NPM1-1');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - NM',
                data: [2, 6, 8, 3, 7],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            }, {
                type: 'line',
                label: "5-yr Rolling Average",
                data: [null, null, null, 5, 5.2],
                backgroundColor: 'orange',
                borderColor: 'orange',
                borderWidth: 1,
                pointRadius: 5

            }, {
                type: 'scatter',
                label: 'NMDOT Target',
                data: [null, null, null, 5.7, 6],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            }, {
                type: 'scatter',
                label: 'NMDOT Target - 2020',
                data: [null, null, null, null, null, 6.6],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021]
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
                },
                chartAreaBorder: {
                    borderColor: "black",
                    borderWidth: 2,
                }
            }
        },
        plugins:[chartAreaBorder]
    });
}

function npm1_2tx() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Tx_NPM1-2');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - TX',
                data: [1.582, 1.105, 1.639, 1.388, 1.405],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            }, {
                type: 'line',
                label: "5-yr Rolling Average",
                data: [null, null, 1.382, 1.383, 1.424],
                backgroundColor: 'orange',
                borderColor: 'orange',
                borderWidth: 1,
                pointRadius: 5
            }, {
                type: 'scatter',
                label: 'TXDOT Target',
                data: [null, null, 1.395, 1.283, 1.53],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            }, {
                type: 'scatter',
                label: 'TXDOT Target - 2021',
                data: [null, null, null, null, null, 1.530],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2016, 2017, 2018, 2019, 2020, 2021, 2022]
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
                        text: "Fatality Rate",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 2,
                    ticks: {
                        stepSize: 0.4
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
                    text: "Fatality Rate",
                    display: true,
                    padding: 1,
                    font: { weight: 'bold' }
                },
                chartAreaBorder: {
                    borderColor: "black",
                    borderWidth: 2
                }
            }
        },
        plugins:[chartAreaBorder]
    });
}


function npm1_2nm() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Nm_NPM1-2');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - NM',
                data: [0.965, 2.834, 3.701, 1.332, 2.991],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            }, {
                type: 'line',
                label: "5-yr Rolling Average",
                data: [null, null, null, 2.358, 2.364],
                backgroundColor: 'orange',
                borderColor: 'orange',
                borderWidth: 1,
                pointRadius: 5

            }, {
                type: 'scatter',
                label: 'NMDOT Target',
                data: [null, null, null, 2.746, 2.722],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            }, {
                type: 'scatter',
                label: 'NMDOT Target - 2020',
                data: [null, null, null, null, null, 3.039],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021]
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
                        text: "Fatality Rate",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min:0,
                    max:5,
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
                    text: "Fatality Rate",
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
        plugins:[chartAreaBorder]
    });
}

function npm1_3tx() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Tx_NPM1-3');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - TX',
                data: [280, 329, 261, 262, 203],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            }, {
                type: 'line',
                label: "5-yr Rolling Average",
                data: [null, null, 287, 288.8, 267],
                backgroundColor: 'orange',
                borderColor: 'orange',
                borderWidth: 1,
                pointRadius: 5
            }, {
                type: 'scatter',
                label: 'TXDOT Target',
                data: [null, null, 282.3, 362.5, 296.6],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            }, {
                type: 'scatter',
                label: 'TXDOT Target - 2021',
                data: [null, null, null, null, null, 241.2],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2016, 2017, 2018, 2019, 2020, 2021, 2022]
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
                        text: "Serious Injuries",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 100,
                    max: 400,
                    ticks: {
                        stepSize: 50
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
                    text: "Serious Injuries",
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
        plugins:[chartAreaBorder]
    });
}

function npm1_3nm() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Nm_NPM1-3');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - NM',
                data: [15, 8, 9, 23, 6],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            }, {
                type: 'line',
                label: "5-yr Rolling Average",
                data: [null, null, null, 15.4, 12.2],
                backgroundColor: 'orange',
                borderColor: 'orange',
                borderWidth: 1,
                pointRadius: 5

            }, {
                type: 'scatter',
                label: 'NMDOT Target',
                data: [null, null, null, 18.9, 15.8],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            }, {
                type: 'scatter',
                label: 'NMDOT Target - 2020',
                data: [null, null, null, null, null, 12],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021]
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
                        text: "Serious Injuries",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min:0,
                    // max:10
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
                    text: "Serious Injuries",
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
        plugins:[chartAreaBorder]
    });
}

function npm1_4tx() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Tx_NPM1-4');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - TX',
                data: [5.336, 6.163, 4.702, 4.545, 3.396],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            }, {
                type: 'line',
                label: "5-yr Rolling Average",
                data: [null, null, 5.449, 5.359, 4.828],
                backgroundColor: 'orange',
                borderColor: 'orange',
                borderWidth: 1,
                pointRadius: 5
            }, {
                type: 'scatter',
                label: 'TXDOT Target',
                data: [null, null, 5.184, 6.640, 5.260],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            }, {
                type: 'scatter',
                label: 'TXDOT Target - 2021',
                data: [null, null, null, null, null, 3.901],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2016, 2017, 2018, 2019, 2020, 2021, 2022]
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
                        text: "Rate of Injuries",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 10
                    // ticks: {
                    //     stepSize: 20
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
                    text: "Rate of Serious Injuries",
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
        plugins:[chartAreaBorder]
    });
}

function npm1_4nm() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Nm_NPM1-4');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - NM',
                data: [7.235, 3.778, 4.164, 10.210, 2.564],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            }, {
                type: 'line',
                label: "5-yr Rolling Average",
                data: [null, null, null, 7.246, 5.590],
                backgroundColor: 'orange',
                borderColor: 'orange',
                borderWidth: 1,
                pointRadius: 5

            }, {
                type: 'scatter',
                label: 'NMDOT Target',
                data: [null, null, null, 9.036, 7.194],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            }, {
                type: 'scatter',
                label: 'NMDOT Target - 2020',
                data: [null, null, null, null, null, 5.587],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021]
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
                        text: " Rate of Injuries",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min:0,
                    max:12
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
                    text: "Rate of Serious Injuries",
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
        plugins:[chartAreaBorder]
    });
}

function npm1_5tx() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Tx_NPM1-5');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - TX',
                data: [66, 59, 72, 74, 42],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            }, {
                type: 'line',
                label: "5-yr Rolling Average",
                data: [null, null, 62.4, 63.8, 62.6],
                backgroundColor: 'orange',
                borderColor: 'orange',
                borderWidth: 1,
                pointRadius: 5
            }, {
                type: 'scatter',
                label: 'TXDOT Target',
                data: [null, null, 52, 62.5, 70],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            }, {
                type: 'scatter',
                label: 'TXDOT Target - 2021',
                data: [null, null, null, null, null, 85.6],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2016, 2017, 2018, 2019, 2020, 2021, 2022]
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
                        text: "Non - Motorized",
                        font: {
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 100,
                    // ticks: {
                    //     stepSize: 20
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
                    text: "Non - Motorized",
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
        plugins:[chartAreaBorder]
    });
}

function npm1_5nm() {
    Chart.defaults.font.size = 18;
    Chart.defaults.color = "black";
    var ctx = document.getElementById('Nm_NPM1-5');
    var myChart = new Chart(ctx, {
        data: {
            datasets: [{
                type: 'line',
                label: 'Annual - NM',
                data: [0, 3, 1, 0, 0],
                backgroundColor: 'blue',
                borderColor: 'blue',
                borderWidth: 1,
                pointRadius: 5
            }, {
                type: 'line',
                label: "5-yr Rolling Average",
                data: [null, null, null, 1.2, 0.8],
                backgroundColor: 'orange',
                borderColor: 'orange',
                borderWidth: 1,
                pointRadius: 5

            }, {
                type: 'scatter',
                label: 'NMDOT Target',
                data: [null, null, null, 1.5, 1.9],
                backgroundColor: 'black',
                pointStyle: 'rectRot',
                pointRadius: 7
            }, {
                type: 'scatter',
                label: 'NMDOT Target - 2020',
                data: [null, null, null, null, null, 1.5],
                backgroundColor: 'red',
                pointStyle: 'rect',
                pointRadius: 7
            }],
            labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021]
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
                        text: "Non - Motorized",
                        font: {
                            weight: 'bold'
                        }
                    },
                    // min:0,
                    max:4,
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
                    text: "Non - Motorized",
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
        plugins:[chartAreaBorder]
    });
}