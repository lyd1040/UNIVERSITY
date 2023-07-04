window.addEventListener('load',()=>{
    ch_table()
    accordion()
    silde_contents()
})


/* 교육과정표, 교과목소개 슬라이드 */

function silde_contents(){
    let contents_names = document.querySelectorAll('.contents_names>h3');
    let contents = document.querySelector('.contents_wrap');
    let contents_two = document.querySelectorAll('.contents_wrap>ul')[1];
    let move_x;

    
    contents_names.forEach(e=>{
        e.addEventListener('click',()=>{
            for(let x=0; x<contents_names.length; x++){
                contents_names[x].children[0].classList.remove('active');
            }
            if(e.classList.contains('clum_table')){
                e.children[0].classList.add('active');
                contents.style.transform='translateX(-11%)';
                
            }else{
                e.children[0].classList.add('active');
                move_x = contents.clientWidth-contents_two.clientWidth
                contents.style.transform='translateX(calc(-11% + '+(-move_x)+'px))';
            }
        })
    })
}

/* 테이블 교체 */
function ch_table(){
    let contents_item = document.querySelectorAll('.contents_item');

    contents_item.forEach(e=>{
        e.children[0].addEventListener('click',()=>{
            for(let x of contents_item){
                x.classList.add('active');
            }
            e.classList.remove('active');
        })
    })
}

/* 교과목소개 아코디언 */
function accordion(){
    let grade_list = document.querySelectorAll('.contents_intro>li');

    grade_list.forEach(e=>{
        e.children[0].addEventListener('click',()=>{
            for(let x of grade_list){
                x.classList.remove('active');
            }
            e.classList.add('active');
        })
    })
}