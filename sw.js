const CACHE="my-budget-v3-2";
const ASSETS=[
  "./",
  "./index.html",
  "./config.js",
  "./manifest.json"
];

self.addEventListener("install",event=>{
  event.waitUntil(
    caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys().then(keys=>Promise.all(
      keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))
    )).then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  const req=event.request;
  if(req.method!=="GET") return;

  const url=new URL(req.url);

  // Never cache the Google Apps Script API.
  if(url.hostname.includes("script.google.com")) return;

  event.respondWith(
    fetch(req).then(response=>{
      const copy=response.clone();
      caches.open(CACHE).then(cache=>cache.put(req,copy));
      return response;
    }).catch(()=>caches.match(req).then(r=>r||caches.match("./index.html")))
  );
});