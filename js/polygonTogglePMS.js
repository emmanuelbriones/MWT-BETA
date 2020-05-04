/*
 Adds Toggle to Polygon PMS 5 to 10
 */ 

var PM_existing_shown = {
    'PM5': [],
    'PM6': [],
    'PM7': [],
    'PM8': [],
    'PM9': [],
    'PM10': []
}

var PM_existing_selected = {
    'PM5': false,
    'PM6': false,
    'PM7': false,
    'PM8': false,
    'PM9': false,
    'PM10': false
}

var PM_planned_shown = {
    'PM5': [],
    'PM6': [],
    'PM7': [],
    'PM8': [],
    'PM9': [],
    'PM10': []
}

var PM_planned_selected = {
    'PM5': false,
    'PM6': false,
    'PM7': false,
    'PM8': false,
    'PM9': false,
    'PM10': false
}

//for pms 5 to 9
function turnOff_Switches() {
    for (var index in PM_planned_selected) {
        PM_planned_selected[index] = false;
    }
    for (var index in corridors_selected) {
        corridors_selected[index] = false;
    }
}

//existing
$("#toggle1").on('change', function () {

    if ($(this).is(':checked')) { //when TRUE
        removeAllElementsBar();
        toggleSpinner('on');
        toggleRadio('off');
        toggleHolderSwitch('off');
        toggleVisibilityCorr('off');
        toggleNav('off');
        toggleMap('on');
        if (currentPM == 5) {
            PM_existing_selected.PM5 = true;
            pm5Data(1,"e"); // 5 & 9 share table
        } else if (currentPM == 9) {
            PM_existing_selected.PM9 = true;
            pm9Data(1, "e"); // 5 & 9 share table
        } else if (currentPM == 6) {
            PM_existing_selected.PM6 = true;
            //console.log('line handleling');
            pm6Data(1, "e");
        } else if (currentPM == 7) {
            PM_existing_selected.PM7 = true;
            pm7Data(1, "e");
        } else if (currentPM == 8) {
            PM_existing_selected.PM8 = true;
            pm8Data(1, "e");
        } else if (currentPM == 10) {
            PM_existing_selected.PM10 = true;
            pm10Data(1, "e");
        }
    } else {

        if (currentPM == 5) {
            PM_existing_selected.PM5 = false;
            clear_Exist();
        } else if (currentPM == 9) {
            PM_existing_selected.PM9 = false;
            clear_Exist();
        }else if (currentPM == 6) {
            PM_existing_selected.PM6 = false;
            clear_Exist();
        } else if (currentPM == 7) {
            PM_existing_selected.PM7 = false;
            clear_Exist();
        } else if (currentPM == 8) {
            PM_existing_selected.PM8 = false;
            clear_Exist();
        } else if (currentPM == 10) {
            PM_existing_selected.PM10 = false;
            clear_Exist();
        }
    }
});
//planned
$("#toggle2").on('change', function () {
    if ($(this).is(':checked')) { //when TRUE
        removeAllElementsBar();
        toggleSpinner('on');
        toggleRadio('off');
        toggleHolderSwitch('off');
        toggleVisibilityCorr('off');
        toggleNav('off');
        if (currentPM == 5) {
            PM_planned_selected.PM5 = true;
            pm5Data(1, "p"); // 5 & 9 share table
        } else if (currentPM == 9) {
            PM_planned_selected.PM5 = true;
            pm9Data(1, "p"); // 5 & 9 share table
        } else if (currentPM == 6) {
            PM_planned_selected.PM6 = true;
            pm6Data(1, "p");
        } else if (currentPM == 7) {
            PM_planned_selected.PM7 = true;
            pm7Data(1, "p");
        } else if (currentPM == 8) {
            PM_planned_selected.PM8 = true;
            pm8Data(1, "p");
        } else if (currentPM == 10) {
            PM_planned_selected.PM10 = true;
            pm10Data(1, "p");
        }
    } else {
        if (currentPM == 5) {
            PM_planned_selected.PM5 = false;
            clear_Planned();
        } else if (currentPM == 9) {
            PM_planned_selected.PM9 = false;
            clear_Planned();
        } else if (currentPM == 6) {
            PM_planned_selected.PM6 = false;
            clear_Planned();
        } else if (currentPM == 7) {
            PM_planned_selected.PM7 = false;
            clear_Planned();
        } else if (currentPM == 8) {
            PM_planned_selected.PM8 = false;
            clear_Planned();
        } else if (currentPM == 10) {
            PM_planned_selected.PM10 = false;
            clear_Planned();
        }
    }
});
