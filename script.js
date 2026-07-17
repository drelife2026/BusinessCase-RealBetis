/* ===========================================================
   DRELIFE — interacciones
=========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header: cambia de fondo al hacer scroll ---------- */
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 24) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menú móvil ---------- */
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  burgerBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    burgerBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      burgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Animaciones de entrada (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Rail nav: sección activa según scroll ---------- */
  const railItems = document.querySelectorAll('.rail-nav__item[href]');
  const railTargets = Array.from(railItems).map(item => document.querySelector(item.getAttribute('href')));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = railTargets.indexOf(entry.target);
        railItems.forEach(i => i.classList.remove('is-active'));
        if (idx > -1) railItems[idx].classList.add('is-active');
      }
    });
  }, { threshold: 0.5 });
  railTargets.forEach(t => { if (t) sectionObserver.observe(t); });

  /* ---------- Modal de la App (Real Betis Second Life) ---------- */
  const appModal = document.getElementById('appModal');
  const verAppBtn = document.getElementById('verAppBtn');

  function openAppModal() {
    appModal.classList.add('is-open');
    appModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeAppModal() {
    appModal.classList.remove('is-open');
    appModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (verAppBtn) verAppBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openAppModal();
  });

  appModal.querySelectorAll('[data-modal-close]').forEach(el => {
    el.addEventListener('click', closeAppModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && appModal.classList.contains('is-open')) closeAppModal();
  });

  /* ---------- Modal de información (Resale) ---------- */
  const resaleModal = document.getElementById('resaleModal');
  const resaleInfoBtn = document.getElementById('resaleInfoBtn');

  function openResaleModal() {
    resaleModal.classList.add('is-open');
    resaleModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeResaleModal() {
    resaleModal.classList.remove('is-open');
    resaleModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (resaleInfoBtn) resaleInfoBtn.addEventListener('click', openResaleModal);

  resaleModal.querySelectorAll('[data-modal-close]').forEach(el => {
    el.addEventListener('click', closeResaleModal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resaleModal.classList.contains('is-open')) closeResaleModal();
  });

  /* ---------- Scroll suave para enlaces internos ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
