const V = 'evently-v2';
const SHELL = [
  '/',
  '/index.html',
  '/firebase-config.js',
  '/manifest.webmanifest',
  '/buque.png',
  '/buque-claro.png',
  '/icon-192.png',
  '/icon-512.png'
];

// Pre-cache the app shell so its interface can open without a network connection.
self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(V)
      .then(cache => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

// Remove outdated caches before allowing this worker to control open pages.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys => Promise.all(keys.filter(key => key != V).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);

  if (request.method != 'GET') return;

  const sameOrigin = url.origin == location.origin;
  const firebaseSdk = url.hostname == 'www.gstatic.com' && url.pathname.startsWith('/firebasejs/');

  if (!sameOrigin && !firebaseSdk) return;

  // Keep the latest app document cached and fall back to it when navigation is offline.
  if (request.mode == 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const cachedResponse = response.clone();
          caches.open(V).then(cache => cache.put('/index.html', cachedResponse));
          return response;
        })
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Serve cached assets immediately, refreshing the cache in the background.
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      const networkResponse = fetch(request)
        .then(response => {
          if (response.ok) {
            const responseToCache = response.clone();
            caches.open(V).then(cache => cache.put(request, responseToCache));
          }
          return response;
        })
        .catch(() => cachedResponse);

      return cachedResponse || networkResponse;
    })
  );
});
