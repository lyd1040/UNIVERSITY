window.onload=()=>{
    const idx = localStorage.getItem('idx');
    loading(idx);

    
}



async function loading(idx){
    
    await data_read(idx);
    await show_answer_btn();

}

/* 관리자 로그인시 */
async function show_answer_btn(){
    if(sessionStorage.getItem("admin-uid")){
        document.querySelector('.answerBtn').style.display="";
        document.querySelector('.updateBtn').style.display="none";
    }
}
//파이어베이스 데이터 읽어오기
async function data_read(idx){
    const database = firebase.database();
    const ref = database.ref("contents");


    // .once 데이터를 한번만 읽어옴 
    ref.once("value")
    .then(snapshot => {

        // tbody 내용 초기화
        snapshot.forEach(childSnapshot=> {
            let childData = childSnapshot.val();
            if(Number(idx)===childData.idx){
                paste(childData);
                btn_cilck(childData, childSnapshot.key, idx);
            }
            
        });
    })
    .catch(error => {
        console.error("데이터 불러오기 중 오류가 발생했습니다.", error);
    });
}

function btn_cilck(childData, key_value, idx){
    let updateBtn = document.querySelector('.updateBtn');
    let goBack = document.querySelector('.goBack');

        goBack.addEventListener('click',()=>{
            history.back();
        })

        //사용자는 수정
        updateBtn.addEventListener('click',()=>{
            show_modal(childData, key_value, idx);
        });

        //관리자는 답변
        document.querySelector('.answerBtn').addEventListener('click',()=>{
            localStorage.setItem('key_value',key_value);
            localStorage.setItem('idx',idx);
            location.href="../QnA_update/QnA_update.html";
        })
}

//모달 화면출력
function show_modal(childData, key_value, idx){
    const modal = document.getElementById('modal');
    const user_pw = document.getElementById('user_pw');
    const check = document.getElementById('check');
    

    if(childData.answer === ''){
        modal.classList.remove('screen_out');

        check.addEventListener('click',()=>{
            if(user_pw.value === childData.pw){
                localStorage.setItem('key_value',key_value);
                localStorage.setItem('idx',idx);
                location.href="../QnA_update/QnA_update.html";
            }else{
                alert('비밀번호가 틀렸습니다.');
                return 0;
            }
        })
        hide_modal();
    }else{
        alert('답변이 달린 후에는 글을 수정할 수 없습니다.');
    }

    
}

//모달창 숨기기
function hide_modal() {
    const hide_modal = document.getElementById('hide_modal');

    hide_modal.addEventListener('click',() =>{
        modal.classList.add('screen_out');
    })
    
}

/* 제목, 내용 붙여넣기 */
function paste(childData){
    let title = document.querySelector('.QnA_title');
    let content = document.querySelector('.QnA_content');
    let answer = document.querySelector('.QnA_answer');
    let QnA_title = childData.QnA_title;
    let QnA_content = childData.QnA_content;
    let QnA_answer = childData.answer;

    title.innerHTML ='제목: '+QnA_title;
    content.innerHTML ='내용: '+QnA_content;
    if(QnA_answer!=''){
        answer.innerHTML ='답변: '+QnA_answer;
    }
}