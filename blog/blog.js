/* Day / Night toggle, shares the "th" key with the main site. */
(function () {
  var root = document.documentElement, tg = document.getElementById('tg');
  if (!tg) return;
  function set(light) {
    if (light) root.setAttribute('data-theme', 'light'); else root.removeAttribute('data-theme');
    tg.textContent = light ? 'Night' : 'Day';
    try { localStorage.setItem('th', light ? 'light' : 'dark'); } catch (e) {}
  }
  tg.addEventListener('click', function () { set(root.getAttribute('data-theme') !== 'light'); });
  tg.textContent = root.getAttribute('data-theme') === 'light' ? 'Night' : 'Day';
})();
