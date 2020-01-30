/** 
 * Creates graphs for PM18
 * Calculates data for both Pm18 and PM19
 *  
*/
// Texas Variables, holds Columns 
var classA = [];   var dateT = [];    var typeT = [];    var longT = [];     var latT = [];
var classA_T = [];      var classB_T = []; var classC_T = []; var classO_T = [];  var unknownT = [];
var Non_InjuriesT = []; var sizeT = [];
// NM
var PEDinv = []; var  PECinv = [];  var TRKinv = [];
// These counters are for the 4 categories on the Cordinates, aids in keeping track 
var pm40W =0; var pm40B=0; var pm40F = 0; var pm40D = 0;  // Counter 

// loads data needed
function pm40Data(){ 
   //Texas
    fetch('./results.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            console.log("pm40__1");
            sizeT.push(myJson["PMS_40_19_tx"]["texasDataLength"][0]);
            console.log(sizeT);
             let counter = 90858;
            for(let i = 0; i < 90858; i++){ //90858
                classA.push(parseInt(myJson["PMS_40_19_tx"]["fatalitiesT"][i]));
                dateT.push(myJson["PMS_40_19_tx"]["dateT"][i]);
                typeT.push(myJson["PMS_40_19_tx"]["typeT"][i]);
                longT.push(parseFloat(myJson["PMS_40_19_tx"]["longT"][i]));
                latT.push(parseFloat(myJson["PMS_40_19_tx"]["latT"][i]));
                classA_T.push(parseInt(myJson["PMS_40_19_tx"]["classA_T"][i]));  
                classB_T.push(parseInt(myJson["PMS_40_19_tx"]["classB_T"][i]));
                classC_T.push(parseInt(myJson["PMS_40_19_tx"]["classC_T"][i]));
                unknownT.push(parseInt(myJson["PMS_40_19_tx"]["unknownT"][i])); // these 2 are combined to make O
                Non_InjuriesT.push(parseInt(myJson["PMS_40_19_tx"]["Non_InjuriesT"][i]));
                loadClassOTexas(i);
                
            }
            //New Mexico
            for(let i = 0; i < 25263; i++){ 
                classA.push(parseInt(myJson["PMS_40_19_nm"]["fatalitiesNM"][i]));
                dateT.push((myJson["PMS_40_19_nm"]["dateNM"][i])).toString();
                PEDinv.push(myJson["PMS_40_19_nm"]["PED_NM"][i]);
                PECinv.push(myJson["PMS_40_19_nm"]["PEC_NM"][i]);
                TRKinv.push(myJson["PMS_40_19_nm"]["TRK_NM"][i]);
                longT.push(parseFloat(myJson["PMS_40_19_nm"]["longNM"][i]));
                latT.push(parseFloat(myJson["PMS_40_19_nm"]["latNM"][i]));
                classA_T.push(parseInt(myJson["PMS_40_19_nm"]["classA_NM"][i]));
                classB_T.push(parseInt(myJson["PMS_40_19_nm"]["classB_NM"][i]));
                classC_T.push(parseInt(myJson["PMS_40_19_nm"]["classC_NM"][i]));
                classO_T.push(parseInt(myJson["PMS_40_19_nm"]["classO_NM"][i]));
                CreateTypeNM(counter); // update type at the same time at same index
                counter++;
            }
            console.log("new mexico loaded");
  
        });
}

//3 rows must be check in order to assign TYPE values for NM
function CreateTypeNM(i){
    if(PEDinv[i] == "Involved"){  
        typeT.push("PED");
    }else if(PECinv[i] == "Involved"){
        typeT.push("BIKE");
    }else if(TRKinv[i] == "Involved"){
        typeT[i] == "COMV";
    }else{ // type GEN
        typeT.push("GEN");
    }
    
}
//load 
function loadClassOTexas(x){
    classO_T.push(unknownT[x] +  Non_InjuriesT[x]);
}

