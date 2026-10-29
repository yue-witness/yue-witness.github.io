// Game tabs (hash deep links, arrow keys) and a small screenshot lightbox.
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));

  function select(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
    var id = tab.getAttribute('data-game');
    if (location.hash.slice(1) !== id && history.replaceState) {
      history.replaceState(null, '', '#' + id);
    }
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(tab, false); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') next = tabs[0];
      else if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); select(next, true); }
    });
  });

  function fromHash() {
    var id = location.hash.slice(1);
    var hit = tabs.filter(function (t) { return t.getAttribute('data-game') === id; })[0];
    if (hit) select(hit, false);
  }
  window.addEventListener('hashchange', fromHash);
  fromHash();

  // The language switch remembers the choice (used by the root redirect) and keeps the open tab.
  Array.prototype.forEach.call(document.querySelectorAll('a[data-lang]'), function (a) {
    a.addEventListener('click', function () {
      try { localStorage.setItem('lang', a.getAttribute('data-lang')); } catch (e) {}
      if (location.hash) a.href = a.getAttribute('href').split('#')[0] + location.hash;
    });
  });

  var box = document.getElementById('lightbox');
  if (!box || typeof box.showModal !== 'function') return;
  var img = box.querySelector('img');
  Array.prototype.forEach.call(document.querySelectorAll('a[data-zoom]'), function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var inner = a.querySelector('img');
      img.src = a.href;
      img.alt = inner ? inner.alt : '';
      box.showModal();
    });
  });
  box.addEventListener('click', function (e) {
    if (e.target === box || e.target.tagName === 'BUTTON') box.close();
  });
  box.addEventListener('close', function () { img.removeAttribute('src'); });
})();
