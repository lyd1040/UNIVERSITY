window.addEventListener('load',()=>{
    loading();
    admin_check();
})

async function loading(){
    await img_load();
}
function admin_check(){
    const contents_wrap_a = document.querySelector('.contents_wrap>a');

    if(!sessionStorage.getItem('admin-uid')){
        contents_wrap_a.style.display='none';
    }
    
}

async function img_load(){
    const storage = firebase.storage();
    const storageRef = storage.ref('uploads');
     // 마지막에만 다음 함수 실행
    let img_arr = [];
    let count =0;
    storageRef.listAll().then(result=> {
      const imageCount = result.items.length;
      // console.log('이미지 개수:', imageCount);
      result.items.forEach(itemRef=> {
          itemRef.getDownloadURL().then(url=> {
            img_arr.push(url);
            count++;

            if(count == imageCount){
                imgDOM(img_arr);
            }
          }).catch(error=> {
            console.log(error);
          });
        });
    }).catch(error=> {
      console.log(error);
    });
}

async function imgDOM(img_arr){
   const img_wrap = await dom_connect(img_arr);
    await pagingBtn(img_wrap);
    click_a(img_wrap);
    await hide_loding();
}
async function dom_connect(img_arr){
    const img_wrap = document.querySelector('.img_wrap');
    for(let x=0; x<img_arr.length; x++){
        //DOM생성
        let img_wrap_li = document.createElement('li');
        img_wrap_li.setAttribute('class','screen_out');

        let img_wrap_li_a = document.createElement('a');
        img_wrap_li_a.setAttribute('href','#none');
        
        let img_element = document.createElement('img');
        img_element.setAttribute('src',img_arr[x]);
        img_element.setAttribute('alt','');

        // DOM 연결
        img_wrap_li_a.appendChild(img_element);

        img_wrap_li.appendChild(img_wrap_li_a);

        img_wrap.appendChild(img_wrap_li);
    }

    return img_wrap;
}


function click_a(img_wrap){
    for(let x=0; x<img_wrap.children.length; x++){
        img_wrap.children[x].children[0].addEventListener('click',()=>{
            show_modal(img_wrap.children[x].children[0]);
        })
    }
}
async function hide_loding(){
    const loding = document.getElementById('loding');

    setTimeout(()=>{loding.style.display='none';},1500  );
    
}

//모달 화면에 띄우기
function show_modal(img_ele){
    let modal = document.getElementById('modal');
    const modal_img = document.querySelector('.modal_contents_center>div:nth-child(1)>img');

    modal.classList.remove('screen_out');

    // 모달 이미지 주소 변경
    modal_img.setAttribute('src',img_ele.children[0].getAttribute('src'));

    hide_modal(modal);
}

function hide_modal(modal){
    const hide_modal = document.getElementById('hide_modal');

    hide_modal.addEventListener('click',(event)=>{
        event.preventDefault(); 
        modal.classList.add('screen_out');
    })
}

// 초기 페이징
async function pagingBtn(img_wrap){

    const paging_btn_wrap = document.querySelector('.pagingBtn');
    paging_btn_wrap.innerHTML='';

    let page_num = (img_wrap.children.length/10)+1;

    if(page_num>Math.floor(page_num)){
        for(let x=0; x<Math.floor(page_num); x++){
            paging_btn_wrap.innerHTML+='<a href="#none">'+(x + 1)+'</a>';
        }
    }else{
        for(let x=0; x<page_num-1; x++){
            paging_btn_wrap.innerHTML+='<a href="#none">'+(x + 1)+'</a>';
        }
    }

    const paging_btn = document.querySelectorAll('.pagingBtn>a');
    let firist_list;
    let last_list;

    load_print_list(img_wrap)

    paging_btn.forEach(e=>{
        
        e.addEventListener('click',()=>{
            //화면에 보여질 첫번째 번호
            firist_list=(Number(e.innerText)*10)-10;
            last_list=Number(e.innerText)*10;

            console.log(e)
            //화면에 출력될 목록들
            if(last_list<=img_wrap.children.length){
                nomal_img_list(img_wrap, firist_list, last_list);
            }else{
                last_page(img_wrap, firist_list);
            }
        })
    })
}

function load_print_list(img_wrap){
    for(let x=0; x<10; x++){
        if(img_wrap.children[x]!=undefined)
        img_wrap.children[x].setAttribute('class','');
    }
}

//1~끝의 전까지
function nomal_img_list(img_wrap, firist_list, last_list){
    //10개씩
    for(let x=0; x<img_wrap.children.length; x++){
        img_wrap.children[x].setAttribute('class','screen_out');
    }
    for(let x=firist_list; x<last_list; x++){
        img_wrap.children[x].setAttribute('class','');
    }
}

//끝페이지
function last_page(img_wrap, firist_list){
    //10개씩
    
    for(let x=0; x<img_wrap.children.length; x++){
        img_wrap.children[x].setAttribute('class','screen_out');
    }
    for(let x=firist_list; x<img_wrap.children.length; x++){
        img_wrap.children[x].setAttribute('class','');
    }
}