//Info filtered by Year
var Texas2013Info = {
    Driving_ClassA: 0,  Driving_ClassB: 0, Driving_ClassC:0, Driving_ClassO:0, DrivingTotFatalities:0, crashes:0,
    Freight_ClassA: 0,  Freight_ClassB: 0, Freight_ClassC:0, Freight_ClassO:0, FreightTotFatalities:0,
    Walking_ClassA: 0,  Walking_ClassB: 0, Walking_ClassC:0, Walking_ClassO:0, WalkingTotFatalities:0,
    Bike_ClassA: 0,     Bike_ClassB: 0,    Bike_ClassC:0,    Bike_ClassO:0,     BikeTotFatalities:0 , totFatalities2013:0
};
var Texas2014Info = {
    Driving_ClassA: 0,  Driving_ClassB: 0, Driving_ClassC:0, Driving_ClassO:0, DrivingTotFatalities:0, crashes:0,
    Freight_ClassA: 0,  Freight_ClassB: 0, Freight_ClassC:0, Freight_ClassO:0, FreightTotFatalities:0,
    Walking_ClassA: 0,  Walking_ClassB: 0, Walking_ClassC:0, Walking_ClassO:0, WalkingTotFatalities:0,
    Bike_ClassA: 0,     Bike_ClassB: 0,    Bike_ClassC:0,    Bike_ClassO:0,     BikeTotFatalities:0, totFatalities2014:0
};
var Texas2015Info = {
    Driving_ClassA: 0,  Driving_ClassB: 0, Driving_ClassC:0, Driving_ClassO:0, DrivingTotFatalities:0, crashes:0,
    Freight_ClassA: 0,  Freight_ClassB: 0, Freight_ClassC:0, Freight_ClassO:0, FreightTotFatalities:0,
    Walking_ClassA: 0,  Walking_ClassB: 0, Walking_ClassC:0, Walking_ClassO:0, WalkingTotFatalities:0,
    Bike_ClassA: 0,     Bike_ClassB: 0,    Bike_ClassC:0,    Bike_ClassO:0,     BikeTotFatalities:0, totFatalities2015:0
};
var Texas2016Info = {
    Driving_ClassA: 0,  Driving_ClassB: 0, Driving_ClassC:0, Driving_ClassO:0, DrivingTotFatalities:0, crashes:0,
    Freight_ClassA: 0,  Freight_ClassB: 0, Freight_ClassC:0, Freight_ClassO:0, FreightTotFatalities:0,
    Walking_ClassA: 0,  Walking_ClassB: 0, Walking_ClassC:0, Walking_ClassO:0, WalkingTotFatalities:0,
    Bike_ClassA: 0,     Bike_ClassB: 0,    Bike_ClassC:0,    Bike_ClassO:0,     BikeTotFatalities:0, totFatalities2016:0
};
var Texas2017Info = {
    Driving_ClassA: 0,  Driving_ClassB: 0, Driving_ClassC:0, Driving_ClassO:0, DrivingTotFatalities:0, crashes:0,
    Freight_ClassA: 0,  Freight_ClassB: 0, Freight_ClassC:0, Freight_ClassO:0, FreightTotFatalities:0,
    Walking_ClassA: 0,  Walking_ClassB: 0, Walking_ClassC:0, Walking_ClassO:0, WalkingTotFatalities:0,
    Bike_ClassA: 0,     Bike_ClassB: 0,    Bike_ClassC:0,    Bike_ClassO:0,     BikeTotFatalities:0, totFatalities2017:0
};

var totalFatalities = {
    Driving: 0

}
// Cordinates that will be placed on map, each fatality point has all of this info.  For PM18
var driving_Cordinates_Fatalities = {
    lat:[], lon:[], classA:[], classB:[], classC:[], ClassO:[], year:[], fatality:[]
};
var Freight_Cordinates_Fatalities = {
    lat:[], lon:[], classA:[], classB:[], classC:[], ClassO:[], year:[], fatality:[]
};
var Walking_Cordinates__Fatalities = {
    lat:[], lon:[], classA:[], classB:[], classC:[], ClassO:[], year:[], fatality:[]
};
var Bike_Cordinates_Fatalities = {
    lat:[], lon:[], classA:[], classB:[], classC:[], ClassO:[], year:[], fatality:[]
};

// Pm19
var driving_SeriousInjury = {
    lat:[], lon:[], classA:[], classB:[], classC:[], ClassO:[], year:[], fatality:[]
};
var Freight_SeriousInjury = {
    lat:[], lon:[], classA:[], classB:[], classC:[], ClassO:[], year:[], fatality:[]
};
var Walking_SeriousInjury = {
    lat:[], lon:[], classA:[], classB:[], classC:[], ClassO:[], year:[], fatality:[]
};
var Bike_SeriousInjury = {
    lat:[], lon:[], classA:[], classB:[], classC:[], ClassO:[], year:[], fatality:[]
};


