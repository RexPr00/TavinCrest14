const body = document.body;

function trapFocus(container, event) {
  const focusables = container.querySelectorAll('a,button,input,[tabindex]:not([tabindex="-1"])');
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

const langWrap = document.querySelector('.lang');
const langToggle = document.querySelector('.lang-toggle');
if (langWrap && langToggle) {
  langToggle.addEventListener('click', () => langWrap.classList.toggle('open'));
  document.addEventListener('click', (e) => {
    if (!langWrap.contains(e.target)) langWrap.classList.remove('open');
  });
}

const drawer = document.querySelector('.mobile-drawer');
const openDrawer = document.querySelector('.mobile-toggle');
const closeDrawer = document.querySelector('.close-drawer');
if (drawer && openDrawer && closeDrawer) {
  const drawerPanel = drawer.querySelector('.drawer-panel');
  const closeAll = () => {
    drawer.classList.remove('open');
    body.style.overflow = '';
  };
  openDrawer.addEventListener('click', () => {
    drawer.classList.add('open');
    body.style.overflow = 'hidden';
    closeDrawer.focus();
  });
  closeDrawer.addEventListener('click', closeAll);
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeAll();
  });
  drawer.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
    if (e.key === 'Tab') trapFocus(drawerPanel, e);
  });
}

const modal = document.querySelector('#privacy-modal');
const openPrivacy = document.querySelectorAll('[data-open-privacy]');
const closePrivacy = document.querySelectorAll('[data-close-privacy]');
if (modal) {
  const panel = modal.querySelector('.modal-panel');
  const closeModal = () => {
    modal.classList.remove('open');
    body.style.overflow = '';
  };
  openPrivacy.forEach((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('open');
    body.style.overflow = 'hidden';
    modal.querySelector('[data-close-privacy]').focus();
  }));
  closePrivacy.forEach((btn) => btn.addEventListener('click', closeModal));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'Tab') trapFocus(panel, e);
  });
}

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    faqItems.forEach((x) => x.classList.remove('open'));
    item.classList.add('open');
  });
});
if (faqItems[0]) faqItems[0].classList.add('open');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
