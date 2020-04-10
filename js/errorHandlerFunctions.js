
function pm_error_handler(mode, ex) {
    toggleSpinner('off');
    if (mode == 4) {
        alert("Please select a smaller Area of Interest");
        deleteUserShapes();
    } else if (mode == 2) {
        let corr = translateCorridor(ex); // what corridor are we on?
        clean();
        alert("The " + wordFix(corr) + " corridor is not available for this performance");
    } else {
        clean();
        console.log(error);
        alert("Error Fetching Data \nPlease Contact Sonia Perez \nsperez@elpasompo.org");
    }
}
function corridor_AOI_error_handler(ex) {
    toggleSpinner('off');
    if (mode == 4) {
        alert("Please select a smaller Area of Interest");
        deleteUserShapes();
    } else if (mode == 2) {
        clean();
        let corr = translateCorridor(ex); // what corridor are we on?
        alert("The " + wordFix(corr) + " corridor is not available for this performance");
      
    }
}