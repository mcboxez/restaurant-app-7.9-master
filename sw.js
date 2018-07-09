self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('app-names').then(function(cache) {
            return cache.addAll([
                '/',
                'js/main.js',
                'css/styles.css',
                'img/.1jpg',
                'img/.2jpg',
                'img/.3jpg',
                'img/.4jpg',
                'img/.5jpg',
                'img/.6jpg',
                'img/.7jpg',
                'img/.8jpg',
                'img/.9jpg',
                'img/.10jpg',
                'js/dbhelper.js',
                'data/restaurants.json',
            
            ]);
        })
    );
});



self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                // 遍历所有的缓存
                cacheNames.filter((cacheName) => {
                    return cacheName != staticCacheName;
                }).map((cacheName) => {
                    // 删掉与当前缓存名不同的缓存
                    return caches.delete(cacheName);
                })
            );
        })
    );
});


self.addEventListener('fetch', function(event) {
    console.log(event);
    event.respondWith(
        caches.match(event.request).then(function(response) {
        // 如果在缓存中找到，直接返回缓存的数据；否则，通过 fetch 获取
            return response || fetch(event.request);
        })
    );
});