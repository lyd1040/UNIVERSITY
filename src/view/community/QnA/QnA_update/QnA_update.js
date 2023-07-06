window.addEventListener('load',()=>{
    const this_key_value =localStorage.getItem('key_value');
    const temporary_date_localS_idx = localStorage.getItem('idx'); //임시로 read쪽 데이터 맡아두기
    localStorage.removeItem('key_value');
    localStorage.removeItem('idx');

    loading(this_key_value, temporary_date_localS_idx)
    show_hide_answer(this_key_value, temporary_date_localS_idx)
})

/* 관리자 */
function show_hide_answer(this_key_value, idx){
    const QnA_title_input = document.getElementById('QnA_title');
    const QnA_content_input = document.getElementById('QnA_content');

    const updatebtn = document.querySelector('.update');
    updatebtn.addEventListener('click',()=>{
        if(!sessionStorage.getItem("admin-uid")){
            document.querySelector('.QnA_answer_txt').style.display="none";
            document.getElementById('QnA_answer').style.display="none";
        }else{
            //파이어베이스 수정
            const database = firebase.database();
            const ref = database.ref("contents");
            const QnA_answer_input = document.getElementById('QnA_answer');

            let answer = QnA_answer_input.value;

            // Firebase Realtime Database에 데이터 수정
            ref.child(this_key_value).update({
                answer,
            })
            .then(function() {
                localStorage.setItem('idx',idx);
                location.href="../QnA_read/QnA_read.html";
            })
            .catch(function(error) {
            console.error("데이터 변경 중 오류가 발생했습니다.", error);
            });
        }
    })
    if(sessionStorage.getItem("admin-uid")){
        console.log('afdaf');
        QnA_title_input.setAttribute('readonly','readonly');
        QnA_content_input.setAttribute('readonly','readonly');
        
    }
}

/* 사용자 */
async function loading(this_key_value, temporary_date_localS_idx){
    await testing_title_content(this_key_value, temporary_date_localS_idx);
    await textmove();
}


async function testing_title_content(this_key_value, temporary_date_localS_idx){
    const show_modal_btn_wrap = document.querySelectorAll('.show_modal_btn_wrap>button');
    const QnA_title_input = document.getElementById('QnA_title');
    const QnA_content_input = document.getElementById('QnA_content');

    const database = firebase.database();
    const ref = database.ref("contents");

    //데이터 수정 전 input에 기존값 붙여넣기
    read_data(ref, QnA_title_input, QnA_content_input, temporary_date_localS_idx);

    show_modal_btn_wrap.forEach(e=>{
        e.addEventListener('click',()=>{
            if(e.classList.contains('update')){
                /* 제목과 내용이 비어있는지 체크 */
                if(QnA_title_input.value == '' || QnA_content_input.value ==''){
                    alert('제목과 내용은 비어있을 수 없습니다.');
                }else{
                    //데이터 수정 시작
                    firebase_update(ref, QnA_title_input, QnA_content_input, this_key_value ,temporary_date_localS_idx);
                }
            }else{
                if(confirm('작성중 나가시면 입력하신 데이터가 삭제됩니다.')){
                    localStorage.setItem('idx',temporary_date_localS_idx);
                    history.back();
                }
                
            }
         })
    })
}

/* 파이어베이스에 수정*/
async function firebase_update(ref, QnA_title_input, QnA_content_input, this_key_value ,idx){
    // 사용자 입력값 가져오기
    

    let QnA_title = QnA_title_input.value;
    let QnA_content = QnA_content_input.value;

    // Firebase Realtime Database에 데이터 수정
    ref.child(this_key_value).update({
        QnA_title,
        QnA_content
    })
    .then(function() {
        localStorage.setItem('idx',idx);
        location.href="../QnA_read/QnA_read.html";
    })
    .catch(function(error) {
    console.error("데이터 변경 중 오류가 발생했습니다.", error);
    });
}

//데이터 읽어오기
function read_data(ref, QnA_title_input, QnA_content_input, idx){
    const QnA_answer_input = document.getElementById('QnA_answer');
    // .once 데이터를 한번만 읽어옴 
    console.log('a');
    ref.once("value")
    .then(snapshot => {

        snapshot.forEach(childSnapshot=> {
            let childData = childSnapshot.val();
            if(Number(idx)===childData.idx){
                QnA_title_input.value=childData.QnA_title;
                QnA_content_input.value=childData.QnA_content;
                QnA_answer_input.value=childData.answer;
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
            QnA_content_txt.classList.add('active');
        }
    })
}