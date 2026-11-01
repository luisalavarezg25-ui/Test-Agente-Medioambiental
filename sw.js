// Service worker: guarda la app, los datos y las páginas de los cuadernillos para usarla sin conexión.
const VERSION = "ae6d8518e8";
const CORE = "core-" + VERSION;
const PAGES = "pag-" + VERSION;
const FONTS = "fonts-v1";
const CORE_FILES = ["./", "index.html", "manifest.webmanifest", "preguntas.json", "supuestos.json", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];
const PAGE_FILES = ["pag/2021-AL-14.jpg", "pag/2021-AL-15.jpg", "pag/2021-AL-16.jpg", "pag/2021-AL-17.jpg", "pag/2021-AL-18.jpg", "pag/2021-AL-19.jpg", "pag/2021-AL-20.jpg", "pag/2021-AL-21.jpg", "pag/2021-AL-22.jpg", "pag/2021-AL-23.jpg", "pag/2021-AL-24.jpg", "pag/2021-AL-25.jpg", "pag/2021-AL-26.jpg", "pag/2021-AL-27.jpg", "pag/2021-AL-28.jpg", "pag/2021-PI-11.jpg", "pag/2021-PI-12.jpg", "pag/2021-PI-13.jpg", "pag/2021-PI-14.jpg", "pag/2021-PI-15.jpg", "pag/2021-PI-16.jpg", "pag/2021-PI-17.jpg", "pag/2021-PI-18.jpg", "pag/2021-PI-19.jpg", "pag/2021-PI-20.jpg", "pag/2021-PI-21.jpg", "pag/2021-PI-22.jpg", "pag/2021-PI-23.jpg", "pag/2021-PI-24.jpg", "pag/2021-PI-25.jpg", "pag/2023-AL-15.jpg", "pag/2023-AL-16.jpg", "pag/2023-AL-17.jpg", "pag/2023-AL-18.jpg", "pag/2023-AL-19.jpg", "pag/2023-AL-20.jpg", "pag/2023-AL-21.jpg", "pag/2023-AL-22.jpg", "pag/2023-AL-23.jpg", "pag/2023-AL-24.jpg", "pag/2023-AL-25.jpg", "pag/2023-AL-26.jpg", "pag/2023-AL-27.jpg", "pag/2023-AL-28.jpg", "pag/2023-AL-29.jpg", "pag/2023-AL-30.jpg", "pag/2023-AL-31.jpg", "pag/2023-AL-32.jpg", "pag/2023-AL-33.jpg", "pag/2023-AL-34.jpg", "pag/2023-AL-35.jpg", "pag/2023-AL-36.jpg", "pag/2023-AL-37.jpg", "pag/2023-AL-38.jpg", "pag/2023-AL-39.jpg", "pag/2023-AL-40.jpg", "pag/2023-AL-41.jpg", "pag/2023-AL-42.jpg", "pag/2023-AL-43.jpg", "pag/2023-PI-10.jpg", "pag/2023-PI-11.jpg", "pag/2023-PI-12.jpg", "pag/2023-PI-13.jpg", "pag/2023-PI-14.jpg", "pag/2023-PI-15.jpg", "pag/2023-PI-16.jpg", "pag/2023-PI-17.jpg", "pag/2023-PI-18.jpg", "pag/2023-PI-19.jpg", "pag/2023-PI-20.jpg", "pag/2023-PI-21.jpg", "pag/2023-PI-22.jpg", "pag/2023-PI-23.jpg", "pag/2023-PI-24.jpg", "pag/2023-PI-25.jpg", "pag/2023-PI-26.jpg", "pag/2023-PI-27.jpg", "pag/2023-PI-28.jpg", "pag/2023-PI-29.jpg", "pag/2023-PI-30.jpg", "pag/2023-PI-31.jpg", "pag/2023-PI-32.jpg", "pag/2023-PI-33.jpg", "pag/2023-PI-34.jpg", "pag/2023-PI-35.jpg", "pag/2023-PI-36.jpg", "pag/2023-PI-37.jpg", "pag/2023-PI-38.jpg", "pag/2024-AL-17.jpg", "pag/2024-AL-18.jpg", "pag/2024-AL-19.jpg", "pag/2024-AL-20.jpg", "pag/2024-AL-21.jpg", "pag/2024-AL-22.jpg", "pag/2024-AL-23.jpg", "pag/2024-AL-24.jpg", "pag/2024-AL-25.jpg", "pag/2024-AL-26.jpg", "pag/2024-AL-27.jpg", "pag/2024-AL-28.jpg", "pag/2024-AL-29.jpg", "pag/2024-AL-30.jpg", "pag/2024-AL-31.jpg", "pag/2024-AL-32.jpg", "pag/2024-AL-33.jpg", "pag/2024-AL-34.jpg", "pag/2024-AL-35.jpg", "pag/2024-AL-36.jpg", "pag/2024-PI-11.jpg", "pag/2024-PI-12.jpg", "pag/2024-PI-13.jpg", "pag/2024-PI-14.jpg", "pag/2024-PI-15.jpg", "pag/2024-PI-16.jpg", "pag/2024-PI-17.jpg", "pag/2024-PI-18.jpg", "pag/2024-PI-19.jpg", "pag/2024-PI-20.jpg", "pag/2024-PI-21.jpg", "pag/2024-PI-22.jpg", "pag/2024-PI-23.jpg", "pag/2024-PI-24.jpg", "pag/2024-PI-25.jpg", "pag/2024-PI-26.jpg", "pag/2024-PI-27.jpg", "pag/2024-PI-28.jpg", "pag/2024-PI-29.jpg", "pag/2024-PI-30.jpg", "pag/2025-AL-15.jpg", "pag/2025-AL-16.jpg", "pag/2025-AL-17.jpg", "pag/2025-AL-18.jpg", "pag/2025-AL-19.jpg", "pag/2025-AL-20.jpg", "pag/2025-AL-21.jpg", "pag/2025-AL-22.jpg", "pag/2025-AL-23.jpg", "pag/2025-AL-24.jpg", "pag/2025-AL-25.jpg", "pag/2025-AL-26.jpg", "pag/2025-AL-27.jpg", "pag/2025-AL-28.jpg", "pag/2025-AL-29.jpg", "pag/2025-AL-30.jpg", "pag/2025-AL-31.jpg", "pag/2025-AL-32.jpg", "pag/2025-AL-33.jpg", "pag/2025-AL-34.jpg", "pag/2025-AL-35.jpg", "pag/2025-AL-36.jpg", "pag/2025-AL-37.jpg", "pag/2025-AL-38.jpg", "pag/2025-AL-39.jpg", "pag/2025-AL-40.jpg", "pag/2025-AL-41.jpg", "pag/2025-AL-42.jpg", "pag/2025-PI-10.jpg", "pag/2025-PI-11.jpg", "pag/2025-PI-12.jpg", "pag/2025-PI-13.jpg", "pag/2025-PI-14.jpg", "pag/2025-PI-15.jpg", "pag/2025-PI-16.jpg", "pag/2025-PI-17.jpg", "pag/2025-PI-18.jpg", "pag/2025-PI-19.jpg", "pag/2025-PI-20.jpg", "pag/2025-PI-21.jpg", "pag/2025-PI-22.jpg", "pag/2025-PI-23.jpg", "pag/2025-PI-24.jpg", "pag/2025-PI-25.jpg", "pag/2025-PI-26.jpg", "pag/2025-PI-27.jpg", "pag/2025-PI-28.jpg", "pag/2025-PI-29.jpg", "pag/2025-PI-30.jpg", "pag/2025-PI-31.jpg", "pag/2025-PI-32.jpg", "pag/2025-PI-33.jpg", "pag/2025-PI-34.jpg", "pag/2025-PI-35.jpg", "pag/2025-PI-36.jpg", "pag/2025-PI-37.jpg"];

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const core = await caches.open(CORE);
    await core.addAll(CORE_FILES);
    const pc = await caches.open(PAGES);
    await Promise.allSettled(PAGE_FILES.map(async u => { if (!(await pc.match(u))) await pc.add(u); }));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (![CORE, PAGES, FONTS].includes(k)) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.open(FONTS).then(async c => {
      const hit = await c.match(req);
      if (hit) return hit;
      try { const r = await fetch(req); c.put(req, r.clone()); return r; } catch (err) { return new Response("", {status: 504}); }
    }));
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(async r => {
      if (!r.ok) return (await caches.match("index.html")) || r;
      const c = r.clone(); caches.open(CORE).then(x => x.put("index.html", c)); return r;
    }).catch(() => caches.match("index.html")));
    return;
  }
  e.respondWith(caches.match(req, {ignoreSearch: true}).then(hit => hit || fetch(req).then(r => {
    if (r.ok && url.pathname.includes("/pag/")) { const c = r.clone(); caches.open(PAGES).then(x => x.put(req, c)); }
    return r;
  })));
});
