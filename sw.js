// FarsiLab offline helper: keeps the Play page and its games on the device so they work without internet.
// Pages and games: try the internet first (so updates arrive), use the saved copy when offline.
// Fonts: use the saved copy first.
const CACHE = "farsilab-v6";
const CORE = [
  "./", "index.html", "play.html", "styles.css?v=20261117a", "play.css?v=20261117a", "play.js?v=20261117a", "packs.js?v=20261117a",
  "manifest.webmanifest?v=2", "assets/favicon.png", "assets/apple-touch-icon.png?v=2", "assets/icon-192.png?v=2", "assets/icon-512.png?v=2",
  "assets/fifi_logo_full.webp", "assets/fifi_jumping.webp", "assets/fifi_medal.webp",
  "jsqr.min.js?v=1", "play/colors-game.bin", "play/trace-letters.bin", "play/build-word.bin", "play/sort-baskets.bin", "play/count-feed.bin", "play/shadow-match.bin", "play/memory-pairs.bin", "play/numbers-game.bin", "play/numbers-pack.bin"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(CORE.map(u => c.add(u).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const isFont = url.host === "fonts.googleapis.com" || url.host === "fonts.gstatic.com";
  if (url.origin !== location.origin && !isFont) return;
  if (isFont) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
    })));
    return;
  }
  e.respondWith(fetch(req, { cache: "no-cache" }).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req, { ignoreSearch: req.mode === "navigate" }).then(hit => hit || caches.match("play.html"))));
});
