const CACHE_NAME = "my-budget-v32";
const APP_SHELL = ["./","./index.html","./config.js","./manifest.json","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(APP_SHELL)).then(() => self.skipWaiting())));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", event => {
  const r = event.request; if (r.method !== "GET") return;
  const u = new URL(r.url); if (u.origin !== self.location.origin) return;
  event.respondWith(fetch(r, {cache:"no-store"}).then(res => { if(res.ok) caches.open(CACHE_NAME).then(c=>c.put(r,res.clone())); return res; }).catch(() => r.mode === "navigate" ? caches.match("./index.html") : caches.match(r)));
});
