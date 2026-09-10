/* ============================================================
   Service worker — o que faz o app "instalar" no celular (PWA)
   ------------------------------------------------------------
   Regra de ouro aqui: NUNCA guardar em cache as chamadas ao
   Supabase nem a bibliotecas de fora. Só os arquivos do próprio
   app — e mesmo esses, sempre tentando a internet primeiro, pra
   nunca ficar com código velho preso.
   ============================================================ */

var CACHE = "cleri-alves-v23";

/* Arquivos do app que valem a pena guardar pra abrir offline / rápido. */
var SHELL = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/supabase.js",
  "./js/seed.js",
  "./js/store.js",
  "./js/app.js",
  "./manifest.json",
  "./assets/logo-mark.png",
  "./assets/logo-lockup.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(SHELL); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (nomes) {
      return Promise.all(nomes.map(function (n) {
        if (n !== CACHE) return caches.delete(n);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;

  /* Só cuidamos de GET do próprio app. Supabase, CDN e fontes passam direto. */
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) {
    return;
  }

  /* Internet primeiro; se falhar (offline), usa o que tiver no cache. */
  e.respondWith(
    fetch(req).then(function (resp) {
      var copia = resp.clone();
      caches.open(CACHE).then(function (c) { c.put(req, copia); });
      return resp;
    }).catch(function () {
      return caches.match(req).then(function (hit) {
        return hit || caches.match("./index.html");
      });
    })
  );
});
