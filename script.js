// Nav scroll shadow
const navHeader = document.getElementById('nav-header');
window.addEventListener('scroll', () => {
  navHeader.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const navMobile = document.getElementById('nav-mobile');
menuBtn.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// Smooth scroll + close mobile menu on nav link click
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = document.getElementById('nav-header').offsetHeight;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

// Scroll reveal
const reveals = document.querySelectorAll('.section, .stat-card, .skill-category, .project-card, .contact-item');
reveals.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

// Skill bar animation
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
skillFills.forEach(fill => skillObserver.observe(fill));

// Contact form (mailto fallback since no backend)
const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    note.style.color = '#dc2626';
    note.textContent = 'Please fill in all fields.';
    return;
  }

  const subject = encodeURIComponent(`Portfolio contact from ${name}`);
  const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:aravindraj17@example.com?subject=${subject}&body=${body}`;

  note.style.color = '#16a34a';
  note.textContent = 'Opening your email client…';
  form.reset();
  setTimeout(() => { note.textContent = ''; }, 5000);
});
