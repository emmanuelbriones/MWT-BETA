/**
 * Score Card menu Functions
 * 
 */

function readJSON() {
  $.getJSON("documents/scoreCardValues.json", function (json) {
    // console.log(json); 
    loadScoreCardValues(json);
  });
}

function loadScoreCardValues(values) {
  for (x in values) {
    document.getElementById(values[x].name).innerHTML = values[x].value;
  }
}
var menu = [];

function createJson() {
  toggleSpinner('on');
  $.when(
      $.ajax(pm1Data(0, '')),
      $.ajax(pm2Data(0, '')),
      $.ajax(pm3Data(0, '')),
      $.ajax(pm4Data(0, '')),
      $.ajax(pm5Data(0, '')),
      $.ajax(pm6Data(0, '')),
      $.ajax(pm7Data(0, '')),
      $.ajax(pm8Data(0, '')),
      $.ajax(pm9Data(0, '')),
      $.ajax(pm10Data(0, '')),
      $.ajax(pm11Data(0, '')),
      $.ajax(pm12Data(0, '')),
      $.ajax(pm13Data(0)),
      $.ajax(pm14Data(0)),
      $.ajax(pm15Data(0)),
      $.ajax(pm16Data(0)),
      $.ajax(pm17Data(0)),
      $.ajax(pm18Data(0, '')),
      $.ajax(pm19Data(0, '')),
      $.ajax(pm20Data(0, '')),
      $.ajax(pm21Data(0, '')),
      $.ajax(pm22Data(0, '')),
      $.ajax(pm24Data(0, 'f')),
      $.ajax(pm24Data(0, 'd')),
      $.ajax(pm25Data(0, 'd')),
      $.ajax(pm25Data(0, 't')),
      $.ajax(pm25Data(0, 'f')),
      $.ajax(pm26Data(0, 'd')),
      $.ajax(pm26Data(0, 't')),
      $.ajax(pm26Data(0, 'f'))
    )
    .done(function () {
      console.log("values read");
      console.log(menu);
      // exportToJsonFile(menu);
      toggleSpinner('off');
    })
    .fail(function (error) {
      alert("Error loading data. \nCheck your internet connection or\ncontact Sonia Perez at:\nsperez@epmpo.org")
      console.log(error)
    });
}

"use strict";

