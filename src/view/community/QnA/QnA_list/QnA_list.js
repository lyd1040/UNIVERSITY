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


    // .once 데이터를 한번만 읽어옴 
    ref.once("value")
    .then(snapshot => {
        let tbody = document.querySelector('.contents>table>tbody');

        // tbody 내용 초기화
        tbody.innerHTML = ''; 
        snapshot.forEach(childSnapshot=> {
            let childData = childSnapshot.val();
            // 추가로 작업 수행
            add_table_list(childData, tbody, snapshot)
        });
    })
    .catch(error => {
        console.error("데이터 불러오기 중 오류가 발생했습니다.", error);
    });
}


//테이블 리스트 생성
function add_table_list(childData, tbody, snapshot){
    // tbody 내용작성 
    let tbody_content = document.createElement('tr');
    tbody_content.setAttribute('style','display:none');
    // 번호 작성
    let idx_th = document.createElement('th');
    let idx_th_contents = document.createTextNode(childData.idx);
    // 제목 작성
    let QnA_title_th = document.createElement('th');

    //제목 링크 작성
    let QnA_title_a = document.createElement('a');
    let QnA_title_a_contents = document.createTextNode(childData.QnA_title);
    QnA_title_a.setAttribute('href','../QnA_read/QnA_read.html');

    // 작성자 작성
    let writer_th = document.createElement('th');
    let writer_th_contents = document.createTextNode(childData.writer);
    // 등록일 작성
    let today_date_th = document.createElement('th');
    let today_date_th_contents = document.createTextNode(childData.today_date);
    // 조회수 작성
    let see_content_count_th = document.createElement('th');
    let see_content_count_th_contents = document.createTextNode(childData.see_content_count);

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

    paging(tbody);
    click_a(tbody);
    search(tbody, snapshot);
}

/* 검색 */
function search(tbody, snapshot){
    const searchBtn = document.querySelector('.searchBtn');
    const search_input = document.getElementById('search');
    const select_option = document.getElementById('search_kind');
    let childData = [];
    snapshot.forEach(childSnapshot=>{
        childData.push(childSnapshot.val());
    })
    
    console.log(childData)
    searchBtn.addEventListener('click',()=>{
        if(select_option.value === '제목'){
            childData.forEach(e=>{
                console.log(e.QnA_title.matchAll(search_input.value));
            })
        }else if(select_option.value === '내용'){

        }else{
        }
    })

    
}

//클릭시 해당 인덱스 로컬스토리지 저장
function click_a(tbody){
    for(let x=0; x<tbody.children.length; x++){
        tbody.children[x].cells[1].children[0].addEventListener('click',()=>{
            localStorage.setItem('idx',tbody.children[x].cells[0].innerText);
        })
    }
}


// 페이징
function paging(tbody){
    const paging_btn_wrap = document.querySelector('.paging_btn_wrap');
    paging_btn_wrap.innerHTML='';

    let page_num = (tbody.children.length/10)+1;

    for(let x=0; x<Math.floor(page_num); x++){
        paging_btn_wrap.innerHTML+='<a href="#none">'+(x + 1)+'</a>';
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
    console.log(firist_list);
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