window.onload=()=>{
    const idx = localStorage.getItem('notice_idx');
    loading(idx);
    updateBtn_vitalization();
}
function updateBtn_vitalization(){
    const updateBtn =document.querySelector('.updateBtn');

    if(!sessionStorage.getItem('admin-uid')){
        updateBtn.style.background='#d3d3d3';
        updateBtn.style.color='#000';
    }
    
}
async function loading(idx){
    
    await data_read(idx);

}
//파이어베이스 데이터 읽어오기
async function data_read(idx){
    const database = firebase.database();
    const ref = database.ref("notice");


    // .once 데이터를 한번만 읽어옴 
    ref.once("value")
    .then(snapshot => {

        // tbody 내용 초기화
        snapshot.forEach(childSnapshot=> {
            let childData = childSnapshot.val();
            if(Number(idx)===childData.idx){
                paste(childData);
                btn_cilck(childSnapshot.key, idx);
            }
            
        });
    })
    .catch(error => {
        console.error("데이터 불러오기 중 오류가 발생했습니다.", error);
    });
}

function btn_cilck(key_value, idx){
    let updateBtn = document.querySelector('.updateBtn');
    let goBack = document.querySelector('.goBack');

        goBack.addEventListener('click',()=>{
            history.back();
        })

        //수정
        updateBtn.addEventListener('click',()=>{
            if(sessionStorage.getItem('admin-uid')){
                localStorage.setItem('notice_key_value',key_value);
                localStorage.setItem('notice_idx',idx);
                location.href="../notice_update/notice_update.html";
            }else{
                alert('관리자만 수정할 수 있습니다.')
            }
        });
}

/* 제목, 내용 붙여넣기 */
function paste(childData){
    let title = document.querySelector('.notice_title');
    let content = document.querySelector('.notice_content');
    let notice_title = childData.notice_title;
    let notice_content = childData.notice_content;

    title.innerHTML ='제목: '+notice_title;
    content.innerHTML ='내용: '+notice_content;
}