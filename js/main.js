/* notebook variant — theme toggle, font switcher, click-to-redraw */
(function () {
  var html = document.documentElement;

  var tbtn = document.getElementById('themeToggle');
  if (tbtn) {
    tbtn.addEventListener('click', function () {
      var cur = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      var next = cur === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      try { localStorage.setItem('nb-theme', next); } catch (e) {}
    });
  }

  var fonts = [
    { id: 'spectral', label: 'Spectral · Caveat' },
    { id: 'garamond', label: 'EB Garamond · Caveat' },
    { id: 'fraunces', label: 'Fraunces · Caveat' }
  ];
  var saved = null;
  try { saved = localStorage.getItem('nb-font'); } catch (e) {}
  var idx = fonts.findIndex(function (f) { return f.id === saved; });
  if (idx < 0) idx = 0;
  html.setAttribute('data-font', fonts[idx].id);

  var fbtn = document.getElementById('fontSwitch');
  if (fbtn) {
    fbtn.title = fonts[idx].label;
    fbtn.addEventListener('click', function () {
      idx = (idx + 1) % fonts.length;
      html.setAttribute('data-font', fonts[idx].id);
      fbtn.title = fonts[idx].label;
      try { localStorage.setItem('nb-font', fonts[idx].id); } catch (e) {}
      showHint(fonts[idx].label);
    });
  }

  function showHint(text) {
    var h = document.getElementById('__nbHint');
    if (!h) {
      h = document.createElement('div');
      h.id = '__nbHint';
      h.style.cssText = 'position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%) rotate(-1.5deg);' +
        'padding:0.5rem 1.1rem;background:var(--sticky-bg);color:#2a2419;' +
        'font-family:var(--hand);font-size:1.25rem;line-height:1;' +
        'box-shadow:1px 2px 5px #00000028;z-index:9998;opacity:0;transition:opacity 240ms ease;pointer-events:none';
      document.body.appendChild(h);
    }
    h.textContent = text;
    h.style.opacity = '1';
    clearTimeout(h._t);
    h._t = setTimeout(function () { h.style.opacity = '0'; }, 1500);
  }

  var nameEl = document.getElementById('nameMark');
  if (nameEl) {
    nameEl.addEventListener('click', function () {
      var path = nameEl.querySelector('.underline path');
      if (!path) return;
      path.style.animation = 'none';
      void path.getBoundingClientRect();
      path.style.animation = '';
    });
  }
})();
