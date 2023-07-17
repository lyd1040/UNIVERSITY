window.addEventListener('load',()=>{
    load_window();
})
async function load_window(){
    await data_read();
    await show_contents();
}


//화면 보이기
async function show_contents(){
    let all_wrap = document.getElementById('all_wrap');
    all_wrap.style.display='block';
}

//파이어베이스 데이터 읽어오기
async function data_read(){
    const database = firebase.database();
    const ref = database.ref("contents");

    let childData_arr =[];
    
    // .once 데이터를 한번만 읽어옴 
    ref.once("value")
    .then(snapshot => {
        
        let tbody = document.querySelector('.contents>table>tbody');
        let childSnapshot_arr = [];
        
        // tbody 내용 초기화
        tbody.innerHTML = ''; 
        snapshot.forEach(childSnapshot=> {
            // 추가로 작업 수행
            childData_arr.push(childSnapshot.val());
            childSnapshot_arr.push(childSnapshot);
        });

        add_table_list(childData_arr, tbody, snapshot, childSnapshot_arr);
    })
    .catch(error => {
        console.error("데이터 불러오기 중 오류가 발생했습니다.", error);
    });
}


//테이블 리스트 생성
async function add_table_list(childData_arr, tbody, snapshot, childSnapshot_arr){
    await dom_connect(childData_arr,tbody)
    await click_a(tbody, childSnapshot_arr);
    await search(tbody, snapshot);
    await paging(tbody);
    await hide_loding();
}
async function dom_connect(childData_arr,tbody){
// tbody 내용작성 
for(let x=0; x<childData_arr.length; x++){
    let tbody_content = document.createElement('tr');
    tbody_content.setAttribute('style','display:none');
    // 번호 작성
    let idx_th = document.createElement('th');
    let idx_th_contents = document.createTextNode(childData_arr[x].idx);
    // 제목 작성
    let QnA_title_th = document.createElement('th');

    //제목 링크 작성
    let QnA_title_a = document.createElement('a');
    let QnA_title_a_contents = document.createTextNode(childData_arr[x].QnA_title);
    QnA_title_a.setAttribute('href','../QnA_read/QnA_read.html');

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
    QnA_title_th.appendChild(QnA_title_a);
    QnA_title_a.appendChild(QnA_title_a_contents);
    writer_th.appendChild(writer_th_contents);
    today_date_th.appendChild(today_date_th_contents);
    see_content_count_th.appendChild(see_content_count_th_contents);

    //tr에 컨텐츠 연결
    tbody_content.appendChild(idx_th);
    tbody_content.appendChild(QnA_title_th);
    tbody_content.appendChild(writer_th);
    tbody_content.appendChild(today_date_th);
    tbody_content.appendChild(see_content_count_th);

    //tbody에 컨텐츠 연결
    tbody.appendChild(tbody_content);
}
}

//로딩 없애기
async function hide_loding(){
    const loding = document.getElementById('loding');

    loding.style.display='none';
    
} 
/* 검색 */
async function search(tbody, snapshot){
    const searchBtn = document.querySelector('.searchBtn');
    const search_input = document.getElementById('search');
    const select_option = document.getElementById('search_kind');
    let childData = [];
    let arr = [];
    snapshot.forEach(childSnapshot=>{
        childData.push(childSnapshot.val());
    })
    
   
    searchBtn.addEventListener('click',()=>{
        
        arr=[];
        if(select_option.value === '제목'){
            childData.forEach((e,index)=>{
                for(let x=0; x<tbody.children.length; x++){
                    tbody.children[index].setAttribute('style','display:none');
                }
                if(e.QnA_title && e.QnA_title.search(search_input.value) !== -1){
                    console.log('a');
                    tbody.children[index].setAttribute('style','');
                    arr.push(tbody.children[index]);
                }
                
            })
        }else if(select_option.value === '내용'){
            childData.forEach((e,index)=>{
                for(let x=0; x<tbody.children.length; x++){
                    tbody.children[index].setAttribute('style','display:none');
                }
                if(e.QnA_content && e.QnA_content.search(search_input.value) !== -1){
                    tbody.children[index].setAttribute('style','');
                    arr.push(tbody.children[index]);
                }
            })
        }else{
            childData.forEach((e,index)=>{
                for(let x=0; x<tbody.children.length; x++){
                    tbody.children[index].setAttribute('style','display:none');
                }
                if(e.writer && e.writer.search(search_input.value) !== -1){
                    tbody.children[index].setAttribute('style','');
                    arr.push(tbody.children[index]);
                }
            })
        }

        search_paging(arr);
    })
}

