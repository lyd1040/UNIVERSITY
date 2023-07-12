window.addEventListener('load',()=>{
    firebaseauthentication();
    loading_show();
})

function firebaseauthentication(){
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const loginBtn = document.getElementById('login-btn');

    // 로그인 버튼 클릭 이벤트 처리
    loginBtn.addEventListener('click', function() {
        const email = emailInput.value;
        const password = passwordInput.value;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(userCredential) {
        // 로그인 성공
        const user = firebase.auth().currentUser;
        if (user) {
            sessionStorage.setItem('admin-uid',user.uid);
        } else {
          console.log("No user is currently logged in.");
        }
        history.back();
        })
        
        .catch(function(error) {
        // 로그인 실패
        console.log(error);
        });
    });

}

function loading_show(){
    const loginBtn = document.getElementById('login-btn');
}