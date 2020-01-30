function openLegend() {
    if (detectmob() == true) {
        document.getElementById("legendHolder").style.width = "60%";
    } else if (currentType == "repo") {
        document.getElementById("legendHolder").style.width = "50%";
    } else {
        document.getElementById("legendHolder").style.width = "30%"; //length of legend
    }
}

function closeLegend() {
    document.getElementById("legendHolder").style.width = "0";
}

/* This functions are for sidebar */
//* when the sidenav is getting closed the fact that both closing and opening use single clicks triggers both, that's why
// it appears to do nothing. the solution is to make one of them to be used with double click and the othe with single click.
function openNav() {
    toggleNav('on');
    document.getElementById("mySidenav").style.overflow = "scroll";
    document.getElementById("mySidenav").className = "sidenav rounded-left mb-2 bg-light text-dark";
    $('#mySidenav').tooltip('disable');
    if (detectmob() == true) {
        document.getElementById("mySidenav").style.width = "100%";
        document.getElementById("mySidenav").style.height = "40%";
    } else {
        document.getElementById("mySidenav").style.width = "53%";
        document.getElementById("mySidenav").style.height = "71%";
        document.getElementById("mySidenav").style.marginTop = "8.5%";
    }
}

function closeNav() {
    // document.getElementById("mySidenav").style.width = "0%";
    if (detectmob() == true) {
        document.getElementById("mySidenav").style.width = "8%";
        document.getElementById("mySidenav").style.height = "8%";
        document.getElementById("mySidenav").style.overflow = "hidden";
        document.getElementById("mySidenav").className = "sidenav rounded-left mb-2 bg-info text-dark";

    } else {
        document.getElementById("mySidenav").style.width = "1%";
        document.getElementById("mySidenav").style.height = "2%";
        document.getElementById("mySidenav").style.overflow = "hidden";
        document.getElementById("mySidenav").className = "sidenav rounded-left mb-2 bg-info text-dark";
    }
    //alert(currentPM);
    if (currentPM === 0) {
      //  document.getElementById("mySidenav").style.overflow = "none";

    } else {
        //document.getElementById("mySidenav").style.display = "block";

    }
    $('#mySidenav').tooltip('enable');


    //removeAllElementsBar(); // destroy everything when closing bar
}
function toggleNav(state) {
    if (state == "on") {
        document.getElementById("mySidenav").style.visibility = "visible";
        //document.getElementById("radioH").style.visibility = "visible";
    } else if (state == "off") {
        document.getElementById("mySidenav").style.visibility = "hidden";
       // document.getElementById("radioH").style.visibility = "hidden";
    }
}

function clean() {
    removeAllElementsBar();
    removeAllElementsLegend();
    clearMetadata();
    markerClusterSafeDelete();
    toggleSafeRemove();
    turnoff_Corridors();
    removeNonPMContent();
    resetRadioBtn("optradio");
    switch_AOI("off");
    deleteUserShapes();
    
}
function toggleSafeRemove() {
    if (toggleOn == true) {
        toggleHide();
        turnOff_Switches();
    }
}
// removes any element
function removeElement(id) {
    var element = document.getElementById(id);
    element.remove();
}

// safe removal for legend elements
function removeAllElementsLegend() {
    var element = document.getElementById("temp_title");
    var element2 = document.getElementById("temp_list");
    // if element exist, delete
    if (element) {
        removeElement("temp_title");
    }
    if (element2) {
        removeElement("temp_list");
    }
    closeLegend();

}

// removes bar elements only
function removeAllElementsBar() {
    for (var x = 0; x < universal; x++) {
        removeElement(x);
    }
    universal = 0; // reset counter
    canvasSafeDelete('myChart');
    canvasSafeDelete('myChart2');
}

function removeNonPMContent() {
    document.getElementById('non-pm-content').innerHTML = '';
    toggleNav('off');
}
function imageAdder(imageDir, holderDiv) {
    // create a new div element 
    var newDiv = document.createElement("div");
    newDiv.id = universal;
    universal++;
    var holder = document.getElementById(holderDiv);
    holder.appendChild(newDiv);
    // Create Image on Div
    var x = document.createElement("IMG");
    x.setAttribute("src", imageDir);
    x.setAttribute("width", "80%");
    x.setAttribute("height", "1%");
    x.className = 'col-md-12 col-sm-12 col-xs-12'; // add bootstrap
    x.id = universal;
    holder.appendChild(x);
    universal++;
}

