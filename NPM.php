<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>National Measures</title>
   <style>
      .sub-header {
         font-weight: bold;
         color: lightgrey;
      }
      .paragraph{ 
         color: white;
         font-size: 20px;
      }
      .pm-header {
         color:red;
         font-weight: bold;
      }
      .test {
         background-color: red;
      }
      html {
         overflow: scroll;
      }
      .face {
         height: auto;
         width: 140px;
      }
   </style>

   <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
   <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/css-toggle-switch/latest/toggle-switch.css">
   <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
   <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

   <link href="./css/sidebar.css" rel="stylesheet" type="text/css">
   <link href="./css/legend.css" rel="stylesheet" type="text/css">
   <link href="./css/custom.css" rel="stylesheet" type="text/css">
   <link href="./css/mwt.css" rel="stylesheet" type="text/css">
   <link rel="stylesheet" type="text/css" href="./css/loading.css"/>
   <link rel="stylesheet" type="text/css" href="./css/loading-btn.css"/>
</head>
<body>
   <div class="main">
      <!-- National Measures -->
         <?php include("inject-national-measures.php");?>
      <div id="non-pm-content"></div>
      <!-- Legend -->
      <div id="legendHolder" class="legend">
         <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 d-flex justify-content-center">
               <div class='my-legend'>
                  <div id='legend_title'></div>
                  <div class='legend-scale'>
                     <ul id="legendList" class='legend-labels'></ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="wrapper">
         <div class="container-fluid">
            <div class="row d-md-block flex-nowrap wrapper">
               <div class="col-md-2 float-left col-1 pl-0 pr-0  show width" id="sidebar">
                  <div class="list-group border-0 card text-center text-md-left">
                     <a class="logo" href="http://www.elpasompo.org/" target="#" class="d-none d-md-inline"><img src="./img/elmpologo.png" class="img-responsive"></a>
                     <a href="#" class="list-group-item d-inline-block collapsed" data-parent="#sidebar"><i class=""></i><span class="d-none d-md-inline"></span></a>
                     <a class="list-group-item d-inline-block collapsed " data-parent="#sidebar" data-toggle="modal"><span class="d-none d-md-inline">PM 1 - Safety</span></a>
                     <a class="list-group-item d-inline-block collapsed " data-parent="#sidebar" data-toggle="modal"><span class="d-none d-md-inline">PM 2 - Infrastructure</span></a>
                     <a class="list-group-item d-inline-block collapsed " data-parent="#sidebar" data-toggle="modal" id="benchmarking"><span class="d-none d-md-inline">PM 3 - System Performance</span></a>
                  </div>
               </div>
               <div class="col-md-10 float-left"><br><br>
                  <div id=info>
                     <h2 class=sub-header>
                     What is Transportation Performance Management?
                     </h2>
                     <p class=paragraph>Between 2016 and 2017, the  Federal Highway Administration (FHWA) and the Federal Transit Administration
                        (FTA) published several rules establishing performance measures and reporting
                        requirements for State Departments of Transportation (DOTs), Metropolitan 
                        Planning Organizations (MPOs), and transit agencies. Among other changes, the 
                        rules require State DOTs and MPOs to take a performance-based approach to planning for mobility needs and programming transportation funding.
                     </p>
                  </div>
                  <div id = "pm1">
                     <h2 class="pm-header">
                        <strong>PM 1 - Safety</strong>
                     </h2>
                     <p class="paragraph">Safety is rightfully the first area of performance management.
                        Everyone should have the right to get to their destination safely, regardless of whether they are driving, riding a bus, bicycling or walking. 
                        On January 22, 2018, January 28, 2019, and January 27, 2020, the MPO’s Transportation Policy Board (TPB) adopted TxDOT’s statewide Safety targets. 
                        Additionally, in 2020, the TPB resolved to support TxDOT’s visionary goals to end traffic fatalities on Texas roads by year 2050 and reduce fatal crashes by half by year 2035. 
                        To achieve these targets, MPOs across the state, TxDOT, and local governments must work for safer outcomes through design, education, law enforcement, emergency response and evaluation of programs and projects. 
                        The MPO revisits targets annually.
                     </p><br>
                     <h4 class="pm-header">
                        <strong>Fatalities - 2020</strong>
                     </h4>
                     <p class="paragraph">The number of fatalities is the total number of deaths in 
                        reportable motor vehicle traffic crashes in a calendar year.
                     </p>
                     <div class="row" style="background-color:#F5F5F5">
                        <div class="col-6">
                           <h2>Fatalities</h2>
                           <h2>El Paso Area MPO - Texas</h2>
                           <p class="paragraph" style="color:black">
                           The number of fatalities is the total number of deaths in 
                           reportable motor vehicle traffic crashes in a calendar year.
                           </p>
                           <h5>Baseline Performance 2014 - 2018: 73</h5>
                           <h5>5-Year Rolling Average 2016 - 2020: 79.4</h5>
                           <h5>Better than Baseline?: N/A</h5>
                           <h5>Target CY 2021: 91.1</h5>
                        </div>
                        <div class="col-3">
                           <h2>Current: 84</h2>
                           <h2>Target: 87.5</h2>
                        </div>
                        <div class="col-3" style="text-align:center">
                           <h2 style="background-color:green">On Target</h2>
                           <img class="face" src="img/face.jpeg">
                        </div>
                     </div>

                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</body>
   <!-- Custom styles from CSS folder -->
   <link href="css/sidebar.css" rel="stylesheet" type="text/css">
   <link href="css/corridorDropdown.css" rel="stylesheet" type="text/css">
   <link href="css/legend.css" rel="stylesheet" type="text/css">
   <link href="css/custom.css" rel="stylesheet" type="text/css">
   <link href="css/mwt.css" rel="stylesheet" type="text/css">
   <!-- load all functions -->
</html>