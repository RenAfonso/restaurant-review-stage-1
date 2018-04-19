let version = 'restaurant-reviews-v1'
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

self.addEventListener("install", function(event) {
    console.log('installing worker');
    event.waitUntil(caches.open(version + 'fundamentals')
        .then(function(cache) {
            return cache.addAll(cachedArray);
        })
        .then(function() {
            console.log('installation complete');
        })
    );
});

self.addEventListener("fetch", function(event) {
    console.log('fetching');
    if (event.request.method !== 'GET') {
        console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
        return;
    }

    event.respondWith(
        caches.match(event.request).then(function(cached) {
            let networked = fetch(event.request)
                .then(fetchedFromNetwork, unableToResolve)
                .catch(unableToResolve);
            console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);
            return cached || networked;
  
            function fetchedFromNetwork(response) {

                let cacheCopy = response.clone();
  
                console.log('WORKER: fetch response from network.', event.request.url);
  
                caches.open(version + 'pages').then(function add(cache) {
                /* We store the response for this request. It'll later become
                   available to caches.match(event.request) calls, when looking
                   for cached responses.
                */
                    cache.put(event.request, cacheCopy);
                })
                .then(function() {
                    console.log('WORKER: fetch response stored in cache.', event.request.url);
                });
  
                return response;
            }
  
            function unableToResolve () {
            /* There's a couple of things we can do here.
               - Test the Accept header and then return one of the `offlineFundamentals`
                 e.g: `return caches.match('/some/cached/image.png')`
               - You should also consider the origin. It's easier to decide what
                 "unavailable" means for requests against your origins than for requests
                 against a third party, such as an ad provider
               - Generate a Response programmaticaly, as shown below, and return that
            */
  
                console.log('WORKER: fetch request failed in both cache and network.');
  
            /* Here we're creating a response programmatically. The first parameter is the
               response body, and the second one defines the options for the response.
            */
                return new Response('Page load has failed');
            }
        })
    );
});