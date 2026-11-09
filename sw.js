const V='evently-v1',SHELL=['/','/index.html','/firebase-config.js','/manifest.webmanifest','/icon.svg','/icon-192.png','/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!='GET')return;
 const same=u.origin==location.origin,sdk=u.hostname=='www.gstatic.com'&&u.pathname.startsWith('/firebasejs/');
 if(!same&&!sdk)return;
 if(r.mode=='navigate'){e.respondWith(fetch(r).then(x=>{const c=x.clone();caches.open(V).then(h=>h.put('/index.html',c));return x}).catch(()=>caches.match('/index.html')));return}
 e.respondWith(caches.match(r).then(hit=>{const net=fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(h=>h.put(r,c))}return x}).catch(()=>hit);return hit||net}))});
