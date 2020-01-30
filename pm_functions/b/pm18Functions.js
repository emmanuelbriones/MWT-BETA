/** 
 * Creates graphs for PM18
 * Calculates data for both Pm18 and PM19
 *  
*/
// Texas Variables, holds Columns 
var fatalitiesT = [];   var dateT = [];    var typeT = [];    var longT = [];     var latT = [];
var classA_T = [];      var classB_T = []; var classC_T = []; var classO_T = [];  var unknownT = [];
var Non_InjuriesT = []; var sizeT = [];

// NM
var PEDinv = []; var  PECinv = [];  var TRKinv = [];

// These counters are for the 4 categories on the Cordinates, aids in keeping track 
var pm18W =0; var pm18B=0; var pm18F = 0; var pm18D = 0;  // Counter 
var pm19W =0; var pm19B=0; var pm19F = 0; var pm19D = 0;  // Counter 

//Guards that this class will not count data more than once
var guardian = 0;

// loads data needed
function pm18Data(){ 
   //Texas
    fetch('./results.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            let counter = myJson.PMS_18_19_tx.fatalitiesT.length;
            for(let i = 0; i < myJson.PMS_18_19_tx.fatalitiesT.length; i++){ //90858
                fatalitiesT.push(parseInt(myJson["PMS_18_19_tx"]["fatalitiesT"][i]));
                dateT.push(myJson["PMS_18_19_tx"]["dateT"][i]);
                typeT.push(myJson["PMS_18_19_tx"]["typeT"][i]);
                longT.push(parseFloat(myJson["PMS_18_19_tx"]["longT"][i]));
                latT.push(parseFloat(myJson["PMS_18_19_tx"]["latT"][i]));
                classA_T.push(parseInt(myJson["PMS_18_19_tx"]["classA_T"][i]));  
                classB_T.push(parseInt(myJson["PMS_18_19_tx"]["classB_T"][i]));
                classC_T.push(parseInt(myJson["PMS_18_19_tx"]["classC_T"][i]));
                unknownT.push(parseInt(myJson["PMS_18_19_tx"]["unknownT"][i])); // these 2 are combined to make O
                Non_InjuriesT.push(parseInt(myJson["PMS_18_19_tx"]["Non_InjuriesT"][i])); //
                loadClassOTexas(i);
                
            }
            //New Mexico
            for(let i = 0; i < myJson.PMS_18_19_nm.fatalitiesNM.length; i++){ 
                fatalitiesT.push(parseInt(myJson["PMS_18_19_nm"]["fatalitiesNM"][i]));
                dateT.push((myJson["PMS_18_19_nm"]["dateNM"][i])).toString();
                PEDinv.push(myJson["PMS_18_19_nm"]["PED_NM"][i]);
                PECinv.push(myJson["PMS_18_19_nm"]["PEC_NM"][i]);
                TRKinv.push(myJson["PMS_18_19_nm"]["TRK_NM"][i]);
                longT.push(parseFloat(myJson["PMS_18_19_nm"]["longNM"][i]));
                latT.push(parseFloat(myJson["PMS_18_19_nm"]["latNM"][i]));
                classA_T.push(parseInt(myJson["PMS_18_19_nm"]["classA_NM"][i]));
                classB_T.push(parseInt(myJson["PMS_18_19_nm"]["classB_NM"][i]));
                classC_T.push(parseInt(myJson["PMS_18_19_nm"]["classC_NM"][i]));
                classO_T.push(parseInt(myJson["PMS_18_19_nm"]["classO_NM"][i]));
                CreateTypeNM(counter); // update type at the same time at same index
                counter++;
            }
            
  
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
    classO_T.push(parseInt(unknownT[x] +  Non_InjuriesT[x]));
}

//Info filtered by Year
var Texas2013Info = {
    Driving_ClassA: 0,  Driving_ClassB: 0, Driving_ClassC:0, Driving_ClassO:0, DrivingTotFatalities:0, crashes:0,
    Freight_ClassA: 0,  Freight_ClassB: 0, Freight_ClassC:0, Freight_ClassO:0, FreightTotFatalities:0,
    Walking_ClassA: 0,  Walking_ClassB: 0, Walking_ClassC:0, Walking_ClassO:0, WalkingTotFatalities:0, totInjuries2013:0,
    Bike_ClassA: 0,     Bike_ClassB: 0,    Bike_ClassC:0,    Bike_ClassO:0,     BikeTotFatalities:0 , totFatalities2013:0
};
var Texas2014Info = {
    Driving_ClassA: 0,  Driving_ClassB: 0, Driving_ClassC:0, Driving_ClassO:0, DrivingTotFatalities:0, crashes:0,
    Freight_ClassA: 0,  Freight_ClassB: 0, Freight_ClassC:0, Freight_ClassO:0, FreightTotFatalities:0, totInjuries2014:0,
    Walking_ClassA: 0,  Walking_ClassB: 0, Walking_ClassC:0, Walking_ClassO:0, WalkingTotFatalities:0,
    Bike_ClassA: 0,     Bike_ClassB: 0,    Bike_ClassC:0,    Bike_ClassO:0,     BikeTotFatalities:0, totFatalities2014:0
};
var Texas2015Info = {
    Driving_ClassA: 0,  Driving_ClassB: 0, Driving_ClassC:0, Driving_ClassO:0, DrivingTotFatalities:0, crashes:0,
    Freight_ClassA: 0,  Freight_ClassB: 0, Freight_ClassC:0, Freight_ClassO:0, FreightTotFatalities:0, totInjuries2015:0,
    Walking_ClassA: 0,  Walking_ClassB: 0, Walking_ClassC:0, Walking_ClassO:0, WalkingTotFatalities:0,
    Bike_ClassA: 0,     Bike_ClassB: 0,    Bike_ClassC:0,    Bike_ClassO:0,     BikeTotFatalities:0, totFatalities2015:0
};
var Texas2016Info = {
    Driving_ClassA: 0,  Driving_ClassB: 0, Driving_ClassC:0, Driving_ClassO:0, DrivingTotFatalities:0, crashes:0,
    Freight_ClassA: 0,  Freight_ClassB: 0, Freight_ClassC:0, Freight_ClassO:0, FreightTotFatalities:0, totInjuries2016:0,
    Walking_ClassA: 0,  Walking_ClassB: 0, Walking_ClassC:0, Walking_ClassO:0, WalkingTotFatalities:0,
    Bike_ClassA: 0,     Bike_ClassB: 0,    Bike_ClassC:0,    Bike_ClassO:0,     BikeTotFatalities:0, totFatalities2016:0
};
var Texas2017Info = {
    Driving_ClassA: 0,  Driving_ClassB: 0, Driving_ClassC:0, Driving_ClassO:0, DrivingTotFatalities:0, crashes:0,
    Freight_ClassA: 0,  Freight_ClassB: 0, Freight_ClassC:0, Freight_ClassO:0, FreightTotFatalities:0, totInjuries2017:0,
    Walking_ClassA: 0,  Walking_ClassB: 0, Walking_ClassC:0, Walking_ClassO:0, WalkingTotFatalities:0,
    Bike_ClassA: 0,     Bike_ClassB: 0,    Bike_ClassC:0,    Bike_ClassO:0,     BikeTotFatalities:0, totFatalities2017:0
};
var pm18Calculations = {
    Driving: 0, drivingDeathRate: 0, totalCarCrashes: 0, totalFreightCrashes: 0, cmvInjuries: 0, freightTotalFatalities: 0, 
    freightDeathRate: 0, freightInjuries: 0, walkingInjuries: 0, totalWalkingCrashes: 0, walkingTotalFatalities: 0, walkingDeathRate: 0,
    bikingTotalFatalities: 0, totalBikingCrashes: 0, bikingInjuries: 0, bikingDeathRate: 0
}

// Cordinates that will be placed on map, each fatality point has all of this info.  For PM18
var driving_Cordinates_Fatalities = {
    lat:[], lon:[], classA:[], classB:[], classC:[], classO:[], year:[], fatality:[]
};
var Freight_Cordinates_Fatalities = {
    lat:[], lon:[], classA:[], classB:[], classC:[], classO:[], year:[], fatality:[]
};
var Walking_Cordinates_Fatalities = {
    lat:[], lon:[], classA:[], classB:[], classC:[], classO:[], year:[], fatality:[]
};
var Bike_Cordinates_Fatalities = {
    lat:[], lon:[], classA:[], classB:[], classC:[], classO:[], year:[], fatality:[]
};

// Cordinates for injuries PM 19
var driving_Cordinates_Injuries = {
    lat:[], lon:[], classA:[], classB:[], classC:[], classO:[], year:[], fatality:[]
};
var Freight_Cordinates_Injuries = {
    lat:[], lon:[], classA:[], classB:[], classC:[], classO:[], year:[], fatality:[]
};
var Walking_Cordinates_Injuries = {
    lat:[], lon:[], classA:[], classB:[], classC:[], classO:[], year:[], fatality:[]
};
var Biking_Cordinates_Injuries = {
    lat:[], lon:[], classA:[], classB:[], classC:[], classO:[], year:[], fatality:[]
};
var totalFatalities = {
    Driving: 0, drivingDeathRate: 0
}
// Loads Texas Info 
function pm18_pm19_Data_Texas(){ 
    var countNM_TX = dateT.length;
    //Filter Info
     if(guardian == 0){
    for(let x = 0; x < countNM_TX; x++){ //Total: 116120    
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// Pm19, store cordinates and the info of that point
         if((dateT[x].charAt(dateT[x].length-1)) == "3"  &&  classA_T[x] != 0 && latT[x]!=0 && longT[x] !=0) { 
            if(typeT[x] == "GEN"){ // filter the coordinates that are not 0
            //driving_Cordinates_Injuries
                driving_Cordinates_Injuries.lat[pm19D] = latT[x]; // store lat
                driving_Cordinates_Injuries.lon[pm19D] = longT[x]; // store Long
                driving_Cordinates_Injuries.year[pm19D] = "2013"; // store year
                driving_Cordinates_Injuries.fatality[pm19D] = fatalitiesT[x]; // store specific fatality Count on that point
                driving_Cordinates_Injuries.classA[pm19D] = classA_T[x];
                driving_Cordinates_Injuries.classB[pm19D] = classB_T[x];
                driving_Cordinates_Injuries.classC[pm19D] = classC_T[x];
                driving_Cordinates_Injuries.classO[pm19D] = classO_T[x];
                pm19D++; // this counter aids in keeping track of the cordinates of this type (driving, freight, walking, biking)
            }else if(typeT[x] == "COMV"){ // filter the coordinates that are not 0
                Freight_Cordinates_Injuries.lat[pm19F] = latT[x]; 
                Freight_Cordinates_Injuries.lon[pm19F] = longT[x];
                Freight_Cordinates_Injuries.year[pm19F] = "2013"; 
                Freight_Cordinates_Injuries.fatality[pm19F] = fatalitiesT[x]; 
                Freight_Cordinates_Injuries.classA[pm19F] = classA_T[x];
                Freight_Cordinates_Injuries.classB[pm19F] = classB_T[x];
                Freight_Cordinates_Injuries.classC[pm19F] = classC_T[x];
                Freight_Cordinates_Injuries.classO[pm19F] = classO_T[x];
                pm19F++;
            }else if(typeT[x] == "PED"){ 
                Walking_Cordinates_Injuries.lat[pm19W] = latT[x]; 
                Walking_Cordinates_Injuries.lon[pm19W] = longT[x]; 
                Walking_Cordinates_Injuries.year[pm19W] = "2013"; 
                Walking_Cordinates_Injuries.fatality[pm19W] = fatalitiesT[x]; 
                Walking_Cordinates_Injuries.classA[pm19W] = classA_T[x];
                Walking_Cordinates_Injuries.classB[pm19W] = classB_T[x];
                Walking_Cordinates_Injuries.classC[pm19W] = classC_T[x];
                Walking_Cordinates_Injuries.classO[pm19W] = classO_T[x];
                pm19W++;
            }else if(typeT[x] == "BIKE"){ 
                Biking_Cordinates_Injuries.lat[pm19B] = latT[x]; 
                Biking_Cordinates_Injuries.lon[pm19B] = longT[x]; 
                Biking_Cordinates_Injuries.year[pm19B] = "2013"; 
                Biking_Cordinates_Injuries.fatality[pm19B] = fatalitiesT[x]; 
                Biking_Cordinates_Injuries.classA[pm19B] = classA_T[x];
                Biking_Cordinates_Injuries.classB[pm19B] = classB_T[x];
                Biking_Cordinates_Injuries.classC[pm19B] = classC_T[x];
                Biking_Cordinates_Injuries.classO[pm19B] = classO_T[x];
                pm19B++;
            }
          }else if((dateT[x].charAt(dateT[x].length-1)) == "4"  &&  classA_T[x] != 0 && latT[x]!=0 && longT[x] !=0) { 
                if(typeT[x] == "GEN"){ // filter the coordinates that are not 0
                    driving_Cordinates_Injuries.lat[pm19D] = latT[x]; // store lat
                    driving_Cordinates_Injuries.lon[pm19D] = longT[x]; // store Long
                    driving_Cordinates_Injuries.year[pm19D] = "2014"; // store year
                    driving_Cordinates_Injuries.fatality[pm19D] = fatalitiesT[x]; // store specific fatality Count on that point
                    driving_Cordinates_Injuries.classA[pm19D] = classA_T[x];
                    driving_Cordinates_Injuries.classB[pm19D] = classB_T[x];
                    driving_Cordinates_Injuries.classC[pm19D] = classC_T[x];
                    driving_Cordinates_Injuries.classO[pm19D] = classO_T[x];
                    pm19D++; // this counter aids in keeping track of the cordinates of this type (driving, freight, walking, biking)
                }else if(typeT[x] == "COMV"){ // filter the coordinates that are not 0
                    Freight_Cordinates_Injuries.lat[pm19F] = latT[x]; 
                    Freight_Cordinates_Injuries.lon[pm19F] = longT[x];
                    Freight_Cordinates_Injuries.year[pm19F] = "2014"; 
                    Freight_Cordinates_Injuries.fatality[pm19F] = fatalitiesT[x]; 
                    Freight_Cordinates_Injuries.classA[pm19F] = classA_T[x];
                    Freight_Cordinates_Injuries.classB[pm19F] = classB_T[x];
                    Freight_Cordinates_Injuries.classC[pm19F] = classC_T[x];
                    Freight_Cordinates_Injuries.classO[pm19F] = classO_T[x];
                    pm19F++;
                }else if(typeT[x] == "PED"){ 
                    Walking_Cordinates_Injuries.lat[pm19W] = latT[x]; 
                    Walking_Cordinates_Injuries.lon[pm19W] = longT[x]; 
                    Walking_Cordinates_Injuries.year[pm19W] = "2014"; 
                    Walking_Cordinates_Injuries.fatality[pm19W] = fatalitiesT[x]; 
                    Walking_Cordinates_Injuries.classA[pm19W] = classA_T[x];
                    Walking_Cordinates_Injuries.classB[pm19W] = classB_T[x];
                    Walking_Cordinates_Injuries.classC[pm19W] = classC_T[x];
                    Walking_Cordinates_Injuries.classO[pm19W] = classO_T[x];
                    pm19W++;
                }else if(typeT[x] == "BIKE"){ 
                    Biking_Cordinates_Injuries.lat[pm19B] = latT[x]; 
                    Biking_Cordinates_Injuries.lon[pm19B] = longT[x]; 
                    Biking_Cordinates_Injuries.year[pm19B] = "2014"; 
                    Biking_Cordinates_Injuries.fatality[pm19B] = fatalitiesT[x]; 
                    Biking_Cordinates_Injuries.classA[pm19B] = classA_T[x];
                    Biking_Cordinates_Injuries.classB[pm19B] = classB_T[x];
                    Biking_Cordinates_Injuries.classC[pm19B] = classC_T[x];
                    Biking_Cordinates_Injuries.classO[pm19B] = classO_T[x];
                    pm19B++;
                }
          
          }else if((dateT[x].charAt(dateT[x].length-1)) == "5"  &&  classA_T[x] != 0 && latT[x]!=0 && longT[x] !=0) { 
            if(typeT[x] == "GEN"){ // filter the coordinates that are not 0
            //driving_Cordinates_Injuries
                driving_Cordinates_Injuries.lat[pm19D] = latT[x]; // store lat
                driving_Cordinates_Injuries.lon[pm19D] = longT[x]; // store Long
                driving_Cordinates_Injuries.year[pm19D] = "2015"; // store year
                driving_Cordinates_Injuries.fatality[pm19D] = fatalitiesT[x]; // store specific fatality Count on that point
                driving_Cordinates_Injuries.classA[pm19D] = classA_T[x];
                driving_Cordinates_Injuries.classB[pm19D] = classB_T[x];
                driving_Cordinates_Injuries.classC[pm19D] = classC_T[x];
                driving_Cordinates_Injuries.classO[pm19D] = classO_T[x];
                pm19D++; // this counter aids in keeping track of the cordinates of this type (driving, freight, walking, biking)
            }else if(typeT[x] == "COMV"){ // filter the coordinates that are not 0
                Freight_Cordinates_Injuries.lat[pm19F] = latT[x]; 
                Freight_Cordinates_Injuries.lon[pm19F] = longT[x];
                Freight_Cordinates_Injuries.year[pm19F] = "2015"; 
                Freight_Cordinates_Injuries.fatality[pm19F] = fatalitiesT[x]; 
                Freight_Cordinates_Injuries.classA[pm19F] = classA_T[x];
                Freight_Cordinates_Injuries.classB[pm19F] = classB_T[x];
                Freight_Cordinates_Injuries.classC[pm19F] = classC_T[x];
                Freight_Cordinates_Injuries.classO[pm19F] = classO_T[x];
                pm19F++;
            }else if(typeT[x] == "PED"){ 
                Walking_Cordinates_Injuries.lat[pm19W] = latT[x]; 
                Walking_Cordinates_Injuries.lon[pm19W] = longT[x]; 
                Walking_Cordinates_Injuries.year[pm19W] = "2015"; 
                Walking_Cordinates_Injuries.fatality[pm19W] = fatalitiesT[x]; 
                Walking_Cordinates_Injuries.classA[pm19W] = classA_T[x];
                Walking_Cordinates_Injuries.classB[pm19W] = classB_T[x];
                Walking_Cordinates_Injuries.classC[pm19W] = classC_T[x];
                Walking_Cordinates_Injuries.classO[pm19W] = classO_T[x];
                pm19W++;
            }else if(typeT[x] == "BIKE"){ 
                Biking_Cordinates_Injuries.lat[pm19B] = latT[x]; 
                Biking_Cordinates_Injuries.lon[pm19B] = longT[x]; 
                Biking_Cordinates_Injuries.year[pm19B] = "2015"; 
                Biking_Cordinates_Injuries.fatality[pm19B] = fatalitiesT[x]; 
                Biking_Cordinates_Injuries.classA[pm19B] = classA_T[x];
                Biking_Cordinates_Injuries.classB[pm19B] = classB_T[x];
                Biking_Cordinates_Injuries.classC[pm19B] = classC_T[x];
                Biking_Cordinates_Injuries.classO[pm19B] = classO_T[x];
                pm19B++;
            }
          
          }else if((dateT[x].charAt(dateT[x].length-1)) == "6"  &&  classA_T[x] != 0 && latT[x]!=0 && longT[x] !=0) { 
                if(typeT[x] == "GEN"){ // filter the coordinates that are not 0
            //driving_Cordinates_Injuries
                driving_Cordinates_Injuries.lat[pm19D] = latT[x]; // store lat
                driving_Cordinates_Injuries.lon[pm19D] = longT[x]; 
                driving_Cordinates_Injuries.year[pm19D] = "2016";
                driving_Cordinates_Injuries.fatality[pm19D] = fatalitiesT[x]; // store specific fatality Count on that point
                driving_Cordinates_Injuries.classA[pm19D] = classA_T[x];
                driving_Cordinates_Injuries.classB[pm19D] = classB_T[x];
                driving_Cordinates_Injuries.classC[pm19D] = classC_T[x];
                driving_Cordinates_Injuries.classO[pm19D] = classO_T[x];
                pm19D++; // this counter aids in keeping track of the cordinates of this type (driving, freight, walking, biking)
            }else if(typeT[x] == "COMV"){ // filter the coordinates that are not 0
                Freight_Cordinates_Injuries.lat[pm19F] = latT[x]; 
                Freight_Cordinates_Injuries.lon[pm19F] = longT[x];
                Freight_Cordinates_Injuries.year[pm19F] = "2016"; 
                Freight_Cordinates_Injuries.fatality[pm19F] = fatalitiesT[x]; 
                Freight_Cordinates_Injuries.classA[pm19F] = classA_T[x];
                Freight_Cordinates_Injuries.classB[pm19F] = classB_T[x];
                Freight_Cordinates_Injuries.classC[pm19F] = classC_T[x];
                Freight_Cordinates_Injuries.classO[pm19F] = classO_T[x];
                pm19F++;
            }else if(typeT[x] == "PED"){ 
                Walking_Cordinates_Injuries.lat[pm19W] = latT[x]; 
                Walking_Cordinates_Injuries.lon[pm19W] = longT[x]; 
                Walking_Cordinates_Injuries.year[pm19W] = "2016"; 
                Walking_Cordinates_Injuries.fatality[pm19W] = fatalitiesT[x]; 
                Walking_Cordinates_Injuries.classA[pm19W] = classA_T[x];
                Walking_Cordinates_Injuries.classB[pm19W] = classB_T[x];
                Walking_Cordinates_Injuries.classC[pm19W] = classC_T[x];
                Walking_Cordinates_Injuries.classO[pm19W] = classO_T[x];
                pm19W++;
            }else if(typeT[x] == "BIKE"){ 
                Biking_Cordinates_Injuries.lat[pm19B] = latT[x]; 
                Biking_Cordinates_Injuries.lon[pm19B] = longT[x]; 
                Biking_Cordinates_Injuries.year[pm19B] = "2016"; 
                Biking_Cordinates_Injuries.fatality[pm19B] = fatalitiesT[x]; 
                Biking_Cordinates_Injuries.classA[pm19B] = classA_T[x];
                Biking_Cordinates_Injuries.classB[pm19B] = classB_T[x];
                Biking_Cordinates_Injuries.classC[pm19B] = classC_T[x];
                Biking_Cordinates_Injuries.classO[pm19B] = classO_T[x];
                pm19B++;
            }
          
        
          }else if((dateT[x].charAt(dateT[x].length-1)) == "7"  &&  classA_T[x] != 0 && latT[x]!=0 && longT[x] !=0) { 
                if(typeT[x] == "GEN"){ 
            //driving_Cordinates_Injuries
                driving_Cordinates_Injuries.lat[pm19D] = latT[x]; // store lat
                driving_Cordinates_Injuries.lon[pm19D] = longT[x]; // store Long
                driving_Cordinates_Injuries.year[pm19D] = "2017"; // store year
                driving_Cordinates_Injuries.fatality[pm19D] = fatalitiesT[x]; // store specific fatality Count on that point
                driving_Cordinates_Injuries.classA[pm19D] = classA_T[x];
                driving_Cordinates_Injuries.classB[pm19D] = classB_T[x];
                driving_Cordinates_Injuries.classC[pm19D] = classC_T[x];
                driving_Cordinates_Injuries.classO[pm19D] = classO_T[x];
                pm19D++; // this counter aids in keeping track of the cordinates of this type (driving, freight, walking, biking)
            }else if(typeT[x] == "COMV"){ 
                Freight_Cordinates_Injuries.lat[pm19F] = latT[x]; 
                Freight_Cordinates_Injuries.lon[pm19F] = longT[x];
                Freight_Cordinates_Injuries.year[pm19F] = "2017"; 
                Freight_Cordinates_Injuries.fatality[pm19F] = fatalitiesT[x]; 
                Freight_Cordinates_Injuries.classA[pm19F] = classA_T[x];
                Freight_Cordinates_Injuries.classB[pm19F] = classB_T[x];
                Freight_Cordinates_Injuries.classC[pm19F] = classC_T[x];
                Freight_Cordinates_Injuries.classO[pm19F] = classO_T[x];
                pm19F++;
            }else if(typeT[x] == "PED"){ 
                Walking_Cordinates_Injuries.lat[pm19W] = latT[x]; 
                Walking_Cordinates_Injuries.lon[pm19W] = longT[x]; 
                Walking_Cordinates_Injuries.year[pm19W] = "2017"; 
                Walking_Cordinates_Injuries.fatality[pm19W] = fatalitiesT[x]; 
                Walking_Cordinates_Injuries.classA[pm19W] = classA_T[x];
                Walking_Cordinates_Injuries.classB[pm19W] = classB_T[x];
                Walking_Cordinates_Injuries.classC[pm19W] = classC_T[x];
                Walking_Cordinates_Injuries.classO[pm19W] = classO_T[x];
                pm19W++;
            }else if(typeT[x] == "BIKE"){ 
                Biking_Cordinates_Injuries.lat[pm19B] = latT[x]; 
                Biking_Cordinates_Injuries.lon[pm19B] = longT[x]; 
                Biking_Cordinates_Injuries.year[pm19B] = "2017"; 
                Biking_Cordinates_Injuries.fatality[pm19B] = fatalitiesT[x]; 
                Biking_Cordinates_Injuries.classA[pm19B] = classA_T[x];
                Biking_Cordinates_Injuries.classB[pm19B] = classB_T[x];
                Biking_Cordinates_Injuries.classC[pm19B] = classC_T[x];
                Biking_Cordinates_Injuries.classO[pm19B] = classO_T[x];
                pm19B++;
            }
          }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// PM19 Coordinates End


        // PM18 
        if((dateT[x].charAt(dateT[x].length-1)) == "3"){ //******************************************** 2013
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
            if(fatalitiesT[x] != 0 && typeT[x] == "GEN"){ 
                Texas2013Info.DrivingTotFatalities+=fatalitiesT[x]; // count Fatalities (includes cordinates with 0)
                // Here we are storing cordinates with the info on that point
                if(latT[x]!=0 && longT[x] !=0){ // filter the coordinates that are not 0
                    driving_Cordinates_Fatalities.lat[pm18D] = latT[x];  
                    driving_Cordinates_Fatalities.lon[pm18D] = longT[x]; 
                    driving_Cordinates_Fatalities.year[pm18D] = "2013"; 
                    driving_Cordinates_Fatalities.fatality[pm18D] = fatalitiesT[x]; 
                    driving_Cordinates_Fatalities.classA[pm18D] = classA_T[x];
                    driving_Cordinates_Fatalities.classB[pm18D] = classB_T[x];
                    driving_Cordinates_Fatalities.classC[pm18D] = classC_T[x];
                    driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18D++; // this counter aids in keeping track of the cordinates of this type (driving, freight, walking, biking)
                }
            }else if(fatalitiesT[x] != 0 && typeT[x] == "COMV"){
                Texas2013Info.FreightTotFatalities+=fatalitiesT[x];
                if(latT[x]!=0 && longT[x] !=0){ // filter the coordinates that are not 0
                    Freight_Cordinates_Fatalities.lat[pm18F] = latT[x]; 
                    Freight_Cordinates_Fatalities.lon[pm18F] = longT[x];
                    Freight_Cordinates_Fatalities.year[pm18F] = "2013"; 
                    Freight_Cordinates_Fatalities.fatality[pm18F] = fatalitiesT[x]; 
                    Freight_Cordinates_Fatalities.classA[pm18F] = classA_T[x];
                    Freight_Cordinates_Fatalities.classB[pm18F] = classB_T[x];
                    Freight_Cordinates_Fatalities.classC[pm18F] = classC_T[x];
                    Freight_Cordinates_Fatalities.classO[pm18F] = classO_T[x];
                    pm18F++;
                }
            }else if(fatalitiesT[x] != 0 && typeT[x] == "PED"){
                Texas2013Info.WalkingTotFatalities+=fatalitiesT[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Walking_Cordinates_Fatalities.lat[pm18W] = latT[x]; 
                    Walking_Cordinates_Fatalities.lon[pm18W] = longT[x]; 
                    Walking_Cordinates_Fatalities.year[pm18W] = "2013"; 
                    Walking_Cordinates_Fatalities.fatality[pm18W] = fatalitiesT[x]; 
                    Walking_Cordinates_Fatalities.classA[pm18W] = classA_T[x];
                    Walking_Cordinates_Fatalities.classB[pm18W] = classB_T[x];
                    Walking_Cordinates_Fatalities.classC[pm18W] = classC_T[x];
                    Walking_Cordinates_Fatalities.classO[pm18W] = classO_T[x];
                    pm18W++;
                }
            }else if(fatalitiesT[x] != 0 && typeT[x] == "BIKE"){
                Texas2013Info.BikeTotFatalities+=fatalitiesT[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Bike_Cordinates_Fatalities.lat[pm18B] = latT[x]; 
                    Bike_Cordinates_Fatalities.lon[pm18B] = longT[x]; 
                    Bike_Cordinates_Fatalities.year[pm18B] = "2013"; 
                    Bike_Cordinates_Fatalities.fatality[pm18B] = fatalitiesT[x]; 
                    Bike_Cordinates_Fatalities.classA[pm18B] = classA_T[x];
                    Bike_Cordinates_Fatalities.classB[pm18B] = classB_T[x];
                    Bike_Cordinates_Fatalities.classC[pm18B] = classC_T[x];
                    Bike_Cordinates_Fatalities.classO[pm18B] = classO_T[x];
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

            if(fatalitiesT[x] != 0 && typeT[x] == "GEN"){
                Texas2014Info.DrivingTotFatalities+=fatalitiesT[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    driving_Cordinates_Fatalities.lat[pm18D] = latT[x]; 
                    driving_Cordinates_Fatalities.lon[pm18D] = longT[x]; 
                    driving_Cordinates_Fatalities.year[pm18D] = "2014"; 
                    driving_Cordinates_Fatalities.fatality[pm18D] = fatalitiesT[x];
                    driving_Cordinates_Fatalities.classA[pm18D] = classA_T[x];
                    driving_Cordinates_Fatalities.classB[pm18D] = classB_T[x];
                    driving_Cordinates_Fatalities.classC[pm18D] = classC_T[x];
                    driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18D++;
                }
            }else if(fatalitiesT[x] != 0 && typeT[x] == "COMV"){
                Texas2014Info.FreightTotFatalities+=fatalitiesT[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Freight_Cordinates_Fatalities.lat[pm18F] = latT[x]; 
                    Freight_Cordinates_Fatalities.lon[pm18F] = longT[x];
                    Freight_Cordinates_Fatalities.year[pm18F] = "2014"; 
                    Freight_Cordinates_Fatalities.fatality[pm18F] = fatalitiesT[x]; 
                    Freight_Cordinates_Fatalities.classA[pm18F] = classA_T[x];
                    Freight_Cordinates_Fatalities.classB[pm18F] = classB_T[x];
                    Freight_Cordinates_Fatalities.classC[pm18F] = classC_T[x];
                    Freight_Cordinates_Fatalities.classO[pm18F] = classO_T[x];
                    pm18F++;
                }
            }else if(fatalitiesT[x] != 0 && typeT[x] == "PED"){
                Texas2014Info.WalkingTotFatalities+=fatalitiesT[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Walking_Cordinates_Fatalities.lat[pm18W] = latT[x]; 
                    Walking_Cordinates_Fatalities.lon[pm18W] = longT[x]; 
                    Walking_Cordinates_Fatalities.year[pm18W] = "2014"; 
                    Walking_Cordinates_Fatalities.fatality[pm18W] = fatalitiesT[x]; 
                    Walking_Cordinates_Fatalities.classA[pm18W] = classA_T[x];
                    Walking_Cordinates_Fatalities.classB[pm18W] = classB_T[x];
                    Walking_Cordinates_Fatalities.classC[pm18W] = classC_T[x];
                    Walking_Cordinates_Fatalities.classO[pm18W] = classO_T[x];
                    pm18W++;
                }
            }else if(fatalitiesT[x] != 0 && typeT[x] == "BIKE"){
                Texas2014Info.BikeTotFatalities+=fatalitiesT[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Bike_Cordinates_Fatalities.lat[pm18B] = latT[x]; 
                    Bike_Cordinates_Fatalities.lon[pm18B] = longT[x]; 
                    Bike_Cordinates_Fatalities.year[pm18B] = "2014"; 
                    Bike_Cordinates_Fatalities.fatality[pm18B] = fatalitiesT[x]; 
                    Bike_Cordinates_Fatalities.classA[pm18B] = classA_T[x];
                    Bike_Cordinates_Fatalities.classB[pm18B] = classB_T[x];
                    Bike_Cordinates_Fatalities.classC[pm18B] = classC_T[x];
                    Bike_Cordinates_Fatalities.classO[pm18B] = classO_T[x];
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

            if(fatalitiesT[x] != 0 && typeT[x] == "GEN"){
                Texas2015Info.DrivingTotFatalities+=fatalitiesT[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    driving_Cordinates_Fatalities.lat[pm18D] = latT[x]; 
                    driving_Cordinates_Fatalities.lon[pm18D] = longT[x]; 
                    driving_Cordinates_Fatalities.year[pm18D] = "2015"; 
                    driving_Cordinates_Fatalities.fatality[pm18D] = fatalitiesT[x];
                    driving_Cordinates_Fatalities.classA[pm18D] = classA_T[x];
                    driving_Cordinates_Fatalities.classB[pm18D] = classB_T[x];
                    driving_Cordinates_Fatalities.classC[pm18D] = classC_T[x];
                    driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18D++;
                }
            }else if(fatalitiesT[x] != 0 && typeT[x] == "COMV"){
                Texas2015Info.FreightTotFatalities+=fatalitiesT[x];
                // Array that holds information of a specific point
                if(latT[x]!=0 && longT[x] !=0){ 
                    Freight_Cordinates_Fatalities.lat[pm18F] = latT[x]; 
                    Freight_Cordinates_Fatalities.lon[pm18F] = longT[x]; 
                    Freight_Cordinates_Fatalities.year[pm18F] = "2015"; 
                    Freight_Cordinates_Fatalities.fatality[pm18F] = fatalitiesT[x]; 
                    Freight_Cordinates_Fatalities.classA[pm18F] = classA_T[x];
                    Freight_Cordinates_Fatalities.classB[pm18F] = classB_T[x];
                    Freight_Cordinates_Fatalities.classC[pm18F] = classC_T[x];
                    Freight_Cordinates_Fatalities.classO[pm18F] = classO_T[x];
                    pm18F++;
                }
            }else if(fatalitiesT[x] != 0 && typeT[x] == "PED"){
                Texas2015Info.WalkingTotFatalities+=fatalitiesT[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Walking_Cordinates_Fatalities.lat[pm18W] = latT[x]; 
                    Walking_Cordinates_Fatalities.lon[pm18W] = longT[x]; 
                    Walking_Cordinates_Fatalities.year[pm18W] = "2015"; 
                    Walking_Cordinates_Fatalities.fatality[pm18W] = fatalitiesT[x]; 
                    Walking_Cordinates_Fatalities.classA[pm18W] = classA_T[x];
                    Walking_Cordinates_Fatalities.classB[pm18W] = classB_T[x];
                    Walking_Cordinates_Fatalities.classC[pm18W] = classC_T[x];
                    Walking_Cordinates_Fatalities.classO[pm18W] = classO_T[x];
                    pm18W++;
                }
            }else if(fatalitiesT[x] != 0 && typeT[x] == "BIKE"){
                Texas2015Info.BikeTotFatalities+=fatalitiesT[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Bike_Cordinates_Fatalities.lat[pm18B] = latT[x]; 
                    Bike_Cordinates_Fatalities.lon[pm18B] = longT[x];
                    Bike_Cordinates_Fatalities.year[pm18B] = "2015";
                    Bike_Cordinates_Fatalities.fatality[pm18B] = fatalitiesT[x]; 
                    Bike_Cordinates_Fatalities.classA[pm18B] = classA_T[x];
                    Bike_Cordinates_Fatalities.classB[pm18B] = classB_T[x];
                    Bike_Cordinates_Fatalities.classC[pm18B] = classC_T[x];
                    Bike_Cordinates_Fatalities.classO[pm18B] = classO_T[x];
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

            if(fatalitiesT[x] != 0 && typeT[x] == "GEN"){
                Texas2016Info.DrivingTotFatalities+=fatalitiesT[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    driving_Cordinates_Fatalities.lat[pm18D] = latT[x]; 
                    driving_Cordinates_Fatalities.lon[pm18D] = longT[x]; 
                    driving_Cordinates_Fatalities.year[pm18D] = "2016"; 
                    driving_Cordinates_Fatalities.fatality[pm18D] = fatalitiesT[x];
                    driving_Cordinates_Fatalities.classA[pm18D] = classA_T[x];
                    driving_Cordinates_Fatalities.classB[pm18D] = classB_T[x];
                    driving_Cordinates_Fatalities.classC[pm18D] = classC_T[x];
                    driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18D++;
                }
            }else if(fatalitiesT[x] != 0 && typeT[x] == "COMV"){
                Texas2016Info.FreightTotFatalities+=fatalitiesT[x];
                // Array that holds information of a specific point
                if(latT[x]!=0 && longT[x] !=0){ 
                    Freight_Cordinates_Fatalities.lat[pm18F] = latT[x];
                    Freight_Cordinates_Fatalities.lon[pm18F] = longT[x]; 
                    Freight_Cordinates_Fatalities.year[pm18F] = "2016"; 
                    Freight_Cordinates_Fatalities.fatality[pm18F] = fatalitiesT[x]; 
                    Freight_Cordinates_Fatalities.classA[pm18F] = classA_T[x];
                    Freight_Cordinates_Fatalities.classB[pm18F] = classB_T[x];
                    Freight_Cordinates_Fatalities.classC[pm18F] = classC_T[x];
                    Freight_Cordinates_Fatalities.classO[pm18F] = classO_T[x];
                    pm18F++;
                }
            }else if(fatalitiesT[x] != 0 && typeT[x] == "PED"){
                Texas2016Info.WalkingTotFatalities+=fatalitiesT[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Walking_Cordinates_Fatalities.lat[pm18W] = latT[x]; 
                    Walking_Cordinates_Fatalities.lon[pm18W] = longT[x]; 
                    Walking_Cordinates_Fatalities.year[pm18W] = "2016"; 
                    Walking_Cordinates_Fatalities.fatality[pm18W] = fatalitiesT[x];
                    Walking_Cordinates_Fatalities.classA[pm18W] = classA_T[x];
                    Walking_Cordinates_Fatalities.classB[pm18W] = classB_T[x];
                    Walking_Cordinates_Fatalities.classC[pm18W] = classC_T[x];
                    Walking_Cordinates_Fatalities.classO[pm18W] = classO_T[x];
                    pm18W++;
                }
            }else if(fatalitiesT[x] != 0 && typeT[x] == "BIKE"){
                Texas2016Info.BikeTotFatalities+=fatalitiesT[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Bike_Cordinates_Fatalities.lat[pm18B] = latT[x]; 
                    Bike_Cordinates_Fatalities.lon[pm18B] = longT[x]; 
                    Bike_Cordinates_Fatalities.year[pm18B] = "2016"; 
                    Bike_Cordinates_Fatalities.fatality[pm18B] = fatalitiesT[x]; 
                    Bike_Cordinates_Fatalities.classA[pm18B] = classA_T[x];
                    Bike_Cordinates_Fatalities.classB[pm18B] = classB_T[x];
                    Bike_Cordinates_Fatalities.classC[pm18B] = classC_T[x];
                    Bike_Cordinates_Fatalities.classO[pm18B] = classO_T[x];
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

            if(fatalitiesT[x] != 0 && typeT[x] == "GEN"){
                Texas2017Info.DrivingTotFatalities+=fatalitiesT[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    driving_Cordinates_Fatalities.lat[pm18D] = latT[x]; // store lat
                    driving_Cordinates_Fatalities.lon[pm18D] = longT[x]; // store Long
                    driving_Cordinates_Fatalities.year[pm18D] = "2017"; // store year
                    driving_Cordinates_Fatalities.fatality[pm18D] = fatalitiesT[x]; // store specific fatality Count on that point
                    driving_Cordinates_Fatalities.classA[pm18D] = classA_T[x];
                    driving_Cordinates_Fatalities.classB[pm18D] = classB_T[x];
                    driving_Cordinates_Fatalities.classC[pm18D] = classC_T[x];
                    driving_Cordinates_Fatalities.classO[pm18D] = classO_T[x];
                    pm18D++;
                }
            }else if(fatalitiesT[x] != 0 && typeT[x] == "COMV"){
                Texas2017Info.FreightTotFatalities+=fatalitiesT[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Freight_Cordinates_Fatalities.lat[pm18F] = latT[x]; // store lat
                    Freight_Cordinates_Fatalities.lon[pm18F] = longT[x]; // store Long
                    Freight_Cordinates_Fatalities.year[pm18F] = "2017"; // store year
                    Freight_Cordinates_Fatalities.fatality[pm18F] = fatalitiesT[x]; // store specific fatality Count on that point
                    Freight_Cordinates_Fatalities.classA[pm18F] = classA_T[x];
                    Freight_Cordinates_Fatalities.classB[pm18F] = classB_T[x];
                    Freight_Cordinates_Fatalities.classC[pm18F] = classC_T[x];
                    Freight_Cordinates_Fatalities.classO[pm18F] = classO_T[x];
                    pm18F++;
                }
            }else if(fatalitiesT[x] != 0 && typeT[x] == "PED"){
                Texas2017Info.WalkingTotFatalities +=fatalitiesT[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Walking_Cordinates_Fatalities.lat[pm18W] = latT[x]; // store lat
                    Walking_Cordinates_Fatalities.lon[pm18W] = longT[x]; // store Long
                    Walking_Cordinates_Fatalities.year[pm18W] = "2017"; // store year
                    Walking_Cordinates_Fatalities.fatality[pm18W] = fatalitiesT[x]; // store specific fatality Count on that point
                    Walking_Cordinates_Fatalities.classA[pm18W] = classA_T[x];
                    Walking_Cordinates_Fatalities.classB[pm18W] = classB_T[x];
                    Walking_Cordinates_Fatalities.classC[pm18W] = classC_T[x];
                    Walking_Cordinates_Fatalities.classO[pm18W] = classO_T[x];
                    pm18W++;
                }
            }else if(fatalitiesT[x] != 0 && typeT[x] == "BIKE"){
                Texas2017Info.BikeTotFatalities+=fatalitiesT[x];
                if(latT[x]!=0 && longT[x] !=0){ 
                    Bike_Cordinates_Fatalities.lat[pm18B] = latT[x]; // store lat
                    Bike_Cordinates_Fatalities.lon[pm18B] = longT[x]; // store Long
                    Bike_Cordinates_Fatalities.year[pm18B] = "2017"; // store year
                    Bike_Cordinates_Fatalities.fatality[pm18B] = fatalitiesT[x]; // store specific fatality Count on that point
                    Bike_Cordinates_Fatalities.classA[pm18B] = classA_T[x];
                    Bike_Cordinates_Fatalities.classB[pm18B] = classB_T[x];
                    Bike_Cordinates_Fatalities.classC[pm18B] = classC_T[x];
                    Bike_Cordinates_Fatalities.classO[pm18B] = classO_T[x];
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

    Texas2013Info.totInjuries2013 = Texas2013Info.Driving_ClassA + Texas2013Info.Walking_ClassA + Texas2013Info.Freight_ClassA + Texas2013Info.Bike_ClassA;
    Texas2014Info.totInjuries2014 = Texas2014Info.Driving_ClassA + Texas2014Info.Walking_ClassA + Texas2014Info.Freight_ClassA + Texas2014Info.Bike_ClassA;
    Texas2015Info.totInjuries2015 = Texas2015Info.Driving_ClassA + Texas2015Info.Walking_ClassA + Texas2015Info.Freight_ClassA + Texas2015Info.Bike_ClassA;
    Texas2016Info.totInjuries2016 = Texas2016Info.Driving_ClassA + Texas2016Info.Walking_ClassA + Texas2016Info.Freight_ClassA + Texas2016Info.Bike_ClassA;
    Texas2017Info.totInjuries2017 = Texas2017Info.Driving_ClassA + Texas2017Info.Walking_ClassA + Texas2017Info.Freight_ClassA + Texas2017Info.Bike_ClassA;


    //Total Driving fatalities from 2013-2017
    pm18Calculations.Driving = Texas2013Info.DrivingTotFatalities + Texas2014Info.DrivingTotFatalities + Texas2015Info.DrivingTotFatalities + Texas2016Info.DrivingTotFatalities + Texas2017Info.DrivingTotFatalities;
    
    



    /*Calculating Ratio of 
            Driving Fatalities 
                        (for pm18_Driving)*/
    pm18Calculations.totalCarCrashes = Texas2013Info.crashes + Texas2014Info.crashes + Texas2015Info.crashes + Texas2016Info.crashes + Texas2017Info.crashes;
    pm18Calculations.drivingDeathRate =  (pm18Calculations.Driving)/(pm18Calculations.totalCarCrashes);

    /*Calculating CMV-related crashes 
            (for Number of Fatalities - Freight)*/
pm18Calculations.freightInjuries =  Texas2013Info.Freight_ClassA + Texas2013Info.Freight_ClassB + Texas2013Info.Freight_ClassC + Texas2013Info.Freight_ClassO + 
                                Texas2014Info.Freight_ClassA + Texas2014Info.Freight_ClassB + Texas2014Info.Freight_ClassC + Texas2014Info.Freight_ClassO +   
                                Texas2015Info.Freight_ClassA + Texas2015Info.Freight_ClassB + Texas2015Info.Freight_ClassC + Texas2015Info.Freight_ClassO +
                                Texas2016Info.Freight_ClassA + Texas2016Info.Freight_ClassB + Texas2016Info.Freight_ClassC + Texas2016Info.Freight_ClassO +
                                Texas2017Info.Freight_ClassA + Texas2017Info.Freight_ClassB + Texas2017Info.Freight_ClassC + Texas2017Info.Freight_ClassO; 

pm18Calculations.freightTotalFatalities = Texas2013Info.FreightTotFatalities + Texas2014Info.FreightTotFatalities + Texas2015Info.FreightTotFatalities + Texas2016Info.FreightTotFatalities + Texas2017Info.FreightTotFatalities;

pm18Calculations.totalFreightCrashes = pm18Calculations.freightInjuries + pm18Calculations.freightTotalFatalities;

    /*Calculating Ratio of 
            Freight Fatalities 
                        (for pm18_Freight)*/
      pm18Calculations.freightDeathRate = pm18Calculations.freightTotalFatalities/pm18Calculations.totalFreightCrashes

     
/*Calculating Walking-related crashes 
            (for Number of Fatalities - Walking)*/
            pm18Calculations.walkingInjuries = 
            Texas2013Info.Walking_ClassA + Texas2013Info.Walking_ClassB + Texas2013Info.Walking_ClassC + Texas2013Info.Walking_ClassO + 
            Texas2014Info.Walking_ClassA + Texas2014Info.Walking_ClassB + Texas2014Info.Walking_ClassC + Texas2014Info.Walking_ClassO + 
            Texas2015Info.Walking_ClassA + Texas2015Info.Walking_ClassB + Texas2015Info.Walking_ClassC + Texas2015Info.Walking_ClassO +
            Texas2016Info.Walking_ClassA + Texas2016Info.Walking_ClassB + Texas2016Info.Walking_ClassC + Texas2016Info.Walking_ClassO +
            Texas2017Info.Walking_ClassA + Texas2017Info.Walking_ClassB + Texas2017Info.Walking_ClassC + Texas2017Info.Walking_ClassO; 

pm18Calculations.walkingTotalFatalities = Texas2013Info.WalkingTotFatalities + Texas2014Info.WalkingTotFatalities + Texas2015Info.WalkingTotFatalities+ Texas2016Info.WalkingTotFatalities + Texas2017Info.WalkingTotFatalities;

pm18Calculations.totalWalkingCrashes = pm18Calculations.walkingInjuries + pm18Calculations.walkingTotalFatalities;

/*Calculating Ratio of 
            Walking Fatalities */
pm18Calculations.walkingDeathRate = pm18Calculations.walkingTotalFatalities/pm18Calculations.totalWalkingCrashes;

    
/*Calculating Biking-related crashes 
            (for Number of Fatalities - Walking)*/
            pm18Calculations.bikingInjuries = 
            Texas2013Info.Bike_ClassA + Texas2013Info.Bike_ClassB + Texas2013Info.Bike_ClassC + Texas2013Info.Bike_ClassO + 
            Texas2014Info.Bike_ClassA + Texas2014Info.Bike_ClassB + Texas2014Info.Bike_ClassC + Texas2014Info.Bike_ClassO + 
            Texas2015Info.Bike_ClassA + Texas2015Info.Bike_ClassB + Texas2015Info.Bike_ClassC + Texas2015Info.Bike_ClassO +
            Texas2016Info.Bike_ClassA + Texas2016Info.Bike_ClassB + Texas2016Info.Bike_ClassC + Texas2016Info.Bike_ClassO +
            Texas2017Info.Bike_ClassA + Texas2017Info.Bike_ClassB + Texas2017Info.Bike_ClassC + Texas2017Info.Bike_ClassO; 

pm18Calculations.bikingTotalFatalities = Texas2013Info.BikeTotFatalities + Texas2014Info.BikeTotFatalities + Texas2015Info.BikeTotFatalities+ Texas2016Info.BikeTotFatalities + Texas2017Info.BikeTotFatalities;

pm18Calculations.totalBikingCrashes = pm18Calculations.bikingInjuries + pm18Calculations.bikingTotalFatalities;

/*Calculating Ratio of 
            Biking Fatalities */
pm18Calculations.bikingDeathRate = pm18Calculations.bikingTotalFatalities/pm18Calculations.totalBikingCrashes;

    guardian++; // After 1st run, values will no longer update
    }

}    

    
function pm18chartLine(ctx, Button){
    // line 2, changes by category, aka Driving, Freight ect
    var pm18_graphTitle;
    var pm18_graphValues = []; 

    //line chart data
    if(Button == 'D'){ // if Driving is click
        pm18_graphValues[0] = Texas2013Info.DrivingTotFatalities;
        pm18_graphValues[1] = Texas2014Info.DrivingTotFatalities;
        pm18_graphValues[2] = Texas2015Info.DrivingTotFatalities;
        pm18_graphValues[3] = Texas2016Info.DrivingTotFatalities;
        pm18_graphValues[4] = Texas2017Info.DrivingTotFatalities;
        pm18_graphTitle = 'Driving Fatalities';
    }else if(Button == 'F'){ // if Freight is click
        pm18_graphValues[0] = Texas2013Info.FreightTotFatalities;
        pm18_graphValues[1] = Texas2014Info.FreightTotFatalities;
        pm18_graphValues[2] = Texas2015Info.FreightTotFatalities;
        pm18_graphValues[3] = Texas2016Info.FreightTotFatalities;
        pm18_graphValues[4] = Texas2017Info.FreightTotFatalities;
        pm18_graphTitle = 'Freight Fatalities';

    }else if(Button == 'W'){ 
        pm18_graphValues[0] = Texas2013Info.WalkingTotFatalities;
        pm18_graphValues[1] = Texas2014Info.WalkingTotFatalities;
        pm18_graphValues[2] = Texas2015Info.WalkingTotFatalities;
        pm18_graphValues[3] = Texas2016Info.WalkingTotFatalities;
        pm18_graphValues[4] = Texas2017Info.WalkingTotFatalities;
      pm18_graphTitle = 'Walking Fatalities'; 
    }else if(Button == 'B'){
        pm18_graphValues[0] = Texas2013Info.BikeTotFatalities;
        pm18_graphValues[1] = Texas2014Info.BikeTotFatalities;
        pm18_graphValues[2] = Texas2015Info.BikeTotFatalities;
        pm18_graphValues[3] = Texas2016Info.BikeTotFatalities;
        pm18_graphValues[4] = Texas2017Info.BikeTotFatalities;
        pm18_graphTitle = 'Bycycle Fatalities';

    }
    var data = {
        labels: ["2013", "2014", "2015", "2016", "2017"],
        datasets: [
            {
            label: pm18_graphTitle,
            data: pm18_graphValues,
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
				label: 'Serious Injuries',
				backgroundColor: 'rgba(92,187,3,0.5)',
				data: [
					Texas2013Info.Driving_ClassA,Texas2014Info.Driving_ClassA,Texas2015Info.Driving_ClassA,Texas2015Info.Driving_ClassA,Texas2016Info.Driving_ClassA,Texas2017Info.Driving_ClassA
				]
			}, {
				label: 'Non-Incapacitating Injuries',
				backgroundColor: 'rgba(117,36,221,0.5)',
				data: [
					Texas2013Info.Driving_ClassB,Texas2014Info.Driving_ClassB,Texas2015Info.Driving_ClassB,Texas2015Info.Driving_ClassB,Texas2016Info.Driving_ClassB,Texas2017Info.Driving_ClassB
				]
			},  {
				label: 'Possible Injuries',
				backgroundColor: 'rgba(0,255,255.0.5)',
				data: [
                    Texas2013Info.Driving_ClassC,Texas2014Info.Driving_ClassC,Texas2015Info.Driving_ClassC,Texas2015Info.Driving_ClassC,Texas2016Info.Driving_ClassC,Texas2017Info.Driving_ClassC
				]
			},  {
				label: 'Non-Injury',
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
                    fontSize: 10,
                    boxWidth:6
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
                    stacked: true,
                    ticks: {
                        //max:45000
                    }
                }]
            }
        }
    });
	
}
