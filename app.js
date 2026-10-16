'use strict';
(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const names = ['Pembuka', 'Alur kegiatan', 'Koordinasi', 'Finalisasi MPI', 'Finalisasi RPP', 'Diseminasi', 'Laporan', 'Ringkasan', 'Materi asli'];
  const byId = id => document.getElementById(id);
  let current = 0;
  const dotButtons = [], listButtons = [];
  function go(index, updateHash = true) {
    current = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    [...dotButtons, ...listButtons].forEach(button => button.setAttribute('aria-current', String(Number(button.dataset.go) === current)));
    byId('counter').textContent = String(current + 1).padStart(2, '0');
    byId('sectionName').textContent = names[current];
    byId('prev').disabled = current === 0;
    byId('next').disabled = current === slides.length - 1;
    byId('progressFill').style.width = `${(current + 1) / slides.length * 100}%`;
    byId('announcement').textContent = `Slide ${current + 1} dari ${slides.length}: ${names[current]}`;
    if (updateHash) { try { history.replaceState(null, '', `#slide-${current + 1}`); } catch (_) { /* File preview can restrict history. */ } }
  }
  names.forEach((name, i) => {
    const dot = document.createElement('button');
    dot.dataset.go = i;
    dot.setAttribute('aria-label', `Slide ${i + 1}: ${name}`);
    byId('dots').append(dot); dotButtons.push(dot);
    const entry = document.createElement('button');
    entry.dataset.go = i;
    const number = document.createElement('span'); number.textContent = String(i + 1).padStart(2, '0');
    entry.append(number, document.createTextNode(name));
    byId('slideList').append(entry); listButtons.push(entry);
  });
  document.addEventListener('click', event => {
    const nav = event.target.closest('[data-go]');
    if (nav) {
      const inDialog = nav.closest('dialog'); if (inDialog) inDialog.close();
      go(Number(nav.dataset.go));
      const heading = slides[current].querySelector('h1,h2');
      heading.tabIndex = -1; heading.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    const close = event.target.closest('[data-close]');
    if (close) byId(close.dataset.close).close();
  });
  byId('prev').addEventListener('click', () => go(current - 1));
  byId('next').addEventListener('click', () => go(current + 1));
  byId('overviewBtn').addEventListener('click', () => byId('overview').showModal());
  byId('sourceBtn').addEventListener('click', () => byId('imageDialog').showModal());
  const disseminationPhoto = byId('disseminationPhoto');
  function updateDisseminationPhoto() {
    const available = disseminationPhoto.complete && disseminationPhoto.naturalWidth > 0;
    disseminationPhoto.hidden = !available;
    byId('disseminationPlaceholder').hidden = available;
    byId('disseminationPhotoBtn').disabled = !available;
    byId('disseminationCaption').textContent = available ? 'Dokumentasi kegiatan · Klik foto untuk memperbesar ↗' : 'Lampiran foto kegiatan';
  }
  disseminationPhoto.addEventListener('load', updateDisseminationPhoto);
  disseminationPhoto.addEventListener('error', updateDisseminationPhoto);
  updateDisseminationPhoto();
  byId('disseminationPhotoBtn').addEventListener('click', () => {
    if (!byId('disseminationPhotoBtn').disabled) byId('disseminationPhotoDialog').showModal();
  });
  document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }));
  let toastTimeout;
  function toast(message) { clearTimeout(toastTimeout); byId('toast').textContent = message; byId('toast').hidden = false; toastTimeout = setTimeout(() => { byId('toast').hidden = true; }, 4000); }
  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else toast('Layar penuh tidak tersedia di peramban ini.');
    } catch (_) { toast('Layar penuh tidak tersedia. Gunakan fitur layar penuh peramban.'); }
  }
  byId('fullscreen').addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', () => { byId('fullscreen').textContent = document.fullscreenElement ? 'Keluar layar penuh' : 'Layar penuh'; });
  byId('textSize').addEventListener('click', () => {
    const large = document.documentElement.classList.toggle('large-text');
    byId('textSize').setAttribute('aria-pressed', String(large));
    byId('textSize').setAttribute('aria-label', large ? 'Gunakan ukuran tulisan normal' : 'Perbesar ukuran tulisan');
    byId('textSize').textContent = large ? 'A−' : 'A+';
  });
  byId('print').addEventListener('click', () => window.print());
  document.addEventListener('keydown', event => {
    if (document.querySelector('dialog[open]') || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName) || event.ctrlKey || event.altKey || event.metaKey) return;
    const interactive = event.target.closest('button,a,[contenteditable]');
    if ((event.key === ' ' || event.key === 'Enter') && interactive) return;
    if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') { event.preventDefault(); go(current + 1); }
    if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); go(current - 1); }
    if (event.key === 'Home') { event.preventDefault(); go(0); }
    if (event.key === 'End') { event.preventDefault(); go(slides.length - 1); }
    if (event.key.toLowerCase() === 'f') { event.preventDefault(); toggleFullscreen(); }
  });
  document.querySelectorAll('.logo-wrap img').forEach(img => {
    const check = () => { if (!img.naturalWidth) img.parentElement.classList.add('missing'); };
    img.addEventListener('error', check);
    if (img.complete) check();
  });
  function fromHash() { const match = location.hash.match(/^#slide-(\d+)$/); go(match ? Number(match[1]) - 1 : 0, false); }
  window.addEventListener('hashchange', fromHash); fromHash();
})();
