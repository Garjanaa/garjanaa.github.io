/* ===== GARJANAA - Main JavaScript ===== */

// Scroll animation observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ===== Mobile nav toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.querySelector('.nav-overlay');

function closeMobileNav() {
  if (!navToggle || !navLinks) return;
  navToggle.setAttribute('aria-expanded', 'false');
  navLinks.classList.remove('open');
  if (navOverlay) navOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

function openMobileNav() {
  navToggle.setAttribute('aria-expanded', 'true');
  navLinks.classList.add('open');
  if (navOverlay) navOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMobileNav() : openMobileNav();
  });
}
if (navOverlay) {
  navOverlay.addEventListener('click', closeMobileNav);
}
// Close the mobile panel after a real navigation link is followed
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => closeMobileNav());
});
// Esc closes it too
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileNav();
});

// ===== Library dropdown (hover on desktop, tap on mobile) =====
document.querySelectorAll('.nav-dropdown').forEach(drop => {
  const trigger = drop.querySelector('.dropdown-trigger');
  if (!trigger) return;
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      drop.classList.toggle('open');
      trigger.setAttribute('aria-expanded', drop.classList.contains('open'));
    }
  });
});
// Clicking outside a dropdown closes it (desktop keyboard/touch fallback)
document.addEventListener('click', (e) => {
  document.querySelectorAll('.nav-dropdown.open').forEach(drop => {
    if (!drop.contains(e.target)) drop.classList.remove('open');
  });
});
