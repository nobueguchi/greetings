(function () {
  "use strict";

  var cfg = window.GREETINGS_GATE;
  if (!cfg || !cfg.PASSWORD_SHA256) {
    console.error("[gate] Missing gate/config.js before protect.js");
    return;
  }

  var storageKey = cfg.STORAGE_KEY || "greetings-gate-ok";

  function alreadyAuthed() {
    try {
      return sessionStorage.getItem(storageKey) === cfg.PASSWORD_SHA256;
    } catch (e) {
      return false;
    }
  }

  function markAuthed() {
    try {
      sessionStorage.setItem(storageKey, cfg.PASSWORD_SHA256);
    } catch (e) {
      /* private mode — still allow this tab session via in-memory flag */
    }
  }

  function sha256Hex(text) {
    var data = new TextEncoder().encode(text);
    return crypto.subtle.digest("SHA-256", data).then(function (buf) {
      return Array.from(new Uint8Array(buf))
        .map(function (b) {
          return b.toString(16).padStart(2, "0");
        })
        .join("");
    });
  }

  if (alreadyAuthed()) return;

  var style = document.createElement("style");
  style.textContent =
    "#greetings-gate{position:fixed;inset:0;z-index:2147483647;" +
    "display:flex;align-items:center;justify-content:center;" +
    "background:radial-gradient(120% 80% at 50% 0%,#2a3340 0%,#12151a 55%,#0b0d10 100%);" +
    "font-family:Georgia,'Times New Roman',serif;color:#f2efe8}" +
    "#greetings-gate *{box-sizing:border-box}" +
    "#greetings-gate .panel{width:min(92vw,22rem);padding:1.75rem 1.5rem 1.5rem}" +
    "#greetings-gate h1{margin:0 0 .4rem;font-size:1.35rem;font-weight:normal;letter-spacing:.02em}" +
    "#greetings-gate p{margin:0 0 1.1rem;font-size:.92rem;line-height:1.45;color:#c8c2b6;" +
    "font-family:system-ui,-apple-system,sans-serif}" +
    "#greetings-gate form{display:flex;flex-direction:column;gap:.65rem}" +
    "#greetings-gate input{appearance:none;width:100%;padding:.7rem .85rem;border:1px solid #5a6358;" +
    "background:#1a1f26;color:#f2efe8;font-size:1rem;border-radius:2px;outline:none}" +
    "#greetings-gate input:focus{border-color:#a8b59a}" +
    "#greetings-gate button{appearance:none;border:0;padding:.7rem .85rem;background:#a8b59a;" +
    "color:#12151a;font:600 .95rem system-ui,-apple-system,sans-serif;cursor:pointer;border-radius:2px}" +
    "#greetings-gate button:hover{background:#b9c6ab}" +
    "#greetings-gate .err{min-height:1.2rem;margin:0;font-size:.82rem;color:#e8a0a0;" +
    "font-family:system-ui,-apple-system,sans-serif}" +
    "html.greetings-gate-locked,body.greetings-gate-locked{overflow:hidden!important}";

  var overlay = document.createElement("div");
  overlay.id = "greetings-gate";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Password required");
  overlay.innerHTML =
    '<div class="panel">' +
    "<h1>Design review</h1>" +
    "<p>Enter the shared password to view this page.</p>" +
    '<form autocomplete="on">' +
    '<input type="password" name="password" autocomplete="current-password" placeholder="Password" required />' +
    "<button type=\"submit\">Continue</button>" +
    '<p class="err" aria-live="polite"></p>' +
    "</form></div>";

  function mount() {
    document.documentElement.classList.add("greetings-gate-locked");
    if (document.body) document.body.classList.add("greetings-gate-locked");
    document.head.appendChild(style);
    document.body.appendChild(overlay);
    var input = overlay.querySelector("input");
    var err = overlay.querySelector(".err");
    var form = overlay.querySelector("form");
    input.focus();

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      err.textContent = "";
      var value = input.value;
      sha256Hex(value)
        .then(function (hex) {
          if (hex === cfg.PASSWORD_SHA256) {
            markAuthed();
            overlay.remove();
            style.remove();
            document.documentElement.classList.remove("greetings-gate-locked");
            document.body.classList.remove("greetings-gate-locked");
          } else {
            err.textContent = "Incorrect password.";
            input.select();
          }
        })
        .catch(function () {
          err.textContent = "Could not verify password in this browser.";
        });
    });
  }

  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
