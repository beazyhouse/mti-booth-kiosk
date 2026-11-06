(() => {
  const C = window.KIOSK;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const allPartners = C.partners.groups.flatMap(g => g.items);
  const partnerById = id => allPartners.find(p => p.id === id);
  const app = $("#app");

  // ================= language =================
  let lang = "th";
  const L = v => (v && typeof v === "object" && ("th" in v || "en" in v)) ? (v[lang] ?? v.th) : v;
  const U = k => L(C.ui[k]);
  function setLang(l) {
    lang = l === "en" ? "en" : "th";
    document.documentElement.lang = lang;
    $$("[data-t]").forEach(el => (el.textContent = U(el.dataset.t)));
    renderAttract(); renderHome(); renderPartners(); syncCaseSound();
    if (current === "track" && T) { renderTrackHead(); goStep(si, true); }
  }
  document.addEventListener("click", e => {
    if (e.target.closest("[data-lang-toggle]")) { setLang(lang === "th" ? "en" : "th"); }
  });

  function qrSvg(text) { const q = qrcode(0, "M"); q.addData(text); q.make(); return q.createSvgTag({ cellSize: 4, margin: 0, scalable: true }); }

  // ================= navigation =================
  let current = "attract";
  const stack = [];
  function show(id, opts = {}) {
    if (id === current) return;
    if (!opts.back && current !== "attract" && id !== "attract") stack.push(current);
    if (id === "home" || id === "attract") stack.length = 0;
    $$(".screen").forEach(s => s.classList.toggle("active", s.id === id));
    if (current === "track") tvid.pause();
    if (current === "case") cvid.pause();
    closeSheet();
    app.dataset.screen = id;
    if (id === "attract") $$("#attract video").forEach(v => { try { v.currentTime = 0; } catch (_) {} v.play().catch(() => {}); });
    else $$("#attract video").forEach(v => v.pause());
    if (id === "case") openCaseVideo();
    current = id;
  }
  app.dataset.screen = "attract";
  $("#navBack").addEventListener("click", () => show(stack.pop() || "home", { back: true }));
  $("#navHome").addEventListener("click", () => show("home"));
  $("#navPartners").addEventListener("click", () => show("partners"));
  $("#attract").addEventListener("click", e => {
    const b = e.target.closest("[data-start]");
    goFullscreen();
    setLang(b ? b.dataset.start : lang);
    show("home");
  });

  // ================= attract =================
  $("#attractBg").src = C.attract.bg;
  $("#attractReel").src = C.attract.reel;
  function renderAttract() {
    $("#attractAxis").innerHTML = C.tracks.map(t => `<span style="--c:${t.accent}"><b>${t.no}</b>${esc(t.title)}</span>`).join("<i>→</i>");
    renderToday();
  }

  // ================= home =================
  const useTrack = C.tracks.find(t => t.group === "use");
  function renderHome() {
    $("#trackCards").innerHTML = C.tracks.filter(t => t.group === "capture").map(t => `
      <button class="tcard" data-track="${t.id}" style="--c:${t.accent};background-image:url('${t.poster}')">
        <span class="bar"></span>
        <div class="in"><div class="no">${t.no} · ${t.steps.length} STEPS</div>
          <div class="t">${esc(t.title)}</div><div class="th">${esc(L(t.sub))}</div></div>
        <span class="go">›</span>
      </button>`).join("");
    $("#useTiles").innerHTML = useTrack.steps.map((s, i) => `
      <button class="utile" data-use="${i}" style="animation-delay:${0.15 + i * 0.05}s">
        <div class="un">04.${i + 1}</div><div class="ut">${esc(L(useTrack.flow[i][1]))}</div><span class="ua">›</span>
      </button>`).join("") + `
      <button class="utile case" data-case style="animation-delay:.45s;background-image:url('${C.case.poster}')">
        <div class="un">PARTNER · verse.</div><div class="ut">${esc(U("caseTile"))}</div><span class="ua">▶</span>
      </button>`;
  }
  $("#trackCards").addEventListener("click", e => { const c = e.target.closest("[data-track]"); if (c) openTrack(c.dataset.track); });
  $("#useTiles").addEventListener("click", e => {
    const c = e.target.closest("[data-use]"); if (c) return openTrack(useTrack.id, +c.dataset.use);
    if (e.target.closest("[data-case]")) show("case");
  });

  // ================= track =================
  const tvid = $("#trackVideo");
  const trackScreen = $("#track");
  let T = null, si = 0, loops = 0, lastT = 0, lastTouch = 0;
  function renderTrackHead() {
    trackScreen.style.setProperty("--acc", T.accent);
    $("#tNo").textContent = `${T.no} · ${T.steps.length} STEPS`;
    $("#tTitle").textContent = T.title;
    $("#tSub").textContent = L(T.sub);
    const cols = T.steps.length <= 3 ? T.steps.length : (T.steps.length === 4 ? 2 : 3);
    $("#stepList").style.setProperty("--cols", cols);
    $("#stepList").innerHTML = T.steps.map((s, i) => `<button class="tab" data-step="${i}"><b>${i + 1}</b><span>${esc(s.k)}</span></button>`).join("");
  }
  function openTrack(id, step = 0) {
    T = C.tracks.find(t => t.id === id);
    if (!T) return;
    renderTrackHead();
    show("track");
    goStep(step);
  }
  const nextTrack = () => C.tracks[C.tracks.indexOf(T) + 1];
  function goStep(i, textOnly) {
    si = Math.max(0, Math.min(T.steps.length - 1, i));
    const s = T.steps[si];
    if (!textOnly) { tvid.poster = s.poster || ""; tvid.src = s.video; tvid.play().catch(() => {}); loops = 0; lastT = 0; }
    $("#tBadge").textContent = `STEP ${si + 1} / ${T.steps.length}`;
    $("#sK").textContent = s.k;
    $("#sH").textContent = L(s.h);
    $("#sD").textContent = L(s.d);
    $("#sG").innerHTML = s.g ? `<b>${esc(U("get"))}</b>${esc(L(s.g))}` : "";
    $("#sN").textContent = s.n ? L(s.n) : "";
    const box = $(".t-step"); box.classList.remove("fade-in"); void box.offsetWidth; box.classList.add("fade-in");
    $$("#stepList .tab").forEach((b, k) => b.classList.toggle("on", k === si));
    const last = si === T.steps.length - 1, nt = nextTrack();
    $("#nextLabel").textContent = !last ? U("next")
      : nt ? `${U("nextChapter")} · ${nt.title}`
      : `${U("caseKicker")} · SIAM RUMBLE`;
  }
  $("#stepList").addEventListener("click", e => { const b = e.target.closest("[data-step]"); if (b) goStep(+b.dataset.step); });
  $("#stepNext").addEventListener("click", () => {
    if (si < T.steps.length - 1) return goStep(si + 1);
    const nt = nextTrack();
    if (nt) openTrack(nt.id); else show("case");
  });
  // user mode: after 2 loops with nobody touching for 15 s, move to the next step
  tvid.addEventListener("timeupdate", () => {
    const d = tvid.duration || 1;
    $("#tProg").style.width = (tvid.currentTime / d) * 100 + "%";
    if (tvid.currentTime + 0.3 < lastT) {
      loops++;
      if (!demoOn && loops >= 2 && current === "track" && si < T.steps.length - 1 && Date.now() - lastTouch > 15000) goStep(si + 1);
    }
    lastT = tvid.currentTime;
  });

  // ================= partner use case (vertical, full screen) =================
  const cvid = $("#caseVideo");
  $("#caseLogo").src = partnerById(C.case.partner).logo;
  cvid.poster = C.case.poster;
  function openCaseVideo() {
    if (!cvid.src) cvid.src = C.case.video;
    cvid.muted = demoOn || cvid.dataset.userMuted === "1";
    try { cvid.currentTime = 0; } catch (_) {}
    cvid.play().catch(() => { cvid.muted = true; cvid.play().catch(() => {}); });
    syncCaseSound();
  }
  $("#caseSound").addEventListener("click", () => { cvid.muted = !cvid.muted; cvid.dataset.userMuted = cvid.muted ? "1" : "0"; syncCaseSound(); });
  function syncCaseSound() {
    $("#caseSoundIcon").textContent = cvid.muted ? "🔇" : "🔊";
    $("#caseSoundLabel").textContent = U(cvid.muted ? "sound" : "soundOff");
  }

  // ================= partners =================
  function renderPartners() {
    $("#partnerGroups").innerHTML = C.partners.groups.map(g => `
      <div class="pgroup"><h4>${esc(L(g.title))}</h4>
        <div class="pgrid ${g.items.length > 4 ? "c3" : "c4"}">
          ${g.items.map((p, i) => `<button class="plogo ${p.case || p.url ? "has" : ""}" data-partner="${p.id}" style="animation-delay:${i * 0.05}s">
            <img src="${p.logo}" alt="${esc(p.name)}"></button>`).join("")}
        </div></div>`).join("");
  }
  $("#partnerGroups").addEventListener("click", e => {
    const b = e.target.closest("[data-partner]"); if (!b) return;
    const p = partnerById(b.dataset.partner);
    if (p.case) return show("case");
    openSheet(p);
  });
  const sheet = $("#sheet");
  function openSheet(p) {
    if (!p) return;
    $("#shLogo").src = p.logo; $("#shLogo").alt = p.name;
    $("#shLine").textContent = p.line || "";
    let h = `<div class="sh-name">${esc(p.name)}</div>`;
    if (p.url) h += `<div class="sh-row"><div class="sh-qr">${qrSvg(p.url)}</div><div><b>${esc(p.urlLabel || p.url)}</b><span>${esc(U("scan"))}</span></div></div>`;
    else h += `<div class="sh-txt">${esc(U("askStaff"))}</div>`;
    $("#shBody").innerHTML = h;
    sheet.classList.add("open"); sheet.setAttribute("aria-hidden", "false");
    sheet.onclick = e => { if (e.target.closest("[data-close]")) closeSheet(); };
  }
  function closeSheet() { sheet.classList.remove("open"); sheet.setAttribute("aria-hidden", "true"); }

  // ================= today ticker =================
  const pad = n => String(n).padStart(2, "0");
  const todayKey = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
  function renderToday() {
    const list = (C.schedule || {})[todayKey()] || [];
    $("#attractTicker").innerHTML = list.length ? `<b>TODAY</b>${list.map(s => `${esc(L(s.time))} · ${esc(L(s.name))}`).join("   /   ")}` : "";
  }

  // ================= demo mode: runs by itself when nobody touches =================
  let demoOn = false, demoTimer = null, demoQueue = [], demoLang = "th";
  function buildDemo() {
    const q = [];
    const S = 7500; // ms per step
    q.push([() => { setLang(demoLang); show("attract"); }, 9000]);
    q.push([() => show("home"), 2600]);
    q.push([() => $("#trackCards .tcard")?.classList.add("pulse"), 1600]);
    C.tracks.forEach(t => t.steps.forEach((s, i) => q.push([() => (i === 0 ? openTrack(t.id, 0) : goStep(i)), S])));
    q.push([() => show("case"), 22000]);
    q.push([() => show("partners"), 6000]);
    q.push([() => { demoLang = demoLang === "th" ? "en" : "th"; demoQueue = buildDemo(); }, 0]);
    return q;
  }
  function demoTick() {
    if (!demoOn) return;
    if (!demoQueue.length) demoQueue = buildDemo();
    const [fn, ms] = demoQueue.shift();
    fn();
    demoTimer = setTimeout(demoTick, ms);
  }
  function startDemo() {
    if (demoOn) return;
    demoOn = true; app.classList.add("demo");
    demoLang = "th"; demoQueue = buildDemo().slice(1); // already on attract
    demoTimer = setTimeout(demoTick, 0);
  }
  function stopDemo() {
    if (!demoOn) return;
    demoOn = false; app.classList.remove("demo"); clearTimeout(demoTimer);
    $$(".pulse").forEach(el => el.classList.remove("pulse"));
    if (current === "case") { cvid.muted = cvid.dataset.userMuted === "1"; syncCaseSound(); }
  }

  // ================= idle → attract → demo =================
  let idleT, demoT;
  function poke() {
    lastTouch = Date.now();
    clearTimeout(idleT); clearTimeout(demoT);
    idleT = setTimeout(() => {
      if (current === "case" && !cvid.paused && !cvid.muted) return poke(); // someone is watching with sound
      show("attract"); setLang("th"); armDemo();
    }, C.idleSeconds * 1000);
  }
  function armDemo() { clearTimeout(demoT); demoT = setTimeout(startDemo, (C.demoAfterSeconds || 12) * 1000); }
  ["pointerdown", "touchstart", "keydown"].forEach(ev => document.addEventListener(ev, () => { stopDemo(); poke(); }, { passive: true, capture: true }));

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
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
    // resume media caching whenever the connection comes back
    const fill = () => navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage("fill");
    window.addEventListener("online", fill); setInterval(fill, 5 * 60 * 1000); setTimeout(fill, 8000);
  }
  setInterval(() => { if (current === "attract") $$("#attract video").forEach(v => v.paused && v.play().catch(() => {})); }, 5000);
  setInterval(renderToday, 60000);
  // long viewing of a video counts as activity (don't drop to attract mid-watch)
  [tvid, cvid].forEach(v => v.addEventListener("play", () => { if (!demoOn) lastTouch = Date.now(); }));

  setLang("th");
  armDemo();
})();
