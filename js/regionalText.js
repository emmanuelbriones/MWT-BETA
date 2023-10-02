/**
 * Handles Regional Text, Handles Spinner
 * Receives Data from PM then creates text and graphs from that Data
 */
let active = false;
function regionalText(data) {

    if (active == true) {
        canvasSafeDelete('chartG');
    }
    active = false;

    toggleHolderSwitch('off');
    toggleHolderBiking('off');
    toggleHolderKeyStations('off');
    toggleHolderKeyDestinations('off');
    toggleRadio('off');
    toggleVisibilityCorr('off');
    toggleNav('off');

    if (currentPM == 1) {
        pm1R(data);
    }
    else if (currentPM == 2) {
        active = true;
        pm2R(data);
    }
    else if (currentPM == 3) {
        pm3R(data);
    }
    else if (currentPM == 4) {
        pm4R(data);
    }
    else if (currentPM == 5) {
        pm5R(data);
    }
    else if (currentPM == 6) {
        pm6R(data);
    }
    else if (currentPM == 7) {
        pm7R(data);
    }
    else if (currentPM == 8) {
        pm8R(data);
    }
    else if (currentPM == 9) {
        pm9R(data);
    }
    else if (currentPM == 10) {
        pm10R(data);
    }
    else if (currentPM == 11) {
        pm11R(data);
    }
    else if (currentPM == 12) {
        pm12R(data);
    }
    else if (currentPM == 13) {
        pm13R(data);
    }
    else if (currentPM == 14) {
        pm14R(data);
    }
    else if (currentPM == 15) {
        pm15R(data);
    }
    else if (currentPM == 16) {
        pm16R(data);
    }
    else if (currentPM == 17) {
        pm17R(data);
    }
    else if (currentPM == 18) {
        pm18R(data);
    }
    else if (currentPM == 19) {
        pm19R(data);
    }
    else if (currentPM == 20) {
        pm20R(data);
    }
    else if (currentPM == 21) {
        pm21R(data);
    }
    else if (currentPM == 22) {
        pm22R(data);
    }
    else if (currentPM == 24) {
        pm24R(data);
    }
    else if (currentPM == 25) {
        pm25R(data);
    }
    else if (currentPM == 26) {
        pm26R(data);
    }
}
function pm1R(data) {
    let pm1RText = data.SOV.toFixed(1) + "% of workers living in the El Paso MPO area reported to drive alone during their commute to work,"
        + "therefore only " + data.NonSOV.toFixed(1) + "% of workers commute via non-SOV modes, which includes carpooled via car, truck, or van. Workers"
        + "used Public Transport means such as bus or trolley bus, streetcar or trolley car, subway or elevated railroad, railroad,"
        + " and ferryboat. Some workers also used a taxicab, motorcycle, bicycle, walking, and other means to go to work or they worked"
        + " at home.";
    pm1Text(pm1RText, data)
}
function pm2R(data) {
    let text = " During 2014-2018 " + data.Transit.toFixed(1) + "% of workers reported to commute by public transit, " + data.Biking.toFixed(2) + "% of workers bike, " + data.Walking.toFixed(1) + "% of workers living in the El Paso MPO area reported to walk to work, and " + data.Non_SOV.toFixed(1) + "% of workers used other means.";
    pm2Text(text, data);

}
function pm24R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm24BarGraph(ctx, data);

    headerAdder("Travel time index", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");

    paragraphAdder("In the El Paso MPO region, the average travel time index is " + data.ttiAvg + ". In " + data.percentGreater.toFixed(2) + "% (" + data.sumGreater.toFixed(2) + " miles) of roadways, the travel time index is 1.5 and greater.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2019", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("2019 Congestion Management process assessment tools (COMPAT).  ", "https://compat.tti.tamu.edu/");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("The travel time index is categorized in the following travel times: 1-1.1, 1.1-1.2, 1.2-1.3, 1.3-1.5, and more than 1.5. This performance measure shows the travel time index for passenger vehicles as well as commercial vehicles in the El Paso MPO region based on data reported in the National Performance Management Research Data Set (NPMRDS). The number of miles are summed per categorization and displayed in the graph.  ", "paragraph", "calc-info");
    if (detectmob() != true) {
        //legend elements
        names = ['0', '1-1.1', '1.11-1.2', '1.21-1.3', '1.31-1.5', '1.51 >'];
        colors = ['background:#9E9E9E;', 'background:#03A9F4;', 'background:#CDDC39;', 'background:#FFEB3B;', 'background:#FFAB40;', 'background:#d50000'];
        legendMaker("Legend", names, colors);
    }
    openNav();
}

function pm18R(data) {
    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');

    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');

    pm18StackedChart(ctx2, data);
    pm18chartLine(ctx, data);
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("\u00B9Total Fatalities: The total number of fatalities in crashes involving all types of transportation modes.", "paragraph", "legend-info");

    if (currentType == 'driving') {
        headerAdder("Number of Fatalities - Driving", "title");
        paragraphAdder("During a 5-year period (2018-2022), a total of " + commafy(data.crashCount) + " motor vehicle crashes occurred in the El Paso MPO region and " + data.crashCountDK + " of those crashes* resulted in fatalities. A total of " + data.dtot + " fatalities resulted from these crashes*.", "paragraph", "summary-info");
        paragraphAdder("* Excluding crashes involving truck vehicles, pedestrians and pedalcyclists", "paragraph", "summary-info");
    }
    else if (currentType == 'freight') {
        headerAdder("Number of Fatalities - Freight", "title");
        paragraphAdder("During a 5-year period (2018-2022), a total of " + commafy(data.crashCount) + " motor vehicle crashes occurred in the El Paso MPO region and " + data.crashCountFK + " of those crashes resulted in fatalities involving Commercial Vehicles. A total of " + data.ftot + " fatalities resulted from these crashes.", "paragraph", "summary-info");
    }
    else if (currentType == 'walking') {
        headerAdder("Number of Fatalities - Walking", "title");
        paragraphAdder("During a 5-year period (2018-2022), a total of " + commafy(data.crashCount) + " crashes occurred in the El Paso MPO region and " + data.crashCountWK + " of those crashes resulted in fatalities involving pedestrians. " + data.wtot + " pedestrians were killed.", "paragraph", "summary-info");
    }
    else if (currentType == 'biking') {
        headerAdder("Number of Fatalities - Biking", "title");
        paragraphAdder("During a 5-year period (2018-2022), a total of " + commafy(data.crashCount) + " crashes occurred in the El Paso MPO region and " + data.crashCountBK + " of those crashes resulted in fatalities involving bicyclists. " + data.btot + " bicyclists were killed.", "paragraph", "summary-info");
    }

    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2018 - 2022", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Crash data provided by TxDOT and NMDOT.", "paragraph", "data-info");
    paragraphAdder("Note: Data not yet reported by NMDOT for year 2022", "paragraph", "data-info");
    paragraphAdder("Performance Measure Description:", "subtitle", "calc-title");

    if (currentType == 'driving') {
        paragraphAdder("This performance measure provides the total number of fatalities resulting from motor vehicle crashes excluding crashes involving commercial truck vehicles, pedestrians and pedalcyclists.", "paragraph", "calc-info");
    }
    else if (currentType == 'freight') {
        paragraphAdder("This performance measure provides the total number of fatalities resulting from motor vehicle crashes involving commercial truck vehicles.", "paragraph", "calc-info");
    }
    else if (currentType == 'walking') {
        paragraphAdder("This performance measure provides the total number of pedestrian fatalities resulting from pedestrian-vehicle crashes.", "paragraph", "calc-info");
    }
    else if (currentType == 'biking') {
        paragraphAdder("This performance measure provides the total number of pedalcyclists fatalities resulting from pedalcyclists-vehicle crashes.", "paragraph", "calc-info");
    }
    if (detectmob() != true) {
        //legend elements
        names = ['5 Year Period Crash With Fatality'];
        colors = ['background:#000000;'];
        legendMaker("Fatalities", names, colors);
    }
    // if (currentType == 'driving') {
    //     if (detectmob() != true) {
    //         let names = ['Location of Crash With Fatality'];
    //         let images = ["./img/markers/bullet.png"];
    
    //         legendMakerImage("Legend", names, images);
    //     }
    // }
    openNav();
}
function pm19R(data) {
    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');
    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');

    pm19StackedChart(ctx2, data);

    if (currentType == 'driving') {
        headerAdder("Number Serious Injuries - Driving", "title");
        paragraphAdder("During a 5-year period (2018-2022), a total of " + commafy(data.crashCount) + " motor vehicle crashes occurred in the El Paso MPO region and " + data.crashCountDK + " of those crashes* resulted in serious injuries. A total of " + data.dtot + " persons sustained serious injuries resulting from these crashes*.", "paragraph", "summary-info");
        paragraphAdder("* Excluding crashes involving truck vehicles, pedestrians and pedalcyclists", "paragraph", "summary-info");
    }
    else if (currentType == 'freight') {
        headerAdder("Number Serious Injuries - Freight", "title");
        paragraphAdder("During a 5-year period (2018-2022), a total of " + commafy(data.crashCount) + " motor vehicle crashes occurred in the El Paso MPO region and " + data.crashCountFK + " of those crashes resulted in serious injuries involving Commercial Vehicles. A total of " + data.ftot + " persons sustained serious injuries in resulting from these crashes.", "paragraph", "summary-info");
    }
    else if (currentType == 'walking') {
        headerAdder("Number Serious Injuries- Walking", "title");
        paragraphAdder("During a 5-year period (2018-2022), a total of " + commafy(data.crashCount) + " crashes occurred in the El Paso MPO region and " + data.crashCountWK + " of those crashes resulted in serious injuries involving pedestrians. " + data.wtot + " pedestrians were seriously injured.", "paragraph", "summary-info");
    }
    else if (currentType == 'biking') {
        headerAdder("Number Serious Injuries - Biking", "title");
        paragraphAdder("During a 5-year period (2018-2022), a total of " + commafy(data.crashCount) + " crashes occurred in the El Paso MPO region and " + data.crashCountBK + " of those crashes resulted in serious injuries involving bicyclists. " + data.btot + " bicyclits were seriously injured.", "paragraph", "summary-info");
    }

    pm19chartLine(ctx, data);
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2018 - 2022", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Crash data provided by TxDOT and NMDOT.", "paragraph", "data-info");
    paragraphAdder("Note: Data not yet reported by NMDOT for year 2022", "paragraph", "data-info");
    paragraphAdder("Performance Measure Description:", "subtitle", "calc-title");

    if (currentType == 'driving') {
        paragraphAdder("This performance measure provides the total number of persons sustaining serious injuries resulting from motor vehicle crashes excluding crashes involving truck vehicles, pedestrians and pedalcyclists.", "paragraph", "calc-info");
    }
    else if (currentType == 'freight') {
        paragraphAdder("This performance measure provides the total number of persons sustaining serious injuries resulting from motor vehicle crashes involving commercial truck vehicles.", "paragraph", "calc-info");
    }
    else if (currentType == 'walking') {
        paragraphAdder("This performance measure provides the total number of pedestrians sustaining serious injuries resulting from pedestrian-vehicle crashes.", "paragraph", "calc-info");
    }
    else if (currentType == 'biking') {
        paragraphAdder("This performance measure provides the total number of pedalcyclists sustaining serious injuries resulting from pedalcyclists-vehicle crashes.", "paragraph", "calc-info");
    }
    paragraphAdder("\u00B9Total Serious Injuries: The total number of persons sustaining serious injuries in crashes involving all types of transportation modes.", "paragraph", "legend-info");
    if (detectmob() != true) {
        //legend elements
        names = ['5 Year Period Crash With Serious Injuries'];
        colors = ['background:#000000;'];
        legendMaker("Serious Injuries", names, colors);
    }
    openNav();
}
function pm25R(data) {
    headerAdder("Pavements in poor condition", "title");
    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');
    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    pm25StackedChart(ctx, data);
    pm25chartLine(ctx2, data);
    paragraphAdder("\u00B9As of May 31, 2023, latest available shapefiles: 2021 for Texas and 2020 for New Mexico. For year 2021, bar chart figure only shows lane-milage condition for El Paso, Texas.", "paragraph", "legend-info");
    paragraphAdder("\u00B2Performance Measures for years 2017 and 2018 were calculated based on the IRI threshold only. As per FHWA requirements, starting in 2019, the new metric for assessing this performance measure requires the calculation of an overall performance measure depending the type of pavement that is based on IRI, percent cracking, rutting, and faulting thresholds. See How this Performance Measure was Calculated section for more information.", "paragraph", "legend-info");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("HPMS reports 2019 pavement condition for " + data.tot_miles.toFixed(1) + " miles within the El Paso MPO area. Out of those,  " + data.poor_mi_perc + "% are in poor condition. " + data.tx_poor_mi.toFixed(1) + " miles (" + data.tx_poor_mi_perc + "%) of pavement in poor condition are located in Texas and " + data.nm_poor_mi.toFixed(1) + " miles (" + data.nm_poor_mi_perc + "%) are in New Mexico.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2018-2022", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("Highway Performance Monitoring System (HPMS) Public Release of Geospatial Data in Shapefile Format", "https://www.fhwa.dot.gov/policyinformation/hpms/shapefiles.cfm");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Pavement condition was based on International Roughness Index (IRI) as defined by:", "paragraph", "calc-info");
    anchorAdder("Federal Highway Administration", "https://www.fhwa.dot.gov/policy/2013cpr/chap3.cfm#1");
    paragraphAdder("Good condition (IRI < 95), fair condition (IRI 95-170), and poor condition (IRI > 170). In this analysis, any sections with IRI = 0 are considered as entries with no data. ", "paragraph", "calc-info");

    if (detectmob() != true) {
        //legend elements
        names = ['Good Condition', 'Fair Condition', 'Poor Condition'];
        colors = ['background:#8BC34A;', 'background:#F57C00;', 'background:#d50000'];
        legendMaker("Legend", names, colors);
    }
    openNav();
}
function pm3R(data) {
    headerAdder("Transit ridership", "title");
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext("2d")
    chart_pm3(ctx, data)
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("Transit ridership decreased at a rate of 5.3% for the period of 2018-2022. Route " + commafy(parseInt(data.highRoute)) + " has the highest ridership with an average of " + commafy(data.highAvg) + " passengers. Route " + data.lowRoute + " has the lowest ridership with an average of " + commafy(data.lowAvg) + " passengers (5 years average).", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2018-2022", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Data provided by Sun Metro", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("The received data was separated by years and routes. The average ridership over the 5 years is shown in the map based on geometric interval; 0-99,999 (Green), 100,000-399,999 (Orange), 400,000 +(Blue). ", "paragraph", "calc-info");

    if (detectmob() != true) {
        let names = ['0+', '100,000+', '400,000+'];
        let colors = ['background:#078a00;', 'background:#FF9800;', 'background:#2196F3'];
        legendMaker("Passengers", names, colors);
    }
    openNav();
}
function pm4R(data) {
    let names = "";
    if (currentType == 'biking') {

        headerAdder("Biking trips recorded by Strava", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder("In 2018, a total of " + commafy(data.dataB) + " bike trips were recorded by Strava in the El Paso MPO region. ", "paragraph", "summary-info");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("2018 data licensed by Strava.", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Strava Metro data provided via a sublicense from the Texas Department of Transportation.", "paragraph", "data-info");
        paragraphAdder("How Performancep Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("This performance measure reflects the total number of bike trips on the street regardless of the direction (column TACTCNT) recorded by Strava in 2018. Trips recorded on Interstate 10 were removed from this dataset, since I-10 is a limited access facility. The legend shows the data in a geometric interval, which provides the best viewing distribution.", "paragraph", "calc-info");
        names = ['5 - 30', '30 - 479', '479 - 6,460'];

    }
    else if (currentType == 'walking') {
        headerAdder("Walking trips recorded by Strava", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder("In 2017, a total of " + commafy(data.dataW) + " walk trips were recorded by Strava in the El Paso MPO region. ", "paragraph", "summary-info");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("2017 data from Strava Metro.", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Strava Metro (2017) provided via a sublicense from the Texas Department of Transportation.", "paragraph", "data-info");
        paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("This performance measure reflects the total number of walk trips on the street regardless of the direction (column TACTCNT) recorded by Strava in 2017. Trips recorded on the Interstate 10 were removed from this dataset, since I-10 is a limited access facility. The legend shows the data in a geometric interval, which provides the best viewing distribution.", "paragraph", "calc-info");
        names = ['5.00 - 15', '16 - 129', '130 - 1,305'];
    }
    if (detectmob() != true) {
        let colors = ['background:#f44336;', 'background:#64DD17;', 'background:#9C27B0', 'background:#e53935;'];
        legendMaker("Trips", names, colors);
    }
    openNav();
}
function pm11R(data) {
    headerAdder("Sidewalks per mile", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("There are a total of " + commafy(data.sideWalks) + " miles of sidewalks along " + commafy(data.roadways) + " miles of roadways within the City of El Paso limits. Assuming that each roadway has a sidewalk on both sides, there are " + commafy(data.missing) + " miles of sidewalks missing.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Sidewalk GIS layer was provided in 2018", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("City of El Paso", "paragraph", "data-info");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Mileage of roadway network (stcent, without limited access roadways such as the Interstate 10, US 54, Loop 375, Cesar Chavez Memorial Highway, Spur 601) was compared with mileage of sidewalks. Only sidewalks with status 'complete', 'pre-existing', 'private' or 'scheduled' were included in the analysis. Sidewalks with no information about status, or status 'removed', 'unfeasible', or 'awaiting assessment' were not included in this performance measure. ", "paragraph", "calc-info");
    paragraphAdder("Note: Only the sidewalks within El Paso City limits were considered for the analysis of this performance measure.", "paragraph", "calc-info");
    openNav();
}
function pm12R(data) {
    headerAdder("Bikeway Buildout", "title");
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm12StackedChart(ctx, data);
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("In the El Paso MPO region, there are a total of " + data.pm12existing.toFixed(1) + " miles of existing bikeways and " + data.proposedMiles.toFixed(1) + " miles of proposed bikeways. If all proposed bikeways are completed, there would be a total of " + data.tot.toFixed(1) + " miles of bikeways in the El Paso MPO region.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2021 bikeway data provided.", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Bikeway data was provided by the municipalities: Paso del Norte Health foundation, City of Sunland Park, City of San Elizario and the City of El Paso. ", "paragraph", "data-info");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("The data inside the layer package had contained columns that have its status, proposed or existing, which were filtered to make a distinction between the two. The files containing existing bikeways were placed into a new, individual layer. The miles were then calculated for both existing and all bikeways.", "paragraph", "calc-info");
    openNav();
}
function pm13R(data) {
    headerAdder("Northbound border crossings", "title");
    canvasMaker('chart1', 'myChart');
    canvasMaker('chart2', 'myChart2');
    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    pm13ModeGraph(ctx, data);
    pm13Chart(ctx2, data);
    let yearRange = (data.driving.period).reduce((a, b) => Math.min(a, b)); // get smalleest year
    paragraphAdder("Summary:", "subtitle", "summary-title");
    if (currentType == "driving") {
        paragraphAdder("During a 5-year period (" + yearRange + "-" + (yearRange + 4) + "), on average " + commafy(data.text.averageD) + " personal vehicles crossed northbound at the ports of entry. The port of entry with highest personal vehicle traffic is " + data.text.greatestStation + ".", "paragraph", "summary-info");
    } else if (currentType == "freight") {
        paragraphAdder("During a 5-year period (" + yearRange + "-" + (yearRange + 4) + "), on average " + commafy(data.text.averageF) + " commercial vehicles crossed northbound at the ports of entry. The port of entry with highest commercial vehicle traffic is " + data.text.greatestStation + ".", "paragraph", "summary-info");
    } else if (currentType == "walking") {
        paragraphAdder("During a 5-year period (" + yearRange + "-" + (yearRange + 4) + "), on average " + commafy(data.text.averageW) + " pedestrians crossed northbound at the ports of entry. The port of entry with highest pedestrian traffic is " + data.text.greatestStation + ".", "paragraph", "summary-info");
    }

    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder(yearRange + "-" + (yearRange + 4), "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Customs and Border Protection, compiled by the City of El Paso International Bridges Department.", "paragraph", "data-info");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("These statistics were obtained from the City of El Paso International Bridges Department. In this context, pedestrians include people walking or bicycling.", "paragraph", "calc-info");
    openNav();
}

function pm14R(data) {
    headerAdder("Northbound border wait times", "title");
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    let latestYear = data.text.latestYear;
    if (currentType == "driving") {
        paragraphAdder("In " + latestYear + " the average wait time for personal vehicles crossing northbound at the ports of entry was " + data.text.drivingTime + " minutes. The port of entry with highest wait time for personal vehicles in  " + latestYear + " was " + data.text.driving_highest_wait_time + ". ", "paragraph", "summary-info");
        pm14DrivingChart(ctx, data);
    } else if (currentType == "freight") {
        paragraphAdder("In " + latestYear + " the average wait time for commercial vehicles crossing northbound at the ports of entry was " + data.text.freightTime + " minutes. The port of entry with highest wait time for commercial vehicles in  " + latestYear + " was " + data.text.freight_highest_wait_time + ". ", "paragraph", "summary-info");
        pm14FreightChart(ctx, data);
    } else if (currentType == "walking") {
        paragraphAdder("In " + latestYear + " the average wait time for pedestrians crossing northbound at the ports of entry was " + data.text.walkingTime + " minutes. The port of entry with highest average wait time for pedestrians in  " + latestYear + " was " + data.text.walking_highest_wait_time + ". ", "paragraph", "summary-info");
        pm14WalkingChart(ctx, data);
    }

    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder((latestYear - 4) + "-" + latestYear, "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Customs and Border Protection, compiled by the City of El Paso International Bridges Department. ", "paragraph", "data-info");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("These statistics were obtained from the City of El Paso International Bridges Department. In this context, pedestrians include people walking or bicycling. Wait times for Santa Teresa and Tornillo were not available at the time of analysis.  Wait times estimates are determined using either a manual, line-of-sight methodology via predetermined benchmarks or an automated system. For more info related with wait times refer to:", "paragraph", "calc-info");
    anchorAdder("https://bwt.cbp.gov/", "https://bwt.cbp.gov/");
    openNav();
}
function pm26R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    chart_pm26(ctx, data);
    headerAdder("Bridge & Culvert Condition", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("Within the El Paso MPO area, there are " + data.good_count[4] + " bridges (" + data.good[4] + "%) in Good condition, " + data.fair_count[4] + " bridges (" + data.fair[4] + "%) in Fair condition, " + data.poor_count[4] + " bridges (" + data.poor[4] + "%) in Poor condition.", "paragraph", "summary-info");
    paragraphAdder("Condition data was not available for " + data.tnodatabridges + " bridges within the El Paso MPO area.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Bridges condition data as of 2018", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Bridge condition data was provided by TxDOT and NMDOT.", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Bridge condition rating is based on the lowest condition rating from the following components: deck, substructure, superstructure or culvert.", "paragraph", "calc-info");
    paragraphAdder("Following the FHWA guidance, bridges with lowest rating between 7 and 9 are classified as Good, those rated 6 or 5 are classified as Fair and bridges with lowest rating 4 or below are classified as Poor.", "paragraph", "calc-info");
    paragraphAdder("More information about Bridge Condition Performance can be found at this TxDOT website: ", "paragraph", "calc-info");
    anchorAdder(1, "https://gis-txdot.opendata.arcgis.com/datasets/83af0d2957ca4c2eb340e4bd04a1046f_0/data?geometry=-134.852%2C24.539%2C-65.287%2C37.659");
    openNav();
}
function pm22R(data) {
    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');
    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    pm22chartLine(ctx, data);
    pm22StackedChart(ctx2, data);

    headerAdder("Number of crashes on the CMP network", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("During a 5-year period (2018-2022), a total of " + commafy(data.dynamic_txt_val) + " crashes occurred on the El Paso MPO Congestion Management Process (CMP) network.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2018 - 2022", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Crash data provided by TxDOT and NMDOT.", "paragraph", "data-info");
    paragraphAdder("Note: Data not yet reported by NMDOT for year 2022", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("This performance measures includes all crashes that occurred within 150 ft. of the CMP network adopted by the MPO in 2023.  ", "paragraph", "calc-info");
    if (detectmob() != true) {
        let names = ['>10,000', '1,000-10,000', '100-1,000', '10-100', '1-10'];
        let colors = ['background:#8A2BE2;', 'background:#FF00FF;', 'background:#FF0000;', 'background:#FFBF00;', 'background:#1E90FF;'];

        legendMaker("Total Number Crashes", names, colors);
    }
    openNav();
}
function pm5R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm5chart(ctx, data);
    headerAdder("Jobs within ½ mile of high-quality rapid transit", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("There are a total of " + commafy(data.totJobs) + " jobs in the El Paso MPO region. Out of those, " + data.jobsPercent.toFixed(1) + "% are within a half-mile of BRT stations.  Once all proposed BRT stations are built, there will be a total of " + data.totalJobsPercent.toFixed(1) + "% jobs within a half-mile of BRT stations.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Data from 2018 LEHD files, 2018 Tigerline shapefile ", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("TIGER/Line Shapefiles", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2018.html");
    anchorAdder("Longitudinal Employer-Household Dynamics (LEHD) files", "https://lehd.ces.census.gov/data/");
    paragraphAdder("The layer of the high-quality transit stations was provided by Sun Metro.  ", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("LEHD worskplace area characteristics (WAC) data was analysed on a census block group-level in order to estimate the population within ½  mile of high-quality rapid transit, assuming a homogenous distribution of population each the block group.", "paragraph", "calc-info");
    //adds toggle function
    toggleHolderSwitch('on');
    openNav();

}
function pm9R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm9chart(ctx, data);
    headerAdder("Population within ½ mile of high-quality rapid transit.", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("There are a total of " + commafy(data.totPop) + " people residing in the El Paso MPO region. Out of those, " + data.peopleLivingTransit.toFixed(1) + "% people live within a half-mile of BRT stations.  Once all proposed BRT stations are built, there will be a total of " + data.totalpeopleLivingTransit.toFixed(1) + "% people living within a half-mile of BRT stations.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Data from 2018 LEHD files, 2014-2018 ACS data", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("American Community Survey 5-Year Estimates & TIGER/Line Shapefiles.", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-data.2016.html");
    anchorAdder("The layer of the high-quality transit stations was provided by Sun Metro.   ", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2016.html");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("American Community Survey data was analysed on a census block group-level in order to estimate the population within ½ mile of high-quality rapid transit, assuming a homogenous distribution of population each the block group.", "paragraph", "calc-info");
    toggleHolderSwitch('on');
    openNav();
}
function pm6R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm6chart(ctx, data);
    headerAdder("Jobs within ½ mile of bikeways", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("In the El Paso MPO region, there are a total of " + commafy(data.totJobs) + " jobs. In a half-mile of existing bikeways, there are a total of " + data.jobsPercent.toFixed(2) + "% jobs.  Once all proposed bikeways are completed, there will be a total of " + data.totalJobsPercent.toFixed(2) + "% jobs within a half-mile of bikeways.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Data from 2015 LEHD files, 2017 Tigerline shapefile, and bikeway data from 2018.", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("TIGER/Line Shapefiles", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2018.html");
    anchorAdder("Longitudinal Employer-Household Dynamics (LEHD) files", "https://lehd.ces.census.gov/data/");
    paragraphAdder("Bikeway data was provided by the following entities in January 2019: Paso del Norte Health foundation, City of Sunland Park, City of San Elizario, and the City of El Paso.   ", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("LEHD workplace area characteristics (WAC) data was analysed on a census block group-level in order to estimate the number of jobs within a ½ mile from a bikeway, assuming a homogenous distribution of jobs each the block group.", "paragraph", "calc-info");
    toggleHolderBiking('on');
    openNav();
}
function pm10R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm10chart(ctx, data);
    headerAdder("Population within 1/2 mile (Sample).", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("There are " + commafy(data.totPop) + " people residing in the El Paso MPO region who where surveyed. There are " + data.peopleLivingTransit.toFixed(2) + "%  people living within a half-mile of existing bikeways.  Once all proposed bikeways are complete, there will be a total of " + data.totalpeopleLivingTransit.toFixed(2) + "% people living within a half-mile of bikeways.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Data from the 2012-2016 ACS data and 2019 Transit data ", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("American Community Survey 5-Year Estimates", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-data.2016.html");
    anchorAdder("TIGER/Line Shapefiles", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2018.html");
    paragraphAdder("Bikeway data was provided by the municipalities: Paso del Norte Health foundation, City of Sunland Park, City of San Elizario, and the City of El Paso.", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("American Community Survey data was analysed on a census block group-level in order to estimate the number of jobs within a ½ mile from a bikeway, assuming a homogenous distribution of jobs for each block group. ", "paragraph", "calc-info");
    toggleHolderBiking('on');
    openNav();
}

function pm7R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm7HorizontalBar(ctx, data);

    headerAdder("Key destinations within ½ mile of high-quality rapid transit", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("There are a total of " + data.totKeyDest + " key destinations in the El Paso MPO region. Out of those, " + data.percentKeyD1.toFixed(1) + "% are within a half-mile of existing BRT stations.  Once all proposed BRT stations are built, there will be a total of " + data.percentKeyD2.toFixed(1) + "% key destinations within a half-mile of BRT stations.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2019 Transit data", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("The layer of the high-quality transit stations was provided by Sun Metro. Key destinations were identified from the EPMPO 2040 Horizon Model – Model Development Report and leisure time activity locations were identified from Visit El Paso website.", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("A ½ mile buffer was drawn around existing high-quality rapid transit and the number of key destinations within the buffer was calculated. This analysis was also done for proposed high-quality rapid transit, to indicate the potential result if all high-quality rapid transit in existing plans were completed.", "paragraph", "calc-info");
    toggleHolderKeyStations('on');
    openNav();
}

function pm8R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm8HorizontalBar(ctx, data);
    headerAdder("Key destinations within ½ mile of bikeways", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("There are a total of " + data.totKeyDest + " key destinations in the El Paso MPO region. Out of those, " + data.percentKeyD1.toFixed(1) + "% are within half-mile of existing bikeways.  Once all proposed bikeways are built, there will be a total of " + data.percentKeyD2.toFixed(1) + "% key destinations within a half-mile of bikeways. ", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Data was provided by various local agencies in 2019 ", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Paso del Norte Health Foundation.", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("A ½ mile buffer was drawn around existing bikeways and the number of key destinations within the buffer was calculated. This analysis was also done for proposed bikeways, to indicate the potential result if all bikeways in existing plans were completed.", "paragraph", "calc-info");
    toggleHolderKeyDestinations('on');
    openNav();
}

function pm15R(data) {
    canvasMaker('chart1', 'myChart');
    canvasMaker('chart2', 'myChart2');
    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    pm15chartLine(ctx, data);
    pm15chartLine2(ctx2, data);
    headerAdder("Ozone emissions ", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("The Air Quality System (AQS) contains ambient air pollution data collected by air pollution control monitors. Stations with the highest annual readings for each pollutant are:", "paragraph", "summary-info");
    paragraphAdder("Texas: Skyline Park in 2019. " , "paragraph", "summary-info");
    paragraphAdder("New Mexico: Santa Teresa in 2017." , "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2018-2022", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("Texas Commission on Environmental Quality website", "https://tceq.maps.arcgis.com/apps/webappviewer/index.html?id=ab6f85198bda483a997a6956a8486539");

    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Annual readings are reported exactly as they appear at the EPA’s National Air Quality: Status and Trends of Key Air Pollutants website.\n\
    The design value is the 3-year average of the annual 4th highest daily maximum 8-hour ozone concentration.  Only valid design values are shown.\n\
    The level of the 2015 8-hour ozone NAAQS is 0.070 parts per million (ppm).\n\
    The design values shown here are computed using Federal Reference Method or equivalent data reported to EPA's Air Quality System (AQS) as of May 22, 2023.\n\
    Concentrations flagged by State, Tribal, or Local monitoring agencies as having been affected by an exceptional event (e.g., wildfire, volcanic eruption) and concurred by the associated EPA Regional Office are not included in these calculations.", "paragraph", "calc-info");
    
    // Add the note paragraph
    paragraphAdder("Disclaimer: The information presented in this tool is intended for information use only and does not constitute a regulatory determination by EPA as to whether an area has attained a NAAQS. Not all monitors collected data for all three pollutants, also not all monitors have data for the full 5-year period. ", "paragraph", "calc-info");
    if (detectmob() != true) {
        let names = ['Attainment', 'Non-attainment'];
        let colors = ['background:#008000;', 'background:#FF0000;'];
    
        legendMaker("Attainment Status", names, colors);
    }
    openNav();
}

function pm16R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm16chartLine(ctx, data);
    headerAdder("Carbon monoxide emissions", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("If there is an absence of information for a specific year, it indicates that no measurements were recorded during that particular time period.  ", "paragraph", "summary-info");
   
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2016-2022", "paragraph", "analysis-info");
   
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("1971 8-hour NAAQS for carbon monoxide is 9 parts per million (ppm).\n\
    1: The level of the 1971 8-hour NAAQS for carbon monoxide is 9 parts per million (ppm) not to be exceeded more than once per year. The design value is evaluated over a two-year period. Specifically, the design value is the higher of each year's annual second maximum, non-overlapping 8-hour average. Only valid design values are shown\n\. 2: The design values shown here are computed using Federal Reference Method or equivalent data reported by State, Tribal, and Local monitoring agencies to EPA's Air Quality System (AQS) as of May 2, 2023. Concentrations flagged by State, Tribal, or Local.", "paragraph", "calc-info");
    paragraphAdder("*Disclaimer: The information presented in this tool is intended for information use only and does not constitute a regulatory determination by EPA as to whether an area has attained a NAAQS.", "paragraph", "calc-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    
    anchorAdder("https://www.epa.gov/air-trends/air-quality-design-values#report Last Updated on May 22, 2023");
    openNav();
}

function pm17R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm17chartLine(ctx, data);
    headerAdder("24-Hr PM¹⁰ Annual Estimated Exceedances Under Update", "title");

    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("The Air Quality System (AQS) contains ambient air pollution data collected by air pollution control monitors.  In 1987, EPA set the NAAQS coarse particulate matter (PM¹⁰), at a level of 150 µg/m³. ", "paragraph", "summary-info");
    paragraphAdder(" The design value is the 24-hr average not to be exceeded more than once per year on average over 3 years. Stations with the highest estimated number of exceedances:", "paragraph", "summary-info");
    paragraphAdder("•Texas: El Paso Mimosa in period 2020-2022. ", "paragraph", "summary-info");
    paragraphAdder("•New Mexico: 6ZM Desert View in period 2020-2022. ", "paragraph", "summary-info");

    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2018-2022", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("https://www.epa.gov/air-trends/air-quality-design-values#report", "https://www.epa.gov/air-trends/air-quality-design-values#report", );
    anchorAdder("Last Updated May 2023" );
    

    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
paragraphAdder("Annual readings are reported exactly as they appear at the EPA’s National Air Quality: Status and Trends of Key Air Pollutants website.", "paragraph", "calc-info");
paragraphAdder("•The NAAQS metric is the annual estimated number of exceedances (ENE), averaged over three consecutive years. Only valid average estimated exceedance values are shown.", "paragraph", "calc-info");
paragraphAdder("•The level of the 1987 24-hour PM¹⁰ NAAQS is 150 micrograms per cubic meter (µg/m3).", "paragraph", "calc-info");
paragraphAdder("•The design values shown here are computed using Federal Reference Method or equivalent data reported to EPA's Air Quality System (AQS) as of May 23, 2023.", "paragraph", "calc-info");
paragraphAdder("•Concentrations flagged by State, Tribal, or Local monitoring agencies as having been affected by an exceptional event (e.g., wildfire, volcanic eruption) and concurred by the associated EPA Regional Office are not included in these calculations.", "paragraph", "calc-info");

// Add the note paragraph
paragraphAdder("Disclaimer: The information presented in this tool is intended for information use only and does not constitute a regulatory determination by EPA as to whether an area has attained a NAAQS. Not all monitors collected data for all three pollutants, also not all monitors have data for the full 5-year period. ", "paragraph", "calc-info");
if (detectmob() != true) {
    let names = ['Attainment', 'Non-attainment'];
    let colors = ['background:#008000;', 'background:#FF0000;'];

    legendMaker("Attainment Status", names, colors);
}


openNav();

}

function pm20R(data) {
    if (currentType == "walking") {
        headerAdder("Pedestrians crashes nearby bus stops", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        if (data.w_greatest == 0) {
            paragraphAdder("No pedestrian crashes in El Paso region occurred within 200 feet of transit stops.", "paragraph", "summary-info");
        }
        else if (data.w_greatestCounter == 1) {
            paragraphAdder(data.percentPed.toFixed(2) + "% of all pedestrian crashes in El Paso region occurred within 200 feet of transit stops.", "paragraph", "summary-info");
        } else if (data.w_greatestCounter > 1) {
            paragraphAdder(data.percentPed.toFixed(2) + "% of all pedestrian crashes in El Paso region occurred within 200 feet of transit stops.", "paragraph", "summary-info");
        }

    } else if (currentType == "biking") {
        headerAdder("Bicyclist crashes nearby bus stops", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        if (data.b_greatest == 0) {
            paragraphAdder("No bicyclists crashes in El Paso region occurred within 200 feet of transit stops.", "paragraph", "summary-info");
        } else if (data.b_greatestCounter == 1) {
            paragraphAdder(data.percentBike.toFixed(2) + "% of all bicyclists crashes in El Paso region occurred within 200 feet of transit stops.", "paragraph", "summary-info");
        } else if (data.b_greatestCounter > 1) {
            paragraphAdder(data.percentBike.toFixed(2) + "% of all bicyclists crashes in El Paso region occurred within 200 feet of transit stops.", "paragraph", "summary-info");
        }

    }
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Crashes 2018-2022, SunMetro bus stops as of 2019 ", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Crash data from TxDOT, location of bus stops from Sun Metro ", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("A buffer of 200 ft. was created from the bus stops to identify how many crashes occurred within that distance. The crashes are from 2018 to 2022, and the bus stop locations are as of 2019.", "paragraph", "calc-info");
    if (currentType == "walking") {
        //legend elements
        if (detectmob() != true) {
            names = ['1', '2-3', '4-6', '7-10', 'No data'];
            colors = ['background:#4CAF50;', 'background:#8BC34A;', 'background:#CDDC39;', 'background:#f44336;', 'background:#9E9E9E'];
            legendMaker("Number of accidents near bus stops", names, colors);
        }
    } else if (currentType == "biking") {
        if (detectmob() != true) {
            //legend elements
            names = ['1', '2'];
            colors = ['background:#8BC34A;', 'background:#f44336'];
            legendMaker("Number of accidents near bus stops", names, colors);
        }
    }
    openNav();
}
function pm21R(data) {
    headerAdder("Safety projects near crash hotspots", "title");

    paragraphAdder("Summary", "subtitle", "summary-title");
    paragraphAdder("This performance measures identifies 71 projects that include safety enhancements near crash hotspots. Most of these projects are included in the Metropolitan Transportation Plan Destino 2045. The location of each of the projects identified is shown on top of the regional vehicle-crash hot spot map for the period of 2018-2022. Hot spot analysis uses statistical analysis in order to define areas of high occurrence versus areas of low occurrence, in this case of traffic-related crashes (including crashes involving transit vehicles, pedestrians, and pedalcyclists).", "paragraph", "summary-info");
    
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Crash data from 2018-2022, safety projects identified from the Metropolitan Transportation Plan Destino 2045", "paragraph", "analysis-info");
    paragraphAdder("Time-step interval = 16 weeks.", "paragraph", "analysis-info");

    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Crash data provided by TxDOT and NMDOT. Destino 2045 projects identified by El Paso MPO.", "paragraph", "data-info");
    paragraphAdder("Note: Data not yet reported by NMDOT for year 2022", "paragraph", "data-info");

    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("A list of projects identified with safety enhancements has been created and georeferenced. In addition, a hot spots analysis was conducted to identify areas with significant crashes. The hot spot map shows bins color-coded to associated to historical data of crashes and their density. Each bin has a distance interval of 1 mi. by 1 mi. and it is analysed within the context of neighboring bins to measure how intense clustering is for both high and low values. The analysis detects 8 specific hot or cold spot trends. The safety projects identified are categorized with one or several hot spot trends.", "paragraph", "calc-info");
    paragraphAdder("<span class=\"fa fa-play\"></span><b> No Pattern:</b> “Does not fall into any of the hot or cold spot patterns defined below.", "paragraph", "calc-info");
    paragraphAdder("<span class=\"fa fa-play\"></span><b> New hot spot:</b> “A location that is a statistically significant hot spot for the final time step and has never been a statistically significant hot spot before.", "paragraph", "calc-info");
    paragraphAdder("<span class=\"fa fa-play\"></span><b> Consecutive hot spot:</b> “A location with a single uninterrupted run of statistically significant hot spot bins in the final time step intervals. The location has never been a statistically significant hot spot prior to the final hot spot run and less than 90% of all bins are statistically significant hot spots", "paragraph", "calc-info");
    paragraphAdder("<span class=\"fa fa-play\"></span><b> Intensifying hot spot:</b> “A location that has been a statistically significant hot spot for 90% of the time-step intervals, including the final time step. In addition, the intensity of clustering of high counts in each time step is increasing overall and that increase is statistically significant.", "paragraph", "calc-info");
    paragraphAdder("<span class=\"fa fa-play\"></span><b> Oscillating hot spot:</b> “A statistically significant hot spot for the final time-step interval that has a history of also being a statistically significant cold spot during a prior time step. Less than ninety percent of the time-step intervals have been statistically significant hot spots.", "paragraph", "calc-info");
    paragraphAdder("<span class=\"fa fa-play\"></span><b> Persistent cold spot:</b> “A location that has been a statistically significant cold spot for 90% of the time-step intervals with no discernible trend indicating an increase or decrease in the intensity of clustering over time.", "paragraph", "calc-info");
    paragraphAdder("<span class=\"fa fa-play\"></span><b> Diminishing cold spot:</b> “A location that has been a statistically significant cold spot for 90% of the time-step intervals, including the final time step. In addition, the intensity of clustering of low counts in each time step is decreasing overall and that decrease is statistically significant.", "paragraph", "calc-info");
    paragraphAdder("<span class=\"fa fa-play\"></span><b> Sporadic cold spot:</b> “A location that is an on-again then off-again cold spot. Less than 90% of the time-step intervals have been statistically significant cold spots and none of the time-step intervals have been statistically significant hot spots.", "paragraph", "calc-info");

    paragraphAdder("References", "subtitle", "ref-title");
    anchorAdder('Emerging Hot Spot Analysis', 'https://desktop.arcgis.com/en/arcmap/10.7/tools/space-time-pattern-mining-toolbox/emerginghotspots.htm');
    anchorAdder('Aggregating Points', 'https://pro.arcgis.com/en/pro-app/2.8/tool-reference/space-time-pattern-mining/create-space-time-cube.htm')

    paragraphAdder("Extra", "subtitle", "extra-title");
    paragraphAdder("<span class=\"fa fa-play\"></span><b> Persistent hot spot:</b> “A location that has been a statistically significant hot spot for ninety percent of the time-step intervals with no discernible trend indicating an increase or decrease in the intensity of clustering over time.", "paragraph", "extra-info");
    paragraphAdder("<span class=\"fa fa-play\"></span><b> Diminishing hot spot:</b> “A location that has been a statistically significant hot spot for ninety percent of the time-step intervals, including the final time step. In addition, the intensity of clustering in each time step is decreasing overall and that decrease is statistically significant.", "paragraph", "extra-info");
    paragraphAdder("<span class=\"fa fa-play\"></span><b> Sporadic hot spot:</b> “A location that is an on-again then off-again hot spot. Less than ninety percent of the time-step intervals have been statistically significant hot spots and none of the time-step intervals have been statistically significant cold spots.", "paragraph", "extra-info");

    
    names = ['No pattern', 'New Hot Spot', 'Consecutive Hot Spot', 'Oscillating Hot Spot', 'Diminishing Cold Spot', 'Persistent Cold Spot', 'Sporadic Cold Spot', 'Intensifying Hot Spot', 'Not Emerging', 'Sporadic Hot Spot'];
    colors = ['background:#8BC34A;', 'background:#FFA726', 'background:#FF4081;', 'background:#FF5722','background:#80D8FF;', 'background:#9C27B0', 'background:#1A237E;', 'background:#d50000;', 'background:#9E9E9E', 'background:#3F51B5'];
    legendMaker("Legend", names, colors);
    openNav();
}

function pm1Text(text, data) {
    canvasMaker('chart1', 'myChart');
    var ctx2pm1 = document.getElementById('myChart').getContext('2d');
    pieChartpm1(ctx2pm1, data);
    headerAdder("Drive alone", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder(text, "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2014-2018 ACS 5-Year Estimates", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("American Community Survey 5-Year Estimates", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-data.2018.html");
    anchorAdder("TIGER/Line Shapefiles and TIGER/Line Files", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2018.html");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Percent of non-single occupancy vehicle (SOV) commute is calculated as:", "paragraph", "calc-info");
    imageAdder('./img/performance_measures/pm1/pm1Eqn.PNG', 'calc-info');
    openNav();

}
/**
 * Modify and create function.
 */
function pm2Text(text, data) {
    canvasMaker('chartG', 'myChart');
    var ctx2pm1 = document.getElementById('myChart').getContext('2d');
    piechartpm2(ctx2pm1, data);
    if (currentType == "transit") {
        headerAdder("Commute by transit", "title");
    } else if (currentType == "walking") {
        headerAdder("Commute by walking", "title");
    } else if (currentType == "biking") {
        headerAdder("Commute by biking", "title");
    }
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder(text, "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2014-2018 ACS 5-Year Estimates", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("American Community Survey 5-Year Estimates", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-data.2018.html");
    anchorAdder("TIGER/Line Shapefiles and TIGER/Line Files", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2018.html");
    paragraphAdder("Means of Transportation: Bicycle: workers 16 and over (estimate) &#247 Total workers 16 years and over", "paragraph", "calc-info");
    paragraphAdder("Means of Transportation: Public Transportation (exluding cabs): workers 16 and over &#247 Total workers 16 years and over", "paragraph", "calc-info");
    paragraphAdder("Means of Transportation: Walked: workers 16 and over (estimate) &#247 Total workers 16 years and over", "paragraph", "calc-info");
    //legend elements
    if (detectmob() != true) {
        let names = ['No Data', 'Below mean', 'Above Mean'];
        let colors = ['background:#C0C0C0;', 'background:#00CCFF;', 'background:#0066CC;'];

        legendMaker("Legend", names, colors);
    }
    openNav();
}
function pm3Text() {

}