function exportToJsonFile(jsonData) {
  let dataStr = JSON.stringify(jsonData);
  let dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

  let exportFileDefaultName = 'data.json';

  let linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

/**
 * Benchmark
 * 
 */
let benchmarkData = [];
let benchmarkDataMaster = [];

function demoBenchmark(type) {
  currentType = type;
  $.when(
    $.ajax(getPMData(1))
  //  $.ajax(getPMData(2)),
  //  $.ajax(getPMData(3)),
  //  $.ajax(getPMData(4),
  //    $.ajax(getPMData(11)),
  //    $.ajax(getPMData(12)),
  //    $.ajax(getPMData(18)),
  ///    $.ajax(getPMData(19)),
  //    $.ajax(getPMData(20)),
  //    $.ajax(getPMData(22)),
  //    $.ajax(getPMData(24)),
  //    $.ajax(getPMData(25)),
  //    $.ajax(getPMData(26))
    ).done(function () {
      console.log("Data for Benchmark is ready");
    })
}


function getPMData(pm) {
  // corridorSwitch(pm, "REGIONAL"),
  $.when(
    $.ajax(corridorSwitch(pm, "alameda_buffer")),
    $.ajax(corridorSwitch(pm, "artcraft_buffer")),
    $.ajax(corridorSwitch(pm, "doniphan_buffer")),
    $.ajax(corridorSwitch(pm, "dyer_buffer")),
    $.ajax(corridorSwitch(pm, "eastlake_buffer")),
    $.ajax(corridorSwitch(pm, "horizon_buffer")),
    $.ajax(corridorSwitch(pm, "mcnutt_buffer")),
    $.ajax(corridorSwitch(pm, "mesa_buffer")),
    $.ajax(corridorSwitch(pm, "montana_buffer")),
    $.ajax(corridorSwitch(pm, "montwood_buffer")),
    $.ajax(corridorSwitch(pm, "socorro_buffer")),
    $.ajax(corridorSwitch(pm, "yarbrough_buffer")),
    $.ajax(corridorSwitch(pm, "zaragoza_buffer"))
    .done(function () {
      console.log("PM:" + pm + " read");
    }))
}

function corridorSwitch(pm, corr) {
  if (pm == 1) {
    pm1Data(3, corr);
  }
  if (pm == 2) {
    pm26Data(3, corr);
  }
  if (pm == 3) {
    pm18Data(3, corr);
  }
  if (pm == 4) {
    pm26Data(3, corr);
  }
  if (pm == 11) {
    pm18Data(3, corr);
  }
  if (pm == 12) {
    pm26Data(3, corr);
  }
  if (pm == 18) {
    pm18Data(3, corr);
  }
  if (pm == 19) {
    pm26Data(3, corr);
  }
  if (pm == 20) {
    pm18Data(3, corr);
  }
  if (pm == 22) {
    pm26Data(3, corr);
  }
  if (pm == 24) {
    pm18Data(3, corr);
  }
  if (pm == 25) {
    pm26Data(3, corr);
  }
  if (pm == 26) {
    pm26Data(3, corr);
  }
  return 0;
}

function MakebenchmarkJson() {
  let pmlist = [18, 19, 26];
  for (item in pmlist) {
    benchmarkPMConverter(pmlist[item]);
  }
}

function benchmarkPMConverter(pm) {
  var benchmarkItem = {
    type: currentType,
    pm: pm,
    title: '',
    Regional: "0",
    Alameda: "0",
    'Artcraft Domenici': "0",
    Doniphan: "0",
    Dyer: "0",
    Eastlake: "0",
    Horizon: "0",
    McNutt: "0",
    Mesa: "0",
    Montana: "0",
    Montwood: "0",
    Socorro: "0",
    Yarbrough: "0",
    Zaragoza: "0"
  }
  for (item in benchmarkData) {
    if (benchmarkData[item].pm == pm) {
      if (benchmarkData[item].corridor == "ALAMEDA") {
        benchmarkItem.Alameda = benchmarkData[item].value;
      } else if (benchmarkData[item].corridor == "Artcraft/Domenici") {
        benchmarkItem['Artcraft Domenici'] = benchmarkData[item].value;
      } else if (benchmarkData[item].corridor == "DONIPHAN") {
        benchmarkItem.Doniphan = benchmarkData[item].value;
      } else if (benchmarkData[item].corridor == "DYER") {
        benchmarkItem.Dyer = benchmarkData[item].value;
      } else if (benchmarkData[item].corridor == "EASTLAKE") {
        benchmarkItem.Eastlake = benchmarkData[item].value;
      } else if (benchmarkData[item].corridor == "HORIZON") {
        benchmarkItem.Horizon = benchmarkData[item].value;
      } else if (benchmarkData[item].corridor == "MCNUTT") {
        benchmarkItem.McNutt = benchmarkData[item].value;
      } else if (benchmarkData[item].corridor == "MESA") {
        benchmarkItem.Mesa = benchmarkData[item].value;
      } else if (benchmarkData[item].corridor == "MONTANA") {
        benchmarkItem.Montana = benchmarkData[item].value;
      } else if (benchmarkData[item].corridor == "MONTWOOD") {
        benchmarkItem.Montwood = benchmarkData[item].value;
      } else if (benchmarkData[item].corridor == "SOCORRO") {
        benchmarkItem.Socorro = benchmarkData[item].value;
      } else if (benchmarkData[item].corridor == "YARBROUGH") {
        benchmarkItem.Yarbrough = benchmarkData[item].value;
      } else if (benchmarkData[item].corridor == "ZARAGOZA") {
        benchmarkItem.Zaragoza = benchmarkData[item].value;
      }
    }

  }
  benchmarkDataMaster.push(benchmarkItem);
}

function benchmark_PM_Info_Converter() {
  var benchmarkItem = {
    mode: '',
    pm: '',
    title: '',
    Regional: "0",
    Alameda: "0",
    'Artcraft Domenici': "0",
    Doniphan: "0",
    Dyer: "0",
    Eastlake: "0",
    Horizon: "0",
    McNutt: "0",
    Mesa: "0",
    Montana: "0",
    Montwood: "0",
    Socorro: "0",
    Yarbrough: "0",
    Zaragoza: "0"
  }
  for (item in benchmarkData) {
    console.log(benchmarkData[item].corridor);
    if (benchmarkData[item].corridor == "ALAMEDA") {
      benchmarkItem.Alameda = benchmarkData[item].value;
    } else if (benchmarkData[item].corridor == "Artcraft Domenici") {
      benchmarkItem['Artcraft Domenici'] = benchmarkData[item].value;
    } else if (benchmarkData[item].corridor == "DONIPHAN") {
      benchmarkItem.Doniphan = benchmarkData[item].value;
    } else if (benchmarkData[item].corridor == "DYER") {
      benchmarkItem.Dyer = benchmarkData[item].value;
    } else if (benchmarkData[item].corridor == "EASTLAKE") {
      benchmarkItem.Eastlake = benchmarkData[item].value;
    } else if (benchmarkData[item].corridor == "HORIZON") {
      benchmarkItem.Horizon = benchmarkData[item].value;
    } else if (benchmarkData[item].corridor == "MCNUTT") {
      benchmarkItem.McNutt = benchmarkData[item].value;
    } else if (benchmarkData[item].corridor == "MESA") {
      benchmarkItem.Mesa = benchmarkData[item].value;
    } else if (benchmarkData[item].corridor == "MONTANA") {
      benchmarkItem.Montana = benchmarkData[item].value;
    } else if (benchmarkData[item].corridor == "MONTWOOD") {
      benchmarkItem.Montwood = benchmarkData[item].value;
    } else if (benchmarkData[item].corridor == "SOCORRO") {
      benchmarkItem.Socorro = benchmarkData[item].value;
    } else if (benchmarkData[item].corridor == "YARBROUGH") {
      benchmarkItem.Yarbrough = benchmarkData[item].value;
    } else if (benchmarkData[item].corridor == "ZARAGOZA") {
      benchmarkItem.Zaragoza = benchmarkData[item].value;
    }
  }
  benchmarkDataMaster.push(benchmarkItem);
}