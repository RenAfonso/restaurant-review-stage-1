// service worker variables. The big array below takes into account all possible screen resolutions.
let version = 'r-reviews-v1-'
let cachedArray = [
    '/',
    './index.html',
    './restaurant.html',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/css/rwd.css',
    '/css/styles.css',
    '/data/restaurants.json',
    '/img/big1.jpg',
    '/img/big1@2x.jpg',
    '/img/big2.jpg',
    '/img/big2@2x.jpg',
    '/img/big3.jpg',
    '/img/big3@2x.jpg',
    '/img/big4.jpg',
    '/img/big4@2x.jpg',
    '/img/big5.jpg',
    '/img/big5@2x.jpg',
    '/img/big6.jpg',
    '/img/big6@2x.jpg',
    '/img/big7.jpg',
    '/img/big7@2x.jpg',
    '/img/big8.jpg',
    '/img/big8@2x.jpg',
    '/img/big9.jpg',
    '/img/big9@2x.jpg',
    '/img/big10.jpg',
    '/img/big10@2x.jpg',
    '/img/small1.jpg',
    '/img/small1@2x.jpg',
    '/img/small2.jpg',
    '/img/small2@2x.jpg',
    '/img/small3.jpg',
    '/img/small3@2x.jpg',
    '/img/small4.jpg',
    '/img/small4@2x.jpg',
    '/img/small5.jpg',
    '/img/small5@2x.jpg',
    '/img/small6.jpg',
    '/img/small6@2x.jpg',
    '/img/small7.jpg',
    '/img/small7@2x.jpg',
    '/img/small8.jpg',
    '/img/small8@2x.jpg',
    '/img/small9.jpg',
    '/img/small9@2x.jpg',
    '/img/small10.jpg',
    '/img/small10@2x.jpg'
];


// installation of service worker as per service work lesson, creates cache r-reviews-v1-core with the content of the above array
self.addEventListener('install', function(event) {
    console.log('installing worker');
    event.waitUntil(caches.open(version + 'core')
        .then(function(cache) {
            return cache.addAll(cachedArray);
        })
        .then(function() {
            console.log('installation complete');
        })
    );
});

// fetches the network for updates
self.addEventListener('fetch', function(event) {
    console.log('fetching');
    
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
});

// deletes old cache, as per service worker lesson (note: I decided to keep this as it isn't a project rubric but seemed relevant)
self.addEventListener('activate', function(event) {
    console.log('activating');
    
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('r-reviews-') && cacheName != version;
                }).map(function(cacheName) {
                    return cache.delete(cacheName);
                })
            )
        }).catch(function (error) {
            // on first run, it should log this error
            console.log('no cache to delete');
            return
        })
    );
});