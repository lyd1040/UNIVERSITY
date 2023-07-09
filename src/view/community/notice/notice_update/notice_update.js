window.addEventListener('load',()=>{
    const this_key_value =localStorage.getItem('notice_key_value');
    const temporary_date_localS_idx = localStorage.getItem('notice_idx'); //임시로 read쪽 데이터 맡아두기
    localStorage.removeItem('notice_key_value');

    loading(this_key_value, temporary_date_localS_idx)
})

window.addEventListener('beforeunload', (e)=>{
    e.preventDefault();
}, false);

/* 관리자 */
async function loading(this_key_value, temporary_date_localS_idx){
    await testing_title_content(this_key_value, temporary_date_localS_idx);
    await textmove();
}


async function testing_title_content(this_key_value, temporary_date_localS_idx){
    const show_modal_btn_wrap = document.querySelectorAll('.show_modal_btn_wrap>button');
    const notice_title_input = document.getElementById('notice_title');
    const notice_content_input = document.getElementById('notice_content');

    const database = firebase.database();
    const ref = database.ref("notice");

    //데이터 수정 전 input에 기존값 붙여넣기
    read_data(ref, notice_title_input, notice_content_input, temporary_date_localS_idx);

    show_modal_btn_wrap.forEach(e=>{
        e.addEventListener('click',()=>{
            if(e.classList.contains('update')){
                /* 제목과 내용이 비어있는지 체크 */
                if(notice_title_input.value == '' || notice_content_input.value ==''){
                    alert('제목과 내용은 비어있을 수 없습니다.');
                }else{
                    //데이터 수정 시작
                    firebase_update(ref, notice_title_input, notice_content_input, this_key_value ,temporary_date_localS_idx);
                }
            }else{
                history.back();
            }
         })
    })
}

/* 파이어베이스에 수정*/
async function firebase_update(ref, notice_title_input, notice_content_input, this_key_value ,idx){
    
    // 사용자 입력값 가져오기
    let notice_title = notice_title_input.value;
    let notice_content = notice_content_input.value;

    // Firebase Realtime Database에 데이터 수정
    ref.child(this_key_value).update({
        notice_title,
        notice_content
    })
    .then(function() {
        localStorage.setItem('notice_idx',idx);
        location.href="../notice_read/notice_read.html";
    })
    .catch(function(error) {
    console.error("데이터 변경 중 오류가 발생했습니다.", error);
    });
}

//데이터 읽어오기
function read_data(ref, notice_title_input, notice_content_input, idx){
    // .once 데이터를 한번만 읽어옴 
    console.log('a');
    ref.once("value")
    .then(snapshot => {

        snapshot.forEach(childSnapshot=> {
            let childData = childSnapshot.val();
            if(Number(idx)===childData.idx){
                notice_title_input.value=childData.notice_title;
                notice_content_input.value=childData.notice_content;
            }
            // 추가로 작업 수행
        });
    })
    .catch(error => {
        console.error("데이터 불러오기 중 오류가 발생했습니다.", error);
    });
}

/* 제목 텍스트와 내용 텍스트 포커스나 값 입력되어있을시 */
async function textmove(){
    const notice_title = document.getElementById('notice_title');
    const notice_content = document.getElementById('notice_content');
    const notice_title_txt = document.querySelector('.notice_title_txt');
    const notice_content_txt = document.querySelector('.notice_content_txt');

    /* 포커스시 */
    notice_title.addEventListener('focus',()=>{
        notice_title_txt.classList.add('active');
    })
    notice_content.addEventListener('focus',()=>{
        notice_content_txt.classList.add('active');
    })

    /* 포커스 벗어날시 */
    notice_title.addEventListener('focusout',()=>{
        if(notice_title.value==''){
            notice_title_txt.classList.remove('active');
        }
    })
    notice_content.addEventListener('focusout',()=>{
        if(notice_content.value==''){
            notice_content_txt.classList.remove('active');
        }
    })

    /* 값 입력시 */
    notice_content_txt.addEventListener('keyup',()=>{
        if(notice_content_txt.value!=''){
            notice_content_txt.classList.add('active');
        }
    })
}