// Code by Sergio

/**
 * 5/5/2020 Update
 * Clients want to change lines to points so code was modified to read points
 * - B
 */

/*jshint
    esversion: 6,
    quotmark: single,
    varstmt: true,
    trailingcomma: true,
    regexpu: true,
    eqeqeq: true,
    curly: true

*/ //contains all the data about the repositories and the gui assets.
let repos;

function data_repo() {
    load_repo_modal();
    //get the buttons JSON file
    $.getJSON('data_repository/repo.json', data => {
        repos = data;
    });

    // set the modal into the container div,
    let list = document.getElementById('repo-list');
    let legend = document.getElementById('repo-legend');
    let disclaimer = document.getElementById('repo-disclaimer');
    let description = document.getElementById('repo-description');

    if (list.innerHTML === '') {
        //prevent duplicate loading.
        try {
            load_repo_list(list, Object.keys(repos.buttons));
        } catch (TypeError) {
            setTimeout(function() {
                load_repo_list(list, Object.keys(repos.buttons));
            }, 10000);
        }
        //load_legend(legend, description,'btn');
        load_disclaimer(disclaimer);
    }
}

function change_repo_info(btn_name) {
    //delete description & legend
    let description = document.getElementById('repo-description');
    description.innerHTML = '';

    let new_description = document.createElement('P');
    new_description.className = 'col-lg-12 text-secondary';
    new_description.innerHTML = repos.buttons[btn_name].description;
    $(description).append(new_description);

    let legend = document.getElementById('repo-legend');
    legend.innerHTML = '';
}

function load_legend(location, description, btn_name) {
    let legend = repos.buttons[btn_name].legend;
    // load the legend keys
    for (let i in legend) {
        //let l = document.createElement('P').outerHTML = `<p class="col-lg-4"> <span style="color: ${legend[i].color};font-size: 3em;">■</span>${legend[i].name}</p>`;
        let l = document.createElement('P');
        l.className = 'col-lg-4 text-secondary font-weight-bold';
        let box = document.createElement('SPAN');
        box.innerHTML = '■';
        box.style.color = legend[i].color;
        box.style.fontSize = '3em';
        let name = document.createElement('SPAN');
        name.innerHTML = legend[i].name;
        $(l).append(box, name);
        $(location).append(l);
    }
}

function load_repo_list(location, btn_names) {
    for (let btn in btn_names) {
        let name = btn_names[btn];
        let col_container = document.createElement('DIV');
        col_container.className = 'col-lg-3 d-flex justify-content-center';
        let button = document.createElement('BUTTON');
        button.className = 'btn btn-info';
        button.innerHTML = name;
        button.setAttribute('value', name);
        button.addEventListener('click', () => {
            get_repo_data(name);
        });
        button.addEventListener('mouseover', () => {
            change_repo_info(name);
        });
        ////let button = document.createElement('BUTTON').outerHTML = `<button class=" col-lg-offset-1 btn btn-info" onmouseover="change_repo_info('${name}');" onclick="get_repo_data();" value="${name}">${name}</button>`;
        $(col_container).append(button);
        $(location).append(col_container);
    }
}

function load_disclaimer(location) {
    let disclaimer = document.createElement('P');
    disclaimer.className = 'text-right col-lg-12 text-secondary';

    disclaimer.innerHTML =
        'Agencies interested in providing additional data for the Regional Data Repository,<br/>please contact <i>Sonia Perez</i> at <b>sperez@elpasompo.org</b>.';
    $(location).append(disclaimer);

}

// get db data
$.get('./data_repository/repo_handler.php', function(data) {
    //// mtp_project_data.innerHTML = data;
});

function load_repo_modal() {
    //refresh
    clean();
    toggleNav('off'); // removes PM side nav If left open
    let base_content = document.createElement('DIV');
    base_content.innerHTML = `
        <div id="data-repo" class="modal fade in" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title justify-content-center text-primary">Regional Data Repository</h4>
                        <button type="button"class="close" data-dismiss="modal"> <i class="fa fa-times"></i> </button>
                    </div>
                    <div class="modal-body">
                        <div class="row d-flex justify-content-center" id="repo-list"></div>
                        <div class="row" id="repo-description"></div>
                        <div class="row" id="repo-legend"></div>
                        <div class="row" id="repo-disclaimer"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>  
            </div>
        </div>`;

    document.getElementById('non-pm-content').appendChild(base_content);
}

