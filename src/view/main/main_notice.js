window.addEventListener('load',()=>{
    data_read();
})
//파이어베이스 데이터 읽어오기
function data_read(){
    
    const database = firebase.database();
    const ref = database.ref("notice");

    let childData_arr =[];
    
    // .once 데이터를 한번만 읽어옴 
    ref.once("value")
    .then(snapshot => {
        
        let tbody = document.querySelector('.notice_list_wrap>table>tbody');
        let childSnapshot_arr = [];
        
        // tbody 내용 초기화
        tbody.innerHTML = ''; 
        snapshot.forEach(childSnapshot=> {
            // 추가로 작업 수행
            childData_arr.push(childSnapshot.val());
            childSnapshot_arr.push(childSnapshot);
            add_table_list(childData_arr, tbody, childSnapshot_arr);
        });

        
    })
    .catch(error => {
        console.error("데이터 불러오기 중 오류가 발생했습니다.", error);
    });
}


//테이블 리스트 생성
function add_table_list(childData_arr, tbody, childSnapshot_arr){
    // tbody 내용작성 
    for(let x=0; x<childData_arr.length; x++){
        let tbody_content = document.createElement('tr');
        tbody_content.setAttribute('style','');
        // 번호 작성
        let idx_th = document.createElement('th');
        let idx_th_contents = document.createTextNode(childData_arr[x].idx);
        // 제목 작성
        let notice_title_th = document.createElement('th');

        //제목 링크 작성
        let notice_title_a = document.createElement('a');
        let notice_title_a_contents = document.createTextNode(childData_arr[x].notice_title);
        notice_title_a.setAttribute('href','../notice_read/notice_read.html');

        // 작성자 작성
        let writer_th = document.createElement('th');
        let writer_th_contents = document.createTextNode(childData_arr[x].writer);
        // 등록일 작성
        let today_date_th = document.createElement('th');
        let today_date_th_contents = document.createTextNode(childData_arr[x].today_date);
        // 조회수 작성
        let see_content_count_th = document.createElement('th');
        let see_content_count_th_contents = document.createTextNode(childData_arr[x].see_content_count);

        // 각각의 컨텐츠 연결

        idx_th.appendChild(idx_th_contents);
        notice_title_th.appendChild(notice_title_a);
        notice_title_a.appendChild(notice_title_a_contents);
        writer_th.appendChild(writer_th_contents);
        today_date_th.appendChild(today_date_th_contents);
        see_content_count_th.appendChild(see_content_count_th_contents);

        //tr에 컨텐츠 연결
        tbody_content.appendChild(idx_th);
        tbody_content.appendChild(notice_title_th);
        tbody_content.appendChild(writer_th);
        tbody_content.appendChild(today_date_th);
        tbody_content.appendChild(see_content_count_th);

        //tbody에 컨텐츠 연결
        tbody.appendChild(tbody_content);
    }

    click_a(tbody, childSnapshot_arr);
}

//클릭시 해당 인덱스 로컬스토리지 저장, 조회수 상승
//this_key_value, childData
//childSnapshot_arr[].key, childSnapshot_arr[x].val()
function click_a(tbody,childSnapshot_arr){
    for(let x=0; x<tbody.children.length; x++){
        tbody.children[x].cells[1].children[0].addEventListener('click',(event)=>{
            event.preventDefault();

            const database = firebase.database();
            const ref = database.ref("notice");

            let see_content_count = childSnapshot_arr[x].val().see_content_count+1;
            
            // Firebase Realtime Database에 데이터 수정
            ref.child(childSnapshot_arr[x].key).update({
                see_content_count
            })
            .then(function() {
                localStorage.setItem('notice_idx',tbody.children[x].cells[0].innerText);
                location.href="../notice_read/notice_read.html";
            })
            .catch(function(error) {
            console.error("데이터 변경 중 오류가 발생했습니다.", error);
            });

            
        })
    }
}