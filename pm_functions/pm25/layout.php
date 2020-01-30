<!DOCTYPE html>
<html lang="en">

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- BOOTSTRAP 4 -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="../css/main.css">

<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js" integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<!-- BOOTSTRAP 4 -->

<div class="container">
    <!-- Button Trigger -->
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">Performance Measure #25</button>

    <!-- Button contents -->
    <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- Content -->
                <div class="modal-body">
                    <h2>Regional & Section Performances</h2>
                    <h3>Performance Measure #25: Percentage of Pavements in Poor Condition (Automobiles, Freight, Transit)</h3>
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <p class="title">Summary:</p>
                            PM 25 is based on the International Roughness Index (IRI). The IRI is used worldwide for maintaining and
                            evaluating road systems. There is a multitude of different uses for the IRI, but for this analysis it is
                            used for pavement condition on the National Highway System (NHS). Listed are the IRI values for the different
                            conditions:
                            <ul>
                                <li>Good Condition: IRI < 94</li>
                                <li>Fair Condition: 95 - 170</li>
                                <li>Poor Condition: IRI > 170</li>
                            </ul>
                        </div>
                        <div class="panel-body">
                            <p class="title">Analysis Period:</p>
                            Data from 2011 to 2017 is available on the HPMS website
                        </div>
                        <div class="panel-body">
                            <p class="title">Data Source:</p>
                            Highway Performance Monitoring System (HPMS) Public Release of Geospatial Data in Shapefile Format:
                            <ul>
                                <li><a href="url">https://www.fhwa.dot.gov/policyinformation/hpms/shapefiles.cfm</a></li>
                            </ul>
                        </div>
                        <div class="panel-body"><p class="title">Performances:</p></div>
                        <!-- Accordion of performances -->
                        <div class="accordion" id="acc">
                            <!-- Regional-Level Performance -->
                            <div class="card">
                                <div class="card-header" id="headingOne">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Regional-Level Performance</button>
                                    </h5>
                                </div>
                                <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div class="card-body">
                                        <div>
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <!-- Latest Year Available -->
                                                    <div class="sub-title">Past 5 Years:</div>
                                                    <script type="text/javascript" src="rl-latest.js"></script>
                                                    <div id="rl-latest"></div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <!-- Historical Trends -->
                                                    <div class="sub-title">Historical Trends:</div>
                                                    <script type="text/javascript" src="rl-historical.js"></script>
                                                    <div id="rl-historical"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Section-Level Performance -->
                            <div class="card">
                                <div class="card-header" id="headingTwo">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Section-Level Performance</button>
                                    </h5>
                                </div>
                                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                    <div class="card-body">
                                        <div>
                                            <div class="row">
                                                <div class="col-lg-6">
                                                    <!-- Latest Year Available -->
                                                    <div class="sub-title">Latest Year Available:</div>
                                                    <script type="text/javascript" src="sl-latest.js"></script>
                                                    <div id="sl-latest"></div>
                                                </div>
                                                <div class="col-lg-6">
                                                    <!-- Historical Trends -->
                                                    <div class="sub-title">Historical Trends:</div>
                                                    <script type="text/javascript" src="sl-historical.js"></script>
                                                    <div id="sl-historical"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Close button -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</div>
</html>
