const CACHE_NAME = "ala-cache-v1";

const urlsToCache = [
  "/PROGRA.ALA/",
  "/PROGRA.ALA/index.html",
  "/PROGRA.ALA/manifest.json",
  "/PROGRA.ALA/icono.png"
];

// INSTALAR SERVICE WORKER
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ACTIVAR
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// FETCH (cuando no hay internet usa cache)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
