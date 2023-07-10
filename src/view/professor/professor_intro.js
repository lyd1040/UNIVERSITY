window.onload=()=>{
    API_load();
    Img_move();
}

function API_load(){
    const img_list = document.querySelectorAll('.professor_img>a>img');

    fetch('professor.json')
    .then(response => response.json()) // 응답 데이터를 JSON 형식으로 변환
    .then(data => {
        // 데이터 처리
        
        img_list.forEach((e,idx)=>{
            e.addEventListener('click',()=>{
                info_transfer(e,data[idx]);
            })
        })
    })
    .catch(error => {
        // 에러 처리
        console.log(error);
    });
}

/* 이미지 데이터 정보들 출력 */
function info_transfer(img, img_data){
    const big_img = document.querySelector('.professor_big_img_box>img');
    const basic_intro_contents = document.querySelectorAll('.basic_intro_contents>div');
    const array_obj = change_object(img_data);
    const carrer_container = document.querySelector('.carrer_container');
    let carrer_f = carrer_filter(array_obj);
    

    /* 이미지 바꾸기 */
    big_img.setAttribute('src',img_data.img);
    /* 정보 바꾸기 */
    basic_intro_contents.forEach((e,idx)=>{
        e.innerHTML=array_obj[idx].value;
    })
    /* 경력바꾸기 */
    carrer_container.innerHTML='';
    for(let x=0; x<carrer_f.length; x++){
        carrer_container.innerHTML+=`<li>${carrer_f[x]}</li>`;
    }

}

/* 객체를 배열로 바꾸기 */
function change_object(item_list){
      const arr = Object.keys(item_list).map(key => ({
        value: item_list[key]
      }));
      
      return arr;
}

function carrer_filter(item_list){
    let arr=[];
    for(let x=7; x<item_list.length; x++){
        if(item_list[x].value!='')
            arr.push(item_list[x].value);
    }

    return arr;
}


/* 이미지 움직이기 */
function Img_move(){
    let count =0;
    let accumulate_width=0;
    let window_width = window.innerWidth;
    let li_width = 150;
    let maxCount;
    

    const prev_btn = document.querySelector('.prev');
    const next_btn = document.querySelector('.next');
    const move_photo_wrap = document.querySelector('.move_photo_wrap');
    const professor_img_list = document.querySelectorAll('.professor_img img');

    

    window.addEventListener('resize',()=>{
        window_width = window.innerWidth;
        count=0;
        accumulate_width=0;
        move_photo_wrap.style.transform='translateX(0)';
    })

        prev_btn.addEventListener('click',()=>{
            if(count>0 && window_width<1050){
                accumulate_width+=li_width;
                move_photo_wrap.style.transform='translateX('+accumulate_width+'px)';
                count--
            }
        })
        next_btn.addEventListener('click',()=>{
            maxCount = professor_img_list.length - Math.floor(window_width / 150);
            if(count<maxCount && window_width<1050){
                accumulate_width-=li_width;
                move_photo_wrap.style.transform='translateX('+accumulate_width+'px)';
                count++;
            }
        })
}
