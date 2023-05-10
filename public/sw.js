var cacheName = 'v1:static';

self.addEventListener('install', function (e) {
  // once the SW is installed, go ahead and fetch the resources to make this work offline
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(['./']).then(function () {
        self.skipWaiting();
      });
    })
  );
});
self.addEventListener('fetch', function (event) {
  // either respond with the cached object or go ahead and fetch the actual url
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        // retrieve from cache
        return response;
      }
      // fetch as normal
      return fetch(event.request);
    })
  );
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(function (err) {
    console.warn('Error whilst registering service worker', err);
  });
}
