/*jshint esversion: 6*/

//let maps = mtpMaps();

let mtp_project_data = document.createElement('TBODY');
let mtp_table;
$.get('./mtp_projects/mtp_projects_handler.php', function(data) {
    //console.log('this is running');
    mtp_project_data.innerHTML = data;
});
let is_mtp_loaded = false;

function mtpProjects() {
    //refresh
    clean();

    let base_content = document.createElement('DIV');
    base_content.innerHTML = `
  <div id="mtp_no_map"></div>
  <!-- mtp_projects_handler -->
  <div id="mtp" class=" sidenav rounded-left mb-2 bg-light text-dark" ondblclick="openNavMTP()" data-toggle="tooltip" data-placement="left" title="Double click to Open">
    <a href="javascript:void(0)" href="javascript:void(0)" class="closebtn" onclick="closeNavMTP();"><span class="fa fa-times"></span></a>
    <div id="mtp-title" class="row container-fluid">
      <h1 class="col-lg-6 text-center">MTP Projects</h1>
      <button id="locate-project-btn" type="button" class="col-lg-5 btn btn-outline-info btn-lg">Locate</button>
    </div>
    <div id="mtp-content"></div>
  </div>
  `;

    document.getElementById('non-pm-content').appendChild(base_content);

    let sideNav = document.getElementById('mtp-content');
    sideNav.appendChild(create_mtp_table());
    openNavMTP();
}

