// handles Button methods
function buttonSwitch(var1) {
    console.log("Friday Update");
    let buttonValue = var1.value;
    if(buttonValue == 'pm15tester' || buttonValue == 'pm16tester' || buttonValue == 'pm17tester'){
        clean();
        //pm15_tester();
        canvasMaker('chart1','myChart');
        var ctx2pm1 = document.getElementById('myChart').getContext('2d');
        pieChartpm1(ctx2pm1);
        headerAdder(buttonValue, "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder( valsPm1[0]+ "% of workers living in the El Paso MPO area reported to drive alone during their commute to work," 
         +"therefore only "+ valsPm1[1]+"% of workers commute via non-SOV modes, which includes carpooled via car, truck, or van. Workers"
         +"used Public Transport means such as bus or trolley bus, streetcar or trolley car, subway or elevated railroad, railroad,"
         +" and ferryboat. Some workers also used a taxicab, motorcycle, bicycle, walking, and other means to go to work or they worked"
         +" at home. …","paragraph","summary-info");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("2012-2016 5-year average estimates", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        anchorAdder("American Community Survey 5-Year Estimates","https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2018.html");
        anchorAdder("TIGER/Line Shapefiles and TIGER/Line Files ","https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-data.2016.html");
        paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("PM1 is calculated as:", "paragraph", "calc-info");
       // imageAdder('./img/performance_measures/pm1/pm1Eqn.PNG','calc-info');
        openNav();
    }
    if (buttonValue == 'pm1') {
        clean();
        canvasMaker('chart1','myChart');
        var ctx2pm1 = document.getElementById('myChart').getContext('2d');
        pieChartpm1(ctx2pm1);
        headerAdder("Percent of non-single occupancy vehicle (SOV) commute", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder( valsPm1[0]+ "% of workers living in the El Paso MPO area reported to drive alone during their commute to work," 
         +"therefore only "+ valsPm1[1]+"% of workers commute via non-SOV modes, which includes carpooled via car, truck, or van. Workers"
         +"used Public Transport means such as bus or trolley bus, streetcar or trolley car, subway or elevated railroad, railroad,"
         +" and ferryboat. Some workers also used a taxicab, motorcycle, bicycle, walking, and other means to go to work or they worked"
         +" at home. …","paragraph","summary-info");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("2012-2016 5-year average estimates", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        anchorAdder("American Community Survey 5-Year Estimates","https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2018.html");
        anchorAdder("TIGER/Line Shapefiles and TIGER/Line Files ","https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-data.2016.html");
        paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("PM1 is calculated as:", "paragraph", "calc-info");
        imageAdder('./img/performance_measures/pm1/pm1Eqn.PNG','calc-info');
        openNav();
    } else if(var1 == 'transitWC' || var1 == 'walkingWC' || var1 == 'BikingWC' || buttonValue == 'transitWC' || buttonValue == 'walkingWC'||buttonValue == 'BikingWC') {
        // No Clean() call needed
        canvasMaker('chart1/2','myChart');
        canvasMaker('chart2/2','myChart2');
        var ctx = document.getElementById('myChart').getContext('2d');
        var ctx2 = document.getElementById('myChart2').getContext('2d');
        pm2chart2(ctx2);
 
        if(var1 == 'transitWC' || buttonValue == 'transitWC'){
            pm2chart1(ctx, count_list);
            headerAdder("Percent of Workers Commuting by Transit", "title");
        }else if(var1 == 'walkingWC'|| buttonValue ==  'walkingWC'){
            pm2chart1(ctx, count_list);
            headerAdder("Percent of Workers Commuting by Walking", "title");
        }else{
            pm2chart1(ctx, count_list);
            headerAdder("Percent of Workers Commuting by Biking", "title");
        }

        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder("During 2012-2016 "+ valuesPm2[1]  +"% of workers living in the El Paso MPO area reported to walk to work, "+valuesPm2[1]+"% of workers bike, and "+ valuesPm2[0]+ "% of workers reported to commute by public transit. ", "paragraph", "summary-info");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder(" 2012-2016 5-year average estimates ", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        anchorAdder("American Community Survey 5-Year Estimates","https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.2018.html");
        anchorAdder("TIGER/Line Shapefiles","https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-data.2016.html");
        paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
        imageAdder('./img/performance_measures/pm2/transEqn.PNG','calc-title');
        imageAdder('./img/performance_measures/pm2/walkEqn.PNG','calc-title');
        imageAdder('./img/performance_measures/pm2/bikingEqn.PNG','calc-title');

        //Legend elements
        headerAdder("Legend", "legend_title");
        legendPM2Transit();
        openNav();
        openLegend();

        no_data_num = 0;
        low_num = 0;
        high_num = 0;
        count_list[0] = 0; count_list[1] = 0; count_list[2] = 0;

    } else if(buttonValue == 'pmbridge'){
        clean();
        canvasMaker('chart1/2','myChart');
        canvasMaker('chart2/2','myChart2');
        var ctx = document.getElementById('myChart').getContext('2d');
        var ctx2 = document.getElementById('myChart2').getContext('2d');
        chart1(ctx); 
        chart2(ctx2);
        headerAdder("Bridge Condition", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder("Within the Texas portion of the El Paso MPO area, there are " + pm26TX[0] + " bridges("+ pm26PrctTX[0]+ "%) in Good condition, "+pm26TX[1] + " bridges("+pm26PrctTX[1]+"%) in Fair condition, "+  pm26TX[2]+" bridges("+  pm26PrctTX[2]+"%) in Poor condition.", "paragraph", "summary-info");
        paragraphAdder("Within the New Mexico portion of the El Paso MPO area, there are " + pm26NM[0]+ " bridges("+pm26PrctNM[0]+"%) in Good conditions, "+ pm26NM[1] +" bridges("+pm26PrctNM[1]+"%) in Fair condition, "+pm26NM[2]+" bridge("+pm26PrctNM[2]+"%) in Poor condition.", "paragraph", "summary-info");
        paragraphAdder("Condition data was not available for "+ pm26P[5] + " bridges within the El Paso MPO area.", "paragraph", "summary-info");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("Bridges condition data as of 2018", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Bridge condition data was provided by TxDOT and NMDOT.", "paragraph", "data-info");
        paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("Bridge condition rating is based on the lowest condition rating from the following components: deck, substructure, superstructure or culvert.", "paragraph", "calc-info");
        paragraphAdder("Following the FHWA guidance, bridges with lowest rating between 7 and 9 are classified as Good, those rated 6 or 5 are classified as Fair and bridges with lowest rating 4 or below are classified as Poor.", "paragraph", "calc-info");
        paragraphAdder("More information about Bridge Condition Performance can be found at this TxDOT website: ", "paragraph", "calc-info");
        anchorAdder(1,"https://gis-txdot.opendata.arcgis.com/datasets/83af0d2957ca4c2eb340e4bd04a1046f_0/data?geometry=-134.852%2C24.539%2C-65.287%2C37.659");
        openNav();
    }else if(buttonValue == 'pm18Driving' || buttonValue == 'pm18Freight' || buttonValue == 'pm18Walking' || buttonValue == 'pm18Biking'){
        clean();
        pm18_pm19_Data_Texas();
        canvasMaker('chart1/2','myChart');
        canvasMaker('chart2/2','myChart2');
        var ctx = document.getElementById('myChart').getContext('2d');
        var ctx2 = document.getElementById('myChart2').getContext('2d');
        pm18StackedChart(ctx2);

        paragraphAdder("Summary:", "subtitle", "summary-title");
     
        if(buttonValue == 'pm18Driving'){
            headerAdder("Number of Fatalities - Driving", "title");
            paragraphAdder("During a 5-year period (2013-2017), a total of " +  pm18Calculations.totalCarCrashes + " crashes occurred in the El Paso MPO region and " + pm18Calculations.drivingDeathRate.toFixed(3) + "% of those crashes resulted in fatalities. "+ pm18Calculations.Driving +" people were killed.", "paragraph", "summary-info");
            pm18chartLine(ctx,'D'); 
        }
        else if(buttonValue == 'pm18Freight'){
            headerAdder("Number of Fatalities - Freight", "title");
            paragraphAdder("During a 5-year period (2013-2017), a total of " + pm18Calculations.totalFreightCrashes + " crashes that involved a commercial motor vehicle (CMV) occurred in the El Paso MPO region and " + pm18Calculations.freightDeathRate.toFixed(3) + "% of those crashes resulted in fatalities. " + pm18Calculations.freightTotalFatalities + " people were killed in CMV-related crashes. ", "paragraph", "summary-info");
            pm18chartLine(ctx,'F'); 
        }
        else if(buttonValue == 'pm18Walking'){
            headerAdder("Number of Fatalities - Walking", "title");
            paragraphAdder("During a 5-year period (2013-2017), a total of " + pm18Calculations.totalWalkingCrashes + " crashes that involved a pedestrian occurred in the El Paso MPO region and " + pm18Calculations.walkingDeathRate.toFixed(3)  + "% of those crashes resulted in fatalities. " + pm18Calculations.walkingTotalFatalities +" pedestrians were killed.", "paragraph", "summary-info");
            pm18chartLine(ctx,'W'); 
        }
        else if(buttonValue == 'pm18Biking'){
            headerAdder("Number of Fatalities - Biking", "title");
            paragraphAdder("During a 5-year period (2013-2017), a total of " + pm18Calculations.totalBikingCrashes + " crashes that involved a bicyclist occurred in the El Paso MPO region and "+ pm18Calculations.bikingDeathRate.toFixed(3)  +" of those crashes resulted in fatalities. " + pm18Calculations.bikingTotalFatalities + " bicyclists were killed.", "paragraph", "summary-info");
            pm18chartLine(ctx,'B'); 
        }
       
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("2013 – 2017", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Crash data provided by TxDOT and NMDOT.", "paragraph", "data-info");
        paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("The total number of crashes includes crashes of all severities: fatal, suspected serious injury, non-incapacitating injury, possible injury, and non-injury*. ", "paragraph", "calc-info");
        paragraphAdder("*Note: Crash severities classified by TxDOT as ‘non-injury’ or ‘unknown injury’ are here shown as ‘non-injury’. Crash severity classified by NMDOT as ‘unhurt’ is shown here as ‘non-injury’. ", "paragraph", "calc-info");


        openNav();
    }else if(buttonValue == 'pm19Driving' || buttonValue == 'pm19Freight' || buttonValue == 'pm19Walking' || buttonValue == 'pm19Biking'){
        clean();
        pm18_pm19_Data_Texas();
        canvasMaker('chart1/2','myChart');
        canvasMaker('chart2/2','myChart2');
        var ctx = document.getElementById('myChart').getContext('2d');
        var ctx2 = document.getElementById('myChart2').getContext('2d');
        pm18StackedChart(ctx2); 
        if(buttonValue == 'pm19Driving'){
            headerAdder("Number serious injuries - Driving", "title");
            paragraphAdder("During a 5-year period (2013-2017), a total of " +  pm18Calculations.totalCarCrashes + " crashes occurred in the El Paso MPO region and __ (__%)of those crashes resulted in serious injuries. " + pm19Calculations.Driving +  " people were seriously injured.", "paragraph", "summary-info");
            pm19chartLine(ctx, 'D');
        }
        else if(buttonValue == 'pm19Freight'){
            headerAdder("Number serious injuries - Freight", "title");
            paragraphAdder("During a 5-year period (2013-2017), a total of " + pm18Calculations.totalFreightCrashes + " crashes that involved a commercial vehicle occurred in the El Paso MPO region and __ (__%) of those crashes resulted in serious injuries. __ people were seriously injured in commercial vehicle-related crashes.", "paragraph","summary-info");
            pm19chartLine(ctx, 'F');
        }
        else if(buttonValue == 'pm19Walking'){
            headerAdder("Number serious injuries - Walking", "title");
            paragraphAdder("During a 5-year period (2013-2017), a total of " + pm18Calculations.totalWalkingCrashes + " crashes that involved a pedestrian occurred in the El Paso MPO region and __ (__%) of those crashes resulted in serious injuries. __ pedestrians were seriously injured.", "paragraph", "summary-info");
            pm19chartLine(ctx, 'W');
        }
        else if(buttonValue == 'pm19Biking'){
            headerAdder("Number serious injuries - Biking", "title");
            paragraphAdder("During a 5-year period (2013-2017), a total of " + pm18Calculations.totalBikingCrashes + " crashes that involved a bicyclist occurred in the El Paso MPO region and __ (__%) of those crashes resulted in serious injuries. __ bicyclits were seriously injured.", "paragraph", "summary-info");
            pm19chartLine(ctx, 'B');

        }
        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("2013 – 2017", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Crash data provided by TxDOT and NMDOT.", "paragraph", "data-info");
        paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("The total number of crashes includes crashes of all severities: fatal, suspected serious injury, non-incapacitating injury, possible injury, and non-injury*.", "paragraph", "calc-info");
        paragraphAdder("*Note: Crash severities classified by TxDOT as ‘non-injury’ or ‘unknown injury’ are here shown as ‘non-injury’. Crash severity classified by NMDOT as ‘unhurt’ is shown here as ‘non-injury’. ", "paragraph", "calc-info");
        openNav();
        
    }else if(buttonValue == 'pm22Driving'){
        clean();
        pm18_pm19_Data_Texas();
        canvasMaker('chart1/2','myChart');
        canvasMaker('chart2/2','myChart2');
        var ctx = document.getElementById('myChart').getContext('2d');
        var ctx2 = document.getElementById('myChart2').getContext('2d');
        pm22chartLine(ctx); 
        pm18StackedChart(ctx2); 

        headerAdder("Number of crashes on the CMP network", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder("During a 5-year period (2018-2022), a total of " + commafy(pm22Text) + " crashes occurred on the El Paso MPO Congestion Management Process (CMP) network.", "paragraph", "summary-info");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("2018 – 2022", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Crash data provided by TxDOT and NMDOT.", "paragraph", "data-info");
        paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("This performance measures includes all crashes that occurred within 140 ft. of the CMP network adopted by the MPO in 2023.  ", "paragraph", "calc-info");
        openNav();

    }else if(buttonValue == 'pm8Biking'){
        clean();
        canvasMaker('chart1','myChart');
        canvasMaker('chart2','myChart2');
        var ctx = document.getElementById('myChart').getContext('2d');
        var ctx2 = document.getElementById('myChart2').getContext('2d');
        pm8HorizontalBar(ctx);
        pm8HorizontalBar2(ctx2);

        headerAdder("Key Destinations in the El Paso MPO Region ", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder(" In the El Paso MPO region, there are a total of _ key destinations. In a half-mile of existing bikeways, there are a total of __  (__%) key destinations.  Once all proposed bikeways are complete, there will be a total of __  (__%)  key destinations within a half-mile of bikeways. ", "paragraph", "summary-info");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("Data was provided by various local agencies in 2018 ", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Crash data provided by TxDOT and NMDOT.", "paragraph", "data-info");
        paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("A ½ mile buffer was drawn around existing bikeways and the number of key destinations within the buffer was calculated. This analysis was also done for proposed bikeways, to indicate the potential result if all bikeways in existing plans were completed.", "paragraph", "calc-info");
        openNav();       

    }else if(buttonValue == 'pm15Driving' || buttonValue == 'pm16Driving'  || buttonValue == 'pm17Driving' ){
        pm15_handler(); // for pm 15 to pm 17
        clean();
        canvasMaker('chart1','myChart');
        var ctx = document.getElementById('myChart').getContext('2d');
        if(buttonValue == 'pm15Driving'){
            canvasMaker('chart2','myChart2');
            var ctx2 = document.getElementById('myChart2').getContext('2d');
            pm15chartLine(ctx) 
            pm15chartLine2(ctx2);
            headerAdder("Ozone Emissions ", "title");      
        }else if(buttonValue == 'pm16Driving'){
            pm16chartLine(ctx) 
            headerAdder("Carbon Monoxide Emissions (2014-2018)", "title");
        }else if(buttonValue == 'pm17Driving'){
            pm17chartLine(ctx) 
            headerAdder("Particulate Matter Emissions(2014-2018)", "title");
        }
        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder("According to the data available, ozone, carbon monoxide, and particulate matter pollution has been increasing in the last 5 years.", "paragraph", "summary-info");
        paragraphAdder("Stations with the highest annual readings for each pollutant are:" ,"paragraph", "summary-info");
        paragraphAdder("Ozone 8hr – El Paso Chamizal in 2018,", "paragraph", "summary-info");
        paragraphAdder("Ozone 1hr – Santa Teresa in 2017,", "paragraph", "summary-info"); 
        paragraphAdder("Particulate Matter – Desert View in 2016", "paragraph", "summary-info"); 
        paragraphAdder("Carbon Monoxide – El Paso UTEP in 2018.", "paragraph", "summary-info");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("2014-2018", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Texas Commission on Environmental Quality website and New Mexico Environment Department website", "paragraph", "data-info");
        paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("Annual readings are reported exactly as they appear at Texas Commission on Environmental Quality website and New Mexico Environment Department website. In Texas 8-hour ozone standard is reported, in NM only 1-hour ozone standard was available. Carbon monoxide and particulate matter (PM10) are also reported.", "paragraph", "calc-info");
        paragraphAdder("*Note: Not all monitors collected data for all three pollutants, also not all monitors have data for the full 5-year period.","paragraph", "calc-info");
        openNav();
    }else if(buttonValue == 'pm13Driving' || buttonValue == 'pm13Freight' || buttonValue == 'pm13Walking' || buttonValue == 'pm13Biking'){
        clean();
        canvasMaker('chart1','myChart');
        canvasMaker('chart2','myChart2');
        var ctx = document.getElementById('myChart').getContext('2d');
        var ctx2 = document.getElementById('myChart2').getContext('2d');
        headerAdder("Northbound Border Crossings", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        if(buttonValue == 'pm13Driving'){
            paragraphAdder("During a 5-year period (2014-2018), on average " + commafy(pm13Calculations.average) +" personal vehicles crossed northbound at the ports of entry. The port of entry with highest personal vehicle traffic is " + pm13Calculations.portWithHighestTrafficName + ".", "paragraph", "summary-info");
            pm13DrivingChart(ctx); 
        }
        else if(buttonValue == 'pm13Freight'){
            paragraphAdder("During a 5-year period (2014-2018), on average " + commafy(pm13Calculations.avgFreight) + " commercial vehicles crossed northbound at the ports of entry. The port of entry with highest commercial vehicle traffic is "+ pm13Calculations.portWithHighestTrafficNameFreight + ".", "paragraph", "summary-info");
            pm13FreightChart(ctx);  
        }
      
        else if(buttonValue == 'pm13Walking'){
            paragraphAdder("During a 5-year period (2014-2018), on average " +  commafy(pm13Calculations.avgWalking) + " pedestrians crossed northbound at the ports of entry. The port of entry with highest pedestrian traffic is "+ pm13Calculations.portWithHighestTrafficNameWalking + ".", "paragraph", "summary-info");
            pm13WalkingChart(ctx);  
        }
        pm13ModeGraph(ctx2);
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("2014-2018", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Customs and Border Protection, compiled by the City of El Paso International Bridges Department.", "paragraph", "data-info");
        paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("These statistics were obtained from the City of El Paso International Bridges Department. In this context, pedestrians include people walking or bicycling.", "paragraph", "calc-info");
        openNav();
    } else if(buttonValue == 'pm14Driving' || buttonValue == 'pm14Freight' || buttonValue == 'pm14Walking'){
        clean();
        canvasMaker('chart1','myChart');
        var ctx = document.getElementById('myChart').getContext('2d');
        headerAdder("Northbound Border Crossings", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        if(buttonValue == 'pm14Driving'){
            paragraphAdder("In 2018  the average wait time for personal vehicles crossing northbound at the ports of entry was " +  pm14Calculations.vehAvgTime +  " minutes. The port of entry with highest wait time for personal vehicles in 2018 was "+pm14Calculations.vehHighestWait+".", "paragraph", "summary-info");
            pm14DrivingChart(ctx);
            
        }
        else if(buttonValue == 'pm14Freight'){                
            paragraphAdder("In 2018  the average wait time for commercial vehicles crossing northbound at the ports of entry was "+ pm14Calculations.freightAvgTime+" minutes. The port of entry with highest wait time for commercial vehicles in 2018 was "+ pm14Calculations.freightHigherstWait+".", "paragraph", "summary-info");
            pm14FreightChart(ctx);
        }
      
        else if(buttonValue == 'pm14Walking'){
            paragraphAdder("In 2018  the average wait time for pedestrians crossing northbound at the ports of entry was "+ pm14Calculations.WalkAvgTime +" minutes. The port of entry with highest wait time for pedestrians in 2018 was "+  pm14Calculations.walkHighestWait +".", "paragraph", "summary-info");
            pm14WalkingChart(ctx);
        }
        
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("2014-2018", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Customs and Border Protection, compiled by the City of El Paso International Bridges Department.", "paragraph", "data-info");
        paragraphAdder("How the Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("These statistics were obtained from the City of El Paso International Bridges Department. These wait times were estimated based on the queue length from the end of the line to primary inspection. In this context, pedestrians include people walking or bicycling.", "paragraph", "calc-info");
        console.log(pm14PV);
        openNav();
    }
    else if(buttonValue == 'pm4Biking'){
        clean();
        headerAdder("Number of Biking Trips Recorded by Strava", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder("In 2018, a total of 6,776,200 bike trips were recorded by Strava in the El Paso MPO region. ", "paragraph", "summary-info");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("2018 data licensed by Strava","paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Strava Metro data provided via a sublicense from the Texas Department of Transportation.", "paragraph", "data-info");
        paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("This performance measure reflects the total number of bike trips on the street regardless of the direction (column TACTCNT) recorded by Strava in 2018. Trips recorded on Interstate 10 were removed from this dataset, since I-10 is a limited access facility. The legend shows the data in a geometric interval, which provides the best viewing distribution.", "paragraph", "calc-info");
        openNav();
    }
   
    else if (buttonValue == 'pm4Walking'){
        clean();
        headerAdder("Number of Walking Trips Recorded by Strava", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder("In 2017, a total of 1,505,755 walk trips were recorded by Strava in the El Paso MPO region. ", "paragraph", "summary-info");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("2017 data from Strava Metro.", "paragraph", "analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Strava Metro (2017) provided via a sublicense from the Texas Department of Transportation.", "paragraph", "data-info");
        paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("This performance measure reflects the total number of walk trips on the street regardless of the direction (column TACTCNT) recorded by Strava in 2017. Trips recorded on the Interstate 10 were removes from this dataset, since I-10 is a limited access facility. The legend shows the data in a geometric interval, which provides the best viewing distribution.", "paragraph", "calc-info");
        openNav();
    }
    else if(buttonValue == 'pm11Walking'){
        clean();
        console.log("11");
        headerAdder("Length of Sidewalks per Mile", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder("There are 3,012.355 miles of sidewalks along 2,692.873 miles of roadways within the City of El Paso city limits. Assuming that each roadway has a sidewalk on both sides, there are 2,373.390 miles of sidewalks missing.","paragraph","summary-info");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("Sidewalk GIS layer was provided in 2018","paragraph","analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("City of El Paso","paragraph","data-info");
        paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("Mileage of roadway network (stcent, without limited access roadways such as the Interstate 10, US 54, Loop 375, Cesar Chavez Memorial Highway, Spur 601) was compared with mileage of sidewalks. Only sidewalks with status ‘complete’, ‘pre-existing’, ‘private’ or ‘scheduled’ were included in the analysis. Sidewalks with no information about status, or status ‘removed’, ‘unfeasible’, or ‘awaiting assessment’ were not included in this performance measure. ","paragraph","calc-info");
        paragraphAdder("Note: A GIS sidewalk layer was at the time of analysis available only from the City of El Paso. GIS data from other municipalities will be added as it becomes available.","paragraph","calc-info");
        openNav();
    }
    else if(buttonValue == 'pm12Biking'){
        clean();
        headerAdder("Bikeway Buildout", "title");
        canvasMaker('chart1','myChart');
        var ctx = document.getElementById('myChart').getContext('2d');
        pm12StackedChart(ctx);
        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder("In the El Paso MPO region, there are a total of __  (__%) miles of existing bikeways. There are __  (__%) miles of proposed bikeways. If all proposed bikeways are completed, there would be a total of _ miles in the El Paso MPO region.","paragraph","summary-info");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("2018 bikeway data provided.","paragraph","analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Bikeway data was provided by the municipalities: Paso del Norte Health foundation, City of Sunland Park, City of San Elizario and the City of El Paso. ","paragraph","data-info");
        paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("A layer package of the bikeways was provided by _.  The data inside the layer package had contained columns that have its status, proposed or existing, which were filtered to make a distinction between the two. The files containing existing bikeways were placed into a new, individual layer. The miles were then calculated for both existing and all bikeways.","paragraph","calc-info");
        openNav();
    }
    else if(buttonValue == 'pm20B' || buttonValue == 'pm20P'){
        clean();
        headerAdder("Number of crashes between motorized vehicles and pedestrians/bicyclists nearby bus stops.", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");
        paragraphAdder("68.69% of all pedestrian crashes and 48.80% of all bicycle crashes in El Paso region occurred within 200 feet of transit stops. Majority of the crashes near bus stops occurred in downtown area, Mesa St. Dyer St. and Hondo Pass. The highest observed number of crashes within 200 ft. from a bus stop is 10 for pedestrian (on Paisano Dr. between Alley D. and Oregon St.) and 2 for bicycle (15 locations have the same number).","paragraph","summary-info");
        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("Crashes 2013-2017, SunMetro bus stops as of 2019","paragraph","analysis-info");
        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Crash data from TxDOT, location of bus stops from Sun Metro ","paragraph","data-info");
        paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("A buffer of 200 ft. was created from the bus stops to identify how many crashes occurred within that distance. The crashes are from 2013 to 2017, and the bus stop locations are as of 2019.","paragraph","calc-info");
        openNav();
    }  
    else if(buttonValue == 'pm21Driving'){
        clean();
        headerAdder("Number of projects that include safety enhancements located near crash hotspots.", "title");
        paragraphAdder("Summary:", "subtitle", "summary-title");

        paragraphAdder("► Project C035X. Hot-spot type: Persistent.","paragraph","summary-info");
        paragraphAdder("► Project P402X-05A. Hot-spot type: Persistent.","paragraph","summary-info");
        paragraphAdder("► Project P464X-CAP. Hot-spot type: Persistent.","paragraph","summary-info");
        paragraphAdder("► Project F057X-CAP. Hot-spot type: Persistent.","paragraph","summary-info");
        paragraphAdder("► Project F405X-CAP. Hot-spot type: Persistent.","paragraph","summary-info");
        paragraphAdder("► Project A136X-CAP. Hot-spot type: Persistent","paragraph","summary-info");
        paragraphAdder("► Project F407A-CAP. Hot-spot type: Persistent.","paragraph","summary-info");
        paragraphAdder("► Project F407B-CAP. Hot-spot type: Persistent.","paragraph","summary-info");
        paragraphAdder("► Project F058X-CAP. Hot-spot type: Persistent. ","paragraph","summary-info");
        paragraphAdder("► Project F407C. Hot-spot type: Persistent.","paragraph","summary-info");
        paragraphAdder("► Project I061X-CAP. Hot-spot type: Persistent.","paragraph","summary-info");
        paragraphAdder("► Project P002X-CAP. Hot-spot type: Persistent.","paragraph","summary-info");
        paragraphAdder("► Project P533X. Hot-spot type: Persistent.","paragraph","summary-info");
        paragraphAdder("► Project T069X. Hot-spot type: Persistent, New, Intensifying.","paragraph","summary-info");
        paragraphAdder("► Project P428X-MOD. Hot-spot type: Persistent, New, Oscillating.","paragraph","summary-info");
        paragraphAdder("► Project P428X-CAP-2. Hot-spot type: Persistent, Intensifying.","paragraph","summary-info");
        paragraphAdder("► Project P428X-CAP-2. Hot-spot type: Persistent, Intensifying.","paragraph","summary-info");
        paragraphAdder("► Project M087B. Hot-spot type: Persistent, Intensifying","paragraph","summary-info");
        paragraphAdder("► Project R307D. Hot-spot type: Persistent, Intensifying","paragraph","summary-info");
        paragraphAdder("► Project I063X-CAP. Hot-spot type: Persistent, Intensifying. ","paragraph","summary-info");
        paragraphAdder("► Project P530X-MOD. Hot-spot type: Persistent, Intensifying.","paragraph","summary-info");
        paragraphAdder("► Project M025B. Hot-spot type: Persistent, Intensifying, Oscillating. ","paragraph","summary-info");
        paragraphAdder("► Project M087A. Hot-spot type: Persistent, Intensifying, Oscillating. ","paragraph","summary-info");
        paragraphAdder("► Project M090X. Hot-spot type: Persistent, Intensifying, Oscillating. ","paragraph","summary-info");
        paragraphAdder("► Project F056X-CAP. Hot-spot type: Persistent, Oscillating.","paragraph","summary-info");
        paragraphAdder("► Project I406X-CAP. Hot-spot type: Persistent, Oscillating.","paragraph","summary-info");
        paragraphAdder("► Project P410X-15A. Hot-spot type: Persistent, Oscillating.","paragraph","summary-info");
        paragraphAdder("► Project E304X. Hot-spot type: Intensifying.","paragraph","summary-info");
        paragraphAdder("► Project E303X. Hot-spot type: Intensifying.","paragraph","summary-info");
        paragraphAdder("► Project M089A. Hot-spot type: Intensifying.","paragraph","summary-info");
        paragraphAdder("► Project B300X. Hot-spot type: Intensifying.","paragraph","summary-info");
        paragraphAdder("► Project B301X. Hot-spot type: Intensifying.","paragraph","summary-info");
        paragraphAdder("► Project E302X-1. Hot-spot type: Intensifying.","paragraph","summary-info");
        paragraphAdder("► Project E302X-2. Hot-spot type: Intensifying.","paragraph","summary-info");
        paragraphAdder("► Project F060X. Hot-spot type: Intensifying.","paragraph","summary-info");
        paragraphAdder("► Project P334X. Hot-spot type: Intensifying.","paragraph","summary-info");
        paragraphAdder("► Project I006X-15A. Hot-spot type: Intensifying.","paragraph","summary-info");
        paragraphAdder("► Project A434X-CAP. Hot-spot type: Oscillating.","paragraph","summary-info");
        paragraphAdder("► Project I405X-CAP. Hot-spot type: Oscillating.","paragraph","summary-info");

        paragraphAdder("Analysis Period:", "subtitle", "analysis-title");
        paragraphAdder("Crash data from 2013-2017, safety projects identified from the Metropolitan Transportation Plan Destino 2045","paragraph","analysis-info");

        paragraphAdder("Data Source:", "subtitle", "data-title");
        paragraphAdder("Crash data provided by TxDOT and NMDOT. Destino 2045 projects identified by El Paso MPO.","paragraph","data-info");
       
        paragraphAdder("How Performance Measure was Calculated:", "subtitle", "calc-title");
        paragraphAdder("Most of the projects in the map were obtained from Alliance. ","paragraph","calc-info");
        paragraphAdder("Most of the projects are represented as lanes in the maps, and three of them are represented as a point, those are: C035X, P333X and P334X.","paragraph","calc-info");
        paragraphAdder("There is no layer for safety projects in Dona Ana and Otero counties, just the crash hotspots was calculated.","paragraph","calc-info");
        paragraphAdder("Space-Time Analysis was made to identify the crash hot spots which classified as follows:","paragraph","calc-info");
        paragraphAdder("Space-Time Analysis was made to identify the crash hot spots which classified as follows:","paragraph","calc-info");
        paragraphAdder("► Persistent: \“A location that has been a statistically significant hot spot for ninety percent of the time-step intervals with no discernible trend indicating an increase or decrease in the intensity of clustering over time”\ (ArcGIS).","paragraph","calc-info");
        paragraphAdder("► New: \“A location that is a statistically significant hot spot for the final time step and has never been a statistically significant hot spot before”\ (ArcGIS). ","paragraph","calc-info");
        paragraphAdder("► Intensifying: \“A location that has been a statistically significant hot spot for ninety percent of the time-step intervals, including the final time step. In addition, the intensity of clustering of high counts in each time step is increasing overall and that increase is statistically significant”\ (ArcGIS).","paragraph","calc-info");
        paragraphAdder("► Oscillating: \“A statistically significant hot spot for the final time-step interval that has a history of also being a statistically significant cold spot during a prior time step. Less than ninety percent of the time-step intervals have been statistically significant hot spots”\ (ArcGIS).","paragraph","calc-info");

        openNav();
    }

}
