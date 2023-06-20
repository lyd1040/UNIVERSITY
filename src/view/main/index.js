window.onload=()=>{
    banner_animation();
    first_contents();
    second_contents();
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

    specialty_list_items.forEach(e=>{
        e.addEventListener('mouseover',()=>{
            e.classList.add('active');
        });

        e.addEventListener('mouseout',()=>{
            first_contents_rm_class(specialty_list_items);
        })
    })
}

function first_contents_rm_class(arr){
    for(let x=0; x<arr.length; x++){
        arr[x].classList.remove('active');
    }
}


/****** 두 번째 컨텐츠(갤러리) ******/
function second_contents(){
    let gallery_img_perv_btn = document.querySelector('.gallery_img_perv_btn');
    let gallery_img_next_btn = document.querySelector('.gallery_img_next_btn');
    let count=0;

    gallery_img_next_btn.addEventListener('click',()=>{
        count = gallery_left_move(count);
    })

    gallery_img_perv_btn.addEventListener('click',()=>{
        count = gallery_right_move(count);
    })
}

function gallery_left_move(count){
    let show_gallery_img_ul = document.querySelector('.show_gallery>ul');
    let show_gallery_img_items = document.querySelectorAll('.show_gallery_img>li');
    let result = result_();

    if(count<show_gallery_img_items.length-1){
        gallery_rm_class(show_gallery_img_items);
        count++;

        console.log(result)

        gallery_add_class(count, show_gallery_img_items);
        show_gallery_img_ul.style.transform='translateX(calc('+(-1 * result.sum)+'px + '+(-50 * result.index)+'px))';
        
    }

    return count;
}

function gallery_right_move(count){
    let show_gallery_img_ul = document.querySelector('.show_gallery_img');
    let show_gallery_img_items = document.querySelectorAll('.show_gallery_img>li');
    let result;

    if(count>0){
        gallery_rm_class(show_gallery_img_items);

        count--;

        gallery_add_class(count, show_gallery_img_items);

        result = result_();
        show_gallery_img_ul.style.transform='translateX(calc('+ result.sum +'px + '+(50 * result.index)+'px))';
    }
    return count;
}

//클래스 더하기
function gallery_add_class(count, arr){
    for(let x=0; x<arr.length; x++){
        if(x==count){
            arr[x].classList.add('active');
            return arr[x].clientWidth;
        }
    }
    
}
//클래스 지우기
function gallery_rm_class(arr){
    for(let x=0; x<arr.length; x++){
        arr[x].classList.remove('active');
    }
}

//ul을 움직이기 위한 result 값
function result_(){
    let show_gallery_img_items = document.querySelectorAll('.show_gallery_img>li');
    let sum=0;
    let index=0;

    for(let x=0; x<show_gallery_img_items.length; x++){
        sum+=show_gallery_img_items[x].clientWidth;
        index=x+1;
        if(show_gallery_img_items[x].classList.contains('active'))
            break;
    }
    return {
        sum,
        index
    }
}