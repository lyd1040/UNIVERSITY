window.onload=()=>{
    let banner = document.querySelector('.banner');
    let banner_slide_contents = document.querySelectorAll('.banner_slide_contents');

    console.log(banner_slide_contents.length);
    setTimeout(()=>{

        for(let x=0; x<banner_slide_contents.length; x++){
            banner_slide_contents[x].style.display='block';
        }

        banner.classList.add('active');
    },400)
}