/*jshint
    esversion: 6,
    quotmark: single,
    varstmt: true,
    trailingcomma: true,
    regexpu: true,
    eqeqeq: true,
    curly: true,
    loopfunc: true
*/
let id = 0; //* reference to the different layouts
let benchmark_data; //* results of the data.
let benchmark_layout; //* rows and options for the each of the tables

$('#benchmarking').click(() => {
    load_benchmark_modal();
    let content = $('#benchmark-content');
    let table = $('#benchmark-table');
    let containers = $('#benchmark-containers');
    // console.log('table length: ' + table.length);
    // console.log('table children length: '+table.children().length);

    if (table.children().length === 1 && containers.is(':empty')) { //* prevents duplicates
        if ((benchmark_layout === undefined || null) || (benchmark_data === undefined || null)) { //* prevents redundant requests
            get_benchmark_data('benchmark/benchmark_layout.json')
                .then(res => { //* fetch layout data.
                    console.log(res);
                    benchmark_layout = res;
                    create_benchmark_categories(res.pm_categories);
                })
                .then(res => {
                    get_benchmark_data('benchmark/benchmark_data_sr.json')
                        .then(res => { //* get results data
                            console.log(res);
                            benchmark_data = res;
                            create_benchmark_column(benchmark_layout.corridors, res);
                        })
                        .catch(err => console.log(err));
                }).catch(err => console.log(err));

        } else { //* reuse the loaded variables. if already there.
            create_benchmark_categories(benchmark_layout.pm_categories);
            create_benchmark_column(benchmark_layout.corridors, benchmark_data);

        }
    }
});

