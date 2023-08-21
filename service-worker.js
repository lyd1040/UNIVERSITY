// service-worker.js

// 서비스 워커 설치 및 캐싱 로직 등록
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/script.js',
                '/images/icon.png'
            ]);
        })
    );
});

// 서비스 워커 활성화 및 캐싱 로직 적용
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});