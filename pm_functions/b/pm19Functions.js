/** 
 * Creates graphs for PM19
 *  
*/


//var numOfInjuries = Texas2013Info.Driving_ClassA +Texas2014Info.Driving_ClassA+Texas2015Info.Driving_ClassA +Texas2015Info.Driving_ClassA+ Texas2016Info.Driving_ClassA + Texas2017Info.Driving_ClassA 
function pm19chartLine(ctx, Button){
     //line chart data
    var pm19_graphTitle; // legend changes depending on button clicked
    var pm19_graphValues = []; 

    //line chart data
    if(Button == 'D'){ // if Driving is click
        pm19_graphValues[0] = Texas2013Info.Driving_ClassA;
        pm19_graphValues[1] = Texas2014Info.Driving_ClassA;
        pm19_graphValues[2] = Texas2015Info.Driving_ClassA;
        pm19_graphValues[3] = Texas2016Info.Driving_ClassA;
        pm19_graphValues[4] = Texas2017Info.Driving_ClassA;
        pm19_graphTitle = 'Driving Serious Injuries';
    }else if(Button == 'F'){ // if Freight is click
        pm19_graphValues[0] = Texas2013Info.Freight_ClassA
        pm19_graphValues[1] = Texas2014Info.Freight_ClassA;
        pm19_graphValues[2] = Texas2015Info.Freight_ClassA;
        pm19_graphValues[3] = Texas2016Info.Freight_ClassA;
        pm19_graphValues[4] = Texas2017Info.Freight_ClassA;
        pm19_graphTitle = 'Freight  Serious Injuries';

    }else if(Button == 'W'){ 
        pm19_graphValues[0] = Texas2013Info.Walking_ClassA;
        pm19_graphValues[1] = Texas2014Info.Walking_ClassA;
        pm19_graphValues[2] = Texas2015Info.Walking_ClassA;
        pm19_graphValues[3] = Texas2016Info.Walking_ClassA;
        pm19_graphValues[4] = Texas2017Info.Walking_ClassA;
        pm19_graphTitle = 'Walking  Serious Injuries'; 
    }else if(Button == 'B'){
        pm19_graphValues[0] = Texas2013Info.Bike_ClassA;
        pm19_graphValues[1] = Texas2014Info.Bike_ClassA;
        pm19_graphValues[2] = Texas2015Info.Bike_ClassA;
        pm19_graphValues[3] = Texas2016Info.Bike_ClassA;
        pm19_graphValues[4] = Texas2017Info.Bike_ClassA;
        pm19_graphTitle = 'Bycycle  Serious Injuries';

    }

     var data = {
        labels: ['2013', '2014', '2015', '2016', '2017'],
        datasets: [
            {
            label: pm19_graphTitle,
            data: pm19_graphValues,
            backgroundColor: "blue",
            borderColor: "lightblue",
            fill: false,
            lineTension: 0,
            radius: 5
            },
            {
            label: "Total Serious Injuries",
            data: [ Texas2013Info.totInjuries2013, Texas2014Info.totInjuries2014, Texas2015Info.totInjuries2015,  Texas2016Info.totInjuries2016, Texas2017Info.totInjuries2017 ],
            backgroundColor: "green",
            borderColor: "lightgreen",
            fill: false,
            lineTension: 0,
            radius: 5
            }
        ]
    };

     //options
    var options = {
        responsive: true,
        title: {
        /*display: true,
        position: "top",
        text: "2013-2017",
        fontSize: 12,
        fontColor: "#111"*/
        },
        legend: {
        display: true,
        position: "bottom",
        labels: {
            fontColor: "#333",
            fontSize: 12,
            boxWidth:10
        }
        }
    };

    //create Chart class object
    var chart = new Chart(ctx, {
        type: "line",
        data: data,
        options: options
    });
}

    

	