// adds the pm title
function headerAdder(text, holderTitle) {
    var x = document.createElement("HEADER");
    var y;
    x.setAttribute("id", universal);
    document.body.appendChild(x);
    var holder = document.getElementById(holderTitle);
    if (holderTitle == "legend_title") {
        y = document.createElement("H5");
        if (detectmob() == true) {
            y = document.createElement("H7");
        }
        y.id = "temp_title"
    }
    else {
        y = document.createElement("H4");
        y.id = universal;
    }
    var t = document.createTextNode(text);
    y.appendChild(t);

    holder.appendChild(y);

    // styles
    holder.style.textAlign = "center";

    universal++;
}

// adds Anchor
function anchorAdder(text, link) {
    var x = document.createElement("A");
    x.setAttribute("class", "bridgeText");
    x.setAttribute("target", "#");
    x.setAttribute("style", "font-size: medium; color: blue;");
    // if one keep link as text of anchor
    if (text == 1) {
        var t = document.createTextNode(link);
    } else {
        var t = document.createTextNode(text);
    }
    x.setAttribute("href", link);
    x.appendChild(t);
    var holder = document.getElementById(universal - 1);
    holder.appendChild(x);

    //styles
    holder.style.fontSize = "medium";
}

// adds the information/subtitles(e.g summary/analysis period/data source/how it was calculated) of the pm
function paragraphAdder(text, elemtype, infotype) {
    var elem = document.createElement("P");
    // var node = document.createTextNode(text);
    elem.innerHTML = text;
    elem.id = universal;
    //elem.className = 'text-secondary ';
   // elem.appendChild(node);
    var holder = document.getElementById(infotype);
    holder.appendChild(elem);

    if (elemtype == "subtitle") {
        // styles
        holder.style.fontSize = "large"; // xx-small, x-small, small, medium, large, x-large, xx-large
        holder.style.fontWeight = 'bold';
    } else {
        // styles
        holder.style.fontSize = "medium"; // xx-small, x-small, small, medium, large, x-large, xx-large
    }

    universal++;
}

// creates canvas so graph can be loaded
function canvasMaker(id, name) {
    var holder = document.getElementById(id);
    var x = document.createElement("CANVAS");
    x.id = name;
    holder.appendChild(x);
}

function canvasSafeDelete(name) {
    var element = document.getElementById(name);
    if (element) {
        removeElement(name);
    }
}

function markerClusterSafeDelete() {
    // Unset all markers
    if (markerCluster != null && cluster_points != null) {

        for (var i = 0; i < cluster_points.length; i++) {
            cluster_points[i].setMap(null)
        }
        cluster_points = [];

        // Clears all clusters and markers from the clusterer.
        markerCluster.clearMarkers();
    }
}

// adds 1 list element to temp_list div. Method(3/3) for legend
function listForLegend(text, color) {
    var node = document.createElement("LI");
    var x = document.createElement("SPAN");
    x.setAttribute("style", color);
    node.appendChild(x);
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    var holder = document.getElementById("temp_list");
    holder.appendChild(node);
}

//Creates a temporal div to hold list for PM2,  so it can be deleted. Method(2/3) for legend
function createTempList() {
    var newDiv = document.createElement("div");
    newDiv.id = "temp_list";
    var holder = document.getElementById("legendList");
    holder.appendChild(newDiv);
}

// Method (1/3) for Legend
// title = string && names = string[] && colors = string[]
function legendMaker(title, names, colors) {
    createTempList();
    headerAdder(title, "legend_title");
    for (let i = 0; i < names.length; i++) {
        listForLegend(names[i], colors[i]);
    }
    openLegend();
}
//changes id name from old to new
function idChanger(old, newId) {
    var holder = document.getElementById(old);
    holder.id = newId;
}
function toggleNameChanger() {
    if (currentPM == 5 || currentPM == 7 || currentPM == 9) {
        document.getElementById("toggleName1").innerHTML = "Existing Stations";
        document.getElementById("toggleName2").innerHTML = "Planned Stations";
    } else if (currentPM == 6 || currentPM == 8 || currentPM == 10) {
        document.getElementById("toggleName1").innerHTML = "Existing Bikeways";
        document.getElementById("toggleName2").innerHTML = "All bikeways";
    }
}

function toggleRadio(state) {
    if (state == "on") {
        document.getElementById("radioH").style.visibility = "visible";
    } else if (state == "off") {
        document.getElementById("radioH").style.visibility = "hidden";
    }

}

