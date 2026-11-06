(() => {
  const C = window.KIOSK;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const allPartners = C.partners.groups.flatMap(g => g.items);
  const partnerById = id => allPartners.find(p => p.id === id);

  // ================= language =================
  let lang = "th";
  const L = v => (v && typeof v === "object" && ("th" in v || "en" in v)) ? (v[lang] ?? v.th) : v;
  const U = k => L(C.ui[k]);
  function setLang(l) {
    lang = l === "en" ? "en" : "th";
    document.documentElement.lang = lang;
    $$("[data-t]").forEach(el => (el.textContent = U(el.dataset.t)));
    renderAttract(); renderHome(); renderPartners();
    if (current === "track" && T) { renderTrackHead(); goStep(si, true); }
  }
  document.addEventListener("click", e => {
    if (e.target.closest("[data-lang-toggle]")) { e.stopPropagation(); setLang(lang === "th" ? "en" : "th"); }
  });

  function qrSvg(text) {
    const q = qrcode(0, "M"); q.addData(text); q.make();
    return q.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
  }

  // ================= navigation =================
  let current = "attract", backTo = "home";
  const app = $("#app");
  function show(id) {
    if (id === current) return;
    $$(".screen").forEach(s => s.classList.toggle("active", s.id === id));
    if (current === "player") vid.pause();
    if (current === "track") tvid.pause();
    closeSheet();
    app.classList.toggle("at-attract", id === "attract");
    if (id === "attract") $$("#attract video").forEach(v => { try { v.currentTime = 0; } catch (_) {} v.play().catch(() => {}); });
    else $$("#attract video").forEach(v => v.pause());
    current = id;
  }
  app.classList.add("at-attract");
  document.addEventListener("click", e => {
    const go = e.target.closest("[data-go]");
    if (go) show(go.dataset.go);
  });
  $("#attract").addEventListener("click", e => {
    const b = e.target.closest("[data-start]");
    goFullscreen();
    setLang(b ? b.dataset.start : "th");
    show("home");
  });

  // ================= attract =================
  $("#attractBg").src = C.attract.bg;
  $("#attractReel").src = C.attract.reel;
  const axisHtml = () => C.tracks.map(t => `<span style="--c:${t.accent}"><b>${t.no}</b>${esc(t.title)}</span>`).join("<i>→</i>");
  function renderAttract() { $("#attractAxis").innerHTML = axisHtml(); renderToday(); }

  // ================= home =================
  const useTrack = C.tracks.find(t => t.group === "use");
  function renderHome() {
    $("#trackCards").innerHTML = C.tracks.filter(t => t.group === "capture").map(t => `
      <button class="tcard" data-track="${t.id}" style="--c:${t.accent};background-image:url('${t.poster}')">
        <span class="bar"></span>
        <div class="in"><div class="no">${t.no} · ${t.steps.length} STEPS</div>
          <div class="t">${esc(t.title)}</div><div class="th">${esc(L(t.sub))}</div></div>
        <span class="go">→</span>
      </button>`).join("");
    $("#useTiles").innerHTML = useTrack.steps.map((s, i) => `
      <button class="utile" data-use="${i}" style="animation-delay:${0.15 + i * 0.05}s">
        <div class="un">04.${i + 1}</div><div class="ut">${esc(L(useTrack.flow[i][1]))}</div><span class="ua">→</span>
      </button>`).join("") + `
      <button class="utile partners" data-go="partners" style="animation-delay:.45s">
        <div class="un">PARTNERS</div>
        <div class="logos">${C.partners.groups[0].items.map(p => `<img src="${p.logo}" alt="${esc(p.name)}" class="mono">`).join("")}</div>
        <span class="ua">→</span>
      </button>`;
  }
  $("#trackCards").addEventListener("click", e => { const c = e.target.closest("[data-track]"); if (c) openTrack(c.dataset.track); });
  $("#useTiles").addEventListener("click", e => { const c = e.target.closest("[data-use]"); if (c) openTrack(useTrack.id, +c.dataset.use); });

  // ================= track =================
  const tvid = $("#trackVideo");
  const trackScreen = $("#track");
  let T = null, si = 0, loops = 0, lastT = 0;
  function renderTrackHead() {
    trackScreen.style.setProperty("--acc", T.accent);
    $("#tNo").textContent = `${T.no} · ${T.steps.length} STEPS`;
    $("#tTitle").textContent = T.title;
    $("#tSub").textContent = L(T.sub);
    $("#stepList").innerHTML = T.steps.map((s, i) => `<button class="sbtn" data-step="${i}"><b>${i + 1}</b>${esc(s.k)}</button>`).join("");
    $("#stepDots").innerHTML = T.steps.map(() => "<i></i>").join("");
  }
  function openTrack(id, step = 0) {
    T = C.tracks.find(t => t.id === id);
    if (!T) return;
    renderTrackHead();
    show("track");
    goStep(step);
  }
  function goStep(i, textOnly) {
    si = Math.max(0, Math.min(T.steps.length - 1, i));
    const s = T.steps[si];
    if (!textOnly) { tvid.poster = s.poster || ""; tvid.src = s.video; tvid.play().catch(() => {}); loops = 0; }
    $("#tBadge").textContent = `STEP ${si + 1} / ${T.steps.length}`;
    $("#sK").textContent = s.k;
    $("#sH").textContent = L(s.h);
    $("#sD").textContent = L(s.d);
    $("#sG").innerHTML = s.g ? `<b>${esc(U("get"))}</b>${esc(L(s.g))}` : "";
    $("#sN").textContent = s.n ? L(s.n) : "";
    const box = $(".t-step"); box.classList.remove("fade-in"); void box.offsetWidth; box.classList.add("fade-in");
    $$("#stepList .sbtn").forEach((b, k) => b.classList.toggle("on", k === si));
    $$("#stepDots i").forEach((d, k) => d.classList.toggle("on", k === si));
    $("#stepPrev").disabled = si === 0;
    $("#stepNext").textContent = si === T.steps.length - 1 ? "✓" : "›";
  }
  $("#stepList").addEventListener("click", e => { const b = e.target.closest("[data-step]"); if (b) goStep(+b.dataset.step); });
  $("#stepPrev").addEventListener("click", () => goStep(si - 1));
  $("#stepNext").addEventListener("click", () => { if (si === T.steps.length - 1) show("home"); else goStep(si + 1); });
  tvid.addEventListener("click", () => (tvid.paused ? tvid.play() : tvid.pause()));
  // each step loops twice, then moves on by itself
  tvid.addEventListener("timeupdate", () => {
    const d = tvid.duration || 1;
    $("#tProg").style.width = (tvid.currentTime / d) * 100 + "%";
    if (tvid.currentTime + 0.3 < lastT) {
      loops++;
      if (loops >= 2 && current === "track" && si < T.steps.length - 1) goStep(si + 1);
    }
    lastT = tvid.currentTime;
    poke();
  });

  // ================= player (partner videos) =================
  const vid = $("#mainVideo");
  const player = $("#player");
  function openPlayer(it, from) {
    backTo = from || "home";
    player.style.setProperty("--acc", it.accent || "#ff2a2a");
    $("#pNo").textContent = it.no || "";
    $("#pTitle").textContent = it.title || "";
    $("#pTh").textContent = it.th || "";
    vid.poster = it.poster || ""; vid.src = it.video; vid.muted = false;
    vid.play().catch(() => { vid.muted = true; vid.play().catch(() => {}); syncSound(); });
    syncSound();
    show("player");
  }
  $("#playerBack").addEventListener("click", () => show(backTo));
  const togglePlay = () => (vid.paused ? vid.play().catch(() => {}) : vid.pause());
  $("#btnPlay").addEventListener("click", togglePlay);
  $("#bigPlay").addEventListener("click", togglePlay);
  vid.addEventListener("click", togglePlay);
  $("#btnRestart").addEventListener("click", () => { vid.currentTime = 0; vid.play().catch(() => {}); });
  $("#btnSound").addEventListener("click", () => { vid.muted = !vid.muted; syncSound(); });
  function syncSound() { $("#btnSound").textContent = vid.muted ? "🔇" : "🔊"; $("#btnSound").classList.toggle("muted", vid.muted); }
  const setState = () => { player.classList.toggle("playing", !vid.paused); player.classList.toggle("paused", vid.paused); };
  ["play", "pause", "ended"].forEach(ev => vid.addEventListener(ev, setState));
  setState();
  vid.addEventListener("ended", () => setTimeout(() => current === "player" && show(backTo), 1500));
  const fmt = t => (isFinite(t) ? `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}` : "0:00");
  vid.addEventListener("timeupdate", () => {
    const p = vid.duration ? (vid.currentTime / vid.duration) * 100 : 0;
    $("#progressFill").style.width = p + "%"; $("#progressKnob").style.left = p + "%";
    $("#tCur").textContent = fmt(vid.currentTime); $("#tDur").textContent = fmt(vid.duration);
    poke();
  });
  const bar = $("#progress");
  const seek = e => { const r = bar.getBoundingClientRect(); const x = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1); if (vid.duration) vid.currentTime = x * vid.duration; };
  bar.addEventListener("pointerdown", e => {
    seek(e); bar.setPointerCapture(e.pointerId);
    const mv = ev => seek(ev);
    bar.addEventListener("pointermove", mv);
    bar.addEventListener("pointerup", () => bar.removeEventListener("pointermove", mv), { once: true });
  });

  // ================= partners =================
  function renderPartners() {
    $("#partnerGroups").innerHTML = C.partners.groups.map(g => `
      <div class="pgroup"><h4>${esc(L(g.title))}</h4>
        <div class="pgrid ${g.items.length > 4 ? "c3" : "c4"}">
          ${g.items.map((p, i) => `<button class="plogo ${p.videos || p.url ? "has" : ""}" data-partner="${p.id}" style="animation-delay:${i * 0.05}s">
            <img src="${p.logo}" alt="${esc(p.name)}"></button>`).join("")}
        </div></div>`).join("");
  }
  $("#partnerGroups").addEventListener("click", e => { const b = e.target.closest("[data-partner]"); if (b) openSheet(partnerById(b.dataset.partner)); });
  const sheet = $("#sheet");
  function openSheet(p) {
    if (!p) return;
    $("#shLogo").src = p.logo; $("#shLogo").alt = p.name;
    $("#shLine").textContent = p.line || "";
    let h = `<div class="sh-name">${esc(p.name)}</div>`;
    if (p.videos) h += `<div class="sh-vids">${p.videos.map((v, i) =>
      `<button class="sh-vid" data-pv="${i}" style="background-image:url('${v.poster}')"><b>${esc(v.title)}</b><i></i></button>`).join("")}</div>`;
    if (p.url) h += `<div class="sh-row"><div class="sh-qr">${qrSvg(p.url)}</div><div><b>${esc(p.urlLabel || p.url)}</b><span>${esc(U("scan"))}</span></div></div>`;
    if (!p.videos && !p.url) h += `<div class="sh-txt">${esc(U("askStaff"))}</div>`;
    $("#shBody").innerHTML = h;
    sheet.classList.add("open"); sheet.setAttribute("aria-hidden", "false");
    sheet.onclick = e => {
      if (e.target.closest("[data-close]")) return closeSheet();
      const v = e.target.closest("[data-pv]");
      if (v) { const it = p.videos[+v.dataset.pv]; openPlayer({ no: p.name, title: it.title, th: p.line || "", video: it.video, poster: it.poster, accent: "#ffc400" }, "partners"); }
    };
  }
  function closeSheet() { sheet.classList.remove("open"); sheet.setAttribute("aria-hidden", "true"); }

  // ================= today ticker (attract) =================
  const pad = n => String(n).padStart(2, "0");
  const todayKey = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
  function renderToday() {
    const list = (C.schedule || {})[todayKey()] || [];
    $("#attractTicker").innerHTML = list.length ? `<b>TODAY</b>${list.map(s => `${esc(L(s.time))} · ${esc(L(s.name))}`).join("   /   ")}` : "";
  }

  // ================= idle → attract =================
  let idleT;
  function poke() { clearTimeout(idleT); idleT = setTimeout(() => { show("attract"); setLang("th"); }, C.idleSeconds * 1000); }
  ["pointerdown", "touchstart", "keydown"].forEach(ev => document.addEventListener(ev, poke, { passive: true }));

  // ================= kiosk hardening =================
  function goFullscreen() {
    const el = document.documentElement;
    if (!document.fullscreenElement && el.requestFullscreen) el.requestFullscreen().catch(() => {});
  }
  document.addEventListener("contextmenu", e => e.preventDefault());
  document.addEventListener("gesturestart", e => e.preventDefault());
  document.addEventListener("touchmove", e => { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
  let taps = [];
  $("#admin-hotspot").addEventListener("click", e => {
    e.stopPropagation();
    const now = Date.now();
    taps = taps.filter(t => now - t < 3000).concat(now);
    if (taps.length >= 5) location.reload();
  });
  if ("serviceWorker" in navigator && location.protocol !== "file:") navigator.serviceWorker.register("sw.js").catch(() => {});
  setInterval(() => { if (current === "attract") $$("#attract video").forEach(v => v.paused && v.play().catch(() => {})); }, 5000);
  setInterval(renderToday, 60000);

  setLang("th");
})();
