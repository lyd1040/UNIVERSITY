window.addEventListener('load',()=>{
    banner_animation();
    first_contents();
})

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