// Loads Texas Info 
function pm40_pm19_Data_Texas(){ 
    //Filter Info
   // console.log("6/10/2019 Debugging");

    //console.log(classB_T);
    //console.log(classC_T);
    //console.log(classO_T);
    for(let x = 0; x < 90858; x++){ //El paso: 90858 *** total: 116120
        //Filter by Year
        //console.log(dateT[x]);
       // console.log("index for date");
      //  console.log(dateT[x]);
      //  console.log("cm0");
        if((dateT[x].charAt(dateT[x].length-1)) == "3"){ //******************************************** 2013
            //console.log("date: " + dateT[x].charAt(dateT[x].length-1));
            // Filter by Category and Classes, For stack Graph PM 18 & PM19. Counts are stored on Dictionaries 
                //Yearly Data updated here
            if(classA_T[x] != 0 && typeT[x] == "GEN")  Texas2013Info.Driving_ClassA += classA_T[x];
            if(classB_T[x] != 0 && typeT[x] == "GEN")  Texas2013Info.Driving_ClassB += classB_T[x];
            if(classC_T[x] != 0 && typeT[x] == "GEN")  Texas2013Info.Driving_ClassC += classC_T[x];
            if(classO_T[x] != 0 && typeT[x] == "GEN")  Texas2013Info.Driving_ClassO += classO_T[x];

            if(classA_T[x] != 0 && typeT[x] == "COMV") Texas2013Info.Freight_ClassA += classA_T[x];
            if(classB_T[x] != 0 && typeT[x] == "COMV") Texas2013Info.Freight_ClassB += classB_T[x];
            if(classC_T[x] != 0 && typeT[x] == "COMV") Texas2013Info.Freight_ClassC += classC_T[x];
            if(classO_T[x] != 0 && typeT[x] == "COMV") Texas2013Info.Freight_ClassO += classO_T[x];

            if(classA_T[x] != 0 && typeT[x] == "PED")  Texas2013Info.Walking_ClassA += classA_T[x];
            if(classB_T[x] != 0 && typeT[x] == "PED")  Texas2013Info.Walking_ClassB += classB_T[x];
            if(classC_T[x] != 0 && typeT[x] == "PED")  Texas2013Info.Walking_ClassC += classC_T[x];
            if(classO_T[x] != 0 && typeT[x] == "PED")  Texas2013Info.Walking_ClassO += classO_T[x];

            if(classA_T[x] != 0 && typeT[x] == "BIKE") Texas2013Info.Bike_ClassA += classA_T[x];
            if(classB_T[x] != 0 && typeT[x] == "BIKE") Texas2013Info.Bike_ClassB += classB_T[x];
            if(classC_T[x] != 0 && typeT[x] == "BIKE") Texas2013Info.Bike_ClassC += classC_T[x];
            if(classO_T[x] != 0 && typeT[x] == "BIKE") Texas2013Info.Bike_ClassO += classO_T[x];
            
            Texas2013Info.crashes++; // total crashes on current year,  El Paso Crashes 

            // Filter info of Fatalies by Category type and current year
            if(classA[x] != 0 && typeT[x] == "GEN"){ 
                Texas2013Info.DrivingTotFatalities+=classA[x]; // count Fatalities (includes cordinates with 0)
                // console.log("debuggin 2013 Fatalities");
                // console.log(Texas2013Info.DrivingTotFatalities);
                // console.log("index");
                // console.log(x);
                // Here we are storing cordinates with the info on that point
                if(latT[x]!=0 && longT[x] !=0){ // filter the coordinates that are not 0
                    driving_Cordinates_Fatalities.lat[pm18D] = latT[x];  
                    driving_Cordinates_Fatalities.lon[pm18D] = longT[x]; 
                    driving_Cordinates_Fatalities.year[pm18D] = "2013"; 
                    driving_Cordinates_Fatalities.fatality[pm18D] = classA[x]; 
                    driving_Cordinates_Fatalities.classA[pm18D] = classA_T[x];
                    driving_Cordinates_Fatalities.classB[pm18D] = classB_T[x];
                    driving_Cordinates_Fatalities.classC[pm18D] = classC_T[x];
                    //driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18D++; // this counter aids in keeping track of the cordinates of this type (driving, freight, walking, biking)
                }
            }else if(classA[x] != 0 && typeT[x] == "COMV"){
                Texas2013Info.FreightTotFatalities+=classA[x];
                if(latT[x]!=0 && longT[x] !=0){ // filter the coordinates that are not 0
                    Freight_Cordinates_Fatalities.lat[pm18F] = latT[x]; 
                    Freight_Cordinates_Fatalities.lon[pm18F] = longT[x];
                    Freight_Cordinates_Fatalities.year[pm18F] = "2013"; 
                    Freight_Cordinates_Fatalities.fatality[pm18F] = classA[x]; 
                    Freight_Cordinates_Fatalities.classA[pm18F] = classA_T[x];
                    Freight_Cordinates_Fatalities.classB[pm18F] = classB_T[x];
                    Freight_Cordinates_Fatalities.classC[pm18F] = classC_T[x];
                    //driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18F++;
                }
            }else if(classA[x] != 0 && typeT[x] == "PED"){
                Texas2013Info.WalkingTotFatalities+=classA[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Walking_Cordinates__Fatalities.lat[pm18W] = latT[x]; 
                    Walking_Cordinates__Fatalities.lon[pm18W] = longT[x]; 
                    Walking_Cordinates__Fatalities.year[pm18W] = "2013"; 
                    Walking_Cordinates__Fatalities.fatality[pm18W] = classA[x]; 
                    Walking_Cordinates__Fatalities.classA[pm18W] = classA_T[x];
                    Walking_Cordinates__Fatalities.classB[pm18W] = classB_T[x];
                    Walking_Cordinates__Fatalities.classC[pm18W] = classC_T[x];
                    //driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18W++;
                }
            }else if(classA[x] != 0 && typeT[x] == "BIKE"){
                Texas2013Info.BikeTotFatalities+=classA[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Bike_Cordinates_Fatalities.lat[pm18B] = latT[x]; 
                    Bike_Cordinates_Fatalities.lon[pm18B] = longT[x]; 
                    Bike_Cordinates_Fatalities.year[pm18B] = "2013"; 
                    Bike_Cordinates_Fatalities.fatality[pm18B] = classA[x]; 
                    Bike_Cordinates_Fatalities.classA[pm18B] = classA_T[x];
                    Bike_Cordinates_Fatalities.classB[pm18B] = classB_T[x];
                    Bike_Cordinates_Fatalities.classC[pm18B] = classC_T[x];
                    //driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18B++;
                    }
            }
        }else if((dateT[x].charAt(dateT[x].length-1)) == "4"){ //******************************************** 2014
            if(classA_T[x] != 0 && typeT[x] == "GEN")  Texas2014Info.Driving_ClassA += classA_T[x];
            if(classB_T[x] != 0 && typeT[x] == "GEN")  Texas2014Info.Driving_ClassB += classB_T[x];
            if(classC_T[x] != 0 && typeT[x] == "GEN")  Texas2014Info.Driving_ClassC += classC_T[x];
            if(classO_T[x] != 0 && typeT[x] == "GEN")  Texas2014Info.Driving_ClassO += classO_T[x];

            if(classA_T[x] != 0 && typeT[x] == "COMV") Texas2014Info.Freight_ClassA += classA_T[x];
            if(classB_T[x] != 0 && typeT[x] == "COMV") Texas2014Info.Freight_ClassB += classB_T[x];
            if(classC_T[x] != 0 && typeT[x] == "COMV") Texas2014Info.Freight_ClassC += classC_T[x];
            if(classO_T[x] != 0 && typeT[x] == "COMV") Texas2014Info.Freight_ClassO += classO_T[x];

            if(classA_T[x] != 0 && typeT[x] == "PED")  Texas2014Info.Walking_ClassA += classA_T[x];
            if(classB_T[x] != 0 && typeT[x] == "PED")  Texas2014Info.Walking_ClassB += classB_T[x];
            if(classC_T[x] != 0 && typeT[x] == "PED")  Texas2014Info.Walking_ClassC += classC_T[x];
            if(classO_T[x] != 0 && typeT[x] == "PED")  Texas2014Info.Walking_ClassO += classO_T[x];

            if(classA_T[x] != 0 && typeT[x] == "BIKE") Texas2014Info.Bike_ClassA += classA_T[x];
            if(classB_T[x] != 0 && typeT[x] == "BIKE") Texas2014Info.Bike_ClassB += classB_T[x];
            if(classC_T[x] != 0 && typeT[x] == "BIKE") Texas2014Info.Bike_ClassC += classC_T[x];
            if(classO_T[x] != 0 && typeT[x] == "BIKE") Texas2014Info.Bike_ClassO += classO_T[x];
           
            Texas2014Info.crashes++;

            if(classA[x] != 0 && typeT[x] == "GEN"){
                Texas2014Info.DrivingTotFatalities+=classA[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    driving_Cordinates_Fatalities.lat[pm18D] = latT[x]; 
                    driving_Cordinates_Fatalities.lon[pm18D] = longT[x]; 
                    driving_Cordinates_Fatalities.year[pm18D] = "2014"; 
                    driving_Cordinates_Fatalities.fatality[pm18D] = classA[x];
                    driving_Cordinates_Fatalities.classA[pm18D] = classA_T[x];
                    driving_Cordinates_Fatalities.classB[pm18D] = classB_T[x];
                    driving_Cordinates_Fatalities.classC[pm18D] = classC_T[x];
                    //driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18D++;
                }
            }else if(classA[x] != 0 && typeT[x] == "COMV"){
                Texas2014Info.FreightTotFatalities+=classA[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Freight_Cordinates_Fatalities.lat[pm18F] = latT[x]; 
                    Freight_Cordinates_Fatalities.lon[pm18F] = longT[x];
                    Freight_Cordinates_Fatalities.year[pm18F] = "2014"; 
                    Freight_Cordinates_Fatalities.fatality[pm18F] = classA[x]; 
                    Freight_Cordinates_Fatalities.classA[pm18F] = classA_T[x];
                    Freight_Cordinates_Fatalities.classB[pm18F] = classB_T[x];
                    Freight_Cordinates_Fatalities.classC[pm18F] = classC_T[x];
                    //driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18F++;
                }
            }else if(classA[x] != 0 && typeT[x] == "PED"){
                Texas2014Info.WalkingTotFatalities+=classA[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Walking_Cordinates__Fatalities.lat[pm18W] = latT[x]; 
                    Walking_Cordinates__Fatalities.lon[pm18W] = longT[x]; 
                    Walking_Cordinates__Fatalities.year[pm18W] = "2014"; 
                    Walking_Cordinates__Fatalities.fatality[pm18W] = classA[x]; 
                    Walking_Cordinates__Fatalities.classA[pm18W] = classA_T[x];
                    Walking_Cordinates__Fatalities.classB[pm18W] = classB_T[x];
                    Walking_Cordinates__Fatalities.classC[pm18W] = classC_T[x];
                    //driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18W++;
                }
            }else if(classA[x] != 0 && typeT[x] == "BIKE"){
                Texas2014Info.BikeTotFatalities+=classA[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Bike_Cordinates_Fatalities.lat[pm18B] = latT[x]; 
                    Bike_Cordinates_Fatalities.lon[pm18B] = longT[x]; 
                    Bike_Cordinates_Fatalities.year[pm18B] = "2014"; 
                    Bike_Cordinates_Fatalities.fatality[pm18B] = classA[x]; 
                    Bike_Cordinates_Fatalities.classA[pm18B] = classA_T[x];
                    Bike_Cordinates_Fatalities.classB[pm18B] = classB_T[x];
                    Bike_Cordinates_Fatalities.classC[pm18B] = classC_T[x];
                    //driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18B++;
                }
            }
        }else if((dateT[x].charAt(dateT[x].length-1)) == "5"){ //******************************************** 2015
            if(classA_T[x] != 0 && typeT[x] == "GEN")  Texas2015Info.Driving_ClassA += classA_T[x];
            if(classB_T[x] != 0 && typeT[x] == "GEN")  Texas2015Info.Driving_ClassB += classB_T[x];
            if(classC_T[x] != 0 && typeT[x] == "GEN")  Texas2015Info.Driving_ClassC += classC_T[x];
            if(classO_T[x] != 0 && typeT[x] == "GEN")  Texas2015Info.Driving_ClassO += classO_T[x];

            if(classA_T[x] != 0 && typeT[x] == "COMV") Texas2015Info.Freight_ClassA += classA_T[x];
            if(classB_T[x] != 0 && typeT[x] == "COMV") Texas2015Info.Freight_ClassB += classB_T[x];
            if(classC_T[x] != 0 && typeT[x] == "COMV") Texas2015Info.Freight_ClassC += classC_T[x];
            if(classO_T[x] != 0 && typeT[x] == "COMV") Texas2015Info.Freight_ClassO += classO_T[x];

            if(classA_T[x] != 0 && typeT[x] == "PED")  Texas2015Info.Walking_ClassA += classA_T[x];
            if(classB_T[x] != 0 && typeT[x] == "PED")  Texas2015Info.Walking_ClassB += classB_T[x];
            if(classC_T[x] != 0 && typeT[x] == "PED")  Texas2015Info.Walking_ClassC += classC_T[x];
            if(classO_T[x] != 0 && typeT[x] == "PED")  Texas2015Info.Walking_ClassO += classO_T[x];

            if(classA_T[x] != 0 && typeT[x] == "BIKE") Texas2015Info.Bike_ClassA += classA_T[x];
            if(classB_T[x] != 0 && typeT[x] == "BIKE") Texas2015Info.Bike_ClassB += classB_T[x];
            if(classC_T[x] != 0 && typeT[x] == "BIKE") Texas2015Info.Bike_ClassC += classC_T[x];
            if(classO_T[x] != 0 && typeT[x] == "BIKE") Texas2015Info.Bike_ClassO += classO_T[x];
            
            Texas2015Info.crashes++;

            if(classA[x] != 0 && typeT[x] == "GEN"){
                Texas2015Info.DrivingTotFatalities+=classA[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    driving_Cordinates_Fatalities.lat[pm18D] = latT[x]; 
                    driving_Cordinates_Fatalities.lon[pm18D] = longT[x]; 
                    driving_Cordinates_Fatalities.year[pm18D] = "2015"; 
                    driving_Cordinates_Fatalities.fatality[pm18D] = classA[x];
                    driving_Cordinates_Fatalities.classA[pm18D] = classA_T[x];
                    driving_Cordinates_Fatalities.classB[pm18D] = classB_T[x];
                    driving_Cordinates_Fatalities.classC[pm18D] = classC_T[x];
                    //driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18D++;
                }
            }else if(classA[x] != 0 && typeT[x] == "COMV"){
                Texas2015Info.FreightTotFatalities+=classA[x];
                // Array that holds information of a specific point
                if(latT[x]!=0 && longT[x] !=0){ 
                    Freight_Cordinates_Fatalities.lat[pm18F] = latT[x]; 
                    Freight_Cordinates_Fatalities.lon[pm18F] = longT[x]; 
                    Freight_Cordinates_Fatalities.year[pm18F] = "2015"; 
                    Freight_Cordinates_Fatalities.fatality[pm18F] = classA[x]; 
                    Freight_Cordinates_Fatalities.classA[pm18F] = classA_T[x];
                    Freight_Cordinates_Fatalities.classB[pm18F] = classB_T[x];
                    Freight_Cordinates_Fatalities.classC[pm18F] = classC_T[x];
                    //driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18F++;
                }
            }else if(classA[x] != 0 && typeT[x] == "PED"){
                Texas2015Info.WalkingTotFatalities+=classA[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Walking_Cordinates__Fatalities.lat[pm18W] = latT[x]; 
                    Walking_Cordinates__Fatalities.lon[pm18W] = longT[x]; 
                    Walking_Cordinates__Fatalities.year[pm18W] = "2015"; 
                    Walking_Cordinates__Fatalities.fatality[pm18W] = classA[x]; 
                    Walking_Cordinates__Fatalities.classA[pm18W] = classA_T[x];
                    Walking_Cordinates__Fatalities.classB[pm18W] = classB_T[x];
                    Walking_Cordinates__Fatalities.classC[pm18W] = classC_T[x];
                    //driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18W++;
                }
            }else if(classA[x] != 0 && typeT[x] == "BIKE"){
                Texas2015Info.BikeTotFatalities+=classA[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Bike_Cordinates_Fatalities.lat[pm18B] = latT[x]; 
                    Bike_Cordinates_Fatalities.lon[pm18B] = longT[x];
                    Bike_Cordinates_Fatalities.year[pm18B] = "2015";
                    Bike_Cordinates_Fatalities.fatality[pm18B] = classA[x]; 
                    Bike_Cordinates_Fatalities.classA[pm18B] = classA_T[x];
                    Bike_Cordinates_Fatalities.classB[pm18B] = classB_T[x];
                    Bike_Cordinates_Fatalities.classC[pm18B] = classC_T[x];
                    //driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18B++;
                }
            }
         
        }else if((dateT[x].charAt(dateT[x].length-1)) == "6"){ //******************************************** 2016
            if(classA_T[x] != 0 && typeT[x] == "GEN")  Texas2016Info.Driving_ClassA += classA_T[x];
            if(classB_T[x] != 0 && typeT[x] == "GEN")  Texas2016Info.Driving_ClassB += classB_T[x];
            if(classC_T[x] != 0 && typeT[x] == "GEN")  Texas2016Info.Driving_ClassC += classC_T[x];
            if(classO_T[x] != 0 && typeT[x] == "GEN")  Texas2016Info.Driving_ClassO += classO_T[x];

            if(classA_T[x] != 0 && typeT[x] == "COMV") Texas2016Info.Freight_ClassA += classA_T[x];
            if(classB_T[x] != 0 && typeT[x] == "COMV") Texas2016Info.Freight_ClassB += classB_T[x];
            if(classC_T[x] != 0 && typeT[x] == "COMV") Texas2016Info.Freight_ClassC += classC_T[x];
            if(classO_T[x] != 0 && typeT[x] == "COMV") Texas2016Info.Freight_ClassO += classO_T[x];

            if(classA_T[x] != 0 && typeT[x] == "PED")  Texas2016Info.Walking_ClassA += classA_T[x];
            if(classB_T[x] != 0 && typeT[x] == "PED")  Texas2016Info.Walking_ClassB += classB_T[x];
            if(classC_T[x] != 0 && typeT[x] == "PED")  Texas2016Info.Walking_ClassC += classC_T[x];
            if(classO_T[x] != 0 && typeT[x] == "PED")  Texas2016Info.Walking_ClassO += classO_T[x];

            if(classA_T[x] != 0 && typeT[x] == "BIKE") Texas2016Info.Bike_ClassA += classA_T[x];
            if(classB_T[x] != 0 && typeT[x] == "BIKE") Texas2016Info.Bike_ClassB += classB_T[x];
            if(classC_T[x] != 0 && typeT[x] == "BIKE") Texas2016Info.Bike_ClassC += classC_T[x];
            if(classO_T[x] != 0 && typeT[x] == "BIKE") Texas2016Info.Bike_ClassO += classO_T[x];
            
            Texas2016Info.crashes++;

            if(classA[x] != 0 && typeT[x] == "GEN"){
                Texas2016Info.DrivingTotFatalities+=classA[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    driving_Cordinates_Fatalities.lat[pm18D] = latT[x]; 
                    driving_Cordinates_Fatalities.lon[pm18D] = longT[x]; 
                    driving_Cordinates_Fatalities.year[pm18D] = "2016"; 
                    driving_Cordinates_Fatalities.fatality[pm18D] = classA[x];
                    driving_Cordinates_Fatalities.classA[pm18D] = classA_T[x];
                    driving_Cordinates_Fatalities.classB[pm18D] = classB_T[x];
                    driving_Cordinates_Fatalities.classC[pm18D] = classC_T[x];
                    //driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18D++;
                }
            }else if(classA[x] != 0 && typeT[x] == "COMV"){
                Texas2016Info.FreightTotFatalities+=classA[x];
                // Array that holds information of a specific point
                if(latT[x]!=0 && longT[x] !=0){ 
                    Freight_Cordinates_Fatalities.lat[pm18F] = latT[x];
                    Freight_Cordinates_Fatalities.lon[pm18F] = longT[x]; 
                    Freight_Cordinates_Fatalities.year[pm18F] = "2016"; 
                    Freight_Cordinates_Fatalities.fatality[pm18F] = classA[x]; 
                    Freight_Cordinates_Fatalities.classA[pm18F] = classA_T[x];
                    Freight_Cordinates_Fatalities.classB[pm18F] = classB_T[x];
                    Freight_Cordinates_Fatalities.classC[pm18F] = classC_T[x];
                    //driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18F++;
                }
            }else if(classA[x] != 0 && typeT[x] == "PED"){
                Texas2016Info.WalkingTotFatalities+=classA[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Walking_Cordinates__Fatalities.lat[pm18W] = latT[x]; 
                    Walking_Cordinates__Fatalities.lon[pm18W] = longT[x]; 
                    Walking_Cordinates__Fatalities.year[pm18W] = "2016"; 
                    Walking_Cordinates__Fatalities.fatality[pm18W] = classA[x];
                    Walking_Cordinates__Fatalities.classA[pm18W] = classA_T[x];
                    Walking_Cordinates__Fatalities.classB[pm18W] = classB_T[x];
                    Walking_Cordinates__Fatalities.classC[pm18W] = classC_T[x];
                    //driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18W++;
                }
            }else if(classA[x] != 0 && typeT[x] == "BIKE"){
                Texas2016Info.BikeTotFatalities+=classA[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Bike_Cordinates_Fatalities.lat[pm18B] = latT[x]; 
                    Bike_Cordinates_Fatalities.lon[pm18B] = longT[x]; 
                    Bike_Cordinates_Fatalities.year[pm18B] = "2016"; 
                    Bike_Cordinates_Fatalities.fatality[pm18B] = classA[x]; 
                    Bike_Cordinates_Fatalities.classA[pm18B] = classA_T[x];
                    Bike_Cordinates_Fatalities.classB[pm18B] = classB_T[x];
                    Bike_Cordinates_Fatalities.classC[pm18B] = classC_T[x];
                    //driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18B++;
                }
            }
         
        }else if((dateT[x].charAt(dateT[x].length-1)) == "7"){ //******************************************** 2017
            if(classA_T[x] != 0 && typeT[x] == "GEN")  Texas2017Info.Driving_ClassA += classA_T[x];
            if(classB_T[x] != 0 && typeT[x] == "GEN")  Texas2017Info.Driving_ClassB += classB_T[x];
            if(classC_T[x] != 0 && typeT[x] == "GEN")  Texas2017Info.Driving_ClassC += classC_T[x];
            if(classO_T[x] != 0 && typeT[x] == "GEN")  Texas2017Info.Driving_ClassO += classO_T[x];

            if(classA_T[x] != 0 && typeT[x] == "COMV") Texas2017Info.Freight_ClassA += classA_T[x];
            if(classB_T[x] != 0 && typeT[x] == "COMV") Texas2017Info.Freight_ClassB += classB_T[x];
            if(classC_T[x] != 0 && typeT[x] == "COMV") Texas2017Info.Freight_ClassC += classC_T[x];
            if(classO_T[x] != 0 && typeT[x] == "COMV") Texas2017Info.Freight_ClassO += classO_T[x];

            if(classA_T[x] != 0 && typeT[x] == "PED")  Texas2017Info.Walking_ClassA += classA_T[x];
            if(classB_T[x] != 0 && typeT[x] == "PED")  Texas2017Info.Walking_ClassB += classB_T[x];
            if(classC_T[x] != 0 && typeT[x] == "PED")  Texas2017Info.Walking_ClassC += classC_T[x];
            if(classO_T[x] != 0 && typeT[x] == "PED")  Texas2017Info.Walking_ClassO += classO_T[x];

            if(classA_T[x] != 0 && typeT[x] == "BIKE") Texas2017Info.Bike_ClassA += classA_T[x];
            if(classB_T[x] != 0 && typeT[x] == "BIKE") Texas2017Info.Bike_ClassB += classB_T[x];
            if(classC_T[x] != 0 && typeT[x] == "BIKE") Texas2017Info.Bike_ClassC += classC_T[x];
            if(classO_T[x] != 0 && typeT[x] == "BIKE") Texas2017Info.Bike_ClassO += classO_T[x];
            
            Texas2017Info.crashes++;

            if(classA[x] != 0 && typeT[x] == "GEN"){
                Texas2017Info.DrivingTotFatalities+=classA[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    driving_Cordinates_Fatalities.lat[pm18D] = latT[x]; // store lat
                    driving_Cordinates_Fatalities.lon[pm18D] = longT[x]; // store Long
                    driving_Cordinates_Fatalities.year[pm18D] = "2017"; // store year
                    driving_Cordinates_Fatalities.fatality[pm18D] = classA[x]; // store specific fatality Count on that point
                    driving_Cordinates_Fatalities.classA[pm18D] = classA_T[x];
                    driving_Cordinates_Fatalities.classB[pm18D] = classB_T[x];
                    driving_Cordinates_Fatalities.classC[pm18D] = classC_T[x];
                    //driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18D++;
                }
            }else if(classA[x] != 0 && typeT[x] == "COMV"){
                Texas2017Info.FreightTotFatalities+=classA[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Freight_Cordinates_Fatalities.lat[pm18F] = latT[x]; // store lat
                    Freight_Cordinates_Fatalities.lon[pm18F] = longT[x]; // store Long
                    Freight_Cordinates_Fatalities.year[pm18F] = "2017"; // store year
                    Freight_Cordinates_Fatalities.fatality[pm18F] = classA[x]; // store specific fatality Count on that point
                    Freight_Cordinates_Fatalities.classA[pm18F] = classA_T[x];
                    Freight_Cordinates_Fatalities.classB[pm18F] = classB_T[x];
                    Freight_Cordinates_Fatalities.classC[pm18F] = classC_T[x];
                    //driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18F++;
                }
            }else if(classA[x] != 0 && typeT[x] == "PED"){
                Texas2017Info.WalkingTotFatalities +=classA[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Walking_Cordinates__Fatalities.lat[pm18W] = latT[x]; // store lat
                    Walking_Cordinates__Fatalities.lon[pm18W] = longT[x]; // store Long
                    Walking_Cordinates__Fatalities.year[pm18W] = "2017"; // store year
                    Walking_Cordinates__Fatalities.fatality[pm18W] = classA[x]; // store specific fatality Count on that point
                    Walking_Cordinates__Fatalities.classA[pm18W] = classA_T[x];
                    Walking_Cordinates__Fatalities.classB[pm18W] = classB_T[x];
                    Walking_Cordinates__Fatalities.classC[pm18W] = classC_T[x];
                    //driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18W++;
                }
            }else if(classA[x] != 0 && typeT[x] == "BIKE"){
                Texas2017Info.BikeTotFatalities+=classA[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Bike_Cordinates_Fatalities.lat[pm18B] = latT[x]; // store lat
                    Bike_Cordinates_Fatalities.lon[pm18B] = longT[x]; // store Long
                    Bike_Cordinates_Fatalities.year[pm18B] = "2017"; // store year
                    Bike_Cordinates_Fatalities.fatality[pm18B] = classA[x]; // store specific fatality Count on that point
                    Bike_Cordinates_Fatalities.classA[pm18B] = classA_T[x];
                    Bike_Cordinates_Fatalities.classB[pm18B] = classB_T[x];
                    Bike_Cordinates_Fatalities.classC[pm18B] = classC_T[x];
                    //driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18B++;
                }
            }

        }
    }
    Texas2013Info.totFatalities2013 = Texas2013Info.DrivingTotFatalities + Texas2013Info.WalkingTotFatalities + Texas2013Info.FreightTotFatalities + Texas2013Info.BikeTotFatalities;
    Texas2014Info.totFatalities2014 = Texas2014Info.DrivingTotFatalities + Texas2014Info.WalkingTotFatalities + Texas2014Info.FreightTotFatalities + Texas2014Info.BikeTotFatalities;
    Texas2015Info.totFatalities2015 = Texas2015Info.DrivingTotFatalities + Texas2015Info.WalkingTotFatalities + Texas2015Info.FreightTotFatalities + Texas2015Info.BikeTotFatalities;
    Texas2016Info.totFatalities2016 = Texas2016Info.DrivingTotFatalities + Texas2016Info.WalkingTotFatalities + Texas2016Info.FreightTotFatalities + Texas2016Info.BikeTotFatalities;
    Texas2017Info.totFatalities2017 = Texas2017Info.DrivingTotFatalities + Texas2017Info.WalkingTotFatalities + Texas2017Info.FreightTotFatalities + Texas2017Info.BikeTotFatalities;

    //Total Driving fatalities from 2013-2017
    totalFatalities.Driving = Texas2013Info.DrivingTotFatalities + Texas2014Info.DrivingTotFatalities + Texas2015Info.DrivingTotFatalities + Texas2016Info.DrivingTotFatalities + Texas2017Info.DrivingTotFatalities;
 
    /*Ratio of 
            driving fatalities*/
    //ratioOfDrivingFatalities = (totalFatalities.Driving) / ()
    console.log(Texas2013Info);
    console.log(Texas2014Info);
    console.log(Texas2015Info);
    console.log(Texas2016Info);
    console.log(Texas2017Info);


}    

    
function pm18chartLine(ctx, Button){
    // line 2, changes by category, aka Driving, Freight ect
    graphValues = []; 

    //line chart data
    if(Button == 'D'){ // if Driving is click
        graphValues[0] = Texas2013Info.DrivingTotFatalities;
        graphValues[1] = Texas2014Info.DrivingTotFatalities;
        graphValues[2] = Texas2015Info.DrivingTotFatalities;
        graphValues[3] = Texas2016Info.DrivingTotFatalities;
        graphValues[4] = Texas2017Info.DrivingTotFatalities;
    }else if(Button == 'F'){ // if Freight is click
 

    }else if(Button == 'W'){ 


    }else if(Button == 'B'){

    }
    var data = {
        labels: ["2013", "2014", "2015", "2016", "2017"],
        datasets: [
            {
            label: "Driving Fatalities",
            data: [Texas2013Info.DrivingTotFatalities,  Texas2014Info.DrivingTotFatalities, Texas2015Info.DrivingTotFatalities, Texas2016Info.DrivingTotFatalities, Texas2017Info.DrivingTotFatalities],
            backgroundColor: "purple",
            borderColor: "lightblue",
            fill: false,
            lineTension: 0,
            radius: 5
            },
            {
            label: "Total Fatalities",
            data: [Texas2013Info.totFatalities2013, Texas2014Info.totFatalities2014, Texas2015Info.totFatalities2015, Texas2016Info.totFatalities2016, Texas2017Info.totFatalities2017],
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
        text: title;
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

var numOfInjuries = Texas2013Info.Driving_ClassA +Texas2014Info.Driving_ClassA+Texas2015Info.Driving_ClassA +Texas2015Info.Driving_ClassA+ Texas2016Info.Driving_ClassA + Texas2017Info.Driving_ClassA +



function pm18StackedChart(ctx){
    var barChartData = {
		labels: ['2013', '2014', '2015', '2016', '2017'],
			datasets: [{
				label: 'Fatalities',
				backgroundColor: 'rgba(255,82,0,0.5)',
				data: [
                    Texas2013Info.totFatalities2013,Texas2014Info.totFatalities2014,Texas2015Info.totFatalities2015,Texas2016Info.totFatalities2016,Texas2017Info.totFatalities2017//TODO
				]
			}, {
				label: 'Class A',
				backgroundColor: 'rgba(92,187,3,0.5)',
				data: [
					Texas2013Info.Driving_ClassA,Texas2014Info.Driving_ClassA,Texas2015Info.Driving_ClassA,Texas2015Info.Driving_ClassA,Texas2016Info.Driving_ClassA,Texas2017Info.Driving_ClassA
				]
			}, {
				label: 'Class B',
				backgroundColor: 'rgba(117,36,221,0.5)',
				data: [
					Texas2013Info.Driving_ClassB,Texas2014Info.Driving_ClassB,Texas2015Info.Driving_ClassB,Texas2015Info.Driving_ClassB,Texas2016Info.Driving_ClassB,Texas2017Info.Driving_ClassB
				]
			},  {
				label: 'Class C',
				backgroundColor: 'rgba(0,255,255.0.5)',
				data: [
                    Texas2013Info.Driving_ClassC,Texas2014Info.Driving_ClassC,Texas2015Info.Driving_ClassC,Texas2015Info.Driving_ClassC,Texas2016Info.Driving_ClassC,Texas2017Info.Driving_ClassC
				]
			},  {
				label: 'Class O',
				backgroundColor: 'rgb(255,0,255,0.5)',
				data: [
                    Texas2013Info.Driving_ClassO,Texas2014Info.Driving_ClassO,Texas2015Info.Driving_ClassO,Texas2015Info.Driving_ClassO,Texas2016Info.Driving_ClassO,Texas2017Info.Driving_ClassO
				]
			}]

	};
    var chartBar = new Chart(ctx, {
        type: "bar",
        data: barChartData,
        options: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 12,
                    boxWidth:10
                }
                },
            title: {
                /*display: true,
                text: '2013-2017'*/
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            responsive: true,
            scales: {
                xAxes: [{
                    stacked: true,
                }],
                yAxes: [{
                    
                    stacked: true
                }]
            }
        }
    });
	
}

    


    

	