// FarsiLab Play page.
// Each game or activity is stored locked (encrypted) in play/<id>.bin and opens only with its own code.
// Buyers get a link like  play.html#<id>=<CODE>  (and a QR code of it) in their PDF.
// To add one: lock it with lock_play_item.py (private repo), put the .bin in play/, add an entry here.
// etsy: paste the listing's own link once it is live. Empty = button goes to the shop.
// soon: true = not for sale yet: the card says "Coming soon" with no Etsy or code button (its unlock link still works for testing).
const PLAY_ITEMS = [
  {
    id: "colors-game", kind: "Game", title: "Color game", fa: "بازی رنگ‌ها",
    blurb: "Read the color word in Farsi and tap the right paint splash. Twelve colors, hints, stars and a medal from Fifi.",
    art: "blobs", bg: "#FFF1D0", etsy: "", soon: true
  },
  {
    id: "trace-letters", kind: "Activity", title: "Trace the letters", fa: "تمرین نوشتن",
    blurb: "Trace big Farsi letters with a finger. Fifi checks the tracing and gives a star for each letter.",
    art: "آ ب", bg: "#DDF1F0", etsy: "", soon: true
  },
  {
    id: "build-word", kind: "Activity", title: "Build the word", fa: "کلمه بساز",
    blurb: "Put the letters in their places, right to left, and build animal words like فیل with Fifi.",
    art: "ف ی ل", bg: "#FCE4EC", etsy: "", soon: true
  },
  {
    id: "sort-baskets", kind: "Game", title: "Sort the colors", fa: "رنگ‌ها را جدا کن",
    blurb: "Drag each fruit and friend into the basket of its color, red or yellow.",
    art: "🧺", bg: "#FFF1D0", etsy: "", soon: true
  },
  {
    id: "count-feed", kind: "Game", title: "Count and feed Fifi", fa: "بشمار و به فی‌فی غذا بده",
    blurb: "Fifi is hungry! Count the apples in Farsi and give her just the right number.",
    art: "۱ ۲ ۳", bg: "#E8F5E9", etsy: "", soon: true
  },
  {
    id: "shadow-match", kind: "Game", title: "Shadow match", fa: "سایه‌ها را پیدا کن",
    blurb: "Put each animal on its shadow and learn its name in Farsi.",
    art: "🦒", bg: "#E3F2FD", etsy: "", soon: true
  },
  {
    id: "memory-pairs", kind: "Game", title: "Memory pairs", fa: "جفت‌ها را پیدا کن",
    blurb: "Turn over two cards and match each animal picture with its Farsi word.",
    art: "🃏", bg: "#F3E5F5", etsy: "", soon: true
  },
  {
    id: "numbers-game", kind: "Game", title: "Number game", fa: "بازی عددها",
    blurb: "Count the apples or read the Farsi number word, then tap the right Persian number from ۱ to ۱۰.",
    art: "۴ ۵ ۶", bg: "#E3F2FD", etsy: "", soon: true
  },
  {
    id: "trace-numbers", kind: "Activity", title: "Trace the numbers", fa: "تمرین نوشتن عددها",
    blurb: "Trace Persian numbers from ۱ to ۲۰ with your finger and see each number word.",
    art: "۱۷", bg: "#FFF3E0", etsy: "", soon: true
  },
  {
    id: "find-numbers", kind: "Game", title: "Find the numbers", fa: "عددها را پیدا کن",
    blurb: "Find every copy of the number on the board, from ۱ to ۲۰.",
    art: "🔍", bg: "#E8F5E9", etsy: "", soon: true
  },
  {
    id: "color-numbers", kind: "Game", title: "Color the numbers", fa: "عددها را رنگ کن",
    blurb: "Color all the same numbers with the same color until the board is a rainbow.",
    art: "🎨", bg: "#FCE4EC", etsy: "", soon: true
  },
  {
    id: "count-to-100", kind: "Game", title: "Count to 100", fa: "بشمار تا صد",
    blurb: "Count apples in ten-frames from ۱۱ to ۲۰, then count bars of ten up to ۱۰۰.",
    art: "۱۰۰", bg: "#E3F2FD", etsy: "", soon: true
  },
  {
    id: "number-cards", kind: "Cards", title: "Talking number cards", fa: "کارت‌های عدد",
    blurb: "Swipe through the numbers ۰ to ۱۰۰ with Fifi and tap to hear each number, or count one sun, two eyes, three balloons.",
    art: "۱۲۳", bg: "#FFF3E0", etsy: "", soon: true
  },
  {
    id: "numbers-story", kind: "Story", title: "Fifi counts (read-aloud story)", fa: "فی‌فی می‌شمارد",
    blurb: "A 12-page read-aloud story: count from one to ten with Fifi through her day. Tap to hear each page.",
    art: "📖", bg: "#E8F5E9", etsy: "", soon: true
  },
  {
    id: "yalda-memory", kind: "Game", title: "Yalda memory pairs", fa: "جفت‌های یلدا",
    blurb: "Turn over two cards and match each Yalda picture, like انار and هندوانه, with its Farsi word.",
    art: "🍉", bg: "#FCE4EC", etsy: "", soon: true
  },
  {
    id: "yalda-shadow", kind: "Game", title: "Yalda shadows", fa: "سایه‌های یلدا",
    blurb: "Put the pomegranate, candle, moon and other Yalda things on their shadows and hear their Farsi names.",
    art: "🕯️", bg: "#E3F2FD", etsy: "", soon: true
  },
  {
    id: "yalda-word", kind: "Activity", title: "Build Yalda words", fa: "کلمه‌های یلدا را بساز",
    blurb: "Put the letters in their places, right to left, and build Yalda words like انار and شمع.",
    art: "ا ن ا ر", bg: "#FFF1D0", etsy: "", soon: true
  },
  {
    id: "yalda-story", kind: "Story", title: "Fifi's Yalda Night (read-aloud story)", fa: "شب یلدای فی‌فی",
    blurb: "A 10-page read-aloud story about Yalda night with Fifi and her family. Tap to hear each page.",
    art: "🌙", bg: "#E8EAF6", etsy: "", soon: true
  }
];

