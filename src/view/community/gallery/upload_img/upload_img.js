// Firebase Storage 초기화
var storage = firebase.storage();
        
// 파일 첨부 및 확인
function handleFileSelect(event) {
    var file = event.target.files[0];

    // 파일 미리보기
    var preview = document.getElementById('preview');
    var reader = new FileReader();
    reader.onload = e => {
        var img = document.createElement('img');
        img.src = e.target.result;
        preview.innerHTML = '';
        preview.appendChild(img);
    };
    reader.readAsDataURL(file);
    }

// 파일 업로드
function uploadFile() {
        var fileInput = document.getElementById('fileInput');
        var file = fileInput.files[0];

        var storageRef = storage.ref();
        var fileName = file.name;
        var filePath = 'uploads/' + fileName;
        var fileRef = storageRef.child(filePath);

        var uploadTask = fileRef.put(file);

    uploadTask.on('state_changed',
        function(snapshot) {
            // 업로드 상태 모니터링
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('업로드 진행 중: ' + progress + '%');
            },
            function(error) {
            // 업로드 실패
            console.log('업로드 에러:', error);
            },
            function() {
            // 업로드 완료
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                location.href="../show_gallery/show_gallery.html"
            });
        }
    );
}