function load_benchmark_modal() {
    //refresh
    clean();
    id = 0;
    let base_content = document.createElement('DIV');
    base_content.innerHTML = `
        <div class="modal fade in" id="benchmark">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <!-- Benchmarking Header -->
                    <div class="modal-header">
                        <h4 class="modal-title text-primary ">Benchmarking</h4>
                        <button type="button" class="close" data-dismiss="modal">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                    <!-- benchmarking body -->
                    <div class="modal-body">
                        <div class="container-fluid col-lg-12">
                            <div class="row">
                                <div id="benchmark-content" class="container-fluid">
                                    <div id="benchmark-table" class="row">
                                        <!--contains the left most column. this one displays the names of the categories of the PM's-->
                                        <div class="col-lg-8">
                                            <div id="benchmark-containers" class="row"></div>
                                        </div>
                                        <!--this one contains all the other cards that are held inside. 
                                                this will contain the data of each of the corridors.-->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    $('#non-pm-content').append(base_content);
}

/* this one create the one that goes on the left left most column. this controls the the tables
    and dictates the categories of the performances.
    Also it allows to run the same as the buttons on the regional performance.
*/
function create_benchmark_categories(categories) {
    let root = document.getElementById('benchmark-table');

    let bench_cat = document.createElement('DIV');
    bench_cat.id = 'benchmark-categories';
    bench_cat.className = 'card col-lg-4';

    //header
    let header = document.createElement('DIV');
    header.className = 'card-header row';
    header.innerHTML = ` 
        <div class="col-lg-10">
            <h2 class="text-primary text-center">Benchmarking</h2>
        </div>
        <div id="add-corridor" class="col-lg-2 text-right">
            <button class=" btn btn-outline-success" onclick="add_column();"id="add-button">&plus;</button>
        </div>`;
    //console.log(header);
    bench_cat.appendChild(header);

    //create the accordion
    let accordion = document.createElement('DIV');
    accordion.className = 'panel-group';
    accordion.id = 'cat-accordion';

    for (let category in categories) { //* categories are the different group of related PMs. (Driving, Fright, etc.)
        //// console.log(category); // the keys
        let cat = document.createElement('DIV');
        let content = `
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h2 class="panel-title">
                                <a 
                                    class = "text-capitalize"
                                    data-toggle="collapse" 
                                    href=".${category}"> 
                                ${category}
                                </a>
                            </h2>
                        </div>
                        <div
                            class=" ${category} panel-collapse collapse"
                        >
                `;
        // console.log(Object.keys(categories[category]));
        Object.keys(categories[category]).forEach(pm => {
            //*create a button for each of the categories.
            //console.log('--'+pm);  //each of the categories
            content += `<li 
                            
                            onClick="benchmark_activate_pm('${categories[category][pm]}');" 
                            class="list-group-item btn btn-block btn-link ">
                            ${pm}
                        </li>`;
        });
        content += `
                        </ul>
                    </div>
                </div>
                `;
        cat.innerHTML = content;
        accordion.appendChild(cat);
    }
    bench_cat.appendChild(accordion);
    root.insertBefore(bench_cat, root.children[0]);
}

function create_benchmark_column(corridors, categories) { //* These columns are the ones that contain results of the pms.
    let target = document.getElementById('benchmark-containers');
    // create the container
    let root = document.createElement('DIV');
    root.id = 'benchmark_' + id;
    root.className = 'card col-lg-4';
    //root.style.width = '18rem';
    // create the header
    let header = document.createElement('DIV');
    header.className = 'card-header row text-primary';
    // create title
    let header_content = `
                <div class="col-lg-8">
                    <form action="" class="form-group"style="margin-bottom: 0.5rem;">
                        <select name="corridor" onChange="update_benchmark_column('${root.id}',this.value);"id="corridor-select" class="form-control">
            `;

    // create title options
    corridors.forEach(corridor => {
        ////console.log(corridor);
        header_content += `<option value="${corridor}">${corridor}</option>`;
    });

    // create close button
    header_content += `
                        </select>
                    </form>
                </div>
                <div class="col-lg-2 text-right">
                    <button onclick ="remove_benchmark_column('benchmark_${id++}');"class="btn btn-outline-danger">&minus;</button>
                </div>`;

    header.innerHTML = header_content;
    root.appendChild(header);
    // create each of the categories.

    target.appendChild(root);
    ////console.log('new column added');
    update_benchmark_column(root.id, 'Regional');
    target.appendChild(root);
}

//* this function creates the content of the accordion and gets appended to the benchmark
function update_benchmark_column(id, corridor) {
    console.log('id = ' + id);
    console.log('corridor = ' + corridor);

    let root = $('#' + id); //*parent benchmark column

    if (root.children().length === 2) {
        root.children()[1].remove(); //* remove the 2nd element of the column a.k.a the accordion.
    }

    //create the new accordion
    let accordion = document.createElement('DIV');
    accordion.className = 'panel-group';
    accordion.id = 'cat-accordion';

    for (let category in benchmark_data) {
        ////console.log(category); // the keys
        let cat = document.createElement('DIV');
        let content = `
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h2 class="panel-title">
                                <a  
                                    class= "text-capitalize"
                                    data-toggle="collapse" 
                                    href=".${category}"> 
                                ${category}
                                </a>
                            </h2>
                        </div>`;

        if ($('.' + category).hasClass('show')) { //* check if the other columns has the categories expanded.
            content += `<div
                            class=" ${category} panel-collapse collapse show"
                        >`;
        } else {
            content += `<div
                            class=" ${category} panel-collapse collapse"
                        >`;
        }
        Object.keys(benchmark_data[category]).forEach(pm => {
            ////console.log('--'+pm);  //each of the categories
            content += `<li class="list-group-item">${benchmark_data[category][pm][corridor]}</li>`;
        });
        content += `
                        </ul>
                    </div>
                </div>
                `;
        cat.innerHTML = content;
        accordion.appendChild(cat);
    }
    root.append(accordion);
}

function benchmark_activate_pm(id) { //* the function will click on the id that triggers the performance measures.
    // //console.log(id);
       $('#'+id).trigger('click');   /* this is the part where buttons get triggered. */
}

function remove_benchmark_column(id) { //* deletes any of the benchmark columns being clicked.
    let target = document.getElementById(id);
    ////console.log(target);
    target.remove();
    ////console.log('current column removed');
}

function add_column() { //* adds a new column to benchmark to be compared. up to 3 only.
    parent = $('#benchmark-containers')[0];
    if (parent.children.length < 3) {
        create_benchmark_column(benchmark_layout.corridors, benchmark_layout.pm_categories);
    }
}

function get_benchmark_data(path) { //*  promise to get json asynchronously.
    return new Promise((resolve, reject) => {
        // //console.log('inside promise');
        //task
        let result;
        $.getJSON(path, data => {
            // console.log(data);
            resolve(data);
        });
        if ((result === undefined, result === null)) {
            error = new Error('couldn\'t load data');
            reject(error);
        }
    });
}

$('.driving').click(() => {
    console.log('driving expanded');
    $('.driving .panel-collapse .panel').collapse('show');
});

$('.driving').click(() => {
    console.log('driving hiding');
    $('.driving .panel-collapse .in').collapse('hide');
});