//클릭시 해당 인덱스 로컬스토리지 저장, 조회수 상승
//this_key_value, childData
//childSnapshot_arr[].key, childSnapshot_arr[x].val()
async function click_a(tbody,childSnapshot_arr){
    for(let x=0; x<tbody.children.length; x++){
        tbody.children[x].cells[1].children[0].addEventListener('click',(event)=>{
            event.preventDefault();

            const database = firebase.database();
            const ref = database.ref("contents");

            let see_content_count = childSnapshot_arr[x].val().see_content_count+1;
            
            // Firebase Realtime Database에 데이터 수정
            ref.child(childSnapshot_arr[x].key).update({
                see_content_count
            })
            .then(function() {
                localStorage.setItem('idx',tbody.children[x].cells[0].innerText);
                location.href="../QnA_read/QnA_read.html";
            })
            .catch(function(error) {
            console.error("데이터 변경 중 오류가 발생했습니다.", error);
            });

            
        })
    }
}

// 검색시 페이징
function search_paging(array) {
    const paging_btn_wrap = document.querySelector('.paging_btn_wrap');
    paging_btn_wrap.innerHTML='';

    let page_num = (array.length/10)+1;

    for(let x=0; x<Math.floor(page_num); x++){
        paging_btn_wrap.innerHTML+='<a href="#none">'+(x + 1)+'</a>';
    }

    if(array.length<10){
        last_page_search(array, 0);
    }else{
        nomal_print_list_search(array, 0, 10);
    }
    
    const paging_btn = document.querySelectorAll('.paging_btn_wrap>a');
    let firist_list;
    let last_list;
    paging_btn.forEach(e=>{
        e.addEventListener('click',()=>{
            //화면에 보여질 첫번째 번호
            firist_list=(Number(e.innerText)*10)-10;
            last_list=Number(e.innerText)*10;
            //화면에 출력될 목록들
            if(last_list<array.length){
                
                nomal_print_list_search(array, firist_list, last_list);
            }else{
                last_page_search(array, firist_list);
            }
        })
    })
}
function nomal_print_list_search(array, firist_list, last_list){
    //10개씩
    for(let x=0; x<array.length; x++){
        array[x].setAttribute('style','display:none');
    }
    for(let x=firist_list; x<last_list; x++){
        array[x].setAttribute('style','');
    }
}
function last_page_search(array, firist_list){
    
    for(let x=0; x<array.length; x++){
        array[x].setAttribute('style','display:none');
    }
    for(let x=firist_list; x<array.length; x++){
        array[x].setAttribute('style','');
    }
}

// 초기 페이징
async function paging(tbody){
    const paging_btn_wrap = document.querySelector('.paging_btn_wrap');
    paging_btn_wrap.innerHTML='';

    let page_num = (tbody.children.length/10)+1;

    if(page_num>Math.floor(page_num)){
        for(let x=0; x<Math.floor(page_num); x++){
            paging_btn_wrap.innerHTML+='<a href="#none">'+(x + 1)+'</a>';
        }
    }else{
        for(let x=0; x<page_num-1; x++){
            paging_btn_wrap.innerHTML+='<a href="#none">'+(x + 1)+'</a>';
        }
    }

    const paging_btn = document.querySelectorAll('.paging_btn_wrap>a');
    let firist_list;
    let last_list;
    
    load_print_list(tbody);

    paging_btn.forEach(e=>{
        
        e.addEventListener('click',()=>{
            //화면에 보여질 첫번째 번호
            firist_list=(Number(e.innerText)*10)-10;
            last_list=Number(e.innerText)*10;
            //화면에 출력될 목록들
            if(last_list<tbody.children.length){
                nomal_print_list(tbody, firist_list, last_list);
            }else{
                last_page(tbody, firist_list);
            }
        })
    })
}

function load_print_list(tbody){
    for(let x=0; x<10; x++){
        if(tbody.children[x]!=undefined)
        tbody.children[x].style.display='';
    }
}

//1~끝의 전까지
function nomal_print_list(tbody, firist_list, last_list){
    //10개씩
    for(let x=0; x<tbody.children.length; x++){
        tbody.children[x].setAttribute('style','display:none');
    }
    for(let x=firist_list; x<last_list; x++){
        tbody.children[x].setAttribute('style','');
    }
}

//끝페이지
function last_page(tbody, firist_list){
    //10개씩
    
    for(let x=0; x<tbody.children.length; x++){
        tbody.children[x].style.display='none';
    }
    for(let x=firist_list; x<tbody.children.length; x++){
        tbody.children[x].style.display='';
    }
}