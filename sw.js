const CACHE_NAME = "my-budget-v34";
const BASE = "/Monthly-Budget/";
const APP_SHELL = [BASE, BASE+"index.html", BASE+"config.js", BASE+"manifest.json", BASE+"icons/icon-192.png", BASE+"icons/icon-512.png"];
self.addEventListener("install", event => event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(APP_SHELL)).then(() => self.skipWaiting())));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", event => { const r=event.request, u=new URL(r.url); if(r.method!=="GET" || u.origin!==self.location.origin) return; event.respondWith(fetch(r,{cache:"no-store"}).then(res=>{if(res.ok){const copy=res.clone(); caches.open(CACHE_NAME).then(c=>c.put(r,copy)).catch(()=>{});} return res;}).catch(()=>caches.match(r).then(x=>x || (r.mode==="navigate" ? caches.match(BASE+"index.html") : undefined)))); });
