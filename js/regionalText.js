/**
 * Handles Regional Text, Handles Spinner
 * Receives Data from PM then creates text and graphs from that Data
 */

function regionalText(data) {
    toggleHolderSwitch('off');
    toggleRadio('off');
    toggleVisibilityCorr('off');
    toggleNav('off');

    if (currentPM == 1) {
        pm1R(data);
    }
    else if (currentPM == 2) {
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
    let text = " During 2012-2016 " + data.Walking.toFixed(1)+ "% of workers living in the El Paso MPO area reported to walk to work, "+data.Biking.toFixed(2)+"% of workers bike, and "+data.Transit.toFixed(1)+"% of workers reported to commute by public transit.";
    pm2Text(text,data);

}
function pm24R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm24BarGraph(ctx, data);

    headerAdder("Travel time index", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");

    paragraphAdder("In the El Paso MPO region, the average travel time index is " + data.ttiAvg + ". In " + data.percentGreater.toFixed(2) + "% (" + data.sumGreater.toFixed(2) + " miles) of roadways, the travel time index is 1.5 and greater.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2018", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("2018 Congestion Management process assessment tools (COMPAT).  ", "https://compat.tti.tamu.edu/");
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

    pm18StackedChart(ctx2,data);
    pm18chartLine(ctx, data);
    paragraphAdder("Summary:", "subtitle", "summary-title");

    if (currentType == 'driving') {
        headerAdder("Number of Fatalities - Driving", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.crashCount) + " crashes occurred in the El Paso MPO region and " + data.crashCountDK+" (" + data.dtextPercent.toFixed(2) + "%) of those crashes resulted in fatalities. " + data.dtot + " people were killed.", "paragraph", "summary-info");

    }
    else if (currentType == 'freight') {
        headerAdder("Number of Fatalities - Freight", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.crashCount) + " crashes that involved a commercial motor vehicle (CMV) occurred in the El Paso MPO region and " + data.crashCountFK + " (" + data.dtextPercent.toFixed(2) + "%) of those crashes resulted in fatalities. " + data.ftot + " people were killed in CMV-related crashes. ", "paragraph", "summary-info");
    }
    else if (currentType == 'walking') {
        headerAdder("Number of Fatalities - Walking", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.crashCount) + " crashes that involved a pedestrian occurred in the El Paso MPO region and " + data.crashCountWK + " (" + data.dtextPercent.toFixed(2) + "%) of those crashes resulted in fatalities. " + data.wtot + " pedestrians were killed.", "paragraph", "summary-info");
    }
    else if (currentType == 'biking') {
        headerAdder("Number of Fatalities - Biking", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.crashCount) + " crashes that involved a bicyclist occurred in the El Paso MPO region and " + data.crashCountBK + " (" + data.dtextPercent.toFixed(2) + "%) of those crashes resulted in fatalities. " + data.btot + " bicyclists were killed.", "paragraph", "summary-info");
    }

    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2013 - 2017", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Crash data provided by TxDOT and NMDOT.", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("The total number of crashes includes crashes of all severities: fatal, suspected serious injury, non-incapacitating injury, possible injury, and non-injury*. ", "paragraph", "calc-info");
    paragraphAdder("*Note: Crash severities classified by TxDOT as 'non-injury' or 'unknown injury' are here shown as 'non-injury'. Crash severity classified by NMDOT as 'unhurt' is shown here as 'non-injury'. ", "paragraph", "calc-info");


    openNav();
}
function pm19R(data) {
    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');
    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');

    pm19StackedChart(ctx2,data);

    if (currentType == 'driving') {
        headerAdder("Number serious injuries - Driving", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.crashCount) + " crashes occurred in the El Paso MPO region and " + data.crashCountDK + " (" + data.dtextPercent.toFixed(2) + "%) of those crashes resulted in serious injuries. " + data.dtot + " people were seriously injured.", "paragraph", "summary-info");
    }
    else if (currentType == 'freight') {
        headerAdder("Number serious injuries - Freight", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.crashCount) + " crashes that involved a commercial vehicle occurred in the El Paso MPO region and " + data.crashCountFK + " (" + data.dtextPercent.toFixed(2) + "%) of those crashes resulted in serious injuries. " + data.ftot + " people were seriously injured in commercial vehicle-related crashes.", "paragraph", "summary-info");
    }
    else if (currentType == 'walking') {
        headerAdder("Number serious injuries - Walking", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.crashCount) + " crashes that involved a pedestrian occurred in the El Paso MPO region and " + data.crashCountWK + " (" + data.dtextPercent.toFixed(2) + "%) of those crashes resulted in serious injuries. " + data.wtot + " pedestrians were seriously injured.", "paragraph", "summary-info");
    }
    else if (currentType == 'biking') {
        headerAdder("Number serious injuries - Biking", "title");
        paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.crashCount) + " crashes that involved a bicyclist occurred in the El Paso MPO region and " + data.crashCountBK + " (" + data.dtextPercent.toFixed(2) + "%) of those crashes resulted in serious injuries. " + data.btot + " bicyclits were seriously injured.", "paragraph", "summary-info");
    }

    pm19chartLine(ctx, data);
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2013 - 2017", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Crash data provided by TxDOT and NMDOT.", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("The total number of crashes includes crashes of all severities: fatal, suspected serious injury, non-incapacitating injury, possible injury, and non-injury*.", "paragraph", "calc-info");
    paragraphAdder("*Note: Crash severities classified by TxDOT as 'non-injury' or 'unknown injury' are here shown as 'non-injury'. Crash severity classified by NMDOT as 'unhurt' is shown here as 'non-injury'. ", "paragraph", "calc-info");
    openNav();
}
function pm25R(data) {
    headerAdder("Pavements in poor condition", "title");
    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');
    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    pm25StackedChart(ctx,data);
    pm25chartLine(ctx2,data);
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("HPMS reports 2017 pavement condition for " + data.tot_poor_mi + " miles within the El Paso MPO area, out of that " + data.poor_mi_perc + "% is in poor condition. " + data.tx_poor_mi.toFixed(2) + " miles (" + data.tx_poor_mi_perc + "%) of pavement in poor condition are located in Texas and " + data.nm_poor_mi.toFixed(2) + " miles (" + data.nm_poor_mi_perc + "%) are in New Mexico.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2013-2017", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("Highway Performance Monitoring System (HPMS) Public Release of Geospatial Data in Shapefile Format", "https://www.fhwa.dot.gov/policyinformation/hpms/shapefiles.cfm");
   // anchorAdder("https://www.fhwa.dot.gov/policyinformation/hpms/shapefiles.cfm ","https://www.fhwa.dot.gov/policyinformation/hpms/shapefiles.cfm");
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
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("Within El Paso region, the total ridership is " + commafy(data.tot) + ". The route " + commafy(parseInt(data.highRoute)) + " has the highest ridership with an average of " + commafy(data.highAvg) + ". The route " + data.lowRoute + " has the lowest ridership with an average of " + commafy(data.lowAvg) + " (5 years average).", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2014-2018", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Data provided by Sun Metro", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("The received data was separated by years and routes. The average ridership over the 5 years is shown in the map based on geometric interval; 2,777-107,272 (Yellow), 107,272-388,321 (Orange), 388,321-1,144,232 (Blue). Since Sun Metro stopped using route 204 in 2014 data was not included. ", "paragraph", "calc-info");
 
    if (detectmob() != true) {
        let names = ['2,777 - 107,272', '107,273 - 388,321', '388,321 - 1,144,232'];
        let colors = ['background:#FFEB3B;', 'background:#FF9800;', 'background:#2196F3'];
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
    paragraphAdder("There are a total of " + commafy(data.sideWalks) + " miles of sidewalks along " + commafy(data.roadways) + " miles of roadways within the City of El Paso limits. Assuming that each roadway has a sidewalk on both sides, there are " + commafy(data.missing)+" miles of sidewalks missing.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Sidewalk GIS layer was provided in 2018", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("City of El Paso", "paragraph", "data-info");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Mileage of roadway network (stcent, without limited access roadways such as the Interstate 10, US 54, Loop 375, Cesar Chavez Memorial Highway, Spur 601) was compared with mileage of sidewalks. Only sidewalks with status 'complete', 'pre-existing', 'private' or 'scheduled' were included in the analysis. Sidewalks with no information about status, or status 'removed', 'unfeasible', or 'awaiting assessment' were not included in this performance measure. ", "paragraph", "calc-info");
    paragraphAdder("Note: A GIS sidewalk layer was at the time of analysis available only from the City of El Paso. GIS data from other municipalities will be added as it becomes available.", "paragraph", "calc-info");
    openNav();
}
function pm12R(data) {
    headerAdder("Bikeway Buildout", "title");
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm12StackedChart(ctx,data);
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("In the El Paso MPO region, there are a total of " + data.pm12existing.toFixed(2) + " miles of existing bikeways. There are " + data.proposedMiles.toFixed(2) + " miles of proposed bikeways. If all proposed bikeways are completed, there would be a total of " + data.tot.toFixed(2) + " miles in the El Paso MPO region.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2018 bikeway data provided.", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Bikeway data was provided by the municipalities: Paso del Norte Health foundation, City of Sunland Park, City of San Elizario and the City of El Paso. ", "paragraph", "data-info");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("The data inside the layer package had contained columns that have its status, proposed or existing, which were filtered to make a distinction between the two. The files containing existing bikeways were placed into a new, individual layer. The miles were then calculated for both existing and all bikeways.", "paragraph", "calc-info");
    openNav();
}
function pm13R(data) {
    headerAdder("Northbound border crossings", "title");
    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');
    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    pm13ModeGraph(ctx,data);
    pm13Chart(ctx2, data);
    let yearRange = (data.driving.period).reduce((a, b) => Math.min(a, b)); // get smalleest year
    paragraphAdder("Summary:", "subtitle", "summary-title");
    if (currentType == "driving") {  
        paragraphAdder("During a 5-year period (" + yearRange + "-" + (yearRange + 4) + "), on average " + commafy(data.text.averageD)+" personal vehicles crossed northbound at the ports of entry. The port of entry with highest personal vehicle traffic is " +data.text.greatestStation+".", "paragraph", "summary-info");
    } else if (currentType == "freight") {     
        paragraphAdder("During a 5-year period (" + yearRange + "-" + (yearRange + 4) +"), on average " + commafy(data.text.averageF)+" commercial vehicles crossed northbound at the ports of entry. The port of entry with highest commercial vehicle traffic is " +data.text.greatestStation+".", "paragraph", "summary-info");
    } else if (currentType == "walking") {
        paragraphAdder("During a 5-year period (" + yearRange + "-" + (yearRange + 4) +"), on average " + commafy(data.text.averageW)+" pedestrians crossed northbound at the ports of entry. The port of entry with highest pedestrian traffic is " +data.text.greatestStation+".", "paragraph", "summary-info");
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
        paragraphAdder("In "+latestYear+" the average wait time for personal vehicles crossing northbound at the ports of entry was "+data.text.drivingTime+" minutes. The port of entry with highest wait time for personal vehicles in  "+latestYear+" was "+data.text.driving_highest_wait_time+". ", "paragraph", "summary-info");
        pm14DrivingChart(ctx,data);
    } else if (currentType == "freight") {
        paragraphAdder("In "+latestYear+" the average wait time for commercial vehicles crossing northbound at the ports of entry was "+data.text.freightTime+" minutes. The port of entry with highest wait time for commercial vehicles in  "+latestYear+" was "+data.text.freight_highest_wait_time+". ", "paragraph", "summary-info");
        pm14FreightChart(ctx,data);
    } else if (currentType == "walking") {
        paragraphAdder("In "+latestYear+" the average wait time for pedestrians crossing northbound at the ports of entry was "+data.text.walkingTime+" minutes. The port of entry with highest average wait time for pedestrians in  "+latestYear+" was "+data.text.walking_highest_wait_time+". ", "paragraph", "summary-info");
        pm14WalkingChart(ctx,data);
    }

    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder((latestYear-4) + "-" + latestYear, "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Customs and Border Protection, compiled by the City of El Paso International Bridges Department. ", "paragraph", "data-info");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("These statistics were obtained from the City of El Paso International Bridges Department. In this context, pedestrians include people walking or bicycling. Wait times for Santa Teresa and Tornillo were not available at the time of analysis.  Wait times estimates are determined using either a manual, line-of-sight methodology via predetermined benchmarks or an automated system. For more info related with wait times refer to:", "paragraph", "calc-info");
    anchorAdder("https://bwt.cbp.gov/","https://bwt.cbp.gov/");
    openNav();
}
function pm26R(data) {
    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');

    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');

    chart_pm26(ctx, data);
    chart_pm26_2(ctx2, data);

    headerAdder("Bridge & Culvert Condition", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("Within the Texas portion of the El Paso MPO area, there are " + data.tx_good_count + " bridges(" + data.goodTX + "%) in Good condition, " + data.tx_fair_count + " bridges(" + data.fairTX + "%) in Fair condition, " + data.tx_poor_count + " bridges(" + data.poorTX + "%) in Poor condition.", "paragraph", "summary-info");
    paragraphAdder("Within the New Mexico portion of the El Paso MPO area, there are " + data.nm_good_count + " bridges(" + data.goodNM + "%) in Good conditions, " + data.nm_fair_count + " bridges(" + data.fairNM + "%) in Fair condition, " + data.nm_poor_count + " bridge(" + data.poorNM + "%) in Poor condition.", "paragraph", "summary-info");
    paragraphAdder("Condition data was not available for " + data.tnodatabridges + " bridges within the El Paso MPO area.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Bridges condition data as of 2018", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Bridge condition data was provided by TxDOT and NMDOT.", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Bridge condition rating is based on the lowest condition rating from the following components: deck, substructure, superstructure or culvert.", "paragraph", "calc-info");
    paragraphAdder("Following the FHWA guidance, bridges with lowest rating between 7 and 9 are classified as Good, those rated 6 or 5 are classified as Fair and bridges with lowest rating 4 or below are classified as Poor.", "paragraph", "calc-info");
    paragraphAdder("More information about Bridge Condition Performance can be found at this FHWA website: ", "paragraph", "calc-info");
    anchorAdder(1, "https://www.fhwa.dot.gov/bridge/britab.cfm");
    openNav();
}
function pm22R(data) {
    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');
    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    pm22chartLine(ctx,data);
    pm22StackedChart(ctx2,data);

    headerAdder("Number of crashes on the CMP network", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("During a 5-year period (2013-2017), a total of " + commafy(data.dynamic_txt_val)  + " crashes occurred on the El Paso MPO Congestion Management Process (CMP) network.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2013 – 2017", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Crash data provided by TxDOT and NMDOT.", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("This performance measures includes all crashes that occurred within 150 ft. of the CMP network adopted by the MPO in 2019.  ", "paragraph", "calc-info");
    openNav();
}
function pm5R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm5chart(ctx,data);
    headerAdder("Jobs within ½ mile of high-quality rapid transit", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("In the El Paso MPO region, there are a total of " + commafy(data.totJobs) + " jobs. In a half-mile of high-quality rapid transit, there are a total of " + data.jobsPercent.toFixed(2) + "% jobs.  Once all proposed high-quality rapid transit stations are complete, there will be a total of " + data.totalJobsPercent.toFixed(2) + "% jobs within a half-mile of high-quality rapid transit.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Data from 2015 LEHD files, 2017 Tigerline shapefile, bikeway data from 2018. ", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("TIGER/Line Shapefiles", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2017.html");
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
    pm9chart(ctx,data);
    headerAdder("Population within ½ mile of high-quality rapid transit.", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("There are " + commafy(data.totPop) + " people residing in the El Paso MPO region. There are " + data.peopleLivingTransit.toFixed(2) + "% people living within a half-mile of high-quality rapid transit.  Once all proposed high-quality rapid transit stations are complete, there will be a total of " + data.totalpeopleLivingTransit.toFixed(2) + "% people living within a high-quality rapid transit.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Data from 2015 LEHD files, 2012-2016 ACS data, bikeway data from 2018.", "paragraph", "analysis-info");
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
    anchorAdder("TIGER/Line Shapefiles", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2017.html");
    anchorAdder("Longitudinal Employer-Household Dynamics (LEHD) files", "https://lehd.ces.census.gov/data/");
    paragraphAdder("Bikeway data was provided by the following entities in January 2019: Paso del Norte Health foundation, City of Sunland Park, City of San Elizario, and the City of El Paso.   ", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("LEHD workplace area characteristics (WAC) data was analysed on a census block group-level in order to estimate the number of jobs within a ½ mile from a bikeway, assuming a homogenous distribution of jobs each the block group.", "paragraph", "calc-info");
    toggleHolderSwitch('on');
    openNav();
}
function pm10R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm10chart(ctx, data);
    headerAdder("Population within ½ mile of bikeways", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("There are " + commafy(data.totPop) + " people residing in the El Paso MPO region. There are " + data.peopleLivingTransit.toFixed(2) + "%  people living within a half-mile of existing bikeways.  Once all proposed bikeways are complete, there will be a total of " + data.totalpeopleLivingTransit.toFixed(2) + "% people living within a half-mile of bikeways.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Data from the 2012-2016 ACS data and 2019 Transit data ", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("American Community Survey 5-Year Estimates", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-data.2016.html");
    anchorAdder("TIGER/Line Shapefiles", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2017.html");
    paragraphAdder("Bikeway data was provided by the municipalities: Paso del Norte Health foundation, City of Sunland Park, City of San Elizario, and the City of El Paso.", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("American Community Survey data was analysed on a census block group-level in order to estimate the number of jobs within a ½ mile from a bikeway, assuming a homogenous distribution of jobs for each block group. ", "paragraph", "calc-info");
    toggleHolderSwitch('on');
    openNav();
}

function pm7R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm7HorizontalBar(ctx,data);


    headerAdder("Key destinations within ½ mile of high-quality rapid transit", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("In the El Paso MPO region, there are a total of " + data.totKeyDest + " key destinations. In a half-mile of existing high-quality rapid transit stations, there are a total of " + data.percentKeyD1.toFixed(2) + "% key destinations.  Once all proposed high-quality rapid transit stations are complete, there will be a total of " + data.percentKeyD2.toFixed(2) + "% key destinations within a half-mile of high-quality rapid transit.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2019 Transit data", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("The layer of the high-quality transit stations was provided by Sun Metro. Key destinations were identified from the EPMPO 2040 Horizon Model – Model Development Report and leisure time activity locations were identified from Visit El Paso website.", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("A ½ mile buffer was drawn around existing high-quality rapid transit and the number of key destinations within the buffer was calculated. This analysis was also done for proposed high-quality rapid transit, to indicate the potential result if all high-quality rapid transit in existing plans were completed.", "paragraph", "calc-info");
    toggleHolderSwitch('on');
    openNav();
}

function pm8R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm8HorizontalBar(ctx,data);
    headerAdder("key destinations within ½ mile of bikeways", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder(" In the El Paso MPO region, there are a total of " + data.totKeyDest + " key destinations. In a half-mile of existing bikeways, there are a total of " + data.percentKeyD1.toFixed(2) + "% key destinations.  Once all proposed bikeways are complete, there will be a total of " + data.percentKeyD2.toFixed(2) + "%   key destinations within a half-mile of bikeways. ", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Data was provided by various local agencies in 2018 ", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Crash data provided by TxDOT and NMDOT.", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("A ½ mile buffer was drawn around existing bikeways and the number of key destinations within the buffer was calculated. This analysis was also done for proposed bikeways, to indicate the potential result if all bikeways in existing plans were completed.", "paragraph", "calc-info");
    toggleHolderSwitch('on');
    openNav();
}

function pm15R(data) {
    canvasMaker('chart1', 'myChart');
    canvasMaker('chart2', 'myChart2');
    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    pm15chartLine(ctx, data);
    pm15chartLine2(ctx2, data);
    headerAdder("Ozone emissions", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("According to the data available, ozone pollution has been increasing in the last 5 years.", "paragraph", "summary-info");
    paragraphAdder("Stations with the highest annual readings for each pollutant are:", "paragraph", "summary-info");
    paragraphAdder("Ozone 8hr - " + data[data.length-1].station8+" in "+data[data.length-1].year_8+".", "paragraph", "summary-info");
    paragraphAdder("Ozone 1hr - " + data[data.length-1].station1 + " in " + data[data.length-1].year_1 +".", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2014-2018", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("Texas Commission on Environmental Quality website", "https://tceq.maps.arcgis.com/apps/webappviewer/index.html?id=ab6f85198bda483a997a6956a8486539");
    anchorAdder("New Mexico Environment Department website ", "http://nmaqinow.net/");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Annual readings are reported exactly as they appear at  <a style=\"display: contents; font-size: 100%;color: blue;\"href=\"https://tceq.maps.arcgis.com/apps/webappviewer/index.html?id=ab6f85198bda483a997a6956a8486539\" target=\"_blank\">Texas Commission on Environmental Quality website</a> and <a style=\"display: contents; font-size: 100%;color: blue;\"href=\"http://nmaqinow.net/\" target=\"_blank\">New Mexico Environment Department website</a> In Texas 8-hour ozone standard is reported, in NM only 1-hour ozone standard was available. Carbon monoxide and particulate matter (PM10) are also reported.", "paragraph", "calc-info");
    paragraphAdder("*Note: Not all monitors collected data for all three pollutants, also not all monitors have data for the full 5-year period.", "paragraph", "calc-info");
    openNav();

}

function pm16R(data) {
    canvasMaker('chart1', 'myChart');

    var ctx = document.getElementById('myChart').getContext('2d');
 
    pm16chartLine(ctx, data);
    headerAdder("Carbon monoxide emissions", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("According to the data available, Carbon Monoxide pollution has been the same for the last 5 years. Except for 2018 that UTEP registered a high reading. ", "paragraph", "summary-info");
    paragraphAdder("Stations with the highest annual readings for Carbon Monoxide are:  ", "paragraph", "summary-info");
    paragraphAdder(data[data.length - 1].station + " in " + data[data.length - 1].year +".", "paragraph", "summary-info"); ///////////////////////////////////////////////////////**************
    paragraphAdder(data[data.length - 1].station2 + " in " + data[data.length - 1].year2 +".", "paragraph", "summary-info"); 
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2014-2018", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("Texas Commission on Environmental Quality website", "https://tceq.maps.arcgis.com/apps/webappviewer/index.html?id=ab6f85198bda483a997a6956a8486539");
    anchorAdder("New Mexico Environment Department website ", "http://nmaqinow.net/");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Annual readings are reported exactly as they appear at  <a style=\"display: contents; font-size: 100%;color: blue;\"href=\"https://tceq.maps.arcgis.com/apps/webappviewer/index.html?id=ab6f85198bda483a997a6956a8486539\" target=\"_blank\">Texas Commission on Environmental Quality website</a> and <a style=\"display: contents; font-size: 100%;color: blue;\"href=\"http://nmaqinow.net/\" target=\"_blank\">New Mexico Environment Department website</a> In Texas 8-hour ozone standard is reported, in NM only 1-hour ozone standard was available. Carbon monoxide and particulate matter (PM10) are also reported.", "paragraph", "calc-info");
    paragraphAdder("*Note: Not all monitors collected data for all three pollutants, also not all monitors have data for the full 5-year period.", "paragraph", "calc-info");
    openNav();
}

function pm17R(data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm17chartLine(ctx, data);
    headerAdder("Particulate matter emissions", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("According to the data available, Particulate Matter pollution has been increasing and decreasing depending of the station in the last 5 years.", "paragraph", "summary-info");
    paragraphAdder("Stations with the highest annual readings for Particulate Matte are:  ", "paragraph", "summary-info");
    paragraphAdder(data[data.length - 1].station + " in " + data[data.length - 1].year +".", "paragraph", "summary-info");
    paragraphAdder(data[data.length - 1].station2 + " in " + data[data.length - 1].year2 +".", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2014-2018", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("Texas Commission on Environmental Quality website", "https://tceq.maps.arcgis.com/apps/webappviewer/index.html?id=ab6f85198bda483a997a6956a8486539");
    anchorAdder("New Mexico Environment Department website ", "http://nmaqinow.net/");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Annual readings are reported exactly as they appear at  <a style=\"display: contents; font-size: 100%;color: blue;\"href=\"https://tceq.maps.arcgis.com/apps/webappviewer/index.html?id=ab6f85198bda483a997a6956a8486539\" target=\"_blank\">Texas Commission on Environmental Quality website</a> and <a style=\"display: contents; font-size: 100%;color: blue;\"href=\"http://nmaqinow.net/\" target=\"_blank\">New Mexico Environment Department website</a> In Texas 8-hour ozone standard is reported, in NM only 1-hour ozone standard was available. Carbon monoxide and particulate matter (PM10) are also reported.", "paragraph", "calc-info");
    paragraphAdder("*Note: Not all monitors collected data for all three pollutants, also not all monitors have data for the full 5-year period.", "paragraph", "calc-info");
    openNav();
}

function pm20R(data) {
    if (currentType == "walking") {
        headerAdder("Pedestrians crashes nearby bus stops", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        if (data.w_greatest ==0) {
            paragraphAdder("No pedestrian crashes in El Paso region occurred within 200 feet of transit stops.", "paragraph", "summary-info");
        }
        else if (data.w_greatestCounter == 1) {
            paragraphAdder(data.percentPed.toFixed(2) + "% of all pedestrian crashes in El Paso region occurred within 200 feet of transit stops. The highest observed number of crashes within 200 ft. from a bus stop is " + data.w_greatest + " (on " + data.w_on_st + " at " + data.w_at_strt + ")", "paragraph", "summary-info");
        } else if (data.w_greatestCounter > 1) {
            paragraphAdder(data.percentPed.toFixed(2) + "% of all pedestrian crashes in El Paso region occurred within 200 feet of transit stops. The highest observed number of crashes within 200 ft. from a bus stop is " + data.w_greatest + " (" + data.w_greatestCounter + " locations have the same number)", "paragraph", "summary-info");
        }
      
    } else if (currentType == "biking") {
        headerAdder("Bicyclist crashes nearby bus stops", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        if (data.b_greatest == 0) {
            paragraphAdder("No bicyclists crashes in El Paso region occurred within 200 feet of transit stops.", "paragraph", "summary-info");
        } else if (data.b_greatestCounter == 1) {
            paragraphAdder(data.percentBike.toFixed(2) + "% of all bicyclists crashes in El Paso region occurred within 200 feet of transit stops. The highest observed number of crashes within 200 ft. from a bus stop is " + data.b_greatest + " (on " + data.b_on_st + " at " + data.b_at_strt + ")", "paragraph", "summary-info");
        } else if (data.b_greatestCounter > 1) {
            paragraphAdder(data.percentBike.toFixed(2) + "% of all bicyclists crashes in El Paso region occurred within 200 feet of transit stops. The highest observed number of crashes within 200 ft. from a bus stop is " + data.b_greatest + " (" + data.b_greatestCounter + " locations have the same number)", "paragraph", "summary-info");
        }
       
    }
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Crashes 2013-2017, SunMetro bus stops as of 2019 ", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Crash data from TxDOT, location of bus stops from Sun Metro ", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("A buffer of 200 ft. was created from the bus stops to identify how many crashes occurred within that distance. The crashes are from 2013 to 2017, and the bus stop locations are as of 2019.", "paragraph", "calc-info");
    if (currentType == "walking") {
        //legend elements
        if (detectmob() != true) {
            names = ['1', '2-3', '4-6', '7-10', 'No data'];
            colors = ['background:#4CAF50;', 'background:#8BC34A;', 'background:#CDDC39;', 'background:#f44336;', 'background:#9E9E9E'];
            legendMaker("Legend", names, colors);
        }
    } else if (currentType == "biking") {
        if (detectmob() != true) {
            //legend elements
            names = ['1', '2'];
            colors = ['background:#8BC34A;', 'background:#f44336'];
            legendMaker("Legend", names, colors);
        }
    }
    openNav();
}
function pm21R(data) {
    headerAdder("Safety projects near crash hotspots", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("The Metropolitan Transportation Plan Destino 2045 identifies " + data + " safety projects:", "paragraph", "summary-info");

    paragraphAdder("<span class=\"fa fa-play\"></span> Project C035X. Hot-spot type: Consecutive.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project P402X-05A. Hot-spot type: Consecutive.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project P464X-CAP. Hot-spot type: Consecutive.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project F057X-CAP. Hot-spot type: Consecutive.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project F405X-CAP. Hot-spot type: Consecutive.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project A136X-CAP. Hot-spot type: Consecutive.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project F059X-CAP-1. Hot-spot type: Consecutive.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project F058X-CAP. Hot-spot type: Consecutive.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project F407A-CAP. Hot-spot type: Consecutive.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project F407B-CAP. Hot-spot type: Consecutive. ", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project F058X-CAP. Hot-spot type: Consecutive. ", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project F407C. Hot-spot type: Consecutive. ", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project I061X-CAP. Hot-spot type: Consecutive. ", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project P002X-CAP. Hot-spot type: Consecutive. ", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project P533X. Hot-spot type: Consecutive.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project P333X. Hot-spot type: Consecutive. ", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project T069X. Hot-spot type: Consecutive, New, Intensifying.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project P428X-MOD. Hot-spot type: Consecutive, New, Oscillating. ", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project P428X-CAP-2. Hot-spot type: Consecutive, Intensifying.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project M087B. Hot-spot type: Consecutive, Intensifying.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project R307D. Hot-spot type: Consecutive, Intensifying.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project I063X-CAP. Hot-spot type: Consecutive, Intensifying.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project P530X-MOD. Hot-spot type: Consecutive, Intensifying.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project M025B. Hot-spot type: Consecutive, Intensifying, Oscillating.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project M087A. Hot-spot type: Consecutive, Intensifying, Oscillating.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project M090X. Hot-spot type: Consecutive, Intensifying, Oscillating.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project F056X-CAP. Hot-spot type: Consecutive, Oscillating.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project I406X-CAP. Hot-spot type: Consecutive, Oscillating.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project P410X-15A. Hot-spot type: Consecutive, Oscillating.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project E304X. Hot-spot type: Intensifying.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project E303X. Hot-spot type: Intensifying.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project M089A. Hot-spot type: Intensifying.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project B300X. Hot-spot type: Intensifying.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project B301X. Hot-spot type: Intensifying.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project E302X-1. Hot-spot type: Intensifying.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project E302X-2. Hot-spot type: Intensifying.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project F060X. Hot-spot type: Intensifying.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project P334X. Hot-spot type: Intensifying.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project I006X-15A. Hot-spot type: Intensifying.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project A434X-CAP. Hot-spot type: Oscillating.", "paragraph", "summary-info");
    paragraphAdder("<span class=\"fa fa-play\"></span> Project I405X-CAP. Hot-spot type: Oscillating.", "paragraph", "summary-info");


    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Crash data from 2013-2017, safety projects identified from the Metropolitan Transportation Plan Destino 2045", "paragraph", "analysis-info");

    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Crash data provided by TxDOT and NMDOT. Destino 2045 projects identified by El Paso MPO.", "paragraph", "data-info");

    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Most of the projects in the map were obtained from Alliance. ", "paragraph", "calc-info");
    paragraphAdder("Projects S301D, S301E, S301F, S301G and S301H, were not include in the map because the description was not precise and we did not know exactly where were located. ", "paragraph", "calc-info");
    paragraphAdder("Most of the projects are represented as lanes in the maps, and three of them are represented as a point, those are: C035X, P333X and P334X.", "paragraph", "calc-info");
    paragraphAdder("There is no layer for safety projects in Dona Ana and Otero counties, just the crash hotspots was calculated. ", "paragraph", "calc-info");
    paragraphAdder("Space-Time Analysis was made to identify the crash hot spots which classified as follows:", "paragraph", "calc-info");
    paragraphAdder("<span class=\"fa fa-play\"></span><b> Consecutive:</b> “A location that has been a statistically significant hot spot for ninety percent of the time-step intervals with no discernible trend indicating an increase or decrease in the intensity of clustering over time” (ArcGIS). ", "paragraph", "calc-info");
    paragraphAdder("<span class=\"fa fa-play\"></span><b> New:</b> “A location that is a statistically significant hot spot for the final time step and has never been a statistically significant hot spot before” (ArcGIS). ", "paragraph", "calc-info");
    paragraphAdder("<span class=\"fa fa-play\"></span><b> Intensifying:</b> “A location that has been a statistically significant hot spot for ninety percent of the time-step intervals, including the final time step. In addition, the intensity of clustering of high counts in each time step is increasing overall and that increase is statistically significant” (ArcGIS).", "paragraph", "calc-info");
    paragraphAdder("<span class=\"fa fa-play\"></span><b> Oscillating:</b> “A statistically significant hot spot for the final time-step interval that has a history of also being a statistically significant cold spot during a prior time step. Less than ninety percent of the time-step intervals have been statistically significant hot spots” (ArcGIS). ", "paragraph", "calc-info");
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
    paragraphAdder("2012-2016 ACS 5-Year Estimates", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("American Community Survey 5-Year Estimates", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-data.2016.html");
    anchorAdder("TIGER/Line Shapefiles and TIGER/Line Files. ", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2016.html");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Percent of non-single occupancy vehicle (SOV) commute is calculated as:", "paragraph", "calc-info");
    imageAdder('./img/performance_measures/pm1/pm1Eqn.PNG', 'calc-info');
    openNav();
}
function pm2Text(text, data) {
    canvasMaker('chart1', 'myChart');
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
    paragraphAdder("2012-2016 ACS 5-Year Estimates", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("American Community Survey 5-Year Estimates", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2017.html");
    anchorAdder("TIGER/Line Shapefiles and TIGER/Line Files", "https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-data.2016.html");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("PM 2 is calculated as:", "paragraph", "calc-info");
    imageAdder('./img/performance_measures/pm1/pm1Eqn.PNG', 'calc-info');
    paragraphAdder("", "paragraph", "calc-info");
    imageAdder('./img/performance_measures/pm1/pm1Eqn.PNG', 'calc-info');
    paragraphAdder("", "paragraph", "calc-info");
    imageAdder('./img/performance_measures/pm1/pm1Eqn.PNG', 'calc-info');
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