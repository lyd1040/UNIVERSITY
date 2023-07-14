window.addEventListener('load',()=>{
    firebaseauthentication();
    show_loadgin();
})
function show_loadgin(){
    const loginBtn = document.getElementById('login-btn');
    const loding = document.getElementById('loding');
    loginBtn.addEventListener('click', () =>{
        loding.style.display='flex';
    })
}

function firebaseauthentication(){
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const loginBtn = document.getElementById('login-btn');
    const loding = document.getElementById('loding');

    // 로그인 버튼 클릭 이벤트 처리
    loginBtn.addEventListener('click', () =>{
        
        const email = emailInput.value;
        const password = passwordInput.value;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
        // 로그인 성공
        const user = firebase.auth().currentUser;
        if (user) {
            sessionStorage.setItem('admin-uid',user.uid);
        } else {
            loding.style.display='none';
            console.log("No user is currently logged in.");
        }
        history.go(-1);
        })
        
        .catch(error=> {
        // 로그인 실패
        loding.style.display='none';
        console.log(error);
        });
    });

}