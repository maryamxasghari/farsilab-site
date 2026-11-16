// FarsiLab Play page.
// Each game or activity is stored locked (encrypted) in play/<id>.bin and opens only with its own code.
// Buyers get a link like  play.html#<id>=<CODE>  (and a QR code of it) in their PDF.
// To add one: lock it with lock_play_item.py (private repo), put the .bin in play/, add an entry here.
// etsy: paste the listing's own link once it is live. Empty = button goes to the shop.
// soon: true = not for sale yet: the card says "Coming soon" with no Etsy or code button (its unlock link still works for testing).
const PLAY_ITEMS = [
  {
    id: "colors-game", kind: "Game", title: "Color game", fa: "بازی رنگ‌ها",
    blurb: "Read the color word in Farsi and tap the right paint splash. Six colors, stars and a medal from Fifi.",
    art: "blobs", bg: "#FFF1D0", etsy: "", soon: true
  },
  {
    id: "trace-letters", kind: "Activity", title: "Trace the letters", fa: "تمرین نوشتن",
    blurb: "Trace big Farsi letters with a finger. Fifi checks the tracing and gives a star for each letter.",
    art: "آ ب", bg: "#DDF1F0", etsy: "", soon: true
  }
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
    $("how").hidden = PLAY_ITEMS.every(x => x.soon);   // nothing to buy yet: no "Already bought one?" box
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

  // Link from the PDF or QR code: play.html#<id>=<CODE>
  async function fromLink() {
    const h = decodeURIComponent(location.hash.replace(/^#/, ""));
    const m = h.match(/^([a-z0-9-]+)=(.+)$/i);
    if (!m) return;
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
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

  render();
  if (!window.crypto || !crypto.subtle) toast("Please open this page with https:// in an up-to-date browser to unlock.", false);
  else fromLink();
  window.addEventListener("hashchange", fromLink);
})();
