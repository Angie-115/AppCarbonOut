const cacheName = 'carbonout-v1';
const assets = [
  '/',
  '/index.html',
  '/login.html',
  '/registro.html',
  '/perfil.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/icons/logo-192.png',
  '/icons/logo-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});
