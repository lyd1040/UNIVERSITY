window.onload=()=>{
    show_hide_header();
}

function show_hide_header(){
    let gnb_contents_name = document.querySelectorAll('.gnb_contents_name');
    let gnb_show_hide_btn = document.querySelector('.show_hide_gnb_btn');
    let school_kr_name = document.querySelector('.school_kr_name');
    let gnb_container = document.querySelector('.gnb_container');
    let logo_text_box_text = document.querySelectorAll('.logo_text_box a');

    gnb_contents_name.forEach(e=>{
        e.addEventListener('mouseover',()=>{
            document.querySelector('.header_contents_right').classList.add('active');
        })
        e.addEventListener('mouseout',()=>{
            document.querySelector('.header_contents_right').classList.remove('active');
        })

        e.children[0].addEventListener('click',()=>{
            for(let x=0; x<gnb_contents_name.length; x++){
                gnb_contents_name[x].children[0].classList.remove('click_active');
            }
            e.children[0].classList.add('click_active');
        })
    })


    console.log(logo_text_box_text);

    gnb_show_hide_btn.addEventListener('click',()=>{
        gnb_show_hide_btn.classList.toggle('active');
        

        if(gnb_show_hide_btn.classList.contains('active')){
            school_kr_name.classList.add('active');
 /*            
            school_kr_name.style.fontSize='2em';
            school_kr_name.style.transform='translateY(10px)';
            school_kr_name.children[0].animate({color:'#fff'},300);
            setTimeout(()=>{school_kr_name.children[0].style.color='#fff'},300);
 */
            gnb_container.classList.add('active');
            gnb_show_hide_btn.innerHTML='<i class="fa-solid fa-x"></i>';
        }else{
            school_kr_name.classList.remove('active');
/*             
            school_kr_name.style.fontSize='1.2em';
            school_kr_name.style.transform='translateY(0px)';
            school_kr_name.children[0].style.color='#000'
 */
            gnb_container.classList.remove('active');
            gnb_show_hide_btn.innerHTML='<i class="fa-solid fa-bars"></i>';
        }
    })
    console.log(gnb_contents_name);
}