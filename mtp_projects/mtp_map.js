/*jshint
   esversion: 6,
   quotmark: single,
   varstmt: true,
   trailingcomma: true,
   regexpu: true,
   eqeqeq: true,
   curly: true
*/
/*
after you can get the data from the current project
you will need ot create a new component for the mtp project.
the component type depends on the value of the "to" field. if it is null
you;ll create a point if it has data you'll need ot create a path components
else you will need to create a normal component.
*/
/*
Approach to the design
the system will retrieve teh name, mpo id, csj id, the description, an the shape
(if any) and put it in a list.
 for each I gotta determine if it is a point, a path or a project that has no
 actual position.

 for all the component ill need to crate a dialog box that will be attached to
 the marker or line if no marker exist the marker will appear inside a modal.

 for the visual components there will be a little object named "component" that
 will vary depending if it is a path or a point
 */

let components = [];

const thin_path = 5;
const thick_path = 6;
const normal_color = '#0047AB';
const highlight_color = '#FF0000A0';

/*Start Here --------------------------------------------------------*/
function mtpMaps() {
  get_map_data();

}

let mtp_comp = function(info) {

  this.info_window = this.project_info(info);
  this.id = info.key_id; //used to identify with the buttons.
};

mtp_comp.prototype.project_info = function(info) {
  //info requires a name, description, mpo id, and a csj id.
  let infowincontent = document.createElement('div');
  infowincontent.class = 'containter';
  infowincontent.innerHTML = `
  <div class="container-fluid">
    <div class="row bg-info">
      <div class="col-sm-8  text-center text-black-85" ><h6>${info.name}</h6></div>
      <div class="col-4 text-center text-black-85">
        <small>MPO | <b>${info.mpo_id}</b> <br />
        CSJ | <b>${info.csj}</b></small>
      </div>
    </div>

    <div class="row text-center" >
      <div class="col-sm-12"><h6>DESCRIPTION</h6></div>
    </div>

    <div class="row">
      <div class="col-xs-12"><p>${info.description}</p></div>
    </div>
  </div>
  `;
  return infowincontent;
};

mtp_comp.prototype.place_info_window = function() {
  //here is for the other classes to do.
  //probably ill make a small modal for it.
};

//subclass for when a project is a path.
let mtp_comp_path = function(info, path) {
  mtp_comp.call(this, info);
  this.id = 'L_' + this.id;
  this.info_window = this.createProjectInfoWindow(this.info_window);
  //this.path = this.createLine(path);
  //this.path.setMap(map);
};
//inheritance requirements
mtp_comp_path.prototype = Object.create(mtp_comp.prototype);
mtp_comp_path.prototype.constructor = mtp_comp;


mtp_comp_path.prototype.createLine = function(path) {
  return new google.maps.Polyline({
    path: path,
    strokeColor: normal_color,
    strokeOpacity: 1.0,
    strokeWeight: thin_path,
    id: this.id,
  });
};

mtp_comp_path.prototype.set_component_handlers = function() {
  //console.log(`${components[this.id].id} === ${this.id}??`);
  components[this.id].path.addListener('mouseover', this.over_path);
  components[this.id].path.addListener('mouseout', this.out_path);
  components[this.id].path.addListener('click', this.open_info);
};

mtp_comp_path.prototype.open_info = function() {
  let location = this.getPath().getAt(0).toJSON();
  //console.log(location);
  components[this.id].info_window.setPosition(location);
  components[this.id].info_window.open(map);
};

mtp_comp_path.prototype.out_path = function() {
  this.setOptions({
    strokeWeight: thin_path,
    strokeColor: normal_color,
  });
};

mtp_comp_path.prototype.over_path = function() {
  this.setOptions({
    strokeWeight: thick_path,
    strokeColor: highlight_color,
  });
};

mtp_comp_path.prototype.clean = function() {
  components[this.id].path.setMap(null);
};

mtp_comp_path.prototype.createProjectInfoWindow = function(info) {
  let content = info;
  let infoWindow = new google.maps.InfoWindow({
    content: content,
    maxWidth: 360,
  });
  return infoWindow;
};

//subclass for when a project is composed of segmented lines---------------

/*This os class instead of  being a continuos lines it will be segmented
but will behave as a single unit. the difference being how it get highlighted
and how it render the info  window
if it get highlighted multiple lines(its connected lines will be highlighted
if you click on one of the segments the info_window will will appear on that segment.*/
let mtp_comp_segmented = function(info, paths) {
  mtp_comp_path.call(this, info);
  this.id = 'S' + this.id; //signifies splitted.
  this.path = paths;

  for (let i in this.path) { //format everything to be lines.
    //console.log(this.path[i]);
    //  console.log(this.path[i]);
    let segment = this.createLine(this.path[i]);
    this.path[i] = segment;
  }
  for (let i in this.path) {
    this.path[i].setMap(map);
  }

};

