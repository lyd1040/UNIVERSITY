window.addEventListener('load',()=>{
    testing_title_content();
    textmove();
})
function testing_title_content(){
    let show_modal_btn_wrap = document.querySelectorAll('.show_modal_btn_wrap>button');
    let QnA_title = document.getElementById('QnA_title');
    let QnA_content = document.getElementById('QnA_content');

    show_modal_btn_wrap.forEach(e=>{
        e.addEventListener('click',()=>{
            if(e.classList.contains('upload')){
                /* 제목과 내용이 비어있는지 체크 */
                if(QnA_title.value == '' || QnA_content.value ==''){
                    alert('제목과 내용은 비어있을 수 없습니다.');
                }else{
                    /* 모달 띄우기 */
                    show_modal();
                }
            }else{
                history.back();
            }
         })
    })
    
}

function show_modal(){
    const modal = document.getElementById('modal');
    const hide_modal_btn = document.getElementById('hide_modal');
    const list_upload = document.getElementById('list_upload');

    modal.classList.remove('screen_out');

    list_upload.addEventListener('click',()=>{

    })

    /* 취소버튼 누를시 */
    hide_modal_btn.addEventListener('click',()=>{
        hide_modal(modal);
    })
}


function hide_modal(modal){
    modal.classList.add('screen_out');
}


/* 제목 텍스트와 내용 텍스트 포커스나 값 입력되어있을시 */
function textmove(){
    let QnA_title = document.getElementById('QnA_title');
    let QnA_content = document.getElementById('QnA_content');
    let QnA_title_txt = document.querySelector('.QnA_title_txt');
    let QnA_content_txt = document.querySelector('.QnA_content_txt');

    /* 포커스시 */
    QnA_title.addEventListener('focus',()=>{
        QnA_title_txt.classList.add('active');
    })
    QnA_content.addEventListener('focus',()=>{
        QnA_content_txt.classList.add('active');
    })

    /* 포커스 벗어날시 */
    QnA_title.addEventListener('focusout',()=>{
        if(QnA_title.value==''){
            QnA_title_txt.classList.remove('active');
        }
    })
    QnA_content.addEventListener('focusout',()=>{
        if(QnA_content.value==''){
            QnA_content_txt.classList.remove('active');
        }
    })

    /* 값 입력시 */
    QnA_content_txt.addEventListener('keyup',()=>{
        if(QnA_content_txt.value!=''){
            QnA_content_txt_txt.classList.add('active');
        }
    })
}