/*
This method is similar to buttonswitch. This is call when the user changes corridors,
as the corridor changes the text inside changes.
*/

function dynamicCorridorText(currentCorridor, data) {
    removeAllElementsLegend();

    if (currentCorridor != "Artcraft/Domenici" && currentCorridor != "AOI" ) {
        currentCorridor = wordFix(currentCorridor);
    }
    if (currentCorridor == "AOI") {
        currentCorridor = "AOI";
    }
   

    try {
        removeAllElementsBar();
        toggleSpinner('off');
        toggleNav('off');
        toggleRadio("off");

        if (currentPM == 18) {
            pm18DynamicText(currentCorridor, data);
        } else if (currentPM == 19) {
            pm19DynamicText(currentCorridor, data);
        } else if (currentPM == 20) {
            pm20DynamicText(currentCorridor, data);
        } else if (currentPM == 24) {
            pm24DynamicText(currentCorridor, data);
        }else if (currentPM == 25) {
            pm25DynamicText(currentCorridor, data);
        } else if (currentPM == 26) {
            pm26DynamicText(currentCorridor, data);
        } else if (currentPM == 11) {
            pm11DynamicText(currentCorridor, data);
        } else if (currentPM == 2) {
            pm2DynamicText(currentCorridor,data);
        } else if (currentPM == 3) {
            pm3DynamicText(currentCorridor, data);
        } else if (currentPM == 4) {
            pm4DynamicText(currentCorridor, data);
        } else if (currentPM == 5) {
            //pm4BDynamicText(currentCorridor);
        } else if (currentPM == 12) {
            pm12DynamicText(currentCorridor, data);
        } else if (currentPM == 1) {
            pm1DynamicText(currentCorridor, data);
        }
    } catch (err) {
        toggleSpinner('off');
    }

}

function pm1DynamicText(corridor, data) {
    let pm1RText = data.SOV.toFixed(2) + "% of workers living within the " + corridor + "  corridor reported to drive alone during their commute to work,"
        + "therefore only " + data.NonSOV.toFixed(2) + "% of workers commute via non-SOV modes, which includes carpooled via car, truck, or van. Workers"
        + "used Public Transport means such as bus or trolley bus, streetcar or trolley car, subway or elevated railroad, railroad,"
        + " and ferryboat. Some workers also used a taxicab, motorcycle, bicycle, walking, and other means to go to work or they worked"
        + " at home.";
    pm1Text(pm1RText, data);
}

function pm2DynamicText(corridor, data) {
    let text = " During 2014-2018 " + data.Transit.toFixed(1)+"% of workers reported to commute by public transit, " + data.Biking.toFixed(2)+"% of workers bike, " + data.Walking.toFixed(1)+ "% of workers living in the El Paso MPO area reported to walk to work, and " + data.Non_SOV.toFixed(1) + "% of workers used other means.";
    pm2Text(text, data);
}

