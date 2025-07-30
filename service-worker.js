const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/0/', // Root page
  '/0/index.html',
  '/0/style.css',
  '/0/app.js',
  '/0/manifest.json',
  '/0/bootstrap.css'
];

self.addEventListener('install', event => {
 event.waitUntil(
  caches.open(CACHE_NAME).then(cache => {
    return cache.addAll(urlsToCache).catch(err => {
      console.error("Cache failed:", err);
    });
  })
);
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
