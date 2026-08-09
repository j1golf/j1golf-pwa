
const CACHE="jone-golf-v1";
const ASSETS=["/","/index.html","/profile.html","/lesson.html","/program.html","/tour.html","/booking.html","/styles.css","/app.js","/manifest.webmanifest","/assets/icon-192.png","/assets/icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{
  e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r;}).catch(()=>caches.match(e.request)));
});
