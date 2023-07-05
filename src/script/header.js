
show_hide_header();
login_logout();
LogOutEvt();
function login_logout(){
    let loginBtn = document.querySelector('.loginBtn');
    let logoutBtn = document.querySelector('.logoutBtn');

        loginBtn.classList.remove('screen_out');
        logoutBtn.classList.remove('screen_out');

        if(sessionStorage.getItem('admin-uid')){
            loginBtn.classList.add('screen_out');
        }else{
            logoutBtn.classList.add('screen_out');
        }
}

function LogOutEvt(){
    let logoutBtn = document.querySelector('.logoutBtn');
    
    logoutBtn.addEventListener('click',()=>{
        sessionStorage.removeItem('admin-uid');
        location.reload();
    })
}

function show_hide_header(){
    let gnb_contents_name = document.querySelectorAll('.gnb_contents_name');
    let school_en_name = document.querySelector('.school_en_name');
    let gnb_show_hide_btn = document.querySelector('.show_hide_gnb_btn');
    let school_kr_name = document.querySelector('.school_kr_name');
    let gnb_container = document.querySelector('.gnb_container');
    let logo_text_box_text = document.querySelectorAll('.logo_text_box a');
    let gnb = document.querySelectorAll('.gnb a');

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


    gnb.forEach((el,idx) =>{
        el.addEventListener('focus',()=>{
            document.querySelector('.header_contents_right').classList.add('active');
        })
    })
    

    gnb_show_hide_btn.addEventListener('click',()=>{
        gnb_show_hide_btn.classList.toggle('active');
        

        if(gnb_show_hide_btn.classList.contains('active')){
            school_kr_name.classList.add('active');
            school_en_name.classList.add('active');
            gnb_container.classList.add('active');
            gnb_show_hide_btn.innerHTML='<i class="fa-solid fa-x"></i>';
        }else{
            school_kr_name.classList.remove('active');
            school_en_name.classList.remove('active');
            gnb_container.classList.remove('active');
            gnb_show_hide_btn.innerHTML='<i class="fa-solid fa-bars"></i>';
        }
    })
}