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
    })

    console.log(gnb_contents_name);
}