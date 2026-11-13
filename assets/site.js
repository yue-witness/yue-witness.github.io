// 语言切换（记住选择，供中文页跳转判断）、截图放大、宣传片同一时间只播放一个。
(function () {
  Array.prototype.forEach.call(document.querySelectorAll('a[data-lang]'), function (a) {
    a.addEventListener('click', function () {
      try { localStorage.setItem('lang', a.getAttribute('data-lang')); } catch (e) {}
      if (location.hash) a.href = a.getAttribute('href').split('#')[0] + location.hash;
    });
  });

  var videos = Array.prototype.slice.call(document.querySelectorAll('video'));
  videos.forEach(function (v) {
    v.addEventListener('play', function () {
      videos.forEach(function (o) { if (o !== v) o.pause(); });
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
