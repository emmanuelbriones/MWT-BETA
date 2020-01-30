/*jshint
   esversion: 6,
   quotmark: single,
   varstmt: true,
   trailingcomma: true,
   regexpu: true,
   eqeqeq: true,
   curly: true
*/

function benchmark() {

  let target = document.getElementById('non-pm-content');

  target.innerHTML = `
  <!-- benchmark_handler -->
  <div id="benchmark" class=" sidenav rounded-left mb-2 bg-light text-dark" ondblclick="openNavBenchmark();" data-toggle="tooltip" data-placement="left" title="Double click to Open">
    <a href="javascript:void(0)" href="javascript:void(0)" class="closebtn" onclick="closeNavBenchmark();">&times;</a>
    <div id="benchmark-content"></div>
  </div>
  `;

  let content = document.createElement('DIV');
  content.className = 'container';
  content.innerHTML = `
      <div class="jumbotron">
          <div class="card">
              <div class="card-header">
                  Featured
              </div>
              <div class="card-body">
                  <table class="table table-striped table-hover table-bordered ">
                      <thead>

                          <tr>

                              <th scope="col-3">Performance Measures</th>

                              <th scope="col">
                                  <div class="dropdown">
                                      <button class="btn btn-secondary dropdown-toggle" type="button"
                                          id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                          aria-expanded="false">
                                          Dropdown button
                                      </button>
                                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                          <a class="dropdown-item" href="#">Alameda</a>
                                          <a class="dropdown-item" href="#">Doniphan</a>
                                          <a class="dropdown-item" href="#">Dyer</a>
                                          <a class="dropdown-item" href="#">Horizon</a>
                                          <a class="dropdown-item" href="#">Mesa</a>
                                          <a class="dropdown-item" href="#">Montana</a>
                                      </div>
                                  </div>
                              </th>

                              <th scope="col">
                                  <div class="dropdown">
                                      <button class="btn btn-secondary dropdown-toggle" type="button"
                                          id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                          aria-expanded="false">
                                          Dropdown button
                                      </button>
                                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                          <a class="dropdown-item" href="#">Alameda</a>
                                          <a class="dropdown-item" href="#">Doniphan</a>
                                          <a class="dropdown-item" href="#">Dyer</a>
                                          <a class="dropdown-item" href="#">Horizon</a>
                                          <a class="dropdown-item" href="#">Mesa</a>
                                          <a class="dropdown-item" href="#">Montana</a>
                                      </div>
                                  </div>
                              </th>


                              <th scope="col">
                                  <div class="dropdown">
                                      <button class="btn btn-secondary dropdown-toggle" type="button"
                                          id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                          aria-expanded="false">
                                          Dropdown button
                                      </button>
                                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                          <a class="dropdown-item" href="#">Alameda</a>
                                          <a class="dropdown-item" href="#">Doniphan</a>
                                          <a class="dropdown-item" href="#">Dyer</a>
                                          <a class="dropdown-item" href="#">Horizon</a>
                                          <a class="dropdown-item" href="#">Mesa</a>
                                          <a class="dropdown-item" href="#">Montana</a>
                                      </div>
                                  </div>
                              </th>
                          </tr>

                      </thead>
                      <tbody>
                          <tr>
                              <th scope="row">Driving</th>
                              <td>data</td>
                              <td>data</td>
                              <td>data</td>
                          </tr>
                          <tr>
                              <th scope="row">Freight</th>
                              <td>data</td>
                              <td>data</td>
                              <td>data</td>
                          </tr>
                          <tr>
                              <th scope="row">Transit</th>
                              <td>data</td>
                              <td>data</td>
                              <td>data</td>
                          </tr>
                          <tr>
                              <th scope="row">Walking</th>
                              <td>data</td>
                              <td>data</td>
                              <td>data</td>
                          </tr>
                          <tr>
                              <th scope="row">Biking</th>
                              <td>data</td>
                              <td>data</td>
                              <td>data</td>
                          </tr>
                      </tbody>

                  </table>

              </div>
          </div>
      </div>
  `;

  base_content = document.getElementById('benchmark');
  base_content.appendChild(content);
}

$('#benchmarking').click(function() {
  benchmark();
  openNavBenchmark();
});


function openNavBenchmark() {

  let nav = document.getElementById('benchmark');
  nav.className = 'sidenav rounded-left mb-2 bg-light text-dark';
  // resizing for the table
  $(nav).tooltip('disable');
  $(nav).css('overflow', 'hidden');
  nav.style.height = '80vh';
  $(nav).css('margin-top', '');
  $(nav).css('top', '20vh');

  nav.style.width = '80vw';
  nav.style.zIndex = 1;
  document.getElementById('sidebar').style.zIndex = 0;
  //nav.style.height = "30%";

}

function closeNavBenchmark() {
  let nav = document.getElementById('benchmark');
  // document.getElementById("mySidenav").style.width = "0%";
  nav.style.width = '1%';
  nav.style.height = '2%';
  nav.style.overflow = 'hidden';
  nav.className = 'sidenav rounded-left mb-2 bg-info text-dark';
  $(nav).tooltip('enable');


  //removeAllElementsBar(); // destroy everything when closing bar

}