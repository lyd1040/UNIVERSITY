window.addEventListener('load',()=>{
    firebaseauthentication();
})

function firebaseauthentication(){
    var emailInput = document.getElementById('email-input');
    var passwordInput = document.getElementById('password-input');
    var loginBtn = document.getElementById('login-btn');

    // 로그인 버튼 클릭 이벤트 처리
    loginBtn.addEventListener('click', function() {
        var email = emailInput.value;
        var password = passwordInput.value;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(userCredential) {
        // 로그인 성공
        var user = firebase.auth().currentUser;
        if (user) {
            sessionStorage.setItem('admin-uid',user.uid);
        } else {
          console.log("No user is currently logged in.");
        }
        window.location.href = '../main/index.html'; // home.html로 이동
        })
        
        .catch(function(error) {
        // 로그인 실패
        console.log(error);
        });
    });

}