//inheritance requirements
mtp_comp_segmented.prototype = Object.create(mtp_comp_path.prototype);
mtp_comp_segmented.prototype.constructor = mtp_comp_path;

mtp_comp_segmented.prototype.set_component_handlers = function() {
  for (let i in components[this.id].path) {
    components[this.id].path[i].addListener('mouseover', this.over_path);
    components[this.id].path[i].addListener('mouseout', this.out_path);
    components[this.id].path[i].addListener('click', this.open_info);
  }

};

mtp_comp_segmented.prototype.open_info = function() {
  let location = this.getPath().getAt(0).toJSON();
  //console.log(location);
  components[this.id].info_window.setPosition(location);
  components[this.id].info_window.open(map);
};

mtp_comp_segmented.prototype.out_path = function() {
  for (let seg in components[this.id].path) {
    components[this.id].path[seg].setOptions({
      strokeWeight: thin_path,
      strokeColor: normal_color,
    });
  }

};

mtp_comp_segmented.prototype.over_path = function() {
  for (let seg in components[this.id].path) {
    components[this.id].path[seg].setOptions({
      strokeWeight: thick_path,
      strokeColor: highlight_color,
    });
  }
};

mtp_comp_segmented.prototype.clean = function() {
  for (let seg in components[this.id].path) {
    components[this.id].path[seg].setMap(null);
  }
};

//subclass for when a project is a point.-------------------------------------
let mtp_comp_point = function(info, point) {
  mtp_comp.call(this, info);
  this.id = 'P_' + this.id;
  this.mpo_id = info.mpo_id;
  this.info_window = this.createProjectInfoWindow(this.info_window);
  this.marker = this.createPoint(point);
  this.marker.setMap(map);
};

//inheritance requirements
mtp_comp_point.prototype = Object.create(mtp_comp.prototype);
mtp_comp_point.prototype.constructor = mtp_comp;

let image = "./img/markers/red.png";
mtp_comp_point.prototype.createPoint = function(point) {
  return new google.maps.Marker({
    position: point,
    id: this.id,
    mpo_id: this.mpo_id,
    icon: image
  });

};

/* do not put the functions inside here. They were taken out because of
reference issues*/
mtp_comp_point.prototype.set_component_handlers = function() {
  components[this.id].marker.addListener('click', this.open_info);
  components[this.id].marker.addListener('mouseover', this.animate_marker);
  components[this.id].marker.addListener('mouseout', this.deanimate_marker);

};

mtp_comp_point.prototype.open_info = function() {
  components[this.id].info_window.open(map, this);
};

mtp_comp_point.prototype.animate_marker = function() {
    let target_mpo = components[this.id].marker.mpo_id;
    Object.keys(components).forEach(id=>{
      try {
        if (target_mpo === components[id].marker.mpo_id) {
            components[id].marker.setAnimation(google.maps.Animation.BOUNCE);
        }
      } catch (err) {

      }
    });
};

mtp_comp_point.prototype.deanimate_marker = function() {
    let target_mpo = components[this.id].marker.mpo_id;
    //* alternate version. this will only turn off animation when yo hover over the marker.
//    //components[this.id].marker.setAnimation(null);

    Object.keys(components).forEach(id => {
       // // console.log(id);
        try {
            if (target_mpo === components[id].marker.mpo_id) {
                components[id].marker.setAnimation(null);
            }
        } catch (err) {}
    });
   
};

mtp_comp_point.prototype.clean = function() {
  components[this.id].marker.setMap(null);
};

mtp_comp_point.prototype.createProjectInfoWindow = function(info) {
  let content = info;
  let infoWindow = new google.maps.InfoWindow({
    content: content,
    maxWidth: 360,
  });
  return infoWindow;
};
/*----------------------------------------------------------------------------*/
//this class is for creating components which have no physical location on a map.

let mtp_comp_no_map = function(info) {
  mtp_comp.call(this, info);
  this.id = 'M_' + this.id;
  this.info_window = this.createProjectInfoWindow(this.info_window);
};
//inheritance requirements
mtp_comp_no_map.prototype = Object.create(mtp_comp.prototype);
mtp_comp_no_map.prototype.constructor = mtp_comp;

