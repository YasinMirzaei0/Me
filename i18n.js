/* Language switch (EN / FA). English text is read from the page itself on load, Persian comes from lang-fa.js.
   Must load before script.js so the word-splitting animation runs on the translated text. */
(function () {
  var M = window.MIRWEB = window.MIRWEB || {}, root = document.documentElement, FA = M.fa || {}, KEY = 'lang';
  var nodes = [].slice.call(document.querySelectorAll('[data-i18n],[data-i18n-ph],[data-i18n-al]'));
  nodes.forEach(function (el) {
    if (el.hasAttribute('data-i18n')) el._en = el.innerHTML;
    if (el.hasAttribute('data-i18n-ph')) el._enPh = el.getAttribute('placeholder');
    if (el.hasAttribute('data-i18n-al')) el._enAl = el.getAttribute('aria-label');
  });
  var lang = 'en';
  try { if (localStorage.getItem(KEY) === 'fa') lang = 'fa'; } catch (e) {}
  M.lang = lang;
  M.t = function (k, en) { return lang === 'fa' && FA[k] != null ? FA[k] : en; };

  function loadFont() {
    if (document.getElementById('fa-font')) return;
    var l = document.createElement('link');
    l.id = 'fa-font'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;800&display=swap';
    document.head.appendChild(l);
  }
  function pick(k, en) { return lang === 'fa' && FA[k] != null ? FA[k] : en; }

  function apply(next, live) {
    lang = next; M.lang = next;
    root.lang = next; root.dir = next === 'fa' ? 'rtl' : 'ltr';
    if (next === 'fa') loadFont();
    nodes.forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (k !== null) {
        var v = pick(k, el._en);
        if (el.innerHTML !== v) el.innerHTML = v;
        if (live && el.hasAttribute('data-split') && M.split) M.split(el);
      }
      k = el.getAttribute('data-i18n-ph'); if (k !== null) el.setAttribute('placeholder', pick(k, el._enPh));
      k = el.getAttribute('data-i18n-al'); if (k !== null) el.setAttribute('aria-label', pick(k, el._enAl));
    });
    var tg = document.getElementById('tg'), lg = document.getElementById('lg');
    if (tg) tg.textContent = root.getAttribute('data-theme') === 'light' ? pick('theme.night', 'Night') : pick('theme.day', 'Day');
    if (lg) { lg.textContent = next === 'fa' ? 'EN' : 'FA'; lg.setAttribute('aria-label', pick('lang.aria', 'Change language')); }
    if (M.onLang) M.onLang(next);
    if (live) dispatchEvent(new Event('resize'));
  }
  M.setLang = function (next) {
    try { localStorage.setItem(KEY, next); } catch (e) {}
    apply(next, true);
  };
  apply(lang, false);
  /* Place the language button on the same line as the Day / Night button. It sits outside the fixed header, so it scrolls away with the page. */
  var lgEl = document.getElementById('lg'), tgEl = document.getElementById('tg'), hd = document.querySelector('header');
  function place() {
    if (!lgEl || !tgEl) return;
    lgEl.style.top = tgEl.getBoundingClientRect().top + 'px'; /* the header is fixed, so its viewport position is constant */
  }
  place();
  addEventListener('load', place); addEventListener('resize', place);
  if (window.ResizeObserver && hd) new ResizeObserver(place).observe(hd);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
  var btn = document.getElementById('lg');
  if (btn) btn.addEventListener('click', function () { M.setLang(lang === 'fa' ? 'en' : 'fa'); });
})();
