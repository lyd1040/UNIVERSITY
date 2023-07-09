window.addEventListener('load',()=>{
    testing_title_content();
    textmove();
})
function testing_title_content(){
    const show_modal_btn_wrap = document.querySelectorAll('.show_modal_btn_wrap>button');
    const notice_title = document.getElementById('notice_title');
    const notice_content = document.getElementById('notice_content');

    show_modal_btn_wrap.forEach(e=>{
        e.addEventListener('click',()=>{
            if(e.classList.contains('upload')){
                /* 제목과 내용이 비어있는지 체크 */
                if(notice_title.value == '' || notice_content.value ==''){
                    alert('제목과 내용은 비어있을 수 없습니다.');
                }else{
                    firebase_upload();
                }
            }else{
                history.back();
            }
         })
    })
    
}

/* 파이어베이스에 입력값 전달 */
async function firebase_upload(){
    // 사용자 입력값 가져오기
    const notice_title_input = document.getElementById("notice_title");
    const notice_content_input = document.getElementById("notice_content");


    let idx = await getNumberOfData()+1;
    let writer = '관리자'
    let notice_title = notice_title_input.value;
    let notice_content = notice_content_input.value;
    let see_content_count=0;

    console.log(idx);

    // Firebase Realtime Database에 데이터 추가
    const database = firebase.database();
    const ref = database.ref("notice");
    const today_date = today_date_return();
    let data = {
        idx,
        writer,
        notice_title,
        notice_content,
        today_date,
        see_content_count
    };

    ref.push(data)
    .then(function() {
        // 성공 메시지 출력 후 폼 초기화
        location.href = "../notice_list/notice_list.html";
    })
    .catch(function(error) {
        
        console.error("데이터 추가 중 오류가 발생했습니다.", error);
    });
}

/* 오늘 날짜 */
function today_date_return(){
    const today_date = new Date();
    const now_year = today_date.getFullYear();
    let now_month = today_date.getMonth()+1;
    let now_date = today_date.getDate();

    if(now_month<10){
        now_month='0'+now_month;
    }

    if(now_date<10){
        now_date='0'+now_date;
    }

    return now_year+'-'+now_month+'-'+now_date;
}

// Firebase Realtime Database에서 데이터 개수 가져오기
function getNumberOfData() {
    return new Promise((resolve, reject) => {
        const database = firebase.database();
        const ref = database.ref("notice");
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
            notice_content_txt_txt.classList.add('active');
        }
    })
}