// Bundles: ONE code (and one QR) that unlocks several games at once, for packs and bundles.
// play/<id>.bin holds the list of games and their codes, locked with the bundle's code (lock_play_bundle.py, private repo).
// Link format is the same as for one game: play.html#<bundle id>=<CODE>
const PLAY_BUNDLES = [
  { id: "numbers-pack", title: "Numbers pack games" },
  { id: "yalda-pack", title: "Yalda pack games" }
];

(function () {
  const STORE = "farsilab_play_codes", ROUNDS = 150000;
  const $ = id => document.getElementById(id);
  const shop = typeof SHOP === "string" ? SHOP : "https://www.etsy.com/shop/FarsiLab";
  let codes = {};
  try { codes = JSON.parse(localStorage.getItem(STORE) || "{}") || {}; } catch (e) { codes = {}; }
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(codes)); } catch (e) {} };
  const norm = c => (c || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  const item = id => PLAY_ITEMS.find(x => x.id === id);

  // Returns the page HTML, or throws if the code is wrong.
  async function unlock(id, code) {
    const res = await fetch("play/" + id + ".bin", { cache: "no-cache" });
    if (!res.ok) throw new Error("missing");
    const buf = new Uint8Array(await res.arrayBuffer());
    const salt = buf.slice(0, 16), iv = buf.slice(16, 28), data = buf.slice(28);
    const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(norm(code)), "PBKDF2", false, ["deriveKey"]);
    const key = await crypto.subtle.deriveKey({ name: "PBKDF2", salt, iterations: ROUNDS, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, ["decrypt"]);
    const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);
    return new TextDecoder().decode(plain);
  }

  // Bundle: returns the list of games it opened (and remembers their codes), or throws if the code is wrong.
  const bundle = id => PLAY_BUNDLES.find(x => x.id === id);
  async function unlockBundle(id, code) {
    const list = JSON.parse(await unlock(id, code)).items || {};
    const opened = [];
    Object.keys(list).forEach(k => { const it = item(k); if (it) { codes[k] = norm(list[k]); opened.push(it); } });
    save();
    return opened;
  }
  function bundleDone(b, opened) {
    render();
    toast("🎉 " + opened.length + " games are unlocked on this device: " + opened.map(x => x.title).join(", ") + ". Tap Play.", true);
    const card = opened[0] && $("card-" + opened[0].id); if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function toast(text, ok) {
    const t = $("toast"); t.textContent = text; t.className = "toast " + (ok ? "ok" : "bad"); t.hidden = false;
  }

  function tileArt(it) {
    if (it.art === "blobs") {
      const cs = ["#E53935", "#1E78D2", "#FFCE54", "#469628", "#F28C1E", "#7846C8"];
      return '<div class="blobs">' + cs.map(c => '<i style="--c:' + c + '"></i>').join("") + "</div>";
    }
    return '<div class="art">' + it.art + "</div>";
  }

  function render() {
    const grid = $("grid"); grid.innerHTML = "";
    PLAY_ITEMS.forEach(it => {
      const open = !!codes[it.id];
      const card = document.createElement("div");
      card.className = "pcard" + (open ? " open" : ""); card.id = "card-" + it.id;
      card.innerHTML =
        '<div class="tile" style="--bg:' + it.bg + '">' + tileArt(it) +
          '<span class="kind">' + it.kind + "</span>" +
          '<div class="lock" aria-hidden="true"><span>🔒</span></div></div>' +
        '<div class="pbody"><h3>' + it.title + '<span class="fa">' + it.fa + "</span></h3>" +
          "<p>" + it.blurb + "</p>" +
          (open
            ? '<div class="state unlocked">✓ Unlocked on this device</div><div class="actions"><button class="pbtn go" type="button" data-play>▶ Play</button></div>'
            : it.soon ? '<div class="state soon">⏳ Coming soon</div>'
            : '<div class="state locked">🔒 Locked</div><div class="actions">' +
              '<a class="pbtn etsy" target="_blank" rel="noopener" href="' + (it.etsy || shop) + '">Get it on Etsy</a>' +
              '<button class="pbtn code" type="button" data-code>I have a code</button>' +
              '<form class="codebox" hidden><input type="text" inputmode="text" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="XXXX-XXXX-XXXX" aria-label="Unlock code for ' + it.title + '">' +
              '<button class="pbtn go" type="submit">Unlock</button><div class="err" role="alert"></div></form></div>') +
        "</div>";
      grid.appendChild(card);

      const playBtn = card.querySelector("[data-play]");
      if (playBtn) playBtn.onclick = () => play(it, playBtn);
      const codeBtn = card.querySelector("[data-code]");
      if (codeBtn) {
        const form = card.querySelector("form"), input = form.querySelector("input"), err = form.querySelector(".err");
        codeBtn.onclick = () => { form.hidden = false; codeBtn.hidden = true; input.focus(); };
        form.onsubmit = async e => {
          e.preventDefault();
          const btn = form.querySelector("button");
          if (norm(input.value).length < 6) { err.textContent = "Please type the code from your PDF."; return; }
          btn.disabled = true; btn.textContent = "Checking…"; err.textContent = "";
          try {
            const html = await unlock(it.id, input.value);
            codes[it.id] = norm(input.value); save(); render();
            toast("🎉 " + it.title + " is unlocked on this device!", true);
            show(it, html);
          } catch (x) {
            btn.disabled = false; btn.textContent = "Unlock";
            err.textContent = x.message === "missing" ? "Could not load it. Check your internet and try again." : "That code does not open this one. Check the code in your PDF.";
          }
        };
      }
    });
  }

  async function play(it, btn) {
    if (btn) { btn.disabled = true; btn.textContent = "Opening…"; }
    try { show(it, await unlock(it.id, codes[it.id])); }
    catch (x) {
      if (x.message === "missing") toast("Could not load it. Check your internet and try again.", false);
      else { delete codes[it.id]; save(); toast("The code for " + it.title + " has changed. Please use the link in your PDF again.", false); }
    }
    render();
  }

  function show(it, html) {
    $("ptitle").textContent = it.title;
    $("frame").srcdoc = html;
    $("player").hidden = false; document.body.classList.add("playing");
  }
  $("close").onclick = () => {
    $("player").hidden = true; document.body.classList.remove("playing");
    $("frame").srcdoc = ""; $("frame").removeAttribute("srcdoc");
  };

  // Unlock with just a code: try it on every item that is not unlocked yet.
  async function unlockAny(code, id) {
    if (!id || bundle(id)) {
      for (const b of PLAY_BUNDLES.filter(x => !id || x.id === id)) {
        try { const opened = await unlockBundle(b.id, code); if (opened.length) return { bundle: b, opened }; } catch (x) { if (x.message === "missing") throw x; }
      }
      if (id) return null;
    }
    const list = id ? PLAY_ITEMS.filter(x => x.id === id) : PLAY_ITEMS.filter(x => !codes[x.id]);
    for (const it of list) {
      try { await unlock(it.id, code); codes[it.id] = norm(code); save(); return it; } catch (x) { if (x.message === "missing") throw x; }
    }
    return null;
  }
  function unlocked(it) {
    render();
    toast("🎉 " + it.title + " is unlocked on this device! Tap Play.", true);
    const card = $("card-" + it.id); if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  // Read what a QR code says: the PDF link (play.html#<id>=<CODE>) or just a code.
  function parseScan(text) {
    const t = (text || "").trim();
    const m = decodeURIComponent(t.split("#")[1] || "").match(/^([a-z0-9-]+)=(.+)$/i);
    if (m) return { id: m[1], code: m[2] };
    if (/^[A-Za-z0-9 -]{6,30}$/.test(t)) return { id: null, code: t };
    return null;
  }

  // Type a code
  $("typeBtn").onclick = () => { const f = $("anyCode"); f.hidden = !f.hidden; if (!f.hidden) f.querySelector("input").focus(); };
  $("anyCode").onsubmit = async e => {
    e.preventDefault();
    const f = $("anyCode"), input = f.querySelector("input"), err = f.querySelector(".err"), btn = f.querySelector("button");
    if (norm(input.value).length < 6) { err.textContent = "Please type the code from your PDF."; return; }
    btn.disabled = true; btn.textContent = "Checking…"; err.textContent = "";
    try {
      const it = await unlockAny(input.value);
      btn.disabled = false; btn.textContent = "Unlock";
      if (it && it.bundle) { input.value = ""; f.hidden = true; bundleDone(it.bundle, it.opened); }
      else if (it) { input.value = ""; f.hidden = true; unlocked(it); }
      else err.textContent = "That code does not open any game here. Check the code in your PDF.";
    } catch (x) { btn.disabled = false; btn.textContent = "Unlock"; err.textContent = "Could not check it. Check your internet and try again."; }
  };

  // Scan a QR code with the camera (or from a photo)
  let stream = null, scanning = false;
  const scanMsg = (txt, cls) => { const m = $("scanMsg"); m.textContent = txt; m.className = "scan-msg" + (cls ? " " + cls : ""); };
  function stopScan() {
    scanning = false;
    if (stream) { stream.getTracks().forEach(tr => tr.stop()); stream = null; }
    $("scanner").hidden = true;
  }
  async function handleScan(text) {
    const r = parseScan(text);
    if (!r) { scanMsg("That QR code is not a FarsiLab unlock code.", "bad"); return false; }
    scanMsg("Unlocking…", "ok");
    try {
      const it = await unlockAny(r.code, r.id && (item(r.id) || bundle(r.id)) ? r.id : null);
      if (it && it.bundle) { stopScan(); bundleDone(it.bundle, it.opened); return true; }
      if (it) { stopScan(); unlocked(it); return true; }
      scanMsg("This code does not open any game here.", "bad"); return false;
    } catch (x) { scanMsg("Could not check it. Check your internet and try again.", "bad"); return false; }
  }
  function decode(source, w, h) {
    const c = document.createElement("canvas"); c.width = w; c.height = h;
    const ctx = c.getContext("2d", { willReadFrequently: true }); ctx.drawImage(source, 0, 0, w, h);
    const res = window.jsQR ? jsQR(ctx.getImageData(0, 0, w, h).data, w, h) : null;
    return res && res.data;
  }
  $("scanBtn").onclick = async () => {
    $("scanner").hidden = false; scanMsg("Point the camera at the QR code.");
    const v = $("scanVideo");
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
      v.srcObject = stream; await v.play(); scanning = true;
      const tick = async () => {
        if (!scanning) return;
        if (v.readyState >= 2 && v.videoWidth) {
          const s = Math.min(640, v.videoWidth), k = s / v.videoWidth;
          const text = decode(v, s, Math.round(v.videoHeight * k));
          if (text) { scanning = false; if (await handleScan(text)) return; setTimeout(() => { if (stream) { scanning = true; tick(); } }, 1500); return; }
        }
        requestAnimationFrame(tick);
      };
      tick();
    } catch (x) {
      scanMsg("Camera not available. Tap \"Use a photo instead\" and take a picture of the QR code.", "bad");
    }
  };
  $("scanClose").onclick = stopScan;
  $("scanFile").onchange = e => {
    const file = e.target.files && e.target.files[0]; if (!file) return;
    const img = new Image();
    img.onload = () => {
      const s = Math.min(1200, img.width), k = s / img.width;
      const text = decode(img, s, Math.round(img.height * k));
      URL.revokeObjectURL(img.src); e.target.value = "";
      if (text) handleScan(text); else scanMsg("No QR code found in that photo. Try again closer.", "bad");
    };
    img.src = URL.createObjectURL(file);
  };

  // Link from the PDF or QR code: play.html#<id>=<CODE>
  async function fromLink() {
    const h = decodeURIComponent(location.hash.replace(/^#/, ""));
    const m = h.match(/^([a-z0-9-]+)=(.+)$/i);
    if (!m) return;
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
    const b = bundle(m[1]);
    if (b) {
      toast("Unlocking " + b.title + "…", true);
      try { bundleDone(b, await unlockBundle(b.id, m[2])); }
      catch (x) { toast(x.message === "missing" ? "Could not load it. Check your internet and try again." : "This link's code does not work. Check the link in your PDF.", false); }
      return;
    }
    const it = item(m[1]);
    if (!it) { toast("This link does not match a game or activity here. Check the link in your PDF.", false); return; }
    toast("Unlocking " + it.title + "…", true);
    try {
      await unlock(it.id, m[2]);
      codes[it.id] = norm(m[2]); save(); render();
      toast("🎉 " + it.title + " is unlocked on this device! Tap Play.", true);
      const card = $("card-" + it.id); if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
    } catch (x) {
      toast(x.message === "missing" ? "Could not load it. Check your internet and try again." : "This link's code does not work. Check the link in your PDF.", false);
    }
  }

  // Already opened from the home screen: no need to show the "Add to home screen" guide.
  if (window.matchMedia("(display-mode: standalone)").matches || navigator.standalone) document.body.classList.add("standalone");
  render();
  if (!window.crypto || !crypto.subtle) toast("Please open this page with https:// in an up-to-date browser to unlock.", false);
  else fromLink();
  window.addEventListener("hashchange", fromLink);
})();