$('#mtp-projects').click(function() {
    ////console.log("'" + $('#non-pm-content').innerHTML + "'");
    clean();
    if ($('#non-pm-content').is(':empty')) { //*  trigger in clean enviroment.
        console.log('non_pm_content is empty');
        mtpProjects();
        mtpMaps();
        if(mtp_table !== undefined || null){
                console.log('destroyed mtptables');
                mtp_table.destroy();
                mtp_table = mtp_setup_data_table();

        
        }
        if(!is_mtp_loaded){         //* prevents loading the event-handlers more than once.
            ////   console.log("'" + $('#non-pm-content').innerHTML + "'");    
            
            mtp_table = mtp_setup_data_table();
            console.log(mtp_table);
            console.log('load event handlers.');
            

           

            is_mtp_loaded = true;
        }
        $('tbody').on('click', 'tr', function() {
            ////console.log('changing row');
            const size = 50;

            //var text = table.row( this ).data()[1];
            ////console.log(mtp_table.row(this).data());
            for (let i = 1; i <= mtp_table.row(this).data().length - 1; i++) {
                var text = $(this)
                    .children(`td:eq(${i})`)
                    .text();
                if (text.length >= size + 3) {
                    text =
                        mtp_table
                            .row(this)
                            .data()
                            [i].substring(0, size - 1);
                } else {
                    text = mtp_table.row(this).data()[i];
                }

                $(this)
                    .children(`td:eq(${i - 1})`)
                    .text(text);
                mtp_table.cell(this, i).invalidate('dom');
            }
            ////console.log(mtp_table.row(this).data());
        });
        
         $('#locate-project-btn').click(function() {
             console.log('button  locate running');
             closeNavMTP();
             //console.log(mtp_table.rows('.selected').data()[0][0]);
             let id = mtp_table.rows('.selected').data()[0][0]; //used for finding
             ////alert(id);
             if (id.charAt(0) === 'L') {
                 //lines
                 let location = components[id].path
                     .getPath()
                     .getAt(0)
                     .toJSON();
                 components[id].info_window.setPosition(location);
                 components[id].info_window.open(map);
             } else if (id.charAt(0) === 'S') {
                 // split lines.
                 let location = components[id].path[0]
                     .getPath()
                     .getAt(0)
                     .toJSON();
                 components[id].info_window.setPosition(location);
                 components[id].info_window.open(map);
             } else if (id.charAt(0) === 'P') {
                 //points
                 components[id].info_window.open(map, components[id].marker);
             } else if (id.charAt(0) === 'M') {
                 //not in map
                 let target = document.getElementById('mtp_no_map');
                 document.getElementById('sidebar').style.zIndex = 0;
                 target.style.zIndex = 2;
                 target.style.position = 'fixed';
                 target.style.top = '68vh';
                 target.style.left = '50vw';
                 target.style.width = '360px';
                 target.style.backgroundColor = 'white';
                 target.style.borderRadius = '2%';
                 target.style.boxShadow = '1px 2px 10px gray';

                 dragElement(target);
                 target.appendChild(components[id].info_window);
             }
         });
                
    } else {
        openNavMTP();
        if (typeof components === 'undefined'|| 'null') { //* in case the content was deleted.
            mtpMaps();
        }
    }
});

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (document.getElementById(elmnt.id + 'header')) {
        // if present, the header is where you move the DIV from:
        document.getElementById(
            elmnt.id + 'header',
        ).onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
        elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function openNavMTP() {
    let nav = document.getElementById('mtp');
    nav.className = 'sidenav rounded-left mb-2 bg-light text-dark';
    // resizing for the table
    $(nav).tooltip('disable');
    $(nav).css('overflow-y', 'hidden');
    nav.style.height = '40vh';
    $(nav).css('margin-top', '');
    $(nav).css('top', '60vh');

    nav.style.width = '100%';
    nav.style.zIndex = 1;
    document.getElementById('sidebar').style.zIndex = 0;
    //nav.style.height = "30%";
}

function closeNavMTP() {
    let nav = document.getElementById('mtp');
    // document.getElementById("mySidenav").style.width = "0%";
    nav.style.width = '1%';
    nav.style.height = '2%';
    nav.style.overflow = 'hidden';
    nav.className = 'sidenav rounded-left mb-2 bg-info text-dark';
    $(nav).tooltip('enable');

    //removeAllElementsBar(); // destroy everything when closing bar
}

function create_mtp_table() {
    let table = document.createElement('TABLE');
    table.className = 'mtp-table table ';
    //table.id = 'whatever';

    let head = document.createElement('THEAD');
    let foot = document.createElement('TFOOT');
    //let body = document.createElement('TBODY');
    let body = mtp_project_data;
    let headerTitles = [
        'unique_id',
        'Project ID',
        'CSJ',
        'Project Name',
        'Project Mode',
        'Functional Class',
        'CMP Strategy',
        'From',
        'To',
        'City Area',
        'Network Year',
        'Total Project Cost',
        'Sponsor',
        'YOE',
    ];
    let headerRow = document.createElement('TR');

    headerTitles.forEach(function(header) {
        let headerData = document.createElement('TH');
        headerData.innerHTML = header;
        headerRow.appendChild(headerData);
    });
    head.appendChild(headerRow);
    table.appendChild(head);
    //$.get('./mtp_projects/mtp_projects_handler.php', function(data) {
    //  console.log('this is running');
    //  console.table(data);
    //  body.innerHTML = data;
    //});
    table.appendChild(body);
    table.appendChild(foot);
    return table;
}

function mtp_setup_data_table(){
     //console.log('table before setup');
     let  mtp_table = $('.mtp-table').DataTable({
        dom:
            "<'row'<'col-sm-12 text-left'f>>" + "<'row'<'col-sm-12't>>", // +
        //"<'row'<'col-sm-5'i>>",

        width: '100vw',
        select: {
            style: 'single',
        },
        scrollY: '32vh',
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        //fixedHeader: true,
        //responsive: true,
        fixedColumns: true,
        columnDefs: [
            {
                targets: '_all',
                //render: $.fn.dataTable.render.ellipsis(50, true)
                render: function(data, type, row) {
                    if (type === 'display') {
                        let renderedData = $.fn.dataTable.render.ellipsis(
                            50,
                            true,
                        )(data, type, row);
                        return renderedData;
                    }
                    return data;
                },
            },
        ],
    });

    mtp_table.column(0).visible(false);
    return mtp_table;
}
