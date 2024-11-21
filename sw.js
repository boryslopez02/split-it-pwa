const CACHE_NAME = 'splitit-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './index2.html',
  './register.html',
  './manifest.json',
  './assets/css/style.css',
  './assets/js/core/popper.min.js',
  './assets/js/core/bootstrap.min.js',
  './assets/js/plugins/perfect-scrollbar.min.js',
  './assets/js/material-kit.min.js',
  './assets/img/android-chrome-192x192.png',
  './assets/img/android-chrome-512x512.png'
];

// Instalar el Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activar el Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

// Interceptar solicitudes de red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
