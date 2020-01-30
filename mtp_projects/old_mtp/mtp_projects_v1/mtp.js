/*jshint esversion: 6*/


//let maps = mtpMaps();

let mtp_project_data = document.createElement("TBODY");

$.get('./mtp_projects/mtp_projects_handler.php', function(data) {
  //console.log('this is running');
  mtp_project_data.innerHTML = data;
});


function mtpProjects() {
  //refresh
  clean();
  //headerAdder('MTP Projects', 'title');
  //add a title to the table
  let sideNav = document.getElementById("mtp-content");
  sideNav.appendChild(create_mtp_table());
  openNavMTP();
}

$("#mtp-projects").click(function() {
  if ($('#mtp-content').is(':empty')) {
    mtpProjects();
    //console.log('table before setup');
    let mtp_table = $('.mtp-table').DataTable({
      "dom": "<'row'<'col-sm-12 text-right'f>>" +
        "<'row'<'col-sm-12't>>" +
        "<'row'<'col-sm-5'i>>",

      "width": '100 %',
      "select": true,
      "scrollY": "300px",
      "scrollX": false,
      scrollCollapse: true,
      paging: false,
      fixedHeader: true,
      columnDefs: [{
        targets: '_all',
        render: $.fn.dataTable.render.ellipsis(50, true)
      }],

    });


    //console.log('table set up');
    mtp_table.column(0).visible(false);
    $('#mtp-table tbody').on('click', 'tr', function() {
      if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');

      } else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');

      }
    });

    $('#locate-project-btn').click(function() {
      //console.log('button pressed');
      closeNavMTP();
      console.log(mtp_table.rows('.selected').data()[0][0]);
      let id = mtp_table.rows('.selected').data()[0][0]; //used for finding
      //console.table(components);
      console.log(id);
      if (id.charAt(0) === 'L') {
        let location = components[id].path.getPath().getAt(0).toJSON();
        components[id].info_window.setPosition(location);
        components[id].info_window.open(map);
      } else if (id.charAt(0) === 'P') {
        components[id].info_window.open(map, components[id].marker);
      }

    });
    mtpMaps();
  } else {
    openNavMTP();
  }
});

function openNavMTP() {

  let nav = document.getElementById("mtp");
  nav.className = "sidenav rounded-left mb-2 bg-light text-dark";
  // resizing for the table
  $(nav).tooltip('disable');
  $(nav).css('overflow', '');
  //nav.style.overflow = "visible";
  nav.style.height = "50%";
  $(nav).css('margin-top', '');
  $(nav).css('top', '50%');

  nav.style.width = "100%";
  //nav.style.marginTop = "20%";
  nav.style.zIndex = 1;
  document.getElementById('sidebar').style.zIndex = 0;
  //nav.style.height = "30%";

}

function closeNavMTP() {
  let nav = document.getElementById("mtp");
  // document.getElementById("mySidenav").style.width = "0%";
  nav.style.width = "1%";
  nav.style.height = "2%";
  nav.style.overflow = "hidden";
  nav.className = "sidenav rounded-left mb-2 bg-info text-dark";
  $(nav).tooltip('enable');


  //removeAllElementsBar(); // destroy everything when closing bar

}



function create_mtp_table() {
  let table = document.createElement("TABLE");
  table.className = "mtp-table table ";
  //table.id = 'whatever';

  let head = document.createElement("THEAD");
  let foot = document.createElement("TFOOT");
  //let body = document.createElement('TBODY');
  let body = mtp_project_data;
  let headerTitles = ["unique_id", "Project ID", "CSJ", "Project Name",
    "Project Mode", "Functional Class", "CMP Strategy",
    "From", "To", "City Area", "Network Year",
    "Total Project Cost", "Sponsor", "YOE"
  ];
  let headerRow = document.createElement("TR");

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

function readMore(elem) {
  let moreText = document.getElementsByClassName('more');
  let btnText = document.getElementsByClassName('read_more');
  /*(elem.childNodes.forEach(function(child) {

    if (child.className === "more") {
      let moreText = child;
    } else if (child.className === 'read-more') {
      let btnText = child;
    }
  });
*/
  if (moreText.style.display === 'none') {
    btnText.innerHTML = "...Read more";
    moreText.style.display = "none";
  } else {
    btnText.innerHTML = "Read less...";
  }
}