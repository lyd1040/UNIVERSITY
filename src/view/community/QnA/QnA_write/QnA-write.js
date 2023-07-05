window.addEventListener('load',()=>{
    testing_title_content();
    textmove();
})
function testing_title_content(){
    const show_modal_btn_wrap = document.querySelectorAll('.show_modal_btn_wrap>button');
    const QnA_title = document.getElementById('QnA_title');
    const QnA_content = document.getElementById('QnA_content');

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

    list_upload.addEventListener('click',(event)=>{
        event.preventDefault();
        firebase_upload();
    })

    /* 취소버튼 누를시 */
    hide_modal_btn.addEventListener('click',()=>{
        hide_modal(modal);
    })
}


function hide_modal(modal){
    modal.classList.add('screen_out');
}

/* 파이어베이스에 입력값 전달 */
async function firebase_upload(){
    // 사용자 입력값 가져오기
    const writer_input = document.getElementById("writer");
    const pw_input = document.getElementById("pw");
    const QnA_title_input = document.getElementById("QnA_title");
    const QnA_content_input = document.getElementById("QnA_content");


    let idx = await getNumberOfData();
    let writer = writer_input.value;
    let pw = pw_input.value;
    let QnA_title = QnA_title_input.value;
    let QnA_content = QnA_content_input.value;

    // Firebase Realtime Database에 데이터 추가
    const database = firebase.database();
    const ref = database.ref("users");
    let data = {
        idx,
        writer,
        pw,
        QnA_title,
        QnA_content,
    };

    console.log(data);
    ref.push(data)
    .then(function() {
        // 성공 메시지 출력 후 폼 초기화
        console.log("데이터가 성공적으로 추가되었습니다.");
    })
    .catch(function(error) {
        
        console.error("데이터 추가 중 오류가 발생했습니다.", error);
    });
}


// Firebase Realtime Database에서 데이터 개수 가져오기
function getNumberOfData() {
    return new Promise((resolve, reject) => {
        const database = firebase.database();
        const ref = database.ref("users");
        ref.once("value")
          .then(function(snapshot) {
            const numberOfData = snapshot.numChildren();
            resolve(numberOfData);
          })
          .catch(function(error) {
            console.error("데이터 개수 가져오기 중 오류가 발생했습니다.", error);
            reject(error);
          });
      });
}


/* 제목 텍스트와 내용 텍스트 포커스나 값 입력되어있을시 */
function textmove(){
    const QnA_title = document.getElementById('QnA_title');
    const QnA_content = document.getElementById('QnA_content');
    const QnA_title_txt = document.querySelector('.QnA_title_txt');
    const QnA_content_txt = document.querySelector('.QnA_content_txt');

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