const cacheName = 'cache-1'
var filesToCache = [
    //root
    '/',
    '/index.html',

    //js
    '/js/',
    '/js/main.js',

    //js/game
    '/js/game/',
    '/js/game/Bubble.js',
    '/js/game/Game.js',
    '/js/game/Map.js',
    '/js/game/LoadingPage.js',
    '/js/game/Part.js',
    '/js/game/Player.js',

    //js/lib
    '/js/lib/',
    '/js/lib/Angle.js',
    '/js/lib/Animation.js',
    '/js/lib/Animations.js',
    '/js/lib/AssetsBank.js',
    '/js/lib/Component.js',
    '/js/lib/EventComponent.js',
    '/js/lib/FileLoader.js',
    '/js/lib/ImgComponent.js',
    '/js/lib/Scene.js',
    '/js/lib/Size.js',
    '/js/lib/Source.js',
    '/js/lib/Vector.js',

    //assets/font
    '/assets/font/',
    '/assets/font/soupofjustice.ttf',

    //assets/img
    '/assets/img/',

    //assets/manifest
    '/assets/manifest/',
    '/assets/manifest/assets.json',
    '/assets/manifest/conf.json',
    '/assets/manifest/levels.json'
]

/**
 * 
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(filesToCache)
        })
    )
})

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            return res || fetch(e.request)
        })
    )
})

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter((name) => {
                    name != cacheName
                }).map((cacheName) => {
                    return caches.delete(cacheName)
                })
            )
        })
    )
})
 */

self.addEventListener('fetch', (e) => {
    e.respondWith(fetch(e.request))
})