window.addEventListener('load',()=>{
    banner_animation();
    first_contents();
    small_size_browser();
})
window.addEventListener('resize',e=>{
    small_size_browser();
})
window.addEventListener('scroll',()=>{
    let window_height = window.scrollY;
    const main_height_line = document.querySelector('.main_height_line');
    const main_contents_container = document.querySelector('.main_contents_container');

    if(window_height + window_height/2.1 < main_contents_container.clientHeight+10){
        main_height_line.style.height=window_height + window_height/2 +'px';
    }else{
        main_height_line.style.height =main_contents_container.clientHeight;
    }

})

function small_size_browser(){
    let window_width = window.innerWidth;
    const addAttribute = document.querySelectorAll('.banner p a');
    if(window_width<1050){
        addAttribute[0].setAttribute('href', '../curriculum/curriculum_composition/curriculum_composition.html');
        addAttribute[1].setAttribute('href', '../specialty/education/education.html');
        addAttribute[2].setAttribute('href', 'https://jc.woosuk.ac.kr/WoosukEntrance.do');
        addAttribute[3].setAttribute('href', 'https://jc.woosuk.ac.kr/webService.do?menuCode=K16M0426');
    }else{
        addAttribute[0].setAttribute('href', '#none');
        addAttribute[1].setAttribute('href', '#none');
        addAttribute[2].setAttribute('href', '#none');
        addAttribute[3].setAttribute('href', '#none');
    }
}

//배너
function banner_animation(){
    
    let banner = document.querySelector('.banner');
    let banner_slide_contents = document.querySelectorAll('.banner_slide_contents');

    setTimeout(()=>{

        for(let x=0; x<banner_slide_contents.length; x++){
            banner_slide_contents[x].style.display='block';
        }

        banner.classList.add('active');
    },400)
}

/****** 첫번째 컨텐츠(전공) ******/
function first_contents(){
    let specialty_list_items = document.querySelectorAll('.specialty_list>li');
    let select_specialty_imgs = document.querySelectorAll('.select_specialty_img');

    
    specialty_list_items.forEach((e,idx)=>{
        e.addEventListener('mouseover',()=>{
            first_contents_rm_class(specialty_list_items);
            first_contents_add_class(e);

            first_contents_rm_class(select_specialty_imgs);
            first_contents_add_class(select_specialty_imgs[idx]);
        });
    })
}


/* 클래스 지우기 */
function first_contents_rm_class(arr){
    for(let x=0; x<arr.length; x++){
        arr[x].classList.remove('active');
    }
}
function first_contents_add_class(item){
    item.classList.add('active');
}
