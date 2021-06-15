function data(found) {
    let data = {
    };

    clean(); 

    toggleSpinner('on');
    toggleRadio('off');
    toggleHolderSwitch('off');
    toggleVisibilityCorr('off');
    toggleNav('off');
    toggleMap('on');
    
    if (found == "NPM1-Fatalities") {
        //canvasMaker('chart1', 'myChart');
        //var ctx = document.getElementById('myChart').getContext('2d');
        //chart_pm26(ctx, data);
    
        openNav();
        headerAdder("Fatalities", "title");
    }
}

