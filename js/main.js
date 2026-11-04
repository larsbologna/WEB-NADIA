/* ==========================================================================
   Nadia Banegas | Arquitecta — Interacciones
   ========================================================================== */
(function () {
  'use strict';

  var doc = document.documentElement;
  doc.classList.add('js');

  var content = window.SITE_CONTENT || {};
  var wa = content.whatsapp || {
    number: '5493547591959',
    defaultMessage: 'Hola Nadia, estuve viendo tu página web y quisiera hacerte una consulta sobre un proyecto.',
    serviceMessage: 'Hola Nadia, estuve viendo tu página web y quisiera hacerte una consulta sobre el servicio de {servicio}.'
  };

  /* ---------- Enlaces de WhatsApp con mensajes precargados ---------- */
  function waLink(message) {
    return 'https://wa.me/' + wa.number + '?text=' + encodeURIComponent(message);
  }

  function setupWhatsApp(root) {
    (root || document).querySelectorAll('[data-wa]').forEach(function (el) {
      var service = el.getAttribute('data-service');
      var custom = el.getAttribute('data-msg');
      var message = custom
        || (service ? wa.serviceMessage.replace('{servicio}', service.toLowerCase()) : wa.defaultMessage);
      el.setAttribute('href', waLink(message));
    });
  }
  setupWhatsApp();

  /* ---------- Header al hacer scroll ---------- */
  var header = document.querySelector('[data-header]');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menú responsive ---------- */
  var toggle = document.querySelector('[data-nav-toggle]');
  var panel = document.querySelector('[data-nav-panel]');
  var mqDesktop = window.matchMedia('(min-width: 960px)');

  function setMenu(open) {
    document.body.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr-only').textContent = open ? 'Cerrar menú' : 'Abrir menú';
    if (!mqDesktop.matches) {
      if (open) panel.removeAttribute('inert'); else panel.setAttribute('inert', '');
    }
  }
  function syncPanel() {
    if (mqDesktop.matches) { panel.removeAttribute('inert'); setMenu(false); }
    else if (!document.body.classList.contains('nav-open')) panel.setAttribute('inert', '');
  }
  toggle.addEventListener('click', function () {
    setMenu(!document.body.classList.contains('nav-open'));
  });
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) { setMenu(false); toggle.focus(); }
  });
  (mqDesktop.addEventListener ? mqDesktop.addEventListener('change', syncPanel) : mqDesktop.addListener(syncPanel));
  syncPanel();

  /* ---------- Sección activa en la navegación ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav-link]'));
  var sectionMap = {};
  navLinks.forEach(function (a) { sectionMap[a.getAttribute('href').slice(1)] = a; });
  // Secciones intermedias se asocian al ítem de menú más cercano.
  var alias = { propuesta: 'inicio', proceso: 'proyectos', resenas: 'proyectos', preguntas: 'contacto' };

  if ('IntersectionObserver' in window) {
    var activeObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = alias[entry.target.id] || entry.target.id;
        navLinks.forEach(function (a) { a.classList.remove('is-active'); });
        if (sectionMap[id]) sectionMap[id].classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { activeObs.observe(s); });
  }

  /* ---------- Proyectos (solo material real) ---------- */
  var projects = Array.isArray(content.projects) ? content.projects : [];
  var gallery = document.querySelector('[data-projects]');
  var empty = document.querySelector('[data-projects-empty]');

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  if (projects.length && gallery) {
    projects.forEach(function (p, i) {
      var item = el('article', 'project reveal');
      var btn = el('button', 'project-btn');
      btn.type = 'button';
      btn.setAttribute('aria-label', 'Ampliar imagen: ' + p.name);
      btn.dataset.index = i;
      var media = el('div', 'project-media');
      var img = new Image();
      img.src = p.image; img.alt = p.alt || p.name; img.loading = 'lazy'; img.decoding = 'async';
      if (p.width) img.width = p.width;
      if (p.height) img.height = p.height;
      media.appendChild(img);
      btn.appendChild(media);
      item.appendChild(btn);
      if (p.type) item.appendChild(el('p', 'project-type', p.type));
      item.appendChild(el('h3', 'project-name', p.name));
      if (p.description) item.appendChild(el('p', 'project-desc', p.description));
      gallery.appendChild(item);
    });
    gallery.hidden = false;
    if (empty) empty.remove();
    setupLightbox();
  }

  function setupLightbox() {
    var box = el('div', 'lightbox');
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Imagen ampliada del proyecto');
    var close = el('button', 'lightbox-close', '×');
    close.type = 'button';
    close.setAttribute('aria-label', 'Cerrar');
    var big = new Image();
    var cap = el('p', 'lightbox-caption');
    box.appendChild(close); box.appendChild(big); box.appendChild(cap);
    document.body.appendChild(box);
    var lastFocus = null;

    function open(i) {
      var p = projects[i];
      big.src = p.image; big.alt = p.alt || p.name;
      cap.textContent = p.name + (p.type ? ' — ' + p.type : '');
      lastFocus = document.activeElement;
      box.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      close.focus();
    }
    function shut() {
      box.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }
    gallery.addEventListener('click', function (e) {
      var b = e.target.closest('.project-btn');
      if (b) open(+b.dataset.index);
    });
    close.addEventListener('click', shut);
    box.addEventListener('click', function (e) { if (e.target === box) shut(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && box.classList.contains('is-open')) shut();
    });
  }

  /* ---------- Reseñas reales de Google ---------- */
  var reviews = Array.isArray(content.reviews) ? content.reviews : [];
  var reviewList = document.querySelector('[data-reviews]');
  if (reviews.length && reviewList) {
    reviews.forEach(function (r) {
      var li = el('li', 'review reveal');
      if (r.rating) {
        var stars = el('p', 'review-stars', '★★★★★'.slice(0, Math.round(r.rating)));
        stars.setAttribute('aria-label', r.rating + ' de 5 estrellas en Google');
        li.appendChild(stars);
      }
      var q = el('blockquote', 'review-text');
      q.textContent = '“' + r.text + '”';
      li.appendChild(q);
      var author = el('p', 'review-author', r.author);
      if (r.date) author.appendChild(el('span', 'review-meta', 'Reseña en Google · ' + r.date));
      li.appendChild(author);
      reviewList.appendChild(li);
    });
    reviewList.hidden = false;
  }

  /* ---------- Acordeón ---------- */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-accordion] .acc-trigger').forEach(function (btn) {
    var panelEl = document.getElementById(btn.getAttribute('aria-controls'));
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      if (reduceMotion) { panelEl.hidden = expanded; return; }
      if (expanded) {
        panelEl.style.height = panelEl.scrollHeight + 'px';
        requestAnimationFrame(function () { panelEl.style.height = '0px'; });
        panelEl.addEventListener('transitionend', function done() {
          panelEl.hidden = true; panelEl.style.height = '';
          panelEl.removeEventListener('transitionend', done);
        });
      } else {
        panelEl.hidden = false;
        var h = panelEl.scrollHeight;
        panelEl.style.height = '0px';
        requestAnimationFrame(function () {
          panelEl.style.height = h + 'px';
        });
        panelEl.addEventListener('transitionend', function done() {
          panelEl.style.height = '';
          panelEl.removeEventListener('transitionend', done);
        });
      }
    });
  });

  /* ---------- Animaciones al hacer scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  // Escalonado sutil entre hermanos
  document.querySelectorAll('.pillars, .service-grid, .steps, .project-gallery, .review-list').forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.setProperty('--d', (i % 3) * 0.12 + 's');
    });
  });
  document.querySelectorAll('.hero .reveal').forEach(function (n, i) {
    n.style.setProperty('--d', 0.25 + i * 0.1 + 's');
  });

  if ('IntersectionObserver' in window && !reduceMotion) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(function (n) { obs.observe(n); });
  } else {
    reveals.forEach(function (n) { n.classList.add('is-visible'); });
  }
})();
