/*jslint
esversion: 6,
quotmark: single,
varstmt: true,
trailingcomma: true,
regexpu: true,
eqeqeq: true,
curly: true
*/

let tutorial_data;

$('#tut').click(() => {
    console.log('clicked tutorial');
    tutorial();
});
function tutorial(params) {
    load_tutorial_modal();
    buttons = $('#tut-categories');
    video = $('#tut-video');
    if ( buttons.is(':empty')) { //* prevents duplicates.
        ////console.log('inside loading');
        if(tutorial_data === undefined || null ){ //* prevents redundant requests.
            get_tut_data()
                .then(res => {
                    ////console.log(res);
                    tutorial_data = res;
                    load_tut_buttons(buttons, Object.keys(res));
                    change_tut_video('Multimodal Web Tool');
                })
                .catch(err => {
                    console.log(err);
                });
        }else{
            load_tut_buttons(buttons, Object.keys(tutorial_data));
            change_tut_video('Multimodal Web Tool');
        }
        
    }
}

function load_tutorial_modal() {
    //refresh
    clean();
    let base_content = document.createElement('DIV');
    base_content.innerHTML = `
        <div class="modal fade" id="tutorial">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <!-- Tutorial Header -->
                    <div class="modal-header">
                        <h4 class="modal-title text-primary ">Tutorial</h4>
                        <button type="button" class="close " data-dismiss="modal">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>

                    <!-- Tutorial body -->
                    <div class="modal-body">
                        <div class="container-fluid col-lg-12">
                            <div class="row">
                                <div id ="tut-categories" class="list-group-flush col-lg-3"></div>
                                <div id ="tut-video" class="col-lg-9 text-center "></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    document.getElementById('non-pm-content').appendChild(base_content);
}

function load_tut_buttons(location,tutorial_categories) {

    tutorial_categories.forEach(category =>{
        ////<a href="#" class="list-group-item list-group-item-action">First item</a>;
        item = document.createElement('A');
        item.innerHTML = category;
        item.className = 'list-group-item list-group-item-action button btn-info';
        item.value = category;
        item.innerHTML = category;
        console.log(item.value);
        item.addEventListener('click', ()=>change_tut_video(category));
        location.append(item);
    });

}

function change_tut_video(category){
    // //console.log(category);
    let target = $('#tut-video');
    $(target).empty();
    let new_video = document.createElement('IFRAME');
    new_video.setAttribute('title', category);
    new_video.style.width = '100%';
    new_video.style.height = '100%';
    new_video.setAttribute('src', tutorial_data[category].link);
    target.append(new_video);

}


function get_tut_data(){
    return new Promise((resolve, reject)=>{
        // //console.log('inside promise');
        //task
        let result;
        $.getJSON('tutorial/tutorial.json', data => {
            // console.log(data);
            resolve(data);
        });
        if(result === undefined, result === null){
            error = new Error('couldn\'t load data');
            reject(error);
        }
    });
}
