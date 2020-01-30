/*jslint
esversion: 6,
quotmark: single,
varstmt: true,
trailingcomma: true,
regexpu: true,
eqeqeq: true,
curly: true
*/

let studies_data; //* data to be remotely loaded

$('#studies-matrix').click(() => {
    studies();
});


function studies(params) {
    load_studies_modal();
    let table = $('#studies-table');   
    if ( table.is(':empty')) { //* prevents duplicates.
        ////console.log('inside loading');

        if(studies_data === undefined || null ){ //* prevents redundant requests.
            
            get_studies_data()
                .then(res => {
                    //alert(res);
                    console.log('create table using fetched data.');
                    studies_data = res;
                    create_studies_table(table, res.studies);
                })
                .catch(err => {
                    console.log(err);
                });
        } else { //* use the pre-loaded data.
 
            console.log(studies_data);
           // alert(studies_data);
            console.log('create table using stored data.');
            create_studies_table(table, studies_data.studies);
        }
        
    }
}

function load_studies_modal() {
    //refresh
    clean();
    let base_content = document.createElement('DIV');
    base_content.innerHTML = `
        <div class="modal fade in" id="studies">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <!-- Studies Header -->
                    <div class="modal-header">
                        <h4 class="modal-title text-primary ">Existing Studies</h4>
                        <button type="button" class="close" data-dismiss="modal">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>

                    <!-- Studies body -->
                    <div class="modal-body">
                        <div class="container-fluid col-lg-12">
                            <div class="row">
                                <div class="table-responsive table-striped">
                                     <table class="table "id ="studies-table" class="col-lg-12"></table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> `;
    document.getElementById('non-pm-content').appendChild(base_content);
}

function create_studies_table(table, data) {
    console.log(typeof data);
    /* corridor array */
    const corridors = [
        'STUDY',
        'Alameda',
        'Artcraft Dominici',
        'Doniphan',
        'Dyer',
        'Eastlake',
        'Horizon',
        'McNutt',
        'Mesa',
        'Montana',
        'Montwood',
        'Socorro',
        'Yarbrough',
        'Zaragoza',
    ];
    /* studyName> link+used>boolean[] */
    /* used study names to populate rows headers
        for each of the
    */
    let header_row= document.createElement('TR'); // reusable row variable.
    corridors.forEach(cor =>{ //* header row
        let header = document.createElement('TH');
        header.innerHTML = cor;
        header_row.append(header);
    });
    table.append(header_row);
    //* data rows.

    data.forEach(study => {
        content_row = document.createElement('TR');
        //do link
        let cell = document.createElement('TD');
        let content = document.createElement('A');
        content.innerHTML = study.name;

        //! this is only for the study that didn't have a link to point to.
        if (study.name !== 'County Regional Transit Study'){
            content.setAttribute('href', study.link);
            content.setAttribute('target', '_blank');
        }
        cell.append(content);
        content_row.append(cell);
        //do Checkmarks
        study.usedIn.forEach(check =>{
            cell = document.createElement('TD');
            content = document.createElement('SPAN');
            if(check){
               // content.innerHTML = '&checkmark;'; //! change to font awesome
                content.className = 'fa fa-check text-success';
            }else{
                //content.innerHTML = '&times;';    //! change to font awesome
               //content.className = 'fa fa-circle-o ';
            }
            cell.append(content);
            content_row.append(cell);
        });
        table.append(content_row);
    });
    $('#studies-table').append(table);
}
function get_studies_data(){
    return new Promise((resolve, reject)=>{
       // console.log('inside promise');
        //task
        let result;
        $.getJSON('studies/studies.json', data => {
            // console.log(data);
            resolve(data);
        });
        if(result === undefined, result === null){
            error = new Error('couldn\'t load data');
            reject(error);
        }
    });
}