function pm24DynamicText(corridor, data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm24BarGraph(ctx, data);
    if (currentType == "driving") {
        headerAdder("Travel time index - Driving  ", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
    } else if (currentType == "freight") {
        headerAdder("Travel time index - Freight  ", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
    }
    paragraphAdder("Within the " + corridor + " corridor, the average travel time index is " + data.ttiAvg + ". In " + data.percentGreater.toFixed(2) + "% (" + data.sumGreater.toFixed(2) + " miles) of roadways, the travel time index is 1.5 and greater.", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2018", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("2018 Congestion Management process assessment tools (COMPAT).  ", "https://compat.tti.tamu.edu/");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("The travel time index is categorized in the following travel times: 1-1.1, 1.1-1.2, 1.2-1.3, 1.3-1.5, and more than 1.5. This performance measure shows the travel time index for passenger vehicles as well as commercial vehicles in the El Paso MPO region based on data reported in the National Performance Management Research Data Set (NPMRDS). The number of miles are summed per categorization and displayed in the graph.  ", "paragraph", "calc-info");
    //legend elements
    names = ['0', '1-1.1', '1.11-1.2', '1.21-1.3', '1.31-1.5', '1.51 >'];
    colors = ['background:#9E9E9E;', 'background:#03A9F4;', 'background:#CDDC39;', 'background:#FFEB3B;', 'background:#FFAB40;', 'background:#d50000'];
    legendMaker("Legend", names, colors);
    openNav();
}
function pm3DynamicText(corridor, data) {
    headerAdder("Transit ridership", "title");
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext("2d")
    chart_pm3(ctx, data)
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("Within " + corridor + " corridor, the total ridership is " + commafy(data.tot) + " passengers. Route " + data.highRoute + " has the highest ridership with an average of " + commafy(data.highAvg) + " passengers. Route " + data.lowRoute + " has the lowest ridership with an average of " + commafy(data.lowAvg) + " passengers (5 years average).", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2018-2022", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Data provided by Sun Metro", "paragraph", "data-info");
    paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("The received data was separated by years and routes. The average ridership over the 5 years is shown in the map based on geometric interval; 0-99,999 (Green), 100,000-399,999 (Orange), 400,000 +(Blue). ", "paragraph", "calc-info");
    openNav();
    names = ['0+', '100,000+', '400,000+'];
    let colors = ['background:#078a00;', 'background:#FF9800;', 'background:#2196F3'];
    legendMaker("Passengers", names, colors);
    openNav();
}
function pm4DynamicText(corridor, data) {
    let names = "";
    if (currentType == 'biking') {
        headerAdder("Biking trips recorded by Strava", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder("In 2018, a total of " + commafy(data.dataB) + " bike trips were recorded by Strava in the " + corridor + " corridor.", "paragraph", "summary-info");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("2018 data licensed by Strava.", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Strava Metro data provided via a sublicense from the Texas Department of Transportation.", "paragraph", "data-info");
        paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("This performance measure reflects the total number of bike trips on the street regardless of the direction (column TACTCNT) recorded by Strava in 2018. Trips recorded on Interstate 10 were removed from this dataset, since I-10 is a limited access facility. The legend shows the data in a geometric interval, which provides the best viewing distribution.", "paragraph", "calc-info");
        names = ['5 - 30', '30 - 479', '479 - 6,460'];
    } else if (currentType == 'walking') {
        headerAdder("Walking trips recorded by Strava", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder("In 2017, a total of " + commafy(data.dataW) + " walk trips were recorded by Strava in the " + corridor + " corridor.", "paragraph", "summary-info");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("2017 data from Strava Metro.", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Strava Metro (2017) provided via a sublicense from the Texas Department of Transportation.", "paragraph", "data-info");
        paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("This performance measure reflects the total number of walk trips on the street regardless of the direction (column TACTCNT) recorded by Strava in 2017. Trips recorded on the Interstate 10 were removed from this dataset, since I-10 is a limited access facility. The legend shows the data in a geometric interval, which provides the best viewing distribution.", "paragraph", "calc-info");
        names = ['5 - 15', '16 - 129', '130 -1,305'];
    }

    let colors = ['background:#f44336;', 'background:#64DD17;', 'background:#9C27B0', 'background:#e53935;'];
    legendMaker("Trips", names, colors);
    openNav();

}
function pm5DynamicText(corridor) {
    headerAdder("Percent of jobs within ½ mile of high-quality rapid transit ", "title");
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm5chart(ctx);
    paragraphAdder("Summary:", "subtitle", "summary-title");
    paragraphAdder("In the " + corridor + " corridor, there are a total of __ jobs. In a half-mile of high-quality rapid transit ", "paragraph", "summary-info");
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Data from 2015 LEHD files, 2017 Tigerline shapefile, bikeway data from 2018. ", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("TIGER/Line Shapefiles & Longitudinal Employer-Household Dynamics (LEHD) files.", "paragraph", "data-info");
    paragraphAdder("The layer of the high-quality transit stations was provided by Sun Metro.  ", "paragraph", "data-info");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("LEHD workplace area characteristics (WAC) data was analysed on a census block group-level in order to estimate the population within ½ mile of high-quality rapid transit, assuming a homogenous distribution of population each the block group.", "paragraph", "calc-info");
    openNav();
}

function pm11DynamicText(corridor, data) {
    headerAdder("Length of Sidewalks per Mile", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    if(corridor == "AOI"){
        paragraphAdder("There are " + commafy(data.sideWalks) + " of sidewalks along " + commafy(data.roadways) + " miles of roadways within the AOI", "paragraph", "summary-info");
    }
    else {
        paragraphAdder("There are " + commafy(data.sideWalks) + " miles of sidewalks along " + commafy(data.roadways) + " miles of roadways within the " + corridor + " corridor.", "paragraph", "summary-info");
    }
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("Sidewalk GIS layer was provided in 2018", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("City of El Paso", "paragraph", "data-info");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Mileage of roadway network (stcent, without limited access roadways such as the Interstate 10, US 54, Loop 375, Cesar Chavez Memorial Highway, Spur 601) was compared with mileage of sidewalks. Only sidewalks with status ‘complete’, ‘pre-existing’, ‘private’ or ‘scheduled’ were included in the analysis. Sidewalks with no information about status, or status ‘removed’, ‘unfeasible’, or ‘awaiting assessment’ were not included in this performance measure. ", "paragraph", "calc-info");
    paragraphAdder("Note: Only the sidewalks within El Paso City limits were considered for the analysis of this performance measure.", "paragraph", "calc-info");
    openNav();
}
function pm12DynamicText(corridor, data) {
    headerAdder("Miles of bikeway network buildout", "title");
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');
    pm12StackedChart(ctx,data);
    paragraphAdder("Summary:", "subtitle", "summary-title");
    if(corridor == "AOI"){
        paragraphAdder("In the AOI, there are a total of " + data.pm12existing.toFixed(1) + " miles of existing bikeways and " + data.proposedMiles.toFixed(1) + " miles of proposed bikeways. If all proposed bikeways are completed, there would be a total of " + data.tot.toFixed(1) + " miles in the AOI.", "paragraph", "summary-info");
    }
    else {
        paragraphAdder("In the " + corridor + " corridor, there are a total of " + data.pm12existing.toFixed(1) + " miles of existing bikeways and " + data.proposedMiles.toFixed(1) + " miles of proposed bikeways. If all proposed bikeways are completed, there would be a total of " + data.tot.toFixed(1) + " miles in the " + corridor + " corridor.", "paragraph", "summary-info");
    }   
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2021 bikeway data provided.", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    paragraphAdder("Bikeway data was provided by the municipalities: Paso del Norte Health foundation, City of Sunland Park, City of San Elizario and the City of El Paso. ", "paragraph", "data-info");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("The data inside the layer package had contained columns that have its status, proposed or existing, which were filtered to make a distinction between the two. The files containing existing bikeways were placed into a new, individual layer. The miles were then calculated for both existing and all bikeways.", "paragraph", "calc-info");
    openNav();
}
function pm18DynamicText(corridor, data) {
    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');

    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');
	
    pm18StackedChart(ctx2,data);
    paragraphAdder("Summary:", "subtitle", "summary-title");
    
    if (currentType == 'driving') {

        headerAdder("Number of Fatalities - Driving", "title");
        paragraphAdder("During a 5-year period (2018-2022), a total of " + commafy(data.crashCount) + " motor vehicle crashes occurred in the El Paso MPO region and " + data.crashCountDK + " of those crashes* resulted in fatalities. A total of " + data.dtot + " fatalities resulted from these crashes*.", "paragraph", "summary-info");
        paragraphAdder("* Excluding crashes involving truck vehicles, pedestrians and pedalcyclists", "paragraph", "summary-info");
        pm18chartLine(ctx, data);
    }
    else if (currentType == 'freight') {

        headerAdder("Number of Fatalities - Freight", "title");
        paragraphAdder("During a 5-year period (2018-2022), a total of " + commafy(data.crashCount) + " motor vehicle crashes occurred in the El Paso MPO region and " + data.crashCountFK + " of those crashes resulted in fatalities involving Commercial Vehicles. A total of " + data.ftot + " fatalities resulted from these crashes.", "paragraph", "summary-info");
        pm18chartLine(ctx, data);
    }
    else if (currentType == 'walking') {

        headerAdder("Number of Fatalities - Walking", "title");
        paragraphAdder("During a 5-year period (2018-2022), a total of " + commafy(data.crashCount) + " crashes occurred in the El Paso MPO region and " + data.crashCountWK + " of those crashes resulted in fatalities involving pedestrians. " + data.wtot + " pedestrians were killed.", "paragraph", "summary-info");
        pm18chartLine(ctx, data);
    }
    else if (currentType == 'biking') {
        headerAdder("Number of Fatalities - Biking", "title");
        paragraphAdder("During a 5-year period (2018-2022), a total of " + commafy(data.crashCount) + " crashes occurred in the El Paso MPO region and " + data.crashCountBK + " of those crashes resulted in fatalities involving bicyclists. " + data.btot + " bicyclists were killed.", "paragraph", "summary-info");
        pm18chartLine(ctx, data);
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
    paragraphAdder("\u00B9Total Fatalities: The total number of fatalities in crashes involving all types of transportation modes.", "paragraph", "calc-info");
    openNav();
}
function pm19DynamicText(corridor, data) {
    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');
    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    pm19StackedChart(ctx2, data);

    if (currentType == "driving") {
        headerAdder("Number Serious Injuries - Driving", "title");
        paragraphAdder("During a 5-year period (2018-2022), a total of " + commafy(data.crashCount) + " motor vehicle crashes occurred in the El Paso MPO region and " + data.crashCountDK + " of those crashes* resulted in serious injuries. A total of " + data.dtot + " persons sustained serious injuries resulting from these crashes*.", "paragraph", "summary-info");
        paragraphAdder("* Excluding crashes involving truck vehicles, pedestrians and pedalcyclists", "paragraph", "summary-info");
  
    }
    else if (currentType == "freight") {
        headerAdder("Number Serious Injuries - Freight", "title");
        paragraphAdder("During a 5-year period (2018-2022), a total of " + commafy(data.crashCount) + " motor vehicle crashes occurred in the El Paso MPO region and " + data.crashCountFK + " of those crashes resulted in serious injuries involving Commercial Vehicles. A total of " + data.ftot + " persons sustained serious injuries in resulting from these crashes.", "paragraph", "summary-info");
  
    }
    else if (currentType == "walking") {
        headerAdder("Number Serious Injuries- Walking", "title");
        paragraphAdder("During a 5-year period (2018-2022), a total of " + commafy(data.crashCount) + " crashes occurred in the El Paso MPO region and " + data.crashCountWK + " of those crashes resulted in serious injuries involving pedestrians. " + data.wtot + " pedestrians were seriously injured.", "paragraph", "summary-info");
  
    }
    else if (currentType == "biking") {
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
    paragraphAdder("\u00B9Total Serious Injuries: The total number of persons sustaining serious injuries in crashes involving all types of transportation modes.", "paragraph", "calc-info");
    openNav();
}
function pm20DynamicText(corridor, data) {
    if (currentType == "walking") {
        headerAdder("Pedestrians crashes nearby bus stops", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        if (data.w_greatest == 0) {
            paragraphAdder("No pedestrian crashes in " + corridor +" corridor  occurred within 200 feet of transit stops.", "paragraph", "summary-info");
        }
        else if (data.w_greatestCounter == 1) {
            paragraphAdder(data.percentPed.toFixed(2) + "% of all pedestrian crashes in " + corridor + " corridor occurred within 200 feet of transit stops.", "paragraph", "summary-info");
        } else if (data.w_greatestCounter > 1)  {
            paragraphAdder(data.percentPed.toFixed(2) + "% of all pedestrian crashes in " + corridor + " corridor occurred within 200 feet of transit stops.", "paragraph", "summary-info");
        }
     

    } else if (currentType == "biking") {
        headerAdder("Bicyclist crashes nearby bus stops", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        if (data.b_greatest == 0) {
            paragraphAdder("No bicyclists crashes in " + corridor +" corridor  occurred within 200 feet of transit stops.", "paragraph", "summary-info");
        } else if (data.b_greatestCounter == 1) {
            paragraphAdder(data.percentBike.toFixed(2) + "% of all pedestrian crashes in " + corridor + " corridor  occurred within 200 feet of transit stops.", "paragraph", "summary-info");

        } else if (data.b_greatestCounter > 1) {
            paragraphAdder(data.percentBike.toFixed(2) + "% of all pedestrian crashes in " + corridor + " corridor  occurred within 200 feet of transit stops.", "paragraph", "summary-info");
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
        names = ['1', '2-3', '4-6', '7-10', 'No data'];
        colors = ['background:#4CAF50;', 'background:#8BC34A;', 'background:#CDDC39;', 'background:#f44336;', 'background:#9E9E9E'];
        legendMaker("Number of accidents near bus stops", names, colors);
    } else if (currentType == "biking") {
        //legend elements
        names = ['1', '2'];
        colors = ['background:#8BC34A;', 'background:#f44336'];
        legendMaker("Number of accidents near bus stops", names, colors);
    }
    openNav();
}
function pm25DynamicText(corridor, data) {
    headerAdder("Percentage of pavements in poor condition Corridor", "title");
    canvasMaker('chart1/2', 'myChart');
    canvasMaker('chart2/2', 'myChart2');
    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx2 = document.getElementById('myChart2').getContext('2d');
    pm25StackedChart(ctx,data);
    pm25chartLine(ctx2,data);
    paragraphAdder("Summary:", "subtitle", "summary-title");
    if(corridor == "AOI"){
        paragraphAdder("HPMS reports 2019 pavement condition for " + data.tot_miles.toFixed(1) + " miles within the AOI, out of those, " + data.poor_mi_perc.toFixed(1) + "% are in poor condition. ", "paragraph", "summary-info");

    }
    else{
        paragraphAdder("HPMS reports 2019 pavement condition for " + data.tot_miles.toFixed(1) + " miles within the " + corridor + " corridor, out of those, " + data.poor_mi_perc.toFixed(1) + "% are in poor condition. ", "paragraph", "summary-info");
    }
    
    paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
    paragraphAdder("2018-2022", "paragraph", "analysis-info");
    paragraphAdder("Data Source:", "subtitle", "data-title");
    anchorAdder("Highway Performance Monitoring System (HPMS) Public Release of Geospatial Data in Shapefile Format", "https://www.fhwa.dot.gov/policyinformation/hpms/shapefiles.cfm");
    paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
    paragraphAdder("Pavement condition was based on International Roughness Index (IRI) as defined by:", "paragraph", "calc-info");
    anchorAdder("Federal Highway Administration", "https://www.fhwa.dot.gov/policy/2013cpr/chap3.cfm#1");
    paragraphAdder("Good condition (IRI < 95), fair condition (IRI 95-170), and poor condition (IRI > 170). In this analysis, any sections with IRI = 0 are considered as entries with no data. ", "paragraph", "calc-info");
    openNav();
    //legend elements
    names = ['Good Condition', 'Fair Condition', 'Poor Condition'];
    colors = ['background:#8BC34A;', 'background:#F57C00;', 'background:#d50000'];
    legendMaker("Legend", names, colors);
    openNav();
}
function pm26DynamicText(corridor, data) {
    canvasMaker('chart1', 'myChart');
    var ctx = document.getElementById('myChart').getContext('2d');

    chart_pm26(ctx, data);

    headerAdder("Bridge & Culvert Condition", "title");
    paragraphAdder("Summary:", "subtitle", "summary-title");
    if(corridor == "AOI"){
        paragraphAdder("Out of " + data.dynamicTot + " bridges in the AOI, (" + data.dynamicPoor + " %) are in poor condition. ", "paragraph", "summary-info");
        paragraphAdder("Condition data was not available for " + data.tnodatabridges + " bridges within  the AOI.", "paragraph", "summary-info");

    }
    else{    paragraphAdder("Out of " + data.dynamicTot + " bridges in the " + corridor + " corridor, (" + data.dynamicPoor + " %) are in poor condition. ", "paragraph", "summary-info");
    paragraphAdder("Condition data was not available for " + data.tnodatabridges + " bridges within " + corridor + " corridor.", "paragraph", "summary-info");

}
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