// adds the pm title
function headerAdder(text, holderTitle) {
    var x = document.createElement("HEADER");
    var y;
    x.setAttribute("id", universal);
    x.className = 'text-dark justify-content-center font-weight-bold';
    document.body.appendChild(x);
    var holder = document.getElementById(holderTitle);
    if (holderTitle == "legend_title") {
        y = document.createElement("H5");
        if (detectmob() == true) {
            y = document.createElement("H7");
        }
        x.className = 'text-dark justify-content-center font-weight-bold';
        y.id = "temp_title"
    }
    else {
        y = document.createElement("H4");
        y.id = universal;
    }
    var t = document.createTextNode(text);
    y.className = 'text-dark justify-content-center font-weight-bold';
    y.appendChild(t);

    holder.appendChild(y);

    // styles
    holder.style.textAlign = "center";

    universal++;
}


function toggleHide() {
    document.getElementById("ToggleHolder").style.display = "none";
    // toggleIdRestore();
    toggleOn = false;
}

function togglevisible() {
    document.getElementById("ToggleHolder").style.display = "inline";
    toggleNameChanger();
    toggleOn = true;
}

// detects if user is on mobile
function detectmob() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

//helper method for word fix
function upperCaseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//helper method for word fix
function lowerCaseAllWordsExceptFirstLetters(string) {
    return string.replace(/\w\S*/g, function (word) {
        return word.charAt(0) + word.slice(1).toLowerCase();
    });
}
// returns a string with 1st letter Uppercase Only
function wordFix(string) {
    return upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(string));
}
function toggleVisibilityCorr(mode) {
    var x = document.getElementById("dropdownMenuButton");

    if (mode == "on") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}


//translates buffertext to readable corridor
function translateCorridor(corridors_selected) {
    let corr = "";
    if (corridors_selected == "alameda_buffer") corr = 'ALAMEDA';
    else if (corridors_selected == "doniphan_buffer") corr = 'DONIPHAN';
    else if (corridors_selected == "dyer_buffer") corr = 'DYER';
    else if (corridors_selected == "horizon_buffer") corr = 'HORIZON';
    else if (corridors_selected == "mesa_buffer") corr = 'MESA';
    else if (corridors_selected == "montana_buffer") corr = 'MONTANA';
    else if (corridors_selected == "montwood_buffer") corr = 'MONTWOOD';
    else if (corridors_selected == "yarbrough_buffer") corr = 'YARBROUGH';
    else if (corridors_selected == "zaragoza_buffer") corr = 'ZARAGOZA';
    else if (corridors_selected == "socorro_buffer") corr = 'SOCORRO';
    else if (corridors_selected == "mcnutt_buffer") corr = 'MCNUTT';
    else if (corridors_selected == "eastlake_buffer") corr = 'EASTLAKE';
    else if (corridors_selected == "artcraft_buffer") corr = 'Artcraft/Domenici';
    return corr;
}

function resetRadioBtn(GroupName) {
  var ele = document.getElementsByName(GroupName);
	for(var i=0;i<ele.length;i++){
		if(i ==0)
			ele[i].checked = true; // Leave element 0 on since its default
		else 
			ele[i].checked = false;
	}  
}

// displays loading animation
function displaySpinner() {
    toggleElements("on", "spinner");
	toggleHide();
    toggleElements("off", "rad1");
    toggleElements("off", "rad2");
    toggleElements("off", "rad3");
    toggleElements("off", "dropdownMenuButton");
    document.getElementById("summary-title").className = "";
    document.getElementById("analysis-title").className = "";
    document.getElementById("data-title").className = "";
    document.getElementById("calc-title").className = "";
}
//turns off loading animation
function turnOffSpinner() {
    toggleElements("off", "spinner");
    toggleElements("on", "rad1");
    toggleElements("on", "rad2");
    toggleElements("on", "rad3");
    toggleElements("on", "dropdownMenuButton");
    document.getElementById("summary-title").className = "border-top border-dark";
    document.getElementById("analysis-title").className = "border-top border-dark";
    document.getElementById("data-title").className = "border-top border-dark";
    document.getElementById("calc-title").className = "border-top border-dark";
}
//aids in stopping possible bugs due to messing with the visibility of borders and other elements
function resetViewsBeforeSpinner() {
    turnOffSpinner();
    toggleElements("off", "dropdownMenuButton"); //this stops a bug of making button appear
}

//turns on and off any element. In order to work you must go to index and on desired element add style="display: block;"
function toggleElements(mode, element) {
    var x = document.getElementById(element);

    if (mode == "on") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function commafy(num) {
    var str = num.toString().split('.');
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 4) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}

