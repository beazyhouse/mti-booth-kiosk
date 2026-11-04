(() => {
  const C = window.KIOSK;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const allPartners = C.partners.groups.flatMap(g => g.items);
  const partnerById = id => allPartners.find(p => p.id === id);

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
    if (id === "attract") {
      $$("#attract video").forEach(v => { try { v.currentTime = 0; } catch (_) {} v.play().catch(() => {}); });
    } else {
      $$("#attract video").forEach(v => v.pause());
    }
    if (id === "schedule") renderSchedule(selectedDay);
    current = id;
  }
  document.addEventListener("click", e => {
    const go = e.target.closest("[data-go]");
    if (go) show(go.dataset.go);
  });
  $("#attract").addEventListener("click", () => { goFullscreen(); show("home"); });

  // ================= attract =================
  $("#attractBg").src = C.attract.bg;
  $("#attractReel").src = C.attract.reel;
  $("#attractKicker").textContent = C.attract.kicker;
  $("#attractChips").innerHTML = C.tracks
    .map(t => `<span class="chip" style="--c:${t.accent}"><i>${t.no}</i>${esc(t.title)}</span>`).join("");

  // ================= home =================
  $("#trackCards").innerHTML = C.tracks.map(t => `
    <button class="tcard" data-track="${t.id}" style="--c:${t.accent};background-image:url('${t.poster}')">
      <span class="bar"></span>
      <div class="in">
        <div class="no">${t.no}<small>${t.steps.length} STEPS</small></div>
        <div class="t">${esc(t.title)}</div>
        <div class="th">${esc(t.th)}</div>
      </div>
      <span class="go">→</span>
    </button>`).join("");
  $("#trackCards").addEventListener("click", e => {
    const c = e.target.closest("[data-track]");
    if (c) openTrack(c.dataset.track);
  });
  $("#axis").innerHTML = C.tracks.map(t => `<span style="--c:${t.accent}"><b>${t.no}</b>${esc(t.title)}</span>`).join("<i>→</i>");
  $("#logoStrip").innerHTML = C.partners.groups[0].items
    .map(p => `<img src="${p.logo}" alt="${esc(p.name)}" class="mono">`).join("");

  // ================= track (how it works) =================
  const tvid = $("#trackVideo");
  const trackScreen = $("#track");
  let T = null, si = 0;
  function openTrack(id, step = 0) {
    T = C.tracks.find(t => t.id === id);
    if (!T) return;
    trackScreen.style.setProperty("--acc", T.accent);
    $("#tNo").textContent = `HOW IT WORKS · ${T.no}`;
    $("#tTitle").textContent = T.title;
    $("#tTh").textContent = T.th;
    const p = T.partner && partnerById(T.partner);
    $("#tPartner").innerHTML = p ? `<span>WITH</span><img src="${p.logo}" alt="${esc(p.name)}">` : "";
    $("#tFlow").innerHTML = (T.flow || []).map(f => `<span><b>${esc(f[0])}</b>${esc(f[1])}</span>`).join("<i>→</i>");
    $("#stepList").innerHTML = T.steps.map((s, i) =>
      `<button class="sbtn" data-step="${i}"><b>${i + 1}</b>${esc(s.k)}</button>`).join("");
    $("#stepDots").innerHTML = T.steps.map(() => "<i></i>").join("");
    show("track");
    goStep(step);
  }
  function goStep(i) {
    si = Math.max(0, Math.min(T.steps.length - 1, i));
    const s = T.steps[si];
    tvid.poster = s.poster || "";
    tvid.src = s.video;
    tvid.play().catch(() => {});
    $("#tBadge").textContent = `STEP ${si + 1} / ${T.steps.length}`;
    $("#sK").textContent = s.k;
    $("#sTh").textContent = s.th;
    $("#sDesc").textContent = s.desc;
    $("#sNote").textContent = s.note || "";
    $("#sGet").innerHTML = s.get ? `<b>ได้อะไร</b>${esc(s.get)}` : "";
    const box = $(".t-step"); box.classList.remove("fade-in"); void box.offsetWidth; box.classList.add("fade-in");
    $$("#stepList .sbtn").forEach((b, k) => b.classList.toggle("on", k === si));
    $$("#stepDots i").forEach((d, k) => d.classList.toggle("on", k === si));
    $("#stepPrev").disabled = si === 0;
    $("#stepNext").textContent = si === T.steps.length - 1 ? "✓" : "›";
    loops = 0;
  }
  $("#stepList").addEventListener("click", e => {
    const b = e.target.closest("[data-step]");
    if (b) goStep(+b.dataset.step);
  });
  $("#stepPrev").addEventListener("click", () => goStep(si - 1));
  $("#stepNext").addEventListener("click", () => {
    if (si === T.steps.length - 1) show("home"); else goStep(si + 1);
  });
  tvid.addEventListener("click", () => (tvid.paused ? tvid.play() : tvid.pause()));
  // แต่ละขั้นวน 2 รอบ แล้วไปขั้นถัดไปเอง (เหมือนมีคนพรีเซนต์)
  let loops = 0, lastT = 0;
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

  // ================= player =================
  const vid = $("#mainVideo");
  const player = $("#player");
  function openPlayer(it, from) {
    backTo = from || "home";
    player.style.setProperty("--acc", it.accent || "#ff2a2a");
    $("#pNo").textContent = it.no || "";
    $("#pTitle").textContent = it.title || "";
    $("#pTh").textContent = it.th || "";
    $("#pDesc").textContent = it.desc || "";
    vid.poster = it.poster || "";
    vid.loop = !!it.loop;
    vid.src = it.video;
    vid.muted = false;
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
  function syncSound() {
    $("#btnSound").textContent = vid.muted ? "🔇" : "🔊";
    $("#btnSound").classList.toggle("muted", vid.muted);
  }
  const setState = () => { player.classList.toggle("playing", !vid.paused); player.classList.toggle("paused", vid.paused); };
  ["play", "pause", "ended"].forEach(ev => vid.addEventListener(ev, setState));
  setState();
  vid.addEventListener("ended", () => setTimeout(() => current === "player" && show(backTo), 1500));
  const fmt = t => (isFinite(t) ? `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}` : "0:00");
  vid.addEventListener("timeupdate", () => {
    const p = vid.duration ? (vid.currentTime / vid.duration) * 100 : 0;
    $("#progressFill").style.width = p + "%";
    $("#progressKnob").style.left = p + "%";
    $("#tCur").textContent = fmt(vid.currentTime);
    $("#tDur").textContent = fmt(vid.duration);
    poke();
  });
  const bar = $("#progress");
  const seek = e => {
    const r = bar.getBoundingClientRect();
    const x = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1);
    if (vid.duration) vid.currentTime = x * vid.duration;
  };
  bar.addEventListener("pointerdown", e => {
    seek(e); bar.setPointerCapture(e.pointerId);
    const mv = ev => seek(ev);
    bar.addEventListener("pointermove", mv);
    bar.addEventListener("pointerup", () => bar.removeEventListener("pointermove", mv), { once: true });
  });

  // ================= partners =================
  $("#partnerGroups").innerHTML = C.partners.groups.map(g => `
    <div class="pgroup"><h4>${esc(g.title)}</h4>
      <div class="pgrid ${g.items.length > 4 ? "c3" : "c4"}">
        ${g.items.map((p, i) => `<button class="plogo ${p.videos || p.track || p.url ? "has" : ""}" data-partner="${p.id}" style="animation-delay:${i * 0.05}s">
          <img src="${p.logo}" alt="${esc(p.name)}"></button>`).join("")}
      </div></div>`).join("");
  $("#partnerGroups").addEventListener("click", e => {
    const b = e.target.closest("[data-partner]");
    if (b) openSheet(partnerById(b.dataset.partner));
  });
  const sheet = $("#sheet");
  function openSheet(p) {
    if (!p) return;
    $("#shLogo").src = p.logo; $("#shLogo").alt = p.name;
    $("#shLine").textContent = p.line || "";
    let h = `<div class="sh-name">${esc(p.name)}</div>`;
    if (p.videos) h += `<div class="sh-vids">${p.videos.map((v, i) =>
      `<button class="sh-vid" data-pv="${i}" style="background-image:url('${v.poster}')"><b>${esc(v.title)}</b><i></i></button>`).join("")}</div>`;
    if (p.track) {
      const t = C.tracks.find(x => x.id === p.track);
      h += `<button class="sh-btn" data-ptrack="${t.id}"><span>ดูระบบ ${esc(t.title)}</span><span>→</span></button>`;
    }
    if (p.url) h += `<div class="sh-row"><div class="sh-qr">${qrSvg(p.url)}</div><div><b>${esc(p.urlLabel || p.url)}</b><span>สแกนเพื่อดูงานเพิ่มเติม</span></div></div>`;
    if (!p.videos && !p.track && !p.url) h += `<div class="sh-txt">ถามทีมงานที่บูธ เพื่อดูงานที่ทำร่วมกับ ${esc(p.name)}</div>`;
    $("#shBody").innerHTML = h;
    sheet.classList.add("open"); sheet.setAttribute("aria-hidden", "false");
    sheet.onclick = e => {
      if (e.target.closest("[data-close]")) return closeSheet();
      const v = e.target.closest("[data-pv]");
      if (v) { const it = p.videos[+v.dataset.pv]; return openPlayer({ no: p.name, title: it.title, th: p.line || "", video: it.video, poster: it.poster, accent: "#ffc400" }, "partners"); }
      const t = e.target.closest("[data-ptrack]");
      if (t) openTrack(t.dataset.ptrack);
    };
  }
  function closeSheet() { sheet.classList.remove("open"); sheet.setAttribute("aria-hidden", "true"); }

  // ================= schedule =================
  const pad = n => String(n).padStart(2, "0");
  const keyOf = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const DOW = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const MON = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  let schedule = C.schedule;
  const dayKeys = () => Object.keys(schedule).sort();
  const todayKey = () => keyOf(new Date());
  let selectedDay = dayKeys().includes(todayKey()) ? todayKey() : dayKeys()[0];
  function renderDays() {
    $("#days").innerHTML = dayKeys().map(k => {
      const d = new Date(k + "T12:00:00");
      return `<button class="day ${k === selectedDay ? "sel" : ""} ${k === todayKey() ? "today" : ""}" data-day="${k}">
        <b>${d.getDate()}</b><span>${DOW[d.getDay()]} · ${MON[d.getMonth()]}</span></button>`;
    }).join("");
  }
  $("#days").addEventListener("click", e => {
    const b = e.target.closest("[data-day]");
    if (b) renderSchedule(b.dataset.day);
  });
  function renderSchedule(k) {
    selectedDay = k; renderDays();
    const list = schedule[k] || [];
    $("#slots").innerHTML = list.length
      ? list.map((s, i) => `<div class="slot" style="animation-delay:${i * 0.06}s"><div class="slot-time">${esc(s.time)}</div>
          <div><div class="slot-name">${esc(s.name)}</div>${s.role ? `<div class="slot-role">${esc(s.role)}</div>` : ""}
          ${s.note ? `<div class="slot-note">${esc(s.note)}</div>` : ""}</div></div>`).join("")
      : `<div class="slot-empty"><b>ตารางกำลังอัปเดต</b><span>ถามทีมงานที่บูธได้เลย 👋</span></div>`;
  }
  function renderTodayPreview() {
    const list = schedule[todayKey()] || [];
    if (list.length) {
      $("#todayPreview").innerHTML = `${esc(list[0].name)}<small>${esc(list[0].time)}${list.length > 1 ? ` · +${list.length - 1}` : ""}</small>`;
      $("#attractTicker").innerHTML = `<b>TODAY</b>${list.map(s => `${esc(s.time)} · ${esc(s.name)}`).join("   /   ")}`;
    } else {
      $("#todayPreview").innerHTML = `ดูตาราง<small>5 – 8 NOV</small>`;
      $("#attractTicker").innerHTML = "";
    }
  }
  renderDays(); renderSchedule(selectedDay); renderTodayPreview();
  $("#cTh").textContent = C.contact.th;
  $("#cSub").textContent = C.contact.label ? `${C.contact.label} · ${C.contact.sub}` : C.contact.sub;
  if (C.contact.qrUrl) $("#contactQr").innerHTML = qrSvg(C.contact.qrUrl);

  function parseCSV(txt) {
    const rows = []; let row = [], f = "", q = false;
    for (let i = 0; i < txt.length; i++) {
      const c = txt[i];
      if (q) { if (c === '"' && txt[i + 1] === '"') { f += '"'; i++; } else if (c === '"') q = false; else f += c; }
      else if (c === '"') q = true;
      else if (c === ",") { row.push(f); f = ""; }
      else if (c === "\n" || c === "\r") { if (c === "\r" && txt[i + 1] === "\n") i++; row.push(f); rows.push(row); row = []; f = ""; }
      else f += c;
    }
    if (f || row.length) { row.push(f); rows.push(row); }
    return rows;
  }
  async function pullSheet() {
    if (!C.scheduleCsvUrl) return;
    try {
      const r = await fetch(C.scheduleCsvUrl + (C.scheduleCsvUrl.includes("?") ? "&" : "?") + "t=" + Date.now());
      if (!r.ok) return;
      const rows = parseCSV(await r.text());
      const head = rows.shift().map(h => h.trim().toLowerCase());
      const ix = n => head.indexOf(n);
      const next = {};
      Object.keys(C.schedule).forEach(k => (next[k] = []));
      rows.forEach(c => {
        const date = (c[ix("date")] || "").trim();
        if (date) (next[date] ||= []).push({ time: c[ix("time")], name: c[ix("name")], role: c[ix("role")], note: c[ix("note")] });
      });
      schedule = next;
      if (!schedule[selectedDay]) selectedDay = dayKeys()[0];
      renderDays(); renderSchedule(selectedDay); renderTodayPreview();
    } catch (_) { /* offline → ใช้ตารางใน config.js */ }
  }
  pullSheet(); setInterval(pullSheet, 5 * 60 * 1000);

  // ================= clock / day change =================
  function clock() {
    const d = new Date();
    $("#clockTime").textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
    $("#clockDate").textContent = `${DOW[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}`;
  }
  clock(); setInterval(clock, 10000);
  let lastDay = todayKey();
  setInterval(() => { if (todayKey() !== lastDay) { lastDay = todayKey(); renderTodayPreview(); renderDays(); } }, 60000);

  // ================= idle → attract =================
  let idleT;
  function poke() { clearTimeout(idleT); idleT = setTimeout(() => show("attract"), C.idleSeconds * 1000); }
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
  setInterval(() => {
    if (current === "attract") $$("#attract video").forEach(v => v.paused && v.play().catch(() => {}));
  }, 5000);
})();
