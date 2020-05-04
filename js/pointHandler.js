/*
 * This class aids in determining 2 things: The current Type & current PM. 
 * After Finding that info-> call the PM class
 * Those 2 things are used for other methods, this class CRUCIAL 
 * This class is used immediately after a user clicks on a PM button regarding POINTS on regional only
 * 
 */

function pointHandler(found) {
    clean(); 

    toggleSpinner('on');
    toggleRadio('off');
    toggleHolderSwitch('off');
    toggleVisibilityCorr('off');
    toggleNav('off');
    toggleMap('on');
    
    if (found == "PM13D") {
        currentType = "driving";
        currentPM = 13;
        pm13Data(1);
    } else if (found == "PM13F") {
        currentType = "freight";
        currentPM = 13;
        pm13Data(1);
    } else if (found == "PM13W") {
        currentType = "walking";
        currentPM = 13;
        pm13Data(1);
    } else if (found == "PM14D") {
        currentType = "driving";
        currentPM = 14;
        pm14Data(1);
    } else if (found == "PM14F") {
        currentType = "freight";
        currentPM = 14;
        pm14Data(1);
    } else if (found == "PM14W") {
        currentType = "walking";
        currentPM = 14;
        pm14Data(1);
    }
    else if (found == "pm15Driving") {
        currentType = "driving";
        currentPM = 15;
        pm15Data(1);
    } else if (found == "pm16Driving") {
        currentType = "driving";
        currentPM = 16;
        pm16Data(1);
    }
    else if (found == "pm17Driving") {
        currentType = "driving";
        currentPM = 17;
        pm17Data(1);
    }
    else if (found == "pm18Driving") {
        currentType = "driving";
        currentPM = 18;
        active_pm_for_AOI = "all_pm18_19";
        pm18Data(1, "a");
       
    }
    else if (found == "pm18Freight") {
        currentType = "freight";
        currentPM = 18;
        active_pm_for_AOI = "all_pm18_19";
        pm18Data(1, "a");
    }
    else if (found == "pm18Walking") {
        currentType = "walking";
        currentPM = 18;
        active_pm_for_AOI = "all_pm18_19";
        pm18Data(1, "a");
    }
    else if (found == "pm18Biking") {
        currentType = "biking";
        currentPM = 18;
        active_pm_for_AOI = "all_pm18_19";
        pm18Data(1, "a");
    }
    else if (found == "pm19Driving") {
        currentPM = 19;
        active_pm_for_AOI = "all_pm_19";
        currentType = "driving";
        pm19Data(1, "");
    }
    else if (found == "pm19Freight") {
        currentPM = 19;
        active_pm_for_AOI = "all_pm_19";
        currentType = "freight";
        pm19Data(1, "a");
    }
    else if (found == "pm19Walking") {
        currentPM = 19;
        active_pm_for_AOI = "all_pm_19";
        currentType = "walking";
        pm19Data(1, "a");
    }
    else if (found == "pm19Biking") {
        currentPM = 19;
        active_pm_for_AOI = "all_pm_19";
        currentType = "biking";
        pm19Data(1, "a");
    }
    else if (found == "PM20W") {
        currentPM = 20;
        currentType = "walking";
        active_pm_for_AOI = "pm20W";
        pm20Data(1, "a");
    }
    else if (found == "PM20B") {
        currentPM = 20;
        active_pm_for_AOI = "pm20B";
        currentType = "biking";
        pm20Data(1, "a");
    }
    else if (found == "PM22") {
        currentPM = 22;
        active_pm_for_AOI = "all_pm22";
        currentType = "driving";
        pm22Data(1, "a");
    }
    else if (found == "pm26") {
        currentPM = 26;
        active_pm_for_AOI = "all_pm26";
        currentType = "driving";
        pm26Data(1, "a");
    }
    else if (found == "pm26F") {
        currentPM = 26;
        active_pm_for_AOI = "all_pm26";
        currentType = "freight";
        pm26Data(1, "a");
    }
    else if (found == "pm26T") {
        currentPM = 26;
        active_pm_for_AOI = "all_pm26";
        currentType = "transit";
        pm26Data(1, "a");
    }
}