// Draw Shapes
function get_repo_data(btn_name) {
    currentPM = 0;
    currentType = "repo"; // used on legendOpen()
    regionalDataRepoLegend();
    $.get(
        './data_repository/repo_handler.php',
        function(data) {
            let reader = new jsts.io.WKTReader();

            let ranges = []; 
            let colors = [];

            repos.buttons[btn_name].legend.forEach(cat =>{
                ranges.push(cat.value);
                colors.push(cat.color);
            });

            let holder = [];
            let to_visualize;
            let image = "./img/markers/red.png";
            let x =0;
            let y =0; 
            for (let item in data) {
                let shape = reader.read(data[item].shape);
                x=shape.coordinates.coordinates[0].x;
                y=shape.coordinates.coordinates[0].y;
   
                to_visualize = { lat: parseFloat(y), lng: parseFloat(x) };
                f2017_adt = parseInt(data[item].f2017_adt);
                console.log(f2017_adt);
                //filter color
                if(f2017_adt == 0){
                    image = "./img/markers/grey.png";
                }else if(f2017_adt > 0 && f2017_adt <= 4270){
                    image = "./icons/small_green_pin.png";
                }else if(f2017_adt > 4270 && f2017_adt <= 13160){
                    image = "./icons/small_blue_pin.png";
                }else if(f2017_adt > 13160 && f2017_adt <= 24550){
                    image = "./icons/small_orange_pin.png";
                }else if(f2017_adt > 24550 && f2017_adt <= 53680){
                    image = "./img/markers/red.png";
                }
                let point = new google.maps.Marker({
                    position: to_visualize,
                    title: f2017_adt.toString(),
                   // value: '',
                    icon: image
                });
                
                // draw by 1 type at a time
                point.setMap(map);
                points.push(point);
                
                /*
                5/15/2020
                This is the Original code
                I commented this because know we need to display points 
                - B 


                let cur = parseInt(data[item].factored_c,10);

                if (cur == ranges[0]) { //*logic for setting the color
                    // //console.log('value 0');
                    color = colors[0];
                }else if(cur > ranges[0] && cur <= ranges[1]) {
                   // // console.log('value 1');
                    color = colors[1];   
                } else if (cur > ranges[1] && cur <= ranges[2]) {
                //   // console.log('value 2');
                    color = colors[2];
                } else if (cur > ranges[2] && cur <= ranges[3]) {
                   console.log('value 3');
                    color = color[3];
                } else if (cur > ranges[3] && cur <= ranges[4]) {
                    ////console.log('value 4');
                    color = colors[4];
                }else{console.log('black');}
                
                //console.log(shape);
                if ('points' in shape) {
                    // LINESTRING

                    to_visualize = line_geojson_formatter(shape);
                    let component = new google.maps.Polyline({ //* create line
                        path: to_visualize,
                        strokeColor: color,
                        strokeOpacity: 0.6,
                        strokeWeight: 3,
                    });
                    // Hover Effect for Google API Polygons
                    google.maps.event.addListener(component, 'mouseover', function (event) { injectTooltip(event, cur); });
                    google.maps.event.addListener(component, 'mousemove', function (event) { moveTooltip(event); });
                    google.maps.event.addListener(component, 'mouseout', function (event) { deleteTooltip(event); });
                    //components[component.id] = component;
                    component.setMap(map);
                    polygons.push(component);
                 } else if('geometries' in shape){ //*fixes line bugs. 
                    to_visualize = polyline_geojson_formatter(shape, 'split'); 
                    for (let i in to_visualize) {
                       let component = new google.maps.Polyline({
                            //* create line
                            path: to_visualize[i],
                            strokeColor: color,
                            strokeOpacity: 0.6,
                            strokeWeight: 3,
                        });

                                     // Hover Effect for Google API Polygons
                    google.maps.event.addListener(component, 'mouseover', function (event) { injectTooltip(event, cur); });
                    google.maps.event.addListener(component, 'mousemove', function (event) { moveTooltip(event); });
                    google.maps.event.addListener(component, 'mouseout', function (event) { deleteTooltip(event); });
                        component.setMap(map);
                        polygons.push(component);
                    }
                } else {
                    console.log('no location');
                }*/
            }
        },
        'json',
    );
}

$('#data-repository').click(() => {
    data_repo();
});


function regionalDataRepoLegend() {
    names = ['No data', '< 4,270 vehicles', '4,271 to 13,160 vehicles', '13,161 to 24,550 vehicles', '24,551 to 53,680 vehicles'];
    colors = ['background:#9E9E9E;', 'background:#8BC34A;', 'background:#3F51B5;', 'background:#FF9800;', 'background:#f44336'];
    legendMaker("2017 Traffic Counts", names, colors);
}