mtp_comp_no_map.prototype.createProjectInfoWindow = function(info) {
  let window = document.createElement('DIV');
  //window.style.padding = '3%';

  let close_div = document.createElement('DIV');
  close_div.id = 'close-id';
  close_div.className = 'text-right';
  close_div.style.height = '15px';
  close_div.style.padding = 'unset';
  close_div.innerHTML = `<a style= "font-size: 20px; color: #666"
                            href="javascript:void(0)"
                            onclick="document.getElementById('mtp_no_map').innerHTML = '';">&times;</a>`;

  let container = document.createElement('DIV');
  container.className = 'container';
  container.appendChild(info);
  let footer = document.createElement('DIV');
  footer.style.fontWeight = 'bold';
  footer.className = 'text-right';
  footer.innerHTML = 'NOT in a physical location*';

  window.appendChild(close_div);
  window.appendChild(container);
  window.appendChild(footer);
  return window;
};

mtp_comp_no_map.prototype.clean = function() {
  //remove the info Windows
};
/*----------------------------------------------------------------------------*/

function point_geojson_formatter(data) {
  return {
    lat: parseFloat(data[0].x),
    lng: parseFloat(data[0].y),
  };
}

function line_geojson_formatter(data) {
  let res = [];
  let shape = data.points.coordinates; //reduced to the array of points.
  for (let point in shape) {
    //console.log(point);
    let formatted_point = {
      lat: parseFloat(shape[point].x),
      lng: parseFloat(shape[point].y),
    };
    //console.log(formatted_point);
    res.push(formatted_point);
  }
  return res;
}

function polyline_geojson_formatter(data, type) {
  let res = [];
  let shape = data.geometries; // reduce to a array of linestrings.
  //console.log(shape);
  for (let item in shape) {
    let segment = line_geojson_formatter(shape[item]);
    //  console.log(segment);
    res.push(segment);
  }
  if (type.toUpperCase() === 'SPLIT') {
    //all the lines as a single line
    return res;
  } else if (type.toUpperCase() === 'CONTINUOUS') {
    //all the lines as an array of lines.
    return res.flat(1);
  }

}

function get_map_data() {
  $.get('./mtp_projects/mtp_map_handler.php', function(data) {
    let reader = new jsts.io.WKTReader();
    for (let item in data) {
      //console.log(data[item].shape);
      let info = {
        key_id: data[item].key_id,
        name: data[item].name,
        description: data[item].description,
        mpo_id: data[item].mpo_id,
        csj: data[item].csj,
      };

      if (typeof data[item].line_type !== 'undefined') {
        ////console.log(data[item].line_type);
      }

      if (typeof data[item].shape !== 'undefined') { //if is a no-map component
        let shape = reader.read(data[item].shape);
        if (typeof data[item].line_type !== 'undefined') { // segmentation CHECKER
          component_factory(info, shape, data[item].line_type);
        } else {
          component_factory(info, shape);
        }
      } else {
        let component = new mtp_comp_no_map(info);
        //console.log(component);
        components[component.id] = component;
        //console.log(`this has no map Location ${info.key_id}`);
        //component.set_component_handlers();
        /* there are no handler because they are not internal They are supposed
        to be triggered with table clicks.*/
      }

    }
  }, 'json');
}

function component_factory(info, shape, type = '') {
  if ('coordinates' in shape) { //POINT
    shape = shape.coordinates.coordinates; //remove the nested data
    to_visualize = point_geojson_formatter(shape);
    let component = new mtp_comp_point(info, to_visualize);
    components[component.id] = component;
    components[component.id].set_component_handlers();

  } else if ('geometries' in shape) { //MULTILINESTRING
    to_visualize = polyline_geojson_formatter(shape, type);
    /*for (let i in to_visualize) {
      let component = new mtp_comp_path(info, to_visualize[i]);
      components[component.id] = component;
      component.set_component_handlers();
    }
    */
    //to_visualize = to_visualize[0];
    if (type.toUpperCase() === 'SPLIT') {
      let component = new mtp_comp_segmented(info, to_visualize);
      components[component.id] = component;
      ////console.log('id ==='+component.id);
      components[component.id].set_component_handlers();

    } else if (type.toUpperCase() === 'CONTINUOUS') {
      let component = new mtp_comp_path(info, to_visualize);
      component.path = component.createLine(to_visualize);
      component.path.setMap(map);

      components[component.id] = component;
      components[component.id].set_component_handlers();
    }

  } else if ('points' in shape) { // LINESTRING
    to_visualize = line_geojson_formatter(shape);

    let component = new mtp_comp_path(info, to_visualize);
    component.path = component.createLine(to_visualize);
    component.path.setMap(map);

    components[component.id] = component;
    component.set_component_handlers();
  } else {
    console.log('error loading component');
  }
}