/* -----------------------------------------------------------
   Nishad Singhi — redesign
   theme toggle · font switcher · rotating P.S. · click-to-draw
   ----------------------------------------------------------- */

(function () {
  var html = document.documentElement;

  // ---- theme toggle ----
  var btn = document.getElementById('themeToggle');
  if (btn) {
    btn.addEventListener('click', function () {
      var cur = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = cur === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // ---- font switcher ----
  var fonts = [
    { id: 'garamond',  label: 'EB Garamond' },
    { id: 'fraunces',  label: 'Fraunces · Newsreader' },
    { id: 'cormorant', label: 'Cormorant · Lora' },
    { id: 'playfair',  label: 'Playfair · Source Serif' },
    { id: 'crimson',   label: 'Crimson Pro · Inter' }
  ];
  var savedFont = null;
  try { savedFont = localStorage.getItem('font'); } catch (e) {}
  var idx = fonts.findIndex(function (f) { return f.id === savedFont; });
  if (idx < 0) idx = 0;
  html.setAttribute('data-font', fonts[idx].id);

  var fbtn = document.getElementById('fontSwitch');
  if (fbtn) {
    fbtn.title = fonts[idx].label;
    fbtn.addEventListener('click', function () {
      idx = (idx + 1) % fonts.length;
      html.setAttribute('data-font', fonts[idx].id);
      fbtn.title = fonts[idx].label;
      try { localStorage.setItem('font', fonts[idx].id); } catch (e) {}
      showHint(fonts[idx].label);
    });
  }

  function showHint(text) {
    var h = document.getElementById('__fontHint');
    if (!h) {
      h = document.createElement('div');
      h.id = '__fontHint';
      h.style.cssText = 'position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);' +
        'padding:0.45rem 1rem;border:1px solid var(--rule);background:var(--bg-soft);' +
        'color:var(--ink-soft);font-family:var(--serif-display);font-style:italic;font-size:0.95rem;' +
        'border-radius:999px;z-index:9998;opacity:0;transition:opacity 240ms ease;pointer-events:none';
      document.body.appendChild(h);
    }
    h.textContent = text;
    h.style.opacity = '1';
    clearTimeout(h._t);
    h._t = setTimeout(function () { h.style.opacity = '0'; }, 1400);
  }

  // ---- rotating P.S. note (deterministic by day) ----
  var notes = [
    "ask me about masala dosa.",
    "currently re-reading the same paper for the fourth time.",
    "the badminton court is always open.",
    "if it sings, plays guitar, or runs on a GPU — I'm in.",
    "Tübingen → Cupertino, with a layover in IIT Delhi.",
    "verifiers > vibes (mostly).",
    "this site is set, like a good newspaper, in proper type."
  ];
  var ps = document.getElementById('psNote');
  if (ps) {
    var now = new Date();
    var dayIdx = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000) + now.getFullYear();
    ps.textContent = notes[dayIdx % notes.length];
  }

  // ---- click the name to re-draw the underline ----
  var nameEl = document.getElementById('nameMark');
  if (nameEl) {
    nameEl.addEventListener('click', function () {
      var path = nameEl.querySelector('.underline path');
      if (!path) return;
      path.style.animation = 'none';
      // force reflow, then re-apply
      void path.getBoundingClientRect();
      path.style.animation = '';
    });
  }
})();
