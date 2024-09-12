// You can change the number on the end of the site to refresh the cache
const CACHE_NAME = 'my-site-v1';

// add all your files in the CACHE_URLS
const CACHE_URLS = ['/',
  'cssdemo.css',
  'cssdemo.html',
  'demos.html',
  'holding.html',
  'index.html',
  'qualifications.html',
  'interest.html',
  'styles.css',
  'manifest.json',
  '404.html',
  'images/star.webp',
  'images/star.jpg',
  'images/sketch.jpg',
  'images/painting.jpg',
  'images/new1.jpg',
  'images/music.jpg',
  'images/j_deafult.svg',
  'images/j_4.svg',
  'images/j_3.svg',
  'images/j_2.svg',
  'images/dubai.webp',
  'images/dubai.jpg',
  'images/crocheting.jpg',
  'images/cherry.webp',
  'images/c_default.svg',
  'images/c_4.svg',
  'images/c_3.svg',
  'images/c_2.svg',
  'images/blue.webp',
  'images/window.webp',
  'images/grass.webp',
  'images/map.webp',
  'images/me.webp'


];
//DO NOT change any of the code below

self.addEventListener("install", function (event) {
  console.log("Service worker installed");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log("Cache opened");
        return cache.addAll(CACHE_URLS);
      })
  );
});


self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName.startsWith('my-site-') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        console.log(`Return ${event.request.url} from cache`);
        return response;
      }
      console.log(`Fetch ${event.request.url} from network`);
      return fetch(event.request);
    })
  );
});
