window.onload=()=>{
    show_hide_header();
}

function show_hide_header(){
    let gnb_contents_name = document.querySelectorAll('.gnb_contents_name');

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

    console.log(gnb_contents_name);
}