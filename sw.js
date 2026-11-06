// MTI kiosk service worker — cache ทุกไฟล์ไว้ในเครื่อง เน็ตหลุดก็ยังเล่นได้
// แก้ไฟล์แล้ว deploy ใหม่: เปลี่ยน VERSION ให้เครื่องโหลดชุดใหม่
const VERSION = "mti-v5-20261106";
const FILES = [
 "./",
 "index.html",
 "app.css",
 "app.js",
 "config.js",
 "manifest.webmanifest",
 "vendor/qrcode.js",
 "brand/icon-192.png",
 "brand/mti_lockup_white.png",
 "brand/partners/chyron.png",
 "brand/partners/ciim.png",
 "brand/partners/codehard.png",
 "brand/partners/kmitl.png",
 "brand/partners/mhesi.png",
 "brand/partners/mosys.png",
 "brand/partners/originals.png",
 "brand/partners/pmu-c.png",
 "brand/partners/thaifight.png",
 "brand/partners/verse.png",
 "fonts/ibm-plex-sans-thai-latin-400-normal.woff2",
 "fonts/ibm-plex-sans-thai-latin-500-normal.woff2",
 "fonts/ibm-plex-sans-thai-latin-600-normal.woff2",
 "fonts/ibm-plex-sans-thai-thai-400-normal.woff2",
 "fonts/ibm-plex-sans-thai-thai-500-normal.woff2",
 "fonts/ibm-plex-sans-thai-thai-600-normal.woff2",
 "fonts/kanit-latin-400-normal.woff2",
 "fonts/kanit-latin-500-normal.woff2",
 "fonts/kanit-latin-600-normal.woff2",
 "fonts/kanit-latin-700-normal.woff2",
 "fonts/kanit-latin-800-normal.woff2",
 "fonts/kanit-thai-400-normal.woff2",
 "fonts/kanit-thai-500-normal.woff2",
 "fonts/kanit-thai-600-normal.woff2",
 "fonts/kanit-thai-700-normal.woff2",
 "fonts/kanit-thai-800-normal.woff2",
 "media/arc_2d.mp4",
 "media/arc_3d.mp4",
 "media/arc_3d_a.mp4",
 "media/bg_vertical.mp4",
 "media/cap_8cam.mp4",
 "media/cap_bones.mp4",
 "media/cap_hud.mp4",
 "media/cap_motion.mp4",
 "media/cap_skeleton.mp4",
 "media/case_siamrumble.mp4",
 "media/muaythai_intel.mp4",
 "media/p_arc_2d.jpg",
 "media/p_arc_3d.jpg",
 "media/p_arc_3d_a.jpg",
 "media/p_cap_8cam.jpg",
 "media/p_cap_bones.jpg",
 "media/p_cap_hud.jpg",
 "media/p_cap_motion.jpg",
 "media/p_cap_skeleton.jpg",
 "media/p_case_siamrumble.jpg",
 "media/p_ring_3d.jpg",
 "media/p_ring_4cam.jpg",
 "media/p_ring_calib.jpg",
 "media/p_use_compare.jpg",
 "media/ring_3d.mp4",
 "media/ring_4cam.mp4",
 "media/ring_calib.mp4",
 "media/use_compare.mp4"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
async function rangeResponse(req, res) {
  const range = req.headers.get("range");
  if (!range) return res;
  const buf = await res.arrayBuffer();
  const m = /bytes=(\d*)-(\d*)/.exec(range);
  const start = m[1] ? +m[1] : 0;
  const end = m[2] ? +m[2] : buf.byteLength - 1;
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    headers: { "Content-Type": res.headers.get("Content-Type") || "video/mp4",
      "Content-Range": `bytes ${start}-${end}/${buf.byteLength}`, "Content-Length": String(end - start + 1), "Accept-Ranges": "bytes" }
  });
}
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // Google Sheet CSV ฯลฯ ไปเน็ตตรง
  e.respondWith((async () => {
    const cache = await caches.open(VERSION);
    const hit = await cache.match(req.url.split("#")[0], { ignoreSearch: true });
    if (hit) return rangeResponse(req, hit);
    try { return await fetch(req); } catch (_) { return new Response("offline", { status: 503 }); }
  })());
});
