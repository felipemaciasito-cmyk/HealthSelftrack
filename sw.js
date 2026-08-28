const CACHE = "pdm-v3";

self.addEventListener("install", e => {
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.map(k => caches.delete(k))))
  );
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  // Ne pas mettre en cache — toujours aller chercher sur le réseau
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
