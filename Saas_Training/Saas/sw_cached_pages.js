const cacheName = 'v1';

const cacheAssets = [
    '/dist/index.html',
    '/scss/main.scss',
    '/js/main.js'
];

//Call install event
self.addEventListener('install',(e)=>{
    console.log('Service worker: installed');
    e.waitUntil(
        caches.open(cacheName)
        .then(cache =>{
            console.log('Service worker: Caching files');
            cache.addAll(cacheAssets);
        })
        .then(()=>self.skipWaiting())
    )
})

//call activate event
self.addEventListener('activate',(e)=>{
    console.log('Service worker: activated');
    //Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache != cacheName){
                         console.log("Service Worker clearing: old cache");
                         return caches.delete(cache);
                    }
                })
            )
        })
    )
})

//call fetch event
self.addEventListener('fetch',e=>{
    console.log('Service worker: Fetching');
    e.respondWith(
        fetch(e.request).catch(()=> catches.match(e.re))
    )
})