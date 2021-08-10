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
you will need ot create a new component for the mtp projeect.
the component type depends on the value of the "to" field. if it is null
you;ll create a point if it has data you'll need ot create a path components
else you will nedd to create a normal compnent.
*/
/*
Approach to the design
the system will retrieve teh name, mpo id, csj id, the description, an the shape
(if any) and put it in a list.
 for each I gotta determine if it is a point, a path or a project that has no
 actual position.

 for all the component ill need to crate a dialog box that will be atteached to
 the marker or line if no marker exist the marker will appear inside a modal.

 for the visual components there will be a little object named "component" that
 will vary depending if it is a path or a point


 Things to do.
 add the animaitons based on mptp-map.js examples
 add the logic for retrieving queries. mtp_visual_handler.php.
 */
let components = {};

const thin_path = 5;
const thick_path = 10;
const normal_color = '#FF8000';
const highlight_color = '#FF0000';

function mtpMaps() {
  get_map_data();

}

let mtp_comp = function(info) {

  this.info_window = this.createProjectInfoWindow(info);
  this.id = info.key_id; //used to identify with the buttons.
};

mtp_comp.prototype.createProjectInfoWindow = function(info) {
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
  <div class="row">
    <div class="col-xs-12"><button type="button" class="text-right btn btn-link btn-xs">More Info.</button></div>
  </div>
  </div>
  `;
  let infoWindow = new google.maps.InfoWindow({
    content: infowincontent,
    maxWidth: 360,
  });
  return infoWindow;
};

mtp_comp.prototype.place_info_window = function() {
  //here is for the other classes to do.
  //probably ill make a small modal for it.
};

//subclasse for when a project is a path.
let mtp_comp_path = function(info, path) {
  mtp_comp.call(this, info);
  this.id = 'L_' + this.id;
  this.path = this.createLine(path);
  this.path.setMap(map);

};
//inheretance requirementsk
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
//subaclass for when a project is a point.-------------------------------------
let mtp_comp_point = function(info, point) {
  mtp_comp.call(this, info);
  this.id = 'P_' + this.id;
  this.marker = this.createPoint(point);
  this.marker.setMap(map);
};

//inheretance requirements
mtp_comp_point.prototype = Object.create(mtp_comp.prototype);
mtp_comp_point.prototype.constructor = mtp_comp;

mtp_comp_point.prototype.createPoint = function(point) {
  return new google.maps.Marker({
    position: point,
    id: this.id,
  });

};

/* do not put the fucntions insde here. They were taken out because of
reference issues*/
mtp_comp_point.prototype.set_component_handlers = function() {
  components[this.id].marker.addListener('click', this.open_info);
};

mtp_comp_point.prototype.open_info = function() {
  components[this.id].info_window.open(map, this);
};

mtp_comp_path.prototype.clean = function() {
  components[this.id].marker.setMap(null);
};

function point_geojson_formatter(data) {
  return {
    lat: parseFloat(data[0].y),
    lng: parseFloat(data[0].x),
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

function polyline_geojson_formatter(data) {
  let res = [];
  let shape = data.geometries; // reduce to a anrry of linestrings
  //console.log(shape);
  for (let item in shape) {
    let segment = line_geojson_formatter(shape[item]);
    //  console.log(segment);
    res.push(segment);
  }
  //all the lines as a single line
  //return res.flat(1);
  //all the lines as an array of lines.
  return res;
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
      let shape = reader.read(data[item].shape);
      //console.log(shape);
      if ('coordinates' in shape) { //POINT
        shape = shape.coordinates.coordinates; //remove the nested data
        to_visualize = point_geojson_formatter(shape);
        let component = new mtp_comp_point(info, to_visualize);
        components[component.id] = component;
        components[component.id].set_component_handlers();


      } else if ('geometries' in shape) { //MULTILINESTRING
        to_visualize = polyline_geojson_formatter(shape);
        /*for (let i in to_visualize) {
          let component = new mtp_comp_path(info, to_visualize[i]);
          components[component.id] = component;
          component.set_component_handlers();
        }
        */
        to_visualize = to_visualize[0];
        let component = new mtp_comp_path(info, to_visualize);
        components[component.id] = component;
        component.set_component_handlers();

      } else if ('points' in shape) { // LINESTRING
        to_visualize = line_geojson_formatter(shape);
        let component = new mtp_comp_path(info, to_visualize);
        components[component.id] = component;
        component.set_component_handlers();
      } else {
        console.log('no location');
      }
    }
  }, 'json');
}