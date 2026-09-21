/* Nyköping MeshCore – liten sidskript. Bootstrap-bundeln sköter navbar och accordion. */
(function () {
  'use strict';

  // Stäng mobilmenyn när man klickar på en ankarlänk.
  var nav = document.getElementById('mainnav');
  if (nav) {
    nav.addEventListener('click', function (e) {
      var link = e.target.closest('a.nav-link');
      if (!link || !nav.classList.contains('show')) return;
      var collapse = window.bootstrap && window.bootstrap.Collapse.getInstance(nav);
      if (collapse) collapse.hide();
    });
  }

  // Markera aktivt menyval vid scroll.
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav-list .nav-link'));
  if (!sections.length || !links.length || !('IntersectionObserver' in window)) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var id = '#' + entry.target.id;
      links.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === id);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(function (s) { observer.observe(s); });
})();
